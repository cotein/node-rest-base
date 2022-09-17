/* eslint-disable indent */
const request = require('supertest');
const { Product, User, Company } = require('./../models');
const Server = require('../models/Server');
const server = new Server;
const app = server.getServer();
const bcryptjs = require('bcryptjs');

describe('Auth User',  () => {

    it('Login with email and password ', async () => {
        const email = 'diego.barrueta@gmail.com';
        const salt = bcryptjs.genSaltSync();
	    const password = bcryptjs.hashSync(123456, salt);
        
        const res = await request(app).post('/api/auth/login').send({
            email,
            password
        });

        expect(res.body).toBeInstanceOf(Object);
        console.info(res);
        /* expect(response.body.user).toEqual(expect.objectContaining({
            name: 'Diego'
        })); */
    });

});