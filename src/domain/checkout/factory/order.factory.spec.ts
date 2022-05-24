import { randomUUID } from 'crypto';
import { OrderFactory, OrderFactoryProps } from './order.factory';

describe('Order Factory unit test', () => {
    
    it('should create an order', () => {
        const orderProps: OrderFactoryProps = {
            customerId: randomUUID(),
            items: [
                {
                    name: 'Product 1',
                    price: 10,
                    productId: randomUUID(),
                    quantity: 1
                },
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBeDefined();
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });

});