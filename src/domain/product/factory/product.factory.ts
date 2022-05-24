import { randomUUID } from 'crypto';

import Product from '../entity/product';
import ProductInterface from '../entity/product.interface';

export default class ProductFactory {

    static createProduct(name: string, price: number): ProductInterface {
        return new Product(randomUUID(), name, price);
    }
    
}