/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// route for doctors
Route.group(() => {
  Route.post('/send-test', 'BotServiceController.sendTest');
  Route.post('/send-test-result', 'BotServiceController.sendTestResult');
  Route.get('/tests', 'BotServiceController.tests');
  Route.get('/test-results', 'BotServiceController.testResults');
})
  .namespace('Admin')
  .prefix('bot-service')
  .middleware('auth');
