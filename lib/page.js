
/*!
 * page.js
 * Copyright(c) 2011 Lucas Mazza <luc4smazza@gmail.com>
 * MIT Licensed
 */

;(function(exports) {

  var slice = Array.prototype.slice,
      pages = {};

  var page = function(scope, block) {
    var initializers = pages[scope] || [];
    initializers.push(block);
    page.initializers[scope] = initializers;
  }

  var clearPages = function() {
    pages = {};
    page.initializers = pages;
  }


  page.clear = clearPages;
  exports.page = page;

  page.clear();
})(this);