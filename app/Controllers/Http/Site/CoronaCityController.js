'use strict';
const City = use('App/Models/CoronaCity');
const CoronaTest = use('App/Models/CoronaTest');
class CoronaCityController {
  async index() {
    return City.query()
      .with('tests', (builder) =>
        builder.where({ is_deleted: false }).orderBy('sort_order', 'Desc')
      )
      .orderBy('sort_order', 'Desc')
      .where({ is_deleted: false })
      .fetch();
  }

  async tests({ params: { city_id } }) {
    return CoronaTest.query()
      .where({ city_id })
      .where({ is_deleted: false })
      .orderBy('sort_order', 'DESC')
      .fetch();
  }
}

module.exports = CoronaCityController;
