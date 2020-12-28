/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'PrescriptTestController');
})
  .namespace('Admin/Prescript')
  .prefix('admin/prescript-tests')
  .middleware(['auth', 'role:administrator,experiment_admin']);
