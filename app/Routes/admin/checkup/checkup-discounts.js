/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'CheckupDiscountController');
})
  .namespace('Admin/Checkup')
  .prefix('admin/checkup-discounts')
  .middleware(['auth', 'role:administrator,experiment_admin']);
