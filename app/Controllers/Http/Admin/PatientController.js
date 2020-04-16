'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Resource = use('Resource');

class PatientController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/Patient');
  }

  async store({ request }) {
    let data = request.only(this.Model.allowField);
    let patient = await this.Model.findBy({ mobile: data.mobile });
    if (patient) {
      throw new Error('کاربر با این شماره موبایل در سیستم وجود دارد');
    }
    return this.Model.create(data);
  }
}
module.exports = PatientController;
