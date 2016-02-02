module.exports = function(app) {
  app.get('/products', function(req, res){
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.list(function(error, results){
      res.render('products/list', {
        products: results
      });
    });
    connection.end();
  });

  app.get('/products/new', function(req, res){
    res.render('products/form');
  });

  app.post('/products/save', function(req, res){
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.save(req.body, function(error, result){
      res.redirect('/products');
    });
  });
};
