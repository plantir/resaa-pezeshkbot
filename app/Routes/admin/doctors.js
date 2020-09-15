/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'DoctorController');
})
  .namespace('Admin')
  .prefix('admin/doctors')
  .middleware(['auth', 'role:administrator,bot_admin']);
