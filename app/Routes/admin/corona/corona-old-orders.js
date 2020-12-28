/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('flow', 'CoronaOldOrderController.flow');
  Route.get('exportExcel', 'CoronaOldOrderController.exportExcel');
  Route.customResource('', 'CoronaOldOrderController');
})
  .namespace('Admin/Corona')
  .prefix('admin/corona-old-orders')
  .middleware(['auth', 'role:administrator,corona_admin']);
