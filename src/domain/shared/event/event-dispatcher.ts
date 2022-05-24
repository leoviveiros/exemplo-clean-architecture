import EventDispatcherInterface from './event-dispatcher.interface';
import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

type EventHandlerMap = Map<string, EventHandlerInterface<EventInterface>[]>;

export default class EventDispatcher implements EventDispatcherInterface {

    private _eventHandlers: EventHandlerMap = new Map();

    getEventHandlers(eventName: string): EventHandlerInterface<EventInterface>[] {
        return this._eventHandlers.get(eventName);
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if (this._eventHandlers.has(eventName)) {
            const handlers = this._eventHandlers.get(eventName);
            handlers.forEach(handler => handler.handle(event));
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this._eventHandlers.has(eventName)) {
            this._eventHandlers.set(eventName, []);
        }

        this._eventHandlers.get(eventName).push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (this._eventHandlers.has(eventName)) {
            const handlers = this._eventHandlers.get(eventName);
            const index = handlers.indexOf(eventHandler);

            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this._eventHandlers.clear();
    }

}