/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'SpecialityController');
})
  .namespace('Admin')
  .prefix('admin/specialities')
  .middleware(['auth', 'role:administrator,bot_admin']);
