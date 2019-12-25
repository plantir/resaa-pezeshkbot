'use strict';

const Task = use('Task');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use('App/Models/Quiz');

/** @type {import('node-telegram-bot-api')} */
const bot = use('Bot');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

const CHANNEL_ID = Env.getOrFail('CHANNEL_ID');

class SendQuiz extends Task {
  static get schedule() {
    return '0 * * * * *';
  }

  async handle() {
    try {
      let quiz = await Quiz.query()
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
                : `quiz${quiz.id}_wrong_answer`
            }
          ]);
        } else {
          let i = Math.ceil(index / 2) - 1;
          inline_keyboard[i].push({
            text,
            callback_data: item.is_correct
              ? `quiz${quiz.id}_correct_answer`
              : `quiz${quiz.id}_wrong_answer`
          });
        }
      });
      await bot.sendMessage(CHANNEL_ID, quiz.question, {
        reply_markup: {
          inline_keyboard
        }
      });
      quiz.is_posted = 1;
      await quiz.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SendQuiz;
