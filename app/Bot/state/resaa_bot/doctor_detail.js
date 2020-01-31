const User = use('App/Models/User');
const Doctor = use('App/Models/Doctor');
const bot = use('ResaaBot');
bot.onText(/\d+/, async msg => {
  let doctor_id = +msg.text.replace(/[^\d+]/g, '');
  let user = await User.get(msg);
  let is_doctor = /[0-9]{4,4} ./g.test(msg.text);
  if (!is_doctor) {
    return;
  }
  return Doctor.sned_profile({ user, doctor_id });
});
