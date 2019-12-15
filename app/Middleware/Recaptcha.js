'use strict';
// let a = request()
const request = require('request');
const Env = use('Env');
class Role {
  async handle({ request, auth, response }, next, roles) {
    // call next to advance the request
    // const hostname = request.hostname();
    // if (hostname === 'localhost') {
    //   return await next();
    // }
    const { recaptcha } = request.post();
    try {
      await this._check_captcha(recaptcha);
    } catch (error) {
      throw new Error('captcha is wrong.');
    }
    await next();
  }

  _check_captcha(recaptcha) {
    const secret_key = Env.get('RECAPTCHA_SECRET');
    const request_option = {
      method: 'GET',
      uri: `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${recaptcha}`,
      json: true
    };
    return new Promise((resolve, reject) => {
      request(request_option, async (error, response, data) => {
        if (!data || !data.success) {
          return reject(false);
        }
        resolve(true);
      });
    });
  }
}

module.exports = Role;
