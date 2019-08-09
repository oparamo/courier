const { Promise } = require('bluebird');

const ClientFactory = require('./ServiceBusClientFactory');

const getTopic = (namespace, topicPath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.getTopic(topicPath, (err, topic) => {
    if (err) {
      return reject(err);
    }

    return resolve(topic);
  });
});

const getTopics = (namespace) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.listTopics((err, topics) => {
    if (err) {
      return reject(err);
    }

    return resolve(topics);
  });
});

// need to take a closer look at the options schema
const createTopic = (namespace, topicPath, topicOptions) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.createTopicIfNotExists(topicPath, topicOptions, (err) => {
    if (err) {
      return reject(err);
    }

    return resolve();
  });
});

const deleteTopic = (namespace, topicPath) => new Promise((resolve, reject) => {
  const client = ClientFactory.getRestClient(namespace);
  if (!client) {
    return reject();
  }

  return client.deleteTopic(topicPath, (err, topic) => {
    if (err) {
      return reject(err);
    }

    return resolve();
  });
});

// need to take a closer look at message schema
const sendToTopic = (namespace, topicPath, messages) => new Promise(async (resolve, reject) => {
  const client = ClientFactory.getAmqpClient(namespace);
  if (!client) {
    return reject();
  }

  const topicClient = client.createTopicClient(topicPath);
  const sender = topicClient.createSender();

  if (Array.isArray(messages)) {
    await sender.sendBatch(messages);
  } else {
    await sender.send(messages);
  }

  await topicClient.close();

  return resolve();
});

module.exports = { getTopic, getTopics, createTopic, deleteTopic, sendToTopic };
