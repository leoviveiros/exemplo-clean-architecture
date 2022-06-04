import Notification from './notification';

describe('Notification unit test', () => {

    it('should create errors', () => {
        const notification = new Notification();

        notification.addError({
            message: 'Error 1',
            context: 'context'
        });

        expect(notification.messages('context'))
            .toBe('context: Error 1');

        notification.addError({
            message: 'Error 2',
            context: 'context'
        });

        expect(notification.messages('context'))
            .toBe('context: Error 1, context: Error 2');

        notification.addError({
            message: 'Error 3',
            context: 'context2'
        });

        expect(notification.messages('context'))
            .toBe('context: Error 1, context: Error 2');
        
        expect(notification.messages())
            .toBe('context: Error 1, context: Error 2, context2: Error 3');
    });

    it('should check if notification has erros', () => {
        const notification = new Notification();

        expect(notification.hasErrors()).toBe(false);

        notification.addError({
            message: 'Error 1',
            context: 'context'
        });

        expect(notification.hasErrors()).toBe(true);
    });

    it('should get all error props', () => {
        const notification = new Notification();

        const error = {
            message: 'Error 1',
            context: 'context'
        };

        notification.addError(error);

        expect(notification.errors).toEqual([error]);
    });

});