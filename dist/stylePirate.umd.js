(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("stylePirate", [], factory);
	else if(typeof exports === 'object')
		exports["stylePirate"] = factory();
	else
		root["stylePirate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(28)('wks');
var uid = __webpack_require__(29);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(21);
var hide = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(40);
var toPrimitive = __webpack_require__(41);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(36);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(14);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(17);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(51);
var enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(28)('keys');
var uid = __webpack_require__(29);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(39);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _from = __webpack_require__(15);

var _from2 = _interopRequireDefault(_from);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTMLPirate = function () {
  function HTMLPirate(el, options) {
    (0, _classCallCheck3.default)(this, HTMLPirate);

    this.el = el;
    this.document = options.document || document; // so that this can be run from other window
    this.options = options || {
      visibleOnly: true,
      replacements: null
    };
  }

  // return all parent elements of the given element
  // this must not return cloned elements because it's checking against styling later


  (0, _createClass3.default)(HTMLPirate, [{
    key: 'getIt',


    // returns full html of the given element including parent elements
    // <html><body><div><div><my-el></my-el></div></div></body>
    value: function getIt() {
      var parentEls = this.parentElements;
      var htmlEl = void 0,
          parentEl = void 0,
          cloned = void 0;
      parentEls.forEach(function (el) {
        if (!el.outerHTML) {// document
        } else if (el instanceof HTMLHtmlElement) {
          htmlEl = el.cloneNode(false);
          parentEl = htmlEl;
        } else {
          cloned = el.cloneNode(false);
          parentEl.appendChild(cloned);
          parentEl = cloned;
        }
      });
      this._markInvisibleEls(); // set which is invisible before clone happens
      cloned = this.el.cloneNode(true);
      this._unmarkInvisibleEls();
      if (this.options.visibleOnly !== false) {
        // remove hidden elements from html generation
        cloned = this._removeHiddenElements(cloned);
      }
      parentEl.appendChild(cloned);

      var htmlStr = '<!DOCTYPE html>\n' + htmlEl.outerHTML;
      this.options.replacements && (htmlStr = this._getReplacedHtmlStr(htmlStr));
      return htmlStr;
    }

    // set `style-pirate-hidden` to hidden elements, so that it can be removed

  }, {
    key: '_markInvisibleEls',
    value: function _markInvisibleEls() {
      var all = (0, _from2.default)(this.el.getElementsByTagName("*"));
      all.filter(function (e) {
        return !e.offsetParent;
      }).forEach(function (el) {
        el.setAttribute('style-pirate-hidden', 1);
      });
    }

    // delete attribute `style-pirate-hidden` since it is added by this class

  }, {
    key: '_unmarkInvisibleEls',
    value: function _unmarkInvisibleEls() {
      var all = (0, _from2.default)(this.el.getElementsByTagName("[style-pirate-hidden=1]"));
      all.forEach(function (el) {
        return el.removeAttribute('style-pirate-hidden');
      });
    }

    // replace htmlstring with the given options, and returns the replaced string

  }, {
    key: '_getReplacedHtmlStr',
    value: function _getReplacedHtmlStr(str) {
      var htmlStr = str;
      if (this.options.replacements) {
        this.options.replacements.forEach(function (replacement) {
          var regex = replacement.regex;
          var newStr = replacement.newStr;
          htmlStr = htmlStr.replace(regex, newStr);
        });
      }
      return htmlStr;
    }

    // remove hidden elements(marked with an attribute) from list of cloned elements

  }, {
    key: '_removeHiddenElements',
    value: function _removeHiddenElements(clonedEl) {
      var hiddenEls = (0, _from2.default)(clonedEl.querySelectorAll('[style-pirate-hidden]'));
      hiddenEls.forEach(function (el) {
        return el.remove();
      });
      return clonedEl;
    }
  }, {
    key: 'parentElements',
    get: function get() {
      var pos = this.el,
          parents = [];
      while (pos = pos.parentNode) {
        parents.unshift(pos);
      }
      return parents;
    }
  }]);
  return HTMLPirate;
}();

module.exports = HTMLPirate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWwtcGlyYXRlLmpzIl0sIm5hbWVzIjpbIkhUTUxQaXJhdGUiLCJlbCIsIm9wdGlvbnMiLCJkb2N1bWVudCIsInZpc2libGVPbmx5IiwicmVwbGFjZW1lbnRzIiwicGFyZW50RWxzIiwicGFyZW50RWxlbWVudHMiLCJodG1sRWwiLCJwYXJlbnRFbCIsImNsb25lZCIsImZvckVhY2giLCJvdXRlckhUTUwiLCJIVE1MSHRtbEVsZW1lbnQiLCJjbG9uZU5vZGUiLCJhcHBlbmRDaGlsZCIsIl9tYXJrSW52aXNpYmxlRWxzIiwiX3VubWFya0ludmlzaWJsZUVscyIsIl9yZW1vdmVIaWRkZW5FbGVtZW50cyIsImh0bWxTdHIiLCJfZ2V0UmVwbGFjZWRIdG1sU3RyIiwiYWxsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJmaWx0ZXIiLCJlIiwib2Zmc2V0UGFyZW50Iiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwic3RyIiwicmVnZXgiLCJyZXBsYWNlbWVudCIsIm5ld1N0ciIsInJlcGxhY2UiLCJjbG9uZWRFbCIsImhpZGRlbkVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJwb3MiLCJwYXJlbnRzIiwicGFyZW50Tm9kZSIsInVuc2hpZnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLFU7QUFFSixzQkFBWUMsRUFBWixFQUFnQkMsT0FBaEIsRUFBeUI7QUFBQTs7QUFDdkIsU0FBS0QsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQkQsUUFBUUMsUUFBUixJQUFvQkEsUUFBcEMsQ0FGdUIsQ0FFdUI7QUFDOUMsU0FBS0QsT0FBTCxHQUFlQSxXQUFXO0FBQ3hCRSxtQkFBYSxJQURXO0FBRXhCQyxvQkFBYztBQUZVLEtBQTFCO0FBSUQ7O0FBRUQ7QUFDQTs7Ozs7OztBQVNBO0FBQ0E7NEJBQ1E7QUFDTixVQUFJQyxZQUFZLEtBQUtDLGNBQXJCO0FBQ0EsVUFBSUMsZUFBSjtBQUFBLFVBQVlDLGlCQUFaO0FBQUEsVUFBc0JDLGVBQXRCO0FBQ0FKLGdCQUFVSyxPQUFWLENBQWtCLGNBQU07QUFDdEIsWUFBSSxDQUFDVixHQUFHVyxTQUFSLEVBQW1CLENBQUU7QUFDcEIsU0FERCxNQUNPLElBQUlYLGNBQWNZLGVBQWxCLEVBQW1DO0FBQ3hDTCxtQkFBU1AsR0FBR2EsU0FBSCxDQUFhLEtBQWIsQ0FBVDtBQUNBTCxxQkFBV0QsTUFBWDtBQUNELFNBSE0sTUFHQTtBQUNMRSxtQkFBU1QsR0FBR2EsU0FBSCxDQUFhLEtBQWIsQ0FBVDtBQUNBTCxtQkFBU00sV0FBVCxDQUFxQkwsTUFBckI7QUFDQUQscUJBQVdDLE1BQVg7QUFDRDtBQUNGLE9BVkQ7QUFXQSxXQUFLTSxpQkFBTCxHQWRNLENBY29CO0FBQzFCTixlQUFTLEtBQUtULEVBQUwsQ0FBUWEsU0FBUixDQUFrQixJQUFsQixDQUFUO0FBQ0EsV0FBS0csbUJBQUw7QUFDQSxVQUFJLEtBQUtmLE9BQUwsQ0FBYUUsV0FBYixLQUE2QixLQUFqQyxFQUF3QztBQUFFO0FBQ3hDTSxpQkFBUyxLQUFLUSxxQkFBTCxDQUEyQlIsTUFBM0IsQ0FBVDtBQUNEO0FBQ0RELGVBQVNNLFdBQVQsQ0FBcUJMLE1BQXJCOztBQUVBLFVBQUlTLFVBQVcsc0JBQW9CWCxPQUFPSSxTQUExQztBQUNBLFdBQUtWLE9BQUwsQ0FBYUcsWUFBYixLQUE4QmMsVUFBVSxLQUFLQyxtQkFBTCxDQUF5QkQsT0FBekIsQ0FBeEM7QUFDQSxhQUFPQSxPQUFQO0FBQ0Q7O0FBRUQ7Ozs7d0NBQ29CO0FBQ2xCLFVBQUlFLE1BQU0sb0JBQVcsS0FBS3BCLEVBQUwsQ0FBUXFCLG9CQUFSLENBQTZCLEdBQTdCLENBQVgsQ0FBVjtBQUNBRCxVQUFJRSxNQUFKLENBQVc7QUFBQSxlQUFLLENBQUNDLEVBQUVDLFlBQVI7QUFBQSxPQUFYLEVBQWlDZCxPQUFqQyxDQUF5QyxjQUFNO0FBQzdDVixXQUFHeUIsWUFBSCxDQUFnQixxQkFBaEIsRUFBc0MsQ0FBdEM7QUFDRCxPQUZEO0FBR0Q7O0FBRUQ7Ozs7MENBQ3NCO0FBQ3BCLFVBQUlMLE1BQU0sb0JBQVcsS0FBS3BCLEVBQUwsQ0FBUXFCLG9CQUFSLENBQTZCLHlCQUE3QixDQUFYLENBQVY7QUFDQUQsVUFBSVYsT0FBSixDQUFZO0FBQUEsZUFBTVYsR0FBRzBCLGVBQUgsQ0FBbUIscUJBQW5CLENBQU47QUFBQSxPQUFaO0FBQ0Q7O0FBRUQ7Ozs7d0NBQ29CQyxHLEVBQUs7QUFDdkIsVUFBSVQsVUFBVVMsR0FBZDtBQUNBLFVBQUksS0FBSzFCLE9BQUwsQ0FBYUcsWUFBakIsRUFBK0I7QUFDN0IsYUFBS0gsT0FBTCxDQUFhRyxZQUFiLENBQTBCTSxPQUExQixDQUFrQyx1QkFBZTtBQUMvQyxjQUFJa0IsUUFBU0MsWUFBWUQsS0FBekI7QUFDQSxjQUFJRSxTQUFTRCxZQUFZQyxNQUF6QjtBQUNBWixvQkFBVUEsUUFBUWEsT0FBUixDQUFnQkgsS0FBaEIsRUFBdUJFLE1BQXZCLENBQVY7QUFDRCxTQUpEO0FBS0Q7QUFDRCxhQUFPWixPQUFQO0FBQ0Q7O0FBRUQ7Ozs7MENBQ3NCYyxRLEVBQVU7QUFDOUIsVUFBSUMsWUFBWSxvQkFBV0QsU0FBU0UsZ0JBQVQsQ0FBMEIsdUJBQTFCLENBQVgsQ0FBaEI7QUFDQUQsZ0JBQVV2QixPQUFWLENBQWtCO0FBQUEsZUFBTVYsR0FBR21DLE1BQUgsRUFBTjtBQUFBLE9BQWxCO0FBQ0EsYUFBT0gsUUFBUDtBQUNEOzs7d0JBckVvQjtBQUNuQixVQUFJSSxNQUFNLEtBQUtwQyxFQUFmO0FBQUEsVUFBbUJxQyxVQUFVLEVBQTdCO0FBQ0EsYUFBT0QsTUFBTUEsSUFBSUUsVUFBakIsRUFBNkI7QUFDM0JELGdCQUFRRSxPQUFSLENBQWdCSCxHQUFoQjtBQUNEO0FBQ0QsYUFBT0MsT0FBUDtBQUNEOzs7OztBQW1FSEcsT0FBT0MsT0FBUCxHQUFpQjFDLFVBQWpCIiwiZmlsZSI6Imh0bWwtcGlyYXRlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGxlbi5raW0vZ2l0aHViL3N0eWxlLXBpcmF0ZSIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhUTUxQaXJhdGUge1xuXG4gIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuZG9jdW1lbnQgPSBvcHRpb25zLmRvY3VtZW50IHx8IGRvY3VtZW50OyAvLyBzbyB0aGF0IHRoaXMgY2FuIGJlIHJ1biBmcm9tIG90aGVyIHdpbmRvd1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge1xuICAgICAgdmlzaWJsZU9ubHk6IHRydWUsXG4gICAgICByZXBsYWNlbWVudHM6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgLy8gcmV0dXJuIGFsbCBwYXJlbnQgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAgLy8gdGhpcyBtdXN0IG5vdCByZXR1cm4gY2xvbmVkIGVsZW1lbnRzIGJlY2F1c2UgaXQncyBjaGVja2luZyBhZ2FpbnN0IHN0eWxpbmcgbGF0ZXJcbiAgZ2V0IHBhcmVudEVsZW1lbnRzKCkgeyBcbiAgICBsZXQgcG9zID0gdGhpcy5lbCwgcGFyZW50cyA9IFtdO1xuICAgIHdoaWxlIChwb3MgPSBwb3MucGFyZW50Tm9kZSkge1xuICAgICAgcGFyZW50cy51bnNoaWZ0KHBvcyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRzO1xuICB9XG5cbiAgLy8gcmV0dXJucyBmdWxsIGh0bWwgb2YgdGhlIGdpdmVuIGVsZW1lbnQgaW5jbHVkaW5nIHBhcmVudCBlbGVtZW50c1xuICAvLyA8aHRtbD48Ym9keT48ZGl2PjxkaXY+PG15LWVsPjwvbXktZWw+PC9kaXY+PC9kaXY+PC9ib2R5PlxuICBnZXRJdCgpIHtcbiAgICBsZXQgcGFyZW50RWxzID0gdGhpcy5wYXJlbnRFbGVtZW50cztcbiAgICBsZXQgaHRtbEVsLCBwYXJlbnRFbCwgY2xvbmVkO1xuICAgIHBhcmVudEVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGlmICghZWwub3V0ZXJIVE1MKSB7IC8vIGRvY3VtZW50XG4gICAgICB9IGVsc2UgaWYgKGVsIGluc3RhbmNlb2YgSFRNTEh0bWxFbGVtZW50KSB7XG4gICAgICAgIGh0bWxFbCA9IGVsLmNsb25lTm9kZShmYWxzZSk7XG4gICAgICAgIHBhcmVudEVsID0gaHRtbEVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xvbmVkID0gZWwuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgcGFyZW50RWwuYXBwZW5kQ2hpbGQoY2xvbmVkKTtcbiAgICAgICAgcGFyZW50RWwgPSBjbG9uZWQ7XG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLl9tYXJrSW52aXNpYmxlRWxzKCk7IC8vIHNldCB3aGljaCBpcyBpbnZpc2libGUgYmVmb3JlIGNsb25lIGhhcHBlbnNcbiAgICBjbG9uZWQgPSB0aGlzLmVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl91bm1hcmtJbnZpc2libGVFbHMoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnZpc2libGVPbmx5ICE9PSBmYWxzZSkgeyAvLyByZW1vdmUgaGlkZGVuIGVsZW1lbnRzIGZyb20gaHRtbCBnZW5lcmF0aW9uXG4gICAgICBjbG9uZWQgPSB0aGlzLl9yZW1vdmVIaWRkZW5FbGVtZW50cyhjbG9uZWQpO1xuICAgIH1cbiAgICBwYXJlbnRFbC5hcHBlbmRDaGlsZChjbG9uZWQpO1xuXG4gICAgbGV0IGh0bWxTdHIgPSAgJzwhRE9DVFlQRSBodG1sPlxcbicraHRtbEVsLm91dGVySFRNTDtcbiAgICB0aGlzLm9wdGlvbnMucmVwbGFjZW1lbnRzICYmIChodG1sU3RyID0gdGhpcy5fZ2V0UmVwbGFjZWRIdG1sU3RyKGh0bWxTdHIpKTtcbiAgICByZXR1cm4gaHRtbFN0cjtcbiAgfVxuXG4gIC8vIHNldCBgc3R5bGUtcGlyYXRlLWhpZGRlbmAgdG8gaGlkZGVuIGVsZW1lbnRzLCBzbyB0aGF0IGl0IGNhbiBiZSByZW1vdmVkXG4gIF9tYXJrSW52aXNpYmxlRWxzKCkge1xuICAgIGxldCBhbGwgPSBBcnJheS5mcm9tKHRoaXMuZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpKTtcbiAgICBhbGwuZmlsdGVyKGUgPT4gIWUub2Zmc2V0UGFyZW50KS5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnc3R5bGUtcGlyYXRlLWhpZGRlbicsMSlcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGRlbGV0ZSBhdHRyaWJ1dGUgYHN0eWxlLXBpcmF0ZS1oaWRkZW5gIHNpbmNlIGl0IGlzIGFkZGVkIGJ5IHRoaXMgY2xhc3NcbiAgX3VubWFya0ludmlzaWJsZUVscygpIHtcbiAgICBsZXQgYWxsID0gQXJyYXkuZnJvbSh0aGlzLmVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiW3N0eWxlLXBpcmF0ZS1oaWRkZW49MV1cIikpO1xuICAgIGFsbC5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUtcGlyYXRlLWhpZGRlbicpKTtcbiAgfVxuXG4gIC8vIHJlcGxhY2UgaHRtbHN0cmluZyB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLCBhbmQgcmV0dXJucyB0aGUgcmVwbGFjZWQgc3RyaW5nXG4gIF9nZXRSZXBsYWNlZEh0bWxTdHIoc3RyKSB7XG4gICAgbGV0IGh0bWxTdHIgPSBzdHI7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXBsYWNlbWVudHMpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXBsYWNlbWVudHMuZm9yRWFjaChyZXBsYWNlbWVudCA9PiB7XG4gICAgICAgIGxldCByZWdleCAgPSByZXBsYWNlbWVudC5yZWdleDtcbiAgICAgICAgbGV0IG5ld1N0ciA9IHJlcGxhY2VtZW50Lm5ld1N0cjtcbiAgICAgICAgaHRtbFN0ciA9IGh0bWxTdHIucmVwbGFjZShyZWdleCwgbmV3U3RyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbFN0cjtcbiAgfVxuXG4gIC8vIHJlbW92ZSBoaWRkZW4gZWxlbWVudHMobWFya2VkIHdpdGggYW4gYXR0cmlidXRlKSBmcm9tIGxpc3Qgb2YgY2xvbmVkIGVsZW1lbnRzXG4gIF9yZW1vdmVIaWRkZW5FbGVtZW50cyhjbG9uZWRFbCkge1xuICAgIGxldCBoaWRkZW5FbHMgPSBBcnJheS5mcm9tKGNsb25lZEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tzdHlsZS1waXJhdGUtaGlkZGVuXScpKTtcbiAgICBoaWRkZW5FbHMuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG4gICAgcmV0dXJuIGNsb25lZEVsO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MUGlyYXRlO1xuIl19

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(25);
var defined = __webpack_require__(17);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(16);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = __webpack_require__(15);

var _from2 = _interopRequireDefault(_from);

var _keys = __webpack_require__(63);

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(67);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSSPirate = function () {
  function CSSPirate(el, options) {
    (0, _classCallCheck3.default)(this, CSSPirate);

    this.el = el;
    this.document = options.document || document; // so that this can be run from other window
    this.options = options || {
      styleSheets: undefined
    };
    this.elCssRules = []; // cssRule collection for all elements
    this.fontRules = [];
    this.keyframesRules = [];
  }

  // returns style sheets to process. default. document.styleSheets


  (0, _createClass3.default)(CSSPirate, [{
    key: 'getIt',


    // return css texts groupd by css, keyframs, and fonts
    // from the given cssRules, collect element matching rules for each element
    value: function getIt() {
      var styleSheets = this.styleSheets;
      var parentEls = this.parentElements;
      var sectionEls = this.visibleSectionElements;
      this.elCssRules = parentEls.concat(sectionEls).map(function (el) {
        return { el: el, cssRules: [] };
      });

      var styleSheet = void 0,
          cssRule = void 0;
      for (var i = 0; i < styleSheets.length; i++) {
        styleSheet = styleSheets[i];
        console.log('StylePirate: processing ', styleSheet.cssRules && styleSheet.cssRules.length, 'rules of', styleSheet.href);
        // some styleSheet does not have rules, maybe broken?
        if (styleSheet.cssRules) {
          this._processCssRules(styleSheet.cssRules);
        }
      }

      //this.elCssRulesl
      return {
        style: this._getCss(parentEls) + '\n /* -------------------------------------------------------- */\n' + this._getCss(sectionEls),
        keyframes: this.keyframesRules.map(function (rule) {
          return rule.cssText;
        }).join('\n'),
        fonts: this.fontRules.map(function (rule) {
          return rule.cssText;
        }).join('\n')
      };
    }

    // returns a clone object from given cssRule and extended properties
    // Why clone? because we must NOT alter the existing cssRule

  }, {
    key: '_getClonedRule',
    value: function _getClonedRule(cssRule, extended) {
      var _this = this;

      var clonedRule = (0, _assign2.default)(extended || {}, {
        cssText: cssRule.cssText,
        parentRule: cssRule.parentRule,
        parentSytleSheet: cssRule.parentStyleSheet,
        selectorText: cssRule.selectorText,
        style: cssRule.style,
        type: cssRule.type
      });
      clonedRule.cssText = clonedRule.cssText.replace(/[^\u0000-\u00ff]/g, function ($) {
        return _this._toUTF16($.charCodeAt(0)).replace(/\\u/, '\\');
      });

      return clonedRule;
    }

    // returns utf16 characters from the given character code
    // e.g., this._toUTF16('A'.charCodeAt(0)).replace(/\\u/,'\\');

  }, {
    key: '_toUTF16',
    value: function _toUTF16(codePoint) {
      var TEN_BITS = parseInt('1111111111', 2);
      function u(codeUnit) {
        return '\\u' + codeUnit.toString(16).toUpperCase();
      }

      if (codePoint <= 0xFFFF) {
        return u(codePoint);
      }
      codePoint -= 0x10000;

      // Shift right to get to most significant 10 bits
      var leadSurrogate = 0xD800 + (codePoint >> 10);

      // Mask to get least significant 10 bits
      var tailSurrogate = 0xDC00 + (codePoint & TEN_BITS);

      return u(leadSurrogate) + u(tailSurrogate);
    }

    // returns css texts of the list of elements

  }, {
    key: '_getCss',
    value: function _getCss(limitToEls) {
      var el = void 0,
          cssRules = void 0;
      var conditionTexts = {}; // key: condition, value : array of css rule
      var cssTexts = [];;
      var output = '';

      this.elCssRules.forEach(function (elCssRule) {
        var _ref = [elCssRule.el, elCssRule.cssRules];
        el = _ref[0];
        cssRules = _ref[1];

        if (limitToEls.includes(el)) {
          cssRules.forEach(function (cssRule) {
            // if normal css, add it to cssTexts, if not add it to conditionTexts;
            if (cssRule.conditionText) {
              conditionTexts[cssRule.conditionText] = conditionTexts[cssRule.conditionText] || [];
              if (!conditionTexts[cssRule.conditionText].includes(cssRule.cssText)) {
                conditionTexts[cssRule.conditionText].push(cssRule.cssText);
              }
            } else {
              if (!cssTexts.includes(cssRule.cssText)) {
                cssTexts.push(cssRule.cssText);
              }
            }
          });
        }
      });

      //group conditionTexts, and add to cssTexts;
      (0, _keys2.default)(conditionTexts).forEach(function (conditionText) {
        var output = [].concat(conditionText + '{', conditionTexts[conditionText].map(function (el) {
          return '  ' + el;
        }), '}');
        cssTexts.push(output.join('\n'));
      });

      return cssTexts.join('\n');
    }

    // return css of the given element
    //   cssRules: cssRules of a a styleSheet e.g. document.styleSheets[1].cssRules
    //   conditionText: conditionText attached to the cssRules. 
    //     for CSSRule, there is no conditionText, 
    //     but for CSSMediaRule, there is condition text. e.g., `@media (min-width: 1012px)`

  }, {
    key: '_processCssRules',
    value: function _processCssRules(cssRules, conditionText) {
      var _this2 = this;

      var _loop = function _loop() {
        var cssRule = cssRules[j];

        // if css rule and element matches, collect rules
        if (cssRule instanceof CSSStyleRule) {
          _this2.elCssRules.forEach(function (elCssRule) {
            // remove pseudo class(elements) for element.matches call
            // ref. https://www.w3.org/TR/selectors-api/#grammar
            var selector = cssRule.selectorText.replace(/^[ ]*:[:a-z\-]+(\([^\)]+\))?/, '*').replace(/ \\?:[:a-z\-]+(\([^\)]+\))?/g, ' *').replace(/\\?:[:a-z\-]+\([^\)]+\)/g, '') // e.g. audio:not([controls]),
            .replace(/\\?:[^, \]]+/g, '');

            // (selector === '') && (selector = '*'); // incase  ':before'

            try {
              if (!elCssRule.el.matches) {} // #document does not have this function
              // if the given css rule is for this element
              else if (elCssRule.el.matches(selector)) {
                  // must not make change on existing css rule if add any extra attrs.
                  var cloned = _this2._getClonedRule(cssRule, { conditionText: conditionText });

                  elCssRule.cssRules.push(cloned);
                }
            } catch (e) {
              console.error('Invalid selector found', cssRule.selectorText, e);
            }
          });
        }

        // collect all font rules
        else if (cssRule instanceof CSSFontFaceRule) {
            _this2.fontRules.push(cssRule);
          }

          // collect all keyframe rules
          else if (cssRule instanceof CSSKeyframesRule) {
              _this2.keyframesRules.push(cssRule);
            }

            // for media rule, add condition text and collect matching css rules
            else if (cssRule instanceof CSSMediaRule) {
                var mediaRule = cssRule;
                var _conditionText = '@media ' + mediaRule.conditionText;
                _this2._processCssRules(mediaRule.cssRules, _conditionText);
              }

              // rules that are not processing
              //  CSSImportRule    // @import
              //  CSSKeyFramesRule // @keyframes
              //  CSSSupportsRule  // @supports
              //  CSSPageRule      // @page
              else {
                  console.warn('found non-processing rule', cssRule);
                }
      };

      for (var j = 0; j < cssRules.length; j++) {
        _loop();
      }
    }
  }, {
    key: 'styleSheets',
    get: function get() {
      return this.options.styleSheets || this.document.styleSheets;
    }

    // returns parent elements or the given elements starting with <!doctype>, <html>, and etc

  }, {
    key: 'parentElements',
    get: function get() {
      var pos = this.el,
          parents = [];
      while (pos = pos.parentNode) {
        parents.unshift(pos);
      };
      return parents;
    }

    // returns all visible elements including all children elements
    // this must NOT return cloned elements because it's checking against styling later

  }, {
    key: 'visibleSectionElements',
    get: function get() {
      var allEls = (0, _from2.default)(this.el.getElementsByTagName("*"));
      allEls.unshift(this.el);
      return allEls.filter(function (el) {
        return el.offsetParent;
      });
    }
  }]);
  return CSSPirate;
}();

