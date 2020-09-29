'use strict'
const City = use('App/Models/City')
class CoronaCityController {
  async index(){
    return City.query().where({is_deleted:false}).fetch()
  }
}

module.exports = CoronaCityController
