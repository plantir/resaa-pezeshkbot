'use strict';

const { rearg, reject } = require('lodash');

const Task = use('Task');
const CoronaRetarget = use('App/Models/CoronaRetarget');
const CoronaOrder = use('App/Models/CoronaOrder');
const Bull = use('Rocketseat/Bull');
const SMS_Job = use('App/Jobs/Sms');
/** @type {import('moment')} */
const moment = use('moment');
class SendReminderSm extends Task {
  static get schedule() {
    return '10 * * * * *';
  }

  async handle() {
    try {
      await this.send_retarget(30);
      await this.send_retarget(54);
    } catch (error) {
      console.log(error);
    }
  }
  async send_retarget(hours) {
    return new Promise(async (resolve, reject) => {
      let orders = await this.get_orders(hours);
      for (let order of orders) {
        this.send_patient_sms(order);
      }
      resolve(true);
    });
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
        let query = CoronaOrder.query()
          .whereBetween('created_at', [start_time, end_time])
          .where({ is_deleted: false })
          .where('status', '<>', 'canceled')
          .whereHas('transaction', (builder) =>
            builder.where({ status: 'paid' })
          );
        // if (hours == 30) {
        //   query = query.whereHas('city', (builder) =>
        //     builder.where('name', 'like', '%فوری%')
        //   );
        // } else {
        //   query = query.whereDoesntHave('city', (builder) =>
        //     builder.where('name', 'like', '%فوری%')
        //   );
        // }
        let orders = await query.fetch();
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
