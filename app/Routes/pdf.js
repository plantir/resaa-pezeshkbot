/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');
const Order = use('App/Models/CoronaOrder');
Route.get('pdf', async ({ view }) => {
  let order = await Order.query().with('city').orderBy('id', 'desc').first();
  //   {"id": 1, "city": {"id": 2, "name": "تهران", "created_at": null, "sort_order": 0, "updated_at": "2020-09-30 13:17:55"}, "name": "آنتی بادی", "color": "pink", "city_id": 2, "created_at": "2020-10-16 19:45:01", "sort_order": 2, "updated_at": "2020-10-16 19:45:01", "description": "dsadasd", "total_amount": 450000, "prepay_amount": 70000, "discount_roles": [{"count": "10", "discount": 10000}, {"count": "20", "discount": 20000}]}
  order = order.toJSON();
  order.unit_amount =
    Math.round((order.selected_test.total_amount * 100) / 109) * 10;
  order.discount_amount =
    Math.round(
      order.role_discount_amount ||
        (0 + order.discount && order.discount.amount)
        ? order.discount.amount
        : 0
    ) * 10;
  order.tax_amount =
    Math.round((order.selected_test.total_amount * order.count * 9) / 109) * 10;
  return view.render('pdf.invoice', { order });
});
