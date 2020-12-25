/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CoronaDiscountController');
})
  .namespace('Admin/Corona')
  .prefix('admin/corona-discounts')
  .middleware(['auth', 'role:administrator,corona_admin']);
