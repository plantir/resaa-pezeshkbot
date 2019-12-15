'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Speciality = use('App/Models/Speciality');
const axios = use('axios');
class AddSpecialitiesSchema extends Schema {
  async up() {
    let { data } = await axios.get(
      `https://www.resaa.net/api/Rubika/Doctors/MedicalSpecialties`
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
