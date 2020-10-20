'use strict';
const SMS = use('SMS');
//const User = use('App/Models/User');
class Sms {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'Sms-job';
  }

  // This is where the work is done.
  async handle({ data }) {
    let sms = SMS;
    if(!data.to){
      return true
    }
    return sms.send({
      view: data.template,
      data: data.data,
      to: data.to,
    });
  }
  onCompleted(job, result) {
    // console.log(job, result);
  }
  onError(job, result) {
    // console.log(job, result);
  }
}

module.exports = Sms;
