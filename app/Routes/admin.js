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
  Route.customResource('', 'DoctorController');
})
  .namespace('Admin')
  .prefix('admin/doctors')
  .middleware('auth');

// route for ScheduleMessage
Route.group(() => {
  Route.customResource('', 'ScheduleMessageController');
  Route.post(':id/send_test', 'ScheduleMessageController.send_test');
})
  .namespace('Admin')
  .prefix('admin/schedule_messages')
  .middleware('auth');

// route for quiz
Route.group(() => {
  Route.customResource('', 'QuizController');
  Route.post(':id/send_test', 'QuizController.send_test');
})
  .namespace('Admin')
  .prefix('admin/quiz')
  .middleware('auth');

// route for test-answer
Route.group(() => {
  Route.customResource('', 'TestAnswerController');
  Route.post('/:id/reply', 'TestAnswerController.reply');
  Route.get('/doctor/:id', 'TestAnswerController.doctorAnswers');
  // Route.post(':id/send_test', 'TestAnswer.send_test');
})
  .namespace('Admin')
  .prefix('admin/test_answer')
  .middleware('auth');
