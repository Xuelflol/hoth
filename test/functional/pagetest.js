var ServerPortTest = require('../../server.js');
    
var assert = require('assert'),
    http = require('http');

// use zombie.js as headless browser
const Browser = require('zombie');


describe('User visits signin page', function() {
    
    const browser = new Browser({ site: 'http://localhost:10000' });
    
    
    // load the signin page   
    before(function(done) {
        browser.visit('/signin', done);
    });
        
    describe('submits form', function() {
        
        it('should show Login form', function() {
            assert.ok(browser.success);
            assert.equal(browser.text('h2'), 'Login');
            assert.equal(browser.text('form label'), 'First NameLast NameEmailMessage');
        });

        before(function(done) {
          browser
            .fill('email',    'fan.cbest@gmail.com')
            .fill('password', 'fanzhang')
            .pressButton('subs', done);
        });
        

        it('should be successful', function() {
            browser.assert.success();
        });

        it('should see Rebel Hangar page', function() {
          browser.assert.text('title', 'Rebel Hangar');
        });
    
    });

});