# :memo: Go To Do App

The offline version of application `Get Shit Done` is hosted at  

:link: https://schadokar.github.io/go-to-do-app/     

:link: http://getshitdone.surge.sh

It is a modification of go-to-do-app. In this application instead of using MongoDB
for storing the data, local storage is used.

The application store data in browser's local storage.
You can check in "Inspect" by pressing "F12" or "Ctrl+Shift+I"

Go to Application >> Local Storage

# :computer: Start the application

From client directory, you have 2 options either install the complete application or just run the build:

#### build

a. install a server if you don't have one. `npm install -g serve`  
b. serve build  
c. Open application at http://localhost:5000  

#### client

a. install all the dependencies using `npm install`  
b. start client `npm start`  
c. Open application at http://localhost:3000

# :panda_face: Walk through the application

The application is hosted at http://getshitdone.surge.sh
If you just want to check it.

### Index page

<img src="./images/index.PNG" />

### Create task

Enter a task and Submit

<img src="./images/createTask.PNG" />

### Task Complete

On completion of a task, click "done" Icon of the respective task card.

<img src="./images/taskComplete.PNG" />

You'll notice on completion of task, card's bottom line color changed from yellow to green.

### Undo a task

To undone a task, click on "undo" Icon,

<img src="./images/createTask.PNG" />

You'll notice on completion of task, card's bottom line color changed from green to yellow.

### Delete a task

To delete a task, click on "delete" Icon.

<img src="./images/deletetask.PNG" />

---

# Author  

#### :sun_with_face: Shubham Kumar Chadokar  

I am software engineer and love to write articles and tutorials on golang, blockchain, and nodejs.  
Please checkout my other articles on :link: https://schadokar.netlify.com :tada:


# License

MIT License

Copyright (c) 2019 Shubham Chadokar
