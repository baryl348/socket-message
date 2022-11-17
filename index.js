// const ws = require('websocket').server;
const http = require('http');
const https = require('https');
const eventEmitter = require('events').EventEmitter;
const url = require('url');
const crypto = require('crypto');

const PORT = 8081;

const protocolSeparators = [
    '(', ')', '<', '>', '@',
    ',', ';', ':', '\\', '\"',
    '/', '[', ']', '?', '=',
    '{', '}', ' ', String.fromCharCode(9)
];

const excludedTlsOptions = ['hostname', 'port', 'method', 'path', 'headers'];

const server = http.createServer((request, response) => {
    response.writeHead(404);
    response.end();
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${8081}`)
})


class WebSocketClient {
    constructor(options) {
        eventEmitter.call(this);
        this.options = {
            // максимальный размер 1 (frame)
            maxReceivedFrameSize: 0x100000,

            // максимальный размер сообщения 8 
            maxReceivedMessageSize: 0x800000,

            fragmentOutgoingMessages: true,

            // фрагментируется если превышает объем 16кб

            fragmentationThreshold: 0x4000,

            // версия протокола сокета 

            webSocketVersion: 13,

            // закрыть порт по истечению времени

            closedTimeout: 5000
        }
    }
}
