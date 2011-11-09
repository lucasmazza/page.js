
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
    for(var index = 0; index < chain.length; index++) {
      block = chain[index];
      var result = block(scope);
      if(result === false) return;
    }
  }

  function createChain(blocks) {
    var beforeBlocks = initializers[':before'] || [],
        afterBlocks  = initializers[':after']  || [];

    return beforeBlocks.concat(blocks).concat(afterBlocks);
  }


  var page = function() {
    var args   = slice.call(arguments),
        block  = args.pop(),
        blocks, scope;

    for(var index = 0; index < args.length; index++) {
      scope = args[index];
      blocks = initializers[scope] || [];
      blocks.push(block);
      initializers[scope] = blocks;
    }
  };

  page.run = function(scope) {
    scope = scope || page.identify();
    var blocks = initializers[scope];

    if(blocks && blocks.length) {
      chain = createChain(blocks);
      runChain(chain, scope)
    }
  }

  page.identify = function() {
    var tags = document.getElementsByTagName('meta'),
        tag;

    for(var index = 0; index < tags.length; index++) {
      tag = tags[index];
      if(tag.name == 'page' && tag.value) return tag.value;
    }
  }

  exports.page = page;
})(this);