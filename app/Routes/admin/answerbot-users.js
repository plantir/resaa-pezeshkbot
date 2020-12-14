/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.get('patients', 'BotServiceController.patients');
})
  .namespace('Admin')
  .prefix('admin/answerbot')
  .middleware(['auth', 'role:administrator,bot_admin']);
