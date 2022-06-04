export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private readonly _errors: NotificationErrorProps[] = [];

    public addError(error: NotificationErrorProps) {
        this._errors.push(error);
    }

    public messages(contex?: string): string {
        return Notification.errorsToString(this._errors, contex);
    }

    public hasErrors(): boolean {
        return this._errors.length > 0;
    }

    get errors(): NotificationErrorProps[] {
        return this._errors;
    }

    public static errorsToString(errors: NotificationErrorProps[], contex?: string): string {
        return errors.filter(error => contex ? error.context === contex : true)
            .map(error => `${error.context}: ${error.message}`)
            .join(', ');
    }
}