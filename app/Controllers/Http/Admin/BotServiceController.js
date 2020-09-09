'use strict';
const TestAnswer = use('App/Models/TestAnswer');
const DoctorTestAnswer = use('App/Models/DoctorTestAnswer');
/** @type {import('node-telegram-bot-api')} */
const ResaaBot = use('ResaaBot');
const User = use('App/Models/User');
class BotServiceController {
  async tests({ response }) {
    let results = await TestAnswer.query()
      .with('user', (builder) => builder.setVisible(['id', 'chat_id', 'phone']))
      .where({ is_deleted: false })
      .where({ is_seen: false })
      .fetch();
    results = results.toJSON();
    results = results.map((item) => {
      let doctor = Object.assign({}, item.doctor);
      item.doctor = {
        subscriber_number: doctor.subscriberNumber,
      };
      return item;
    });
    response.send(results);
    try {
      let ids = results.map((item) => item.id);
      await TestAnswer.query().update({ is_seen: true }).whereIn('id', ids);
    } catch (error) {
      console.log(error);
    }
  }
  async testResults({ response }) {
    let results = await DoctorTestAnswer.query()
      .where({ is_deleted: false })
      // .where({ is_seen: false })
      .fetch();
    results = results.toJSON();
    response.send(results);
    try {
      let ids = results.map((item) => item.id);
      await DoctorTestAnswer.query()
        .update({ is_seen: true })
        .whereIn('id', ids);
    } catch (error) {
      console.log(error);
    }
  }
  async sendTest({ request }) {
    let { doctor, price, files } = request.post();
    let user = {
      files,
    };
    try {
      let result = await TestAnswer.send({ doctor, user, price });
      await TestAnswer.query()
        .update({ is_confirm: true })
        .where({ id: result.tracking_code });
      return result;
    } catch (error) {
      return error;
    }
  }
  async sendTestResult({ request, response }) {
    let { answers, tracking_code, user_mobile } = request.post();

    try {
      let user = await User.query()
        .where({ phone: user_mobile })
        .where({ is_deleted: false })
        .where({ bot_source: 'resaa' })
        .first();
      if (!user) {
        throw new Error('user with this number not exist');
      }
      await DoctorTestAnswer.send({
        answers,
        tracking_code,
        chat_id: user.chat_id,
      });
      return 'Message send Successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = BotServiceController;
