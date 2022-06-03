import { app, sequelize } from '../express';
import resquest from 'supertest';

describe('Product e2e test', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a new product', async () => {
        const response = await resquest(app)
            .post('/products')
            .send({
                name: 'Product 1',
                price: 10.00
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Product 1');
        expect(response.body.price).toBe(10.00);
    });

    it('should not create a product', async () => {
        const response = await resquest(app)
            .post('/products')
            .send({
                name: 'Product 1',
            });

        expect(response.status).toBe(500);
    });


    it('should get all products', async () => {
        await resquest(app)
            .post('/products')
            .send({
                name: 'Product 1',
                price: 10.00
            });

        await resquest(app)
            .post('/products')
            .send({
                name: 'Product 2',
                price: 20.00
            });

        const response = await resquest(app)
            .get('/products')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);

        const product1 = response.body.products[0];
        expect(product1).toHaveProperty('id');
        expect(product1.name).toBe('Product 1');
        expect(product1.price).toBe(10.00);

        const product2 = response.body.products[1];
        expect(product2).toHaveProperty('id');
        expect(product2.name).toBe('Product 2');
        expect(product2.price).toBe(20.00);
    });

})