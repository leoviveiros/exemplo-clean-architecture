import express, { Request, Response } from 'express';
import CreateProductUseCase from '@usecase/product/create/create.product.usecase';
import ListProductUseCase from '@usecase/product/list/list.product.usecase';
import ProductRepository from '@infra/product/repository/sequelize/product.repository';
import { InputCreateProductDto } from '@usecase/product/create/create.product.dto';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    try {
        const dto: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price,
        }

        const output = await useCase.execute(dto);

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get('/', async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const useCase = new ListProductUseCase(repository);

    try {
        const output = await useCase.execute({});

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});