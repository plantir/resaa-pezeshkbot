/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.post('', 'CoronaTestController.request');
  Route.post('callback', 'CoronaTestController.callback');
  Route.get('tracking', 'CoronaTestController.tracking');
})
  .prefix('corona-test')
  .namespace('Site');
