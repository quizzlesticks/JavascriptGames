class SocketHandler {
    constructor() {
        this.socket = io();
    }

    emit(eventName, args) {
        this.socket.emit(eventName, args);
    }

    send(msg) {
        this.socket.send(msg);
    }

    get id() {
        return this.socket.id;
    }
}
