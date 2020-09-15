/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'ApplicationController');
})
  .namespace('Admin')
  .prefix('admin/applications')
  .middleware(['auth', 'role:administrator,application_admin']);
