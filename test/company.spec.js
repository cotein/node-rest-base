/* eslint-disable no-undef */
const request = require('supertest');
const { User, Company, Product } = require('../models');
const Server = require('../models/Server');
const { basicInitialData, authUser } = require('./helpers');

describe('Pruebas sobre la API company', () => {

    const server = new Server;
	let response, token, user;
	const app = server.getServer();

	beforeEach(async () => {
		
		await basicInitialData();

		const email = 'diego.barrueta@gmail.com';
	    const password = '123456'
        
        response = await request(app).post('/api/auth/login').send({
            email,
            password
        });
		
  		token = response.body.token;

        user = response.body.user;
        
	});

    it('Usuario logueado puede crear una compañia', async () => {
        
        const data = {
            name: 'Google',
            cuit: '20227339730',
            user: user.id,
            status: true
        };

        const resp = await request(app).post('/api/company')
        .send(data)
        .set('x-token', `${token}`);
        
        expect(resp.body).toBeInstanceOf(Object);
        expect(resp.body.name).toEqual(data.name.toUpperCase());
        expect(resp.body.cuit).toEqual(data.cuit);
        expect(resp.status).toBe(201)

    });

    it('Usuario logueado puede crear una compañia y debe tener el Nombre', async () => {
        
        const data = {
            name: '',
            cuit: '20227339730',
            user: user.id,
            status: true
        };

        const resp = await request(app).post('/api/company')
        .send(data)
        .set('x-token', `${token}`);
        
        expect(resp.body).toBeInstanceOf(Object);
        expect(resp.body.errors[0].msg).toEqual('El nombre es obligatotio');
        expect(resp.status).toBe(400);

    });

    it('Usuario no logueado no puede crear una compañia', async () => {
        
        const data = {
            name: 'Google',
            cuit: '20227339730',
            user: user.id,
            status: true
        };

        const resp = await request(app).post('/api/company')
        .send(data)
        
        expect(resp.body).toBeInstanceOf(Object);
        expect(resp.body.msg).toEqual('No esta autenticado');
        expect(resp.status).toBe(401)

    });

    it('La compañía ya existe en la base de datos', async () => {
        
        const company = new Company({
            name: 'Google',
            cuit: '20227339730',
        });

        await company.save();

        const data = {
            name: 'Google',
            cuit: '20227339730',
            user: user.id,
            status: true
        };

        const resp = await request(app).post('/api/company')
        .set('x-token', `${token}`)
        .send(company);

        console.log("🚀 ~ file: company.spec.js ~ line 98 ~ it ~ resp", resp.body)
        
        expect(resp.body).toBeInstanceOf(Object);
        expect(resp.body.msg).toEqual('No esta autenticado');
        expect(resp.status).toBe(401)

    });
})