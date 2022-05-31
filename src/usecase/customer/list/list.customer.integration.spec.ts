import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '@domain/customer/factory/customer.factory';
import CustomerModel from '@infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '@infrastructure/customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from './list.customer.usecase';

describe('List Customer UseCase Unit Test', () => {
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

    it('should return a list of customers', async () => {
        const customer1 = CustomerFactory.createWithAddress(
            'John Doe',
            'Street 1', 1, '12345', 'City 1');

        const customer2 = CustomerFactory.createWithAddress(
            'Jane Doe',
            'Street 2', 2, '12389', 'City 2');
        
        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        expect(output.customers).toHaveLength(2);
        
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });
});