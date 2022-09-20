/* eslint-disable no-undef */
const request = require('supertest');
const { User, Company, Product } = require('../models');
const Server = require('../models/Server');
const { basicInitialData, authUser } = require('./helpers');

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
				console.log("🚀 ~ file: product.spec.js ~ line 60 ~ it ~ token", token)

			expect(resp.body).toBeInstanceOf(Object);
			expect(resp.body.name).toEqual('OTRO MÁS');
			expect(resp.status).toBe(201)

		});

		it('Usuario no logueado no puede crear un producto', async () => {

			const product = {
				name: 'un producto',
				status: false,
			};

			const resp = await request(app).post('/api/products').send(product);
				
			expect(resp.body).toBeInstanceOf(Object);
			expect(resp.status).toBe(401)

		});

		it('Usuario logueado puede actualizar un producto', async () => {

			const user = await User.findOne({ email: 'diego.barrueta@gmail.com' });

			const product = await Product.find({}).sort({"_id":1}).limit(1);

			const data = {
				name: 'otro más y doble más',
				status: true,
				user: user.id,
			};

			const resp = await request(app).put(`/api/products/${product[0].id}`)
				.send(data)
				.set('x-token', `${token}`);

			expect(resp.body).toBeInstanceOf(Object);
			expect(resp.body.name).toEqual('otro más y doble más'.toUpperCase());
			expect(resp.status).toBe(200)

		});

		it('cualquier tipo de usuario puede obtener un producto', async () => {
			
			const product = await Product.find({}).sort({"_id":1}).limit(1);

			const resp = await request(app).get(`/api/products/${product[0].id}`);

			expect(resp.body).toBeInstanceOf(Object);
			expect(resp.body.id).toEqual(product.id);
			expect(resp.status).toBe(200)

		});

		it('obtener un producto con un ID que no es de Mongo', async () => {
			
			const resp = await request(app).get(`/api/products/444w`);

			expect(resp.body).toBeInstanceOf(Object);
			expect(resp.body.errors[0].value).toEqual('444w');
			expect(resp.body.errors[0].msg).toEqual('No es un ID de Mongo');
			expect(resp.status).toBe(400)

		});
	});

});