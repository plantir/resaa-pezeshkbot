/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaTestController');
})
  .namespace('Admin/Corona')
  .prefix('admin/corona-tests')
  .middleware(['auth', 'role:administrator,corona_admin']);
