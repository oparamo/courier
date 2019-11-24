const { getTopics } = require('../../lib/asb');
const { addNamespace } = require('../../lib/asb/ServiceBusClientFactory');

const handlers = {
  'add-namespace': ({ connectionString }) => addNamespace(connectionString),
  'get-topics': ({ namespace }) => getTopics(namespace)
};

module.exports = handlers;
