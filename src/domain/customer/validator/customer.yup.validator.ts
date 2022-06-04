import { object, string, ValidationError } from 'yup';

import ValidatorInterface from '../../shared/validator/validator.interface';
import Customer from '../entity/customer';

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    
    validate(customer: Customer): void {
        try {
            object().shape({
                id: string().required('Id is required'),
                name: string().required('Name is required')
            }).validateSync({
                id: customer.id,
                name: customer.name
            }, { abortEarly: false })
        } catch (errors) {
            const err = errors as ValidationError;
            
            err.errors.forEach(error => customer.addNotificationError({
                context: 'customer',
                message: error
            }));
        }
    }

}