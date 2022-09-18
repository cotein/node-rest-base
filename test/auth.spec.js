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
	    const password = "123456";
        
        const res = await request(app).post('/api/auth/login')
        .send({
            email,
            password
        });

        expect(res.body).toBeInstanceOf(Object);
        /* expect(response.body.user).toEqual(expect.objectContaining({
            name: 'Diego'
        })); */
    });

});