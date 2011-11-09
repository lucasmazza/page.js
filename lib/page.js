
/*!
 * page.js
 * Copyright(c) 2011 Lucas Mazza <luc4smazza@gmail.com>
 * MIT Licensed
 */

;(function(exports) {

  var slice = Array.prototype.slice,
      initializers = {};


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
    var blocks = initializers[scope],
        before = initializers[':before'];

    if(blocks && blocks.length) {
      for(index in before) {
        before[index](scope);
      }

      for(index in blocks) {
        blocks[index](scope);
      }
    }
  }

  page.identify = function() {
    // TODO: Implement plain DOM inspection.
  }

  exports.page = page;
})(this);