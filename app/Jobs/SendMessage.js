'use strict';
/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

const ScheduleMessage = use('App/Models/ScheduleMessage');
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
  async handle({ data }) {
    try {
      await bot.sendMessage(data.user.chat_id, data.schedule.text);
      await ScheduleMessage.query()
        .where({ id: data.schedule.id })
        .increment('success_count', 1);
    } catch (error) {
      await ScheduleMessage.query()
        .where({ id: data.schedule.id })
        .increment('fail_count', 1);
    }
  }

  onCompleted(job, result) {
    console.log(job, result);
  }
}

module.exports = Message;
