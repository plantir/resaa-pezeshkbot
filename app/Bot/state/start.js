/**  @type {import('node-telegram-bot-api')} */

const bot = use('Bot');
const _enum = require('../config/enum');
/** @type { import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
// bot.sendMessage('@test_resaa', 'hi betch', {
//   reply_markup: {
//     inline_keyboard: [
//       [
//         {
//           text: 'پرتقال',
//           callback_data: 'پرتقال'
//         },
//         {
//           text: 'سیب',
//           callback_data: 'سیب'
//         }
//       ]
//     ]
//   }
// });
// bot.on('callback_query', callback => {
//   bot.sendMessage(callback.from.id, `جواب شما ${callback.data}`);

//   console.log(callback);
// });

bot.onText(/شروع|بازگشت به خانه|start/i, async msg => {
  // let user = new User(msg.chat.id)
  // user.reset_state_history()
  // user.state = _enum.state.start
  // let phone = await user.phone
  let user = await User.getOrCreate(msg);
  user.state = 0;
  await User.update_redis(user);
  let message = `به رسا خوش آمدید\nجهت آشنایی بیشتر با رسا این ویدیو رو تماشا نمایید`;

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
