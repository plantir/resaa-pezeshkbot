/**  @type {typeof import('node-telegram-bot-api')} */
const Bot = use('Bot');
const Env = use('Env');
const Token = Env.get('PEZESHK_BOT_TOKEN');
class PezeshkBot extends Bot {
  static get connection() {
    return 'pezeshk';
  }
  static get token() {
    return Token;
  }
}
module.exports = new PezeshkBot();
