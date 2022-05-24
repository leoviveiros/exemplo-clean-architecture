import { randomUUID } from 'crypto';

import Customer from '../entity/customer';
import Address from '../value-object/address';

export default class CustomerFactory {

    static create(name: string): Customer {
        return new Customer(randomUUID(), name);
    }

    static createWithAddress(name: string, street: string, number: number, zipCode: string, city: string): Customer {
        const customer = this.create(name);
        const address = new Address(street, number, zipCode, city)

        customer.changeAddress(address);

        return customer;
    }

}