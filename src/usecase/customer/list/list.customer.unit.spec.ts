import CustomerFactory from '@domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repository.interface';
import ListCustomerUseCase from './list.customer.usecase';

describe('List Customer UseCase Unit Test', () => {
    const customer1 = CustomerFactory.createWithAddress(
        'John Doe',
        'Street 1', 1, '12345', 'City 1');

    const customer2 = CustomerFactory.createWithAddress(
        'Jane Doe',
        'Street 2', 2, '12389', 'City 2');

    const CustomerMockRepository = (): CustomerRepositoryInterface => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
        }
    };

    it('should return a list of customers', async () => {
        const customerRepository = CustomerMockRepository();
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