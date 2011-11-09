# page.js

**page.js** is a small javascript library to execute your javascript code in a per-page scope.

## Usage

include `page.min.js` in your html files and write your *initializers* using the `page()` function.

```javascript
page('dashboard', function() {
  alert('hello, from the dashboard page!');
})

page('dashboard', function() {
  alert("I'm the dashboard page too")
})

page('signup', function() {
  alert("Dorothy, we're on on the dashboard page anymore...")
})

page('signup', function(scope) {
  // scope => 'signup'
  alert("You're at the " + scope + " page!");
})

```

By default, `page` will look for a meta tag named `page` to check if the the current page is indeed the dashboard page.

```html
...
<meta name='page' value='dashboard'>
...
```

If you want to run the initializers for a specific page on your own, use `page.run()`:

```javascript
page('home', function() {
  alert("Hello!")
})

page.run('home') # triggers the alert.
```

## `:before` and `:after` filters

You can assign initializers to run before and after the initializers registered for the current page.

```javascript
page(':before', function() {
  // I'm running first;
})

page(':after', function() {
  // I'm running after;
})

page('home', function() {
  // I'm the middle of the chain.
})
```

The `:before` and `:after` initializers will only be called if there's any regular initializer registered for the current page.

## Halting the execution chain

If you need to stop the initializers, just return `false` and all the following initializers won't be executed.

```javascript
page('signup', function() {
  alert('hi!')
  return false;
})

page('signup', function() {
  alert("I'll never be called");
})
```

## Checking somewhere else for the page name.

If you don't want to use the meta `page` tag, you can change how `page.js` finds the name of your page.

```javascript
// checks for the body tag id, using jQuery.
page.identify = function() {
  return $('body').attr('id');
}
page('the-body-id', function() {
  //...
})
```

## TODO

* Implement a `ready` event trigger.

## License

(The MIT License)

Copyright (c) 2011 Lucas Mazza &lt;luc4smazza@gmail.com&gt;

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