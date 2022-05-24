import { Sequelize } from 'sequelize-typescript';
import Order from '../../../../domain/checkout/entity/order';

import OrderItem from '../../../../domain/checkout/entity/order-item';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

export default class OrderRepository implements OrderRepositoryInterface {

    constructor(private sequelize: Sequelize) { }

    private entityToModel(entity: Order) {
        return {
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total,
            items: entity.items.map(item => this.orderItemEntityToModel(item, entity.id))
        }
    }

    private orderItemEntityToModel(orderItem: OrderItem, order_id: string) {
        return {
            id: orderItem.id,
            order_id: order_id,
            product_id: orderItem.productId,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity
        }
    }

    private modelAsDomain(orderModel: OrderModel): Order {
        const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));

        return new Order(orderModel.id, orderModel.customer_id, orderItems);
    }

    async create(order: Order): Promise<void> {
        await OrderModel.create(this.entityToModel(order), {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(order: Order): Promise<void> {
        return this.sequelize.transaction(async transaction => {
            await OrderModel.update(this.entityToModel(order), {
                where: { id: order.id },
                transaction: transaction
            });

            await OrderItemModel.destroy({
                where: { order_id: order.id },
                transaction: transaction
            });

            const promises = order.items
                .map(orderItemEntity => this.orderItemEntityToModel(orderItemEntity, order.id))
                .map(orderItemModel => OrderItemModel.create(orderItemModel, { transaction: transaction }));

            await Promise.all(promises);
        });
    }

    async delete(id: string): Promise<void> {
        return this.sequelize.transaction(async transaction => {
            await OrderModel.destroy({
                where: { id: id },
                transaction: transaction
            });

            await OrderItemModel.destroy({
                where: { order_id: id },
                transaction: transaction
            });
        });
    }

    async find(id: string): Promise<Order> {
        let orderModel: OrderModel;

        try {
            orderModel = await OrderModel.findOne({ where: { id }, include: ['items'] });    
        } catch (error) {
            throw new Error('Order not found');
        }

        return this.modelAsDomain(orderModel);
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ['items'] });

        return orderModels.map(orderModel => this.modelAsDomain(orderModel));
    }
    
}