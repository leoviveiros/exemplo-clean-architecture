import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import CustomerModel from './customer.model';
import CustomerRepository from './customer.repository';

describe('Customer Repository Tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            CustomerModel
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zip Code 1', 'City 1');

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Customer 1',
            active: customer.isActive(),
            rewardPoints: 0,
            street: 'Street 1',
            number: 1,
            zipCode: 'Zip Code 1',
            city: 'City 1'
        });
    });

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zip Code 1', 'City 1');

        customer.changeAddress(address);

        await customerRepository.create(customer);

        customer.changeName('Customer 2');

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Customer 2',
            active: customer.isActive(),
            rewardPoints: 0,
            street: 'Street 1',
            number: 1,
            zipCode: 'Zip Code 1',
            city: 'City 1'
        });
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zip Code 1', 'City 1');

        customer.changeAddress(address);
        customer.addRewardPoints(10);

        await customerRepository.create(customer);

        const customerFound = await customerRepository.find('1');

        expect(customer).toStrictEqual(customerFound);
    });

    it('should throw and error when customer is not found', () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find('1WER');
        }).rejects.toThrow('Customer not found');
    });

    it('should find all customers', async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer('1', 'Customer 1')
        const address1 = new Address('Street 1', 1, 'Zip Code 1', 'City 1');

        customer1.changeAddress(address1);
        customer1.addRewardPoints(10);

        await customerRepository.create(customer1);

        const customer2 = new Customer('2', 'Customer 2')
        const address2 = new Address('Street 2', 2, 'Zip Code 2', 'City 2');

        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);

        await customerRepository.create(customer2);

        const customersFound = await customerRepository.findAll();

        expect(customersFound).toHaveLength(2);
        expect(customersFound).toContainEqual(customer1);
        expect(customersFound).toContainEqual(customer2);
    });

    it('should delete a customer', async () => {
        const customerRepository = new CustomerRepository();
        
        const customer = new Customer('1', 'Customer 1')
        const address1 = new Address('Street 1', 1, 'Zip Code 1', 'City 1');

        customer.changeAddress(address1);

        await customerRepository.create(customer);

        await customerRepository.delete('1');

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

        expect(customerModel).toBeNull();
    });

});
