/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.post('', 'CoronaOrderController.request');
  Route.post(':guid/paymentRequest', 'CoronaOrderController.paymentRequest');
  Route.post('callback', 'CoronaOrderController.callback');
  Route.get('tracking', 'CoronaOrderController.tracking');
  Route.get(':guid', 'CoronaOrderController.show');
})
  .prefix('corona-orders')
  .namespace('Site');
