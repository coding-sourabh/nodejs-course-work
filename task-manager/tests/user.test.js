const request = require('supertest');
const {app} = require('../src/app');

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'natsumisdfsd',
        email : 'natsumifsdfsd@example2.com',
        password : 'fsdfoiwfnlfsdfdssdifjsklfsd'
    }).expect(201);
})