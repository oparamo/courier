import { getQueue, getQueues, createQueue, deleteQueue, sendToQueue, peekOnQueue, receiveOnQueue } from './QueueService';
import { getSub, getSubs, createSub, deleteSub, peekOnSub, receiveOnSub, getSubRules, addSubRule, removeSubRule } from './SubscriptionService';
import { getTopic, getTopics, createTopic, deleteTopic, sendToTopic } from './TopicService';

export {
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

export default {
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
