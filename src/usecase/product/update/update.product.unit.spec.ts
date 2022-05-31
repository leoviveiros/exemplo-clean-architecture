import ProductFactory from '@domain/product/factory/product.factory';
import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface';
import UpdateProductUseCase from './update.product.usecase';

describe("Update Product UseCase Unit Test", () => {

    const product = ProductFactory.createProduct('Product 1', 100);

    const ProductMockRepository = (): ProductRepositoryInterface => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn().mockResolvedValue(product),
            findAll: jest.fn()
        }
    };

    it("should update a product", async () => {
        const productRepository = ProductMockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: 'Product Updated',
            price: 200
        }

        const output = await useCase.execute(input);

        expect(output).toStrictEqual(input);
    });

});