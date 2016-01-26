module.exports = function(app) {
  app.get('/products', function(req, res){
    var connection = app.infra.connectionFactory();
    var productsDb = new app.infra.ProductsDAO(connection);

    productsDb.list(function(error, results){
      res.render('products/list', {
        products: results
      });
    });

    connection.end();
  });
};
