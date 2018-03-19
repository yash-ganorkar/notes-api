let mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{email} is not a valid email'
        }
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
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

UserSchema.statics.findByToken = function (token) {

    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'yashganorkar');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'name', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';

    let token = jwt.sign({_id: user._id.toHexString(), access}, 'yashganorkar').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User}