/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');
const _enum = require('./enum');
const Speciality = use('App/Models/Speciality');
const User = use('App/Models/User');

/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');

bot.onText(_enum.regex_state.specialities, async (msg) => {
  try {
    let user = await bot.getUser(msg);

    let message = `لطفا ابتدا مشخص کنید سوال شما مربوط به کدام یک از تخصص های زیر می باشد\nاگر نمی دانید سوالتان به کدام تخصص مربوط می شود می توانید از پزشکان عمومی سوال بپرسید.  `;
    let options = {
      reply_markup: {
        keyboard: [],
        resize_keyboard: true,
      },
    };
    let specialities = await Speciality.get();
    specialities.forEach((item, index) => {
      let text = `${item.title} (${item.description})`;
      options.reply_markup.keyboard.push([
        {
          text,
        },
      ]);
      // if (index % 2 === 0) {
      // } else {
      //   let i = Math.ceil(index / 2) - 1;
      //   options.reply_markup.keyboard[i].push({
      //     text,
      //   });
      // }
    });
    options.reply_markup.keyboard.push([
      {
        text: '🏠 بازگشت به خانه',
      },
    ]);
    await bot.sendMessage(msg.chat.id, message, options);
    user.state = _enum.state.specialities;
    await User.update_redis(user);
  } catch (error) {
    Logger.error(error);
  }
});
