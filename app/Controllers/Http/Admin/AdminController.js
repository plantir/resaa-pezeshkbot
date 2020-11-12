'use strict';
const Role = use('App/Models/Role');
class AdminController {
  constructor() {
    this.Model = use('App/Models/Admin');
  }
  index() {
    return this.Model.query().with('roles').fetch();
  }

  async delete({ params: { id } }) {
    let item = await this.Model.findOrFail(id);
    await item.roles().detach();
    return item.delete();
  }

  async changeActive({ request, params: { id } }) {
    let { is_active } = request.post();
    let item = await this.Model.findOrFail(id);
    item.is_active = is_active;
    return item.save();
  }
  async changeRole({ request, params: { id } }) {
    let { roles } = request.post();
    let item = await this.Model.findOrFail(id);
    await item.roles().detach();
    await item.roles().attach(roles);
    return item;
  }

  async roles() {
    return Role.query().fetch();
  }
}

module.exports = AdminController;
