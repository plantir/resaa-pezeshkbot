/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'PatientController');
})
  .namespace('Admin')
  .prefix('admin/patients')
  .middleware('auth');
