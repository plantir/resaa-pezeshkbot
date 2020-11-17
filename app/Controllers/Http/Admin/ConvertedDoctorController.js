'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Resource = use('Resource');
const CrawledDoctor = use('App/Models/CrawledDoctor');
class ConvertedDoctorController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/ConvertedDoctor');
  }
  async store({ response, request }) {
    let data = request.only(this.Model.allowField || []);
    let { crawled_doctor_id } = request.post();
    let item = await this.Model.create(data);
    await CrawledDoctor.query().where({ id: crawled_doctor_id }).update({
      converted_doctor_id: item.id,
    });
    response.status(201).send(item);
  }
}

module.exports = ConvertedDoctorController;
