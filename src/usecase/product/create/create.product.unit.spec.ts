import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface';
import CreateProductUseCase from './create.product.usecase';

describe("Create Product UseCase Unit Test", () => {

    const ProductMockRepository = (): ProductRepositoryInterface => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    };

    it("should create a product", async () => {
        const productRepository = ProductMockRepository();
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

    it("should throw an error when name is missing", async () => {
        const productRepository = ProductMockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100
        }

        expect(useCase.execute(input)).rejects.toThrow('Name is required');
    });

    it("should throw an error when price is zero", async () => {
        const productRepository = ProductMockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product 1",
            price: 0
        }

        expect(useCase.execute(input)).rejects.toThrow('Price must be greater than zero');
    });

});