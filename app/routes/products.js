module.exports = function(app) {
  app.get('/products', function(req, res){
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.list(function(error, results){
      res.format({
        html: function() {
          res.render('products/list', {
            products: results
          });
        },
        json: function() {
          res.json(results);
        }
      });
    });
    connection.end();
  });

  app.get('/products/new', function(req, res){
    res.render('products/form');
  });

  app.post('/products', function(req, res){
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.save(req.body, function(error, result){
      res.redirect('/products');
    });
  });
};
