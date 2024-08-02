/*
 * class Device contains following fields:
 *  ip      - ip address of a device
 *  port    - port at at which server is running
 *  protocol     
 *  client  
 */
const net = require('net');

class Device {
    constructor(ip, port, protocol) {
        this.ip = ip;
        this.port = port;
        this.protocol = protocol;
        this.client = new net.Socket();
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(this.port, this.ip, () => {
                console.log(`Connected to ${this.ip}:${this.port}`);
                resolve();
            });

            this.client.on('error', (err) => {
                reject(err);
            });

            this.client.on('data', (data) => {
                this.protocol.handleData(data);
            });
        });
    }

    read() {
        return this.protocol.read(this.client);
    }

    write(data) {
        return this.protocol.write(this.client, data);
    }

    close() {
        this.client.end();
    }
}

module.exports = Device;
