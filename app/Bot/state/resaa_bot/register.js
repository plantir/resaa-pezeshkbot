const User = use('App/Models/User');
const Doctor = use('App/Models/Doctor');

/** @type {import('node-telegram-bot-api')} */
const bot = use('ResaaBot');

bot.on('message', async msg => {
  if (!msg.contact) {
    return;
  }
  let cache_user = await bot.getUser(msg);
  let user = await User.find(cache_user.id);
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
    await bot.sendMessage(msg.chat.id, message, {}, false);
  } catch (error) {
    await bot.sendMessage(msg.chat.id, error, {}, false);
  }
  cache_user.phone = user.phone;
  await User.update_redis(cache_user);
  let doctor = cache_user.last_visit_doctor;
  if (!doctor) {
    options.reply_markup.keyboard.push([
      {
        text: 'بازگشت به خانه'
      }
    ]);
    return bot.sendMessage(msg.chat.id, 'لطفا انتخاب کنید', options, false);
  }
  Doctor.sned_profile({ user, doctor_id: doctor.subscriberNumber });
});
