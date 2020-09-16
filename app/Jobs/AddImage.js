'use strict';
const axios = require('axios');
/** @type {import('node-telegram-bot-api')}  */
const bot = use('ResaaBot');
const User = use('App/Models/User');
class AddImage {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'AddImage-job';
  }

  // This is where the work is done.
  async handle({ data: { msg, user } }) {
    user.files = user.files || [];
    if (user.files.length > 7) {
      return bot.sendMessage(
        msg.chat.id,
        `شما تا کنون ${files.length} فایل پیوست کرده اید تعداد حداکثر فایل های قابل پیوست ۸ عدد میباشد`
      );
    }
    let { file_id } = msg.photo.reverse()[0];
    let { data } = await axios.get(
      `https://api.telegram.org/bot${bot.token}/getFile?file_id=${file_id}`
    );

    return `https://api.telegram.org/file/bot${bot.token}/${data.result.file_path}`;
  }

  async onCompleted({ data: { msg } }, result) {
    let user = await bot.getUser(msg);
    user.files.push(result);
    await User.update_redis(user);
    let message = `شما تا کنون ${user.files.length} فایل پیوست کرده اید اگر فایل دیگری هم دارید ارسال کنید در غیر اینصورت بر روی دکمه اتمام کلیک کنید`;
    let options = {
      reply_markup: {
        keyboard: [],
        resize_keyboard: true,
      },
    };
    options.reply_markup.keyboard.push([
      {
        text: `اتمام`,
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: `حذف تمامی فایل ها و ارسال مجدد`,
      },
    ]);
    options.reply_markup.keyboard.push([
      {
        text: `🏠 بازگشت به خانه`,
      },
    ]);
    return bot.sendMessage(msg.chat.id, message, options);
  }
}

module.exports = AddImage;
