'use strict';
const City = use('App/Models/City');
const CheckupTest = use('App/Models/CheckupTest');
const CheckupDiscount = use('App/Models/CheckupDiscount');
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
    let landing = await CheckupLanding.findByOrFail({ slug });
    // let checkups =
    await landing.load('checkups', (builder) => builder.with('city'));
    landing = landing.toJSON();
    landing.cities = [];
    for (let checkup of landing.checkups) {
      let item = { ...checkup.city, total_amount: checkup.total_amount };
      landing.cities.push(item);
    }
    // await landing.load('cities', (builder) => builder.distinct('city_id').with('checkups'));
    return landing;
  }

  async checkDiscount({ request }) {
    let { code } = request.post();
    return CheckupDiscount.query()
      .where({ is_deleted: false })
      .where({ code })
      .firstOrFail();
  }
}

module.exports = CheckupController;
