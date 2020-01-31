/**  @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/**  @type {import('node-telegram-bot-api')} */
const bot = use('Bot');
bot._sendMessage = bot.sendMessage;
bot._sendPhoto = bot.sendPhoto;
bot.connection('resaa_bot');
bot.sendMessage = async function(
  chatId,
  text,
  body = {},
  whith_history = true
) {
  if (whith_history) {
    let user = await User.get({ chat: { id: chatId } });
    user.history = user.history || [];
    user.history.push({
      state: user.state,
      text,
      body
    });
    await User.update_redis(user);
  }
  return bot._sendMessage(chatId, text, body);
};

// bot.sendPhoto = async function(
//   chatId,
//   doctor_image_id,
//   body = {},
//   whith_history = true
// ) {
//   if (whith_history) {
//     let user = await User.get({ chat: { id: chatId } });
//     user.history = user.history || [];
//     user.history.push({
//       state: user.state,
//       text: doctor_image_id,
//       body
//     });
//     await User.update_redis(user);
//   }
//   return bot._sendPhoto(chatId, doctor_image_id, body);
// };

module.exports = bot;
