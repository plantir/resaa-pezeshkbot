/**  @type {typeof import('node-telegram-bot-api')} */
const Bot = use('Bot');
const Env = use('Env');
const Token = Env.get('DOCTOR_BOT_TOKEN');
class DoctorBot extends Bot {
  static get connection() {
    return 'doctor';
  }
  static get token() {
    return Token;
  }
}
module.exports = new DoctorBot();
