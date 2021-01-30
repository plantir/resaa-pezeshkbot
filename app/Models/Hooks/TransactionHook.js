'use strict';

const TransactionHook = (exports = module.exports = {});
const CheckupOrder = use('App/Models/CheckupOrder');
const Event = use('Event');
TransactionHook.afterSave = async (modelInstance) => {
  if (modelInstance.status == 'paid') {
    let order = await CheckupOrder.query()
      .where({ transaction_id: modelInstance.id })
      .first();
    if (order) {
      Event.fire('new::order', order);
    }
  }
};
