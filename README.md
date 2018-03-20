# notes-api
API used to create and save important ideas and quick notes without being dependent on any operating systems.

## Prerequisites
In order to download and run this project on your desktop, you need to have Node.js, MongoDB and Postman installed. You can download these from thier respective websites. After cloning this project to your desktop, 

## Installation
1. open terminal or Windows command prompt and navigate to the location where you have downloaded your project.

2. Run `npm install` which will install all the dependencies that are needed to run this project.

3. Once all the dependencies are installed, run `node api\server.js` to kick start the server.

## Usage
In order to use the system, there are following methods which can be used to interact with.

### Register new user
 The following request creates a new user into the database.
 * Request type - POST
 * URL - /user
 * Headers - Content-Type : application/json
 * Body - JSON Object containing name, password and email fields. For example {name: 'Your name', password: 'Password' , email: 'email@domain.com'}
 
 * Response type - JSON
 * Body - JSON Object containing uniquely created id, name and email. For example { "_id": "5ab1885def8ecc49ac7a103b", "name": "Your name", "email": "email@domain.com"}
 * Headers - The API returns an X-Auth header which is then used for further communication and is passed into header for every request.
 
 ### Add new Todo Note
 The following request adds a new note into the database.
 * Request type - POST
 * URL - /todo
 * Headers - Content-Type : application/json, x-auth : value from x-auth received once we created a new account
 * Body - JSON Object containing text fields. For example {text:"My first note"}
 
 * Response type - JSON
 * Body - JSON Object containing uniquely created id for the note, userid, created at timestamp (Unix) and text of posted new note. For example { "createdAt": 1521577724082, "_id": "5ab18a1fef8ecc49ac7a103d", "userid": "5ab1885def8ecc49ac7a103b", "text": "My first note", "__v": 0}
 
 * Headers - None
 
 ### Get all Notes
 The following request fetches all the notes created from the database.
 * Request type - GET
 * URL - /todos
 * Headers - x-auth : value from x-auth received when we created a new account
 * Body - None
 
 * Response type - JSON
 * Body - JSON Array object containing list of notes added. For example { "createdAt": 1521577724082, "_id": "5ab18a1fef8ecc49ac7a103d", "userid": "5ab1885def8ecc49ac7a103b", "text": "My first note", "__v": 0}
 
 * Headers - None
 
 ### Get particular note
 The following request fetches the particular note from the database.
 * Request type - GET
 * URL - /todos/:id where :id is id of the note.
 * Headers - x-auth : value from x-auth received when we created a new account
 * Body - None
 
 * Response type - JSON
 * Body - JSON object containing that particular note. For example { "createdAt": 1521577724082, "_id": "5ab18a1fef8ecc49ac7a103d", "userid": "5ab1885def8ecc49ac7a103b", "text": "My first note", "__v": 0}
 
 * Headers - None
 
 ### Update particular note
 The following request updates a particular note
 * Request type - PATCH
 * URL - /todos/:id where :id is id of the note.
 * Headers - Content-Type: application/json, x-auth : value from x-auth received when we created a new account
 * Body - JSON Object containing updated text. For example { "text" : "My note 3"}
 
 * Response type - JSON
 * Body - JSON object containing updated note. For example { "createdAt": 1521577724082, "_id": "5ab18a1fef8ecc49ac7a103d", "userid": "5ab1885def8ecc49ac7a103b", "text": "My note 3", "__v": 0}
 
 * Headers - None
 
 ### Delete particular note
 The following request deletes a particular note
 * Request type - DELETE
 * URL - /todos/:id where :id is id of the note.
 * Headers - x-auth : value from x-auth received when we created a new account
 * Body - JSON Object containing updated text. For example { "text" : "My note 3"}
 
 * Response type - JSON
 * Body - JSON object containing the deleted note. For example { "createdAt": 1521577724082, "_id": "5ab18a1fef8ecc49ac7a103d", "userid": "5ab1885def8ecc49ac7a103b", "text": "My note 3", "__v": 0}
 
 * Headers - None
 
 ### Logout from the application
 The following request deletes a particular note
 * Request type - DELETE
 * URL - /users/me/token
 * Headers - x-auth : value from x-auth received when we created a new account
 * Body - None
 
 * Response type - None
 * Body - None
 * Headers - None
 
 ### Login to the application
 The following request deletes a particular note
 * Request type - POST
 * URL - /users/login
 * Headers - Content-Type : application/json
 * Body - JSON Object containing email id and password. For example { email: "test@domain.com", password: "password2" }
 
 * Response type - JSON
 * Body - JSON Object containing id, name and email. For example { "_id": "5ab1885def8ecc49ac7a103b", "name": "Your name", "email": "test@domain.com"}
 * Headers - The API returns an X-Auth header which is then used for further communication and is passed into header for every request.
 
## Contributor
 Yash Ganorkar
 [GitHub](https://github.com/yash-ganorkar)
 [LinkedIn](https://linkedin.com/in/yashganorkar)
