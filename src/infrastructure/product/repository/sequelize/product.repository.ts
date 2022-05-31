import Product from '@domain/product/entity/product';
import ProductInterface from '@domain/product/entity/product.interface';
import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface';
import ProductModel from './product.model';

export default class ProductRepository implements ProductRepositoryInterface {
    public async create(product: ProductInterface): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price
        });
    }
    public async update(product: ProductInterface): Promise<void> {
        await ProductModel.update({
            name: product.name,
            price: product.price
        }, { where: { id: product.id } });
    }

    public async delete(id: string): Promise<void> {
        await ProductModel.destroy({ where: { id } });
    }

    public async find(id: string): Promise<ProductInterface> {
        const productModel = await ProductModel.findOne({ where: { id } });

        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        );
    }

    public async findAll(): Promise<ProductInterface[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map(productModel => new Product(
            productModel.id,
            productModel.name,
            productModel.price
        ));
    }

}