exports.default = CSSPirate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNzcy1waXJhdGUuanMiXSwibmFtZXMiOlsiQ1NTUGlyYXRlIiwiZWwiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJzdHlsZVNoZWV0cyIsInVuZGVmaW5lZCIsImVsQ3NzUnVsZXMiLCJmb250UnVsZXMiLCJrZXlmcmFtZXNSdWxlcyIsInBhcmVudEVscyIsInBhcmVudEVsZW1lbnRzIiwic2VjdGlvbkVscyIsInZpc2libGVTZWN0aW9uRWxlbWVudHMiLCJjb25jYXQiLCJtYXAiLCJjc3NSdWxlcyIsInN0eWxlU2hlZXQiLCJjc3NSdWxlIiwiaSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJocmVmIiwiX3Byb2Nlc3NDc3NSdWxlcyIsInN0eWxlIiwiX2dldENzcyIsImtleWZyYW1lcyIsInJ1bGUiLCJjc3NUZXh0Iiwiam9pbiIsImZvbnRzIiwiZXh0ZW5kZWQiLCJjbG9uZWRSdWxlIiwicGFyZW50UnVsZSIsInBhcmVudFN5dGxlU2hlZXQiLCJwYXJlbnRTdHlsZVNoZWV0Iiwic2VsZWN0b3JUZXh0IiwidHlwZSIsInJlcGxhY2UiLCJfdG9VVEYxNiIsIiQiLCJjaGFyQ29kZUF0IiwiY29kZVBvaW50IiwiVEVOX0JJVFMiLCJwYXJzZUludCIsInUiLCJjb2RlVW5pdCIsInRvU3RyaW5nIiwidG9VcHBlckNhc2UiLCJsZWFkU3Vycm9nYXRlIiwidGFpbFN1cnJvZ2F0ZSIsImxpbWl0VG9FbHMiLCJjb25kaXRpb25UZXh0cyIsImNzc1RleHRzIiwib3V0cHV0IiwiZm9yRWFjaCIsImVsQ3NzUnVsZSIsImluY2x1ZGVzIiwiY29uZGl0aW9uVGV4dCIsInB1c2giLCJqIiwiQ1NTU3R5bGVSdWxlIiwic2VsZWN0b3IiLCJtYXRjaGVzIiwiY2xvbmVkIiwiX2dldENsb25lZFJ1bGUiLCJlIiwiZXJyb3IiLCJDU1NGb250RmFjZVJ1bGUiLCJDU1NLZXlmcmFtZXNSdWxlIiwiQ1NTTWVkaWFSdWxlIiwibWVkaWFSdWxlIiwid2FybiIsInBvcyIsInBhcmVudHMiLCJwYXJlbnROb2RlIiwidW5zaGlmdCIsImFsbEVscyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZmlsdGVyIiwib2Zmc2V0UGFyZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLFM7QUFFSixxQkFBWUMsRUFBWixFQUFnQkMsT0FBaEIsRUFBeUI7QUFBQTs7QUFDdkIsU0FBS0QsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQkQsUUFBUUMsUUFBUixJQUFvQkEsUUFBcEMsQ0FGdUIsQ0FFdUI7QUFDOUMsU0FBS0QsT0FBTCxHQUFlQSxXQUFXO0FBQ3hCRSxtQkFBYUM7QUFEVyxLQUExQjtBQUdBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEIsQ0FOdUIsQ0FNRDtBQUN0QixTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixFQUF0QjtBQUNEOztBQUVEOzs7Ozs7O0FBb0JBO0FBQ0E7NEJBQ1E7QUFDTixVQUFJSixjQUFjLEtBQUtBLFdBQXZCO0FBQ0EsVUFBSUssWUFBYyxLQUFLQyxjQUF2QjtBQUNBLFVBQUlDLGFBQWMsS0FBS0Msc0JBQXZCO0FBQ0EsV0FBS04sVUFBTCxHQUFrQkcsVUFBVUksTUFBVixDQUFpQkYsVUFBakIsRUFBNkJHLEdBQTdCLENBQ2hCO0FBQUEsZUFBTyxFQUFFYixJQUFJQSxFQUFOLEVBQVVjLFVBQVUsRUFBcEIsRUFBUDtBQUFBLE9BRGdCLENBQWxCOztBQUlBLFVBQUlDLG1CQUFKO0FBQUEsVUFBZ0JDLGdCQUFoQjtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJZCxZQUFZZSxNQUFoQyxFQUF3Q0QsR0FBeEMsRUFBNkM7QUFDM0NGLHFCQUFhWixZQUFZYyxDQUFaLENBQWI7QUFDQUUsZ0JBQVFDLEdBQVIsQ0FBWSwwQkFBWixFQUNFTCxXQUFXRCxRQUFYLElBQXVCQyxXQUFXRCxRQUFYLENBQW9CSSxNQUQ3QyxFQUVFLFVBRkYsRUFFY0gsV0FBV00sSUFGekI7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QXFDeUMsR0FBckMsRUFBMEM7QUFBQTtBQTBEekM7QUFDRjs7O3dCQXBNaUI7QUFDaEIsYUFBTyxLQUFLMUQsT0FBTCxDQUFhRSxXQUFiLElBQTRCLEtBQUtELFFBQUwsQ0FBY0MsV0FBakQ7QUFDRDs7QUFFRDs7Ozt3QkFDcUI7QUFDbkIsVUFBSXFFLE1BQU0sS0FBS3hFLEVBQWY7QUFBQSxVQUFtQnlFLFVBQVUsRUFBN0I7QUFDQSxhQUFPRCxNQUFNQSxJQUFJRSxVQUFqQixFQUE2QjtBQUFFRCxnQkFBUUUsT0FBUixDQUFnQkgsR0FBaEI7QUFBc0I7QUFDckQsYUFBT0MsT0FBUDtBQUNEOztBQUVEO0FBQ0E7Ozs7d0JBQzZCO0FBQzNCLFVBQUlHLFNBQVMsb0JBQVcsS0FBSzVFLEVBQUwsQ0FBUTZFLG9CQUFSLENBQTZCLEdBQTdCLENBQVgsQ0FBYjtBQUNBRCxhQUFPRCxPQUFQLENBQWUsS0FBSzNFLEVBQXBCO0FBQ0EsYUFBTzRFLE9BQU9FLE1BQVAsQ0FBYztBQUFBLGVBQU05RSxHQUFHK0UsWUFBVDtBQUFBLE9BQWQsQ0FBUDtBQUNEOzs7OztrQkF1TFloRixTIiwiZmlsZSI6ImNzcy1waXJhdGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsbGVuLmtpbS9naXRodWIvc3R5bGUtcGlyYXRlIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ1NTUGlyYXRlIHtcblxuICBjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucykge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmRvY3VtZW50ID0gb3B0aW9ucy5kb2N1bWVudCB8fCBkb2N1bWVudDsgLy8gc28gdGhhdCB0aGlzIGNhbiBiZSBydW4gZnJvbSBvdGhlciB3aW5kb3dcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHtcbiAgICAgIHN0eWxlU2hlZXRzOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIHRoaXMuZWxDc3NSdWxlcyA9IFtdOyAvLyBjc3NSdWxlIGNvbGxlY3Rpb24gZm9yIGFsbCBlbGVtZW50c1xuICAgIHRoaXMuZm9udFJ1bGVzID0gW107XG4gICAgdGhpcy5rZXlmcmFtZXNSdWxlcyA9IFtdO1xuICB9XG5cbiAgLy8gcmV0dXJucyBzdHlsZSBzaGVldHMgdG8gcHJvY2Vzcy4gZGVmYXVsdC4gZG9jdW1lbnQuc3R5bGVTaGVldHNcbiAgZ2V0IHN0eWxlU2hlZXRzKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc3R5bGVTaGVldHMgfHwgdGhpcy5kb2N1bWVudC5zdHlsZVNoZWV0cztcbiAgfVxuXG4gIC8vIHJldHVybnMgcGFyZW50IGVsZW1lbnRzIG9yIHRoZSBnaXZlbiBlbGVtZW50cyBzdGFydGluZyB3aXRoIDwhZG9jdHlwZT4sIDxodG1sPiwgYW5kIGV0Y1xuICBnZXQgcGFyZW50RWxlbWVudHMoKSB7IFxuICAgIGxldCBwb3MgPSB0aGlzLmVsLCBwYXJlbnRzID0gW107XG4gICAgd2hpbGUgKHBvcyA9IHBvcy5wYXJlbnROb2RlKSB7IHBhcmVudHMudW5zaGlmdChwb3MpIH07XG4gICAgcmV0dXJuIHBhcmVudHM7XG4gIH1cblxuICAvLyByZXR1cm5zIGFsbCB2aXNpYmxlIGVsZW1lbnRzIGluY2x1ZGluZyBhbGwgY2hpbGRyZW4gZWxlbWVudHNcbiAgLy8gdGhpcyBtdXN0IE5PVCByZXR1cm4gY2xvbmVkIGVsZW1lbnRzIGJlY2F1c2UgaXQncyBjaGVja2luZyBhZ2FpbnN0IHN0eWxpbmcgbGF0ZXJcbiAgZ2V0IHZpc2libGVTZWN0aW9uRWxlbWVudHMoKSB7XG4gICAgdmFyIGFsbEVscyA9IEFycmF5LmZyb20odGhpcy5lbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikpO1xuICAgIGFsbEVscy51bnNoaWZ0KHRoaXMuZWwpO1xuICAgIHJldHVybiBhbGxFbHMuZmlsdGVyKGVsID0+IGVsLm9mZnNldFBhcmVudCk7XG4gIH1cblxuICAvLyByZXR1cm4gY3NzIHRleHRzIGdyb3VwZCBieSBjc3MsIGtleWZyYW1zLCBhbmQgZm9udHNcbiAgLy8gZnJvbSB0aGUgZ2l2ZW4gY3NzUnVsZXMsIGNvbGxlY3QgZWxlbWVudCBtYXRjaGluZyBydWxlcyBmb3IgZWFjaCBlbGVtZW50XG4gIGdldEl0KCkge1xuICAgIGxldCBzdHlsZVNoZWV0cyA9IHRoaXMuc3R5bGVTaGVldHM7XG4gICAgbGV0IHBhcmVudEVscyAgID0gdGhpcy5wYXJlbnRFbGVtZW50cztcbiAgICBsZXQgc2VjdGlvbkVscyAgPSB0aGlzLnZpc2libGVTZWN0aW9uRWxlbWVudHM7XG4gICAgdGhpcy5lbENzc1J1bGVzID0gcGFyZW50RWxzLmNvbmNhdChzZWN0aW9uRWxzKS5tYXAoXG4gICAgICBlbCA9PiAoeyBlbDogZWwsIGNzc1J1bGVzOiBbXSB9KVxuICAgICk7XG5cbiAgICBsZXQgc3R5bGVTaGVldCwgY3NzUnVsZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlU2hlZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHlsZVNoZWV0ID0gc3R5bGVTaGVldHNbaV07XG4gICAgICBjb25zb2xlLmxvZygnU3R5bGVQaXJhdGU6IHByb2Nlc3NpbmcgJyxcbiAgICAgICAgc3R5bGVTaGVldC5jc3NSdWxlcyAmJiBzdHlsZVNoZWV0LmNzc1J1bGVzLmxlbmd0aCxcbiAgICAgICAgJ3J1bGVzIG9mJywgc3R5bGVTaGVldC5ocmVmKTtcbiAgICAgIC8vIHNvbWUgc3R5bGVTaGVldCBkb2VzIG5vdCBoYXZlIHJ1bGVzLCBtYXliZSBicm9rZW4/XG4gICAgICBpZiAoc3R5bGVTaGVldC5jc3NSdWxlcykgeyBcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0Nzc1J1bGVzKHN0eWxlU2hlZXQuY3NzUnVsZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vdGhpcy5lbENzc1J1bGVzbFxuICAgIHJldHVybiB7XG4gICAgICBzdHlsZTogdGhpcy5fZ2V0Q3NzKHBhcmVudEVscykgKyBcbiAgICAgICAgJ1xcbiAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbicgK1xuICAgICAgICB0aGlzLl9nZXRDc3Moc2VjdGlvbkVscyksXG4gICAgICBrZXlmcmFtZXM6IHRoaXMua2V5ZnJhbWVzUnVsZXMubWFwKHJ1bGUgPT4gcnVsZS5jc3NUZXh0KS5qb2luKCdcXG4nKSxcbiAgICAgIGZvbnRzOiB0aGlzLmZvbnRSdWxlcy5tYXAocnVsZSA9PiBydWxlLmNzc1RleHQpLmpvaW4oJ1xcbicpXG4gICAgfTtcbiAgfVxuXG4gIC8vIHJldHVybnMgYSBjbG9uZSBvYmplY3QgZnJvbSBnaXZlbiBjc3NSdWxlIGFuZCBleHRlbmRlZCBwcm9wZXJ0aWVzXG4gIC8vIFdoeSBjbG9uZT8gYmVjYXVzZSB3ZSBtdXN0IE5PVCBhbHRlciB0aGUgZXhpc3RpbmcgY3NzUnVsZVxuICBfZ2V0Q2xvbmVkUnVsZShjc3NSdWxlLCBleHRlbmRlZCkge1xuICAgIGxldCBjbG9uZWRSdWxlID0gT2JqZWN0LmFzc2lnbihleHRlbmRlZCB8fCB7fSwge1xuICAgICAgY3NzVGV4dDogY3NzUnVsZS5jc3NUZXh0LFxuICAgICAgcGFyZW50UnVsZTogY3NzUnVsZS5wYXJlbnRSdWxlLFxuICAgICAgcGFyZW50U3l0bGVTaGVldDogY3NzUnVsZS5wYXJlbnRTdHlsZVNoZWV0LFxuICAgICAgc2VsZWN0b3JUZXh0OiBjc3NSdWxlLnNlbGVjdG9yVGV4dCxcbiAgICAgIHN0eWxlOiBjc3NSdWxlLnN0eWxlLFxuICAgICAgdHlwZTogY3NzUnVsZS50eXBlXG4gICAgfSk7XG4gICAgY2xvbmVkUnVsZS5jc3NUZXh0ID0gY2xvbmVkUnVsZS5jc3NUZXh0LnJlcGxhY2UoL1teXFx1MDAwMC1cXHUwMGZmXS9nLCAkID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl90b1VURjE2KCQuY2hhckNvZGVBdCgwKSkucmVwbGFjZSgvXFxcXHUvLCdcXFxcJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2xvbmVkUnVsZTtcbiAgfVxuXG4gIC8vIHJldHVybnMgdXRmMTYgY2hhcmFjdGVycyBmcm9tIHRoZSBnaXZlbiBjaGFyYWN0ZXIgY29kZVxuICAvLyBlLmcuLCB0aGlzLl90b1VURjE2KCdBJy5jaGFyQ29kZUF0KDApKS5yZXBsYWNlKC9cXFxcdS8sJ1xcXFwnKTtcbiAgX3RvVVRGMTYoY29kZVBvaW50KSB7XG4gICAgdmFyIFRFTl9CSVRTID0gcGFyc2VJbnQoJzExMTExMTExMTEnLCAyKTtcbiAgICBmdW5jdGlvbiB1KGNvZGVVbml0KSB7XG4gICAgICByZXR1cm4gJ1xcXFx1Jytjb2RlVW5pdC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50IDw9IDB4RkZGRikge1xuICAgICAgcmV0dXJuIHUoY29kZVBvaW50KTtcbiAgICB9XG4gICAgY29kZVBvaW50IC09IDB4MTAwMDA7XG4gICAgXG4gICAgLy8gU2hpZnQgcmlnaHQgdG8gZ2V0IHRvIG1vc3Qgc2lnbmlmaWNhbnQgMTAgYml0c1xuICAgIHZhciBsZWFkU3Vycm9nYXRlID0gMHhEODAwICsgKGNvZGVQb2ludCA+PiAxMCk7XG5cbiAgICAvLyBNYXNrIHRvIGdldCBsZWFzdCBzaWduaWZpY2FudCAxMCBiaXRzXG4gICAgdmFyIHRhaWxTdXJyb2dhdGUgPSAweERDMDAgKyAoY29kZVBvaW50ICYgVEVOX0JJVFMpO1xuXG4gICAgcmV0dXJuIHUobGVhZFN1cnJvZ2F0ZSkgKyB1KHRhaWxTdXJyb2dhdGUpO1xuICB9XG5cbiAgLy8gcmV0dXJucyBjc3MgdGV4dHMgb2YgdGhlIGxpc3Qgb2YgZWxlbWVudHNcbiAgX2dldENzcyhsaW1pdFRvRWxzKSB7XG4gICAgbGV0IGVsLCBjc3NSdWxlcztcbiAgICBsZXQgY29uZGl0aW9uVGV4dHMgPSB7fTsgLy8ga2V5OiBjb25kaXRpb24sIHZhbHVlIDogYXJyYXkgb2YgY3NzIHJ1bGVcbiAgICBsZXQgY3NzVGV4dHM9IFtdOztcbiAgICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgICB0aGlzLmVsQ3NzUnVsZXMuZm9yRWFjaChlbENzc1J1bGUgPT4ge1xuICAgICAgW2VsLCBjc3NSdWxlc10gPSBbZWxDc3NSdWxlLmVsLCBlbENzc1J1bGUuY3NzUnVsZXNdO1xuICAgICAgaWYgKGxpbWl0VG9FbHMuaW5jbHVkZXMoZWwpKSB7XG4gICAgICAgIGNzc1J1bGVzLmZvckVhY2goY3NzUnVsZSA9PiB7XG4gICAgICAgICAgLy8gaWYgbm9ybWFsIGNzcywgYWRkIGl0IHRvIGNzc1RleHRzLCBpZiBub3QgYWRkIGl0IHRvIGNvbmRpdGlvblRleHRzO1xuICAgICAgICAgIGlmIChjc3NSdWxlLmNvbmRpdGlvblRleHQpIHtcbiAgICAgICAgICAgIGNvbmRpdGlvblRleHRzW2Nzc1J1bGUuY29uZGl0aW9uVGV4dF0gPSBjb25kaXRpb25UZXh0c1tjc3NSdWxlLmNvbmRpdGlvblRleHRdIHx8IFtdO1xuICAgICAgICAgICAgaWYgKCFjb25kaXRpb25UZXh0c1tjc3NSdWxlLmNvbmRpdGlvblRleHRdLmluY2x1ZGVzKGNzc1J1bGUuY3NzVGV4dCkpIHtcbiAgICAgICAgICAgICAgY29uZGl0aW9uVGV4dHNbY3NzUnVsZS5jb25kaXRpb25UZXh0XS5wdXNoKGNzc1J1bGUuY3NzVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY3NzVGV4dHMuaW5jbHVkZXMoY3NzUnVsZS5jc3NUZXh0KSkge1xuICAgICAgICAgICAgICBjc3NUZXh0cy5wdXNoKGNzc1J1bGUuY3NzVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvL2dyb3VwIGNvbmRpdGlvblRleHRzLCBhbmQgYWRkIHRvIGNzc1RleHRzO1xuICAgIE9iamVjdC5rZXlzKGNvbmRpdGlvblRleHRzKS5mb3JFYWNoKGNvbmRpdGlvblRleHQgPT4ge1xuICAgICAgbGV0IG91dHB1dCA9IFtdLmNvbmNhdChcbiAgICAgICAgY29uZGl0aW9uVGV4dCArICd7JywgXG4gICAgICAgIGNvbmRpdGlvblRleHRzW2NvbmRpdGlvblRleHRdLm1hcChlbCA9PiAnICAnK2VsKSxcbiAgICAgICAgJ30nXG4gICAgICApO1xuICAgICAgY3NzVGV4dHMucHVzaChvdXRwdXQuam9pbignXFxuJykpO1xuICAgIH0pXG5cbiAgICByZXR1cm4gY3NzVGV4dHMuam9pbignXFxuJyk7XG4gIH1cblxuICAvLyByZXR1cm4gY3NzIG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gIC8vICAgY3NzUnVsZXM6IGNzc1J1bGVzIG9mIGEgYSBzdHlsZVNoZWV0IGUuZy4gZG9jdW1lbnQuc3R5bGVTaGVldHNbMV0uY3NzUnVsZXNcbiAgLy8gICBjb25kaXRpb25UZXh0OiBjb25kaXRpb25UZXh0IGF0dGFjaGVkIHRvIHRoZSBjc3NSdWxlcy4gXG4gIC8vICAgICBmb3IgQ1NTUnVsZSwgdGhlcmUgaXMgbm8gY29uZGl0aW9uVGV4dCwgXG4gIC8vICAgICBidXQgZm9yIENTU01lZGlhUnVsZSwgdGhlcmUgaXMgY29uZGl0aW9uIHRleHQuIGUuZy4sIGBAbWVkaWEgKG1pbi13aWR0aDogMTAxMnB4KWBcbiAgX3Byb2Nlc3NDc3NSdWxlcyhjc3NSdWxlcywgY29uZGl0aW9uVGV4dCkge1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjc3NSdWxlcy5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IGNzc1J1bGUgPSBjc3NSdWxlc1tqXTtcblxuICAgICAgLy8gaWYgY3NzIHJ1bGUgYW5kIGVsZW1lbnQgbWF0Y2hlcywgY29sbGVjdCBydWxlc1xuICAgICAgaWYgKGNzc1J1bGUgaW5zdGFuY2VvZiBDU1NTdHlsZVJ1bGUpIHtcbiAgICAgICAgdGhpcy5lbENzc1J1bGVzLmZvckVhY2goZWxDc3NSdWxlID0+IHtcbiAgICAgICAgICAvLyByZW1vdmUgcHNldWRvIGNsYXNzKGVsZW1lbnRzKSBmb3IgZWxlbWVudC5tYXRjaGVzIGNhbGxcbiAgICAgICAgICAvLyByZWYuIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMtYXBpLyNncmFtbWFyXG4gICAgICAgICAgbGV0IHNlbGVjdG9yID0gY3NzUnVsZS5zZWxlY3RvclRleHRcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eWyBdKjpbOmEtelxcLV0rKFxcKFteXFwpXStcXCkpPy8sICcqJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8gXFxcXD86WzphLXpcXC1dKyhcXChbXlxcKV0rXFwpKT8vZywgJyAqJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcPzpbOmEtelxcLV0rXFwoW15cXCldK1xcKS9nLCAnJykgLy8gZS5nLiBhdWRpbzpub3QoW2NvbnRyb2xzXSksXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxcXD86W14sIFxcXV0rL2csICcnKTtcblxuICAgICAgICAgIC8vIChzZWxlY3RvciA9PT0gJycpICYmIChzZWxlY3RvciA9ICcqJyk7IC8vIGluY2FzZSAgJzpiZWZvcmUnXG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFlbENzc1J1bGUuZWwubWF0Y2hlcykgeyAvLyAjZG9jdW1lbnQgZG9lcyBub3QgaGF2ZSB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICB9IC8vIGlmIHRoZSBnaXZlbiBjc3MgcnVsZSBpcyBmb3IgdGhpcyBlbGVtZW50XG4gICAgICAgICAgICBlbHNlIGlmIChlbENzc1J1bGUuZWwubWF0Y2hlcyhzZWxlY3RvcikpIHsgXG4gICAgICAgICAgICAgIC8vIG11c3Qgbm90IG1ha2UgY2hhbmdlIG9uIGV4aXN0aW5nIGNzcyBydWxlIGlmIGFkZCBhbnkgZXh0cmEgYXR0cnMuXG4gICAgICAgICAgICAgIGxldCBjbG9uZWQgPSB0aGlzLl9nZXRDbG9uZWRSdWxlKFxuICAgICAgICAgICAgICAgIGNzc1J1bGUsIHtjb25kaXRpb25UZXh0OiBjb25kaXRpb25UZXh0fVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBlbENzc1J1bGUuY3NzUnVsZXMucHVzaChjbG9uZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBzZWxlY3RvciBmb3VuZCcsIGNzc1J1bGUuc2VsZWN0b3JUZXh0LCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IFxuXG4gICAgICAvLyBjb2xsZWN0IGFsbCBmb250IHJ1bGVzXG4gICAgICBlbHNlIGlmIChjc3NSdWxlIGluc3RhbmNlb2YgQ1NTRm9udEZhY2VSdWxlKSB7XG4gICAgICAgIHRoaXMuZm9udFJ1bGVzLnB1c2goY3NzUnVsZSk7XG4gICAgICB9IFxuXG4gICAgICAvLyBjb2xsZWN0IGFsbCBrZXlmcmFtZSBydWxlc1xuICAgICAgZWxzZSBpZiAoY3NzUnVsZSBpbnN0YW5jZW9mIENTU0tleWZyYW1lc1J1bGUpIHtcbiAgICAgICAgdGhpcy5rZXlmcmFtZXNSdWxlcy5wdXNoKGNzc1J1bGUpO1xuICAgICAgfSBcblxuICAgICAgLy8gZm9yIG1lZGlhIHJ1bGUsIGFkZCBjb25kaXRpb24gdGV4dCBhbmQgY29sbGVjdCBtYXRjaGluZyBjc3MgcnVsZXNcbiAgICAgIGVsc2UgaWYgKGNzc1J1bGUgaW5zdGFuY2VvZiBDU1NNZWRpYVJ1bGUpIHtcbiAgICAgICAgbGV0IG1lZGlhUnVsZSA9IGNzc1J1bGU7XG4gICAgICAgIGxldCBjb25kaXRpb25UZXh0ID0gJ0BtZWRpYSAnK21lZGlhUnVsZS5jb25kaXRpb25UZXh0O1xuICAgICAgICB0aGlzLl9wcm9jZXNzQ3NzUnVsZXMobWVkaWFSdWxlLmNzc1J1bGVzLCBjb25kaXRpb25UZXh0KTtcbiAgICAgIH1cblxuICAgICAgLy8gcnVsZXMgdGhhdCBhcmUgbm90IHByb2Nlc3NpbmdcbiAgICAgIC8vICBDU1NJbXBvcnRSdWxlICAgIC8vIEBpbXBvcnRcbiAgICAgIC8vICBDU1NLZXlGcmFtZXNSdWxlIC8vIEBrZXlmcmFtZXNcbiAgICAgIC8vICBDU1NTdXBwb3J0c1J1bGUgIC8vIEBzdXBwb3J0c1xuICAgICAgLy8gIENTU1BhZ2VSdWxlICAgICAgLy8gQHBhZ2VcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2ZvdW5kIG5vbi1wcm9jZXNzaW5nIHJ1bGUnLCBjc3NSdWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDU1NQaXJhdGU7XG4iXX0=

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(73);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlunkerSubmit = function () {
  function PlunkerSubmit(options) {
    (0, _classCallCheck3.default)(this, PlunkerSubmit);

    this.formFields = [];
    this.indexHeads = [];
    this.indexBody = '';

    this.document = options.document || document; // so that this can be run from other window
    this.options = options;
  }

  // return index.html file for plunker


  (0, _createClass3.default)(PlunkerSubmit, [{
    key: 'addHead',


    // add tags within head tag of index.html. e.g. '<meta foo="123" bar="456" />'
    value: function addHead(headLine) {
      this.indexHeads.push(headLine);
    }

    // set the body contents index.html. 

  }, {
    key: 'setBody',
    value: function setBody(html) {
      this.indexBody = html;
    }

    // add a file to plunker, also add it to <head> tag of index.html if .js or .css

  }, {
    key: 'addFile',
    value: function addFile(fileName, contents) {
      this.formFields.push({ name: 'files[' + fileName + ']', value: contents });
      if (fileName.endsWith('.js')) {
        this.addHead('<script src="' + fileName + '"></script>');
      } else if (fileName.endsWith('.css')) {
        this.addHead('<link href="' + fileName + '" rel="stylesheet">');
      }
      return this;
    }

    // submit to plunker

  }, {
    key: 'submit',
    value: function submit() {
      var _this = this;

      var form = this.document.createElement('form');
      var indexFile = { name: 'files[index.html]', value: this.indexHtml };
      var submit = this.document.createElement('input');
      var files = [indexFile].concat((0, _toConsumableArray3.default)(this.formFields));

      form.style.display = 'none';
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'http://plnkr.co/edit/?p=preview');
      form.setAttribute('target', '_blank');

      files.forEach(function (field) {
        var input = _this.document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', field.name);
        input.setAttribute('value', field.value);
        form.appendChild(input);
      });

      submit.setAttribute('type', 'submit');
      form.appendChild(submit);

      this.document.body.appendChild(form);
      submit.click();
      this.document.body.removeChild(form);
    }
  }, {
    key: 'indexHtml',
    get: function get() {
      var output = '';
      if (this.indexBody.match(/<\/html>/)) {
        // full html is here
        output = this.indexBody;
        !this.indexBody.match(/<\/body>/) && ( // if no body tag, add one
        output = output.replace(/<\/html>/, '\n<body>\n</body>\n</html>'));
        !this.indexBody.match(/<\/head>/) && ( // if no head tag, add one
        output = output.replace(/<body/, '\n<head>\n</head>\n<body'));
        // add head tags into head.
        output = output.replace(/<\/head>/, this.indexHeads.join('\n') + '\n</head>');
      } else {
        output = ['<!DOCTYPE html>', '<html>', '<head>', this.indexHeads.join('\n'), '</head>', '<body>', this.indexBody, '</body>', '</html>'].join('\n');
      }
      return output;
    }

    // set description of the plunker

  }, {
    key: 'description',
    set: function set(description) {
      this.formFields.push({ name: 'description', value: description });
    }
  }]);
  return PlunkerSubmit;
}();

