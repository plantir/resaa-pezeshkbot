'use strict';
class AuthController {
  constructor() {
    this.Model = use('App/Models/Admin');
  }
  async login({ request, auth, response }) {
    let { username, password } = request.post();
    let user = await this.Model.findBy({ username });
    if (!user || !user.is_active) {
      throw new Error('نام کاربری شما هنوز تایید نشده است.');
    }
    try {
      await auth.attempt(username, password);
      let roles = await user.roles().fetch();
      roles = roles.toJSON();
      roles = roles.map((item) => item.name);
      user.roles = roles;
      return auth.generate(user, true);
    } catch (error) {
      throw new Error('نام کاربری یا کلمه عبور معتبر نیست.');
    }
  }
  async register({ request, response }) {
    let { username, password } = request.post();
    let user = await this.Model.query().where({ username }).first();
    if (user) {
      // let password = await User.create_password_token()
      // await user.send_verify_code(password, user)
      throw new Error(
        'این کاربر قبلا ثبت نام شده است. لطفا از بخش بازیابی کلمه عبور نسبت به یازیابی این حساب کاربری، اقدام نمایید.'
      );
    } else {
      user = await this.Model.create({
        username,
        password,
      });
    }
    return response.status(200).send('user created successfully');
  }

  async changePassword({ request, auth }) {
    let { password } = request.post();
    let user = await auth.getUser();
    user.password = password;
    await user.save();
    return user;
  }
}

module.exports = AuthController;
