const axios = require('axios');

async function boot() {
  try {
    let res = await axios.post('https://sep.shaparak.ir/MobilePG/MobilePayment', {
      Action: 'Token',
      Amount: 10000,
      TerminalId: 11679641,
      ResNum: 1,
      RedirectUrl: 'https://resaa.net/callback',
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

boot();
