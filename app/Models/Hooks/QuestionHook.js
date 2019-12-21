'use strict';

const QuestionHook = (exports = module.exports = {});
QuestionHook.afterCreate = async modelInstance => {
  let user = await modelInstance.user().fetch();
  user.question_count -= 1;
  user.save();
};
