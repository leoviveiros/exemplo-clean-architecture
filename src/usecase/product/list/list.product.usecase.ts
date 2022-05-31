
import ProductRepositoryInterface from '@domain/product/repository/product-repository.interface';
import ProductInterface from '@domain/product/entity/product.interface';
import { InputListProductDto, OutputListProductDto } from './list.product.dto';

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    public async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();

        return CustmerOutputMapper.toOutput(products);
    }
}

class CustmerOutputMapper {
    static toOutput(products: ProductInterface[]): OutputListProductDto {
        return {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }
    }
}