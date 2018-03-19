const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const mongoose = require('./db/mongoose');
const {User} = require('./models/User');
const {Todo} = require('./models/Todo');

let app = express();

app.use(bodyParser.json());

//POST /user
app.post('/user', (request, response) => {
    let user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    });
    user.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send({
            errorMessage: 'error occured ' + error
        });
    });
});

//POST /todos
app.post('/todo', (request, response) => {

    let user = new Todo({
        userid: request.headers['bearer'],
        text: request.body.text
    });
    user.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send({
            errorMessage: 'error occured ' + error
        });
    });
});

//GET /todos
app.get('/todos', (request, response) => {


    Todo.find({userid: request.headers['bearer']}).then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send({
            errorMessage: 'error occured ' + error
        });
    });
});

//GET /todos:id
app.get('/todos/:id', (request, response) => {

    if (request.headers['bearer'] === '') {
        response.status(400).send({
            errorMessage: "Bearer token required"
        })
    }

    else if (!ObjectID.isValid(request.params.id)) {
        response.status(404).send({
            errorMessage: "Invalid id."
        })
    }

    Todo.find({_id: request.params.id}).then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send({
            errorMessage: 'error occured ' + error
        });
    });
});


app.listen(3000, () => {
    console.log('started on port 3000')
});

module.exports = {app};