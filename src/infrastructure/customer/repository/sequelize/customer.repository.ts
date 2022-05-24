import Address from '../../../../domain/customer/value-object/address';
import Customer from '../../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import CustomerModel from './customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {

    public async create(item: Customer): Promise<void> {
        await CustomerModel.create({
            id: item.id,
            name: item.name,
            active: item.isActive(),
            rewardPoints: item.rewardPoints,
            street: item.address.street,
            number: item.address.number,
            zipCode: item.address.zipCode,
            city: item.address.city
        });
    }

    public async update(item: Customer): Promise<void> {
        await CustomerModel.update({
            name: item.name,
            active: item.isActive(),
            rewardPoints: item.rewardPoints,
            street: item.address.street,
            number: item.address.number,
            zipCode: item.address.zipCode,
            city: item.address.city
        }, { where: { id: item.id } });
    }

    public async delete(id: string): Promise<void> {
        await CustomerModel.destroy({ where: { id } });
    }

    private modasAsDomain(customerModel: CustomerModel): Customer {
        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.number, customerModel.zipCode, customerModel.city);

        customer.changeAddress(address);
        customer.addRewardPoints(customerModel.rewardPoints);

        if (customerModel.active) {
            customer.activate();
        }

        return customer;
    }

    public async find(id: string): Promise<Customer> {
        let customerModel;
        
        try {
            customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
        } catch (error) {
            throw new Error('Customer not found');
        }

        return this.modasAsDomain(customerModel);
    }

    public async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map(customerModel => this.modasAsDomain(customerModel));
    }

}