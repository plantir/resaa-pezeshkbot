/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'LabratoryController');
})
  .namespace('Admin')
  .prefix('admin/labratories')
  .middleware(['auth', 'role:administrator,corona_admin,experiment_admin']);
