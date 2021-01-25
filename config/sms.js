const Env = use('Env');
module.exports = {
  connection: 'kavenegar',
  kavenegar: {
    url: `https://api.kavenegar.com/v1/${Env.get(
      'KAVENEGAR_API_KEY'
    )}/sms/send.json`,
    from: '2000500666',
    fast_url: `https://api.kavenegar.com/v1/${Env.get(
      'KAVENEGAR_API_KEY'
    )}/verify/lookup.json`,
    templates: {
      'sms.prescriptOrderRequest': 'prescriptOrderRequest',
    },
  },
};
