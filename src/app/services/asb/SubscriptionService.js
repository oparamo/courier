import { Promise } from 'bluebird';
import { ReceiveMode } from '@azure/service-bus';
import { get } from 'lodash';

import ClientFactory from './ServiceBusClientFactory';

const getSub = (namespace, topicPath, subscriptionPath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  client.getSubscription(topicPath, subscriptionPath, (err, subscription) => {
    if (err) {
      return reject(err);
    }

    return resolve(subscription);
  });
});

const getSubs = (namespace, topicPath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  client.listSubscriptions(topicPath, (err, subscriptions) => {
    if (err) {
      return reject(err);
    }

    return resolve(subscriptions);
  });
});

const createSub = (namespace, topicPath, subscriptionPath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  client.createSubscription(topicPath, subscriptionPath, (err, subscription) => {
    if (err) {
      return reject(err);
    }

    return resolve(subscription);
  });
});

const deleteSub = (namespace, topicPath, subscriptionPath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  client.deleteSubscription(topicPath, subscriptionPath, (err) => {
    if (err) {
      return reject(err);
    }

    return resolve();
  });
});

const peekOnSub = (namespace, topicPath, subscriptionPath, maxMessageCount) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const subscriptionClient = client.createSubscriptionClient(topicPath, subscriptionPath);
  const messages = await subscriptionClient.peek(maxMessageCount);

  await subscriptionClient.close();

  return resolve(messages);
});

const receiveOnSub = (namespace, topicPath, subscriptionPath, options) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const subscriptionClient = client.createSubscriptionClient(topicPath, subscriptionPath);
  const receiver = subscriptionClient.createReceiver(ReceiveMode.receiveAndDelete);

  const maxMessageCount = get(options, 'maxMessageCount', 5);
  const timeout = get(options, 'timeout', 5);
  const messages = receiver.receiveMessages(maxMessageCount, timeout);

  await subscriptionClient.close();

  return resolve(messages);
});

const getSubRules = (namespace, topicPath, subscriptionPath) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const subscriptionClient = client.createSubscriptionClient(topicPath, subscriptionPath);
  const rules = await subscriptionClient.getRules();

  await subscriptionClient.close();

  return resolve(rules);
});

const addSubRule = (namespace, topicPath, subscriptionPath, rule) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const subscriptionClient = client.createSubscriptionClient(topicPath, subscriptionPath);

  const { name, filter } = rule;
  await subscriptionClient.addRule(name, filter);

  await subscriptionClient.close();

  return resolve();
});

const removeSubRule = (namespace, topicPath, subscriptionPath, ruleName) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const subscriptionClient = client.createSubscriptionClient(topicPath, subscriptionPath);
  await subscriptionClient.removeRule(ruleName);

  await subscriptionClient.close();

  return resolve();
});

export default { getSub, getSubs, createSub, deleteSub, peekOnSub, receiveOnSub, getSubRules, addSubRule, removeSubRule };
