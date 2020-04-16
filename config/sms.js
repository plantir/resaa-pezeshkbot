module.exports = {
  connection: 'meli_payamak',
  sms_ir: {
    url: 'http://ws.sms.ir/api/MessageSend',
    lineNumber: '30004747471872',
    fast_url: 'https://RestfulSms.com/api/UltraFastSend',
    auth: {
      url: 'http://ws.sms.ir/api/Token',
      UserApiKey: '805dcd65b4b5271d9145d1a2',
      SecretKey: 'mevan!@#2019',
    },
    templates: {
      'sms.verify': 13675,
    },
  },
  meli_payamak: {
    url: 'https://rest.payamak-panel.com/api/SendSMS/SendSMS',
    from: '30001220149798',
    username: 'espin',
    password: '@09124207506@',
  },
};
