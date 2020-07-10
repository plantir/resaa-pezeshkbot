/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.post('', 'CoronaTestController.request');
  Route.post('callback', 'CoronaTestController.callback');
})
  .prefix('corona-test')
  .namespace('Site');
