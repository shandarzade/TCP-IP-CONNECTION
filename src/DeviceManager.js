// src/DeviceManager.js
const Device = require('./Device');

class DeviceManager {
    constructor() {
        this.devices = new Map();
    }

    async addDevice(name, ip, port, protocol) {
        const device = new Device(ip, port, protocol);
        await device.connect();
        this.devices.set(name, device);
    }

    async readFromDevice(name) {
        const device = this.devices.get(name);
        if (!device) {
            throw new Error(`Device ${name} not found`);
        }
        return device.read();
    }

    async writeToDevice(name, data) {
        const device = this.devices.get(name);
        if (!device) {
            throw new Error(`Device ${name} not found`);
        }
        return device.write(data);
    }

    closeAll() {
        for (const device of this.devices.values()) {
            device.close();
        }
        this.devices.clear();
    }
}

module.exports = DeviceManager;
