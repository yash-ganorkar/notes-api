let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    completedAt: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    }
});

module.exports = {Todo}