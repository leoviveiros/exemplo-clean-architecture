import { Sequelize } from 'sequelize-typescript';
import ProductFactory from '@domain/product/factory/product.factory';
import ProductModel from '@infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '@infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';

describe("Update Product UseCase Integration Test", () => { 
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

    it("should update a product", async () => {
        const product = ProductFactory.createProduct('Product 1', 100);
        
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: 'Product Updated',
            price: 200
        }

        const output = await useCase.execute(input);

        expect(output).toStrictEqual(input);
    });
    
})