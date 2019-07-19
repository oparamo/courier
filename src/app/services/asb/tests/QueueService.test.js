import ServiceBus from '../ServiceBus';
import ClientFactory from '../ServiceBusClientFactory';

// import Helper from './ServiceBusTestHelper';

// jest.mock('./ServiceBusClientFactory');

require('dotenv').config();

const testNamespace = process.env.NAMESPACE;
const testQueue = process.env.QUEUE_PATH;
const testConnectionString = process.env.INTEGRATION_TEST_STRING;

ClientFactory.addNamespace(testConnectionString);

describe('ServiceBus Service', () => {
  beforeEach(() => {
    // mockTopics = Helper.mockTopics;

    jest.resetAllMocks();
  });

  describe('getQueue', () => {
    xit('should get a queue', async () => {
      // arrange
      const namespace = testNamespace;
      const queuePath = testQueue;

      // act
      const queue = await ServiceBus.getQueue(namespace, queuePath);
      console.log(queue);
    });
  });

  describe('getQueues', () => {
    xit('should get a list of queues in a namespace', async () => {
      // arrange
      const namespace = testNamespace;

      // act
      const queues = await ServiceBus.getQueues(namespace);
      console.log(queues);
    });
  });

  describe('createQueue', () => {
    xit('should create a new queue', async () => {
      // arrange
      const namespace = testNamespace;
      const queuePath = testQueue;

      // act
      const queue = await ServiceBus.createQueue(namespace, queuePath);
      console.log(queue);
    });
  });

  describe('deleteQueue', () => {
    xit('should delete a queue', async () => {
      // arrange
      const namespace = testNamespace;
      const queuePath = testQueue;

      // act
      const queue = await ServiceBus.deleteQueue(namespace, queuePath);
      console.log(queue);
    });
  });

  describe('sendToQueue', () => {
    xit('should send a message to a queue', async () => {
      // arrange
      const namespace = testNamespace;
      const queuePath = testQueue;

      const message = {
        body: {
          thing: 'thing1',
          omg: 'lol'
        },
        contentType: 'application/json',
        userProperties: {
          thing: 'thingamajig',
          lol: 'omg'
        }
      };

      // act
      await ServiceBus.sendToQueue(namespace, queuePath, message);
    });

    xit('should send a batch of messages to a queue', async () => {
      // arrange
      const namespace = testNamespace;
      const queuePath = testQueue;

      const messages = [{
        body: {
          thing: 'thing4',
          omg: 'lololol'
        },
        contentType: 'application/json',
        userProperties: {
          thing: 'thingamajig',
          lol: 'omg'
        }
      }, {
        body: {
          thing: 'thing4',
          omg: 'lol'
        },
        contentType: 'application/json',
        userProperties: {
          thing: 'thingamajig',
          lol: 'omg'
        }
      }];

      // act
      await ServiceBus.sendToQueue(namespace, queuePath, messages);
    });
  });

  describe('listenToQueue', () => {
    xit('should peek messages', async () => {
      // arrange
      const namespace = testNamespace;
      const queuePath = testQueue;

      // act
      const messages = await ServiceBus.peekOnQueue(namespace, queuePath, 2);
      console.log(messages);
    });

    xit('should receive messages', async () => {
      // arrange
      const namespace = testNamespace;
      const queuePath = testQueue;

      const options = {
        maxMessageCount: 2,
        timeout: 3
      };

      // act
      const messages = await ServiceBus.receiveOnQueue(namespace, queuePath, options);
      console.log(messages);
    });
  });
});
