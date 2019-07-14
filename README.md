# go-to-do-app

This is a to-do list application. It's server is created in Golang, db is mongodb and client is in React.

# Application Requirement

### golang server requirement

1. golang https://golang.org/dl/
2. gorilla/mux library for router `go get -u github.com/gorilla/mux`
3. mongo-driver library to connect with mongoDB `go get go.mongodb.org/mongo-driver`

### react client

From the Application directory

`create-react-app client`

# Start the application

1. Make sure your mongoDB is started
2. From server directory, open a terminal and run
   `go run main.go`
3. From client directory,
   a. install all the dependencies using `npm install`
   b. start client `npm start`

# Walk through the application

Open application at http://localhost:3000

### Index page

![](images\index.PNG)

### Create task

Enter a task and Enter

![](images\createTask.PNG)

### Task Complete

On completion of a task, click "done" Icon of the respective task card.

![](images\taskComplete.PNG)

You'll notice on completion of task, card's bottom line color changed from yellow to green.

### Undo a task

To undone a task, click on "undo" Icon,

![](images\createTask.PNG)

You'll notice on completion of task, card's bottom line color changed from green to yellow.

### Delete a task

To delete a task, click on "delete" Icon.

![](images\deletetask.PNG)

# References

https://godoc.org/go.mongodb.org/mongo-driver/mongo
https://www.mongodb.com/blog/post/mongodb-go-driver-tutorial
https://vkt.sh/go-mongodb-driver-cookbook/
