/* eslint-disable no-undef */
const request = require('supertest');
const { User, Company } = require('../models');
const Server = require('../models/Server');
const { basicInitialData, authUser } = require('./helpers');

describe('Pruebas sobre la API products', () => {
	const server = new Server;
	let response;
	const app = server.getServer();

	beforeAll(async () => {
		basicInitialData();
	});

	beforeEach( async ()=> {
		response = await request(app).get('/api/products').send();
	});

	describe('GET api/products', ()=>{
		
		it('La ruta funciona', ()=>{
			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toContain('json');
		});
		
		it('La petición devuelve un array de productos activos', ()=>{
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.total).toEqual(response.body.products.length);
			expect(response.body.products).toBeInstanceOf(Array);
		});

		it('Usuario logueado puede crear un producto', async () => {

			const user = User.findOne({email: 'diego.barrueta@gmail.com'});

			const company = Company.findOne({cuit: 20008721123});

			const product = {
				name: 'otro más',
				status: false,
				user: user.id,
				company: company.id
			};

			const resp = await request(app).post('/api/products').send(product);

			expect(resp.body).toBeInstanceOf(Object);
			expect(resp.body).toContain('otro más');

		});
	});
});