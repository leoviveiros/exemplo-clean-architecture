import { Sequelize } from 'sequelize-typescript';
import express, { Express } from 'express';

import CustomerModel from '@infra/customer/repository/sequelize/customer.model';
import ProductModel from '@infra/product/repository/sequelize/product.model';

import { customerRoute } from './routes/customer.route';
import { productRoute } from './routes/product.route';

export const app: Express = express();

app.use(express.json());
app.use('/customers', customerRoute);
app.use('/products', productRoute);

export let sequelize: Sequelize;

async function setupDB() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    await sequelize.addModels([
        CustomerModel,
        ProductModel
    ]);

    await sequelize.sync();
}

setupDB();