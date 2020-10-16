'use strict';

const CoronaOrderHook = (exports = module.exports = {});

CoronaOrderHook.afterCreate = async (modelInstance) => {
  let transaction = await modelInstance.transaction().create({
    amount: modelInstance.prepay_amount,
  });
  modelInstance.transaction_id = transaction.id;
  transaction.save();
};
