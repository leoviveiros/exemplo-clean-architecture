import { app, sequelize } from '../express';
import resquest from 'supertest';


describe('Customer e2e test', () => { 

    beforeEach(async () => {
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
})