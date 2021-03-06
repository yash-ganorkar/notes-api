let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    }
});

module.exports = {Todo}