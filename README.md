# page.js

**page.js** is a small library to execute your JavaScript code in a per-page
scope. Check the files under the `example` folder for a simple display on how to
start using this.

## Usage

include `dist/page.js` in your html files and write your *initializers* using the
`page.at()` function.

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

By default, the library will look for a `data-page` attribute on the `body` tag
to check if the current page is indeed the dashboard page (for instance).

```html
...
<body data-page='dashboard'>
...
```
**Attention** - `page.js` doesn't handle any kind of `ready` DOM event - if you
keep your JavaScript code/files on the end of the body tag this won't be a issue.
If you want to run the initializers for a specific page on your own or inside a
`$.ready` block (or whatever your favorite framework uses for this), use
`page.dispatch()`:

```javascript
page.at('home', function() {
  alert('Hello!');
})
jQuery.ready(function($) {
  page.dispatch(); // checks `data-page` attribute and call the registered functions.
})
```

### `:before` and `:after` filters

You can assign initializers to run before and after the initializers registered
for the current page.

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

The `:before` and `:after` initializers will always be called even if there's
any regular initializer registered for the current page.

### Scope variants

Scope variants are optional segments that can be used to run more specific
initializers and isolate global ones. Variants are prefixed with the `+` sign
on the scope name.

```javascript
// Regular initializer, runs on every 'dashboard' page.
page.at('dashboard', function() { });

// Initializer with the 'admin-user' variant, runs only when the variant is present.
page.at('dashboard+admin-user', function() { });
```

With the code above, both initializers will be called if the current page is
`dashboard+admin-user`, but only the first will be called if the page is
just `dashboard` or `dashboard+another-thing`.

### Halting the execution chain

If you need to stop the initializers, just return `false` and all the following
initializers won't be executed.

```javascript
page.at('signup', function() {
  alert('hi!');
  return false;
})

page.at('signup', function() {
  alert('this alert will never be called.');
})
```

### Checking somewhere else for the page name.

If you don't want to use the `data-page` attribute, you can change how `page.js`
finds the name of your page.

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

Copyright (c) 2011-2015 Lucas Mazza &lt;lucastmazza@gmail.com&gt;

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
