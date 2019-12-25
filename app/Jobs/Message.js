'use strict';
/** @type {import('node-telegram-bot-api')} */
const bot = use('Bot');

/** @type {typeof import('@adonisjs/redis/src/Redis')} */
const Redis = use('Redis');

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
  async handle(data) {
    try {
      await bot.sendMessage(data.user.chat_id, data.schedule.text);
      let schedule_success_count = 0;
      schedule_success_count = await Redis.get(
        `schedule_${data.schedule.id}_success`
      );
      schedule_success_count = +schedule_success_count + 1;
      await Redis.set(
        `schedule_${data.schedule.id}_success`,
        schedule_success_count
      );
    } catch (error) {
      let schedule_error_count = 0;
      schedule_error_count = await Redis.get(
        `schedule_${data.schedule.id}_error`
      );
      schedule_error_count = +schedule_error_count + 1;
      await Redis.set(
        `schedule_${data.schedule.id}_error`,
        schedule_error_count
      );
    }
  }
}

module.exports = Message;
