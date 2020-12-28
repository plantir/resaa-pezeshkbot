/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CheckupLandingController');
})
  .namespace('Admin/Checkup')
  .prefix('admin/checkup-landings')
  .middleware(['auth', 'role:administrator,experiment_admin']);
