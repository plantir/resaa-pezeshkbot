'use strict';

const UserHook = (exports = module.exports = {});
const User = use('App/Models/User');
const Env = use('Env');
const INVITE_COUNT = Env.getOrFail('INVITE_COUNT');
/** @type {import ('node-telegram-bot-api')} */
const bot = use('PezeshkBot');

UserHook.beforeCreate = async (modelInstance) => {
  if (modelInstance.chat_id) {
    let is_exist = await User.query()
      .where({
        chat_id: modelInstance.chat_id,
      })
      .where({ bot_source: modelInstance.bot_source })
      .first();
    if (is_exist) {
      throw new Error('exist user');
    }
  }
};
UserHook.afterCreate = async (modelInstance) => {
  if (modelInstance.refer_by) {
    let all_referred_user_count = await User.query()
      .where({
        refer_by: modelInstance.refer_by,
      })
      .getCount();
    let referre = await User.find(modelInstance.refer_by);
    bot.sendMessage(
      referre.chat_id,
      ` یک دوست دیگر توسط شما عضو ربات پزشک رسا شد
      شما تاکنون ${all_referred_user_count} نفر را با موفقیت دعوت کرده اید 
      با دعوت و پیوستن هر ${INVITE_COUNT} نفر توسط شما 1 سوال رایگان هدیه می گیرید.`
    );

    if (all_referred_user_count % +INVITE_COUNT == 0) {
      referre.question_count += 1;
      referre.save();
    }
  }
};
