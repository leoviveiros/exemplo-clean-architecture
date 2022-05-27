export interface InputListCustomerDto { }

export interface CustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
    };
}

export interface OutputListCustomerDto {
    customers: CustomerDto[];
}