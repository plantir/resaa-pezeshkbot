'use strict';
/** @type {import('node-telegram-bot-api')} */
const bot = use('Bot');
class Message {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'Message-job';
  }

  // This is where the work is done.
  async handle(data) {
    try {
      await bot.sendMessage(data.user.chat_id, data.schedule.text);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Message;
