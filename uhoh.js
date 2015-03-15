(function() {
  'use strict';

  var onError;
  var img;

  /**
   * @param {string=} path
   * @param {function=} opt_callback
   */
  function uhoh(path, opt_callback) {
    // If window.onerror is a function and not an 'uhoh' function, hold a reference
    if (!onError && window.onerror && !window.onerror.uhoh) {
      onError = window.onerror;
    }

    var doLog = typeof path === 'string';

    if (doLog) {
      img = img || document.createElement('img');
    }

    var callback;
    if (typeof path === 'function') {
      callback = path;
    } else if (opt_callback) {
      callback = opt_callback;
    } else {
      path = path || '/log';
    }

    window.onerror = function(message, script, line, column, err) {
      var payload = {
        message: message,
        script: script,
        line: line,
        column: column
      };

      if (err instanceof Error) {
        payload.stack = err.stack;
      }
      
      if (doLog) {
        img.setAttribute('src', path + '?error=' + encodeURIComponent(JSON.stringify(payload)));
      }

      if (typeof onError === 'function') {
        onError.apply(this, arguments);
      }

      if (typeof callback === 'function') {
        callback(payload, err);
      }
    };
    // Flag the uhoh onerror function
    window.onerror.uhoh = true;
  }

  // CommonJS/node.js support
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = uhoh;
    }
    exports.uhoh = uhoh;
  } else {
    // No module loader
    this.uhoh = uhoh;
  }

  // AMD/Require.js support
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return uhoh;
    });
  }
}).call(this);
