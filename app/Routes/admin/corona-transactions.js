/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaTransactionController');
})
  .namespace('Admin')
  .prefix('admin/corona-transactions')
  .middleware(['auth', 'role:administrator,corona_admin']);
