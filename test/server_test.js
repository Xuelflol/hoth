var ServerPortTest = require('../server.js');
    
var assert = require('assert'),
    http = require('http');


describe('Server connection at Port 10000', function () {
  it('should return status code 200: The request has succeeded', function (done) {
    http.get('http://localhost:10000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});