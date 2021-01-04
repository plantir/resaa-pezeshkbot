/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
Route.group(() => {
  Route.post('', 'CheckupOrderController.request');
  Route.post(':guid/paymentRequest', 'CheckupOrderController.paymentRequest');
  Route.post('callback', 'CheckupOrderController.callback');
  Route.get('tracking', 'CheckupOrderController.tracking');
  Route.get(':guid', 'CheckupOrderController.show');
  Route.patch(':guid/verify', 'CheckupOrderController.verify');
})
  .prefix('checkups/orders')
  .namespace('Site');
