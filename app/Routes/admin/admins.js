/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('', 'AdminController.index');
  Route.get('roles', 'AdminController.roles');
  Route.delete(':id', 'AdminController.delete');
  Route.put(':id/changeActive', 'AdminController.changeActive');
  Route.put(':id/changeRole', 'AdminController.changeRole');
  Route.put(':id/changePassword', 'AdminController.changePassword');
})
  .namespace('Admin')
  .prefix('admin/Admins')
  .middleware(['auth', 'role:administrator']);
