/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('flow', 'PrescriptOrderController.flow');
  Route.get('exportExcel', 'PrescriptOrderController.exportExcel');
  Route.get('getCount', 'PrescriptOrderController.getCount');
  Route.customResource('', 'PrescriptOrderController');
  Route.patch(
    ':id/change-is-called',
    'PrescriptOrderController.changeIsCalled'
  );
  Route.patch(
    ':id/change-is-negotiated',
    'PrescriptOrderController.changeIsNegotiated'
  );
})
  .namespace('Admin/Prescript')
  .prefix('admin/prescript-orders')
  .middleware(['auth', 'role:administrator,Prescript_admin']);
