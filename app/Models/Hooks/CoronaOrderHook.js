'use strict';
const Token = use('Token')
const CoronaOrderHook = (exports = module.exports = {});

CoronaOrderHook.beforeCreate = async (modelInstance) => {
  modelInstance.guid = Token.generate(8)
  return modelInstance
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
