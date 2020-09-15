'use strict';
class CheckRole {
  async handle({ request, auth, response }, next, roles) {
    // call next to advance the request
    let user = await auth.getUser();
    await user.load('roles');
    user = user.toJSON();
    let is_permited = roles.some((role) =>
      user.roles.find((item) => item.name == role)
    );
    if (!user || !is_permited) {
      response.status(403).send('permision denid');
      return;
    }
    await next();
  }
}

module.exports = CheckRole;
