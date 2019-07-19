
import { getQueue, getQueues, createQueue, deleteQueue, sendToQueue, peekOnQueue, receiveOnQueue } from './QueueService';
import { getTopic, getTopics, createTopic, deleteTopic, sendToTopic } from './TopicService';
import { getSub, getSubs, createSub, deleteSub, peekOnSub, receiveOnSub, getSubRules, addSubRule, removeSubRule } from './SubscriptionService';

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
