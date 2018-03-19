const {User} = require('../models/User');

let authenticate = (request, response, next) => {
    let token = request.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        response.send(user);
        next();
    }).catch((error) => {
        response.status(401).send();
    })

};

module.exports = {authenticate};
