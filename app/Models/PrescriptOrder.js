'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');
const Bull = use('Rocketseat/Bull');
const SMS_Job = use('App/Jobs/Sms');
const Env = use('Env');
class PrescriptOrder extends Model {
  static get allowField() {
    return [
      'city_id',
      'images',
      'transaction_id',
      'user_mobile',
      'user_fullname',
      'user_nationalcode',
      'user_address',
      'status',
      'amount',
      'amount_with_insurance',
      'shipment_amount',
      'payable_amount',
      'prepay_amount',
      'is_verified',
      'necessary_preparation',
      'description',
      'insurance_id',
      'sampler_id',
      'labratory_id',
      'result_time_min',
      'result_time_max',
      'admin_note',
      'sample_type',
      'sample_time',
    ];
  }

  static get jsonFields() {
    return ['images'];
  }

  static boot() {
    super.boot();
    this.addTrait('ConvertToJson');
    this.addHook('beforeCreate', 'PrescriptOrderHook.beforeCreate');
    this.addHook('afterCreate', 'PrescriptOrderHook.afterCreate');
  }

  static listOption(qs) {
    qs.withArray = ['city', 'insurance', 'transaction', 'labratory', 'sampler'];
    return super.listOption(qs);
  }

  sendInvoice() {
    let url = `${Env.get('RESAA_SITE')}/test-at-home/prescription/invoice/${
      this.guid
    }`;
    Bull.add(SMS_Job.key, {
      template: 'sms.prescript_invoice',
      to: this.user_mobile,
      data: {
        url: url,
      },
    });
  }

  city() {
    return this.belongsTo('App/Models/City');
  }

  transaction() {
    return this.belongsTo('App/Models/Transaction');
  }

  insurance() {
    return this.belongsTo('App/Models/Insurance');
  }

  labratory() {
    return this.belongsTo('App/Models/Labratory');
  }

  sampler() {
    return this.belongsTo('App/Models/Sampler');
  }
}

module.exports = PrescriptOrder;
