'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
class MoveCitiesSchema extends Schema {
  async up() {
    let cities = await Database.table('cities').select('*');
    for (let city of cities) {
      let testsItems = JSON.parse(city.testsItems);
      let city_item = {
        id: city.id,
        name: city.name,
        created_at: city.create_at,
        updated_at: city.updated_at,
        is_deleted: city.is_deleted,
      };
      await Database.table('corona_cities').insert(city_item);
      for (let item of testsItems) {
        let corona_test_item = {
          name: item.name,
          city_id: city.id,
          total_amount: item.price,
          prepay_amount: item.prepayment,
        };
        await Database.table('corona_tests').insert(corona_test_item);
      }
    }
  }

  down() {}
}

module.exports = MoveCitiesSchema;
