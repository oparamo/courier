
const mockTopics = [{
  DefaultMessageTimeToLive: 'P10675199DT2H48M5.4775807S',
  MaxSizeInMegabytes: '1024',
  RequiresDuplicateDetection: 'false',
  DuplicateDetectionHistoryTimeWindow: 'PT10M',
  EnableBatchedOperations: 'false',
  SizeInBytes: '15568',
  FilteringMessagesBeforePublishing: 'false',
  IsAnonymousAccessible: 'false',
  AuthorizationRules: '',
  Status: 'Active',
  CreatedAt: '2019-02-04T15:11:19.273Z',
  UpdatedAt: '2019-06-24T21:21:56.52Z',
  AccessedAt: '2019-06-24T21:24:31.537Z',
  SupportOrdering: 'false',
  CountDetails: {
    'd2p1:ActiveMessageCount': '0',
    'd2p1:DeadLetterMessageCount': '0',
    'd2p1:ScheduledMessageCount': '0',
    'd2p1:TransferMessageCount': '0',
    'd2p1:TransferDeadLetterMessageCount': '0'
  },
  SubscriptionCount: '6',
  AutoDeleteOnIdle: 'P10675199DT2H48M5.4775807S',
  EnablePartitioning: 'false',
  IsExpress: 'false',
  EntityAvailabilityStatus: 'Available',
  EnableSubscriptionPartitioning: 'false',
  EnableExpress: 'false',
  _: {
    ContentRootElement: 'TopicDescription',
    id: 'https://magic-school.servicebus.windows.net/com.courier.events?api-version=2016-07',
    title: 'com.courier.events',
    published: '2019-02-04T15:11:19Z',
    updated: '2019-06-24T21:21:56Z',
    author: { name: 'magic-school' },
    link: ''
  },
  TopicName: 'com.courier.events'
}, {
  DefaultMessageTimeToLive: 'P10675199DT2H48M5.4775807S',
  MaxSizeInMegabytes: '1024',
  RequiresDuplicateDetection: 'false',
  DuplicateDetectionHistoryTimeWindow: 'PT10M',
  EnableBatchedOperations: 'false',
  SizeInBytes: '0',
  FilteringMessagesBeforePublishing: 'false',
  IsAnonymousAccessible: 'false',
  AuthorizationRules: '',
  Status: 'Active',
  CreatedAt: '2019-02-05T22:19:29.18Z',
  UpdatedAt: '2019-06-14T18:27:35.84Z',
  AccessedAt: '2019-06-15T18:28:35.29Z',
  SupportOrdering: 'false',
  CountDetails: {
    'd2p1:ActiveMessageCount': '0',
    'd2p1:DeadLetterMessageCount': '0',
    'd2p1:ScheduledMessageCount': '0',
    'd2p1:TransferMessageCount': '0',
    'd2p1:TransferDeadLetterMessageCount': '0'
  },
  SubscriptionCount: '0',
  AutoDeleteOnIdle: 'P10675199DT2H48M5.4775807S',
  EnablePartitioning: 'false',
  IsExpress: 'false',
  EntityAvailabilityStatus: 'Available',
  EnableSubscriptionPartitioning: 'false',
  EnableExpress: 'false',
  _: {
    ContentRootElement: 'TopicDescription',
    id: 'https://magic-school.servicebus.windows.net/test.com.courier.events?api-version=2016-07',
    title: 'test.com.courier.events',
    published: '2019-02-05T22:19:29Z',
    updated: '2019-06-14T18:27:35Z',
    author: { name: 'magic-school' },
    link: ''
  },
  TopicName: 'test.com.courier.events'
}];

const mockSubscriptions = [{
  LockDuration: 'PT30S',
  RequiresSession: 'false',
  DefaultMessageTimeToLive: 'P14D',
  DeadLetteringOnMessageExpiration: 'false',
  DeadLetteringOnFilterEvaluationExceptions: 'false',
  MessageCount: '0',
  MaxDeliveryCount: '10',
  EnableBatchedOperations: 'false',
  Status: 'Active',
  CreatedAt: '2019-07-14T06:23:55.5967062Z',
  UpdatedAt: '2019-07-14T06:23:55.5967062Z',
  AccessedAt: '2019-07-14T06:23:55.597Z',
  CountDetails:
  {
    'd2p1:ActiveMessageCount': '0',
    'd2p1:DeadLetterMessageCount': '0',
    'd2p1:ScheduledMessageCount': '0',
    'd2p1:TransferMessageCount': '0',
    'd2p1:TransferDeadLetterMessageCount': '0'
  },
  AutoDeleteOnIdle: 'P10675199DT2H48M5.4775807S',
  EntityAvailabilityStatus: 'Available',
  _:
  {
    ContentRootElement: 'SubscriptionDescription',
    id:
      'https://magic-school.servicebus.windows.net/tc.tsp.events/Subscriptions/mySubscription?api-version=2016-07',
    title: 'mySubscription',
    published: '2019-07-14T06:23:55Z',
    updated: '2019-07-14T06:23:55Z',
    link: ''
  },
  TopicName: 'test.com.courier.events',
  SubscriptionName: 'mySubscription'
}];

const mockQueues = [{
  LockDuration: 'PT1M',
  MaxSizeInMegabytes: '1024',
  RequiresDuplicateDetection: 'false',
  RequiresSession: 'false',
  DefaultMessageTimeToLive: 'P10675199DT2H48M5.4775807S',
  DeadLetteringOnMessageExpiration: 'false',
  DuplicateDetectionHistoryTimeWindow: 'PT10M',
  MaxDeliveryCount: '10',
  EnableBatchedOperations: 'true',
  SizeInBytes: '0',
  MessageCount: '0',
  IsAnonymousAccessible: 'false',
  AuthorizationRules: '',
  Status: 'Active',
  CreatedAt: '2019-07-14T16:26:55.4968538Z',
  UpdatedAt: '2019-07-14T16:26:55.4968538Z',
  AccessedAt: '0001-01-01T00:00:00Z',
  SupportOrdering: 'true',
  CountDetails:
  {
    'd2p1:ActiveMessageCount': '0',
    'd2p1:DeadLetterMessageCount': '0',
    'd2p1:ScheduledMessageCount': '0',
    'd2p1:TransferMessageCount': '0',
    'd2p1:TransferDeadLetterMessageCount': '0'
  },
  AutoDeleteOnIdle: 'P10675199DT2H48M5.4775807S',
  EnablePartitioning: 'false',
  EntityAvailabilityStatus: 'Available',
  EnableExpress: 'false',
  _:
  {
    ContentRootElement: 'QueueDescription',
    id:
      'https://magic-school.servicebus.windows.net/myQueue?api-version=2016-07',
    title: 'myQueue',
    published: '2019-07-14T16:26:55Z',
    updated: '2019-07-14T16:26:55Z',
    author: { name: 'magic-school' },
    link: ''
  },
  QueueName: 'myQueue'
}];

export default { mockTopics, mockSubscriptions, mockQueues };
