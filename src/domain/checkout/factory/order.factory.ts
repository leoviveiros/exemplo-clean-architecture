import { randomUUID } from 'crypto';

import Order from '../entity/order';
import OrderItem from '../entity/order-item';

export interface OrderItemProps {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface OrderFactoryProps {
    customerId: string;
    items: OrderItemProps[];
}

export class OrderFactory {

    public static create(props: OrderFactoryProps): Order {
        const items = props.items.map((item) => new OrderItem(randomUUID(), item.name, item.price, item.productId, item.quantity));

        return new Order(randomUUID(), props.customerId, items);
    }

}