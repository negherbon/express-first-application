function ProductsDAO(connection){
  this._connection = connection;
}

ProductsDAO.prototype.list = function(callback){
  this._connection.query('select * from products', callback);
};

module.exports = function(){
  return ProductsDAO;
};
