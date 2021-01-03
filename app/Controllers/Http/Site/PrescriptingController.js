'use strict';
const Insurance = use('App/Models/Insurance');
const City = use('App/Models/City');
const PrescriptTest = use('App/Models/PrescriptTest');
const PrescriptOrder = use('App/Models/PrescriptOrder');
class PrescriptingController {
  async insurances() {
    return Insurance.query()
      .where({ is_deleted: false })
      .orderBy('sort_order', 'ASC')
      .fetch();
  }

  async cities() {
    return City.query()
      .where({ is_deleted: false })
      .orderBy('sort_order', 'ASC')
      .fetch();
  }

  async tests({ request }) {
    let { keyword, page = 1, perPage = 10 } = request.get();
    let query = PrescriptTest.query()
      .where({ is_deleted: false })
      .orderBy('sort_order', 'ASC');

    if (keyword) {
      query = query.where('name', 'like', `%${keyword}%`);
    }

    return query.paginate(page, perPage);
  }

  async createOrder({ request }) {
    let data = request.only([
      'user_mobile',
      'user_address',
      'images',
      'city_id',
      'insurance_id',
    ]);
    return PrescriptOrder.create(data);
  }
}

module.exports = PrescriptingController;
