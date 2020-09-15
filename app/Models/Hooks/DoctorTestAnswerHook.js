'use strict';

const DoctorTestAnswerHook = (exports = module.exports = {});

DoctorTestAnswerHook.afterFetch = async (modelInstanceArray) => {
  for (let item of modelInstanceArray) {
    item.answer = item.answer.map((answer) => {
      if (answer.photo) {
        answer.photo = answer.photo.replace('./tmp', '/download');
      }
      return answer;
    });
  }
};
