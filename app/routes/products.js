module.exports = function(app) {
  app.get('/products', function(req, res, next){
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.list(function(error, results){
      
    if (error)
      return next(error);

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
    res.render('products/form', {
      validationErrors: {},
      product: {}
    }
    );
  });

  app.post('/products', function(req, res){
    var product = req.body;
    req.assert('title', 'Title is required').notEmpty();
    req.assert('price', 'Format invalid').isFloat();
    var errors = req.validationErrors();
    if (errors){
      res.format({
        html: function() {
          res.status(200).render('products/form', {
            validationErrors: errors,
            product: product
          });
        },
        json: function() {
          res.status(400).json(errors);
        }
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
