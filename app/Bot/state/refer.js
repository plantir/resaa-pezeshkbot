/**  @type {import('node-telegram-bot-api')} */
const bot = use('Bot');
const _enum = require('../config/enum');
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const BOT_LINK = `t.me/${Env.getOrFail('BOT_NAME')}?start=`;
bot.onText(_enum.regex_state.refer, async msg => {
  //   bot.sendMessage(msg.chat.id, 'آره دوستت و دعوت کن');
  try {
    let caption = `+ : حوصلت سر رفته و نمیدونی چیکار کنی؟ ☹️

+ : دنبال یه دوست خوب میگردی واسه اینکه باهاش صحبت کنی؟😳

+ : پس بدو بیا تو  💕ZOOSK💕 🏃🏃🏃🏃

👇🏻👇🏼👇🏽👇🏾👇🏿
${BOT_LINK + msg.chat.id}`;
    await bot.sendMessage(
      msg.chat.id,
      `‼️به ازای هر کاربری که از طرف تو وارد ربات شه
    ${myConstant.coin.invite_coin} 💰 به حسابت واریز میشه.
    کافیه لینک زیر رو برای دوستات بفرستی
   👇🏻👇🏼👇🏽👇🏾👇🏿`
    );
    await bot.sendPhoto(chatId, myConstant.bot.logo, {
      caption: caption
    });
  } catch (error) {
    let message = `اگه می خوای تو یه محیط سالم و جذاب به راحتی صحبت کنی و قرار ملاقات بذاری کافیه روی لینک زیر کلیک کنی \n\n 👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻 \n ${BOT_LINK +
      msg.chat.id}`;
    bot.sendMessage(msg.chat.id, message);
  }
});
