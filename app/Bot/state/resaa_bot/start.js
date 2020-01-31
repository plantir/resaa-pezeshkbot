const User = use('App/Models/User');
const bot = use('ResaaBot');
const { regex_state } = require('./enum');
const start_video =
  process.env.NODE_ENV === 'development'
    ? 'BAADBAAD0wUAAtRquVDOyHp6nv1negI'
    : 'BAADBAAD_QQAAnSf6FGNx82JyiDeDQI';

bot.onText(regex_state.start, async msg => {
  let user = await User.getOrCreate(msg);
  user.state = 0;
  await User.update_redis(user);

  // let user = new User(msg.chat.id);
  // user.reset_state_history();
  // user.state = _enum.state.start;
  let message = `به رسا خوش آمدید\nجهت آشنایی بیشتر با رسا این ویدیو رو تماشا نمایید`;
  let options = {
    reply_markup: {
      keyboard: [],
      resize_keyboard: true
    }
  };
  if (user.phone) {
    options.reply_markup.keyboard.push([
      {
        text: 'شارژ اعتبار رسا'
      }
    ]);
  }
  options.reply_markup.keyboard.push(
    ...[
      [
        {
          text: 'سوال پزشکی دارم'
        },
        {
          text: 'پرسش از پزشک خودم'
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
  await bot.sendVideo(msg.chat.id, start_video, options);
});