exports.default = PlunkerSubmit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdW5rZXItc3VibWl0LmpzIl0sIm5hbWVzIjpbIlBsdW5rZXJTdWJtaXQiLCJvcHRpb25zIiwiZm9ybUZpZWxkcyIsImluZGV4SGVhZHMiLCJpbmRleEJvZHkiLCJkb2N1bWVudCIsImhlYWRMaW5lIiwicHVzaCIsImh0bWwiLCJmaWxlTmFtZSIsImNvbnRlbnRzIiwibmFtZSIsInZhbHVlIiwiZW5kc1dpdGgiLCJhZGRIZWFkIiwiZm9ybSIsImNyZWF0ZUVsZW1lbnQiLCJpbmRleEZpbGUiLCJpbmRleEh0bWwiLCJzdWJtaXQiLCJmaWxlcyIsInN0eWxlIiwiZGlzcGxheSIsInNldEF0dHJpYnV0ZSIsImZvckVhY2giLCJpbnB1dCIsImZpZWxkIiwiYXBwZW5kQ2hpbGQiLCJib2R5IiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsIm91dHB1dCIsIm1hdGNoIiwicmVwbGFjZSIsImpvaW4iLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTUEsYTtBQUVKLHlCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixFQUFqQjs7QUFFQSxTQUFLQyxRQUFMLEdBQWdCSixRQUFRSSxRQUFSLElBQW9CQSxRQUFwQyxDQUxtQixDQUsyQjtBQUM5QyxTQUFLSixPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFFRDs7Ozs7OztBQTBCQTs0QkFDUUssUSxFQUFVO0FBQ2hCLFdBQUtILFVBQUwsQ0FBZ0JJLElBQWhCLENBQXFCRCxRQUFyQjtBQUNEOztBQUVEOzs7OzRCQUNRRSxJLEVBQU07QUFDWixXQUFLSixTQUFMLEdBQWlCSSxJQUFqQjtBQUNEOztBQUVEOzs7OzRCQUNRQyxRLEVBQVVDLFEsRUFBVTtBQUMxQixXQUFLUixVQUFMLENBQWdCSyxJQUFoQixDQUFxQixFQUFDSSxpQkFBZUYsUUFBZixNQUFE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QUFxQixFQUFDSSxNQUFNLGFBQVAsRUFBc0JDLE9BQU91QixXQUE3QixFQUFyQjtBQUNEOzs7OztrQkFvRFluQyxhIiwiZmlsZSI6InBsdW5rZXItc3VibWl0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGxlbi5raW0vZ2l0aHViL3N0eWxlLXBpcmF0ZSIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBsdW5rZXJTdWJtaXQge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmZvcm1GaWVsZHMgPSBbXTtcbiAgICB0aGlzLmluZGV4SGVhZHMgPSBbXTtcbiAgICB0aGlzLmluZGV4Qm9keSA9ICcnO1xuXG4gICAgdGhpcy5kb2N1bWVudCA9IG9wdGlvbnMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7IC8vIHNvIHRoYXQgdGhpcyBjYW4gYmUgcnVuIGZyb20gb3RoZXIgd2luZG93XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8vIHJldHVybiBpbmRleC5odG1sIGZpbGUgZm9yIHBsdW5rZXJcbiAgZ2V0IGluZGV4SHRtbCgpIHtcbiAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgaWYgKHRoaXMuaW5kZXhCb2R5Lm1hdGNoKC88XFwvaHRtbD4vKSkgeyAvLyBmdWxsIGh0bWwgaXMgaGVyZVxuICAgICAgb3V0cHV0ID0gdGhpcy5pbmRleEJvZHk7XG4gICAgICAoIXRoaXMuaW5kZXhCb2R5Lm1hdGNoKC88XFwvYm9keT4vKSkgJiYgIC8vIGlmIG5vIGJvZHkgdGFnLCBhZGQgb25lXG4gICAgICAgIChvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvPFxcL2h0bWw+LywgJ1xcbjxib2R5PlxcbjwvYm9keT5cXG48L2h0bWw+JykpO1xuICAgICAgKCF0aGlzLmluZGV4Qm9keS5tYXRjaCgvPFxcL2hlYWQ+LykpICYmICAvLyBpZiBubyBoZWFkIHRhZywgYWRkIG9uZVxuICAgICAgICAob3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoLzxib2R5LywgJ1xcbjxoZWFkPlxcbjwvaGVhZD5cXG48Ym9keScpKTtcbiAgICAgIC8vIGFkZCBoZWFkIHRhZ3MgaW50byBoZWFkLlxuICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoLzxcXC9oZWFkPi8sIHRoaXMuaW5kZXhIZWFkcy5qb2luKCdcXG4nKSsnXFxuPC9oZWFkPicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQgPSBbXG4gICAgICAgICc8IURPQ1RZUEUgaHRtbD4nLCAnPGh0bWw+JywgXG4gICAgICAgICc8aGVhZD4nLCB0aGlzLmluZGV4SGVhZHMuam9pbignXFxuJyksICc8L2hlYWQ+JyxcbiAgICAgICAgJzxib2R5PicsIHRoaXMuaW5kZXhCb2R5LCAnPC9ib2R5PicsICc8L2h0bWw+J1xuICAgICAgXS5qb2luKCdcXG4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8vIHNldCBkZXNjcmlwdGlvbiBvZiB0aGUgcGx1bmtlclxuICBzZXQgZGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmZvcm1GaWVsZHMucHVzaCh7bmFtZTogJ2Rlc2NyaXB0aW9uJywgdmFsdWU6IGRlc2NyaXB0aW9ufSk7XG4gIH1cblxuICAvLyBhZGQgdGFncyB3aXRoaW4gaGVhZCB0YWcgb2YgaW5kZXguaHRtbC4gZS5nLiAnPG1ldGEgZm9vPVwiMTIzXCIgYmFyPVwiNDU2XCIgLz4nXG4gIGFkZEhlYWQoaGVhZExpbmUpIHtcbiAgICB0aGlzLmluZGV4SGVhZHMucHVzaChoZWFkTGluZSk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGJvZHkgY29udGVudHMgaW5kZXguaHRtbC4gXG4gIHNldEJvZHkoaHRtbCkge1xuICAgIHRoaXMuaW5kZXhCb2R5ID0gaHRtbDtcbiAgfVxuXG4gIC8vIGFkZCBhIGZpbGUgdG8gcGx1bmtlciwgYWxzbyBhZGQgaXQgdG8gPGhlYWQ+IHRhZyBvZiBpbmRleC5odG1sIGlmIC5qcyBvciAuY3NzXG4gIGFkZEZpbGUoZmlsZU5hbWUsIGNvbnRlbnRzKSB7XG4gICAgdGhpcy5mb3JtRmllbGRzLnB1c2goe25hbWU6IGBmaWxlc1ske2ZpbGVOYW1lfV1gLCB2YWx1ZTogY29udGVudHN9KTtcbiAgICBpZiAoZmlsZU5hbWUuZW5kc1dpdGgoJy5qcycpKSB7XG4gICAgICB0aGlzLmFkZEhlYWQoYDxzY3JpcHQgc3JjPVwiJHtmaWxlTmFtZX1cIj48L3NjcmlwdD5gKTtcbiAgICB9IGVsc2UgaWYgKGZpbGVOYW1lLmVuZHNXaXRoKCcuY3NzJykpIHtcbiAgICAgIHRoaXMuYWRkSGVhZChgPGxpbmsgaHJlZj1cIiR7ZmlsZU5hbWV9XCIgcmVsPVwic3R5bGVzaGVldFwiPmApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHN1Ym1pdCB0byBwbHVua2VyXG4gIHN1Ym1pdCgpIHtcbiAgICBsZXQgZm9ybSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGxldCBpbmRleEZpbGUgPSB7bmFtZTogJ2ZpbGVzW2luZGV4Lmh0bWxdJywgdmFsdWU6IHRoaXMuaW5kZXhIdG1sfTtcbiAgICBsZXQgc3VibWl0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCBmaWxlcyA9IFtpbmRleEZpbGUsIC4uLnRoaXMuZm9ybUZpZWxkc107XG5cbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsICdwb3N0Jyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsICdodHRwOi8vcGxua3IuY28vZWRpdC8/cD1wcmV2aWV3Jyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKVxuXG4gICAgZmlsZXMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBsZXQgaW5wdXQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBmaWVsZC5uYW1lKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBmaWVsZC52YWx1ZSk7XG4gICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICB9KTtcblxuICAgIHN1Ym1pdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChzdWJtaXQpO1xuXG4gICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIHN1Ym1pdC5jbGljaygpO1xuICAgIHRoaXMuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmb3JtKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbHVua2VyU3VibWl0OyJdfQ==

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlunkerSubmit = exports.CSSPirate = exports.HTMLPirate = exports.Main = undefined;
exports.run = run;
exports.plunker = plunker;

