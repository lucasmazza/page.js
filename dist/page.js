/*!
 * page v0.4.0
 * lucasmazza/page.js
 * 
 * Licensed MIT © Lucas Mazza <lucastmazza@gmail.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("page", [], factory);
	else if(typeof exports === 'object')
		exports["page"] = factory();
	else
		root["page"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _page = __webpack_require__(1);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _page2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Internal: Initializes a 'Page' object.
	// Browser environments does not need to call this constructor
	// since a 'page' object will be exported in the global namespace.

	var Page = exports.Page = (function () {
	  _createClass(Page, null, [{
	    key: 'variantsDelimiter',
	    value: function variantsDelimiter() {
	      return '+';
	    }
	  }]);

	  function Page() {
	    _classCallCheck(this, Page);

	    this.initializers = { ':before': [], ':after': [] };
	    this.doc = window && window.document;
	  }

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

	  _createClass(Page, [{
	    key: 'at',
	    value: function at(scopes, fn) {
	      var parts = undefined,
	          scope = undefined,
	          block = undefined;
	      parts = scopes.split(' ');

	      for (var index = 0, len = parts.length; index < len; index++) {
	        scope = this._buildScope(parts[index]);
	        block = { variants: scope.variants, fn: fn };

	        this.initializers[scope.name] = this.initializers[scope.name] || [];
	        this.initializers[scope.name].push(block);
	      }
	    }

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

	  }, {
	    key: 'dispatch',
	    value: function dispatch() {
	      var raw = this.recognize();

	      if (raw !== undefined) {
	        var scope = this._buildScope(raw),
	            chain = this._buildChain(scope);

	        this._executeChain(chain, scope);
	      }
	    }

	    // Public: detects the current scope through the 'data-page'
	    // attribute on the 'body' tag.
	    //
	    // Returns a String.

	  }, {
	    key: 'recognize',
	    value: function recognize() {
	      var body = this.doc.getElementsByTagName('body')[0];

	      return body && body.getAttribute('data-page');
	    }

	    // Internal: builds a 'scope' object from the recognized scope String,
	    // identifing the scope 'name' and its 'variants'.
	    //
	    // Returns an Object.

	  }, {
	    key: '_buildScope',
	    value: function _buildScope(raw) {
	      var scope = {},
	          fragments = raw.split(Page.variantsDelimiter());

	      scope.name = fragments.shift();
	      scope.variants = fragments.sort();
	      return scope;
	    }

	    // Internal: builds a collection of functions to be called for the given
	    // scope. The functions under the ':before' and ':after' scopes will be
	    // inserted before and after the scope functions.
	    //
	    // Returns an Array.

	  }, {
	    key: '_buildChain',
	    value: function _buildChain(scope) {
	      var before = this.initializers[':before'],
	          current = this.initializers[scope.name] || [],
	          after = this.initializers[':after'];

	      return before.concat(current).concat(after);
	    }

	    // Internal: executes the chain of given functions using the
	    // scope name and variants as arguments. Whenever a function
	    // returns 'false', the chain will be halted.
	    //
	    // Returns nothing.

	  }, {
	    key: '_executeChain',
	    value: function _executeChain(chain, scope) {
	      var result = undefined,
	          block = undefined;
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
	    }

	    // Internal: Compares the elements of two Arrays to check if they
	    // are logically the same.
	    //
	    // Returns true or false.

	  }, {
	    key: '_arrayMatches',
	    value: function _arrayMatches(one, two) {
	      if (one.length !== two.length) return false;

	      for (var i = 0; i < one.length; ++i) {
	        if (one[i] !== two[i]) return false;
	      }

	      return true;
	    }
	  }]);

	  return Page;
	})();

	exports.default = new Page();

/***/ }
/******/ ])
});
;