'use strict';
const City = use('App/Models/City');
const CheckupTest = use('App/Models/CheckupTest');
const CheckupLanding = use('App/Models/CheckupLanding');
class CheckupController {
  async cities() {
    return City.query()
      .where({ is_deleted: false })
      .has('checkups', (builder) => builder.where({ is_deleted: false }))
      .with('checkups', (builder) =>
        builder
          .where({ is_deleted: false })
          .with('landing')
          .orderBy('sort_order', 'ASC')
      )
      .orderBy('sort_order', 'ASC')
      .fetch();
  }

  async show({ params: { id } }) {
    return CheckupTest.query()
      .where({ id })
      .where({ is_deleted: false })
      .with('landing')
      .with('city')
      .firstOrFail();
  }

  async landing({ params: { slug } }) {
    return CheckupLanding.findByOrFail({ slug });
  }
}

module.exports = CheckupController;
