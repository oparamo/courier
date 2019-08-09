const { getQueue, getQueues, createQueue, deleteQueue, sendToQueue, peekOnQueue, receiveOnQueue } = require('./QueueService');
const { getSub, getSubs, createSub, deleteSub, peekOnSub, receiveOnSub, getSubRules, addSubRule, removeSubRule } = require('./SubscriptionService');
const { getTopic, getTopics, createTopic, deleteTopic, sendToTopic } = require('./TopicService');

module.exports = {
  getQueue,
  getQueues,
  createQueue,
  deleteQueue,
  sendToQueue,
  peekOnQueue,
  receiveOnQueue,

  getTopic,
  getTopics,
  createTopic,
  deleteTopic,
  sendToTopic,

  getSub,
  getSubs,
  createSub,
  deleteSub,
  peekOnSub,
  receiveOnSub,
  getSubRules,
  addSubRule,
  removeSubRule
};
