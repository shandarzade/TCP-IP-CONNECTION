
class Protocol {
    read(client) {
        throw new Error('Method not implemented.');
    }

    write(client, data) {
        throw new Error('Method not implemented.');
    }

    handleData(data) {
        // This can be overridden to handle incoming data
    }
}

module.exports = Protocol;
