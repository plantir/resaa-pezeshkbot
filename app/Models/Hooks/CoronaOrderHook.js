'use strict';
const Transaction = use("App/Models/Transaction")
const CoronaOrderHook = (exports = module.exports = {});
CoronaOrderHook.beforeCreate = async (modelInstance) => {
  modelInstance.guid = await generate_guid();
  return modelInstance;
};
CoronaOrderHook.afterCreate = async (modelInstance) => {
  console.log('object');
  let transaction = await Transaction.create({
    amount: modelInstance.prepay_amount,
    order_id:modelInstance.id
  });
  modelInstance.transaction_id = transaction.id;
  await modelInstance.save();
};

async function generate_guid() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
