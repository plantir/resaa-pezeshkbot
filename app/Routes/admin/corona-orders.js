/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('flow', 'CoronaOrderController.flow');
  Route.get('exportExcel', 'CoronaOrderController.exportExcel');
  Route.customResource('', 'CoronaOrderController');
})
  .namespace('Admin')
  .prefix('admin/corona-orders')
  .middleware(['auth', 'role:administrator,corona_admin']);
