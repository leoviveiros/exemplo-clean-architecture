import Product from '@domain/product/entity/product';
import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface';
import FindProductUseCase from './find.product.usecase';

describe("Find Product UseCase Unit Test", () => {

    const ProductMockRepository = (): ProductRepositoryInterface => {
        const product = new Product('123', 'Product 1', 100)

        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn().mockResolvedValue(product),
            findAll: jest.fn()
        }
    };

    it("should find a product", async () => {
        const productRepository = ProductMockRepository();
        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: '123'
        }

        const output = {
            id: '123',
            name: 'Product 1',
            price: 100
        }

        const result = await useCase.execute(input);

        expect(result).toStrictEqual(output);
    });

    it("should throw an error when product not found", async () => {
        const productRepository = ProductMockRepository();

        productRepository.find = jest.fn().mockImplementation(() => {
            throw new Error('Product not found');
        });

        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: '123'
        }

        expect(useCase.execute(input)).rejects.toThrow('Product not found');
    });

})