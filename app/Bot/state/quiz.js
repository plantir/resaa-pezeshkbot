/** @type {import ('node-telegram-bot-api')} */
const bot = use('Bot');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const Speciality = use('App/Models/Speciality');

const _enum = require('../config/enum');

/** @type {import('lodash')} */
const _ = use('lodash');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const CHANNEL_ID = Env.getOrFail('CHANNEL_ID');
const CHANNEL_URL = Env.getOrFail('CHANNEL_URL');

bot.sendMessage(CHANNEL_ID, 'کویز شماره ۱', {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'پرتقال',
          callback_data: 'پرتقال'
        },
        {
          text: 'سیب',
          callback_data: 'سیب'
        }
      ]
    ]
  }
});

bot.on('callback_query', callback => {
  bot.sendMessage(
    callback.from.id,
    ` جواب شما به کویز شماره ۱ ${callback.data} بود و ${
      callback.data == 'سیب' ? 'درست' : 'غلط'
    } میباشد`
  );
});
