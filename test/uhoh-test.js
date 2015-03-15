var test = require('tape');
var uhoh = require('../uhoh');

/** Setup mock objects **/
global.window = {};
var Element = function() {};
Element.prototype.setAttribute = function(key, value) {
  this[key] = value;
};

var elements = [];

document = {
  createElement: function() {
    var el = new Element();
    elements.push(el);
    return el;
  }
};

var message = 'uhoh';
var script = 'example.com/js/bad.js';
var line = 15;
var column = 30;
var error = new Error('uhoh');

test('uhoh - only callback', function(t) {
  t.plan(6);

  uhoh(function(payload, err) {
    t.equal(error, err);
    t.equal(payload.message, message);
    t.equal(payload.line, line);
    t.equal(payload.script, script);
    t.equal(payload.column, column);
  });

  window.onerror(message, script, line, column, error);

  t.equal(elements.length, 0);
});

test('uhoh - only url', function(t) {
  t.plan(1);

  uhoh('/logpoint');

  window.onerror(message, script, line, column, error);

  t.equal(elements[0].src.split('?')[0], '/logpoint');
});

test('uhoh - url and callback', function(t) {
  t.plan(6);

  uhoh('/logpoint', function(payload, err) {
    t.equal(err, error);
    t.equal(payload.message, message);
    t.equal(payload.line, line);
    t.equal(payload.script, script);
    t.equal(payload.column, column);
  });

  window.onerror(message, script, line, column, error);

  t.equal(elements[0].src.split('?')[0], '/logpoint');
});
