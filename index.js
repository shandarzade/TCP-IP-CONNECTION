

const DeviceManager = require('./src/DeviceManager');
const TCPIPProtocol = require('./src/TCPIPProtocol');
const TCPIPServerStub = require('./src/TCPIPServerStub');

const PORT = 12345; 
const serverStub = new TCPIPServerStub(PORT);

const deviceManager = new DeviceManager();

async function run() {
    try {
        
        await deviceManager.addDevice('testDevice', '127.0.0.1', PORT, new TCPIPProtocol());

        await deviceManager.writeToDevice('testDevice', 'Hello Device');

        const data = await deviceManager.readFromDevice('testDevice');
        console.log(`Received from device: ${data}`);

        deviceManager.closeAll();
    } catch (err) {
        console.error(`Error: ${err.message}`);
    } finally {
        await serverStub.close();
    }
}

run();
