'use strict';
const Token = use('Token');
const ReservationHook = (exports = module.exports = {});

ReservationHook.beforeCreate = async (modelInstance) => {
  modelInstance.track_id = Token.uid();
};
