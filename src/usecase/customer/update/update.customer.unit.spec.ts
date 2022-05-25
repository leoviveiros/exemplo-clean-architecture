import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { UpdateCustomerUseCase } from './update.customer.usecase';

describe("Update Customer UseCase Unit Test", () => {

    const customer = CustomerFactory.createWithAddress('Customer 1', 'Street 1', 1, 'Zip Code 1', 'City 1');

    const CustomerMockRepository = (): CustomerRepositoryInterface => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn().mockResolvedValue(customer),
            findAll: jest.fn()
        }
    };

    it("should update a customer", async () => {
        const customerRepository = CustomerMockRepository();
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
});