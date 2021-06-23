/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('flow', 'CoronaOrderController.flow');
  Route.get('exportExcel', 'CoronaOrderController.exportExcel');
  Route.get('ExportFactor', 'CoronaOrderController.ExportFactor');
  Route.get('getCount', 'CoronaOrderController.getCount');
  Route.customResource('', 'CoronaOrderController');
  Route.patch(':id/change-is-called', 'CoronaOrderController.changeIsCalled');
  Route.patch(
    ':id/change-is-negotiated',
    'CoronaOrderController.changeIsNegotiated'
  );
  Route.get('fix/orders', async () => {
    // return 'hello'
    const Database = use('Database');
    let orders = await Database.table('corona_orders');
    for (const order of orders) {
      let transaction = await Database.table('transactions')
        .where({
          order_id: order.id,
        })
        .first();
      if (transaction) {
        await Database.table('corona_orders')
          .where({ id: order.id })
          .update({ transaction_id: transaction.id });
      }
    }
  });
})
  .namespace('Admin/Corona')
  .prefix('admin/corona-orders')
  // .middleware(['auth', 'role:administrator,corona_admin']);
