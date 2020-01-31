let t_bot = require('node-telegram-bot-api');

let bot1 = new t_bot('1038748008:AAFfVggn7myfXUnkfqUBEA-RzT6jO3LPaMo', {
  polling: true
});
let bot2 = new t_bot('465416748:AAEydD2N7i6Ga0ChGxE3L59ZOTVYDnIpeEk', {
  polling: true
});

bot1.onText(/start/, msg => {
  bot1.sendMessage(msg.chat.id, 'hi');
});
bot2.onText(/start/, msg => {
  bot2.sendMessage(msg.chat.id, 'hi');
});
