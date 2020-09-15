'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');
const axios = require('axios');
const moment = use('moment');
const fs = use('fs');
class DoctorTestAnswer extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
    this.addHook('afterFetch', 'DoctorTestAnswerHook.afterFetch');
  }

  static get jsonFields() {
    return ['answer'];
  }

  static send({ answers, tracking_code, chat_id }) {
    const ResaaBot = use('ResaaBot');

    return new Promise(async (resolve, reject) => {
      try {
        let title = `پاسخ پزشک به آزمایش شماره ${tracking_code}:\n\n ‼️توجه : شما نمیتوانید روی  این پیغام ریپلای کنید`;
        await ResaaBot.sendMessage(chat_id, title);
        if (!answers || !answers.length) {
          return reject('شما پاسخی برای ارسال به بیمار ارسال نکرده اید');
        }
        for (let msg of answers) {
          if (msg.text) {
            await ResaaBot.sendMessage(chat_id, `${msg.text}`, {});
          } else if (msg.voice) {
            let { data } = await axios.get(msg.voice, {
              responseType: 'stream',
            });
            await ResaaBot.sendVoice(chat_id, data, {});
          } else if (msg.photo) {
            let { data } = await axios.get(msg.photo, {
              responseType: 'stream',
            });
            await ResaaBot.sendPhoto(chat_id, data, {});
          } else if (msg.document) {
            let { data } = await axios.get(msg.document, {
              responseType: 'stream',
            });
            await ResaaBot.sendDocument(chat_id, data, {});
          }
        }
        await ResaaBot.sendMessage(
          chat_id,
          'لطفا رضایت خود از جواب آزمایش را اعلام کنید کنید',
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'راضی بودم',
                    callback_data: `test_answer:${tracking_code}:5`,
                  },
                  {
                    text: 'راضی نبودم',
                    callback_data: `test_answer:${tracking_code}:1`,
                  },
                ],
              ],
            },
          }
        );
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = DoctorTestAnswer;
