/**  @type {import('node-telegram-bot-api')} */

const bot = use('PezeshkBot');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Doctor = use('App/Models/Doctor');

bot.onText(/mychatid/, async msg => {
  bot.sendMessage(msg.chat.id, msg.chat.id);
});
bot.onText(/شروع|بازگشت به خانه|start/i, async msg => {
  // let user = new User(msg.chat.id)
  // user.reset_state_history()
  // user.state = _enum.state.start
  // let phone = await user.phone
  let doctor = await Doctor.findBy({ chat_id: msg.chat.id });
  if (doctor) {
    let message = `به رسا خوش آمدید`;
    /** @type {import ('node-telegram-bot-api').SendMessageOptions} */
    let options = {
      reply_markup: {
        keyboard: [],
        resize_keyboard: true
      }
    };
    options.reply_markup.keyboard.push(
      ...[
        [
          {
            text: 'مشاهده سوال پاسخ داده نشده'
          }
        ]
      ]
    );
    options.reply_markup.keyboard.push([
      {
        text: 'تماس با پشتیبانی'
      }
    ]);
    return bot.sendMessage(msg.chat.id, message, options);
  }
  let user = await User.getOrCreate(msg);
  user.state = 0;

  await User.update_redis(user);
  let message = `به رسا خوش آمدید`;

  /** @type {import ('node-telegram-bot-api').SendMessageOptions} */
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true
    }
  };
  options.reply_markup.keyboard.push(
    ...[
      [
        {
          text: 'سوال پزشکی دارم'
        },
        {
          text: 'دعوت از دوست'
        }
      ]
    ]
  );
  options.reply_markup.keyboard.push([
    {
      text: 'تماس با پشتیبانی'
    }
  ]);
  options.caption = message;
  await bot.sendMessage(msg.chat.id, message, options);
});
