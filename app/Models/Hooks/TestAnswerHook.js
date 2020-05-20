'use strict';

const TestAnswerHook = (exports = module.exports = {});

TestAnswerHook.beforeCreate = async (modelInstance) => {
  modelInstance.doctor_answer = [];
};
