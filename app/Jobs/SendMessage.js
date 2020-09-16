'use strict';
/** @type {import('fs')} */
const fs = use('fs');
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
    /** @type {import('node-telegram-bot-api')} */
    const bot = use('PezeshkBot');

    const ScheduleMessage = use('App/Models/ScheduleMessage');
    try {
      if (data.schedule.image) {
        let image = fs.createReadStream(
          data.schedule.image.replace('/api/download', './tmp/uploads')
        );
        await bot.sendPhoto(data.user.chat_id, image, {
          caption: data.schedule.text || '',
        });
      } else if (data.schedule.video) {
        let video = fs.createReadStream(
          data.schedule.video.replace('/api/download', './tmp/uploads', {
            caption: data.schedule.text || '',
          })
        );
        await bot.sendVideo(data.user.chat_id, video, {
          caption: data.schedule.text || '',
        });
      } else {
        await bot.sendMessage(data.user.chat_id, data.schedule.text);
      }
      await ScheduleMessage.query()
        .where({ id: data.schedule.id })
        .increment('success_count', 1);
    } catch (error) {
      await ScheduleMessage.query()
        .where({ id: data.schedule.id })
        .increment('fail_count', 1);
      throw new Error(error);
    }
  }

  // onCompleted(job, result) {
  //   console.log(job, result);
  // }
}

module.exports = Message;
