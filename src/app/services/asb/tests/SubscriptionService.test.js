import ServiceBus from '../ServiceBus';
import ClientFactory from '../ServiceBusClientFactory';

// import Helper from './ServiceBusTestHelper';

require('dotenv').config();
const testNamespace = process.env.NAMESPACE;
const testTopicPath = process.env.TOPIC_PATH;
const testSubscriptionPath = process.env.SUBSCRIPTION_PATH;
const testQueue = process.env.QUEUE_PATH;

const testConnectionString = process.env.INTEGRATION_TEST_STRING;
ClientFactory.addNamespace(testConnectionString);

// jest.mock('./ServiceBusClientFactory');

describe('ServiceBus Service', () => {
  let mockTopics;

  beforeEach(() => {
    // mockTopics = Helper.mockTopics;

    jest.resetAllMocks();
  });

  describe('getSubscription', () => {
    xit('should get a subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      // act
      const subscription = await ServiceBus.getSubscription(namespace, topicPath, subscriptionPath);
      console.log(subscription);
    });
  });

  describe('listSubscriptions', () => {
    xit('should list the subscriptions in a topic', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;

      // act
      const subscriptions = await ServiceBus.getSubscriptions(namespace, topicPath);
      console.log(subscriptions);
    });
  });

  describe('createSubscription', () => {
    xit('should create a new subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      // act
      const subscription = await ServiceBus.createSubscription(namespace, topicPath, subscriptionPath);
      console.log(subscription);
    });
  });

  describe('deleteSubscription', () => {
    xit('should delete a subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      // act
      const subscription = await ServiceBus.deleteSubscription(namespace, topicPath, subscriptionPath);
      console.log(subscription);
    });
  });

  describe('listenToSubscription', () => {
    xit('should peek messages from a subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      // act
      const messages = await ServiceBus.peekOnSubscription(namespace, topicPath, subscriptionPath, 2);
      console.log(messages);
    });

    xit('should receive messages from a subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      const options = {
        maxMessageCount: 2,
        timeout: 3
      };

      // act
      const messages = await ServiceBus.receiveOnSubscription(namespace, topicPath, subscriptionPath, options);
      console.log(messages);
    });
  });

  describe('getSubscriptionRules', () => {
    xit('should get a list of rules on a subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      // act
      const rules = await ServiceBus.getSubscriptionRules(namespace, topicPath, subscriptionPath);
      console.log(rules);
    });
  });

  describe('addSubscriptionRule', () => {
    xit('should add a rule to a subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      const rule = {
        name: 'testRule',
        filter: 'RoutingKey IS NOT NULL'
      };

      // act
      await ServiceBus.addSubscriptionRule(namespace, topicPath, subscriptionPath, rule);
    });
  });

  describe('removeSubscriptionRule', () => {
    xit('should remove a rule from a subscription', async () => {
      // arrange
      const namespace = testNamespace;
      const topicPath = testTopicPath;
      const subscriptionPath = testSubscriptionPath;

      // act
      await ServiceBus.removeSubscriptionRule(namespace, topicPath, subscriptionPath, '$Default');
    });
  });
});
