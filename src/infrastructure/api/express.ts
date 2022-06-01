import { Sequelize } from 'sequelize-typescript';
import express, { Express } from 'express';
import CustomerModel from '../customer/repository/sequelize/customer.model';

export const app: Express = express();

app.use(express.json());

export let sequelize: Sequelize;

async function setupDB() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    await sequelize.addModels([
        CustomerModel
    ]);

    await sequelize.sync();
}

setupDB();