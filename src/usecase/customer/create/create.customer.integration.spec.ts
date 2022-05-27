import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import CreateCustomerUseCase from './create.customer.usecase';

describe("Find Customer UseCase Integration Test", () => { 
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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: 'Customer 1',
            address: {
                street: 'Street 1',
                number: 1,
                zipCode: 'Zip Code 1',
                city: 'City 1'
            }
        }

        const output = await useCase.execute(input);

        expect(output).toStrictEqual({
            id: expect.any(String),
            name: 'Customer 1',
            address: {
                street: 'Street 1',
                number: 1,
                zipCode: 'Zip Code 1',
                city: 'City 1'
            }
        });
    });
    
})