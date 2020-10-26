'use strict';
const Token = use('Token');
const CoronaOrderHook = (exports = module.exports = {});
const CoronaOrder = use('App/Models/CoronaOrder');
CoronaOrderHook.beforeCreate = async (modelInstance) => {
  modelInstance.guid = await generate_token(8);
  return modelInstance;
  // modelInstance.transaction_id = transaction.id;
  // transaction.save();
};
CoronaOrderHook.afterCreate = async (modelInstance) => {
  await modelInstance.transaction().create({
    amount: modelInstance.prepay_amount,
  });
  // modelInstance.transaction_id = transaction.id;
  // transaction.save();
};

async function generate_token(digits = 8) {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
