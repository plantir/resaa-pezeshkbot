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
  let token = Token.generate(digits);
  let exist_item = await CoronaOrder.findBy({ guid: token });
  if (exist_item) {
    return generate_token(digits);
  }
  return token;
}
