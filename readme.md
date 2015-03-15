uhoh
====

A browser to server unhandled exception logger. Supports CommonJS/AMD/VanillaJS.

Install
-------
```bash
$ npm install uhoh
```

Example
-------
```html
<script src="/js/uhoh.js"></script>
<script>
  uhoh('/logs');
</script>
```

After that, `uhoh` will send `GET` requests to the `/logs` route with the following format:
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

The existence of keys/values in the error object are dependent upon browser support. For example, IE10 and below will not provide a `stack` value.

Tests
-----
```bash
$ npm install
$ npm test
```

TODO
----
* Hook up Travis CI to run tests
* Add Bower support

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
