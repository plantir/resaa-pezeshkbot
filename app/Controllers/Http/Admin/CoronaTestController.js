'use strict';

const Resource = use('Resource');

class CoronaTestController extends Resource {
  constructor() {
    super();
    this.Model = use('App/Models/CoronaTest');
  }

  async store({ response, request }) {
    let data = request.only(this.Model.allowField || []);
    if (data.discount_roles) {
      data.discount_roles = data.discount_roles.filter(
        (item) => item.count && item.discount
      );
    }
    let item = await this.Model.create(data);
    response.status(201).send(item);
  }
  async update({ response, request, params: { id } }) {
    let data = request.only(this.Model.allowField || []);
    if (data.discount_roles) {
      data.discount_roles = data.discount_roles.filter(
        (item) => item.count && item.discount
      );
    }
    let item = await this.Model.find(id);
    item.merge(data);
    await item.save();
    response.status(200).send(item);
  }
}

module.exports = CoronaTestController;
