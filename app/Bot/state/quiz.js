/** @type {import ('node-telegram-bot-api')} */
const bot = use('Bot');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const QuizAnswer = use('App/Models/QuizAnswer');

const Env = use('Env');
const CORRECT_ANSWER_COUNT = Env.getOrFail('CORRECT_ANSWER_COUNT');
bot.on('callback_query', async callback => {
  if (!callback.data.includes('quiz')) {
    return;
  }
  let user = await User.get({ chat: callback.from });
  let quiz_id = callback.data.replace(/\D/g, '');
  let quiz_answer = await QuizAnswer.query()
    .where({ user_id: user.id })
    .where({ quiz_id: quiz_id })
    .first();
  if (quiz_answer) {
    return bot.sendMessage(
      callback.from.id,
      'شما قبلا به این کویز پاسخ داده اید'
    );
  }
  let is_correct = callback.data.includes('correct');
  await QuizAnswer.create({
    user_id: user.id,
    quiz_id,
    is_correct
  });
  let msg = ` جواب شما به کویز شماره ۱ ${is_correct ? 'درست' : 'غلط'} بود  \n`;
  let correct_count = await QuizAnswer.query()
    .where({
      user_id: user.id,
      is_correct: 1
    })
    .getCount();
  let need_more = correct_count % CORRECT_ANSWER_COUNT;
  if (need_more == 0) {
    msg += `تعداد پاسخ های صحیح شما به حد نصاب رسیده است و اکنون میتوانید ۱ سوال بیشتر از پزشکان رسا بپرسید`;
  } else {
    msg += `شما باید به ${need_more} کوییز دیگه پاسخ صحیح بدهید`;
  }
  await bot.sendMessage(callback.from.id, msg);
});