var _main = __webpack_require__(35);

var _main2 = _interopRequireDefault(_main);

var _htmlPirate = __webpack_require__(23);

var _htmlPirate2 = _interopRequireDefault(_htmlPirate);

var _cssPirate = __webpack_require__(32);

var _cssPirate2 = _interopRequireDefault(_cssPirate);

var _plunkerSubmit = __webpack_require__(33);

var _plunkerSubmit2 = _interopRequireDefault(_plunkerSubmit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Main = _main2.default;
exports.HTMLPirate = _htmlPirate2.default;
exports.CSSPirate = _cssPirate2.default;
exports.PlunkerSubmit = _plunkerSubmit2.default;


var it;
function run($0, options) {
  if (!$0) {
    console.error("no element provided as the first argument");
  } else {
    var main = new _main2.default($0, options);
    it = main.getIt();
    return it;
  }
}

function plunker($0, options) {
  it = it || run($0, options);
  it.plunker();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJ1biIsInBsdW5rZXIiLCJNYWluIiwiSFRNTFBpcmF0ZSIsIkNTU1BpcmF0ZSIsIlBsdW5rZXJTdWJtaXQiLCJpdCIsIiQwIiwib3B0aW9ucyIsImNvbnNvbGUiLCJlcnJvciIsIm1haW4iLCJnZXRJdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O1FBUWdCQSxHLEdBQUFBLEc7UUFVQUMsTyxHQUFBQSxPOztBQWxCaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztRQUVRQyxJO1FBQU1DLFU7UUFBWUMsUztRQUFXQyxhOzs7QUFFckMsSUFBSUMsRUFBSjtBQUNPLFNBQVNOLEdBQVQsQ0FBYU8sRUFBYixFQUFpQkMsT0FBakIsRUFBMEI7QUFDL0IsTUFBSSxDQUFDRCxFQUFMLEVBQVM7QUFDUEUsWUFBUUMsS0FBUixDQUFjLDJDQUFkO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsUUFBSUMsT0FBTyxtQkFBU0osRUFBVCxFQUFhQyxPQUFiLENBQVg7QUFDQUYsU0FBS0ssS0FBS0MsS0FBTCxFQUFMO0FBQ0EsV0FBT04sRUFBUDtBQUNEO0FBQ0Y7O0FBRU0sU0FBU0wsT0FBVCxDQUFpQk0sRUFBakIsRUFBcUJDLE9BQXJCLEVBQThCO0FBQ25DRixPQUFLQSxNQUFNTixJQUFJTyxFQUFKLEVBQVFDLE9BQVIsQ0FBWDtBQUNBRixLQUFHTCxPQUFIO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsbGVuLmtpbS9naXRodWIvc3R5bGUtcGlyYXRlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1haW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCBIVE1MUGlyYXRlIGZyb20gJy4vaHRtbC1waXJhdGUnO1xuaW1wb3J0IENTU1BpcmF0ZSBmcm9tICcuL2Nzcy1waXJhdGUnO1xuaW1wb3J0IFBsdW5rZXJTdWJtaXQgZnJvbSAnLi9wbHVua2VyLXN1Ym1pdCc7XG5cbmV4cG9ydCB7TWFpbiwgSFRNTFBpcmF0ZSwgQ1NTUGlyYXRlLCBQbHVua2VyU3VibWl0fTtcblxudmFyIGl0O1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bigkMCwgb3B0aW9ucykge1xuICBpZiAoISQwKSB7XG4gICAgY29uc29sZS5lcnJvcihcIm5vIGVsZW1lbnQgcHJvdmlkZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XCIpO1xuICB9IGVsc2Uge1xuICAgIGxldCBtYWluID0gbmV3IE1haW4oJDAsIG9wdGlvbnMpO1xuICAgIGl0ID0gbWFpbi5nZXRJdCgpO1xuICAgIHJldHVybiBpdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGx1bmtlcigkMCwgb3B0aW9ucykge1xuICBpdCA9IGl0IHx8IHJ1bigkMCwgb3B0aW9ucyk7XG4gIGl0LnBsdW5rZXIoKTtcbn0iXX0=

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _htmlPirate = __webpack_require__(23);

var _htmlPirate2 = _interopRequireDefault(_htmlPirate);

var _cssPirate = __webpack_require__(32);

var _cssPirate2 = _interopRequireDefault(_cssPirate);

var _plunkerSubmit = __webpack_require__(33);

var _plunkerSubmit2 = _interopRequireDefault(_plunkerSubmit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function () {
  // el : a html element
  // options: 
  //   document: document element to process. e.g. window.document
  //   visibleOnly: true or false. if false, ignore all hidden elements
  //   replacements: array of replacement, replace html with given regex and new string
  //     e.g. {regex: /<!--[\s\S]*?-->/g, newStr: ''}
  function Main(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Main);

    this.htmlPirate = new _htmlPirate2.default(el, options);
    this.cssPirate = new _cssPirate2.default(el, options);
    this.style = null;

    this.document = options.document || document;
    this.options = options;
  }

  // returns html, and css for the element


  (0, _createClass3.default)(Main, [{
    key: 'getIt',
    value: function getIt() {
      var html = this.htmlPirate.getIt();
      var css = this.cssPirate.getIt();

      return {
        html: html,
        style: this._replaceCssUrls(css.style),
        keyframes: css.keyframes,
        fonts: this._replaceCssUrls(css.fonts),
        plunker: this.submitToPlunker.bind(this)
      };
    }

    // submit to plnkr.com with html and css

  }, {
    key: 'submitToPlunker',
    value: function submitToPlunker() {
      !this.style && (this.style = this.getIt());
      var plunkerSubmit = new _plunkerSubmit2.default(this.options);

      plunkerSubmit.description = 'StylePirate by Allen Kim';
      plunkerSubmit.addFile('styles.css', this.style.style);
      plunkerSubmit.addFile('keyframes.css', this.style.keyframes);
      plunkerSubmit.addFile('fonts.css', this.style.fonts);
      plunkerSubmit.setBody(this.style.html);
      plunkerSubmit.submit();
    }

    // returns all url-replaced css text. e.g.
    // from 'url(./foo.png)' to 'url(https://my.site.com/path/foo.png)'

  }, {
    key: '_replaceCssUrls',
    value: function _replaceCssUrls(cssText) {
      var _this = this;

      var urlMatches = cssText.match(/url\(['"]?([^'"]+)['"]?\)/g) || [];
      urlMatches.forEach(function (urlStr) {
        var href = urlStr.match(/url\(['"]?(.*?)['"]?\)/)[1];
        var link = _this.document.createElement("a");
        link.href = href;
        var absUrl = link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
        var absCssUrl = 'url(' + absUrl + ')';
        cssText = cssText.replace(urlStr, absCssUrl);
      });
      return cssText;
    }
  }]);
  return Main;
}();

exports.default = Main;

// $0 = document.querySelector('#nav-context-bar');
// var main = new Main($0, {
//   visibleOnly: true,
//   replacements: [
//     {regex: /<!--[\s\S]*?-->/g, newStr: ''},
//     {regex: /ng-[a-z\-]+=['"][\s\S]*?['"]/g, newStr: ''}
//   ]
// })
// var style = main.getIt();
// main.createPlunker();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiTWFpbiIsImVsIiwib3B0aW9ucyIsImh0bWxQaXJhdGUiLCJjc3NQaXJhdGUiLCJzdHlsZSIsImRvY3VtZW50IiwiaHRtbCIsImdldEl0IiwiY3NzIiwiX3JlcGxhY2VDc3NVcmxzIiwia2V5ZnJhbWVzIiwiZm9udHMiLCJwbHVua2VyIiwic3VibWl0VG9QbHVua2VyIiwiYmluZCIsInBsdW5rZXJTdWJtaXQiLCJkZXNjcmlwdGlvbiIsImFkZEZpbGUiLCJzZXRCb2R5Iiwic3VibWl0IiwiY3NzVGV4dCIsInVybE1hdGNoZXMiLCJtYXRjaCIsImZvckVhY2giLCJocmVmIiwidXJsU3RyIiwibGluayIsImNyZWF0ZUVsZW1lbnQiLCJhYnNVcmwiLCJwcm90b2NvbCIsImhvc3QiLCJwYXRobmFtZSIsInNlYXJjaCIsImhhc2giLCJhYnNDc3NVcmwiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLEk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBWUMsRUFBWixFQUE0QjtBQUFBLFFBQVpDLE9BQVksdUVBQUosRUFBSTtBQUFBOztBQUMxQixTQUFLQyxVQUFMLEdBQWtCLHlCQUFlRixFQUFmLEVBQW1CQyxPQUFuQixDQUFsQjtBQUNBLFNBQUtFLFNBQUwsR0FBaUIsd0JBQWNILEVBQWQsRUFBa0JDLE9BQWxCLENBQWpCO0FBQ0EsU0FBS0csS0FBTCxHQUFhLElBQWI7O0FBRUEsU0FBS0MsUUFBTCxHQUFnQkosUUFBUUksUUFBUixJQUFvQkEsUUFBcEM7QUFDQSxTQUFLSixPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFFRDs7Ozs7NEJBQ1E7QUFDTixVQUFJSyxPQUFPLEtBQUtKLFVBQUwsQ0FBZ0JLLEtBQWhCLEVBQVg7QUFDQSxVQUFJQyxNQUFNLEtBQUtMLFNBQUwsQ0FBZUksS0FBZixFQUFWOztBQUVBLGFBQU87QUFDTEQsa0JBREs7QUFFTEYsZUFBTyxLQUFLSyxlQUFMLENBQXFCRCxJQUFJSixLQUF6QixDQUZGO0FBR0xNLG1CQUFXRixJQUFJRSxTQUhWO0FBSUxDLGVBQU8sS0FBS0YsZUFBTCxDQUFxQkQsSUFBSUcsS0FBekIsQ0FKRjtBQUtMQyxpQkFBUyxLQUFLQyxlQUFMLENBQXFCQyxJQUFyQixDQUEwQixJQUExQjtBQUxKLE9BQVA7QUFPRDs7QUFFRDs7OztzQ0FDa0I7QUFDZixPQUFDLEtBQUtWLEtBQVAsS0FBa0IsS0FBS0EsS0FBTCxHQUFhLEtBQUtHLEtBQUwsRUFBL0I7QUFDQSxVQUFJUSxnQkFBZ0IsNEJBQWtCLEtBQUtkLE9BQXZCLENBQXBCOztBQUVBYyxvQkFBY0MsV0FBZCxHQUE0QiwwQkFBNUI7QUFDQUQsb0JBQWNFLE9BQWQsQ0FBc0IsWUFBdEIsRUFBb0MsS0FBS2IsS0FBTCxDQUFXQSxLQUEvQztBQUNBVyxvQkFBY0UsT0FBZCxDQUFzQixlQUF0QixFQUF1QyxLQUFLYixLQUFMLENBQVdNLFNBQWxEO0FBQ0FLLG9CQUFjRSxPQUFkLENBQXNCLFdBQXRCLEVBQW1DLEtBQUtiLEtBQUwsQ0FBV08sS0FBOUM7QUFDQUksb0JBQWNHLE9BQWQsQ0FBc0IsS0FBS2QsS0FBTCxDQUFXRSxJQUFqQztBQUNBUyxvQkFBY0ksTUFBZDtBQUNEOztBQUVEO0FBQ0E7Ozs7b0NBQ2dCQyxPLEVBQVM7QUFBQTs7QUFDdkIsVUFBSUMsYUFBYUQsUUFBUUUsS0FBUixDQUFjLDRCQUFkLEtBQStDLEVBQWhFO0FBQ0FELGlCQUFXRSxPQUFYLENBQW1CLGtCQUFVO0FBQzNCLFlBQUlDLE9BQU9DLE9BQU9ILEtBQVAsQ0FBYSx3QkFBYixFQUF1QyxDQUF2QyxDQUFYO0FBQ0EsWUFBSUksT0FBTyxNQUFLckIsUUFBTCxDQUFjc0IsYUFBZCxDQUE0QixHQUE1QixDQUFYO0FBQ0FELGFBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLFlBQUlJLFNBQVNGLEtBQUtHLFFBQUwsR0FBYyxJQUFkLEdBQW1CSCxLQUFLSSxJQUF4QixHQUE2QkosS0FBS0ssUUFBbEMsR0FBMkNMLEtBQUtNLE1BQWhELEdBQXVETixLQUFLTyxJQUF6RTtBQUNBLFlBQUlDLFlBQVksU0FBT04sTUFBUCxHQUFjLEdBQTlCO0FBQ0FSLGtCQUFVQSxRQUFRZSxPQUFSLENBQWdCVixNQUFoQixFQUF3QlMsU0FBeEIsQ0FBVjtBQUNELE9BUEQ7QUFRQSxhQUFPZCxPQUFQO0FBQ0Q7Ozs7O2tCQUlZckIsSTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGxlbi5raW0vZ2l0aHViL3N0eWxlLXBpcmF0ZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIVE1MUGlyYXRlIGZyb20gJy4vaHRtbC1waXJhdGUnO1xuaW1wb3J0IENTU1BpcmF0ZSBmcm9tICcuL2Nzcy1waXJhdGUnO1xuaW1wb3J0IFBsdW5rZXJTdWJtaXQgZnJvbSAnLi9wbHVua2VyLXN1Ym1pdCc7XG5cbmNsYXNzIE1haW4ge1xuICAvLyBlbCA6IGEgaHRtbCBlbGVtZW50XG4gIC8vIG9wdGlvbnM6IFxuICAvLyAgIGRvY3VtZW50OiBkb2N1bWVudCBlbGVtZW50IHRvIHByb2Nlc3MuIGUuZy4gd2luZG93LmRvY3VtZW50XG4gIC8vICAgdmlzaWJsZU9ubHk6IHRydWUgb3IgZmFsc2UuIGlmIGZhbHNlLCBpZ25vcmUgYWxsIGhpZGRlbiBlbGVtZW50c1xuICAvLyAgIHJlcGxhY2VtZW50czogYXJyYXkgb2YgcmVwbGFjZW1lbnQsIHJlcGxhY2UgaHRtbCB3aXRoIGdpdmVuIHJlZ2V4IGFuZCBuZXcgc3RyaW5nXG4gIC8vICAgICBlLmcuIHtyZWdleDogLzwhLS1bXFxzXFxTXSo/LS0+L2csIG5ld1N0cjogJyd9XG4gIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zPXt9KSB7XG4gICAgdGhpcy5odG1sUGlyYXRlID0gbmV3IEhUTUxQaXJhdGUoZWwsIG9wdGlvbnMpO1xuICAgIHRoaXMuY3NzUGlyYXRlID0gbmV3IENTU1BpcmF0ZShlbCwgb3B0aW9ucyk7XG4gICAgdGhpcy5zdHlsZSA9IG51bGw7XG5cbiAgICB0aGlzLmRvY3VtZW50ID0gb3B0aW9ucy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgLy8gcmV0dXJucyBodG1sLCBhbmQgY3NzIGZvciB0aGUgZWxlbWVudFxuICBnZXRJdCgpIHtcbiAgICBsZXQgaHRtbCA9IHRoaXMuaHRtbFBpcmF0ZS5nZXRJdCgpO1xuICAgIGxldCBjc3MgPSB0aGlzLmNzc1BpcmF0ZS5nZXRJdCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGh0bWwsXG4gICAgICBzdHlsZTogdGhpcy5fcmVwbGFjZUNzc1VybHMoY3NzLnN0eWxlKSxcbiAgICAgIGtleWZyYW1lczogY3NzLmtleWZyYW1lcyxcbiAgICAgIGZvbnRzOiB0aGlzLl9yZXBsYWNlQ3NzVXJscyhjc3MuZm9udHMpLFxuICAgICAgcGx1bmtlcjogdGhpcy5zdWJtaXRUb1BsdW5rZXIuYmluZCh0aGlzKVxuICAgIH1cbiAgfVxuXG4gIC8vIHN1Ym1pdCB0byBwbG5rci5jb20gd2l0aCBodG1sIGFuZCBjc3NcbiAgc3VibWl0VG9QbHVua2VyKCkge1xuICAgICghdGhpcy5zdHlsZSkgJiYgKHRoaXMuc3R5bGUgPSB0aGlzLmdldEl0KCkpO1xuICAgIGxldCBwbHVua2VyU3VibWl0ID0gbmV3IFBsdW5rZXJTdWJtaXQodGhpcy5vcHRpb25zKTtcblxuICAgIHBsdW5rZXJTdWJtaXQuZGVzY3JpcHRpb24gPSAnU3R5bGVQaXJhdGUgYnkgQWxsZW4gS2ltJztcbiAgICBwbHVua2VyU3VibWl0LmFkZEZpbGUoJ3N0eWxlcy5jc3MnLCB0aGlzLnN0eWxlLnN0eWxlKTsgXG4gICAgcGx1bmtlclN1Ym1pdC5hZGRGaWxlKCdrZXlmcmFtZXMuY3NzJywgdGhpcy5zdHlsZS5rZXlmcmFtZXMpOyBcbiAgICBwbHVua2VyU3VibWl0LmFkZEZpbGUoJ2ZvbnRzLmNzcycsIHRoaXMuc3R5bGUuZm9udHMpOyBcbiAgICBwbHVua2VyU3VibWl0LnNldEJvZHkodGhpcy5zdHlsZS5odG1sKTtcbiAgICBwbHVua2VyU3VibWl0LnN1Ym1pdCgpO1xuICB9XG5cbiAgLy8gcmV0dXJucyBhbGwgdXJsLXJlcGxhY2VkIGNzcyB0ZXh0LiBlLmcuXG4gIC8vIGZyb20gJ3VybCguL2Zvby5wbmcpJyB0byAndXJsKGh0dHBzOi8vbXkuc2l0ZS5jb20vcGF0aC9mb28ucG5nKSdcbiAgX3JlcGxhY2VDc3NVcmxzKGNzc1RleHQpIHtcbiAgICBsZXQgdXJsTWF0Y2hlcyA9IGNzc1RleHQubWF0Y2goL3VybFxcKFsnXCJdPyhbXidcIl0rKVsnXCJdP1xcKS9nKSB8fCBbXTtcbiAgICB1cmxNYXRjaGVzLmZvckVhY2godXJsU3RyID0+IHtcbiAgICAgIGxldCBocmVmID0gdXJsU3RyLm1hdGNoKC91cmxcXChbJ1wiXT8oLio/KVsnXCJdP1xcKS8pWzFdO1xuICAgICAgbGV0IGxpbmsgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgbGluay5ocmVmID0gaHJlZjtcbiAgICAgIGxldCBhYnNVcmwgPSBsaW5rLnByb3RvY29sK1wiLy9cIitsaW5rLmhvc3QrbGluay5wYXRobmFtZStsaW5rLnNlYXJjaCtsaW5rLmhhc2g7XG4gICAgICBsZXQgYWJzQ3NzVXJsID0gJ3VybCgnK2Fic1VybCsnKSc7XG4gICAgICBjc3NUZXh0ID0gY3NzVGV4dC5yZXBsYWNlKHVybFN0ciwgYWJzQ3NzVXJsKVxuICAgIH0pO1xuICAgIHJldHVybiBjc3NUZXh0O1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFpbjtcblxuLy8gJDAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmF2LWNvbnRleHQtYmFyJyk7XG4vLyB2YXIgbWFpbiA9IG5ldyBNYWluKCQwLCB7XG4vLyAgIHZpc2libGVPbmx5OiB0cnVlLFxuLy8gICByZXBsYWNlbWVudHM6IFtcbi8vICAgICB7cmVnZXg6IC88IS0tW1xcc1xcU10qPy0tPi9nLCBuZXdTdHI6ICcnfSxcbi8vICAgICB7cmVnZXg6IC9uZy1bYS16XFwtXSs9WydcIl1bXFxzXFxTXSo/WydcIl0vZywgbmV3U3RyOiAnJ31cbi8vICAgXVxuLy8gfSlcbi8vIHZhciBzdHlsZSA9IG1haW4uZ2V0SXQoKTtcbi8vIG1haW4uY3JlYXRlUGx1bmtlcigpO1xuXG4iXX0=

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(22)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(13);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
__webpack_require__(56);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(44)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(45)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(16);
var defined = __webpack_require__(17);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(46);
var $export = __webpack_require__(2);
var redefine = __webpack_require__(47);
var hide = __webpack_require__(8);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(18);
var $iterCreate = __webpack_require__(48);
var setToStringTag = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(55);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(49);
var descriptor = __webpack_require__(14);
var setToStringTag = __webpack_require__(31);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(50);
var enumBugKeys = __webpack_require__(30);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(22)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(54).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(24);
var arrayIndexOf = __webpack_require__(52)(false);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(24);
var toLength = __webpack_require__(27);
var toAbsoluteIndex = __webpack_require__(53);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(16);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(12);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(21);
var $export = __webpack_require__(2);
var toObject = __webpack_require__(12);
var call = __webpack_require__(57);
var isArrayIter = __webpack_require__(58);
var toLength = __webpack_require__(27);
var createProperty = __webpack_require__(59);
var getIterFn = __webpack_require__(60);

$export($export.S + $export.F * !__webpack_require__(62)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(18);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(14);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(61);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(18);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(26);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(12);
var $keys = __webpack_require__(19);

__webpack_require__(66)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(2);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(2);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(70) });


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(71);
var pIE = __webpack_require__(72);
var toObject = __webpack_require__(12);
var IObject = __webpack_require__(25);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(15);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=stylePirate.umd.js.map