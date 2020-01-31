/**  @type {import('node-telegram-bot-api')} */
const bot = use('Bot');
const _enum = require('./enum');
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const BOT_LINK = `t.me/${Env.getOrFail('BOT_NAME')}?start=`;
bot.onText(_enum.regex_state.refer, async msg => {
  let message = `اگه میخوای سوالای پزشکیت رو رایگان از پزشکان و متخصصان بپرسی کافیه توی این بات عضو شی \n\n 👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻 \n ${BOT_LINK +
    msg.chat.id}`;
  bot.sendMessage(msg.chat.id, message);
});
