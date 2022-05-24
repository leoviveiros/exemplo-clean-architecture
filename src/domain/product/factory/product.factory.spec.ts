import ProductFactory from './product.factory';

describe('Product Factory unit tests', () => {
    
    it('should create a new product', () => {
        const product = ProductFactory.createProduct('Product 1', 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe('Product 1');
        expect(product.price).toBe(100);
    });

});