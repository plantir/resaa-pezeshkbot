/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('getSetting', 'CheckupRetargetController.getSetting');
  Route.put('changeSetting', 'CheckupRetargetController.changeSetting');
})
  .namespace('Admin/Checkup')
  .prefix('admin/checkup-retargets')
  .middleware(['auth', 'role:administrator,experiment_admin']);
