require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


const mongoose = require('./db/mongoose');
const {User} = require('./models/User');
const {Todo} = require('./models/Todo');
const {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//POST /user
app.post('/user', (request, response) => {

    let body = _.pick(request.body, ['name', 'email', 'password']);

    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        response.header('x-auth', token).send({
            createUserResponse: "User Successfully registered"
        });
    }).catch((error) => {
        response.status(400).send({
            createUserResponse: 'error occured ' + error
        });
    });
});

//POST /todos
app.post('/todo', authenticate, (request, response) => {

    let user = new Todo({
        userid: request.user._id,
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
app.get('/todos', authenticate, (request, response) => {


    Todo.find({userid: request.user._id}).then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send({
            errorMessage: 'error occured ' + error
        });
    });
});

//GET /todos/:id
app.get('/todos/:id', authenticate, (request, response) => {

    if (!ObjectID.isValid(request.params.id)) {
        response.status(404).send({
            errorMessage: "Invalid id."
        })
    }

    Todo.findOne({_id: request.params.id, userid: request.user._id}).then((doc) => {

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
app.delete('/todos/:id', authenticate, (request, response) => {

    if (!ObjectID.isValid(request.params.id)) {
        response.status(404).send({
            errorMessage: "Invalid id."
        })
    }

    Todo.findOneAndRemove({_id: request.params.id, userid: request.user._id}).then((todo) => {
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
app.patch('/todos/:id', authenticate, (request, response) => {

    let id = request.params.id;

    let body = _.pick(request.body, ['text']);

    if (!ObjectID.isValid(id)) {
        response.status(404).send({
            errorMessage: "Invalid id."
        })
    }

    Todo.findOneAndUpdate({_id: id, userid: request.user._id}, {$set: {text: body.text}}, {new: true})
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

//private method
app.get('/users/me', authenticate, (request, response) => {
    response.send(request.user);
});

//POST /users/login
app.post('/users/login', (request, response) => {
    let body = _.pick(request.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            response.header('x-auth', token).send({
                loginUser: "User successfully logged in."
            });
        });
    }).catch((error) => {
        response.status(400).send();
    });
});

//DELETE /users/me/token
app.delete('/users/me/token', authenticate, (request, response) => {
    console.log(request.user);
    request.user.removeToken(request.token).then(() => {
        response.status(200).send();
    }, () => response.status(400).send())
});

app.listen(port, () => {
    console.log(`Started at ${port}`);
});

module.exports = {app};