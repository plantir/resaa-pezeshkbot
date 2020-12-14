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
    return '10 * * * * *';
  }

  async handle() {
    try {
      let retarget = await CoronaRetarget.find(1);
      if (!retarget || !retarget.is_active) {
        return;
      }
      await retarget.load('discount');
      retarget = retarget.toJSON();
      this.send_retarget(retarget);
    } catch (error) {
      console.log(error);
    }
  }
  async send_retarget(retarget) {
    let orders = await this.get_orders(retarget.minute);
    for (let order of orders) {
      let prevent_sent = await CoronaOrder.query()
        .where({ is_deleted: false })
        .where('created_at', '>', order.created_at)
        .first();
      if (prevent_sent) {
        continue;
      }
      this.send_patient_sms(order, retarget.discount);
    }
  }

  get_orders(minute = 30) {
    return new Promise(async (resolve, reject) => {
      try {
        let start_time = moment()
          .subtract(minute, 'minute')
          .second(0)
          .format('YYYY-MM-DD HH:mm:ss');
        let end_time = moment()
          .subtract(minute, 'minute')
          .second(59)
          .format('YYYY-MM-DD HH:mm:ss');
        let orders = await CoronaOrder.query()
          .whereBetween('created_at', [start_time, end_time])
          .where({ is_deleted: false })
          .whereHas('transaction', (builder) =>
            builder.where({ status: 'unpaid' })
          )
          .fetch();
        orders = orders.toJSON();
        resolve(orders);
      } catch (error) {
        console.log(error);
      }
    });
  }
  send_patient_sms(order, discount) {
    let data = {
      user_fullname: order.user_fullname,
      code: discount.code,
      amount: discount.amount / 1000,
    };
    let to = order.user_mobile;
    let template = 'sms.corona_retargetign';
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
