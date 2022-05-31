import ProductFactory from '@domain/product/factory/product.factory';
import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface';
import ListProductUseCase from './list.product.usecase';

describe('List Product UseCase Unit Test', () => {
    const product1 = ProductFactory.createProduct('Product 1', 100);
    const product2 = ProductFactory.createProduct('Product 2', 200);

    const ProductMockRepository = (): ProductRepositoryInterface => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
        }
    };

    it('should return a list of products', async () => {
        const productRepository = ProductMockRepository();
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