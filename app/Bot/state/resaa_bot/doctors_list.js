const User = use('App/Models/User');
const Doctor = use('App/Models/Doctor');
const Speciality = use('App/Models/Speciality');
const bot = use('ResaaBot');
const _enum = require('./enum');
const _ = use('lodash');
bot.on('message', async msg => {
  let user = await User.get(msg);
  if (user.state != _enum.state.specialities) {
    return;
  }
  let speciality = await Speciality.findBy({ title: msg.text });
  if (!speciality) {
    return;
  }
  user.state = _enum.state.select_doctor;
  await User.update_redis(user);
  let doctors = await Doctor.search({
    specialtyId: speciality.id
  });
  let message = `لیست پزشکان متخصص ${msg.text}`;
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true
    }
  };
  doctors.forEach((doctor, index) => {
    let text = `${doctor.subscriberNumber} ${doctor.firstName} ${doctor.lastName}`;
    if (index % 2 === 0) {
      options.reply_markup.keyboard.push([
        {
          text
        }
      ]);
    } else {
      let i = Math.ceil(index / 2) - 1;

      options.reply_markup.keyboard[i].push({
        text
      });
    }
  });

  options.reply_markup.keyboard.push([
    {
      text: 'بازگشت'
    }
  ]);
  options.reply_markup.keyboard.push([
    {
      text: 'بازگشت به خانه'
    }
  ]);
  await bot.sendMessage(msg.chat.id, message, options);
});
