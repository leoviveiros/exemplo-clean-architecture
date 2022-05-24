import CustomerAddressChangedEvent from '../event/customer-address-changed.event';
import CustomerCreatedEvent from '../event/customer-created.event';
import EventDispatcherInterface from '../../shared/event/event-dispatcher.interface';
import Address from '../value-object/address';

/*
Complexidade de Negócio:
- domain (regras de negocio)
    - entity
        - customer.ts

Complexidade Acidental
- infra (mundo externo)
    - model
        - customer.ts (getters / setters)
*/
export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validade();
    }

    changeName(name: string) {
        this._name = name;

        this.validade();
    }

    changeAddress(address: Address) {
        this._address = address;

        this.validade();
    }

    activate() {
        if (!this._address) {
            throw new Error("Customer must have an address");
        }

        this._active = true;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    deactivate() {
        this._active = false;
    }

    isActive() {
        return this._active;
    }

    validade() {
        if (!this._id || this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (!this._name || this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    notifyCustomerCreated(eventDispatcher: EventDispatcherInterface) {
        const event = new CustomerCreatedEvent({
            id: this._id,
            name: this._name
        });

        eventDispatcher.notify(event);
    }

    notifyAddressChanged(eventDispatcher: EventDispatcherInterface) {
        const event = new CustomerAddressChangedEvent({
            id: this._id,
            name: this._name,
            address: this._address
        });

        eventDispatcher.notify(event);
    }

    get address() {
        return this._address;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

}