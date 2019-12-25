/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.get('', ({ view }) => {
  return 'Success';
});

// route for question
Route.group(() => {
  Route.get('', 'QuestionController.index');
})
  .namespace('Admin')
  .prefix('admin/questions')
  .middleware('auth');

// route for doctors
Route.group(() => {
  Route.get('', 'DoctorController.index');
})
  .namespace('Admin')
  .prefix('admin/doctors')
  .middleware('auth');

// route for doctors
Route.group(() => {
  Route.customResource('', 'ScheduleMessageController');
  Route.post(':id/send_test', 'ScheduleMessageController.send_test');
})
  .namespace('Admin')
  .prefix('admin/schedule_messages')
  .middleware('auth');
