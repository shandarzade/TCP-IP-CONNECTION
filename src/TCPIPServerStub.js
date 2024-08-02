
const net = require('net');

class TCPIPServerStub {
    constructor(port) {
        this.port = port;
        this.server = net.createServer((socket) => {
            socket.on('data', (data) => {
                console.log(`Received data: ${data}`);
                socket.write('TEST_DATA');
            });
        });

        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

    close() {
        return new Promise((resolve) => {
            this.server.close(() => {
                console.log(`Server on port ${this.port} closed.`);
                resolve();
            });
        });
    }
}

module.exports = TCPIPServerStub;
