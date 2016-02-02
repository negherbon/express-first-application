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
    var product = req.body;
    req.assert('title', 'Title is required').notEmpty();
    req.assert('price', 'Format invalid').isFloat();
    var errors = req.validationErrors();
    if (errors){
      res.render('products/form', {
        validationErrors: errors
      });
      return;
    }
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.save(product, function(error, result){
      res.redirect('/products');
    });
  });
};
