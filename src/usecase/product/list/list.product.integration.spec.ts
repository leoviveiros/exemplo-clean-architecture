import { Sequelize } from 'sequelize-typescript';
import ProductFactory from '@domain/product/factory/product.factory';
import ProductModel from '@infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '@infrastructure/product/repository/sequelize/product.repository';
import ListProductUseCase from './list.product.usecase';

describe('List Product UseCase Unit Test', () => {
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

    it('should return a list of products', async () => {
        const product1 = ProductFactory.createProduct('Product 1', 100);
        const product2 = ProductFactory.createProduct('Product 2', 200);

        const productRepository = new ProductRepository();

        await productRepository.create(product1);
        await productRepository.create(product2);

        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        expect(output.products).toHaveLength(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });

});