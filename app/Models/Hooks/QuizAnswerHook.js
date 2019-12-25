'use strict';

const QuizAnswerHook = (exports = module.exports = {});
const User = use('App/Models/User');
const QuizAnswer = use('App/Models/QuizAnswer');
const Env = use('Env');
const CORRECT_ANSWER_COUNT = Env.getOrFail('CORRECT_ANSWER_COUNT');
QuizAnswerHook.afterCreate = async modelInstance => {
  if (modelInstance.is_correct) {
    let all_correct_answers = await QuizAnswer.query()
      .where({
        user_id: modelInstance.user_id,
        is_correct: 1
      })
      .getCount();
    if (all_correct_answers % CORRECT_ANSWER_COUNT == 0) {
      let user = await User.find(modelInstance.user_id);
      user.question_count += 1;
      user.save();
    }
  }
};
