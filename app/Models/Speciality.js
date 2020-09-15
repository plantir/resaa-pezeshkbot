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
  static async get() {
    let cached_specialities = await Redis.get('specialities');
    if (cached_specialities) {
      return JSON.parse(cached_specialities);
    }
    try {
      // const specialities = await this.query().has('doctors').fetch();
      // await Redis.set('specialities', JSON.stringify(specialities));
      const specialities = await Speciality.reCache();
      return specialities.toJSON();
    } catch (error) {
      console.log(error);
    }
  }
  static reCache() {
    return new Promise(async (resolve, reject) => {
      try {
        const specialities = await this.query().has('doctors').fetch();
        await Redis.set('specialities', JSON.stringify(specialities));
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
