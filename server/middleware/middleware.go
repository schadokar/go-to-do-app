package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"../models"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func getCollection() *mongo.Collection {

	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("test").Collection("todolist")
	return collection
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := findTasks()
	json.NewEncoder(w).Encode(payload)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var task models.ToDoList
	_ = json.NewDecoder(r.Body).Decode(&task)
	fmt.Println(task, r.Body)
	insertTask(task)
	json.NewEncoder(w).Encode(task)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)

	payload := findTasks()

	for _, p := range payload {
		if p.ID == params["id"] {
			delete(p)
			json.NewEncoder(w).Encode(p)
			return
		}
	}

	json.NewEncoder(w).Encode("Task not found")

}

func findTasks() []models.ToDoList {
	collection := getCollection()
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var tasks []models.ToDoList
	var task models.ToDoList

	for cur.Next(context.Background()) {
		err := cur.Decode(&task)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(task)
		tasks = append(tasks, task)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return tasks
}

func insertTask(task models.ToDoList) {
	collection := getCollection()
	_, err := collection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}
}

func delete(task models.ToDoList) {
	collection := getCollection()

	_, err := collection.DeleteOne(context.Background(), task, nil)
	if err != nil {
		log.Fatal(err)
	}
}
