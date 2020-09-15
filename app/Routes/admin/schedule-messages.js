/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for ScheduleMessage
Route.group(() => {
  Route.customResource('', 'ScheduleMessageController');
  Route.post(':id/send_test', 'ScheduleMessageController.send_test');
})
  .namespace('Admin')
  .prefix('admin/schedule_messages')
  .middleware(['auth', 'role:administrator,bot_admin']);
