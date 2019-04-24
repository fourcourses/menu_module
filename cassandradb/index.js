const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'restaurantmenu',
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'safe',
  },
});

const MyModel = models.loadSchema('menu', {
  fields: {
    id: 'int',
    dishes: 'text',
    link: 'text',
  },
  key: ['id'],
});

MyModel.syncDB((err, result) => {
  if (err) throw err;
  console.log(result);
});

module.exports = models;
