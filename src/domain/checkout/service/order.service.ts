import Order from '../entity/order';

import { randomUUID  } from 'crypto';
import Customer from '../../customer/entity/customer';
import OrderItem from '../entity/order-item';

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (!items || items.length === 0) {
            throw new Error("Items are required");
        }

        const order = new Order(randomUUID(), customer.id, items);

        customer.addRewardPoints(order.total / 2);

        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.total, 0);
    }
}