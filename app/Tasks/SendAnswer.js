'use strict';

const Task = use('Task');
/** @type {import('node-telegram-bot-api')} */
const ResaaBot = use('ResaaBot');
/** @type {typeof import('../../../Models/TestAnswer')} */
const TestAnswer = use('App/Models/TestAnswer');
/** @type {typeof import('moment')} */
const moment = use('moment');
const fs = use('fs');
const DoctorTestAnswer = use('App/Models/DoctorTestAnswer');

class SendAnswer extends Task {
  static get schedule() {
    return '0 * * * * *';
  }

  async handle() {
    let time = moment().subtract(5, 'minute').second(0);
    let test_answers = await TestAnswer.query()
      .where('answer_at', time.format('YYYY-MM-DD HH:mm:ss'))
      .with('user')
      .fetch();
    for (const test_answer of test_answers.rows) {
      try {
        await DoctorTestAnswer.create({
          tracking_code: test_answer.id,
          doctor_id: test_answer.doctor.subscriberNumber,
          answer: test_answer.doctor_answer,
        });
      } catch (error) {
        console.log(error);
      }
      let title = `پاسخ پزشک به آزمایش شماره ${test_answer.id}:\n\n ‼️توجه : شما نمیتوانید روی  این پیغام ریپلای کنید`;
      await ResaaBot.sendMessage(test_answer.$relations.user.chat_id, title);
      for (let msg of test_answer.doctor_answer) {
        if (msg.text) {
          await ResaaBot.sendMessage(
            test_answer.$relations.user.chat_id,
            `${msg.text}`,
            {}
          );
        } else if (msg.voice) {
          let voice = fs.createReadStream(msg.voice);
          await ResaaBot.sendVoice(
            test_answer.$relations.user.chat_id,
            voice,
            {}
          );
        } else if (msg.photo) {
          let photo = fs.createReadStream(msg.photo);
          await ResaaBot.sendPhoto(
            test_answer.$relations.user.chat_id,
            photo,
            {}
          );
        } else if (msg.document) {
          let document = fs.createReadStream(msg.document);
          await ResaaBot.sendDocument(
            test_answer.$relations.user.chat_id,
            document,
            {}
          );
        }
      }

      await ResaaBot.sendMessage(
        test_answer.$relations.user.chat_id,
        'لطفا رضایت خود از جواب آزمایش را اعلام کنید کنید',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'راضی بودم',
                  callback_data: `test_answer:${test_answer.id}:5`,
                },
                {
                  text: 'راضی نبودم',
                  callback_data: `test_answer:${test_answer.id}:1`,
                },
              ],
            ],
          },
        }
      );
      test_answer.status = 'sendToClient';
      await test_answer.save();
    }
  }
}

module.exports = SendAnswer;
