import Notification, { NotificationErrorProps } from '../notification/notification';

export default abstract class Entity {
    protected _id: string;
    protected notification: Notification;

    constructor() {
        this.notification = new Notification();
    }

    get id() {
        return this._id;
    }

    public addNotificationError(error: NotificationErrorProps) {
        this.notification.addError(error);
    }

}