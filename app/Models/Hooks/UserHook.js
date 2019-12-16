'use strict';

const UserHook = (exports = module.exports = {});
const User = use('App/Models/User');
const Env = use('Env');
const INVITE_COUNT = Env.getOrFail('INVITE_COUNT');
UserHook.beforeCreate = async modelInstance => {
  if (modelInstance.chat_id) {
    let is_exist = await User.query()
      .where({
        chat_id: modelInstance.chat_id
      })
      .first();
    if (is_exist) {
      throw new Error('exist user');
    }
  }
};
UserHook.afterCreate = async modelInstance => {
  if (modelInstance.refer_by) {
    let all_referred_user_count = await User.query()
      .where({
        refer_by: modelInstance.refer_by
      })
      .getCount();
    if (all_referred_user_count % INVITE_COUNT == 0) {
      let user = await User.find(modelInstance.refer_by);
      user.question_count += 1;
      user.save();
    }
  }
};
