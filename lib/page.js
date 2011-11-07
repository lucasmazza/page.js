
/*!
 * page.js
 * Copyright(c) 2011 Lucas Mazza <luc4smazza@gmail.com>
 * MIT Licensed
 */

;(function(exports) {

  var initializers = {};


  var page = function(scope, block) {
    var blocks = initializers[scope] || [];

    blocks.push(block);
    initializers[scope] = blocks;
  };

  page.run = function(scope) {
    var blocks = initializers[scope];

    for(index in blocks) {
      blocks[index]();
    }
  }

  exports.page = page;
})(this);