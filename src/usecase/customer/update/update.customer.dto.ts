export interface InputUpdateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
    }
}

export interface OutputUpdateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
    }
}