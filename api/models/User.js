let mongoose = require('mongoose');

let User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    }
});

module.exports = {User}