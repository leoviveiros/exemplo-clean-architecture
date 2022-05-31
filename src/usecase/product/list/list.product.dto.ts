export interface InputListProductDto { }

export interface ProductDto {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductDto {
    products: ProductDto[];
}