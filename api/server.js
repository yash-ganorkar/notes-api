const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const mongoose = require('./db/mongoose');
const {User} = require('./models/User');
const {Todo} = require('./models/Todo');

let app = express();
const port = process.env.PORT || 3000;

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

//GET /todos/:id
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

        if (!doc) {
            return response.status(404).send({
                errorMessage: 'Unable to fetch the requested note. Please try again.'
            })
        }
        response.send(doc);
    }, (error) => {
        response.status(400).send({
            errorMessage: 'error occured ' + error
        });
    });
});

//DELETE /todos/:id
app.delete('/todos/:id', (request, response) => {

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

    Todo.findByIdAndRemove({_id: request.params.id}).then((todo) => {
        if (!todo) {
            return response.status(404).send({
                errorMessage: 'Unable to fetch the delete note. Please try again.'
            })
        }

        response.send(todo);
    }).catch((e) => {
        response.status(400).send({
            errorMessage: 'error occured ' + e
        });
    })

});

//PATCH /todos/:id
app.patch('/todos/:id', (request, response) => {

    let id = request.params.id;

    let body = _.pick(request.body, ['text']);

    if (request.headers['bearer'] === '') {
        response.status(400).send({
            errorMessage: "Bearer token required"
        })
    }

    else if (!ObjectID.isValid(id)) {
        response.status(404).send({
            errorMessage: "Invalid id."
        })
    }

    Todo.findByIdAndUpdate(id, {$set: {text: body.text}}, {new: true})
        .then((todo) => {
            if (!todo) {
                return response.status(404).send();
            }

            response.send(todo);
        })
        .catch((e) => {
            response.status(400).send({
                errorMessage: 'error occured ' + e
            });
        })
});


app.listen(port, () => {
    console.log(`Started at ${port}`);
});

module.exports = {app};