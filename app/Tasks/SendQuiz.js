'use strict';

const Task = use('Task');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use('App/Models/Quiz');

/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

/** @type {import('moment')} */
const moment = use('moment');

/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');

/** @type {import('fs')} */
const fs = use('fs');

const CHANNEL_ID = Env.getOrFail('CHANNEL_ID');
const SITE_URL = Env.getOrFail('SITE_URL');
class SendQuiz extends Task {
  static get schedule() {
    return '10 * * * * *';
  }

  async handle() {
    try {
      let start_date = moment().second(0).format('YYYY-MM-DD HH:mm:ss');
      let end_date = moment().second(59).format('YYYY-MM-DD HH:mm:ss');
      let quiz = await Quiz.query()
        .whereBetween('send_time', [start_date, end_date])
        .where({ is_posted: 0 })
        .where({ is_deleted: 0 })
        .first();
      if (!quiz) {
        return;
      }
      let inline_keyboard = [];
      quiz.answers.map((item, index) => {
        let text = `${item.text}`;
        if (index % 2 === 0) {
          inline_keyboard.push([
            {
              text,
              callback_data: item.is_correct
                ? `quiz${quiz.id}_correct_answer`
                : `quiz${quiz.id}_wrong_answer`,
            },
          ]);
        } else {
          let i = Math.ceil(index / 2) - 1;
          inline_keyboard[i].push({
            text,
            callback_data: item.is_correct
              ? `quiz${quiz.id}_correct_answer`
              : `quiz${quiz.id}_wrong_answer`,
          });
        }
      });
      let image = fs.createReadStream(
        quiz.image.replace('/api/download', './tmp/uploads')
      );
      await bot.sendPhoto(CHANNEL_ID, image, {
        caption: `${quiz.question}`,
        reply_markup: {
          inline_keyboard,
        },
      });
      quiz.is_posted = 1;
      await quiz.save();
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = SendQuiz;
