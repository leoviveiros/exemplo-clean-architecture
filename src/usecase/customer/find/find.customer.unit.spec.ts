import Customer from '@domain/customer/entity/customer';
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repository.interface';
import Address from '@domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

describe("Find Customer UseCase Unit Test", () => { 
    
    const CustomerMockRepository = (): CustomerRepositoryInterface => {
        const customer = new Customer('123', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zip Code 1', 'City 1');
        customer.changeAddress(address);

        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn().mockResolvedValue(customer),
            findAll: jest.fn()
        }
    };

    it("should find a customer", async () => {
        const customerRepository = CustomerMockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: '123'
        }

        const output = {
            id: '123',
            name: 'Customer 1',
            address: {
                street: 'Street 1',
                number: 1,
                zipCode: 'Zip Code 1',
                city: 'City 1'
            }
        }

        const result = await useCase.execute(input);

        expect(result).toStrictEqual(output);
    });

    it("should throw an error when customer not found", async () => {
        const customerRepository = CustomerMockRepository();
        
        customerRepository.find = jest.fn().mockImplementation(() => {
            throw new Error('Customer not found');
        });
        
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: '123'
        }

        expect(useCase.execute(input)).rejects.toThrow('Customer not found');
    });
})