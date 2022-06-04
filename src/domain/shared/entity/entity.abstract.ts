import Notification from '../notification/notification';

export default abstract class Entity {
    protected _id: string;
    protected notification: Notification;

    constructor() {
        this.notification = new Notification();
    }

    get id() {
        return this._id;
    }

}