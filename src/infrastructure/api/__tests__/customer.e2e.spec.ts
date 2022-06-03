import { app, sequelize } from '../express';
import resquest from 'supertest';

describe('Customer e2e test', () => {

    beforeEach(async () => {
        await sequelize.dropAllSchemas({logging: false});
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a new customer', async () => {
        const response = await resquest(app)
            .post('/customers')
            .send({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    number: 123,
                    zipCode: '12345',
                    city: 'Anytown'
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.address.street).toBe('123 Main St');
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zipCode).toBe('12345');
        expect(response.body.address.city).toBe('Anytown');
    });

    it('should not create a customer', async () => {
        const response = await resquest(app)
            .post('/customers')
            .send({
                name: 'John Doe'
            });

        expect(response.status).toBe(500);
    });


    it('should get all customers', async () => {
        await resquest(app)
            .post('/customers')
            .send({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    number: 123,
                    zipCode: '12345',
                    city: 'Anytown'
                }
            });

        await resquest(app)
            .post('/customers')
            .send({
                name: 'Jane Doe',
                address: {
                    street: '1234 Main St',
                    number: 1234,
                    zipCode: '12345',
                    city: 'Anytown'
                }
            });

        const response = await resquest(app)
            .get('/customers')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);

        const joe = response.body.customers[0];
        expect(joe.name).toBe('John Doe');
        expect(joe.address.street).toBe('123 Main St');
        
        const jane = response.body.customers[1];
        expect(jane.name).toBe('Jane Doe');
        expect(jane.address.street).toBe('1234 Main St');
    });

})