const { table } = require('../../Models/Sampler');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
const Database = use('Database');
Route.get('', async () => {
  let orders = await Database.table('corona_orders').update({transaction_id:null});
});
