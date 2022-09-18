/* eslint-disable no-undef */
const request = require('supertest');
const { User, Company } = require('../models');
const Server = require('../models/Server');
const { basicInitialData, authUser } = require('./helpers');
const { dbDisconnect } = require('../database/config');

describe('Pruebas sobre la API products', () => {
	const server = new Server;
	let response, token;
	const app = server.getServer();

	beforeAll(async () => {
		await basicInitialData();
		const email = 'diego.barrueta@gmail.com';
	    const password = '123456'
        
        response = await request(app).post('/api/auth/login').send({
            email,
            password
        });
		
  		token = response.body.token;
	});

	beforeEach(async () => {
		response = await request(app).get('/api/products').send();
	});

	describe('GET api/products', () => {

		it('La ruta funciona', () => {
			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
		});

		it('La petición devuelve un array de productos activos', () => {
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.total).toEqual(response.body.products.length);
			expect(response.body.products).toBeInstanceOf(Array);
		});

		it('Usuario logueado puede crear un producto', async () => {

			const user = await User.findOne({ email: 'diego.barrueta@gmail.com' });

			const company = await Company.findOne({ cuit: 20008721123 });
			
			const product = {
				name: 'otro más',
				status: false,
				user: user.id,
				company: company.id
			};

			const resp = await request(app).post('/api/products')
				.send(product)
				.set('x-token', `${token}`);

			expect(resp.body).toBeInstanceOf(Object);
			expect(resp.body.name).toEqual('OTRO MÁS');
			expect(resp.status).toBe(201)

		});
	});

	afterAll(  () => {
		//dbDisconnect();
	})
});