
/*!
 * page.js
 * Copyright(c) 2011 Lucas Mazza <luc4smazza@gmail.com>
 * MIT Licensed
 */

;(function(global) {

  var slice = Array.prototype.slice,
      initializers = {};

  function runChain(chain, scope) {
    var block, result;
    for (var index = 0, len = chain.length; index < len; index++) {
      block = chain[index];
      result = block(scope);
      if (result === false) return;
    }
  }

  function createChain(blocks) {
    var beforeBlocks = initializers[':before'] || [],
        afterBlocks  = initializers[':after']  || [];

    return beforeBlocks.concat(blocks).concat(afterBlocks);
  }

  // Stores a function on one or more scopes
  // to be executed on a specific scope is called with the `run()` function.
  //
  // Accepts on or more Strings as scopes and a function as the last argument.
  //
  // Returns nothing.
  var page = function() {
    var args   = slice.call(arguments),
        block  = args.pop(),
        blocks, scope;

    for (var index = 0, len = args.length; index < len; index++) {
      scope = args[index];
      blocks = initializers[scope] || [];
      blocks.push(block);
      initializers[scope] = blocks;
    }
  };

  // Run all the registered functions for a given `scope`.
  // If none is given, uses the `page.identify()` to discover
  // the scope for the current page.
  //
  // If any function is registered under the scopes of `:before` or
  // `:after`, they will be executed around the registered functions.
  // If any call returns `false`, the execution chain will be halted
  // and the following functions won't be called.
  //
  // All functions will receive the current `scope` as the only argument.
  page.run = function(scope) {
    scope = scope || page.identify();
    var blocks = initializers[scope];

    if (blocks && blocks.length) {
      var chain = createChain(blocks);
      runChain(chain, scope)
    }
  }

  // Tries to read the `content` attribute of a meta tag
  // named `page'. If none named tag is found, returns nothing.
  // Replace this function to implement your own method of
  // scope lookup.
  page.identify = function() {
    var tags = document.getElementsByTagName('meta'),
        tag;

    for (var index = 0, len = tags.length; index < len; index++) {
      tag = tags[index];
      if (tag.name == 'page' && tag.content) return tag.content;
    }
  }

  // Export the page object for Node.js
  if (typeof module !== 'undefined') {
    module.exports = page;
  } else {
    global.page = page;
  }
})(this);
