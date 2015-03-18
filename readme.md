uhoh
====

A browser to server unhandled exception logger. Supports CommonJS/AMD/VanillaJS.

[![build status](https://secure.travis-ci.org/mmaelzer/uhoh.png)](http://travis-ci.org/mmaelzer/uhoh)

Install
-------

### npm

```bash
npm install uhoh
```

### bower

```bash
bower install uhoh
```

Example
-------
```html
<script src="/js/uhoh.js"></script>
<script>
  uhoh('/logs');
</script>
```
After that, `uhoh` will catch unhandled exceptions and send `GET` requests to the `/logs` route with errors in the following format:
```
/logs?error=%7B%22message%22%3A%22Uncaught%20Error%3A%20uh%20oh%22%2C%22script%22%3A%22http%3A%2F%2Flocalhost%3A3000%2F%22%2C%22line%22%3A3%2C%22column%22%3A9%2C%22stack%22%3A%22Error%3A%20uh%20oh%5Cn%20%20%20%20at%20http%3A%2F%2Flocalhost%3A3000%2F%3A3%3A9%5Cn%20%20%20%20at%20http%3A%2F%2Flocalhost%3A3000%2F%3A4%3A3%22%7D
```
Where the error value is just `encodeURIComponent(JSON.stringify(errorObject))`. So for the servers to use the error, it needs to `decodeURIComponent` (or comparable given the language/framework) and then parse the JSON string to arrive at an error object that looks like:
```javascript
{
  "message": {string},
  "script": {string},
  "line": {number},
  "column": {number},
  "stack": {string}  
}
```

The existence of keys/values in the error object are dependent upon browser support.


More Examples
-------------
```javascript
var uhoh = require('uhoh');
/**
 * Call uhoh without arguments:
 * uhoh will make GET requests to /logs when an unhandled
 * exception occurs
 */
uhoh();
```

```javascript
/**
 * Call uhoh with a route:
 * uhoh will make GET requests to the provided route on unhandled exceptions
 */
uhoh('/my-logs-path');
```

```javascript
define(['uhoh'], functon(uhoh) {
  /**
   * Call uhoh with a callback:
   * uhoh will not make requests to the server but will
   * callback with an object and an optional error
   */
  uhoh(function(info, err) {
    /**
     *  info looks like:
     *  {
     *    message: {string}, // error message
     *    script: {string},  // filename of script file where the error occurred
     *    line: {number},    // the line number where the error occurred
     *    column: {number},  // the column number where the error occurred
     *    stack: {string}    // the stack trace
     *  }
     *  err (if available) is an instanceof Error
     *  
     *  Some values will not be provided depending on what the browser supports
     */
  });
});
```

```javascript
/**
 * Call uhoh with a route and callback
 */
uhoh('/my-log-route', function(info, err) {
  // Maybe do things with info or err
});
```


Tests
-----
```bash
$ npm install
$ npm test
```

The MIT License
===============

Copyright (c) 2015 Michael Maelzer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
