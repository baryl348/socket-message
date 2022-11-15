const ws = require('ws');

class Server {
    ws; //websocket connect
    port; // port for connect
    constructor(
        port,
        options
    ) {
        this.#setPortConnection(port).then(
            this.ws = new ws.Server({
                port: this.port,
            }, console.log(`[WS]: server stated on port ${this.port}`))
        )  
    }

    async #setPortConnection (port) {
        if (!port) {
            this.port = 5100;
            return;
        }
        this.port = port;
    }

    startConnection() {
        this.ws.on('connection', (ws) => {
            ws.id = new Date.now(); // id for websocket connection users
            ws.on('message', (ms) => {
                ms = JSON.parse(ms);
                switch (ms.event) {
                    case 'message':
                        this.#broadcastMessage(ms, id);
                        break;
                    case 'connection':
                        this.#broadcastMessage(ms, id);
                        break;
                }
            })
        })
    }

    #broadcastMessage (ms, id) {
        // id for secure room
        this.ws.clients.forEach((client) => {
            if (client.id === id) {
                client.send(JSON.stringify(ms));
            }
        })
    }
}

export default Server;