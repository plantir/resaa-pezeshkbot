/**  @type {import('node-telegram-bot-api')} */

const bot = use('PezeshkBot');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Doctor = use('App/Models/Doctor');

bot.onText(/mychatid/, async (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id);
});
bot.onText(/شروع|بازگشت به خانه|start/i, async (msg) => {
  let doctor = await Doctor.findBy({ chat_id: msg.chat.id });
  if (doctor) {
    let message = `به رسا خوش آمدید`;
    /** @type {import ('node-telegram-bot-api').SendMessageOptions} */
    let options = {
      reply_markup: {
        keyboard: [],
        resize_keyboard: true,
      },
    };
    options.reply_markup.keyboard.push(
      ...[
        [
          {
            text: 'مشاهده سوال پاسخ داده نشده',
          },
        ],
      ]
    );
    options.reply_markup.keyboard.push([
      {
        text: 'تماس با پشتیبانی',
      },
    ]);
    return bot.sendMessage(msg.chat.id, message, options);
  }
  let user = await bot.getOrCreateUser(msg);
  user.state = 0;
  await User.update_redis(user);
  let message = `با سلام به رسا خوش آمدید\nبه کمک این ربات می توانید از ده ها پزشک و روانشناس متخصص سوالات پزشکی و روانشناسی خود را بپرسید.\nهمچنین از طریق سامانه رسا می توانید در تمامی ساعات شبانه روز با بیش از 700 پزشک و مشاور به صورت تلفنی بدون انتظار و معطلی صحبت کنید.  `;
  if (msg.text == 'بازگشت به خانه') {
    message = `برای پرسیدن سوال رایگان از پزشکان و مشاورین روی گزینه ی  "سوال پزشکی دارم" کلیک کنید.\nهمچنین با گزینه ی "دعوت از دوست" اگر کسی را می شناسید که دوست دارد سوالات پزشکی خود را به صورت رایگان از پزشکان متخصص یا مشاورین روانشناس معتبر بپرسد این ربات را به او معرفی کنید.`;
  }
  /** @type {import ('node-telegram-bot-api').SendMessageOptions} */
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true,
    },
  };
  options.reply_markup.keyboard.push(
    ...[
      [
        {
          text: 'سوال پزشکی دارم',
        },
        {
          text: 'دعوت از دوست',
        },
      ],
    ]
  );
  // options.reply_markup.keyboard.push([
  //   {
  //     text: 'تماس با پشتیبانی',
  //   },
  // ]);
  options.caption = message;
  await bot.sendMessage(msg.chat.id, message, options);
});
