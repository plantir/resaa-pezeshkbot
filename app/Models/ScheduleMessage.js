'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class ScheduleMessage extends Model {
  static boot() {
    super.boot();
    this.addTrait('ConvertToBase64');
  }
  static get Base64Fields() {
    return ['text'];
  }
  static get allowField() {
    return ['title', 'text', 'image', 'video', 'send_time'];
  }
  static get dates() {
    return super.dates.concat(['send_time']);
  }
}

module.exports = ScheduleMessage;
