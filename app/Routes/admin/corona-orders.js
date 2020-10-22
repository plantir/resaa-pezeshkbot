const CoronaOldOrderController = require('../../Controllers/Http/Admin/CoronaOrderController');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('flow', 'CoronaOrderController.flow');
  Route.get('exportExcel', 'CoronaOrderController.exportExcel');
  Route.customResource('', 'CoronaOrderController');
  Route.patch(':id/change-is-checked','CoronaOrderController.changeIsChecked')
})
  .namespace('Admin')
  .prefix('admin/corona-orders')
  .middleware(['auth', 'role:administrator,corona_admin']);
