;(function(root) {
  var document = root.document,
      VARIANTS_DELIMITER = '+';

  // Internal: Initializes a 'Page' object.
  // Browser environments does not need to call this constructor
  // since a 'page' object will be exported in the global namespace.
  var Page = function() {
    this.initializers = {};
    this.initializers[':before'] = [];
    this.initializers[':after'] = [];
  };

  // Public: registers a function under the given scope to be executed
  // when the a scope is called.
  // These functions will be called with the current scope as its only
  // argument, and returning 'false' from any function will stop the
  // execution and the next registered functions will not be called.
  // You can register the same function to multiple scopes by passing
  // a space separated String with all the wanted scopes.
  //
  // Examples
  //
  // # scope will be 'home'.
  // page.at('home', function(scope) { });
  //
  // # scope will be 'home' or 'dashboard'.
  // page.at('home dashboard', function(scope) { });
  //
  // # Functions registered to the ':before' and ':after'
  // scopes will be executed in every scope.
  // page.at(':before', function() { alert('first'); });
  // page.at('home', function() { alert('second'); });
  // page.at(':after', function() { alert('third'); });
  //
  // # This second function will not be called.
  // page.at('home', function() { return false; });
  // page.at('home', function() { });
  //
  // Returns nothing.
  Page.prototype.at = function(scopes, fn) {
    var scope, block;
    scopes = scopes.split(' ');

    for (var index = 0, len = scopes.length; index < len; index++) {
      scope = this._buildScope(scopes[index]);
      block = { variants: scope.variants, fn: fn };

      this.initializers[scope.name] = this.initializers[scope.name] || [];
      this.initializers[scope.name].push(block);
    }
  };

  // Public: recognizes the current scope and execute all the registered
  // functions. If there is any functions registered under the ':before'
  // and ':after' scopes they will always be executed around the current
  // scope functions.
  //
  // Examples
  //
  // page.dispatch();
  //
  // Returns nothing.
  Page.prototype.dispatch = function() {
    var raw = this.recognize();

    if (raw !== undefined) {
      var scope = this._buildScope(raw),
          chain = this._buildChain(scope);

      this._executeChain(chain, scope);
    }
  };

  // Public: detects the current scope through the 'data-page'
  // attribute on the 'body' tag.
  //
  // Returns a String.
  Page.prototype.recognize = function() {
    var body = document.getElementsByTagName('body')[0];

    return body && body.getAttribute('data-page');
  };

  // Internal: builds a 'scope' object from the recognized scope String,
  // identifing the scope 'name' and its 'variants'.
  //
  // Returns an Object.
  Page.prototype._buildScope = function(raw) {
    var scope = { },
        fragments = raw.split(VARIANTS_DELIMITER);

    scope.name = fragments.shift();
    scope.variants = fragments.sort();
    return scope;
  };

  // Internal: builds a collection of functions to be called for the given
  // scope. The functions under the ':before' and ':after' scopes will be
  // inserted before and after the scope functions.
  //
  // Returns an Array.
  Page.prototype._buildChain = function(scope) {
    var before  = this.initializers[':before'],
        current = this.initializers[scope.name] || [],
        after   = this.initializers[':after'];

    return before.concat(current).concat(after);
  };

  // Internal: executes the chain of given functions using the
  // scope name and variants as arguments. Whenever a function
  // returns 'false', the chain will be halted.
  //
  // Returns nothing.
  Page.prototype._executeChain = function(chain, scope) {
    var result, block;
    for (var index = 0, len = chain.length; index < len; index++) {
      block = chain[index];

      if (block.variants.length > 0 && !this._arrayMatches(scope.variants, block.variants)) {
        continue;
      }

      result = block.fn(scope.name, scope.variants);
      if (result === false) {
        return;
      }
    }
  };

  // Internal: Compares the elements of two Arrays to check if they
  // are logically the same.
  //
  // Returns true or false.
  Page.prototype._arrayMatches = function(one, two) {
    if (one.length != two.length) return false;

    for (var i = 0; i < one.length; ++i) {
      if (one[i] !== two[i]) return false;
    }

    return true;
  };

  root.page = new Page();
  root.Page = Page;
})(this);
