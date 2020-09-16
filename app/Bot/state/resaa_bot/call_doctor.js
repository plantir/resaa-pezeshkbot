const Doctor = use('App/Models/Doctor');
const bot = use('ResaaBot');
const _enum = require('./enum');
const resaa_url = 'https://resaa.net';
bot.onText(/تماس با دکتر *.*/, async (msg) => {
  let user = await bot.getUser(msg);
  let message = '';
  let options = {
    reply_markup: {
      inline_keyboard: [],
    },
  };
  if (user.state != _enum.state.doctor_detail) {
    return;
  }
  if (!user.phone) {
    message = `شما هنوز در رسا ثبت نام نکرده اید حهت ثبت نام روی دکمه ثبت نام کلیک کنید`;
    options.reply_markup.keyboard = [
      [
        {
          text: `ثبت نام`,
          request_contact: true,
        },
      ],
      [
        {
          text: '🏠 بازگشت به خانه',
        },
      ],
    ];

    return bot.sendMessage(msg.chat.id, message, options);
  }

  let doctor = await user.last_visit_doctor;
  let minute_array = doctor.specialty.id == 41 ? [5, 10, 15, 30] : [3, 5, 10];
  let {
    costPerMinute,
    duration,
    isFreeFirstCall,
  } = await Doctor.get_time_price(doctor.subscriberNumber, user.phone);
  if (isFreeFirstCall) {
    try {
      await Doctor.book(doctor.subscriberNumber, phone);
    } catch (error) {}
    return bot.sendMessage(
      msg.chat.id,
      `شما تماس اول را مهمان رسا هستید\nشما میتوانید به مدت ${duration} دقیقه با دکتر 🕐 ${doctor.firstName} ${doctor.lastName} صحبت کنید\nبرای برقراری تماس  با   شماره 02174471402 تماس حاصل نمایید`
    );
  }
  let amount_list = calc_amount(costPerMinute, minute_array);
  message = `هزینه تماس با دکتر ${doctor.firstName} ${doctor.lastName}`;
  message += `\n\nدر صورتی که مدت زمان مکالمه کمتر از این مقدار باشد پول در حساب شما میماند و میتوانید در تماس های بعدی از آن استفاده نمایید`;
  message += `\n\nدر صورت عدم برقراری ارتباط میتوانید با پشتیبانی تماس گرفته و درخواست استرداد وجه نمایید `;
  for (let item of amount_list) {
    options.reply_markup.inline_keyboard.push([
      {
        text: `${item.period} دقیقه ${item.amount} تومان`,
        url: `${resaa_url}/charge?mobile=${user.phone}&chat_id=${msg.chat.id}`,
      },
    ]);
  }
  await bot.sendMessage(msg.chat.id, message, options);
  try {
    await Doctor.book(doctor.subscriberNumber, phone);
  } catch (error) {}
  bot.sendMessage(
    msg.chat.id,
    `شما میتوانید به مدت ${duration} دقیقه 🕐  با دکتر ${doctor.firstName} ${doctor.lastName} صحبت کنید\nبرای برقراری تماس  با   شماره 02174471402 ☎️ تماس حاصل نمایید`,
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: '🏠 بازگشت به خانه',
            },
          ],
          [
            {
              text: 'بازگشت',
            },
          ],
        ],
        resize_keyboard: true,
      },
    },
    false
  );
  // bot.sendMessage(msg.chat.id, `شما میتوانید ${duration} دقیقه صحبت کنید`, {
  //   reply_markup: {
  //     keyboard: [
  //       [{
  //         text: 'تماس با پزشک'
  //       }],
  //       [{
  //         text: 'بازگشت'
  //       }],
  //       [{
  //         text: 'بازگشت به خانه'
  //       }]
  //     ],
  //     resize_keyboard: true
  //   }
  // })
});

function calc_amount(costPerMinute, minutes) {
  let amount_list = [];
  for (let min of minutes) {
    let amount = costPerMinute * min;
    if (amount < 10000) {
      amount = 10000;
    } else {
      amount = Math.ceil(amount / 5000) * 5000;
    }
    amount_list.push({
      period: min,
      amount,
    });
  }
  return amount_list;
}
