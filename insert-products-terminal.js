var http = require('http');

var settings = {
  hostname: 'localhost',
  port: 3000,
  path: '/products',
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
};

var client = http.request(settings, function(res) {
  console.log(res.statusCode);
  res.on('data', function(body) {
    console.log('Body ' + body);
  });
});

var product = {
  title: 'More about node',
  description: 'node, javascript and a little about http',
  price: 100
};

client.end(JSON.stringify(product));
