
const DeviceManager = require('../src/DeviceManager');
const TCPIPProtocol = require('../src/TCPIPProtocol');
const TCPIPServerStub = require('../src/TCPIPServerStub');

describe('DeviceManager', () => 
{
    let deviceManager;
    let serverStub;

    beforeAll(() => 
    {
        serverStub = new TCPIPServerStub(3000);
    });

    afterAll(() => 
    {
        serverStub.close();
    });

    beforeEach(() => 
    {
        deviceManager = new DeviceManager();
    });

    afterEach(() => 
    {
        deviceManager.closeAll();
    });

    test('should add a device and connect to it', async () => 
    {
        await expect(deviceManager.addDevice('device1', 'localhost', 3000, new TCPIPProtocol())).resolves.not.toThrow();
    });

    test('should read from a device', async () => 
    {
        await deviceManager.addDevice('device1', 'localhost', 3000, new TCPIPProtocol());
        const data = await deviceManager.readFromDevice('device1');
        expect(data).toBe('TEST_DATA');
    }, 10000); // Increase timeout to 10 seconds
    

    test('should write to a device', async () => 
    {
        await deviceManager.addDevice('device1', 'localhost', 3000, new TCPIPProtocol());
        await expect(deviceManager.writeToDevice('device1', 'Hello')).resolves.not.toThrow();
    });

    test('should throw an error when reading from a non-existent device', async () => 
    {
        await expect(deviceManager.readFromDevice('nonexistent')).rejects.toThrow('Device nonexistent not found');
    });

    test('should throw an error when writing to a non-existent device', async () => 
    {
        await expect(deviceManager.writeToDevice('nonexistent', 'data')).rejects.toThrow('Device nonexistent not found');
    });
});
