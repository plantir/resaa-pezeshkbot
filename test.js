// const Bot = require('node-telegram-bot-api');
// let bot = new Bot('646189637:AAFLDZMefpHpm8MQobqv468Vw0iBotLlYC8', {
//   polling: true
// });
// bot.on('message', msg => {
//   bot.sendMessage(msg.chat.id, 'hi');
// });

const axios = require('axios');

axios
  .get(
    'https://api.telegram.org/bot646189637:AAFLDZMefpHpm8MQobqv468Vw0iBotLlYC8/getUpdates',
    {
      timeout: 5000
    }
  )

  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
