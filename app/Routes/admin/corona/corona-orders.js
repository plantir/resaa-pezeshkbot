/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('flow', 'CoronaOrderController.flow');
  Route.get('exportExcel', 'CoronaOrderController.exportExcel');
  Route.get('getCount', 'CoronaOrderController.getCount');
  Route.customResource('', 'CoronaOrderController');
  Route.patch(':id/change-is-called', 'CoronaOrderController.changeIsCalled');
  Route.patch(
    ':id/change-is-negotiated',
    'CoronaOrderController.changeIsNegotiated'
  );
})
  .namespace('Admin/Corona')
  .prefix('admin/corona-orders')
  .middleware(['auth', 'role:administrator,corona_admin']);
