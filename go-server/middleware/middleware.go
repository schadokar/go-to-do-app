package middleware

import (
	"context"
	"encoding/json"
	"go-server/models"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"go.uber.org/zap"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// collection object/instance
var collection *mongo.Collection
var logger *zap.Logger

// create connection with mongo db
func init() {
	initLogger()
	loadTheEnv()
	createDBInstance()
}

func initLogger() {
	config := zap.NewProductionConfig()
	config.OutputPaths = []string{"logs.txt", "stderr"}
	l, err := config.Build()
	if err != nil {
		log.Fatalf("Error in initialising logger: %s", err.Error())
	} else {
		logger = l
	}
}

func loadTheEnv() {
	// load .env file
	err := godotenv.Load(".env")
	if err != nil {
		logger.Error("Error loading .env file", zap.String("err", err.Error()))
	}
}

func createDBInstance() {
	// DB connection string
	connectionString := os.Getenv("DB_URI")

	// Database Name
	dbName := os.Getenv("DB_NAME")

	// Collection name
	collName := os.Getenv("DB_COLLECTION_NAME")

	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		logger.Error("error in connecting to mongo db", zap.String("err", err.Error()))
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		logger.Error("error in pinging to mongo db", zap.String("err", err.Error()))
	}

	logger.Info("Connected to MongoDB!")

	collection = client.Database(dbName).Collection(collName)

	logger.Info("Collection instance created!")
}

// GetAllTask get all the task route
func GetAllTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := getAllTask()
	json.NewEncoder(w).Encode(payload)
}

// CreateTask create task route
func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var task models.ToDoList
	_ = json.NewDecoder(r.Body).Decode(&task)

	logger.Info("DELETE ME", zap.Any("obj", task), zap.Any("String", string(cont)))
	insertOneTask(task)
	json.NewEncoder(w).Encode(task)
}

// TaskComplete update task route
func TaskComplete(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	taskComplete(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// UndoTask undo the complete task route
func UndoTask(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	undoTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// DeleteTask delete one task route
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	deleteOneTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
	// json.NewEncoder(w).Encode("Task not found")

}

// DeleteAllTask delete all tasks route
func DeleteAllTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	count := deleteAllTask()
	json.NewEncoder(w).Encode(count)
	// json.NewEncoder(w).Encode("Task not found")

}

// get all task from the DB and return it
func getAllTask() []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		logger.Error("", zap.String("err", err.Error()))
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			logger.Error("", zap.String("err", err.Error()))
		}
		// fmt.Println("cur..>", cur, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
		results = append(results, result)
	}

	if err := cur.Err(); err != nil {
		logger.Error("", zap.String("err", err.Error()))
	}

	cur.Close(context.Background())
	return results
}

// Insert one task in the DB
func insertOneTask(task models.ToDoList) {
	insertResult, err := collection.InsertOne(context.Background(), task)

	if err != nil {
		logger.Error("", zap.String("err", err.Error()))
	}

	logger.Info("Inserted a Single Record ", zap.Any("recordId", insertResult.InsertedID))
}

// task complete method, update task's status to true
func taskComplete(task string) {
	logger.Info("completing task", zap.String("task", task))

	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": true}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		logger.Error("", zap.String("err", err.Error()))
	}

	logger.Info("task completed", zap.String("task", task),
		zap.Int64("modifiedCount", result.ModifiedCount))
}

// task undo method, update task's status to false
func undoTask(task string) {
	logger.Info("undoing task", zap.String("task", task))
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": false}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		logger.Error("", zap.String("err", err.Error()))
	}

	logger.Info("task undone", zap.String("task", task),
		zap.Int64("modifiedCount", result.ModifiedCount))
}

// delete one task from the DB, delete by ID
func deleteOneTask(task string) {
	logger.Info("deleting task", zap.String("task", task))
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	d, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		logger.Error("", zap.String("err", err.Error()))
	}

	logger.Info("deleting task", zap.String("task", task),
		zap.Int64("deleteDocuments", d.DeletedCount))
}

// delete all the tasks from the DB
func deleteAllTask() int64 {
	d, err := collection.DeleteMany(context.Background(), bson.D{{}}, nil)
	if err != nil {
		logger.Error("", zap.String("err", err.Error()))
	}

	logger.Info("Deleted All tasks", zap.Int64("deletedCounts", d.DeletedCount))
	return d.DeletedCount
}
