# page.js

**page.js** is a small library to execute your JavaScript code in a per-page scope. Check the files under the `example` folder for a simple display on how to start using this.

## Usage

include `page.min.js` in your html files and write your *initializers* using the `page.at()` function.

```javascript
page.at('dashboard', function() {
  alert('hello, from the dashboard page!');
})

page.at('dashboard', function() {
  alert('I am the dashboard page too');
})

page.at('signup', function() {
  alert('Dorothy, we are not on the dashboard page anymore...');
})

page.at('signup', function(scope) {
  // scope => 'signup'
  alert('You are at the ' + scope + ' page!');
})

page.dispatch();
```

By default, the library will look for a `data-page` attribute on the `body` tag` to check if the the current page is indeed the dashboard page (for instance).

```html
...
<body data-page='dashboard'>
...
```
**Attention** - `page.js` doesn't handle any kind of `ready` DOM event - if you keep your JavaScript code/files on the end of the body tag this won't be a issue. If you want to run the initializers for a specific page on your own or inside a `$.ready` block (or whatever your favorite framework uses for this), use `page.dispatch()`:

```javascript
page.at('home', function() {
  alert("Hello!");
})
jQuery.ready(function($) {
  page.dispatch(); // checks `data-page` attribute.
})
```

### `:before` and `:after` filters

You can assign initializers to run before and after the initializers registered for the current page.

```javascript
page.at(':before', function() {
  // I'm running first;
})

page.at(':after', function() {
  // I'm running after;
})

page.at('home', function() {
  // I'm the middle of the chain.
})
```

The `:before` and `:after` initializers will always be called even if there's any regular initializer registered for the current page.

### Halting the execution chain

If you need to stop the initializers, just return `false` and all the following initializers won't be executed.

```javascript
page.at('signup', function() {
  alert('hi!');
  return false;
})

page.at('signup', function() {
  alert("I'll never be called");
})
```

### Checking somewhere else for the page name.

If you don't want to use the `data-page` attribute, you can change how `page.js` finds the name of your page.

```javascript
// checks for the body tag ID, using jQuery.
page.recognize = function() {
  return $('body').attr('id');
}

page.at('the-body-id', function() {
  //...
})
```

## License

(The MIT License)

Copyright (c) 2011-2013 Lucas Mazza &lt;lucastmazza@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
