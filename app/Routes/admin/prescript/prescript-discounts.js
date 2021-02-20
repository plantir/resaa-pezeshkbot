/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.customResource('', 'PrescriptDiscountController');
})
  .namespace('Admin/Prescript')
  .prefix('admin/prescript-discounts')
  .middleware(['auth', 'role:administrator,experiment_admin']);
