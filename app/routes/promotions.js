module.exports = function(app) {
  app.get('/promotions/new', function(req, res) {
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.list(function(error, results){
      res.render('promotions/form', {
        products: results
      });
    });
    connection.end();
  });

  app.post('/promoticons', function(req, res) {
    var promotion = req.body;
    app.get('io').emit('newPromotion', promotion);
    res.redirect('/promotions/new');
  });
};
