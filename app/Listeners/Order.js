'use strict';

const Bull = use('Rocketseat/Bull');
const SMS_Job = use('App/Jobs/Sms');
const Order = (exports = module.exports = {});

Order.new = async (order) => {
  Bull.add(SMS_Job.key, {
    template: 'sms.prescriptOrderRequest',
    to: order.user_mobile,
    data: { name: 'کاربر' },
    is_fast: true,
  });
};
