'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with quizzes
 */
const Resource = use('Resource');

/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

class QuizController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Quiz');
  }
  async send_test({ request, params: { id } }) {
    let { chat_id } = request.post();
    let quiz = await this.Model.find(id);
    let inline_keyboard = [];
    quiz.answers.map((item, index) => {
      let text = `${item.text}`;
      if (index % 2 === 0) {
        inline_keyboard.push([
          {
            text,
            callback_data: item.is_correct
              ? 'quiz_correct_answer'
              : 'quiz_wrong_answer'
          }
        ]);
      } else {
        let i = Math.ceil(index / 2) - 1;
        inline_keyboard[i].push({
          text,
          callback_data: item.is_correct
            ? 'quiz_correct_answer'
            : 'quiz_wrong_answer'
        });
      }
    });
    return bot.sendMessage(chat_id, quiz.question, {
      reply_markup: {
        inline_keyboard
      }
    });
  }
}

module.exports = QuizController;
