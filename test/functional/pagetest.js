var ServerPortTest = require('../../server.js');
    
var assert = require('assert'),
    http = require('http');
// use zombie.js as headless browser
const Browser = require('zombie');


describe('User visits signin page', function() {
    
  const browser = new Browser({ site: 'http://localhost:10000' });
  // load the contact page
  before(function(done) {
    browser.visit('/#meals', done);
  });

  it('should show contact a form');
  it('should refuse empty submissions');
  // ...

});