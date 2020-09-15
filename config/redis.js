'use strict';

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env');

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: Env.get('REDIS_CONNECTION', 'local'),

  /*
  |--------------------------------------------------------------------------
  | local connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  // local: {
  //   host: '127.0.0.1',
  //   port: 6379,
  //   password: null,
  //   db: 0,
  //   keyPrefix: ''
  // },
  local: {
    host: Env.get('REDIS_HOST', 'localhost'),
    port: 6379,
    password: Env.get('REDIS_PASSWORD', null),
    db: 0,
    keyPrefix: 'bot_',
  },
  kue: {
    host: Env.get('REDIS_HOST', 'localhost'),
    port: 6379,
    password: Env.get('REDIS_PASSWORD', null),
    db: 0,
    keyPrefix: 'kue',
  },

  /*
  |--------------------------------------------------------------------------
  | cluster config
  |--------------------------------------------------------------------------
  |
  | Below is the configuration for the redis cluster.
  |
  */
  cluster: {
    clusters: [
      {
        host: Env.get('REDIS_HOST', 'localhost'),
        port: 6379,
        password: null,
        db: 0,
      },
      {
        host: Env.get('REDIS_HOST', 'localhost'),
        port: 6380,
        password: null,
        db: 0,
      },
    ],
  },
};
