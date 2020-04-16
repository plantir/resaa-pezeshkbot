'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Question extends Model {
  static boot() {
    super.boot();
    this.addHook('afterCreate', 'QuestionHook.afterCreate');
  }

  static listOption(qs) {
    qs.withArray = [
      {
        answer: (builder) =>
          builder
            .with('doctor')
            .where({ is_expired: 0 })
            .whereNotNull('answer'),
      },
      { doctor_asigned: (builder) => builder.where({ is_expired: 0 }) },
    ].concat(qs.withArray || []);
    return super.listOption(qs);
  }
  user() {
    return this.belongsTo('App/Models/User');
  }
  answer() {
    return this.hasMany('App/Models/DoctorAnswer');
  }
  doctor_asigned() {
    return this.belongsToMany('App/Models/Doctor').pivotTable('doctor_answers');
  }
}

module.exports = Question;
