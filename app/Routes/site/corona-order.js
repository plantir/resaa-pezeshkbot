/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.post('', 'CoronaOrderController.request');
  Route.post(':id/paymentRequest', 'CoronaOrderController.paymentRequest');
  Route.post('callback', 'CoronaOrderController.callback');
  Route.get('tracking', 'CoronaOrderController.tracking');
})
  .prefix('corona-orders')
  .namespace('Site');
