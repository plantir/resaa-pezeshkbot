const User = use('App/Models/User');
const Doctor = use('App/Models/Doctor');
const bot = use('ResaaBot');
const resaa_url = 'https://resaa.net';
bot.onText(/شارژ اعتبار رسا/, async msg => {
  let message = 'جهت شارژ اعتبار خود یکی از مبالغ زیر را انتخاب نمایید';
  let options = {
    reply_markup: {
      inline_keyboard: []
    }
  };
  let user = await bot.getUser(msg);
  let amounts = [10000, 20000, 30000, 40000, 50000];
  for (let key in amounts) {
    options.reply_markup.inline_keyboard.push([
      {
        text: `${amounts[key]} تومان`,
        url: `${resaa_url}/charge?chargeId=${key}&mobile=${user.phone}&chat_id=${msg.chat.id}`
      }
    ]);
  }
  bot.sendMessage(msg.chat.id, message, options);
});
