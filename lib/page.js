
/*!
 * page.js
 * Copyright(c) 2011 Lucas Mazza <luc4smazza@gmail.com>
 * MIT Licensed
 */

;(function(exports) {

  var slice = Array.prototype.slice,
      initializers = {};

  function runChain(chain, scope) {
    var block;
    for(index in chain) {
      block = chain[index];
      var result = block(scope);
      if(result === false) return;
    }
  }


  var page = function() {
    var args   = slice.call(arguments),
        block  = args.pop(),
        blocks, scope;

    for(var index in args) {
      scope = args[index];
      blocks = initializers[scope] || [];
      blocks.push(block);
      initializers[scope] = blocks;
    }
  };

  page.run = function(scope) {
    scope = scope || page.identify();
    var blocks = initializers[scope] || [],
        before = initializers[':before'] || [];

    if(blocks && blocks.length) {
      chain = before.concat(blocks);
      runChain(chain, scope)
    }
  }

  page.identify = function() {
    // TODO: Implement plain DOM inspection.
  }

  exports.page = page;
})(this);