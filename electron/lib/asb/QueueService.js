import { get } from 'lodash';
import { Promise } from 'bluebird';
import { ReceiveMode } from '@azure/service-bus';

import ClientFactory from './ServiceBusClientFactory';

const getQueue = (namespace, queuePath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.getQueue(queuePath, (err, queue) => {
    if (err) {
      return reject(err);
    }

    return resolve(queue);
  });
});

const getQueues = (namespace) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.listQueues(namespace, (err, queues) => {
    if (err) {
      return reject(err);
    }

    return resolve(queues);
  });
});

const createQueue = (namespace, queuePath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.createQueue(queuePath, (err, queue) => {
    if (err) {
      return reject(err);
    }

    return resolve(queue);
  });
});

const deleteQueue = (namespace, queuePath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.deleteQueue(queuePath, (err) => {
    if (err) {
      return reject(err);
    }

    return resolve();
  });
});

const sendToQueue = (namespace, queuePath, messages) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const queueClient = client.createQueueClient(queuePath);
  const sender = queueClient.createSender();

  if (Array.isArray(messages)) {
    await sender.sendBatch(messages);
  } else {
    await sender.send(messages);
  }

  await queueClient.close();

  return resolve();
});

const peekOnQueue = (namespace, queuePath, maxMessageCount) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const queueClient = client.createQueueClient(queuePath);
  const messages = await queueClient.peek(maxMessageCount);

  await queueClient.close();

  return resolve(messages);
});

const receiveOnQueue = (namespace, queuePath, options) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const queueClient = client.createQueueClient(queuePath);
  const receiver = queueClient.createReceiver(ReceiveMode.receiveAndDelete);

  const maxMessageCount = get(options, 'maxMessageCount', 5);
  const timeout = get(options, 'timeout', 5);
  const messages = receiver.receiveMessages(maxMessageCount, timeout);

  await queueClient.close();

  return resolve(messages);
});

export { getQueue, getQueues, createQueue, deleteQueue, sendToQueue, peekOnQueue, receiveOnQueue };
export default { getQueue, getQueues, createQueue, deleteQueue, sendToQueue, peekOnQueue, receiveOnQueue };
