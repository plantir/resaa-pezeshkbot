const User = use('App/Models/User');

/** @type {import('node-telegram-bot-api')} */
const bot = use('ResaaBot');

bot.on('message', async msg => {
  if (!msg.contact) {
    return;
  }
  let user = await User.findBy({ chat_id: msg.chat.id });
  let message = '';
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true
    }
  };
  let phone = msg.contact.phone_number.replace(/(\+98|98)/, '0');

  try {
    await user.register(phone);
    message = `ثبت نام با موفقیت انجام شد`;
    await bot.sendMessage(msg.chat.id, message);
  } catch (error) {
    await bot.sendMessage(msg.chat.id, error);
  }
  let cache_user = await User.get(msg);
  cache_user.phone = user.phone;
  await User.update_redis(cache_user);
  let doctor_id = user.last_visit_doctor;
  if (!doctor_id) {
    options.reply_markup.keyboard.push([
      {
        text: 'بازگشت به خانه'
      }
    ]);
    return bot.sendMessage(msg.chat.id, 'لطفا انتخاب کنید', options);
  }
  Doctor.sned_profiel({ user, doctor_id });
});
