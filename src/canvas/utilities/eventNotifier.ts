class EventNotifier {
    handlers: Function[];

    constructor() {
        this.handlers = [];
    }

    subscribe(func) {
        this.handlers.push(func);
    }

    unsubscribe(func) {
        this.handlers = this.handlers.filter(item => item !== func);
    }

    notify(e = null) {
        this.handlers.forEach(item => item(e));
    }
}

export default EventNotifier;
