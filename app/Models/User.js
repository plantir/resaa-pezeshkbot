'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {typeof import('@adonisjs/redis/src/Redis')} */
const Redis = use('Redis');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'UserHook.beforeCreate');
    this.addHook('afterCreate', 'UserHook.afterCreate');
  }
  static async get(msg) {
    let cached_user = await Redis.get(`user_${msg.chat.id}`);
    if (cached_user) {
      return JSON.parse(cached_user);
    }
    let user = await this.findBy({ chat_id: msg.chat.id });
    if (user) {
      await Redis.set(`user_${msg.chat.id}`, JSON.stringify(user));
      return user.toJSON();
    }
    return {};
  }
  static async getOrCreate(msg) {
    let cached_user = await Redis.get(`user_${msg.chat.id}`);
    if (cached_user) {
      return JSON.parse(cached_user);
    }
    let user = await this.findBy({ chat_id: msg.chat.id });
    if (!user) {
      let caller_id = msg.text.split(' ')[1];
      let caller_user;
      if (caller_id) {
        caller_user = await this.findBy({ chat_id: caller_id });
      }
      user = await User.create({
        chat_id: msg.chat.id,
        refer_by: caller_user ? caller_user.id : null,
        question_count: 1
      });
    }
    await Redis.set(`user_${msg.chat.id}`, JSON.stringify(user));
    return user.toJSON();
  }
  static update_redis(user) {
    return Redis.set(`user_${user.chat_id}`, JSON.stringify(user));
  }
}

module.exports = User;
