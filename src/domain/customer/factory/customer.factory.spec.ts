import CustomerFactory from './customer.factory';

describe('Customer Factory unit tests', () => {
    
    it('should create a customer', () => {
        const customer = CustomerFactory.create('John Doe');

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('John Doe');
        expect(customer.address).toBeUndefined();
    });

    it('should create a customer with an address', () => {
        const customer = CustomerFactory.createWithAddress('John Doe', 'Rua dos Bobos', 123, '12345-678', 'São Paulo');
            
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('John Doe');
        expect(customer.address.street).toBe('Rua dos Bobos');
        expect(customer.address.number).toBe(123);
        expect(customer.address.zipCode).toBe('12345-678');
        expect(customer.address.city).toBe('São Paulo');
    });

});