var TelegramBot = require('node-telegram-bot-api');
const Env = use('Env');
const token = Env.get('BOT_TOKEN');
class Bot extends TelegramBot {
  //   async sendMessage(chatId, text, body = {}, whith_history = true) {
  //     if (whith_history) {
  //       let user = new User(chatId);
  //       await user.push_history({
  //         text,
  //         body
  //       });
  //     }
  //     return super.sendMessage(chatId, text, body);
  //   }
  //   async sendPhoto(chatId, doctor_image_id, body = {}, whith_history = true) {
  //     if (whith_history) {
  //       let user = new User(chatId);
  //       await user.push_history({
  //         text: doctor_image_id,
  //         body
  //       });
  //     }
  //     return super.sendPhoto(chatId, doctor_image_id, body);
  //   }
}
var bot = new Bot(token, {
  polling: true
});

bot.on('message', async msg => {
  return bot.sendMessage(msg.chat.id, 'همه چی اوکیه دایی');
});
