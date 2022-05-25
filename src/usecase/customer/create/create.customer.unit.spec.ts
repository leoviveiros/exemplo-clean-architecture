import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { CreateCustomerUseCase } from './create.customer.usecase';

describe("Create Customer UseCase Unit Test", () => {

    const CustomerMockRepository = (): CustomerRepositoryInterface => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    };

    it("should create a customer", async () => {
        const customerRepository = CustomerMockRepository();
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

    it("should throw an error when name is missing", async () => {
        const customerRepository = CustomerMockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "",
            address: {
                street: 'Street 1',
                number: 1,
                zipCode: 'Zip Code 1',
                city: 'City 1'
            }
        }

        expect(useCase.execute(input)).rejects.toThrow('Name is required');
    });

});