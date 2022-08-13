const request = require('supertest');

const Server = require('../models/Server');

describe("Pruebas sobre la API products", () => {
    const server = new Server;
    let response;
    beforeEach( async ()=> {
        response = await request(server.getServer()).get('/api/products').send();
    });

    describe("GET api/products", ()=>{
        it('La ruta funciona', async ()=>{
            
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        it('La petición devuelve un array de productos', async ()=>{
            
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.total).toBe(4);
            expect(response.body.products).toBeInstanceOf(Array);
        });
    })
})