import { Sequelize } from 'sequelize-typescript';
import ProductModel from '@infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '@infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';

describe("Create Product UseCase Integration Test", () => { 
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            ProductModel
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input = {
            name: 'Product 1',
            price: 100
        }

        const output = await useCase.execute(input);

        expect(output).toStrictEqual({
            id: expect.any(String),
            name: 'Product 1',
            price: 100
        });
    });
    
})