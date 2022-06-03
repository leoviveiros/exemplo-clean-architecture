import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '@usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '@usecase/customer/list/list.customer.usecase';
import CustomerRepository from '@infra/customer/repository/sequelize/customer.repository';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const repository = new CustomerRepository();
    const useCase = new CreateCustomerUseCase(repository);

    try {
        const dto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zipCode: req.body.address.zipCode
            }
        }

        const output = await useCase.execute(dto);

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    const repository = new CustomerRepository();
    const useCase = new ListCustomerUseCase(repository);

    try {
        const output = await useCase.execute({});

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});