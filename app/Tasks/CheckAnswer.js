'use strict';

const Task = use('Task');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const DoctorAnswer = use('App/Models/DoctorAnswer');

/** @type {import('moment')} */
const moment = use('moment');

/** @type {import('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');

class CheckAnswer extends Task {
  static get schedule() {
    return '40 * * * * *';
  }

  async handle() {
    try {
      const time = moment()
        .subtract(10, 'hours')
        .format('YYYY-MM-DD HH:mm:ss');
      const answers = await DoctorAnswer.query()
        .whereNull('answer')
        .where({ is_expired: 0 })
        .where('created_at', '<', time)
        .with('doctor')
        .fetch();
      for (let answer of answers.rows) {
        let answer_json = answer.toJSON();
        await bot.deleteMessage(
          answer_json.doctor.chat_id,
          answer_json.message_id
        );
        answer.is_expired = 1;
        await answer.save();
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = CheckAnswer;
