import CustomerAddressChangedEvent from '../event/customer-address-changed.event';
import CustomerCreatedEvent from '../event/customer-created.event';
import EventDispatcherInterface from '../../shared/event/event-dispatcher.interface';
import Entity from '../../shared/entity/entity.abstract';
import Address from '../value-object/address';
import CustomerValidatorFactory from '../factory/customer.validator.factory';
import NotificationError from '../../shared/notification/notification.error';

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
export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
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
        CustomerValidatorFactory.create().validate(this);

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors);
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

    get name() {
        return this._name;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

}