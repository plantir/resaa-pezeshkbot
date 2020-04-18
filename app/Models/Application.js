'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('BaseModel');

class Application extends Model {
  static get allowField() {
    return ['type', 'url', 'version'];
  }
  getUrl(url) {
    if (url.includes('https://botpanel/resaa.net')) {
      return url;
    }
    return 'https://botpanel/resaa.net' + url;
  }
}

module.exports = Application;
