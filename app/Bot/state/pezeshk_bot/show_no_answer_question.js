/** @type {import ('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const Speciality = use('App/Models/Speciality');

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const DoctorAnswer = use('App/Models/DoctorAnswer');

const { regex_state } = require('./enum');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

bot.onText(regex_state.no_answer_quistion, async msg => {
  try {
    let question = await DoctorAnswer.query()
      .where({ is_expired: 0 })
      .whereNull('answer')
      .whereHas('doctor', builder => builder.where({ chat_id: msg.chat.id }))
      .first();

    if (question) {
      return bot.sendMessage(
        msg.chat.id,
        'شما به این سوال هنوز پاسخ نداده اید',
        {
          reply_to_message_id: question.message_id
        }
      );
    }
    bot.sendMessage(msg.chat.id, 'شما سوال پاسخ داده نشده ندارید', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'برای امروز کافیه', callback_data: 'enough' },
            { text: 'سوال بعدی', callback_data: 'next_question' }
          ]
        ]
      }
    });
  } catch (error) {
    console.log(error);
  }
});
