const Bot = require('node-telegram-bot-api');
let bot = new Bot('646189637:AAFLDZMefpHpm8MQobqv468Vw0iBotLlYC8', {
  polling: ture
});
bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'hi');
});
