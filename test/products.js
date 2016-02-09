var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');

describe('ProductsController', function() {

  afterEach(function(done) {
    var databaseCleaner = new DatabaseCleaner('mysql');
    var conn = express.infra.connectionFactory();
    databaseCleaner.clean(conn, done);
  });

  it ( 'Should return json list', function(done) {
    request.get('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it ( 'Should not insert product', function(done) {
    request.post('/products')
      .set('Accept', 'application/json')
      .send({
        title: '',
        description: 'Nice product',
        price: 150.0
      }).expect(400, done);
  });

  it ( 'Should insert product', function(done) {
    request.post('/products')
      .set('Accept', 'application/json')
      .send({
        title: 'New product',
        description: 'Nice product',
        price: 150.0
      }).expect(302, done);
  });

});
