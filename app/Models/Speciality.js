'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');
/** @type {typeof import('@adonisjs/redis/src/Redis')} */
const Redis = use('Redis');
class Speciality extends Model {
  static boot() {
    super.boot();
    this.addHook('afterSave', 'SpecialityHook.afterSave');
    this.addTrait('NoTimestamp');
  }
  static get allowField() {
    return ['title', 'description'];
  }
  static async get({ has_doctor = true }) {
    let redis_name = has_doctor ? 'specialities_has_doctor' : 'specialities';
    let cached_specialities = await Redis.get(redis_name);
    if (cached_specialities) {
      return JSON.parse(cached_specialities);
    }
    try {
      // const specialities = await this.query().has('doctors').fetch();
      // await Redis.set('specialities', JSON.stringify(specialities));
      const specialities = await Speciality.reCache({ has_doctor });
      return specialities.toJSON();
    } catch (error) {
      console.log(error);
    }
  }
  static reCache({ has_doctor }) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = this.query();
        if (has_doctor) {
          query = query.has('doctors');
        }
        const specialities = await query.fetch();
        let redis_name = has_doctor
          ? 'specialities_has_doctor'
          : 'specialities';
        await Redis.set(redis_name, JSON.stringify(specialities));
        resolve(specialities);
      } catch (error) {
        reject(error);
      }
    });
  }
  doctors() {
    return this.hasMany('App/Models/Doctor');
  }
}

module.exports = Speciality;
