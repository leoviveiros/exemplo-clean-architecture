import OrderItem from './order-item';

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, itens: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = itens;
        this._total = this._getTotal();

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    get total(): number {
        return this._total;
    }

    private validate(): void {
        if (!this._id || this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (!this._customerId || this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }

        if (!this._items || this._items.length === 0) {
            throw new Error("Items are required");
        }

        if (this._items.some((item) => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than 0");
        }
    }

    private _getTotal(): number {
        return this._items.reduce((acc, item) => acc + item.total, 0);
    }

    addItem(item: OrderItem): void {
        this._items.push(item);
        this._total = this._getTotal();
        this.validate();
    }

}