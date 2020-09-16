/** @type {typeof import('../../../Models/User')} */
const User = use('App/Models/User');
const Doctor = use('App/Models/Doctor');
/**  @type {import('node-telegram-bot-api')} */
const bot = use('ResaaBot');

bot.onText(/بازگشت/, async (msg) => {
  if (msg.text == '🏠 بازگشت به خانه') {
    return;
  }
  let user = await bot.getUser(msg);
  user.history.pop();
  let last_state = user.history.pop();
  if (last_state) {
    user.state = last_state.state;
    await User.update_redis(user);
    if (last_state.body.caption && last_state.body.caption.includes('کد رسا')) {
      let matches = last_state.body.caption.match(/\d+/gm);
      let doctor_id = matches[0];
      return DoctorProvider.sned_doctor_profile(msg.chat.id, doctor_id);
    }
    bot.sendMessage(msg.chat.id, last_state.text, last_state.body);
  }
});
