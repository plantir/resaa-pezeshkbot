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
  // async forget_password({ response, request }) {
  //   let { username } = request.post();
  //   const user = (
  //     await User.query()
  //       .where({ username, is_deleted: 0 })
  //       .fetch()
  //   ).rows[0];
  //   if (!user) {
  //     throw new Error('کاربر یافت نشد.');
  //   }
  //   if (!user.mobile) {
  //     throw new Error('موبایل کاربر یافت نشد.');
  //   }
  //   let password = await User.create_password_token();
  //   await user.send_reset_token(password);
  //   let mobile = user.mobile.replace(user.mobile.substring(4, 7), '***');
  //   let profile = { username: user.username, mobile: mobile };
  //   return response.status(200).send(profile);
  // }
  // async reset_password({ response, request }) {
  //   let { username, token, password } = request.post();
  //   const user = (
  //     await User.query()
  //       .where({ username, is_deleted: 0 })
  //       .fetch()
  //   ).rows[0];
  //   token = (
  //     await Token.query()
  //       .where({ token, type: 'reset_password_token', is_revoked: 0 })
  //       .fetch()
  //   ).rows[0];
  //   if (!user) {
  //     throw new Error('کاربر یافت نشد.');
  //   }
  //   if (!user.mobile) {
  //     throw new Error(
  //       'برای این کاربر شماره موبایل ثبت نشده است لطفا با ادمین تماس بگیرید.'
  //     );
  //   }
  //   if (!token) {
  //     throw new Error('توکن معتبر نیست.');
  //   }
  //   user.password = password;
  //   await user.save();
  //   token.is_revoked = 1;
  //   await token.save();
  //   return response.status(200).send('success');
  // }
}

module.exports = AuthController;
