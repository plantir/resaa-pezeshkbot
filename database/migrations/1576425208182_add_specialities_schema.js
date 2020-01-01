'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Speciality = use('App/Models/Speciality');
const axios = use('axios');
const Env = use('Env');
let API_URL = Env.getOrFail('RESAA_API');
class AddSpecialitiesSchema extends Schema {
  async up() {
    let { data } = await axios.get(
      `${API_URL}/Rubika/Doctors/MedicalSpecialties`
    );
    let specialities = data.result.medicalSpecialties;
    Speciality.createMany(specialities);
  }

  down() {
    this.table('specialities', table => {
      // reverse alternations
    });
  }
}

module.exports = AddSpecialitiesSchema;
