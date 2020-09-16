const bot = use('ResaaBot');
const User = use('App/Models/User');

/** @type {typeof import('../../../Models/Doctor')} */
const Doctor = use('App/Models/Doctor');
const _enum = require('./enum');
bot.onText(/پرسش از پزشک خودم/, async (msg) => {
  let user = await bot.getUser(msg);
  user.state = _enum.state.search_doctor;
  await User.update_redis(user);
  let doctor = user.last_visit_doctor;
  let message = `نام یا کد رسا پزشک خود را وارد کنید`;
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true,
    },
  };
  if (doctor) {
    let text = `${doctor.subscriberNumber} ${doctor.firstName} ${doctor.lastName}`;
    options.reply_markup.keyboard.push([
      {
        text,
      },
    ]);
  }
  options.reply_markup.keyboard.push([
    {
      text: '🏠 بازگشت به خانه',
    },
  ]);

  bot.sendMessage(msg.chat.id, message, options);
});

bot.on('message', async (msg) => {
  let is_exist = Object.values(_enum.regex_state).some((item) => {
    return item.test(msg.text);
  });
  if (is_exist) {
    return;
  }
  let is_doctor = /[0-9]{4,4} ./g.test(msg.text);
  if (is_doctor) {
    return;
  }
  let user = await bot.getUser(msg);
  let doctors = [];
  if (user.state != _enum.state.search_doctor) {
    return;
  }
  // user.state = _enum.state.search_doctor;
  // await User.update_redis(user);
  let message = `نتایج جستجو برای پزشک ${msg.text}`;
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true,
    },
  };
  let is_code = /^[\d\u06F0-\u06F9]+$/.test(msg.text);
  if (is_code) {
    msg.text = msg.text.replace(/[۰-۹]/g, function (w) {
      var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return persian.indexOf(w);
    });
    doctors = await Doctor.search({
      code: msg.text,
    });
  } else {
    doctors = await Doctor.search({
      name: msg.text,
    });
  }
  doctors.forEach((doctor, index) => {
    let text = `${doctor.subscriberNumber} ${doctor.firstName} ${doctor.lastName}`;
    if (index % 2 === 0) {
      options.reply_markup.keyboard.push([
        {
          text,
        },
      ]);
    } else {
      let i = Math.ceil(index / 2) - 1;

      options.reply_markup.keyboard[i].push({
        text,
      });
    }
  });
  if (doctors.length === 0) {
    message = `نتیجه ای برای پزشک "${msg.text}" یافت نشد\nشما میتوانید از طریق تماس با پشتیبانی پزشک خود را به رسا اضافه کنید`;
    options.reply_markup.keyboard.push([
      {
        text: 'تماس با پشتیبانی برای اضافه شدن پزشک',
      },
    ]);
  }

  options.reply_markup.keyboard.push([
    {
      text: '🏠 بازگشت به خانه',
    },
  ]);

  bot.sendMessage(msg.chat.id, message, options);
});
