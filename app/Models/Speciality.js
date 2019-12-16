'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
/** @type {typeof import('@adonisjs/redis/src/Redis')} */
const Redis = use('Redis');
class Speciality extends Model {
  static boot() {
    super.boot();
    this.addTrait('NoTimestamp');
  }

  static async get() {
    let cached_specialities = await Redis.get('specialities');
    if (cached_specialities) {
      return JSON.parse(cached_specialities);
    }
    const specialities = await this.all();
    await Redis.set('specialities', JSON.stringify(specialities));
    return specialities.toJSON();
  }
}

module.exports = Speciality;
