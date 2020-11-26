'use strict';

const { rearg } = require('lodash');

const Task = use('Task');
const CoronaRetarget = use('App/Models/CoronaRetarget');
const CoronaOrder = use('App/Models/CoronaOrder');
const Bull = use('Rocketseat/Bull');
const SMS_Job = use('App/Jobs/Sms');
/** @type {import('moment')} */
const moment = use('moment');
class SendReminderSm extends Task {
  static get schedule() {
    return '10 0 * * * *';
  }

  async handle() {
    try {
      this.send_retarget();
    } catch (error) {
      console.log(error);
    }
  }
  async send_retarget() {
    let orders = await this.get_orders(54);
    for (let order of orders) {
      this.send_patient_sms(order);
    }
  }

  get_orders(hours = 54) {
    return new Promise(async (resolve, reject) => {
      try {
        let start_time = moment()
          .subtract(hours, 'hours')
          .minute(0)
          .second(0)
          .format('YYYY-MM-DD HH:mm:ss');
        let end_time = moment()
          .subtract(hours, 'hours')
          .minute(59)
          .second(59)
          .format('YYYY-MM-DD HH:mm:ss');
        let orders = await CoronaOrder.query()
          .whereBetween('created_at', [start_time, end_time])
          .where({ is_deleted: false })
          .where('status', '<>', 'canceled')
          .whereHas('transaction', (builder) =>
            builder.where({ status: 'paid' })
          )
          .fetch();
        orders = orders.toJSON();
        resolve(orders);
      } catch (error) {
        console.log(error);
      }
    });
  }
  send_patient_sms(order) {
    let data = {};
    let to = order.user_mobile;
    let template = 'sms.corona_answer';
    this.send_sms({ to, data, template });
  }
  send_sms({ to, data, template }) {
    Bull.add(SMS_Job.key, {
      template,
      to,
      data,
    });
  }
}

module.exports = SendReminderSm;
