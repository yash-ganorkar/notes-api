const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {User} = require('../models/User');
const {Todo} = require('../models/Todo');

beforeEach((done) => {
    User.remove({}).then(() => done());
});

describe('POST /user', () => {
    it('should create a new user', function (done) {
        var name = 'Test User';
        var password = 'testpassword';
        var email = 'test@gmail.com';

        request(app).post('/user').send({
            name: name, password: password, email: email
        }).expect((response) => {
            expect(response.body.name).toBe(name)
        })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('should not create a new user with bad data', function (done) {
        var name = 'Test User';
        var password = 'testpassword';
        var email = 'test@gmail.com';

        request(app).post('/user').send({})
            .expect(400)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                //done();
            });

        User.find().then((users) => {
            expect(users.length).toBe(0);
            done();
        });

    })
});
