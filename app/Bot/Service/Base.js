const TelegramBot = require('node-telegram-bot-api');

/**  @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');
const Env = use('Env');
const BOT_MODE = Env.get('BOT_MODE');
class Bot extends TelegramBot {
  constructor() {
    super(null, {
      polling: BOT_MODE == 'polling' ? true : false,
    });
    this.token = this.constructor.token;
  }
  static get historyMode() {
    return false;
  }
  static get connection() {
    return 'pezeshk';
  }
  static get token() {
    throw new Error('you have to set token for bot');
  }
  sendError(id, error) {
    Logger.error(error);
    this.sendMessage(id, 'خطایی رخ داده است');
  }
  getUser(msg) {
    return User.get(msg, this.constructor.connection);
  }
  getOrCreateUser(msg) {
    return User.getOrCreate(msg, this.constructor.connection);
  }
  async sendMessage(chatId, text, body = {}, whith_history = true) {
    if (this.constructor.historyMode && whith_history) {
      let user = await this.getUser({ chat: { id: chatId } });
      user.history = user.history || [];
      user.history.push({
        state: user.state,
        text,
        body,
      });
      await User.update_redis(user);
    }
    return super.sendMessage(chatId, text, body);
  }
}

module.exports = Bot;
