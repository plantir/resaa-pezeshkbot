const { table } = require('../../Models/Sampler');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
const Database = use('Database');
const SMS = use('SMS')
Route.get('', async () => {
  // SMS.send({
  //   view: "sms.prescriptOrderRequest",
  //   data: { name: 'کاربر' },
  //   to: 09356659943,
  //   is_fast: true,
  // });
  // return true
  // let orders = await Database.table('corona_orders').update({transaction_id:null});
});
