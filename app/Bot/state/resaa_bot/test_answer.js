const User = use('App/Models/User');
const TestAnswer = use('App/Models/TestAnswer');
const Doctor = use('App/Models/Doctor');
const Bull = use('Rocketseat/Bull');
const AddImage = use('App/Jobs/AddImage');
/** @type {import('node-telegram-bot-api')}  */
const bot = use('ResaaBot');
const _enum = require('./enum');
const axios = require('axios');
bot.onText(/ارسال جواب آزمایش/, async (msg) => {
  let message = '';
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true,
    },
  };

  let user = await bot.getUser(msg);
  let doctor = await user.last_visit_doctor;
  user.state = _enum.state.test_answer;
  await User.update_redis(user);
  let test_answer = await Doctor.request_test_answer(
    doctor.subscriberNumber,
    user.phone
  );
  if (test_answer.status === 'needMoney') {
    message = `در خواست شما نیاز به ${test_answer.request_price} تومان شارژ دارد و اعتبار شما کافی نمی‌باشد لطفا حساب خود را شارژ نمایید`;
    options.reply_markup.keyboard.push([
      {
        text: `شارژ اعتبار رسا`,
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: `بازگشت`,
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: `🏠 بازگشت به خانه`,
      },
    ]);

    return bot.sendMessage(msg.chat.id, message, options);
  } else if (test_answer.status === 'needTalk') {
    user.state = _enum.state.doctor_detail;
    message = `برای ارسال جواب آزمایش نیاز به هماهنگی قبلی با پزشک هست.\nشما در ۲۴ ساعت اخیر با این پزشک مکالمه ای نداشته اید لطفا ابتدا با پزشک خود مکالمه کنید سپس جواب آزمایش را ارسال نمایید`;
    options.reply_markup.keyboard.push([
      {
        text: `تماس با دکتر ${doctor.firstName} ${doctor.lastName}`,
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: `بازگشت`,
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: `🏠 بازگشت به خانه`,
      },
    ]);

    return bot.sendMessage(msg.chat.id, message, options);
  }
  user.files = [];
  await User.update_redis(user);
  message = `هزینه جواب آزمایش ${test_answer.request_price} تومان می باشد و در صورت ارسال فایل از شارژ رسا شما کم میشود\nدر صورت تایید عکس آزمایش خود را بفرستید`;
  options.reply_markup.keyboard.push([
    {
      text: `بازگشت`,
    },
  ]);
  options.reply_markup.keyboard.push([
    {
      text: `🏠 بازگشت به خانه`,
    },
  ]);
  bot.sendMessage(msg.chat.id, message, options);
});
bot.onText(/حذف تمامی فایل ها و ارسال مجدد/, async (msg) => {
  let user = await bot.getUser(msg);

  if (user.state != _enum.state.test_answer) {
    return;
  }
  user.files = [];
  await User.update_redis(user);
  let message = `همه فایل های ارسال شده پاک شده لطفا فایل خود رو مجددا ارسال نمایید`;
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true,
    },
  };
  options.reply_markup.keyboard.push([
    {
      text: `🏠 بازگشت به خانه`,
    },
  ]);

  return bot.sendMessage(msg.chat.id, message, options);
});
bot.on('photo', async (msg) => {
  let user = await bot.getUser(msg);
  let state = await user.state;
  if (state != _enum.state.test_answer) {
    return;
  }

  Bull.add(AddImage.key, {
    user,
    msg,
  });
  // user.files = user.files || [];
  // if (user.files.length > 7) {
  //   return bot.sendMessage(
  //     msg.chat.id,
  //     `شما تا کنون ${files.length} فایل پیوست کرده اید تعداد حداکثر فایل های قابل پیوست ۸ عدد میباشد`
  //   );
  // }
  // let { file_id } = msg.photo.reverse()[0];
  // let { data } = await axios.get(
  //   `https://api.telegram.org/bot${bot.token}/getFile?file_id=${file_id}`
  // );
  // user.files.push(
  //   `https://api.telegram.org/file/bot${bot.token}/${data.result.file_path}`
  // );
  // await User.update_redis(user);
  // let message = `شما تا کنون ${user.files.length} فایل پیوست کرده اید اگر فایل دیگری هم دارید ارسال کنید در غیر اینصورت بر روی دکمه اتمام کلیک کنید`;
  // let options = {
  //   reply_markup: {
  //     keyboard: [],
  //     resize_keyboard: true,
  //   },
  // };
  // options.reply_markup.keyboard.push([
  //   {
  //     text: `اتمام`,
  //   },
  // ]);
  // options.reply_markup.keyboard.push([
  //   {
  //     text: `حذف تمامی فایل ها و ارسال مجدد`,
  //   },
  // ]);
  // options.reply_markup.keyboard.push([
  //   {
  //     text: `🏠 بازگشت به خانه`,
  //   },
  // ]);
  // return bot.sendMessage(msg.chat.id, message, options);
});
bot.onText(/اتمام|تلاش مجدد/, async (msg) => {
  let user = await bot.getUser(msg);
  let doctor = await user.last_visit_doctor;
  let message;
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true,
    },
  };
  try {
    let test_answer = await Doctor.request_test_answer(
      doctor.subscriberNumber,
      user.phone
    );
    doctor.chat_id = test_answer.chat_id;
    let { tracking_code } = await TestAnswer.send({
      user,
      doctor,
      price: test_answer.request_price,
    });
    message = `جواب آزمایش شما با موفقیت برای دکتر ${doctor.firstName} ${doctor.lastName} ارسال شد\n کد پیگیری جواب آزمایش شما \n#${tracking_code}`;
    options.reply_markup.keyboard.push([
      {
        text: `🏠 بازگشت به خانه`,
      },
    ]);
    TestAnswer.confirm(doctor.subscriberNumber, tracking_code, user);
  } catch (error) {
    message = error;
    options.reply_markup.keyboard.push([
      {
        text: `تلاش مجدد`,
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: `🏠 بازگشت به خانه`,
      },
    ]);
  }

  bot.sendMessage(msg.chat.id, message, options);
  //   let user = new User(msg.chat.id);
  //   let { subscriberNumber } = await user.last_visit_doctor;
  //   let res = await Doctor.find(subscriberNumber);
  //   let doctor = res.result.doctor;

  //   let message;
  //   let options = {
  //     reply_markup: {
  //       keyboard: [],
  //       resize_keyboard: true
  //     }
  //   };
  //   try {
  //     let test_answer = await Doctor.request_test_answer(doctor_id, phone);
  //     let { tracking_code, count } = await user.send_testAnswer(
  //       test_answer.chat_id
  //     );
  //     let tracking_code = await user.send_testAnswer(38320614);
  //     message = `جواب آزمایش شما با موفقیت برای دکتر ${doctor.firstName} ${doctor.lastName} ارسال شد\n کد پیگیری جواب آزمایش شما ${tracking_code}`;
  //     options.reply_markup.keyboard.push([
  //       {
  //         text: `🏠 بازگشت به خانه`
  //       }
  //     ]);
  //   } catch (error) {
  //     message = error;
  //     options.reply_markup.keyboard.push([
  //       {
  //         text: `تلاش مجدد`
  //       }
  //     ]);
  //     options.reply_markup.keyboard.push([
  //       {
  //         text: `🏠 بازگشت به خانه`
  //       }
  //     ]);
  //   }

  //   bot.sendMessage(msg.chat.id, message, options);
});

bot.on('callback_query', async (callback) => {
  if (!callback.data.includes('test_answer')) {
    return;
  }
  let id = callback.data.split(':')[1];
  let rate = callback.data.split(':')[2];
  let test_answer = await TestAnswer.find(id);
  test_answer.user_satisfaction = rate;
  await test_answer.save();
  bot.sendMessage(callback.from.id, `نظر شما با موفقیت ثبت شد`);
  try {
    await bot.deleteMessage(callback.from.id, callback.message.message_id);
  } catch (error) {
    console.log(error);
  }
});
