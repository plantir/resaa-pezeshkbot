'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');
/** @type { import('@adonisjs/framework/src/Env')} */
const Env = use('Env');
const BASE_API = Env.getOrFail('RESAA_API');
/** @type { import('axios')} */
const axios = require('axios');
class Doctor extends Model {
  static get(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { data } = await axios.get(
          `${BASE_API}/doctors/${id}?fields=firstName,lastName,specialty,title`
        );
        resolve(data.result.doctor);
      } catch (error) {
        reject(error);
      }
    });
  }
  static get allowField() {
    return [
      'first_name',
      'last_name',
      'subscriber_number',
      'image',
      'description'
    ];
  }
  static listOption(qs) {
    qs.withArray = ['speciality'].concat(qs.withArray || []);
    return super.listOption(qs);
  }

  speciality() {
    return this.belongsTo('App/Models/Speciality');
  }
}

module.exports = Doctor;
