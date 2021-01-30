/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('flow', 'CheckupOrderController.flow');
  Route.get('exportExcel', 'CheckupOrderController.exportExcel');
  Route.get('getCount', 'CheckupOrderController.getCount');
  Route.customResource('', 'CheckupOrderController');
  Route.patch(':id/change-is-called', 'CheckupOrderController.changeIsCalled');
  Route.patch(
    ':id/change-is-negotiated',
    'CheckupOrderController.changeIsNegotiated'
  );
})
  .namespace('Admin/Checkup')
  .prefix('admin/Checkup-orders')
  .middleware(['auth', 'role:administrator,experiment_admin']);
