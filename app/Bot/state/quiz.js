/** @type {import ('node-telegram-bot-api')} */
const bot = use('Bot');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {import('lodash')} */
const _ = use('lodash');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const CHANNEL_ID = Env.getOrFail('CHANNEL_ID');

// bot.sendMessage(CHANNEL_ID, 'کویز شماره ۱', {
//   reply_markup: {
//     inline_keyboard: [
//       [
//         {
//           text: 'پرتقال',
//           callback_data: 'quiz_true'
//         },
//         {
//           text: 'سیب',
//           callback_data: 'quiz_false'
//         }
//       ]
//     ]
//   }
// });

bot.on('callback_query', callback => {
  if (!callback.data.includes('quiz')) {
    return;
  }
  bot.sendMessage(
    callback.from.id,
    ` جواب شما به کویز شماره ۱ ${
      callback.data.includes('true') ? 'درست' : 'غلط'
    } بود  `
  );
});
