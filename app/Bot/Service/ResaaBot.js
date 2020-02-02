/**  @type {typeof import('node-telegram-bot-api')} */
const Bot = use('Bot');
const Env = use('Env');
const Token = Env.get('RESAA_BOT_TOKEN');
class ResaaBot extends Bot {
  static get connection() {
    return 'resaa';
  }
  static get historyMode() {
    return true;
  }
  static get token() {
    return Token;
  }
}
module.exports = new ResaaBot();
