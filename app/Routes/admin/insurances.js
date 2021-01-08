/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'InsuranceController');
})
  .namespace('Admin')
  .prefix('admin/insurances')
  .middleware(['auth', 'role:administrator,corona_admin,experiment_admin']);
