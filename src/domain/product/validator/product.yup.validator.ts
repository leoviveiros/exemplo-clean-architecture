import { object, string, number, ValidationError } from 'yup';

import ValidatorInterface from '../../shared/validator/validator.interface';
import Product from '../entity/product';

export default class ProductYupValidator implements ValidatorInterface<Product> {

    validate(product: Product): void {
        try {
            object().shape({
                id: string().required('Id is required'),
                name: string().required('Name is required'),
                price: number().moreThan(0, 'Price must be greater than zero')
            }).validateSync({
                id: product.id,
                name: product.name,
                price: product.price
            }, { abortEarly: false })
        } catch (errors) {
            const err = errors as ValidationError;

            err.errors.forEach(error => product.addNotificationError({
                context: 'product',
                message: error
            }));
        }
    }

}