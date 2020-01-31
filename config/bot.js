'use strict';

const Env = use('Env');

module.exports = {
  // redis connection
  connection: 'pezeshk_bot',
  pezeshk_bot: {
    token: Env.get('PEZESHK_BOT_TOKEN')
  },
  resaa_bot: {
    token: Env.get('RESAA_BOT_TOKEN')
  },
  doctor_bot: {
    token: Env.get('DOCTOR_BOT_TOKEN')
  }
};
