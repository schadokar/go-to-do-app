# :memo: Go To Do App

This is a to-do list application. The complete tutorial is published on [my blog](https://schadokar.dev/posts/build-a-todo-app-in-golang-mongodb-and-react/).

**Server: Golang  
Client: React, semantic-ui-react  
Database: Local MongoDB**

The offline version of application `Get Shit Done` is hosted at

:link: https://schadokar.github.io/go-to-do-app/

:link: http://getshitdone.surge.sh

> Offline to-do app instruction. [here](https://codesource.io/building-an-offline-to-do-app-with-react/)
---

# Highlights

1. DB connection string, name and collection name moved to `.env` file as environment variable. Using `github.com/joho/godotenv` to read the environment variables.
2. [feature/cloud-native-deployment](https://github.com/abdennour/go-to-do-app/tree/feature/cloud-native-deployment) provided by [abdennour](https://github.com/abdennour). Thank you [@abdennour](https://github.com/abdennour) to dockerize it. His features supports both Docker and Kubernetes.

## Application Requirement

### golang server requirement

1. golang https://golang.org/dl/
2. gorilla/mux package for router `go get -u github.com/gorilla/mux`
3. mongo-driver package to connect with mongoDB `go get go.mongodb.org/mongo-driver`
4. github.com/joho/godotenv to access the environment variable.

### react client

From the Application directory

`create-react-app client`

## :computer: Start the application

1. Make sure your mongoDB is started
2. Create a `.env` file inside the `go-server` and copy the keys from `.env.example` and update the DB connection string.
3. From go-server directory, open a terminal and run
   `go run main.go`
4. From client directory,  
   a. install all the dependencies using `npm install`  
   b. start client `npm start`

## :panda_face: Walk through the application

Open application at http://localhost:3000

### Index page

![](https://github.com/schadokar/go-to-do-app/blob/master/images/index.PNG)

### Create task

Enter a task and Enter

![](https://github.com/schadokar/go-to-do-app/blob/master/images/createTask.PNG)

### Task Complete

On completion of a task, click "done" Icon of the respective task card.

![](https://github.com/schadokar/go-to-do-app/blob/master/images/taskComplete.PNG)

You'll notice on completion of task, card's bottom line color changed from yellow to green.

### Undo a task

To undone a task, click on "undo" Icon,

![](https://github.com/schadokar/go-to-do-app/blob/master/images/createTask.PNG)

You'll notice on completion of task, card's bottom line color changed from green to yellow.

### Delete a task

To delete a task, click on "delete" Icon.

![](https://github.com/schadokar/go-to-do-app/blob/master/images/deletetask.PNG)

---

## Author

#### :sun_with_face: Shubham Kumar Chadokar

I am software engineer and love to write articles and tutorials on golang, blockchain, and nodejs.  
Please checkout my other articles on :link: https://schadokar.dev :tada:

# References

https://godoc.org/go.mongodb.org/mongo-driver/mongo  
https://www.mongodb.com/blog/post/mongodb-go-driver-tutorial  
https://vkt.sh/go-mongodb-driver-cookbook/

# License

MIT License

Copyright (c) 2019 Shubham Chadokar
