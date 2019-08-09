const { assign, get } = require('lodash');
const { createServiceBusService } = require('azure');
const { ServiceBusClient } = require('@azure/service-bus');

const cache = {};

const addNamespace = (connectionString) => {
  const restClient = createServiceBusService(connectionString);
  if (!restClient) {
    throw Error('Could not initialize Service Bus client.');
  }

  const amqpClient = ServiceBusClient.createFromConnectionString(connectionString);
  if (!amqpClient) {
    throw Error('Could not initialize Service Bus client.');
  }

  const namespace = connectionString.slice(14, connectionString.indexOf('.servicebus'));
  const clients = { [namespace]: { amqpClient, restClient } };

  assign(cache, clients);
};

const getAmqpClient = (namespace) => get(cache, `${namespace}.amqpClient`, null);

const getRestClient = (namespace) => get(cache, `${namespace}.restClient`, null);

module.exports = { addNamespace, getAmqpClient, getRestClient };
