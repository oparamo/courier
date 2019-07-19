import ServiceBus from '../ServiceBus';
import ClientFactory from '../ServiceBusClientFactory';

import Helper from './ServiceBusTestHelper';

jest.mock('../ServiceBusClientFactory');

describe('ServiceBus Service', () => {
  let mockTopics;

  beforeEach(() => {
    mockTopics = Helper.mockTopics;

    jest.resetAllMocks();
  });

  describe('getTopic', () => {
    it('should get a topic', async () => {
      // arrange
      const namespace = 'testNamespace';
      const topicPath = 'testTopicPath';

      ClientFactory.getRestClient.mockReturnValueOnce({ getTopic: (topicPath, cb) => cb(null, mockTopics[0]) });

      // act
      const topic = await ServiceBus.getTopic(namespace, topicPath);

      // assert
      expect(topic).toMatchObject(mockTopics[0]);
    });
  });

  describe('getTopics', () => {
    it('should get a list of topics in a namespace', async () => {
      // arrange
      const namespace = 'testNamespace';

      ClientFactory.getRestClient.mockReturnValueOnce({ listTopics: (cb) => cb(null, mockTopics) });

      // act
      const topics = await ServiceBus.getTopics(namespace);

      // assert
      expect(ClientFactory.getRestClient).toBeCalledWith(namespace);
      expect(topics).toMatchObject(mockTopics);
    });
  });

  describe('createTopic', () => {
    it('should create a new topic', async () => {
      // arrange
      const namespace = 'testNamespace';
      const topicPath = 'testTopicPath';

      ClientFactory.getRestClient.mockReturnValueOnce({
        createTopicIfNotExists: (topicPath, topicOptions, cb) => cb(null, true)
      });

      // act
      await ServiceBus.createTopic(namespace, topicPath, {});
    });
  });

  describe('deleteTopic', () => {
    it('should delete a topic', async () => {
      // arrange
      const namespace = 'testNamespace';
      const topicPath = 'testTopicPath';

      ClientFactory.getRestClient.mockReturnValueOnce({
        deleteTopic: (topicPath, cb) => cb(null, { isSuccesful: true })
      });

      // act
      await ServiceBus.deleteTopic(namespace, topicPath);
    });
  });

  describe('sendToTopic', () => {
    it('should send a message to a topic', async () => {
      // arrange
      const namespace = 'testNamespace';
      const topicPath = 'testTopicPath';

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

      ClientFactory.getAmqpClient.mockReturnValueOnce({
        createTopicClient: () => ({
          createSender: () => ({ send: jest.fn().mockResolvedValue() }),
          close: () => jest.fn().mockResolvedValue()
        })
      });

      // act
      await ServiceBus.sendToTopic(namespace, topicPath, message);
    });

    it('should send a batch of messages to a topic', async () => {
      // arrange
      const namespace = 'testNamespace';
      const topicPath = 'testTopicPath';

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

      ClientFactory.getAmqpClient.mockReturnValueOnce({
        createTopicClient: () => ({
          createSender: () => ({ sendBatch: jest.fn().mockResolvedValue() }),
          close: () => jest.fn().mockResolvedValue()
        })
      });

      // act
      await ServiceBus.sendToTopic(namespace, topicPath, messages);
    });
  });
});
