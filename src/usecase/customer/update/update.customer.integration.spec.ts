import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import UpdateCustomerUseCase from './update.customer.usecase';

describe("Update Customer UseCase Integration Test", () => { 
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

    it("should update a customer", async () => {
        const customer = CustomerFactory.createWithAddress('Customer 1', 'Street 1', 1, 'Zip Code 1', 'City 1');
        
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const useCase = new UpdateCustomerUseCase(customerRepository);

        const input = {
            id: customer.id,
            name: 'Customer Updated',
            address: {
                street: 'Street Updated',
                number: 1234,
                zipCode: 'Zip Updated',
                city: 'City Updated'
            }
        }

        const output = await useCase.execute(input);

        expect(output).toStrictEqual(input);
    });
    
})