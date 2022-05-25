import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create.customer.dto';

export class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(input.name, input.address.street, input.address.number, input.address.zipCode, input.address.city);

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zipCode: customer.address.zipCode,
                city: customer.address.city
            }
        };
    }
}