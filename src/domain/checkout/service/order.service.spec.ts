import Customer from '../../customer/entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';
import OrderService from './order.service';

describe('Order Service unit tests', () => {

    it('should get total of all orders', () => {
        const item1 = new OrderItem('1', 'Item1', 100, 'product1', 1);
        const item2 = new OrderItem('2', 'Item2', 200, 'product2', 2);

        const order1 = new Order('1', 'customer1', [item1]);
        const order2 = new Order('2', 'customer2', [item2]);

        const orders = [order1, order2];

        const total = OrderService.total(orders);

        expect(total).toBe(500);
    });

    it('shoul place an order', () => {
        const customer = new Customer('customer1', 'Customer1');
        const item1 = new OrderItem('1', 'Item1', 10, 'product1', 1);
        
        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total).toBe(10);
    });
});