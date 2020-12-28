'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with coronaretargets
 */

class CoronaRetargetController {
  constructor() {
    this.Model = use('App/Models/CoronaRetarget');
  }
  async getSetting() {
    let item = await this.Model.find(1);
    return item;
  }
  async changeSetting({ request }) {
    let data = request.only(['is_active', 'minute', 'discount_id']);
    let item = await this.Model.find(1);
    item.merge(data);
    await item.save()
    return item;
  }
}

module.exports = CoronaRetargetController;
