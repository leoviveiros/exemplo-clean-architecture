import Customer from '../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { InputListCustomerDto, OutputListCustomerDto } from './list.customer.dto';

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    public async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();

        return CustmerOutputMapper.toOutput(customers);
    }
}

class CustmerOutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zipCode: customer.address.zipCode,
                        city: customer.address.city
                    }
                }
            })
        }
    }
}