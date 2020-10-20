/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('getSetting', 'CoronaRetargetController.getSetting');
  Route.put('changeSetting', 'CoronaRetargetController.changeSetting');
})
  .namespace('Admin')
  .prefix('admin/corona-retarget')
  .middleware(['auth', 'role:administrator,corona_admin']);
