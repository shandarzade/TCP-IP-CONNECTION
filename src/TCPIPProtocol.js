// src/TCPIPProtocol.js
const Protocol = require('./Protocol');

class TCPIPProtocol extends Protocol {
    read(client) {
        return new Promise((resolve, reject) => {
            client.once('data', (data) => {
                resolve(data.toString());
            });

            client.once('error', (err) => {
                reject(err);
            });
        });
    }

    write(client, data) {
        return new Promise((resolve, reject) => {
            client.write(data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = TCPIPProtocol;
