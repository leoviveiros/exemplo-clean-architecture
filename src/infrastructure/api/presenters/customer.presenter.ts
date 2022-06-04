import { toXML } from 'jstoxml';
import { OutputListCustomerDto } from '@usecase/customer/list/list.customer.dto';

export default class CustomerPresenter {

    public static listXML(dto: OutputListCustomerDto): string {
        const xmlOptions = {
            header: true,
            indent: '  ',
            newline: '\n',
            allowEmpty: true
        };

        const data = {
            customers: {
                customer: dto.customers.map(customer => ({
                    id: customer.id,
                    name: customer.name,
                    address: customer.address
                }))
            }
        }

        return toXML(data, xmlOptions);
    }

}