/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");





var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
}; // based on https://github.com/thysultan/stylis.js/blob/e6843c373ebcbbfade25ebcc23f540ed8508da0a/src/Tokenizer.js#L239-L244


var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      break;
    }

    (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)();
  }

  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_3__.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1, points, index);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var defaultStylisPlugins = [stylis__WEBPACK_IMPORTED_MODULE_5__.prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify,  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_7__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : 0];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_5__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hoistNonReactStatics);


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ CacheProvider),
/* harmony export */   "E": () => (/* binding */ Emotion),
/* harmony export */   "T": () => (/* binding */ ThemeContext),
/* harmony export */   "_": () => (/* binding */ __unsafe_useEmotionCache),
/* harmony export */   "a": () => (/* binding */ useTheme),
/* harmony export */   "b": () => (/* binding */ ThemeProvider),
/* harmony export */   "c": () => (/* binding */ createEmotionProps),
/* harmony export */   "d": () => (/* binding */ withTheme),
/* harmony export */   "h": () => (/* binding */ hasOwnProperty),
/* harmony export */   "u": () => (/* binding */ useInsertionEffectMaybe),
/* harmony export */   "w": () => (/* binding */ withEmotionCache)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");









var hasOwnProperty = {}.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
  key: 'css'
}) : null);

if (true) {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    // the cache will never be null in the browser
    var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

if (true) {
  ThemeContext.displayName = 'EmotionThemeContext';
}

var useTheme = function useTheme() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (outerTheme) {
  return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return (0,_isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__["default"])(WithTheme, Component);
}

var getLastPart = function getLastPart(functionName) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};

var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};

var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }

  return undefined;
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : function useInsertionEffect(create) {
  create();
};
function useInsertionEffectMaybe(create) {

  useInsertionEffect(create);
}

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
  // the label hasn't already been computed

  if ( true && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.registerStyles)(cache, serialized, isStringTag);
  var rules = useInsertionEffectMaybe(function () {
    return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(registeredStyles, undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext));

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, newProps));
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}




/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheProvider": () => (/* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.C),
/* harmony export */   "ClassNames": () => (/* binding */ ClassNames),
/* harmony export */   "Global": () => (/* binding */ Global),
/* harmony export */   "ThemeContext": () => (/* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T),
/* harmony export */   "ThemeProvider": () => (/* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.b),
/* harmony export */   "__unsafe_useEmotionCache": () => (/* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__._),
/* harmony export */   "createElement": () => (/* binding */ jsx),
/* harmony export */   "css": () => (/* binding */ css),
/* harmony export */   "jsx": () => (/* binding */ jsx),
/* harmony export */   "keyframes": () => (/* binding */ keyframes),
/* harmony export */   "useTheme": () => (/* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.a),
/* harmony export */   "withEmotionCache": () => (/* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w),
/* harmony export */   "withTheme": () => (/* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.d)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-cbed451f.browser.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");












var pkg = {
	name: "@emotion/react",
	version: "11.10.0",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	exports: {
		".": {
			module: {
				worker: "./dist/emotion-react.worker.esm.js",
				browser: "./dist/emotion-react.browser.esm.js",
				"default": "./dist/emotion-react.esm.js"
			},
			"default": "./dist/emotion-react.cjs.js"
		},
		"./jsx-runtime": {
			module: {
				worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
				browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
			},
			"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
		},
		"./_isolated-hnrs": {
			module: {
				worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
				browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
			},
			"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
		},
		"./jsx-dev-runtime": {
			module: {
				worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
				browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
			},
			"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
		},
		"./package.json": "./package.json",
		"./types/css-prop": "./types/css-prop.d.ts",
		"./macro": "./macro.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"_isolated-hnrs",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "Emotion Contributors",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.18.3",
		"@emotion/babel-plugin": "^11.10.0",
		"@emotion/cache": "^11.10.0",
		"@emotion/serialize": "^1.1.0",
		"@emotion/utils": "^1.2.0",
		"@emotion/weak-memoize": "^0.3.0",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.18.5",
		"@definitelytyped/dtslint": "0.0.112",
		"@emotion/css": "11.10.0",
		"@emotion/css-prettifier": "1.1.0",
		"@emotion/server": "11.10.0",
		"@emotion/styled": "11.10.0",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1",
		typescript: "^4.5.5"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./_isolated-hnrs.js"
		],
		umdName: "emotionReact",
		exports: {
			envConditions: [
				"browser",
				"worker"
			],
			extra: {
				"./types/css-prop": "./types/css-prop.d.ts",
				"./macro": "./macro.js"
			}
		}
	}
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.h.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.E;
  createElementArgArray[1] = (0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)([styles], undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  useInsertionEffect(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffect(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (true) {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if ( true && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  var rules = (0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.u)(function () {

    for (var i = 0; i < serializedArr.length; i++) {
      var res = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serializedArr[i], false);
    }
  });

  return null;
};

var ClassNames = /* #__PURE__ */(0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.registerStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

if (true) {
  ClassNames.displayName = 'EmotionClassNames';
}

if (true) {
  var isBrowser = "object" !== 'undefined'; // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined';

  if (isBrowser && !isJest) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    var globalContext = // $FlowIgnore
    typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
    : isBrowser ? window : __webpack_require__.g;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}




/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": () => (/* binding */ getRegisteredStyles),
/* harmony export */   "insertStyles": () => (/* binding */ insertStyles),
/* harmony export */   "registerStyles": () => (/* binding */ registerStyles)
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": () => (/* binding */ serializeStyles)
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": () => (/* binding */ StyleSheet)
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weakMemoize);


/***/ }),

/***/ "./src/blocks/common/Heading.js":
/*!**************************************!*\
  !*** ./src/blocks/common/Heading.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/blocks/common/functions.js");




function Heading(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    prefix,
    category_position,
    title_tag
  } = attributes;
  let postLayout = prefix + "_layout";
  const HeadingTag = `${title_tag}`;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "entry-title-wrapper"
  }, (rttpgParams.hasPro && category_position === 'above_title' || !(0,_functions__WEBPACK_IMPORTED_MODULE_1__.el_ignore_layout)(attributes[postLayout], category_position)) && (0,_functions__WEBPACK_IMPORTED_MODULE_1__.get_el_thumb_cat)({
    attributes,
    post
  }, 'cat-above-title'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HeadingTag, {
    className: "entry-title"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, post.title)));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Heading);

/***/ }),

/***/ "./src/blocks/common/MetaData.js":
/*!***************************************!*\
  !*** ./src/blocks/common/MetaData.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/blocks/common/functions.js");




function MetaData(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    prefix,
    show_comment_count_label,
    show_author,
    show_author_image,
    show_meta_icon,
    author_prefix,
    show_category,
    category_position,
    show_date,
    show_tags,
    show_comment_count,
    show_post_count,
    meta_separator,
    meta_ordering
  } = attributes;
  const {
    avatar_url,
    author_name,
    category,
    tags,
    post_date,
    comment_count,
    post_count
  } = post;
  let postLayout = prefix + "_layout";
  let is_author_avatar = null;

  if (show_author_image === 'show') {
    is_author_avatar = 'has-author-avatar';
  }

  let category_condition = category && show_category === 'show' && (0,_functions__WEBPACK_IMPORTED_MODULE_1__.el_ignore_layout)(attributes[postLayout], category_position) && ['default', 'with_meta'].includes(category_position);

  if (!rttpgParams.hasPro) {
    category_condition = category && show_category === 'show';
  }

  let metaSeparator = meta_separator && meta_separator !== 'default' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "separator"
  }, "meta_separator") : null;
  const meta_data = {};
  meta_data.author = show_author === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `autho ${is_author_avatar}`
  }, show_author_image === 'show' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: avatar_url
  }) : show_meta_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa fa-user"
  }), author_prefix && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "author-prefix"
  }, author_prefix), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, author_name)), metaSeparator);
  meta_data.category = category && category_condition && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "categories-links"
  }, show_meta_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-folder-open"
  }), category.map(cat => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, cat), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rt-separator"
  }, ",")))), metaSeparator);
  meta_data.date = show_date === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "date"
  }, show_meta_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "far fa-calendar-alt"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, post_date)), metaSeparator);
  meta_data.tags = tags && show_tags === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "post-tags-links"
  }, show_meta_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa fa-tags"
  }), tags.map(tag => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, tag), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rt-separator"
  }, ",")))), metaSeparator);
  meta_data.comment_count = show_comment_count === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "comment-count"
  }, show_meta_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-comments"
  }), comment_count), metaSeparator);
  meta_data.post_count = rttpgParams.hasPro && show_post_count === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "post-count"
  }, show_meta_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa fa-eye"
  }), post_count), metaSeparator);
  const meta_data_keys = Object.keys(meta_data);
  const newMetaOrdering = [...meta_ordering];
  const newMetaKey = newMetaOrdering.map(item => item.value);

  if (meta_data_keys.length != meta_ordering.length && newMetaKey.length) {
    let new_meta_arr = meta_data_keys.filter(item => !newMetaKey.includes(item));
    new_meta_arr.map(meta => {
      return newMetaOrdering.push({
        value: meta,
        label: meta
      });
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "post-meta-tags rt-el-post-meta"
  }, newMetaOrdering.length ? newMetaOrdering.map(item => meta_data[item.value]) : meta_data_keys.map(key => meta_data[key]));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MetaData);

/***/ }),

/***/ "./src/blocks/common/Pagination.js":
/*!*****************************************!*\
  !*** ./src/blocks/common/Pagination.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_pagination_Pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/pagination/Pagination */ "./src/components/pagination/Pagination.js");



function PostPagination(_ref) {
  let {
    props,
    totalPages
  } = _ref;
  const {
    attributes,
    setAttributes
  } = props;
  const {
    show_pagination,
    page,
    pagination_type,
    load_more_button_text,
    query_change
  } = attributes;

  if (show_pagination !== 'show') {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-pagination-wrap"
  }, ['pagination', 'pagination_ajax'].includes(pagination_type) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_pagination_Pagination__WEBPACK_IMPORTED_MODULE_1__["default"], {
    total: totalPages,
    current: page,
    onClickPage: page => setAttributes({
      page,
      query_change: true
    })
  }), 'load_more' === pagination_type && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-loadmore-btn rt-loadmore-action rt-loadmore-style"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rt-loadmore-text"
  }, load_more_button_text ? load_more_button_text : 'Load More')));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostPagination);

/***/ }),

/***/ "./src/blocks/common/PostExcerpt.js":
/*!******************************************!*\
  !*** ./src/blocks/common/PostExcerpt.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function PostExcerpt(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    show_excerpt
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpg-excerpt tpg-el-excerpt"
  }, show_excerpt === 'show' && post.excerpt && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpg-excerpt-inner"
  }, post.excerpt), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: post.acf_data
    }
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostExcerpt);

/***/ }),

/***/ "./src/blocks/common/ReadMore.js":
/*!***************************************!*\
  !*** ./src/blocks/common/ReadMore.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function ReadMore(_ref) {
  let {
    attributes
  } = _ref;
  const {
    read_more_label,
    post_link_type
  } = attributes;
  let readMoreClass = ' tpg-post-link';

  if (post_link_type === 'popup') {
    readMoreClass += ' tpg-single-popup';
  } else if (post_link_type === 'multi_popup') {
    readMoreClass += ' tpg-multi-popup';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "post-footer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "read-more"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: readMoreClass
  }, read_more_label)));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReadMore);

/***/ }),

/***/ "./src/blocks/common/SectionTitle.js":
/*!*******************************************!*\
  !*** ./src/blocks/common/SectionTitle.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const SectionTitle = _ref => {
  let {
    attributes
  } = _ref;
  const {
    show_section_title,
    section_title_style,
    section_title_source,
    section_title_text,
    section_title_tag
  } = attributes;

  if ('show' !== show_section_title) {
    return;
  }

  const HeadingTag = `${section_title_tag}`;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpg-widget-heading-wrapper rt-clear heading-${section_title_style}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpg-widget-heading-line line-left"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HeadingTag, {
    className: "tpg-widget-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, 'page_title' === section_title_source ? rttpgParams.pageTitle : section_title_text)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpg-widget-heading-line line-right"
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionTitle);

/***/ }),

/***/ "./src/blocks/common/SocialShare.js":
/*!******************************************!*\
  !*** ./src/blocks/common/SocialShare.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const ssList = rttpgParams.ssList;

function SocialShare() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-tpg-social-share"
  }, ssList.includes('facebook') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "facebook"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fab fa-facebook-f",
    "aria-hidden": "true"
  })), ssList.includes('twitter') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "twitter"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fab fa-twitter",
    "aria-hidden": "true"
  })), ssList.includes('linkedin') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "linkedin"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fab fa-linkedin-in",
    "aria-hidden": "true"
  })), ssList.includes('pinterest') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "pinterest"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fab fa-pinterest",
    "aria-hidden": "true"
  })), ssList.includes('reddit') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "reddit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fab fa-reddit-alien",
    "aria-hidden": "true"
  })), ssList.includes('email') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "email"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa fa-envelope"
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialShare);

/***/ }),

/***/ "./src/blocks/common/Thumbnail.js":
/*!****************************************!*\
  !*** ./src/blocks/common/Thumbnail.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/blocks/common/functions.js");



function Thumbnail(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    prefix,
    category_position,
    show_category
  } = attributes;
  let postLayout = prefix + "_layout";
  let thumb_cat_condition = !(category_position === 'above_title' || category_position === 'default');

  if (attributes[postLayout] === 'grid-layout4' && category_position === 'default') {
    thumb_cat_condition = true;
  } else if (thumb_cat_condition === 'default' && ['grid-layout4', 'grid_hover-layout11'].includes(attributes[postLayout])) {
    thumb_cat_condition = true;
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-img-holder tpg-el-image-wrap"
  }, rttpgParams.hasPro && show_category === 'show' && thumb_cat_condition && 'with_meta' !== category_position && (0,_functions__WEBPACK_IMPORTED_MODULE_1__.get_el_thumb_cat)({
    attributes,
    post
  }), post.image_url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: post.image_url,
    className: "rt-img-responsive",
    alt: post.title
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "overlay grid-hover-content"
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Thumbnail);

/***/ }),

/***/ "./src/blocks/common/functions.js":
/*!****************************************!*\
  !*** ./src/blocks/common/functions.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "el_ignore_layout": () => (/* binding */ el_ignore_layout),
/* harmony export */   "get_el_thumb_cat": () => (/* binding */ get_el_thumb_cat),
/* harmony export */   "get_parent_class_list": () => (/* binding */ get_parent_class_list)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 *
 * @param attributes
 * @param className
 * @returns {*}
 */
function get_parent_class_list(_ref) {
  let {
    attributes,
    className
  } = _ref;
  const {
    full_wrapper_align,
    filter_type,
    section_title_style,
    section_title_alignment,
    show_pagination,
    ajax_pagination_type,
    show_meta,
    hover_animation,
    title_visibility_style,
    title_position,
    title_hover_underline,
    meta_position,
    author_icon_visibility,
    show_author_image,
    category_position,
    readmore_btn_style,
    grid_hover_overlay_type,
    grid_hover_overlay_height,
    on_hover_overlay,
    title_border_visibility,
    title_alignment,
    filter_v_alignment,
    border_style,
    filter_next_prev_btn,
    filter_h_alignment,
    is_box_border,
    arrow_position,
    dots,
    dots_style,
    lazyLoad,
    carousel_overflow,
    slider_direction,
    dots_text_align,
    acf_label_style,
    acf_alignment
  } = attributes;
  let dynamicParentClass;
  dynamicParentClass = className;
  dynamicParentClass += ' tpg-wrapper-align-' + full_wrapper_align;
  dynamicParentClass += ' tpg-filter-type-' + filter_type;
  dynamicParentClass += ' pagination-visibility-' + show_pagination;
  dynamicParentClass += ' ajax-pagination-type-next-prev-' + ajax_pagination_type;
  dynamicParentClass += ' meta-visibility-' + show_meta;
  dynamicParentClass += ' section-title-style-' + section_title_style;
  dynamicParentClass += ' section-title-align-' + section_title_alignment;
  dynamicParentClass += ' img_hover_animation_' + hover_animation;
  dynamicParentClass += ' title-' + title_visibility_style;
  dynamicParentClass += ' title_position_' + title_position;
  dynamicParentClass += ' title_hover_border_' + title_hover_underline;
  dynamicParentClass += ' meta_position_' + meta_position;
  dynamicParentClass += ' tpg-is-author-icon-' + author_icon_visibility;
  dynamicParentClass += ' author-image-visibility-' + show_author_image;
  dynamicParentClass += ' tpg-category-position-' + category_position;
  dynamicParentClass += ' readmore-btn-' + readmore_btn_style;
  dynamicParentClass += ' grid-hover-overlay-type-' + grid_hover_overlay_type;
  dynamicParentClass += ' grid-hover-overlay-height-' + grid_hover_overlay_height;
  dynamicParentClass += ' hover-overlay-height-' + on_hover_overlay;
  dynamicParentClass += ' tpg-title-border-' + title_border_visibility;
  dynamicParentClass += ' title-alignment-' + title_alignment;
  dynamicParentClass += ' tpg-filter-alignment-' + filter_v_alignment;
  dynamicParentClass += ' filter-button-border-' + border_style;
  dynamicParentClass += ' filter-nex-prev-btn-' + filter_next_prev_btn;
  dynamicParentClass += ' tpg-filter-h-alignment-' + filter_h_alignment;
  dynamicParentClass += ' tpg-el-box-border-' + is_box_border; //Slider layout

  dynamicParentClass += ' slider-arrow-position-' + arrow_position;
  dynamicParentClass += ' slider-dot-enable-' + dots;
  dynamicParentClass += ' slider-dots-style-' + dots_style;
  dynamicParentClass += ' is-lazy-load-' + lazyLoad;
  dynamicParentClass += ' is-carousel-overflow-' + carousel_overflow;
  dynamicParentClass += ' slider-direction-' + slider_direction;
  dynamicParentClass += ' slider-dots-align-' + dots_text_align; //ACF

  dynamicParentClass += ' act-label-style-' + acf_label_style;
  dynamicParentClass += ' tpg-acf-align-' + acf_alignment;
  return dynamicParentClass;
}
function get_el_thumb_cat(_ref2) {
  let {
    attributes,
    post
  } = _ref2;
  let classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cat-over-image';
  const {
    prefix,
    show_meta,
    show_category,
    category_position,
    category_style,
    show_cat_icon
  } = attributes;
  let postLayout = prefix + "_layout";

  if (!('show' === show_meta && 'show' === show_category)) {
    return null;
  }

  const {
    category
  } = post;
  let categoryPosition = category_position;

  if (attributes[postLayout] === 'grid-layout4' && category_position === 'default') {
    categoryPosition = 'top_left';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpg-separate-category ${category_style} ${categoryPosition} ${classes}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "categories-links"
  }, show_cat_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-folder-open"
  }), category && category.map(cat => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, cat))));
}
const el_ignore_layout = (layout, category_position) => {
  const allLayout = ['grid-layout4', 'grid-layout5', 'grid-layout5-2', 'grid-layout6', 'grid-layout6-2', 'list-layout4', 'list-layout5', 'grid_hover-layout5', 'grid_hover-layout6', 'grid_hover-layout7', 'grid_hover-layout8', 'grid_hover-layout9', 'grid_hover-layout10', 'grid_hover-layout5-2', 'grid_hover-layout6-2', 'grid_hover-layout7-2', 'grid_hover-layout9-2', 'slider-layout5', 'slider-layout6', 'slider-layout7', 'slider-layout8', 'slider-layout9', 'slider-layout11', 'slider-layout12'];
  return !(category_position === 'default' && allLayout.includes(layout));
}; // }
// export const el_ignore_layout = ( layout, category_position ) => {
//     const allLayout = [
//         'grid-layout4', 'grid-layout5', 'grid-layout5-2', 'grid-layout6', 'grid-layout6-2',
//         'list-layout4', 'list-layout5', 'grid_hover-layout5', 'grid_hover-layout6',
//         'grid_hover-layout7', 'grid_hover-layout8', 'grid_hover-layout9', 'grid_hover-layout10',
//         'grid_hover-layout5-2', 'grid_hover-layout6-2', 'grid_hover-layout7-2', 'grid_hover-layout9-2',
//         'slider-layout5', 'slider-layout6', 'slider-layout7', 'slider-layout8', 'slider-layout9',
//         'slider-layout11', 'slider-layout12',
//     ];
//     if ( category_position === 'default' && allLayout.includes( layout ) ) {
//         return false;
//     }
//
//     return true;
//
// }

/***/ }),

/***/ "./src/blocks/controller/ACFSettings.js":
/*!**********************************************!*\
  !*** ./src/blocks/controller/ACFSettings.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


const {
  Spinner
} = wp.components;
const {
  __
} = wp.i18n;


function ACFSettings(props) {
  var _acf_data_lists;

  const {
    attributes,
    setAttributes,
    changeQuery
  } = props.data; //All attribute

  const {
    show_acf,
    cf_hide_empty_value,
    cf_hide_group_title,
    cf_show_only_value,
    acf_data_lists,
    post_type
  } = attributes;

  if (!(rttpgParams.hasAcf && rttpgParams.hasPro && show_acf === 'show')) {
    return '';
  }

  const acfData = [...props.acfData];
  const currentAcf = acfData.find(acf => acf.post_type === post_type);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('ACF', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Choose ACF Field:", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control rttpg-repeater"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], {
    options: currentAcf === null || currentAcf === void 0 ? void 0 : currentAcf.options,
    value: (_acf_data_lists = acf_data_lists[currentAcf.post_type + '_cf_group']) === null || _acf_data_lists === void 0 ? void 0 : _acf_data_lists.options,
    onChange: value => {
      props.changeAcfData(value, currentAcf.post_type + '_cf_group');
    },
    isMulti: true,
    closeMenuOnSelect: true,
    isClearable: false
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Hide field with empty value?", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: cf_hide_empty_value,
    onChange: cf_hide_empty_value => {
      setAttributes({
        cf_hide_empty_value: cf_hide_empty_value ? 'show' : ''
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Show group title?", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: cf_hide_group_title,
    onChange: cf_hide_group_title => {
      setAttributes({
        cf_hide_group_title: cf_hide_group_title ? 'show' : ''
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Show label?", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: cf_show_only_value,
    onChange: cf_show_only_value => {
      setAttributes({
        cf_show_only_value: cf_show_only_value ? 'show' : ''
      });
      changeQuery();
    }
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ACFSettings);

/***/ }),

/***/ "./src/blocks/controller/ACFStyle.js":
/*!*******************************************!*\
  !*** ./src/blocks/controller/ACFStyle.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

const {
  __
} = wp.i18n;


function ACFStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    prefix,
    show_acf
  } = attributes;
  let postLayout = prefix + "_layout";

  if (!(show_acf === 'show' && attributes[postLayout] !== 'grid-layout7')) {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Advanced Custom Field', 'the-post-grid'),
    initialOpen: false
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ACFStyle);

/***/ }),

/***/ "./src/blocks/controller/CardStyle.js":
/*!********************************************!*\
  !*** ./src/blocks/controller/CardStyle.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_BoxShadow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/BoxShadow */ "./src/components/BoxShadow.js");
/* harmony import */ var _components_Background__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Background */ "./src/components/Background.js");

const {
  __
} = wp.i18n;







function CardStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    box_margin,
    content_box_padding_offset,
    box_radius,
    is_box_border,
    box_style_tabs,
    box_background,
    box_border,
    box_box_shadow,
    box_background_hover,
    box_border_hover,
    box_box_shadow_hover
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Card', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Card Gap", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: box_margin,
    onChange: value => {
      setAttributes({
        box_margin: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Content Padding", "the-post-grid"),
    type: "padding",
    responsive: true,
    value: content_box_padding_offset,
    onChange: value => {
      setAttributes({
        content_box_padding_offset: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Card Border Radius", "the-post-grid"),
    type: "borderRadius",
    responsive: true,
    value: box_radius,
    onChange: value => {
      setAttributes({
        box_radius: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Enable Border & Box Shadow", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'enable',
      label: __('Enable', 'the-post-grid')
    }, {
      value: 'disable',
      label: __('Disable', 'the-post-grid')
    }],
    value: is_box_border,
    onChange: is_box_border => setAttributes({
      is_box_border
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.NORMAL_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: box_style_tabs === item.value,
    isSecondary: box_style_tabs !== item.value,
    onClick: () => setAttributes({
      box_style_tabs: item.value
    })
  }, item.label))), box_style_tabs === 'normal' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Background__WEBPACK_IMPORTED_MODULE_6__["default"], {
    image: false,
    label: __("Background", "the-post-grid"),
    value: box_background,
    onChange: val => setAttributes({
      box_background: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Border Color', 'the-post-grid'),
    color: box_border,
    onChange: box_border => setAttributes({
      box_border
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_BoxShadow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __('Box Shadow', 'the-post-grid'),
    value: box_box_shadow,
    onChange: val => setAttributes({
      box_box_shadow: val
    }),
    transitioin: "0.4"
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Background__WEBPACK_IMPORTED_MODULE_6__["default"], {
    image: false,
    label: __("Background - Hover", "the-post-grid"),
    value: box_background_hover,
    onChange: val => setAttributes({
      box_background_hover: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Border Color - Hover', 'the-post-grid'),
    color: box_border_hover,
    onChange: box_border_hover => setAttributes({
      box_border_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_BoxShadow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __('Box Shadow - Hover', 'the-post-grid'),
    value: box_box_shadow_hover,
    onChange: val => setAttributes({
      box_box_shadow_hover: val
    }),
    transitioin: "0.4"
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardStyle);

/***/ }),

/***/ "./src/blocks/controller/ExcerptSettings.js":
/*!**************************************************!*\
  !*** ./src/blocks/controller/ExcerptSettings.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;



function ExcerptSettings(props) {
  const {
    attributes,
    setAttributes,
    changeQuery
  } = props.data; //All attribute

  const {
    excerpt_type,
    excerpt_limit,
    excerpt_more_text
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Excerpt', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Excerpt Type", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.EXCERPT_TYPE,
    value: excerpt_type,
    onChange: excerpt_type => {
      setAttributes({
        excerpt_type
      });
      changeQuery();
    }
  }), ['character', 'word'].includes(excerpt_type) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
    label: __("Excerpt Limit", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    max: 100,
    min: 0,
    placeholder: "Excerpt Limit",
    step: "1",
    value: excerpt_limit,
    onChange: excerpt_limit => {
      setAttributes({
        excerpt_limit
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("Expansion Indicator", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: excerpt_more_text,
    onChange: excerpt_more_text => {
      setAttributes({
        excerpt_more_text
      });
      changeQuery();
    }
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExcerptSettings);

/***/ }),

/***/ "./src/blocks/controller/ExcerptStyle.js":
/*!***********************************************!*\
  !*** ./src/blocks/controller/ExcerptStyle.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Typography */ "./src/components/Typography.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_Alignment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Alignment */ "./src/components/Alignment.js");

const {
  __
} = wp.i18n;







function ExcerptStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    prefix,
    content_typography,
    excerpt_spacing,
    content_alignment,
    excerpt_style_tabs,
    excerpt_color,
    meta_position,
    excerpt_hover_color,
    excerpt_border_hover,
    excerpt_border
  } = attributes;
  let postLayout = prefix + "_layout";
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Excerpt / Content', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Typography', 'the-post-grid'),
    value: content_typography,
    onChange: val => setAttributes({
      content_typography: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Excerpt Spacing", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: excerpt_spacing,
    onChange: value => {
      setAttributes({
        excerpt_spacing: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Alignment__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __("Alignment", "the-post-grid"),
    options: ['left', 'center', 'right'],
    value: content_alignment,
    onChange: content_alignment => setAttributes({
      content_alignment
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.NORMAL_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: excerpt_style_tabs === item.value,
    isSecondary: excerpt_style_tabs !== item.value,
    onClick: () => setAttributes({
      excerpt_style_tabs: item.value
    })
  }, item.label))), excerpt_style_tabs === 'normal' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Excerpt color', 'the-post-grid'),
    color: excerpt_color,
    onChange: excerpt_color => setAttributes({
      excerpt_color
    })
  }), meta_position === 'default' && attributes[postLayout] === 'grid-layout3' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Border color - Hover', 'the-post-grid'),
    color: excerpt_border,
    onChange: excerpt_border => setAttributes({
      excerpt_border
    })
  })), excerpt_style_tabs === 'hover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Excerpt color - Hover', 'the-post-grid'),
    color: excerpt_hover_color,
    onChange: excerpt_hover_color => setAttributes({
      excerpt_hover_color
    })
  }), meta_position === 'default' && attributes[postLayout] === 'grid-layout3' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Border color - Hover', 'the-post-grid'),
    color: excerpt_border_hover,
    onChange: excerpt_border_hover => setAttributes({
      excerpt_border_hover
    })
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExcerptStyle);

/***/ }),

/***/ "./src/blocks/controller/FieldSelectionSettings.js":
/*!*********************************************************!*\
  !*** ./src/blocks/controller/FieldSelectionSettings.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

const {
  __
} = wp.i18n;


function FieldSelectionSettings(props) {
  const {
    attributes,
    setAttributes,
    changeQuery
  } = props.data; //All attribute

  const {
    prefix,
    show_section_title,
    show_title,
    show_thumb,
    show_excerpt,
    show_meta,
    show_date,
    show_category,
    show_tags,
    show_author,
    show_comment_count,
    show_post_count,
    show_read_more,
    show_social_share,
    show_woocommerce_rating,
    show_acf
  } = attributes;
  let postLayout = prefix + "_layout";
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Field Selection', 'the-post-grid'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Section Title", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_section_title,
    onChange: show_section_title => setAttributes({
      show_section_title: show_section_title ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Title", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_title,
    onChange: show_title => setAttributes({
      show_title: show_title ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Thumbnail", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_thumb,
    onChange: show_thumb => setAttributes({
      show_thumb: show_thumb ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Excerpt", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_excerpt,
    onChange: show_excerpt => setAttributes({
      show_excerpt: show_excerpt ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Meta", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_meta,
    onChange: show_meta => setAttributes({
      show_meta: show_meta ? 'show' : ''
    })
  }), 'show' === show_meta && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Date", "the-post-grid"),
    className: "rttpg-toggle-control-field rttpg-padding-left",
    checked: show_date,
    onChange: show_date => setAttributes({
      show_date: show_date ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Category", "the-post-grid"),
    className: "rttpg-toggle-control-field rttpg-padding-left",
    checked: show_category,
    onChange: show_category => setAttributes({
      show_category: show_category ? 'show' : ''
    })
  }), show_category === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
    className: "rttpg-help pl-30"
  }, __("NB: If needed, you can change category source from (Meta Data Settings)", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Tags", "the-post-grid"),
    className: "rttpg-toggle-control-field rttpg-padding-left",
    checked: show_tags,
    onChange: show_tags => setAttributes({
      show_tags: show_tags ? 'show' : ''
    })
  }), show_tags === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
    className: "rttpg-help pl-30"
  }, __("NB: If needed, you can change tag source from (Meta Data Settings)", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Author", "the-post-grid"),
    className: "rttpg-toggle-control-field rttpg-padding-left",
    checked: show_author,
    onChange: show_author => setAttributes({
      show_author: show_author ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post Comment Count", "the-post-grid"),
    className: "rttpg-toggle-control-field rttpg-padding-left",
    checked: show_comment_count,
    onChange: show_comment_count => setAttributes({
      show_comment_count: show_comment_count ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Post View Count", "the-post-grid"),
    className: "rttpg-toggle-control-field rttpg-padding-left",
    checked: show_post_count,
    onChange: show_post_count => setAttributes({
      show_post_count: show_post_count ? 'show' : ''
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Read More Button", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_read_more,
    onChange: show_read_more => setAttributes({
      show_read_more: show_read_more ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Social Share", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_social_share,
    onChange: show_social_share => setAttributes({
      show_social_share: show_social_share ? 'show' : ''
    })
  }), rttpgParams.hasWoo && rttpgParams.hasPro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Woocommerce Rating", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_woocommerce_rating,
    onChange: show_woocommerce_rating => setAttributes({
      show_woocommerce_rating: show_woocommerce_rating ? 'show' : ''
    })
  }), rttpgParams.hasAcf && rttpgParams.hasPro && attributes[postLayout] !== 'grid-layout7' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Advanced Custom Field", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_acf,
    onChange: show_acf => {
      setAttributes({
        show_acf: show_acf ? 'show' : ''
      });
      changeQuery();
    }
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FieldSelectionSettings);

/***/ }),

/***/ "./src/blocks/controller/FrontEndFilterController.js":
/*!***********************************************************!*\
  !*** ./src/blocks/controller/FrontEndFilterController.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

const {
  __
} = wp.i18n;


function FrontEndFilterController(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    show_taxonomy_filter,
    show_author_filter,
    show_order_by,
    show_sort_order,
    show_search,
    filter_type,
    filter_btn_style,
    filter_post_count,
    tgp_filter_taxonomy_hierarchical,
    tpg_hide_all_button,
    tax_filter_all_text,
    author_filter_all_text
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Filter (Front-end)', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Taxonomy Filter", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_taxonomy_filter,
    onChange: show_taxonomy_filter => setAttributes({
      show_taxonomy_filter: show_taxonomy_filter ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Author filter", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_author_filter,
    onChange: show_author_filter => setAttributes({
      show_author_filter: show_author_filter ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Order By Filter", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_order_by,
    onChange: show_order_by => setAttributes({
      show_order_by: show_order_by ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Sort Order Filter", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_sort_order,
    onChange: show_sort_order => setAttributes({
      show_sort_order: show_sort_order ? 'show' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Search filter", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_search,
    onChange: show_search => setAttributes({
      show_search: show_search ? 'show' : ''
    })
  }), (show_taxonomy_filter === 'show' || show_author_filter === 'show' || show_order_by === 'show' || show_sort_order === 'show' || show_search === 'show') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Filter Type", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'dropdown',
      label: __('Dropdown', 'the-post-grid')
    }, {
      value: 'button',
      label: __('Button', 'the-post-grid')
    }],
    value: filter_type,
    onChange: filter_type => setAttributes({
      filter_type
    })
  }), filter_type === 'button' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Filter Style", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'carousel',
      label: __('Collapsable', 'the-post-grid')
    }],
    value: filter_btn_style,
    help: __("If you use collapsable then only category section show on the filter", "the-post-grid"),
    onChange: filter_btn_style => setAttributes({
      filter_btn_style
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Filter Post Count", "the-post-grid"),
    className: "rttpg-control-field label-inline",
    options: [{
      value: 'yes',
      label: __('Yes', 'the-post-grid')
    }, {
      value: 'no',
      label: __('No', 'the-post-grid')
    }],
    value: filter_post_count,
    onChange: filter_post_count => setAttributes({
      filter_post_count
    })
  }), filter_type === 'button' && filter_btn_style === 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Tax Hierarchical", "the-post-grid"),
    className: "rttpg-control-field label-inline",
    options: [{
      value: 'yes',
      label: __('Yes', 'the-post-grid')
    }, {
      value: 'no',
      label: __('No', 'the-post-grid')
    }],
    value: tgp_filter_taxonomy_hierarchical,
    onChange: tgp_filter_taxonomy_hierarchical => setAttributes({
      tgp_filter_taxonomy_hierarchical
    })
  }), filter_type === 'button' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Hide (Show all button)", "the-post-grid"),
    className: "rttpg-control-field label-inline",
    options: [{
      value: 'yes',
      label: __('Show', 'the-post-grid')
    }, {
      value: 'no',
      label: __('Hide', 'the-post-grid')
    }],
    value: tpg_hide_all_button,
    onChange: tpg_hide_all_button => setAttributes({
      tpg_hide_all_button
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("All Taxonomy Text", "the-post-grid"),
    className: "rttpg-control-field label-inline",
    placeholder: "Enter All Category Text Here..",
    value: tax_filter_all_text,
    onChange: tax_filter_all_text => setAttributes({
      tax_filter_all_text
    })
  })), show_author_filter === 'show' && filter_btn_style === 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("All Users Text", "the-post-grid"),
    className: "rttpg-control-field label-inline",
    placeholder: "Enter All Users Text Here..",
    value: author_filter_all_text,
    onChange: author_filter_all_text => setAttributes({
      author_filter_all_text
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FrontEndFilterController);

/***/ }),

/***/ "./src/blocks/controller/FrontEndFilterStyle.js":
/*!******************************************************!*\
  !*** ./src/blocks/controller/FrontEndFilterStyle.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Typography */ "./src/components/Typography.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_RangeDevice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/RangeDevice */ "./src/components/RangeDevice.js");
/* harmony import */ var _components_Alignment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Alignment */ "./src/components/Alignment.js");

const {
  __
} = wp.i18n;








function FrontEndFilterStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    front_filter_typography,
    filter_type,
    filter_btn_style,
    filter_text_alignment,
    filter_v_alignment,
    filter_button_width,
    filter_next_prev_btn,
    section_title_style,
    border_style,
    filter_h_alignment,
    filter_btn_radius,
    frontend_filter_style_tabs,
    filter_color,
    filter_bg_color,
    filter_border_color,
    filter_search_bg,
    sub_menu_color_heading,
    sub_menu_bg_color,
    sub_menu_color,
    sub_menu_border_bottom,
    filter_nav_color,
    filter_nav_bg,
    filter_nav_border,
    filter_color_hover,
    filter_bg_color_hover,
    filter_border_color_hover,
    filter_search_bg_hover,
    sub_menu_color_heading_hover,
    sub_menu_bg_color_hover,
    sub_menu_color_hover,
    sub_menu_border_bottom_hover,
    filter_nav_color_hover,
    filter_nav_bg_hover,
    filter_nav_border_hover,
    show_taxonomy_filter,
    show_author_filter,
    show_order_by,
    show_sort_order,
    show_search
  } = attributes;

  if (!(show_taxonomy_filter === 'show' || show_author_filter === 'show' || show_order_by === 'show' || show_sort_order === 'show' || show_search === 'show')) {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Front-End Filter', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Typography', 'the-post-grid'),
    value: front_filter_typography,
    onChange: val => setAttributes({
      front_filter_typography: val
    })
  }), filter_type === 'button' && filter_btn_style === 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Alignment__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: __("Alignment", "the-post-grid"),
    options: ['left', 'center', 'right'],
    value: filter_text_alignment,
    onChange: filter_text_alignment => setAttributes({
      filter_text_alignment
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Vertical Alignment", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'top',
      label: __('Top', 'the-post-grid')
    }, {
      value: 'center',
      label: __('Center', 'the-post-grid')
    }, {
      value: 'right',
      label: __('Right', 'the-post-grid')
    }],
    value: filter_v_alignment,
    onChange: filter_v_alignment => setAttributes({
      filter_v_alignment
    })
  })), filter_type === 'button' && filter_btn_style === 'carousel' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_RangeDevice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Filter Width'),
    responsive: true,
    value: filter_button_width,
    min: 0,
    max: 1000,
    step: 1,
    onChange: val => setAttributes({
      filter_button_width: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Next/Prev Button", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'visible',
      label: __('Visible', 'the-post-grid')
    }, {
      value: 'hidden',
      label: __('Hidden', 'the-post-grid')
    }],
    value: filter_next_prev_btn,
    onChange: filter_next_prev_btn => setAttributes({
      filter_next_prev_btn
    })
  }), ['style2', 'style3'].includes(section_title_style) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Filter Border", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'disable',
      label: __('Disable', 'the-post-grid')
    }, {
      value: 'enable',
      label: __('Enable', 'the-post-grid')
    }],
    value: border_style,
    onChange: border_style => setAttributes({
      border_style
    })
  })), filter_type !== 'button' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Vertical Alignment", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'left',
      label: __('Top', 'the-post-grid')
    }, {
      value: 'center',
      label: __('Center', 'the-post-grid')
    }, {
      value: 'right',
      label: __('Right', 'the-post-grid')
    }],
    value: filter_h_alignment,
    onChange: filter_h_alignment => setAttributes({
      filter_h_alignment
    })
  })), filter_type !== 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Border Radius", "the-post-grid"),
    type: "borderRadius",
    responsive: true,
    value: filter_btn_radius,
    onChange: value => {
      setAttributes({
        filter_btn_radius: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.NORMAL_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: frontend_filter_style_tabs === item.value,
    isSecondary: frontend_filter_style_tabs !== item.value,
    onClick: () => setAttributes({
      frontend_filter_style_tabs: item.value
    })
  }, item.label))), frontend_filter_style_tabs === 'normal' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Color', 'the-post-grid'),
    color: filter_color,
    onChange: filter_color => setAttributes({
      filter_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Background', 'the-post-grid'),
    color: filter_bg_color,
    onChange: filter_bg_color => setAttributes({
      filter_bg_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Border Color', 'the-post-grid'),
    color: filter_border_color,
    onChange: filter_border_color => setAttributes({
      filter_border_color
    })
  }), show_search === 'show' && filter_btn_style === 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Search Background', 'the-post-grid'),
    color: filter_search_bg,
    onChange: filter_search_bg => setAttributes({
      filter_search_bg
    })
  }), filter_type === 'dropdown' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Sub Menu Options', 'the-post-grid'),
    color: sub_menu_color_heading,
    onChange: sub_menu_color_heading => setAttributes({
      sub_menu_color_heading
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Submenu Background', 'the-post-grid'),
    color: sub_menu_bg_color,
    onChange: sub_menu_bg_color => setAttributes({
      sub_menu_bg_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Submenu Color', 'the-post-grid'),
    color: sub_menu_color,
    onChange: sub_menu_color => setAttributes({
      sub_menu_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Submenu Border', 'the-post-grid'),
    color: sub_menu_border_bottom,
    onChange: sub_menu_border_bottom => setAttributes({
      sub_menu_border_bottom
    })
  })), filter_next_prev_btn === 'visible' && filter_btn_style === 'carousel' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Nav Color', 'the-post-grid'),
    color: filter_nav_color,
    onChange: filter_nav_color => setAttributes({
      filter_nav_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Nav Background', 'the-post-grid'),
    color: filter_nav_bg,
    onChange: filter_nav_bg => setAttributes({
      filter_nav_bg
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Nav Border', 'the-post-grid'),
    color: filter_nav_border,
    onChange: filter_nav_border => setAttributes({
      filter_nav_border
    })
  }))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Color - Hover', 'the-post-grid'),
    color: filter_color_hover,
    onChange: filter_color_hover => setAttributes({
      filter_color_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Background - Hover', 'the-post-grid'),
    color: filter_bg_color_hover,
    onChange: filter_bg_color_hover => setAttributes({
      filter_bg_color_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Border Color - Hover', 'the-post-grid'),
    color: filter_border_color_hover,
    onChange: filter_border_color_hover => setAttributes({
      filter_border_color_hover
    })
  }), show_search === 'show' && filter_btn_style === 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Search Background - Hover', 'the-post-grid'),
    color: filter_search_bg_hover,
    onChange: filter_search_bg_hover => setAttributes({
      filter_search_bg_hover
    })
  }), filter_type === 'dropdown' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Sub Menu Options - Hover', 'the-post-grid'),
    color: sub_menu_color_heading_hover,
    onChange: sub_menu_color_heading_hover => setAttributes({
      sub_menu_color_heading_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Submenu Background - Hover', 'the-post-grid'),
    color: sub_menu_bg_color_hover,
    onChange: sub_menu_bg_color_hover => setAttributes({
      sub_menu_bg_color_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Submenu Color - Hover', 'the-post-grid'),
    color: sub_menu_color_hover,
    onChange: sub_menu_color_hover => setAttributes({
      sub_menu_color_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Submenu Border - Hover', 'the-post-grid'),
    color: sub_menu_border_bottom_hover,
    onChange: sub_menu_border_bottom_hover => setAttributes({
      sub_menu_border_bottom_hover
    })
  })), filter_next_prev_btn === 'visible' && filter_btn_style === 'carousel' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Nav Color - Hover', 'the-post-grid'),
    color: filter_nav_color_hover,
    onChange: filter_nav_color_hover => setAttributes({
      filter_nav_color_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Nav Background - Hover', 'the-post-grid'),
    color: filter_nav_bg_hover,
    onChange: filter_nav_bg_hover => setAttributes({
      filter_nav_bg_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Filter Nav Border - Hover', 'the-post-grid'),
    color: filter_nav_border_hover,
    onChange: filter_nav_border_hover => setAttributes({
      filter_nav_border_hover
    })
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FrontEndFilterStyle);

/***/ }),

/***/ "./src/blocks/controller/LayoutController.js":
/*!***************************************************!*\
  !*** ./src/blocks/controller/LayoutController.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/icon/icons */ "./src/components/icon/icons.js");
/* harmony import */ var _components_RangeDevice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/RangeDevice */ "./src/components/RangeDevice.js");
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Alignment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Alignment */ "./src/components/Alignment.js");
/* harmony import */ var _components_Styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Styles */ "./src/components/Styles.js");

const {
  __
} = wp.i18n;







function LayoutController(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    prefix,
    grid_column,
    grid_layout_style,
    ignore_sticky_posts,
    title_alignment
  } = attributes;
  let postLayout = prefix + "_layout";
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Layout', 'the-post-grid'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Styles__WEBPACK_IMPORTED_MODULE_6__["default"], {
    value: attributes[postLayout],
    onChange: val => props.changeLayout(val),
    options: [{
      value: 'grid-layout1',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout1,
      label: __('Layout 1')
    }, {
      value: 'grid-layout3',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout2,
      label: __('Layout 2')
    }, {
      value: 'grid-layout4',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout3,
      label: __('Layout 3')
    }, {
      value: 'grid-layout2',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout4,
      label: __('Layout 4')
    }, {
      value: 'grid-layout5',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout5,
      label: __('Layout 5')
    }, {
      value: 'grid-layout5-2',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout6,
      label: __('Layout 6')
    }, {
      value: 'grid-layout6',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout7,
      label: __('Layout 7')
    }, {
      value: 'grid-layout6-2',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout8,
      label: __('Layout 8')
    }, {
      value: 'grid-layout7',
      svg: _components_icon_icons__WEBPACK_IMPORTED_MODULE_2__["default"].grid_layout9,
      label: __('Layout 9')
    }]
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_RangeDevice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Grid Column', 'the-post-grid'),
    responsive: true,
    value: grid_column,
    min: 0,
    max: 6,
    step: 1,
    units: false,
    onChange: val => setAttributes({
      grid_column: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __('Layout Style', 'the-post-grid'),
    help: __('If you use card border then equal height will appear', 'the-post-grid'),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: grid_layout_style,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_4__.GRID_STYLE,
    onChange: grid_layout_style => {
      setAttributes({
        grid_layout_style
      });
    }
  }), grid_layout_style === 'masonry' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
    className: "rttpg-help"
  }, __("NB: Masonry will work only the front-end", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Alignment__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Title Align", "the-post-grid"),
    value: title_alignment,
    responsive: true,
    options: ['left', 'center', 'right'],
    onChange: val => setAttributes({
      title_alignment: val
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayoutController);

/***/ }),

/***/ "./src/blocks/controller/LinksController.js":
/*!**************************************************!*\
  !*** ./src/blocks/controller/LinksController.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;



function LinksController(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    post_link_type,
    link_target,
    is_thumb_linked
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Links', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Post link type", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.POST_LINK_TYPE,
    value: post_link_type,
    onChange: post_link_type => setAttributes({
      post_link_type
    })
  }), post_link_type === 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Link Target", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: '_self',
      label: __('Same Window', 'the-post-grid')
    }, {
      value: '_blank',
      label: __('New Window', 'the-post-grid')
    }],
    value: link_target,
    onChange: link_target => setAttributes({
      link_target
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Thumbnail Link", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'yes',
      label: __('Yes', 'the-post-grid')
    }, {
      value: 'no',
      label: __('No', 'the-post-grid')
    }],
    value: is_thumb_linked,
    onChange: is_thumb_linked => setAttributes({
      is_thumb_linked
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksController);

/***/ }),

/***/ "./src/blocks/controller/MetaSettings.js":
/*!***********************************************!*\
  !*** ./src/blocks/controller/MetaSettings.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;





function MetaSettings(props) {
  const {
    attributes,
    setAttributes,
    changeQuery
  } = props.data; //All attribute

  const {
    show_meta,
    show_date,
    show_category,
    show_author,
    show_tags,
    show_comment_count,
    show_post_count,
    meta_position,
    meta_separator,
    author_prefix,
    author_icon_visibility,
    show_author_image,
    category_position,
    category_style,
    show_cat_icon,
    category_source,
    tag_source,
    show_comment_count_label,
    meta_ordering
  } = attributes;

  if (!(show_meta === 'show' && (show_date === 'show' || show_category === 'show' || show_author === 'show' || show_tags === 'show' || show_comment_count === 'show' || show_post_count === 'show'))) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  }

  const allTaxonomyList = rttpgParams.get_taxonomies;
  let tpgAllTaxonomiesSelect = new Set();

  for (let tax in allTaxonomyList) {
    let value = allTaxonomyList[tax];

    if (value.object_type[0] === post_type) {
      tpgAllTaxonomiesSelect.add({
        value: value.name,
        label: value.label
      });
    }
  }

  tpgAllTaxonomiesSelect = [...tpgAllTaxonomiesSelect];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Meta Data', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Meta Position", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.META_POSITION,
    value: meta_position,
    onChange: meta_position => setAttributes({
      meta_position
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Show Meta Icon", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_date,
    onChange: show_meta_icon => setAttributes({
      show_meta_icon: show_meta_icon ? 'yes' : ''
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Meta Separator", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default - None', 'the-post-grid')
    }, {
      value: '.',
      label: __('Dot ( . )', 'the-post-grid')
    }, {
      value: '/',
      label: __('Single Slash ( / )', 'the-post-grid')
    }, {
      value: '//',
      label: __('Double Slash ( // )', 'the-post-grid')
    }, {
      value: '-',
      label: __('Hyphen ( - )', 'the-post-grid')
    }, {
      value: '|',
      label: __('Vertical Pipe ( | )', 'the-post-grid')
    }],
    value: meta_separator,
    onChange: meta_separator => setAttributes({
      meta_separator
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), show_author === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Author Setting:", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("Author Prefix", "the-post-grid"),
    placeholder: "By",
    className: "rttpg-control-field",
    value: author_prefix,
    onChange: author_prefix => setAttributes({
      author_prefix
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Author Icon Visibility", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: author_icon_visibility,
    onChange: author_icon_visibility => setAttributes({
      author_icon_visibility: author_icon_visibility ? 'show' : ''
    })
  }), author_icon_visibility === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Author Image / Icon", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'show',
      label: __('Image', 'the-post-grid')
    }, {
      value: 'icon',
      label: __('Icon', 'the-post-grid')
    }],
    value: show_author_image,
    onChange: show_author_image => setAttributes({
      show_author_image
    })
  })), (show_category === 'show' || show_tags === 'show') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Category and Tags Setting:", "the-post-grid")), show_category === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Category Position", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'above_title',
      label: __('Above Title', 'the-post-grid')
    }, {
      value: 'with_meta',
      label: __('With Meta', 'the-post-grid')
    }, {
      value: 'top_left',
      label: __('Over image (Top Left)', 'the-post-grid')
    }, {
      value: 'top_right',
      label: __('Over image (Top Right)', 'the-post-grid')
    }, {
      value: 'bottom_left',
      label: __('Over image (Bottom Left)', 'the-post-grid')
    }, {
      value: 'bottom_right',
      label: __('Over image (Bottom Right)', 'the-post-grid')
    }, {
      value: 'image_center',
      label: __('Over image (Center)', 'the-post-grid')
    }],
    value: category_position,
    onChange: category_position => setAttributes({
      category_position
    })
  }), category_position !== 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Category Style", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'style1',
      label: __('Style 1', 'the-post-grid')
    }, {
      value: 'style2',
      label: __('Style 2', 'the-post-grid')
    }, {
      value: 'style3',
      label: __('Style 3', 'the-post-grid')
    }],
    value: category_style,
    onChange: category_style => setAttributes({
      category_style
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Show Over Image Category Icon", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_cat_icon,
    onChange: show_cat_icon => setAttributes({
      show_cat_icon: show_cat_icon ? 'yes' : ''
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Category Source", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: tpgAllTaxonomiesSelect,
    value: category_source,
    onChange: category_source => {
      setAttributes({
        category_source
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Tag Source", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: tpgAllTaxonomiesSelect,
    value: tag_source,
    onChange: tag_source => {
      setAttributes({
        tag_source
      });
      changeQuery();
    }
  }))), show_comment_count === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Comment Count:", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Show Comment Label", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_comment_count_label,
    onChange: show_comment_count_label => setAttributes({
      show_comment_count_label: show_comment_count_label ? 'yes' : ''
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control rttpg-repeater"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label components-input-control__label",
    htmlFor: "react-select-2-input"
  }, __('Meta Ordering', 'the-post-grid')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.META_ORDERING_LABEL,
    value: meta_ordering,
    onChange: value => {
      setAttributes({
        meta_ordering: value
      });
      changeQuery();
    },
    help: __("Select sequentially from here for sort meta order.", 'the-post-grid'),
    isMulti: true,
    closeMenuOnSelect: false,
    isClearable: false
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MetaSettings);

/***/ }),

/***/ "./src/blocks/controller/MetaStyle.js":
/*!********************************************!*\
  !*** ./src/blocks/controller/MetaStyle.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Typography */ "./src/components/Typography.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_Range__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Range */ "./src/components/Range.js");

const {
  __
} = wp.i18n;








function MetaStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    prefix,
    show_meta,
    post_meta_typography,
    meta_spacing,
    category_position,
    separator_cat_typography,
    category_margin_bottom,
    category_radius,
    meta_info_style_tabs,
    meta_info_color,
    meta_link_color,
    meta_separator_color,
    meta_icon_color,
    separate_category_color,
    separate_category_bg,
    show_cat_icon,
    separate_category_icon_color,
    meta_link_colo_hover,
    separate_category_color_hover,
    separate_category_bg_hover,
    meta_link_colo_box_hover,
    separate_category_color_box_hover,
    separate_category_bg_box_hover,
    separate_category_icon_color_box_hover
  } = attributes;
  let postLayout = prefix + "_layout";

  if (!(attributes[postLayout] !== 'grid-layout7' && show_meta === 'show')) {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Post Meta', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Category Typography'),
    value: post_meta_typography,
    onChange: val => setAttributes({
      post_meta_typography: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Meta Spacing", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: meta_spacing,
    onChange: value => {
      setAttributes({
        meta_spacing: value
      });
    }
  }), category_position !== 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Separate Category:", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Separate Cat Typography'),
    value: separator_cat_typography,
    onChange: val => setAttributes({
      separator_cat_typography: val
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Range__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __("Category Margin Bottom"),
    reset: true,
    value: category_margin_bottom,
    onChange: val => setAttributes({
      category_margin_bottom: val
    }),
    min: 0,
    max: 50,
    step: 1
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Category Border Radius", "the-post-grid"),
    type: "borderRadius",
    responsive: true,
    value: category_radius,
    onChange: value => {
      setAttributes({
        category_radius: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.BOX_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: meta_info_style_tabs === item.value,
    isSecondary: meta_info_style_tabs !== item.value,
    onClick: () => setAttributes({
      meta_info_style_tabs: item.value
    })
  }, item.label))), meta_info_style_tabs === 'normal' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Meta Color', 'the-post-grid'),
    color: meta_info_color,
    onChange: meta_info_color => setAttributes({
      meta_info_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Meta Link Color', 'the-post-grid'),
    color: meta_link_color,
    onChange: meta_link_color => setAttributes({
      meta_link_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Separator Color', 'the-post-grid'),
    color: meta_separator_color,
    onChange: meta_separator_color => setAttributes({
      meta_separator_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Icon Color', 'the-post-grid'),
    color: meta_icon_color,
    onChange: meta_icon_color => setAttributes({
      meta_icon_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Color', 'the-post-grid'),
    color: separate_category_color,
    onChange: separate_category_color => setAttributes({
      separate_category_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Background', 'the-post-grid'),
    color: separate_category_bg,
    onChange: separate_category_bg => setAttributes({
      separate_category_bg
    })
  }), show_cat_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Icon Color', 'the-post-grid'),
    color: separate_category_icon_color,
    onChange: separate_category_icon_color => setAttributes({
      separate_category_icon_color
    })
  })), meta_info_style_tabs === 'hover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Meta Link Color - Hover', 'the-post-grid'),
    color: meta_link_colo_hover,
    onChange: meta_link_colo_hover => setAttributes({
      meta_link_colo_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Color - Hover', 'the-post-grid'),
    color: separate_category_color_hover,
    onChange: separate_category_color_hover => setAttributes({
      separate_category_color_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Background - Hover', 'the-post-grid'),
    color: separate_category_bg_hover,
    onChange: separate_category_bg_hover => setAttributes({
      separate_category_bg_hover
    })
  })), meta_info_style_tabs === 'box_hover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Meta Color - Box Hover', 'the-post-grid'),
    color: meta_link_colo_box_hover,
    onChange: meta_link_colo_box_hover => setAttributes({
      meta_link_colo_box_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Color - Hover', 'the-post-grid'),
    color: separate_category_color_box_hover,
    onChange: separate_category_color_box_hover => setAttributes({
      separate_category_color_box_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Background - Box Hover', 'the-post-grid'),
    color: separate_category_bg_box_hover,
    onChange: separate_category_bg_box_hover => setAttributes({
      separate_category_bg_box_hover
    })
  }), show_cat_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Category Icon Color - Box Hover', 'the-post-grid'),
    color: separate_category_icon_color_box_hover,
    onChange: separate_category_icon_color_box_hover => setAttributes({
      separate_category_icon_color_box_hover
    })
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MetaStyle);

/***/ }),

/***/ "./src/blocks/controller/PaginationController.js":
/*!*******************************************************!*\
  !*** ./src/blocks/controller/PaginationController.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;



function PaginationController(props) {
  const {
    attributes,
    setAttributes,
    changeQuery
  } = props.data; //All attribute

  const {
    show_pagination,
    display_per_page,
    pagination_type,
    ajax_pagination_type,
    load_more_button_text
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Pagination', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Show Pagination", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_pagination,
    onChange: show_pagination => {
      setAttributes({
        show_pagination: show_pagination ? 'show' : ''
      });
      changeQuery();
    }
  }), show_pagination === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    label: __("Display Per Page", "the-post-grid"),
    help: __("Enter how may posts will display per page", "the-post-grid"),
    max: 100,
    min: 1,
    value: display_per_page,
    onChange: display_per_page => {
      setAttributes({
        display_per_page,
        page: 1
      });
      changeQuery();
    },
    placeholder: "0",
    shiftStep: 10,
    step: "1",
    className: "rttpg-control-field label-inline"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Pagination Type", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.PAGINATION_TYPE,
    value: pagination_type,
    onChange: pagination_type => setAttributes({
      pagination_type
    })
  }), pagination_type === 'pagination_ajax' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Enable Ajax Next Previous", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: ajax_pagination_type,
    onChange: ajax_pagination_type => setAttributes({
      ajax_pagination_type: ajax_pagination_type ? 'yes' : ''
    })
  }), pagination_type === 'load_more' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("Button Text", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    placeholder: "Enter Button Text Here..",
    value: load_more_button_text,
    onChange: load_more_button_text => setAttributes({
      load_more_button_text
    })
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaginationController);

/***/ }),

/***/ "./src/blocks/controller/PostThumbnailSettings.js":
/*!********************************************************!*\
  !*** ./src/blocks/controller/PostThumbnailSettings.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Media__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Media */ "./src/components/Media.js");
/* harmony import */ var _components_RangeDevice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/RangeDevice */ "./src/components/RangeDevice.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);


const {
  __
} = wp.i18n;





function PostThumbnailSettings(props) {
  const {
    attributes,
    setAttributes,
    changeQuery
  } = props.data;
  const imageSizes = [...props.imageSizes]; //All attribute

  const {
    media_source,
    image_size,
    img_crop_style,
    c_image_width,
    c_image_height,
    image_height,
    image_offset_size,
    offset_image_height,
    hover_animation,
    is_thumb_lightbox,
    is_default_img,
    default_image
  } = attributes; // Get all Image Size
  // const [ imageSizes, setImageSizes ] = useState( [] )
  //
  // useEffect( () => {
  //     apiFetch( { path: "/rttpg/v1/image-size" } )
  //         .then( ( imageSizes ) => {
  //             setImageSizes( imageSizes )
  //         } )
  // }, [] );

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Post Thumbnail', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Media Source", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'feature_image',
      label: __('Feature Image', 'the-post-grid')
    }, {
      value: 'first_image',
      label: __('First Image from content', 'the-post-grid')
    }],
    value: media_source,
    onChange: media_source => {
      setAttributes({
        media_source
      });
      changeQuery();
    }
  }), media_source === 'feature_image' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Image Size", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: imageSizes,
    value: image_size,
    onChange: image_size => {
      setAttributes({
        image_size
      });
      changeQuery();
    }
  }), image_size === 'custom' && media_source === 'feature_image' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-ground-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Image Crop Style", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'soft',
      label: __('Soft Crop', 'the-post-grid')
    }, {
      value: 'hard',
      label: __('Hard Crop', 'the-post-grid')
    }],
    value: img_crop_style,
    onChange: img_crop_style => setAttributes({
      img_crop_style
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-image-dimension"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label components-input-control__label",
    htmlFor: "react-select-2-input"
  }, __('Image Dimension', 'the-post-grid')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl // label={ __( "Width", "the-post-grid" ) }
  , {
    className: "rttpg-control-field",
    max: 2000,
    min: 1,
    placeholder: "Width",
    step: "1",
    value: c_image_width,
    onChange: c_image_width => setAttributes({
      c_image_width
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl // label={ __( "Height", "the-post-grid" ) }
  , {
    className: "rttpg-control-field",
    max: 2000,
    min: 1,
    placeholder: "Height",
    step: "1",
    value: c_image_height,
    onChange: c_image_height => setAttributes({
      c_image_height
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
    className: "rttpg-help danger"
  }, __("NB: Custom image size works only on front-end.", "the-post-grid")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_RangeDevice__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Image Height'),
    responsive: true,
    min: 0,
    max: 1000,
    step: 1,
    value: image_height,
    onChange: val => setAttributes({
      image_height: val
    })
  }),  false && 0, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Image Hover Animation", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'img_zoom_in',
      label: __('Zoom In', 'the-post-grid')
    }, {
      value: 'img_zoom_out',
      label: __('Zoom Out', 'the-post-grid')
    }, {
      value: 'slide_to_right',
      label: __('Slide to Right', 'the-post-grid')
    }, {
      value: 'slide_to_left',
      label: __('Slide to Left', 'the-post-grid')
    }, {
      value: 'img_no_effect',
      label: __('None', 'the-post-grid')
    }],
    value: hover_animation,
    onChange: hover_animation => setAttributes({
      hover_animation
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Light Box", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'show',
      label: __('Show', 'the-post-grid')
    }, {
      value: 'hide',
      label: __('Hide', 'the-post-grid')
    }],
    value: is_thumb_lightbox,
    onChange: is_thumb_lightbox => setAttributes({
      is_thumb_lightbox
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Enable Default Image", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: is_default_img,
    onChange: is_default_img => setAttributes({
      is_default_img: is_default_img ? 'yes' : ''
    })
  }), is_default_img === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Media__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: __("Default Image", "the-post-grid"),
    multiple: false,
    type: ['image'],
    panel: true,
    value: default_image,
    onChange: val => {
      setAttributes({
        default_image: val
      });
      changeQuery();
    }
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostThumbnailSettings);

/***/ }),

/***/ "./src/blocks/controller/PostThumbnailStyle.js":
/*!*****************************************************!*\
  !*** ./src/blocks/controller/PostThumbnailStyle.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_Background__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Background */ "./src/components/Background.js");

const {
  __
} = wp.i18n;







function PostThumbnailStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    img_border_radius,
    image_width,
    thumbnail_spacing,
    grid_hover_style_tabs,
    grid_hover_overlay_color,
    is_thumb_lightbox,
    thumb_lightbox_bg,
    thumb_lightbox_color,
    grid_hover_overlay_color_hover,
    thumb_lightbox_bg_hover,
    thumb_lightbox_color_hover,
    grid_hover_overlay_type,
    grid_hover_overlay_height,
    on_hover_overlay
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Thumbnail', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Border Radius", "the-post-grid"),
    type: "borderRadius",
    responsive: true,
    value: img_border_radius,
    onChange: value => {
      setAttributes({
        img_border_radius: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Image Width (Optional)", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'inherit',
      label: __('Default', 'the-post-grid')
    }, {
      value: '100%',
      label: __('100%', 'the-post-grid')
    }, {
      value: 'auto',
      label: __('Auto', 'the-post-grid')
    }],
    value: image_width,
    onChange: image_width => setAttributes({
      image_width
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Thumbnail Margin", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: thumbnail_spacing,
    onChange: value => {
      setAttributes({
        thumbnail_spacing: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Overlay Style:", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.NORMAL_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: grid_hover_style_tabs === item.value,
    isSecondary: grid_hover_style_tabs !== item.value,
    onClick: () => setAttributes({
      grid_hover_style_tabs: item.value
    })
  }, item.label))), grid_hover_style_tabs === 'normal' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Background__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Overlay BG", "the-post-grid"),
    image: false,
    value: grid_hover_overlay_color,
    onChange: val => setAttributes({
      grid_hover_overlay_color: val
    })
  }), is_thumb_lightbox === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Light Box Background', 'the-post-grid'),
    color: thumb_lightbox_bg,
    onChange: thumb_lightbox_bg => setAttributes({
      thumb_lightbox_bg
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Light Box Color', 'the-post-grid'),
    color: thumb_lightbox_color,
    onChange: thumb_lightbox_color => setAttributes({
      thumb_lightbox_color
    })
  }))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Background__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Overlay BG - Hover", "the-post-grid"),
    image: false,
    value: grid_hover_overlay_color_hover,
    onChange: val => setAttributes({
      grid_hover_overlay_color_hover: val
    })
  }), is_thumb_lightbox === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Light Box Background - Hover', 'the-post-grid'),
    color: thumb_lightbox_bg_hover,
    onChange: thumb_lightbox_bg_hover => setAttributes({
      thumb_lightbox_bg_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Light Box Color - Hover', 'the-post-grid'),
    color: thumb_lightbox_color_hover,
    onChange: thumb_lightbox_color_hover => setAttributes({
      thumb_lightbox_color_hover
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __('Overlay Interaction', 'the-post-grid'),
    className: "rttpg-control-field label-inline rttpg-expand",
    help: __("If you don\\'t choose overlay background then it will work only for some selected layout", "the-post-grid"),
    value: grid_hover_overlay_type,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.OVERLAY_TYPE,
    onChange: grid_hover_overlay_type => setAttributes({
      grid_hover_overlay_type
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Overlay Height", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'full',
      label: __('100%', 'the-post-grid')
    }, {
      value: 'auto',
      label: __('Auto', 'the-post-grid')
    }],
    value: grid_hover_overlay_height,
    onChange: grid_hover_overlay_height => setAttributes({
      grid_hover_overlay_height
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Overlay Height on hover", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'full',
      label: __('100%', 'the-post-grid')
    }, {
      value: 'auto',
      label: __('Auto', 'the-post-grid')
    }],
    value: on_hover_overlay,
    onChange: on_hover_overlay => setAttributes({
      on_hover_overlay
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostThumbnailStyle);

/***/ }),

/***/ "./src/blocks/controller/QueryController.js":
/*!**************************************************!*\
  !*** ./src/blocks/controller/QueryController.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var flatpickr_dist_themes_light_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flatpickr/dist/themes/light.css */ "./node_modules/flatpickr/dist/themes/light.css");
/* harmony import */ var react_flatpickr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-flatpickr */ "./node_modules/react-flatpickr/build/index.js");
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;







function QueryController(props) {
  const {
    attributes,
    setAttributes,
    changeQuery
  } = props.data; //All attribute

  const {
    ignore_sticky_posts,
    no_posts_found_text,
    post_type,
    post_id,
    exclude,
    post_limit,
    offset,
    author,
    post_keyword,
    relation,
    orderby,
    order,
    taxonomy_lists,
    start_date,
    end_date
  } = attributes;
  const allTermList = rttpgParams.all_term_list;
  const allTaxonomyList = rttpgParams.get_taxonomies;
  let tpgAllTaxonomies = new Set();

  for (let tax in allTaxonomyList) {
    let value = allTaxonomyList[tax];

    if (value.object_type[0] === post_type) {
      tpgAllTaxonomies.add({
        value: value.name,
        name: value.label
      });
    }
  }

  tpgAllTaxonomies = [...tpgAllTaxonomies];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Query Build', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __('Post Source', 'the-post-grid'),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: post_type,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_4__.POSTS_TYPE,
    onChange: post_type => {
      setAttributes({
        post_type,
        page: 1
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Common Filters:", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("Include only", "the-post-grid"),
    help: __("Enter the post IDs separated by comma for include", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand has-help",
    placeholder: "Eg. 10, 15, 17",
    value: post_id,
    onChange: post_id => {
      setAttributes({
        post_id
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("Exclude", "the-post-grid"),
    help: __("Enter the post IDs separated by comma for exclude", "the-post-grid"),
    placeholder: "Eg. 12, 13",
    className: "rttpg-control-field label-inline rttpg-expand has-help",
    value: exclude,
    onChange: exclude => {
      setAttributes({
        exclude
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    label: __("Limit", "the-post-grid"),
    help: __("The number of posts to show. Enter -1 to show all found posts.", "the-post-grid"),
    max: 100,
    min: 0,
    value: post_limit,
    onChange: post_limit => {
      setAttributes({
        post_limit
      });
      changeQuery();
    },
    placeholder: "0",
    shiftStep: 10,
    step: "1",
    className: "rttpg-control-field label-inline"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    label: __("Offset", "the-post-grid"),
    max: 100,
    min: 0,
    value: offset,
    onChange: offset => {
      setAttributes({
        offset
      });
      changeQuery();
    },
    placeholder: "0",
    shiftStep: 10,
    step: "1",
    className: "rttpg-control-field label-inline"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
    className: "rttpg-control-heading"
  }, __("Advanced Filters:", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-ground-control"
  }, tpgAllTaxonomies.map(taxonomy => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "components-base-control rttpg-repeater"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "components-base-control__label components-input-control__label",
      htmlFor: "react-select-2-input"
    }, __('By ' + taxonomy.name, 'the-post-grid')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
      options: (0,_components_Constants__WEBPACK_IMPORTED_MODULE_4__.PRINT_TAXONOMY)(allTermList[taxonomy.value]),
      value: Object.keys(taxonomy_lists).length > 0 ? taxonomy_lists[taxonomy.value] !== undefined ? taxonomy_lists[taxonomy.value].options : [] : [],
      onChange: value => {
        props.changeTaxonomy(value, taxonomy.value);
      },
      isMulti: true,
      closeMenuOnSelect: true,
      isClearable: false
    }));
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Taxonomies Relation", "the-post-grid"),
    className: "rttpg-control-field label-inline",
    value: relation,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_4__.TAX_RELATION,
    onChange: relation => {
      setAttributes({
        relation
      });
      changeQuery();
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("By Author", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: author,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_4__.AUTHOR_LISTS,
    onChange: author => {
      setAttributes({
        author
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("By Keyword", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    placeholder: "Search by keyword",
    value: post_keyword,
    onChange: post_keyword => {
      setAttributes({
        post_keyword
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-elm-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, __("Start Date", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_flatpickr__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __("Start Date", "the-post-grid"),
    options: {
      'dateFormat': "M j, Y"
    },
    placeholder: "Choose Start Date...",
    value: start_date,
    onChange: _ref => {
      let [start_date] = _ref;
      setAttributes({
        start_date
      });
      changeQuery();
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-elm-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, " ", __("End Date", "the-post-grid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_flatpickr__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __("End Date", "the-post-grid"),
    options: {
      'dateFormat': "M j, Y"
    },
    placeholder: "Choose End Date...",
    value: end_date,
    onChange: _ref2 => {
      let [end_date] = _ref2;
      setAttributes({
        end_date
      });
      changeQuery();
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Order By", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: orderby,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_4__.POST_ORDER_BY,
    onChange: orderby => {
      setAttributes({
        orderby
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Sort Order", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: order,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_4__.POST_SORT_ORDER,
    onChange: order => {
      setAttributes({
        order
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Ignore sticky posts at the top", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: ignore_sticky_posts,
    onChange: ignore_sticky_posts => {
      setAttributes({
        ignore_sticky_posts: ignore_sticky_posts ? 'yes' : ''
      });
      changeQuery();
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("No Post Found Text", "the-post-grid"),
    className: "rttpg-control-field",
    value: no_posts_found_text,
    onChange: no_posts_found_text => {
      setAttributes({
        no_posts_found_text
      });
      changeQuery();
    }
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryController);

/***/ }),

/***/ "./src/blocks/controller/ReadMoreSettings.js":
/*!***************************************************!*\
  !*** ./src/blocks/controller/ReadMoreSettings.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_IconList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/IconList */ "./src/components/IconList.js");

const {
  __
} = wp.i18n;



function ReadMoreSettings(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    show_read_more,
    readmore_btn_style,
    read_more_label,
    show_btn_icon,
    readmore_btn_icon
  } = attributes;

  if (show_read_more !== 'show') {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Read More', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Button Style", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default-style',
      label: __('Default from style', 'the-post-grid')
    }, {
      value: 'only-text',
      label: __('Text Button', 'the-post-grid')
    }],
    value: readmore_btn_style,
    onChange: readmore_btn_style => setAttributes({
      readmore_btn_style
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    autocomplete: "off",
    label: __("Button Label", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    placeholder: "Type Read More Label here",
    value: read_more_label,
    onChange: read_more_label => setAttributes({
      read_more_label
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: __("Show Button Icon", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    checked: show_btn_icon,
    onChange: show_btn_icon => setAttributes({
      show_btn_icon: show_btn_icon ? 'yes' : ''
    })
  }), show_btn_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_IconList__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: __("Choose Icon", "the-post-grid"),
    className: "rttpg-toggle-control-field",
    value: readmore_btn_icon,
    onChange: val => setAttributes({
      readmore_btn_icon: val
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReadMoreSettings);

/***/ }),

/***/ "./src/blocks/controller/ReadMoreStyle.js":
/*!************************************************!*\
  !*** ./src/blocks/controller/ReadMoreStyle.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Typography */ "./src/components/Typography.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_RangeDevice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/RangeDevice */ "./src/components/RangeDevice.js");
/* harmony import */ var _components_Alignment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Alignment */ "./src/components/Alignment.js");

const {
  __
} = wp.i18n;









function ReadMoreStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    prefix,
    show_read_more,
    readmore_typography,
    readmore_spacing,
    readmore_btn_style,
    readmore_padding,
    readmore_btn_alignment,
    readmore_icon_position,
    readmore_icon_size,
    readmore_icon_y_position,
    readmore_style_tabs,
    readmore_text_color,
    readmore_icon_color,
    readmore_bg,
    border_radius,
    readmore_border,
    readmore_icon_margin,
    readmore_text_color_hover,
    readmore_icon_color_hover,
    readmore_bg_hover,
    border_radius_hover,
    readmore_border_hover,
    show_btn_icon,
    readmore_icon_margin_hover,
    readmore_text_color_box_hover,
    readmore_icon_color_box_hover,
    readmore_bg_box_hover,
    readmore_border_box_hover
  } = attributes;
  let postLayout = prefix + "_layout";

  if (!(show_read_more === 'show' && attributes[postLayout] !== 'grid-layout7')) {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Read More', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Typography'),
    value: readmore_typography,
    onChange: val => setAttributes({
      readmore_typography: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Button Spacing", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: readmore_spacing,
    onChange: value => {
      setAttributes({
        readmore_spacing: value
      });
    }
  }), readmore_btn_style === 'default-style' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Button Padding", "the-post-grid"),
    type: "padding",
    responsive: true,
    value: readmore_padding,
    onChange: value => {
      setAttributes({
        readmore_padding: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Alignment__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: __("Button Alignment", "the-post-grid"),
    options: ['left', 'center', 'right'],
    value: readmore_btn_alignment,
    onChange: readmore_btn_alignment => setAttributes({
      readmore_btn_alignment
    })
  }), show_btn_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Icon Position", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'left',
      label: __('Left', 'the-post-grid')
    }, {
      value: 'right',
      label: __('Right', 'the-post-grid')
    }],
    value: readmore_icon_position,
    onChange: readmore_icon_position => setAttributes({
      readmore_icon_position
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_RangeDevice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Icon Size'),
    responsive: true,
    min: 10,
    max: 50,
    step: 1,
    value: readmore_icon_size,
    onChange: val => setAttributes({
      readmore_icon_size: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_RangeDevice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Icon Vertical Position'),
    responsive: true,
    min: -20,
    max: 20,
    step: 1,
    value: readmore_icon_y_position,
    onChange: val => setAttributes({
      readmore_icon_y_position: val
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.BOX_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: readmore_style_tabs === item.value,
    isSecondary: readmore_style_tabs !== item.value,
    onClick: () => setAttributes({
      readmore_style_tabs: item.value
    })
  }, item.label))), readmore_style_tabs === 'normal' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Text Color', 'the-post-grid'),
    color: readmore_text_color,
    onChange: readmore_text_color => setAttributes({
      readmore_text_color
    })
  }), show_btn_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Icon Color', 'the-post-grid'),
    color: readmore_icon_color,
    onChange: readmore_icon_color => setAttributes({
      readmore_icon_color
    })
  }), readmore_btn_style === 'default-style' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Background Color', 'the-post-grid'),
    color: readmore_bg,
    onChange: readmore_bg => setAttributes({
      readmore_bg
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Border Radius", "the-post-grid"),
    type: "borderRadius",
    responsive: true,
    value: border_radius,
    onChange: value => {
      setAttributes({
        border_radius: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBorderControl, {
    value: readmore_border,
    label: __("Button Border", "the-post-grid"),
    onChange: val => setAttributes({
      readmore_border: val
    }),
    withSlider: true
  })), show_btn_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Icon Spacing", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: readmore_icon_margin,
    onChange: value => {
      setAttributes({
        readmore_icon_margin: value
      });
    }
  })), readmore_style_tabs === 'hover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Text Color hover', 'the-post-grid'),
    color: readmore_text_color_hover,
    onChange: readmore_text_color_hover => setAttributes({
      readmore_text_color_hover
    })
  }), show_btn_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Icon Color - Hover', 'the-post-grid'),
    color: readmore_icon_color_hover,
    onChange: readmore_icon_color_hover => setAttributes({
      readmore_icon_color_hover
    })
  }), readmore_btn_style === 'default-style' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Background Color - Hover', 'the-post-grid'),
    color: readmore_bg_hover,
    onChange: readmore_bg_hover => setAttributes({
      readmore_bg_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Border Radius - Hover", "the-post-grid"),
    type: "borderRadius",
    responsive: true,
    value: border_radius_hover,
    onChange: value => {
      setAttributes({
        border_radius_hover: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBorderControl, {
    value: readmore_border_hover,
    label: __("Button Border - Hover", "the-post-grid"),
    onChange: val => setAttributes({
      readmore_border_hover: val
    }),
    withSlider: true
  })), show_btn_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Icon Spacing - Hover", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: readmore_icon_margin_hover,
    onChange: value => {
      setAttributes({
        readmore_icon_margin_hover: value
      });
    }
  })), readmore_style_tabs === 'box_hover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Text Color - BoxHover', 'the-post-grid'),
    color: readmore_text_color_box_hover,
    onChange: readmore_text_color_box_hover => setAttributes({
      readmore_text_color_box_hover
    })
  }), show_btn_icon === 'yes' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Icon Color - BoxHover', 'the-post-grid'),
    color: readmore_icon_color_box_hover,
    onChange: readmore_icon_color_box_hover => setAttributes({
      readmore_icon_color_box_hover
    })
  }), readmore_btn_style === 'default-style' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Background Color - BoxHover', 'the-post-grid'),
    color: readmore_bg_box_hover,
    onChange: readmore_bg_box_hover => setAttributes({
      readmore_bg_box_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBorderControl, {
    value: readmore_border_box_hover,
    label: __("Button Border - BoxHover", "the-post-grid"),
    onChange: val => setAttributes({
      readmore_border_box_hover: val
    }),
    withSlider: true
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReadMoreStyle);

/***/ }),

/***/ "./src/blocks/controller/SectionTitleSettings.js":
/*!*******************************************************!*\
  !*** ./src/blocks/controller/SectionTitleSettings.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flatpickr_dist_themes_light_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr/dist/themes/light.css */ "./node_modules/flatpickr/dist/themes/light.css");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;




function SectionTitleSettings(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    section_title_style,
    section_title_source,
    section_title_text,
    section_title_tag
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: __('Section Title', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: __('Title Style', 'the-post-grid'),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: section_title_style,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_3__.SECTION_TITLE_STYLE,
    onChange: section_title_style => setAttributes({
      section_title_style
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: __('Title Source', 'the-post-grid'),
    className: "rttpg-control-field label-inline rttpg-expand",
    value: section_title_source,
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_3__.SECTION_TITLE_SOURCE,
    onChange: section_title_source => setAttributes({
      section_title_source
    })
  }), 'custom_title' === section_title_source && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    autocomplete: "off",
    help: "Help text to explain the input.",
    label: "Enter Title",
    value: section_title_text,
    onChange: section_title_text => setAttributes({
      section_title_text
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: __('Title Tags', 'the-post-grid'),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_3__.HEADING,
    value: section_title_tag,
    onChange: section_title_tag => setAttributes({
      section_title_tag
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionTitleSettings);

/***/ }),

/***/ "./src/blocks/controller/SectionTitleStyle.js":
/*!****************************************************!*\
  !*** ./src/blocks/controller/SectionTitleStyle.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Typography */ "./src/components/Typography.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_Alignment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Alignment */ "./src/components/Alignment.js");

const {
  __
} = wp.i18n;






function SectionTitleStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    show_section_title,
    filter_btn_style,
    section_title_alignment,
    section_title_margin,
    section_title_typography,
    section_title_color,
    section_title_bg_color,
    section_title_dot_color,
    section_title_style,
    section_title_line_color
  } = attributes;

  if (show_section_title !== 'show') {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Section Title', 'the-post-grid'),
    initialOpen: true
  }, filter_btn_style !== 'carousel' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Alignment__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Alignment", "the-post-grid"),
    options: ['left', 'center', 'right'],
    value: section_title_alignment,
    onChange: section_title_alignment => setAttributes({
      section_title_alignment
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Margin", "the-post-grid"),
    isLinked: false,
    type: "margin",
    responsive: true,
    value: section_title_margin,
    onChange: value => {
      setAttributes({
        section_title_margin: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: __('Typography', 'the-post-grid'),
    value: section_title_typography,
    onChange: val => setAttributes({
      section_title_typography: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Title Color', 'the-post-grid'),
    color: section_title_color,
    onChange: section_title_color => setAttributes({
      section_title_color
    })
  }), ['style2', 'style3'].includes(section_title_style) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Title Background Color', 'the-post-grid'),
    color: section_title_bg_color,
    onChange: section_title_bg_color => setAttributes({
      section_title_bg_color
    })
  }), section_title_style === 'style1' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Dot Color', 'the-post-grid'),
    color: section_title_dot_color,
    onChange: section_title_dot_color => setAttributes({
      section_title_dot_color
    })
  }), section_title_style !== 'default' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Line / Border Color', 'the-post-grid'),
    color: section_title_line_color,
    onChange: section_title_line_color => setAttributes({
      section_title_line_color
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionTitleStyle);

/***/ }),

/***/ "./src/blocks/controller/SocialShareStyle.js":
/*!***************************************************!*\
  !*** ./src/blocks/controller/SocialShareStyle.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_RangeDevice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/RangeDevice */ "./src/components/RangeDevice.js");

const {
  __
} = wp.i18n;







function SocialShareStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    prefix,
    show_social_share,
    social_icon_style,
    social_icon_margin,
    social_wrapper_margin,
    social_icon_radius,
    icon_font_size,
    main_wrapper_hover_tab,
    social_icon_color,
    social_icon_bg_color,
    social_icon_border,
    social_icon_color_hover,
    social_icon_bg_color_hover,
    social_icon_border_hover
  } = attributes;
  let postLayout = prefix + "_layout";

  if (!(show_social_share === 'show' && attributes[postLayout] !== 'grid-layout7')) {
    return '';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Social Share', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Icon Color Style", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default (Brand Color)', 'the-post-grid')
    }, {
      value: '1different_color',
      label: __('Different Color for each', 'the-post-grid')
    }, {
      value: 'custom',
      label: __('Custom color', 'the-post-grid')
    }],
    help: __("Select Custom for your own customize", "the-post-grid"),
    value: social_icon_style,
    onChange: social_icon_style => setAttributes({
      social_icon_style
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Icon Margin", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: social_icon_margin,
    onChange: value => {
      setAttributes({
        social_icon_margin: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Icon Wrapper Spacing", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: social_wrapper_margin,
    onChange: value => {
      setAttributes({
        social_wrapper_margin: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __("Border Radius", "the-post-grid"),
    type: "borderRadius",
    responsive: true,
    value: social_icon_radius,
    onChange: value => {
      setAttributes({
        social_icon_radius: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_RangeDevice__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __('Accordion Item Gap'),
    responsive: true,
    value: icon_font_size,
    min: 0,
    max: 100,
    step: 1,
    onChange: val => setAttributes({
      icon_font_size: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.NORMAL_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: main_wrapper_hover_tab === item.value,
    isSecondary: main_wrapper_hover_tab !== item.value,
    onClick: () => setAttributes({
      main_wrapper_hover_tab: item.value
    })
  }, item.label))), main_wrapper_hover_tab === 'normal' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, social_icon_style === 'custom' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Icon color', 'the-post-grid'),
    color: social_icon_color,
    onChange: social_icon_color => setAttributes({
      social_icon_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Icon Background', 'the-post-grid'),
    color: social_icon_bg_color,
    onChange: social_icon_bg_color => setAttributes({
      social_icon_bg_color
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBorderControl, {
    value: social_icon_border,
    label: __("Icon Border", "the-post-grid"),
    onChange: val => setAttributes({
      social_icon_border: val
    }),
    withSlider: true
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, social_icon_style === 'custom' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Title Color - Hover', 'the-post-grid'),
    color: social_icon_color_hover,
    onChange: social_icon_color_hover => setAttributes({
      social_icon_color_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Title Background - Hover', 'the-post-grid'),
    color: social_icon_bg_color_hover,
    onChange: social_icon_bg_color_hover => setAttributes({
      social_icon_bg_color_hover
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBorderControl, {
    value: social_icon_border_hover,
    label: __("Icon Border - Hover", "the-post-grid"),
    onChange: val => setAttributes({
      social_icon_border_hover: val
    }),
    withSlider: true
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialShareStyle);

/***/ }),

/***/ "./src/blocks/controller/TitleSettings.js":
/*!************************************************!*\
  !*** ./src/blocks/controller/TitleSettings.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;



function TitleSettings(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    title_tag,
    title_visibility_style,
    title_limit,
    title_limit_type,
    title_position,
    title_hover_underline
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Post Title', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __('Title Tags', 'the-post-grid'),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.HEADING,
    value: title_tag,
    onChange: title_tag => setAttributes({
      title_tag
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Title Visibility Style", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.TITLE_VISIBILITY_STYLE,
    value: title_visibility_style,
    onChange: title_visibility_style => setAttributes({
      title_visibility_style
    })
  }), title_visibility_style === 'custom' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    label: __("Title Length", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    max: 100,
    min: 0,
    placeholder: "0",
    shiftStep: 5,
    step: "1",
    value: title_limit,
    onChange: title_limit => setAttributes({
      title_limit
    })
  }), title_limit > 0 && title_visibility_style === 'custom' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Title Crop by", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'word',
      label: __('Words', 'the-post-grid')
    }, {
      value: 'character',
      label: __('Characters', 'the-post-grid')
    }],
    value: title_limit_type,
    onChange: title_limit_type => setAttributes({
      title_limit_type
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Title Position", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: _components_Constants__WEBPACK_IMPORTED_MODULE_2__.TITLE_POSITION,
    value: title_position,
    onChange: title_position => setAttributes({
      title_position
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Title Hover Underline", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'enable',
      label: __('Enable', 'the-post-grid')
    }, {
      value: 'disable',
      label: __('Disable', 'the-post-grid')
    }],
    value: title_hover_underline,
    onChange: title_hover_underline => setAttributes({
      title_hover_underline
    })
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TitleSettings);

/***/ }),

/***/ "./src/blocks/controller/TitleStyle.js":
/*!*********************************************!*\
  !*** ./src/blocks/controller/TitleStyle.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Constants */ "./src/components/Constants.js");
/* harmony import */ var _components_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Typography */ "./src/components/Typography.js");
/* harmony import */ var _components_Color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Color */ "./src/components/Color.js");
/* harmony import */ var _components_Dimension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Dimension */ "./src/components/Dimension.js");
/* harmony import */ var _components_Alignment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Alignment */ "./src/components/Alignment.js");

const {
  __
} = wp.i18n;







function TitleStyle(props) {
  const {
    attributes,
    setAttributes
  } = props.data; //All attribute

  const {
    prefix,
    title_spacing,
    title_padding,
    title_typography,
    title_offset_typography,
    title_border_visibility,
    title_alignment,
    title_box_hover_tab,
    title_color,
    title_bg_color,
    title_border_color,
    title_hover_border_color,
    title_hover_color,
    title_bg_color_hover,
    title_color_box_hover,
    title_bg_color_box_hover,
    title_border_color_hover
  } = attributes;
  let postLayout = prefix + "_layout";
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: __('Post Title', 'the-post-grid'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Title Margin", "the-post-grid"),
    type: "margin",
    responsive: true,
    value: title_spacing,
    onChange: value => {
      setAttributes({
        title_spacing: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dimension__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: __("Title Padding", "the-post-grid"),
    type: "padding",
    responsive: true,
    value: title_padding // isLinked={ true }
    ,
    onChange: value => {
      setAttributes({
        title_padding: value
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Typography'),
    value: title_typography,
    onChange: val => setAttributes({
      title_typography: val
    })
  }), ['grid-layout5', 'grid-layout5-2', 'grid-layout6', 'grid-layout6-2'].includes(attributes[postLayout]) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Typography__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Offset Typography'),
    value: title_offset_typography,
    onChange: val => setAttributes({
      title_offset_typography: val
    })
  }), attributes[postLayout] === 'grid_hover-layout3' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: __("Title Border Bottom", "the-post-grid"),
    className: "rttpg-control-field label-inline rttpg-expand",
    options: [{
      value: 'default',
      label: __('Default', 'the-post-grid')
    }, {
      value: 'show',
      label: __('Show', 'the-post-grid')
    }, {
      value: 'hide',
      label: __('Hide', 'the-post-grid')
    }],
    value: title_border_visibility,
    onChange: title_border_visibility => setAttributes({
      title_border_visibility
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Alignment__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __("Alignment", "the-post-grid"),
    options: ['left', 'center', 'right'],
    value: title_alignment,
    onChange: title_alignment => setAttributes({
      title_alignment
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "rttpg-btn-group rttpg-btn-group-state"
  }, _components_Constants__WEBPACK_IMPORTED_MODULE_2__.BOX_HOVER.map((item, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    key: key,
    isPrimary: title_box_hover_tab === item.value,
    isSecondary: title_box_hover_tab !== item.value,
    onClick: () => setAttributes({
      title_box_hover_tab: item.value
    })
  }, item.label))), title_box_hover_tab === 'normal' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Color', 'the-post-grid'),
    color: title_color,
    onChange: title_color => setAttributes({
      title_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Background', 'the-post-grid'),
    color: title_bg_color,
    onChange: title_bg_color => setAttributes({
      title_bg_color
    })
  }), title_border_visibility !== 'hide' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Separator Color', 'the-post-grid'),
    color: title_border_color,
    onChange: title_border_color => setAttributes({
      title_border_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Hover Border Color', 'the-post-grid'),
    color: title_hover_border_color,
    onChange: title_hover_border_color => setAttributes({
      title_hover_border_color
    })
  })), title_box_hover_tab === 'hover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Color on Hover', 'the-post-grid'),
    color: title_hover_color,
    onChange: title_hover_color => setAttributes({
      title_hover_color
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Background on hover', 'the-post-grid'),
    color: title_bg_color_hover,
    onChange: title_bg_color_hover => setAttributes({
      title_bg_color_hover
    })
  })), title_box_hover_tab === 'box_hover' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title color on boxhover', 'the-post-grid'),
    color: title_color_box_hover,
    onChange: title_color_box_hover => setAttributes({
      title_color_box_hover
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Background on boxhover', 'the-post-grid'),
    color: title_bg_color_box_hover,
    onChange: title_bg_color_box_hover => setAttributes({
      title_bg_color_box_hover
    })
  }), title_border_visibility !== 'hide' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Color__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: __('Title Separator color - boxhover', 'the-post-grid'),
    color: title_border_color_hover,
    onChange: title_border_color_hover => setAttributes({
      title_border_color_hover
    })
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TitleStyle);

/***/ }),

/***/ "./src/blocks/grid-layout/edit.js":
/*!****************************************!*\
  !*** ./src/blocks/grid-layout/edit.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_css_CssGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/css/CssGenerator */ "./src/utils/css/CssGenerator.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _inspector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inspector */ "./src/blocks/grid-layout/inspector.js");
/* harmony import */ var _layouts_GridLayouts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layouts/GridLayouts */ "./src/blocks/grid-layout/layouts/GridLayouts.js");

const {
  useEffect,
  useState
} = wp.element;





const Edit = props => {
  const {
    isSelected,
    attributes,
    setAttributes
  } = props; //all attribute

  const {
    prefix,
    uniqueId,
    post_type,
    post_id,
    exclude,
    post_limit,
    offset,
    author,
    post_keyword,
    relation,
    orderby,
    order,
    display_per_page,
    layout_style,
    ignore_sticky_posts,
    no_posts_found_text,
    show_taxonomy_filter,
    show_pagination,
    media_source,
    image_size,
    image_offset_size,
    default_image,
    category_position,
    category_source,
    tag_source,
    taxonomy_lists,
    start_date,
    end_date,
    hover_animation,
    excerpt_type,
    excerpt_limit,
    excerpt_more_text,
    page,
    query_change,
    acf_data_lists,
    show_acf,
    cf_hide_empty_value,
    cf_show_only_value,
    cf_hide_group_title
  } = attributes;
  const [posts, setPosts] = useState([]);
  const [queryEffect, setQueryEffect] = useState(false);
  const [acfData, setAcfData] = useState([]);
  const [imageSizes, setImageSizes] = useState([]);

  const handleQueryChange = () => {
    setQueryEffect(!queryEffect);
    setAttributes({
      query_change: true,
      page: 1
    });
  };

  const fetch_all_posts = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/rttpg/v1/query',
      method: 'POST',
      data: {
        prefix,
        post_type,
        post_id,
        exclude,
        post_limit,
        offset,
        show_pagination,
        ignore_sticky_posts,
        orderby,
        order,
        display_per_page,
        layout_style,
        author,
        start_date,
        end_date,
        media_source,
        image_size,
        image_offset_size,
        show_taxonomy_filter,
        relation,
        post_keyword,
        no_posts_found_text,
        default_image,
        category_position,
        taxonomy_lists,
        category_source,
        tag_source,
        hover_animation,
        excerpt_type,
        excerpt_limit,
        excerpt_more_text,
        page,
        acf_data_lists,
        show_acf,
        cf_hide_empty_value,
        cf_show_only_value,
        cf_hide_group_title
      }
    }).then(data => {
      setAttributes({
        query_change: false
      });
      setPosts(data);
      console.log(data);
    });
  };

  const fetch_all_acf_data = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/rttpg/v1/acf"
    }).then(acfData => {
      let acfArr = [];
      Object.keys(acfData).map(key => {
        acfArr.push(acfData[key]);
      });
      setAcfData(acfArr);
    });
  };

  const fetch_all_image_size = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/rttpg/v1/image-size"
    }).then(imageSizes => {
      setImageSizes(imageSizes);
    });
  };

  useEffect(() => {
    fetch_all_posts();
    fetch_all_acf_data();
  }, [queryEffect, page]);
  useEffect(() => {
    fetch_all_image_size();
  }, []);

  if (uniqueId) {
    (0,_utils_css_CssGenerator__WEBPACK_IMPORTED_MODULE_1__.CssGenerator)(attributes, 'tpg-grid-layout', uniqueId);
  } //render


  return [isSelected && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inspector__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    changeQuery: handleQueryChange,
    acfData: acfData,
    imageSizes: imageSizes
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_layouts_GridLayouts__WEBPACK_IMPORTED_MODULE_4__["default"], {
    props: props,
    postData: posts
  })];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/grid-layout/index.js":
/*!*****************************************!*\
  !*** ./src/blocks/grid-layout/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/grid-layout/edit.js");



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("rttpg/tpg-grid-layout", {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("TPG - Grid Layout", "the-post-grid"),
  category: "rttpg",
  description: "The post grid block, Grid layout",
  supports: {
    align: ['center', 'wide', 'full']
  },
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The Post Grid", "the-post-grid"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Post Grid", "the-post-grid"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("post-grid", "the-post-grid"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Grid Layout", "the-post-grid"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("grid layout", "the-post-grid"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("grid-layout", "the-post-grid")],
  save: () => null,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/blocks/grid-layout/inspector.js":
/*!*********************************************!*\
  !*** ./src/blocks/grid-layout/inspector.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controller_LayoutController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/LayoutController */ "./src/blocks/controller/LayoutController.js");
/* harmony import */ var _controller_QueryController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller/QueryController */ "./src/blocks/controller/QueryController.js");
/* harmony import */ var _controller_PaginationController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controller/PaginationController */ "./src/blocks/controller/PaginationController.js");
/* harmony import */ var _controller_LinksController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controller/LinksController */ "./src/blocks/controller/LinksController.js");
/* harmony import */ var _controller_FrontEndFilterController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controller/FrontEndFilterController */ "./src/blocks/controller/FrontEndFilterController.js");
/* harmony import */ var _controller_FieldSelectionSettings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controller/FieldSelectionSettings */ "./src/blocks/controller/FieldSelectionSettings.js");
/* harmony import */ var _controller_SectionTitleSettings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../controller/SectionTitleSettings */ "./src/blocks/controller/SectionTitleSettings.js");
/* harmony import */ var _controller_TitleSettings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../controller/TitleSettings */ "./src/blocks/controller/TitleSettings.js");
/* harmony import */ var _controller_ExcerptSettings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../controller/ExcerptSettings */ "./src/blocks/controller/ExcerptSettings.js");
/* harmony import */ var _controller_PostThumbnailSettings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../controller/PostThumbnailSettings */ "./src/blocks/controller/PostThumbnailSettings.js");
/* harmony import */ var _controller_MetaSettings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../controller/MetaSettings */ "./src/blocks/controller/MetaSettings.js");
/* harmony import */ var _controller_ACFSettings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../controller/ACFSettings */ "./src/blocks/controller/ACFSettings.js");
/* harmony import */ var _controller_ReadMoreSettings__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../controller/ReadMoreSettings */ "./src/blocks/controller/ReadMoreSettings.js");
/* harmony import */ var _controller_SectionTitleStyle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../controller/SectionTitleStyle */ "./src/blocks/controller/SectionTitleStyle.js");
/* harmony import */ var _controller_TitleStyle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../controller/TitleStyle */ "./src/blocks/controller/TitleStyle.js");
/* harmony import */ var _controller_PostThumbnailStyle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../controller/PostThumbnailStyle */ "./src/blocks/controller/PostThumbnailStyle.js");
/* harmony import */ var _controller_ExcerptStyle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../controller/ExcerptStyle */ "./src/blocks/controller/ExcerptStyle.js");
/* harmony import */ var _controller_MetaStyle__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../controller/MetaStyle */ "./src/blocks/controller/MetaStyle.js");
/* harmony import */ var _controller_SocialShareStyle__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../controller/SocialShareStyle */ "./src/blocks/controller/SocialShareStyle.js");
/* harmony import */ var _controller_ACFStyle__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../controller/ACFStyle */ "./src/blocks/controller/ACFStyle.js");
/* harmony import */ var _controller_ReadMoreStyle__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../controller/ReadMoreStyle */ "./src/blocks/controller/ReadMoreStyle.js");
/* harmony import */ var _controller_FrontEndFilterStyle__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../controller/FrontEndFilterStyle */ "./src/blocks/controller/FrontEndFilterStyle.js");
/* harmony import */ var _controller_CardStyle__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../controller/CardStyle */ "./src/blocks/controller/CardStyle.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_25__);


const {
  InspectorControls
} = wp.blockEditor;


























function Inspector(props) {
  const {
    attributes,
    setAttributes,
    changeQuery,
    acfData,
    imageSizes
  } = props; //All attribute

  const {
    prefix,
    taxonomy_lists,
    ignore_sticky_posts,
    acf_data_lists
  } = attributes;
  let postLayout = prefix + "_layout"; //Change Layout handle

  const changeLayout = selected => {
    setAttributes(attributes[postLayout] = selected);
    changeQuery();
  }; //Change Taxonomy handle


  const changeTaxonomy = (terms, tax) => {
    let oldTaxonomies = { ...taxonomy_lists,
      [tax]: {
        'name': tax,
        'options': terms
      }
    };
    setAttributes({
      taxonomy_lists: oldTaxonomies
    });
    changeQuery();
  }; //Change Taxonomy handle


  const changeAcfData = (value, key) => {
    let OldAcf = { ...acf_data_lists,
      [key]: {
        'name': key,
        'options': value
      }
    };
    setAttributes({
      acf_data_lists: OldAcf
    });
    changeQuery();
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, {
    key: "controls"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-panel-control-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    className: "rttpg-tab-panel",
    activeClass: "active-tab",
    tabs: [{
      name: "content",
      title: "Content",
      className: "rttpg-tab-btn content"
    }, {
      name: "settings",
      title: "Settings",
      className: "rttpg-tab-btn settings"
    }, {
      name: "styles",
      title: "Styles",
      className: "rttpg-tab-btn styles"
    }]
  }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-tab-content"
  }, tab.name === "content" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_LayoutController__WEBPACK_IMPORTED_MODULE_2__["default"], {
    data: props,
    changeLayout: changeLayout
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_QueryController__WEBPACK_IMPORTED_MODULE_3__["default"], {
    data: props,
    changeTaxonomy: changeTaxonomy
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_FrontEndFilterController__WEBPACK_IMPORTED_MODULE_6__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_PaginationController__WEBPACK_IMPORTED_MODULE_4__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_LinksController__WEBPACK_IMPORTED_MODULE_5__["default"], {
    data: props
  })), tab.name === "settings" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_FieldSelectionSettings__WEBPACK_IMPORTED_MODULE_7__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_SectionTitleSettings__WEBPACK_IMPORTED_MODULE_8__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_TitleSettings__WEBPACK_IMPORTED_MODULE_9__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_PostThumbnailSettings__WEBPACK_IMPORTED_MODULE_11__["default"], {
    data: props,
    imageSizes: imageSizes
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_ExcerptSettings__WEBPACK_IMPORTED_MODULE_10__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_MetaSettings__WEBPACK_IMPORTED_MODULE_12__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_ACFSettings__WEBPACK_IMPORTED_MODULE_13__["default"], {
    data: props,
    changeAcfData: changeAcfData,
    acfData: acfData
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_ReadMoreSettings__WEBPACK_IMPORTED_MODULE_14__["default"], {
    data: props
  })), tab.name === "styles" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_SectionTitleStyle__WEBPACK_IMPORTED_MODULE_15__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_TitleStyle__WEBPACK_IMPORTED_MODULE_16__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_PostThumbnailStyle__WEBPACK_IMPORTED_MODULE_17__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_ExcerptStyle__WEBPACK_IMPORTED_MODULE_18__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_MetaStyle__WEBPACK_IMPORTED_MODULE_19__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_SocialShareStyle__WEBPACK_IMPORTED_MODULE_20__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_ACFStyle__WEBPACK_IMPORTED_MODULE_21__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_ReadMoreStyle__WEBPACK_IMPORTED_MODULE_22__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_FrontEndFilterStyle__WEBPACK_IMPORTED_MODULE_23__["default"], {
    data: props
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controller_CardStyle__WEBPACK_IMPORTED_MODULE_24__["default"], {
    data: props
  }))))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inspector);

/***/ }),

/***/ "./src/blocks/grid-layout/layouts/GridLayouts.js":
/*!*******************************************************!*\
  !*** ./src/blocks/grid-layout/layouts/GridLayouts.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/functions */ "./src/blocks/common/functions.js");
/* harmony import */ var _grid_template_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid-template/Layout */ "./src/blocks/grid-layout/layouts/grid-template/Layout.js");
/* harmony import */ var _common_SectionTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/SectionTitle */ "./src/blocks/common/SectionTitle.js");
/* harmony import */ var _common_Pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/Pagination */ "./src/blocks/common/Pagination.js");

const {
  Spinner
} = wp.components;
const {
  useEffect
} = wp.element;





function GridLayouts(_ref) {
  let {
    props,
    postData
  } = _ref;
  const {
    attributes,
    setAttributes,
    clientId,
    className
  } = props;
  const {
    uniqueId,
    grid_layout,
    filter_btn_style,
    filter_type,
    grid_layout_style,
    display_per_page,
    page,
    query_change,
    show_pagination,
    pagination_type,
    load_more_button_text
  } = attributes;
  const posts = postData.posts;
  const totalPages = Math.ceil(postData.total_post / display_per_page);
  let dynamicParentClass = (0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.get_parent_class_list)({
    attributes,
    className
  });
  const newClintID = clientId.substr(0, 6);
  useEffect(() => {
    if (!uniqueId) {
      setAttributes({
        uniqueId: newClintID
      });
    } else if (uniqueId && uniqueId !== newClintID) {
      setAttributes({
        uniqueId: newClintID
      });
    }
  }, []);
  let is_carousel = '';

  if (rttpgParams.hasPro && 'carousel' === filter_btn_style && 'button' === filter_type) {
    is_carousel = 'carousel';
  } // Wrapper Class


  let innerWrapperClass = grid_layout.replace(/-2/g, "");
  innerWrapperClass += ' grid-behaviour';
  innerWrapperClass += ' ' + grid_layout_style;
  innerWrapperClass += ' grid_layout_wrapper';
  let checkLayout = ['grid-layout1', 'grid-layout3', 'grid-layout4'];

  if ('masonry' === grid_layout_style && checkLayout.includes(grid_layout)) {
    innerWrapperClass += ' tpg-full-height';
  }

  if (query_change) {
    innerWrapperClass += ' tpg-editor-loading';
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `rttpg-block-postgrid rttpg-block-${uniqueId + ' ' + dynamicParentClass}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-container-fluid rt-tpg-container tpg-el-main-wrapper clearfix"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpg-header-wrapper ${is_carousel}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_SectionTitle__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `rt-row rt-content-loader ${innerWrapperClass}`
  }, posts && posts.length ? posts.map(post => {
    if (post) {
      if (post.message) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "message"
        }, post.message);
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_grid_template_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
        attributes: attributes,
        post: post
      });
    } else return null;
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-postgrid-is-loading"
  }, postData !== null && postData !== void 0 && postData.message && postData.message ? postData.message : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Pagination__WEBPACK_IMPORTED_MODULE_4__["default"], {
    props: props,
    totalPages: totalPages
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridLayouts);

/***/ }),

/***/ "./src/blocks/grid-layout/layouts/grid-template/GridLayout1.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/grid-layout/layouts/grid-template/GridLayout1.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/Thumbnail */ "./src/blocks/common/Thumbnail.js");
/* harmony import */ var _common_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Heading */ "./src/blocks/common/Heading.js");
/* harmony import */ var _common_MetaData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/MetaData */ "./src/blocks/common/MetaData.js");
/* harmony import */ var _common_SocialShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/SocialShare */ "./src/blocks/common/SocialShare.js");
/* harmony import */ var _common_ReadMore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/ReadMore */ "./src/blocks/common/ReadMore.js");
/* harmony import */ var _common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/PostExcerpt */ "./src/blocks/common/PostExcerpt.js");








function GridLayout1(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    grid_column,
    hover_animation,
    layout_style,
    show_thumb,
    show_title,
    show_meta,
    show_excerpt,
    show_acf,
    show_social_share,
    show_read_more
  } = attributes;
  let new_grid_column = { ...grid_column
  };
  Object.keys(new_grid_column).map(function (key) {
    if (new_grid_column[key] == '1') {
      new_grid_column[key] = '12';
    } else if (new_grid_column[key] == '2') {
      new_grid_column[key] = '6';
    } else if (new_grid_column[key] == '3') {
      new_grid_column[key] = '4';
    } else if (new_grid_column[key] == '4') {
      new_grid_column[key] = '3';
    } else if (new_grid_column[key] == '5') {
      new_grid_column[key] = '24';
    } else if (new_grid_column[key] == '6') {
      new_grid_column[key] = '2';
    }
  });
  let grid_column_desktop = new_grid_column.lg != '0' ? new_grid_column.lg : '4';
  let grid_column_tab = new_grid_column.md != '0' ? new_grid_column.md : '6';
  let grid_column_mobile = new_grid_column.sm != '0' ? new_grid_column.sm : '12';
  let gridColumn = "rt-col-md-" + grid_column_desktop + " rt-col-sm-" + grid_column_tab + " rt-col-xs-" + grid_column_mobile;
  let colClasses = " rt-grid-item";
  colClasses += " " + hover_animation;

  if (layout_style === 'masonry') {
    colClasses += " masonry-grid-item";
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: post.post_class + ' ' + gridColumn + ' ' + colClasses,
    "data-id": post.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-holder tpg-post-holder"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-detail rt-el-content-wrapper"
  }, show_thumb === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    post: post
  }), show_title === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes: attributes,
    post: post
  }), show_meta === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_MetaData__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    post: post
  }), (show_excerpt === 'show' || show_acf === 'show') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    post: post
  }), rttpgParams.hasPro && show_social_share === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_SocialShare__WEBPACK_IMPORTED_MODULE_4__["default"], null), show_read_more === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_ReadMore__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridLayout1);

/***/ }),

/***/ "./src/blocks/grid-layout/layouts/grid-template/GridLayout2.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/grid-layout/layouts/grid-template/GridLayout2.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/Thumbnail */ "./src/blocks/common/Thumbnail.js");
/* harmony import */ var _common_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Heading */ "./src/blocks/common/Heading.js");
/* harmony import */ var _common_MetaData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/MetaData */ "./src/blocks/common/MetaData.js");
/* harmony import */ var _common_SocialShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/SocialShare */ "./src/blocks/common/SocialShare.js");
/* harmony import */ var _common_ReadMore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/ReadMore */ "./src/blocks/common/ReadMore.js");
/* harmony import */ var _common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/PostExcerpt */ "./src/blocks/common/PostExcerpt.js");








function GridLayout2(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    grid_column,
    hover_animation,
    layout_style,
    show_thumb,
    show_title,
    show_meta,
    show_excerpt,
    show_acf,
    show_social_share,
    show_read_more
  } = attributes;
  let new_grid_column = { ...grid_column
  };
  Object.keys(new_grid_column).map(function (key) {
    if (new_grid_column[key] == '1') {
      new_grid_column[key] = '12';
    } else if (new_grid_column[key] == '2') {
      new_grid_column[key] = '6';
    } else if (new_grid_column[key] == '3') {
      new_grid_column[key] = '4';
    } else if (new_grid_column[key] == '4') {
      new_grid_column[key] = '3';
    } else if (new_grid_column[key] == '5') {
      new_grid_column[key] = '24';
    } else if (new_grid_column[key] == '6') {
      new_grid_column[key] = '2';
    }
  });
  let grid_column_desktop = new_grid_column.lg != '0' ? new_grid_column.lg : '4';
  let grid_column_tab = new_grid_column.md != '0' ? new_grid_column.md : '6';
  let grid_column_mobile = new_grid_column.sm != '0' ? new_grid_column.sm : '12';
  let gridColumn = "rt-col-md-" + grid_column_desktop + " rt-col-sm-" + grid_column_tab + " rt-col-xs-" + grid_column_mobile;
  let colClasses = " rt-grid-item";
  colClasses += " " + hover_animation;

  if (layout_style === 'masonry') {
    colClasses += " masonry-grid-item";
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: post.post_class + ' ' + gridColumn + ' ' + colClasses,
    "data-id": post.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-holder tpg-post-holder"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-detail rt-el-content-wrapper"
  }, show_thumb === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    post: post
  }), show_title === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes: attributes,
    post: post
  }), show_meta === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_MetaData__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    post: post
  }), (show_excerpt === 'show' || show_acf === 'show') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    post: post
  }), rttpgParams.hasPro && show_social_share === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_SocialShare__WEBPACK_IMPORTED_MODULE_4__["default"], null), show_read_more === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_ReadMore__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridLayout2);

/***/ }),

/***/ "./src/blocks/grid-layout/layouts/grid-template/GridLayout3.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/grid-layout/layouts/grid-template/GridLayout3.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/Thumbnail */ "./src/blocks/common/Thumbnail.js");
/* harmony import */ var _common_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Heading */ "./src/blocks/common/Heading.js");
/* harmony import */ var _common_MetaData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/MetaData */ "./src/blocks/common/MetaData.js");
/* harmony import */ var _common_SocialShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/SocialShare */ "./src/blocks/common/SocialShare.js");
/* harmony import */ var _common_ReadMore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/ReadMore */ "./src/blocks/common/ReadMore.js");
/* harmony import */ var _common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/PostExcerpt */ "./src/blocks/common/PostExcerpt.js");








function GridLayout3(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    grid_column,
    hover_animation,
    layout_style,
    show_thumb,
    show_title,
    show_meta,
    show_excerpt,
    show_acf,
    show_social_share,
    show_read_more
  } = attributes;
  let new_grid_column = { ...grid_column
  };
  Object.keys(new_grid_column).map(function (key) {
    if (new_grid_column[key] == '1') {
      new_grid_column[key] = '12';
    } else if (new_grid_column[key] == '2') {
      new_grid_column[key] = '6';
    } else if (new_grid_column[key] == '3') {
      new_grid_column[key] = '4';
    } else if (new_grid_column[key] == '4') {
      new_grid_column[key] = '3';
    } else if (new_grid_column[key] == '5') {
      new_grid_column[key] = '24';
    } else if (new_grid_column[key] == '6') {
      new_grid_column[key] = '2';
    }
  });
  let grid_column_desktop = new_grid_column.lg != '0' ? new_grid_column.lg : '4';
  let grid_column_tab = new_grid_column.md != '0' ? new_grid_column.md : '6';
  let grid_column_mobile = new_grid_column.sm != '0' ? new_grid_column.sm : '12';
  let gridColumn = "rt-col-md-" + grid_column_desktop + " rt-col-sm-" + grid_column_tab + " rt-col-xs-" + grid_column_mobile;
  let colClasses = " rt-grid-item";
  colClasses += " " + hover_animation;

  if (layout_style === 'masonry') {
    colClasses += " masonry-grid-item";
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: post.post_class + ' ' + gridColumn + ' ' + colClasses,
    "data-id": post.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-holder tpg-post-holder"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-detail rt-el-content-wrapper"
  }, show_thumb === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    post: post
  }), show_title === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes: attributes,
    post: post
  }), show_meta === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_MetaData__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    post: post
  }), (show_excerpt === 'show' || show_acf === 'show') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    post: post
  }), rttpgParams.hasPro && show_social_share === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_SocialShare__WEBPACK_IMPORTED_MODULE_4__["default"], null), show_read_more === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_ReadMore__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridLayout3);

/***/ }),

/***/ "./src/blocks/grid-layout/layouts/grid-template/GridLayout4.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/grid-layout/layouts/grid-template/GridLayout4.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/Thumbnail */ "./src/blocks/common/Thumbnail.js");
/* harmony import */ var _common_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Heading */ "./src/blocks/common/Heading.js");
/* harmony import */ var _common_MetaData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/MetaData */ "./src/blocks/common/MetaData.js");
/* harmony import */ var _common_SocialShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/SocialShare */ "./src/blocks/common/SocialShare.js");
/* harmony import */ var _common_ReadMore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/ReadMore */ "./src/blocks/common/ReadMore.js");
/* harmony import */ var _common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/PostExcerpt */ "./src/blocks/common/PostExcerpt.js");








function GridLayout4(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    grid_column,
    hover_animation,
    show_thumb,
    show_title,
    show_meta,
    show_excerpt,
    show_acf,
    show_social_share,
    show_read_more
  } = attributes;
  let new_grid_column = { ...grid_column
  };
  Object.keys(new_grid_column).map(function (key) {
    if (new_grid_column[key] == '1') {
      new_grid_column[key] = '12';
    } else if (new_grid_column[key] == '2') {
      new_grid_column[key] = '6';
    } else if (new_grid_column[key] == '3') {
      new_grid_column[key] = '4';
    } else if (new_grid_column[key] == '4') {
      new_grid_column[key] = '3';
    } else if (new_grid_column[key] == '5') {
      new_grid_column[key] = '24';
    } else if (new_grid_column[key] == '6') {
      new_grid_column[key] = '2';
    }
  });
  let grid_column_desktop = new_grid_column.lg != '0' ? new_grid_column.lg : '4';
  let grid_column_tab = new_grid_column.md != '0' ? new_grid_column.md : '6';
  let grid_column_mobile = new_grid_column.sm != '0' ? new_grid_column.sm : '12';
  let gridColumn = "rt-col-md-" + grid_column_desktop + " rt-col-sm-" + grid_column_tab + " rt-col-xs-" + grid_column_mobile;
  let colClasses = " rt-grid-item";
  colClasses += " " + hover_animation;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: post.post_class + ' ' + gridColumn + ' ' + colClasses
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-holder tpg-post-holder"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-detail rt-el-content-wrapper-flex"
  }, show_thumb === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    post: post
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "post-right-content"
  }, show_title === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes: attributes,
    post: post
  }), show_meta === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_MetaData__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    post: post
  }), (show_excerpt === 'show' || show_acf === 'show') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    post: post
  }), rttpgParams.hasPro && show_social_share === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_SocialShare__WEBPACK_IMPORTED_MODULE_4__["default"], null), show_read_more === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_ReadMore__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes
  })))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridLayout4);

/***/ }),

/***/ "./src/blocks/grid-layout/layouts/grid-template/GridLayout5.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/grid-layout/layouts/grid-template/GridLayout5.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/Thumbnail */ "./src/blocks/common/Thumbnail.js");
/* harmony import */ var _common_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Heading */ "./src/blocks/common/Heading.js");
/* harmony import */ var _common_MetaData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/MetaData */ "./src/blocks/common/MetaData.js");
/* harmony import */ var _common_SocialShare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/SocialShare */ "./src/blocks/common/SocialShare.js");
/* harmony import */ var _common_ReadMore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/ReadMore */ "./src/blocks/common/ReadMore.js");
/* harmony import */ var _common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/PostExcerpt */ "./src/blocks/common/PostExcerpt.js");








function GridLayout5(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    grid_column,
    hover_animation,
    show_thumb,
    show_title,
    show_meta,
    show_excerpt,
    show_acf,
    show_social_share,
    show_read_more
  } = attributes;
  let new_grid_column = { ...grid_column
  };
  Object.keys(new_grid_column).map(function (key) {
    if (new_grid_column[key] == '1') {
      new_grid_column[key] = '12';
    } else if (new_grid_column[key] == '2') {
      new_grid_column[key] = '6';
    } else if (new_grid_column[key] == '3') {
      new_grid_column[key] = '4';
    } else if (new_grid_column[key] == '4') {
      new_grid_column[key] = '3';
    } else if (new_grid_column[key] == '5') {
      new_grid_column[key] = '24';
    } else if (new_grid_column[key] == '6') {
      new_grid_column[key] = '2';
    }
  });
  let grid_column_desktop = new_grid_column.lg != '0' ? new_grid_column.lg : '4';
  let grid_column_tab = new_grid_column.md != '0' ? new_grid_column.md : '6';
  let grid_column_mobile = new_grid_column.sm != '0' ? new_grid_column.sm : '12';
  let gridColumn = "rt-col-md-" + grid_column_desktop + " rt-col-sm-" + grid_column_tab + " rt-col-xs-" + grid_column_mobile;
  let colClasses = " rt-grid-item";
  colClasses += " " + hover_animation;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: post.post_class + ' ' + gridColumn + ' ' + colClasses
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-holder tpg-post-holder"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-detail rt-el-content-wrapper-flex"
  }, show_thumb === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Thumbnail__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    post: post
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "post-right-content"
  }, show_title === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes: attributes,
    post: post
  }), show_meta === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_MetaData__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    post: post
  }), (show_excerpt === 'show' || show_acf === 'show') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_PostExcerpt__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    post: post
  }), rttpgParams.hasPro && show_social_share === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_SocialShare__WEBPACK_IMPORTED_MODULE_4__["default"], null), show_read_more === 'show' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_ReadMore__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes
  })))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridLayout5);

/***/ }),

/***/ "./src/blocks/grid-layout/layouts/grid-template/Layout.js":
/*!****************************************************************!*\
  !*** ./src/blocks/grid-layout/layouts/grid-template/Layout.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GridLayout1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GridLayout1 */ "./src/blocks/grid-layout/layouts/grid-template/GridLayout1.js");
/* harmony import */ var _GridLayout2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GridLayout2 */ "./src/blocks/grid-layout/layouts/grid-template/GridLayout2.js");
/* harmony import */ var _GridLayout3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GridLayout3 */ "./src/blocks/grid-layout/layouts/grid-template/GridLayout3.js");
/* harmony import */ var _GridLayout4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GridLayout4 */ "./src/blocks/grid-layout/layouts/grid-template/GridLayout4.js");
/* harmony import */ var _GridLayout5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GridLayout5 */ "./src/blocks/grid-layout/layouts/grid-template/GridLayout5.js");











function Layout(_ref) {
  let {
    attributes,
    post
  } = _ref;
  const {
    grid_layout
  } = attributes;
  let layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout1__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    post: post
  });

  if ('grid-layout3' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout2__WEBPACK_IMPORTED_MODULE_2__["default"], {
      attributes: attributes,
      post: post
    });
  } else if ('grid-layout4' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout3__WEBPACK_IMPORTED_MODULE_3__["default"], {
      attributes: attributes,
      post: post
    });
  } else if ('grid-layout2' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout4__WEBPACK_IMPORTED_MODULE_4__["default"], {
      attributes: attributes,
      post: post
    });
  } else if ('grid-layout5' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout5__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      post: post
    });
  } else if ('grid-layout5-2' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout5__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      post: post
    });
  } else if ('grid-layout6' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout5__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      post: post
    });
  } else if ('grid-layout6-2' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout5__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      post: post
    });
  } else if ('grid-layout7' === grid_layout) {
    layout = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GridLayout5__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      post: post
    });
  }

  return layout;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/Alignment.js":
/*!*************************************!*\
  !*** ./src/components/Alignment.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_alignment_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/alignment.scss */ "./src/components/scss/alignment.scss");
/* harmony import */ var _Devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Devices */ "./src/components/Devices.js");

const {
  __
} = wp.i18n;
const {
  useState
} = wp.element;
const {
  Tooltip
} = wp.components;



const Alignment = props => {
  const {
    value,
    responsive,
    onChange,
    label,
    content,
    options
  } = props;
  const [device, setDevice] = useState(() => window.rttpgDevice || 'lg');

  const _filterValue = () => {
    return value ? responsive ? value[device] : value : '';
  };

  const [currentValue, setCurrentValue] = useState({
    current: _filterValue()
  });

  const setSettings = val => {
    if (val == '') {
      return;
    }

    const final = responsive ? Object.assign({}, value, {
      [device]: val
    }) : val;
    onChange(final);
    setCurrentValue({
      current: final
    });
  };

  const defaultData = options && Array.isArray(options) ? options : ['left', 'center', 'right', 'justify'];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-alignment-wrap"
  }, (label || responsive) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-head"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label), responsive && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Devices__WEBPACK_IMPORTED_MODULE_2__["default"], {
    device: device,
    onChange: _device => {
      setDevice(_device);
      const newData = JSON.parse(JSON.stringify(value));

      if (!newData[_device]) {
        newData[_device] = '';
      }

      onChange(newData);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-body rttpg-btn-group"
  }, defaultData.map((data, index) => {
    if (content) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        className: (_filterValue() == data.value ? 'active' : '') + ' rttpg-button',
        key: index,
        onClick: () => setSettings(_filterValue() == data.value ? '' : data.value)
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
        text: __(data.label, 'the-post-grid')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, __(data.label, 'the-post-grid'))));
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        className: (_filterValue() == data ? 'active' : '') + ' rttpg-button',
        key: index,
        onClick: () => setSettings(_filterValue() == data ? '' : data)
      }, (data == 'left' || data === 'flex-start') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
        text: __('Left')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        className: "fas fa-align-left"
      })), data == 'center' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
        text: __('Middle')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        className: "fas fa-align-center"
      })), (data == 'right' || data === 'flex-end') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
        text: __('Right')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        class: "fas fa-align-right"
      })), data == 'justify' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
        text: __('Right')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        class: "fas fa-align-justify"
      })));
    }
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alignment);

/***/ }),

/***/ "./src/components/BGImage.js":
/*!***********************************!*\
  !*** ./src/components/BGImage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Color */ "./src/components/Color.js");
/* harmony import */ var _ImageAvater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImageAvater */ "./src/components/ImageAvater.js");
/* harmony import */ var _SelectObj1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectObj1 */ "./src/components/SelectObj1.js");
/* harmony import */ var _scss_bgImage_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scss/bgImage.scss */ "./src/components/scss/bgImage.scss");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Constants */ "./src/components/Constants.js");

const {
  __
} = wp.i18n;
const {
  useState,
  useEffect
} = wp.element;
const {
  MediaUpload
} = wp.blockEditor;
const {
  BaseControl,
  Button
} = wp.components;






function BGImage(props) {
  const [device, setDevice] = useState(() => window.rttpgDevice || 'md');
  const {
    label,
    value,
    image,
    onChange
  } = props;
  const responsive = true;
  const resAttr = ['imgPosition', 'imgAttachment', 'imgRepeat', 'imgSize'];
  const defaultData = {
    color: '',
    img: {
      imgURL: '',
      imgID: ''
    },
    imgProperty: {
      imgPosition: {
        lg: ''
      },
      imgAttachment: {
        lg: ''
      },
      imgRepeat: {
        lg: ''
      },
      imgSize: {
        lg: ''
      }
    }
  };

  const setSettings = (val, type) => {
    const newData = JSON.parse(JSON.stringify(value));

    if (resAttr.includes(type)) {
      if (responsive) {
        newData['imgProperty'] = val;
      } else {
        newData['imgProperty'] = val;
      }
    } else {
      newData[type] = val;
    } // if (resAttr.includes(type)) {
    // 	if (responsive) {
    // 		newData.imgProperty = val;
    // 	} else {
    // 		newData.imgProperty = val;
    // 	}
    // } else {
    // 	newData[type] = val;
    // }
    // if (resAttr.includes(type)) {
    // 	if (responsive) {
    // 		newData.imgProperty[device][type] = val;
    // 	} else {
    // 		newData.imgProperty[type] = val;
    // 	}
    // } else {
    // 	newData[type] = val;
    // }


    onChange(newData);
  };

  const imgURLVal = value['img'] !== undefined ? value['img']['imgURL'] : '';
  const imgIDVal = value['img'] !== undefined ? value['img']['imgID'] : '';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-bg-img-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-bg-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Color__WEBPACK_IMPORTED_MODULE_1__["default"], {
    label: __('Color'),
    color: value['color'] || '',
    onChange: val => setSettings(val, 'color')
  }), image !== false && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
    label: __("Image")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => {
      const imgobj = {
        imgURL: media.url,
        imgID: media.id
      };
      setSettings(imgobj, 'img');
    },
    allowedTypes: ["image"],
    value: imgIDVal,
    render: _ref => {
      let {
        open
      } = _ref;
      {
        if (!imgURLVal) {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            onClick: open,
            className: "rttpg-placeholder-image"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "dashicon dashicons dashicons-insert"
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('Insert')));
        } else {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ImageAvater__WEBPACK_IMPORTED_MODULE_2__["default"], {
            imageUrl: imgURLVal,
            onEditImage: open,
            onDeleteImage: () => {
              setSettings('', 'img');
            }
          });
        }
      }
    }
  }), imgURLVal && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectObj1__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Position'),
    responsive: true,
    value: value['imgProperty'],
    name: 'imgPosition',
    options: _Constants__WEBPACK_IMPORTED_MODULE_5__.BACKGROUND_POSITION,
    onChange: val => {
      setSettings(val, 'imgPosition');
    }
  }), imgURLVal && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectObj1__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Attachment'),
    responsive: true,
    value: value['imgProperty'],
    name: 'imgAttachment',
    options: _Constants__WEBPACK_IMPORTED_MODULE_5__.BACKGROUND_ATTACHMENT,
    onChange: val => setSettings(val, 'imgAttachment')
  }), imgURLVal && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectObj1__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Repeat'),
    responsive: true,
    value: value['imgProperty'],
    name: 'imgRepeat',
    options: _Constants__WEBPACK_IMPORTED_MODULE_5__.BACKGROUND_REPEAT,
    onChange: val => setSettings(val, 'imgRepeat')
  }), imgURLVal && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectObj1__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Size'),
    responsive: true,
    value: value['imgProperty'],
    name: 'imgSize',
    options: _Constants__WEBPACK_IMPORTED_MODULE_5__.BACKGROUND_SIZE,
    onChange: val => setSettings(val, 'imgSize')
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BGImage);

/***/ }),

/***/ "./src/components/Background.js":
/*!**************************************!*\
  !*** ./src/components/Background.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/components/Constants.js");
/* harmony import */ var _Gradient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Gradient */ "./src/components/Gradient.js");
/* harmony import */ var _BGImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BGImage */ "./src/components/BGImage.js");
/* harmony import */ var _scss_background_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scss/background.scss */ "./src/components/scss/background.scss");

const {
  __
} = wp.i18n;
const {
  useState,
  useEffect
} = wp.element;
const {
  Button,
  ButtonGroup,
  Tooltip
} = wp.components;





function Background(props) {
  const defaultData = {
    openBGColor: 0,
    type: 'classic',
    classic: {
      'color': '',
      'img': {
        'imgURL': '',
        'imgID': ''
      },
      'imgProperty': {
        'imgPosition': {
          'lg': ''
        },
        'imgAttachment': {
          'lg': ''
        },
        'imgRepeat': {
          'lg': ''
        },
        'imgSize': {
          'lg': ''
        }
      }
    },
    gradient: ''
  };
  const {
    label,
    value,
    onChange
  } = props;

  const setSettings = (val, type) => {
    onChange(Object.assign({}, defaultData, value || {}, {
      openBGColor: 1
    }, {
      [type]: val
    }));
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-background-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-body-btn-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, {
    className: "rttpg-btn-group"
  }, _Constants__WEBPACK_IMPORTED_MODULE_1__.BACKGROUND_TYPE.map(item => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
    text: item.label,
    position: "top",
    delay: 0
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    isLarge: true,
    isPrimary: value['type'] === item.value,
    isSecondary: value['type'] !== item.value,
    onClick: () => setSettings(item.value, 'type')
  }, item.value === 'classic' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "classic-btn fas fa-paint-brush"
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "gradient-btn fas fa-barcode"
  }))))), (Object.keys(value['classic']).length != 0 || value['gradient']) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    isSmall: true,
    className: "rttpg-undo-btn",
    icon: "image-rotate",
    onClick: () => onChange(defaultData)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-body-content-wrap"
  }, value['type'] === "classic" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BGImage__WEBPACK_IMPORTED_MODULE_3__["default"], {
    image: props === null || props === void 0 ? void 0 : props.image,
    value: value['classic'],
    onChange: val => setSettings(val, 'classic')
  }), value['type'] === "gradient" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Gradient__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: value['gradient'],
    onChange: val => setSettings(val, 'gradient')
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Background);

/***/ }),

/***/ "./src/components/BoxShadow.js":
/*!*************************************!*\
  !*** ./src/components/BoxShadow.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Range */ "./src/components/Range.js");
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Color */ "./src/components/Color.js");
/* harmony import */ var _scss_boxshadow_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/boxshadow.scss */ "./src/components/scss/boxshadow.scss");

const {
  __
} = wp.i18n;
const {
  useState,
  useEffect
} = wp.element;
const {
  Dropdown,
  Button,
  SelectControl,
  RangeControl,
  ToggleControl
} = wp.components;




function BoxShadow(props) {
  const {
    label,
    value: data,
    onChange,
    transition
  } = props;

  const setSettings = function (val, type) {
    let property = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    const newData = JSON.parse(JSON.stringify(data));

    if (type === 'width') {
      newData[type][property] = val;
    } else {
      newData[type] = val;
    }

    onChange(newData);
  }; // const defData = {
  //     'openShadow': 1,
  //     'width': { 'top': '', 'right': '', 'bottom': '', 'left': '' },
  //     'color': '',
  //     'inset': false,
  //     'transition': ''
  // }


  console.log(transition);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-typography-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-typography"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
    className: "rttpg-typography-dropdown-icon",
    contentClassName: "rttpg-components-popover rttpg-cp-typography-content",
    position: "bottom right",
    renderToggle: _ref => {
      let {
        isOpen,
        onToggle
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        isSmall: true,
        onClick: onToggle,
        "aria-expanded": isOpen,
        icon: "edit"
      });
    },
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "rttpg-typography-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Color__WEBPACK_IMPORTED_MODULE_2__["default"], {
      label: __("Color"),
      color: data['color'],
      onChange: val => setSettings(val, 'color')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Range__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __("Horizontal Offset"),
      reset: true,
      value: data['width']["top"],
      onChange: val => setSettings(val, 'width', 'top'),
      min: 0,
      max: 100
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Range__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __("Vertical Offset"),
      reset: true,
      value: data['width']["right"],
      onChange: val => setSettings(val, 'width', 'right'),
      min: 0,
      max: 100
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Range__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __("Shadow Blur"),
      reset: true,
      value: data['width']["bottom"],
      onChange: val => setSettings(val, 'width', 'bottom'),
      min: 0,
      max: 100
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Range__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __("Shadow Spread"),
      reset: true,
      value: data['width']["left"],
      onChange: val => setSettings(val, 'width', 'left'),
      min: 0,
      max: 100
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "rttpg-toggle-control-field"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
      label: "Inset",
      checked: data['inset'],
      onChange: val => setSettings(val, 'inset')
    })), transition && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Range__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __("Shadow Transition"),
      reset: true,
      value: data['transition'],
      onChange: val => setSettings(val, 'transition'),
      min: 0,
      max: 5,
      step: 0.1
    }))
  })));
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoxShadow);

/***/ }),

/***/ "./src/components/Color.js":
/*!*********************************!*\
  !*** ./src/components/Color.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_color_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/color.scss */ "./src/components/scss/color.scss");

const {
  __
} = wp.i18n;
const {
  useState,
  useEffect
} = wp.element;
const {
  Dropdown,
  Tooltip,
  ColorPicker,
  Button
} = wp.components;


function Color(_ref) {
  let {
    label,
    color,
    onChange
  } = _ref;
  const [bgColor, setBgColor] = useState(color);
  useEffect(() => {
    setBgColor(color);
  }, [color]);

  const onChangeComplete = _ref2 => {
    let {
      rgb,
      hex
    } = _ref2;
    let color = rgb ? `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})` : hex;
    onChange(color);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-color-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-color"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
    contentClassName: "rttpg-components-popover rttpg-cp-color-content",
    renderToggle: _ref3 => {
      let {
        isOpen,
        onToggle
      } = _ref3;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
        text: color || "default"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "rttpg-color-ball"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          height: 25,
          width: 25,
          borderRadius: "50%",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.1)",
          backgroundColor: bgColor
        },
        "aria-expanded": isOpen,
        onClick: onToggle,
        "aria-label": color || "default"
      })));
    },
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
      color: color,
      onChangeComplete: color => onChangeComplete(color)
    })
  }), bgColor && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    isSmall: true,
    className: "rttpg-undo-btn",
    icon: "image-rotate",
    onClick: () => onChange(undefined)
  })));
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Color);

/***/ }),

/***/ "./src/components/Constants.js":
/*!*************************************!*\
  !*** ./src/components/Constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUTHOR_LISTS": () => (/* binding */ AUTHOR_LISTS),
/* harmony export */   "BACKGROUND_ATTACHMENT": () => (/* binding */ BACKGROUND_ATTACHMENT),
/* harmony export */   "BACKGROUND_POSITION": () => (/* binding */ BACKGROUND_POSITION),
/* harmony export */   "BACKGROUND_REPEAT": () => (/* binding */ BACKGROUND_REPEAT),
/* harmony export */   "BACKGROUND_SIZE": () => (/* binding */ BACKGROUND_SIZE),
/* harmony export */   "BACKGROUND_TYPE": () => (/* binding */ BACKGROUND_TYPE),
/* harmony export */   "BG_HOVER_DIRECTION": () => (/* binding */ BG_HOVER_DIRECTION),
/* harmony export */   "BORDER_STYLES": () => (/* binding */ BORDER_STYLES),
/* harmony export */   "BOX_HOVER": () => (/* binding */ BOX_HOVER),
/* harmony export */   "BTN_WIDTH_TYPE": () => (/* binding */ BTN_WIDTH_TYPE),
/* harmony export */   "BUTTON_HOVER_EFFECT": () => (/* binding */ BUTTON_HOVER_EFFECT),
/* harmony export */   "BUTTON_ICON_HOVER_EFFECTS": () => (/* binding */ BUTTON_ICON_HOVER_EFFECTS),
/* harmony export */   "BUTTON_INFOBOX_HOVER_EFFECT": () => (/* binding */ BUTTON_INFOBOX_HOVER_EFFECT),
/* harmony export */   "BUTTON_INFOBOX_STYLE": () => (/* binding */ BUTTON_INFOBOX_STYLE),
/* harmony export */   "BUTTON_SIZES": () => (/* binding */ BUTTON_SIZES),
/* harmony export */   "BUTTON_TYPE": () => (/* binding */ BUTTON_TYPE),
/* harmony export */   "COL_OPTIONS": () => (/* binding */ COL_OPTIONS),
/* harmony export */   "DEVICES": () => (/* binding */ DEVICES),
/* harmony export */   "DIRECTION_TYPE": () => (/* binding */ DIRECTION_TYPE),
/* harmony export */   "EXCERPT_TYPE": () => (/* binding */ EXCERPT_TYPE),
/* harmony export */   "FONT_WEIGHTS": () => (/* binding */ FONT_WEIGHTS),
/* harmony export */   "GRID_STYLE": () => (/* binding */ GRID_STYLE),
/* harmony export */   "HEADING": () => (/* binding */ HEADING),
/* harmony export */   "ICON_HOVER_DIRECTION": () => (/* binding */ ICON_HOVER_DIRECTION),
/* harmony export */   "ICON_POSITION": () => (/* binding */ ICON_POSITION),
/* harmony export */   "MEDIA_TYPE": () => (/* binding */ MEDIA_TYPE),
/* harmony export */   "META_ORDERING_LABEL": () => (/* binding */ META_ORDERING_LABEL),
/* harmony export */   "META_POSITION": () => (/* binding */ META_POSITION),
/* harmony export */   "NORMAL_HOVER": () => (/* binding */ NORMAL_HOVER),
/* harmony export */   "OVERLAY_TYPE": () => (/* binding */ OVERLAY_TYPE),
/* harmony export */   "PAGINATION_TYPE": () => (/* binding */ PAGINATION_TYPE),
/* harmony export */   "POSTS_TYPE": () => (/* binding */ POSTS_TYPE),
/* harmony export */   "POST_LINK_TYPE": () => (/* binding */ POST_LINK_TYPE),
/* harmony export */   "POST_ORDER_BY": () => (/* binding */ POST_ORDER_BY),
/* harmony export */   "POST_SORT_ORDER": () => (/* binding */ POST_SORT_ORDER),
/* harmony export */   "PRINT_TAXONOMY": () => (/* binding */ PRINT_TAXONOMY),
/* harmony export */   "SECTION_TITLE_SOURCE": () => (/* binding */ SECTION_TITLE_SOURCE),
/* harmony export */   "SECTION_TITLE_STYLE": () => (/* binding */ SECTION_TITLE_STYLE),
/* harmony export */   "TAX_RELATION": () => (/* binding */ TAX_RELATION),
/* harmony export */   "TEXT_TRANSFORM": () => (/* binding */ TEXT_TRANSFORM),
/* harmony export */   "TITLE_POSITION": () => (/* binding */ TITLE_POSITION),
/* harmony export */   "TITLE_VISIBILITY_STYLE": () => (/* binding */ TITLE_VISIBILITY_STYLE)
/* harmony export */ });
const {
  __
} = wp.i18n;
const DEVICES = {
  Desktop: "md",
  Tablet: "sm",
  Mobile: "xs"
};
const NORMAL_HOVER = [{
  label: "Normal",
  value: "normal"
}, {
  label: "Hover",
  value: "hover"
}];
const BOX_HOVER = [{
  label: "Normal",
  value: "normal"
}, {
  label: "Hover",
  value: "hover"
}, {
  label: "Box Hover",
  value: "box_hover"
}];
const MEDIA_TYPE = [{
  label: "Icon",
  value: "icon"
}, {
  label: "Image",
  value: "image"
}, {
  label: "None",
  value: "none"
}];
const DIRECTION_TYPE = [{
  label: "Left",
  value: "left"
}, {
  label: "Top",
  value: "top"
}, {
  label: "Right",
  value: "right"
}];
const ICON_POSITION = [{
  label: "Left",
  value: "left"
}, {
  label: "Right",
  value: "right"
}];
const BTN_WIDTH_TYPE = [{
  label: "Auto",
  value: "auto"
}, {
  label: "Full",
  value: "full"
}, {
  label: "Fixed",
  value: "fixed"
}];
const BACKGROUND_TYPE = [{
  label: __("Classic", "guten-blocks"),
  value: "classic"
}, {
  label: __("Gradient", "guten-blocks"),
  value: "gradient"
}];
const BACKGROUND_POSITION = [{
  label: __("Default", "guten-blocks"),
  value: ""
}, {
  label: __("Left Top", "guten-blocks"),
  value: "left top"
}, {
  label: __("Left Center", "guten-blocks"),
  value: "left center"
}, {
  label: __("Left Bottom", "guten-blocks"),
  value: "left bottom"
}, {
  label: __("Right Top", "guten-blocks"),
  value: "right top"
}, {
  label: __("Right Center", "guten-blocks"),
  value: "right center"
}, {
  label: __("Right Bottom", "guten-blocks"),
  value: "right bottom"
}, {
  label: __("Center Top", "guten-blocks"),
  value: "center top"
}, {
  label: __("Center Center", "guten-blocks"),
  value: "center center"
}, {
  label: __("Center Bottom", "guten-blocks"),
  value: "center bottom"
}];
const BACKGROUND_SIZE = [{
  label: __("Default", "guten-blocks"),
  value: ""
}, {
  label: __("Auto", "guten-blocks"),
  value: "auto"
}, {
  label: __("Cover", "guten-blocks"),
  value: "cover"
}, {
  label: __("Contain", "guten-blocks"),
  value: "contain"
}];
const BACKGROUND_REPEAT = [{
  label: __("Default", "guten-blocks"),
  value: ""
}, {
  label: __("No Repeat", "guten-blocks"),
  value: "no-repeat"
}, {
  label: __("Repeat", "guten-blocks"),
  value: "repeat"
}, {
  label: __("Repeat X", "guten-blocks"),
  value: "repeat-x"
}, {
  label: __("Repeat Y", "guten-blocks"),
  value: "repeat-y"
}];
const BACKGROUND_ATTACHMENT = [{
  label: __("Default", "guten-blocks"),
  value: ""
}, {
  label: __("Scroll", "guten-blocks"),
  value: "scroll"
}, {
  label: __("Fixed", "guten-blocks"),
  value: "fixed"
}];
const TEXT_TRANSFORM = [{
  label: __("None", "guten-blocks"),
  value: "none"
}, {
  label: __("Lowercase", "guten-blocks"),
  value: "lowercase"
}, {
  label: __("Capitalize", "guten-blocks"),
  value: "capitalize"
}, {
  label: __("Uppercase", "guten-blocks"),
  value: "uppercase"
}];
const FONT_WEIGHTS = [{
  label: __("Default", "guten-blocks"),
  value: "default"
}, {
  label: __("Light", "guten-blocks"),
  value: "300"
}, {
  label: __("Normal", "guten-blocks"),
  value: "400"
}, {
  label: __("Medium", "guten-blocks"),
  value: "500"
}, {
  label: __("Semi Bold", "guten-blocks"),
  value: "600"
}, {
  label: __("Bold", "guten-blocks"),
  value: "700"
}, {
  label: __("Extra Bold", "guten-blocks"),
  value: "800"
}, {
  label: __("Heavy Bold", "guten-blocks"),
  value: "900"
}];
const HEADING = [{
  label: __("H1", "guten-blocks"),
  value: "h1"
}, {
  label: __("H2", "guten-blocks"),
  value: "h2"
}, {
  label: __("H3", "guten-blocks"),
  value: "h3"
}, {
  label: __("H4", "guten-blocks"),
  value: "h4"
}, {
  label: __("H5", "guten-blocks"),
  value: "h5"
}, {
  label: __("H6", "guten-blocks"),
  value: "h6"
}];
const BORDER_STYLES = [{
  label: __("None"),
  value: "none"
}, {
  label: __("Solid"),
  value: "solid"
}, {
  label: __("Dashed"),
  value: "dashed"
}, {
  label: __("Dotted"),
  value: "dotted"
}, {
  label: __("Double"),
  value: "double"
}, {
  label: __("Groove"),
  value: "groove"
}, {
  label: __("Inset"),
  value: "inset"
}, {
  label: __("Outset"),
  value: "outset"
}, {
  label: __("Ridge"),
  value: "ridge"
}]; // only apply fill and outline buttons

const BUTTON_INFOBOX_HOVER_EFFECT = [{
  label: __("Select Effect"),
  value: ""
}, {
  label: __("Bounce left to right"),
  value: "rt-bounce-to-left"
}, {
  label: __("Bounce right to left"),
  value: "rt-bounce-to-right"
}, {
  label: __("Bounce top to bottom"),
  value: "rt-bounce-to-bottom"
}, {
  label: __("Bounce bottom to top"),
  value: "rt-bounce-to-top"
}, {
  label: __("Rectangle out"),
  value: "rt-rectangle-out"
}, {
  label: __("Rectangle in"),
  value: "rt-rectangle-in"
}, {
  label: __("Shutter in horizontal"),
  value: "rt-shutter-in-horizontal"
}, {
  label: __("Shutter out horizontal"),
  value: "rt-shutter-out-horizontal"
}, {
  label: __("Shutter in vertical"),
  value: "rt-shutter-in-vertical"
}, {
  label: __("Shutter out vertical"),
  value: "rt-shutter-out-vertical"
}];
const ICON_HOVER_DIRECTION = [{
  label: __("Select Direction"),
  value: ""
}, {
  label: __("Top to bottom"),
  value: "rt-top-to-bottom"
}, {
  label: __("Bottom to top"),
  value: "rt-bottom-to-top"
}, {
  label: __("Right to left"),
  value: "rt-right-to-left"
}, {
  label: __("Left to right"),
  value: "rt-left-to-right"
}];
const BG_HOVER_DIRECTION = [{
  label: __("Normal"),
  value: "rt-bg-normal"
}, {
  label: __("Top to bottom"),
  value: "rt-bg-top-to-bottom"
}, {
  label: __("Bottom to top"),
  value: "rt-bg-bottom-to-top"
}, {
  label: __("Right to left"),
  value: "rt-bg-right-to-left"
}, {
  label: __("Left to right"),
  value: "rt-bg-left-to-right"
}, {
  label: __("Zoom in"),
  value: "rt-bg-zoom-in"
}];
const BUTTON_INFOBOX_STYLE = [{
  label: __("Text Button"),
  value: "text-btn"
}, {
  label: __("Fill Button"),
  value: "fill-btn"
}, {
  label: __("OutLine Button"),
  value: "outline-btn"
}, {
  label: __("Icon Button"),
  value: "icon-btn"
}];
const BUTTON_TYPE = [{
  label: __("Fill"),
  value: "rt-fill-btn"
}, {
  label: __("Fill Button With Outline"),
  value: "rt-fill-btn-with-outline"
}, {
  label: __("OutLine Button"),
  value: "rt-outline-btn"
}, {
  label: __("Icon Button"),
  value: "rt-icon-btn"
}, {
  label: __("Position Aware"),
  value: "rt-position-aware-btn"
}];
const BUTTON_SIZES = [{
  label: __("S"),
  value: "rt-btn-sm"
}, {
  label: __("M"),
  value: "rt-btn-md"
}, {
  label: __("L"),
  value: "rt-btn-lg"
}, {
  label: __("XL"),
  value: "rt-btn-xl"
}]; // only apply fill and outline buttons

const BUTTON_HOVER_EFFECT = [{
  label: __("Default"),
  value: "rt-btn-no-effect"
}, {
  label: __("Bounce left to right"),
  value: "rt-bounce-to-left"
}, {
  label: __("Bounce right to left"),
  value: "rt-bounce-to-right"
}, {
  label: __("Bounce top to bottom"),
  value: "rt-bounce-to-bottom"
}, {
  label: __("Bounce bottom to top"),
  value: "rt-bounce-to-top"
}, {
  label: __("Rectangle out"),
  value: "rt-rectangle-out"
}, {
  label: __("Rectangle in"),
  value: "rt-rectangle-in"
}, {
  label: __("Shutter in horizontal"),
  value: "rt-shutter-in-horizontal"
}, {
  label: __("Shutter out horizontal"),
  value: "rt-shutter-out-horizontal"
}, {
  label: __("Shutter in vertical"),
  value: "rt-shutter-in-vertical"
}, {
  label: __("Shutter out vertical"),
  value: "rt-shutter-out-vertical"
}, {
  label: __("Slide down top left"),
  value: "rt-slide-down-top-left"
}, {
  label: __("Slide down top right"),
  value: "rt-slide-down-top-right"
}, {
  label: __("Slide up bottom left"),
  value: "rt-slide-up-bottom-left"
}, {
  label: __("Slide up bottom right"),
  value: "rt-slide-up-bottom-right"
}, {
  label: __("Swipe left to right"),
  value: "rt-swipe-left-to-right"
}, {
  label: __("Swipe right to left"),
  value: "rt-swipe-right-to-left"
}, {
  label: __("Swipe top to bottom"),
  value: "rt-swipe-top-to-bottom"
}, {
  label: __("Swipe bottom to top"),
  value: "rt-swipe-bottom-to-top"
}];
const BUTTON_ICON_HOVER_EFFECTS = [{
  label: __("Default"),
  value: "rt-icon-effect-none"
}, //{ label: __("None"), value: "rt-icon-effect-none" },
{
  label: __("Spin"),
  value: "rt-icon-spin"
}, {
  label: __("Shake Y"),
  value: "rt-icon-shake-y"
}, {
  label: __("Bounce In"),
  value: "rt-icon-bounce-in"
}, {
  label: __("Heart Beat"),
  value: "rt-icon-heart-beat"
}, {
  label: __("Right to left"),
  value: "rt-icon-right-to-left"
}, {
  label: __("Left to Right"),
  value: "rt-icon-left-to-right"
}, {
  label: __("Top to bottom"),
  value: "rt-icon-top-to-bottom"
}, {
  label: __("Bottom to top"),
  value: "rt-icon-bottom-to-top"
}];
const COL_OPTIONS = [{
  value: 'default',
  label: __('Default', 'the-post-grid')
}, {
  value: '1',
  label: __('1 Col', 'the-post-grid')
}, {
  value: '2',
  label: __('2 Col', 'the-post-grid')
}, {
  value: '3',
  label: __('3 Col', 'the-post-grid')
}, {
  value: '4',
  label: __('4 Col', 'the-post-grid')
}, {
  value: '5',
  label: __('5 Col', 'the-post-grid')
}, {
  value: '6',
  label: __('6 Col', 'the-post-grid')
}];
const SECTION_TITLE_STYLE = [{
  value: 'default',
  label: __('Default', 'the-post-grid')
}, {
  value: 'style1',
  label: __('Style 1', 'the-post-grid')
}, {
  value: 'style2',
  label: __('Style 2', 'the-post-grid')
}, {
  value: 'style3',
  label: __('Style 3', 'the-post-grid')
}];
const SECTION_TITLE_SOURCE = [{
  value: 'page_title',
  label: __('Page Title', 'the-post-grid')
}, {
  value: 'custom_title',
  label: __('Custom Title', 'the-post-grid')
}];
const TITLE_VISIBILITY_STYLE = [{
  value: 'default',
  label: __('Default', 'the-post-grid')
}, {
  value: 'one-line',
  label: __('Show in 1 line', 'the-post-grid')
}, {
  value: 'two-line',
  label: __('Show in 2 lines', 'the-post-grid')
}, {
  value: 'three-line',
  label: __('Show in 3 lines', 'the-post-grid')
}, {
  value: 'custom',
  label: __('Custom', 'the-post-grid')
}];
const titlePosition = [{
  value: 'default',
  label: __('Default', 'the-post-grid')
}];

if (rttpgParams.hasPro) {
  titlePosition.push({
    value: 'above_image',
    label: __('Above Image', 'the-post-grid')
  });
  titlePosition.push({
    value: 'below_image',
    label: __('Below Image', 'the-post-grid')
  });
}

const TITLE_POSITION = titlePosition;
const orderBy = [{
  value: 'date',
  label: __('Date', 'the-post-grid')
}, {
  value: 'ID',
  label: __('Order by post ID', 'the-post-grid')
}, {
  value: 'author',
  label: __('Author', 'the-post-grid')
}, {
  value: 'title',
  label: __('Title', 'the-post-grid')
}, {
  value: 'modified',
  label: __('Last modified date', 'the-post-grid')
}, {
  value: 'parent',
  label: __('Post parent ID', 'the-post-grid')
}, {
  value: 'comment_count',
  label: __('Number of comments', 'the-post-grid')
}, {
  value: 'menu_order',
  label: __('Menu order', 'the-post-grid')
}];

if (rttpgParams.hasPro) {
  orderBy.push({
    value: 'rand',
    label: __('Random order', 'the-post-grid')
  });
}

const POST_ORDER_BY = orderBy;
const pagination = [{
  value: 'pagination',
  label: __('Default Pagination', 'the-post-grid')
}];

if (rttpgParams.hasPro) {
  pagination.push({
    value: 'pagination_ajax',
    label: __('Ajax Pagination ( Only for Grid )', 'the-post-grid')
  });
  pagination.push({
    value: 'load_more',
    label: __('Load More - On Click', 'the-post-grid')
  });
  pagination.push({
    value: 'load_on_scroll',
    label: __('Load On Scroll', 'the-post-grid')
  });
}

const PAGINATION_TYPE = pagination;
const post_link_select = [{
  value: 'default',
  label: __('Link to details page', 'the-post-grid')
}];

if (rttpgParams.hasPro) {
  post_link_select.push({
    value: 'popup',
    label: __('Single Popup', 'the-post-grid')
  });
  post_link_select.push({
    value: 'multi_popup',
    label: __('Multi Popup', 'the-post-grid')
  });
}

const POST_LINK_TYPE = post_link_select;
const metaPosition = [{
  value: 'default',
  label: __('Default', 'the-post-grid')
}];

if (rttpgParams.hasPro) {
  metaPosition.push({
    value: 'above_title',
    label: __('Above Title', 'the-post-grid')
  });
  metaPosition.push({
    value: 'below_title',
    label: __('Below Title', 'the-post-grid')
  });
  metaPosition.push({
    value: 'above_excerpt',
    label: __('Above excerpt', 'the-post-grid')
  });
  metaPosition.push({
    value: 'below_excerpt',
    label: __('Below excerpt', 'the-post-grid')
  });
}

const META_POSITION = metaPosition; // GRID_STYLE Constang

const tpgGridStyle = [{
  value: 'tpg-even',
  label: __('Grid', 'the-post-grid')
}, {
  value: 'tpg-full-height',
  label: __('Grid Equal Height', 'the-post-grid')
}];

if (rttpgParams.hasPro) {
  tpgGridStyle.push({
    value: 'masonry',
    label: __('Masonry', 'the-post-grid')
  });
}

const GRID_STYLE = tpgGridStyle;
const EXCERPT_TYPE = [{
  value: 'character',
  label: __('Character', 'the-post-grid')
}, {
  value: 'word',
  label: __('Word', 'the-post-grid')
}, {
  value: 'full',
  label: __('Full Content', 'the-post-grid')
}];
const POST_SORT_ORDER = [{
  value: 'desc',
  label: __('DESC', 'the-post-grid')
}, {
  value: 'asc',
  label: __('ASC', 'the-post-grid')
}]; // POSTS_TYPE Constang

const tpgPostType = [];
let getPostType = rttpgParams.post_type;

for (let p in getPostType) {
  tpgPostType.push({
    value: p,
    label: __(getPostType[p], 'the-post-grid')
  });
}

const POSTS_TYPE = tpgPostType;
const tpgAllUsers = [{
  value: '',
  label: __('Choose Author', 'the-post-grid')
}];
let getUsers = rttpgParams.get_users;

for (let u in getUsers) {
  tpgAllUsers.push({
    value: u,
    label: __(getUsers[u], 'the-post-grid')
  });
}

const AUTHOR_LISTS = tpgAllUsers;
const TAX_RELATION = [{
  value: 'OR',
  label: __('OR', 'the-post-grid')
}, {
  value: 'AND',
  label: __('AND', 'the-post-grid')
}];
const PRINT_TAXONOMY = taxonomy => {
  let allTax = [];

  for (let tax in taxonomy) {
    allTax.push({
      value: tax,
      label: __(taxonomy[tax], 'the-post-grid')
    });
  }

  return allTax;
};
const hover_overlay_type = [{
  value: 'always',
  label: __('Show Always', 'the-post-grid')
}, {
  value: 'fadein-on-hover',
  label: __('FadeIn on hover', 'the-post-grid')
}, {
  value: 'fadeout-on-hover',
  label: __('FadeOut on hover', 'the-post-grid')
}, {
  value: 'slidein-on-hover',
  label: __('SlideIn on hover', 'the-post-grid')
}, {
  value: 'slideout-on-hover',
  label: __('SlideOut on hover', 'the-post-grid')
}, {
  value: 'zoomin-on-hover',
  label: __('ZoomIn on hover', 'the-post-grid')
}, {
  value: 'zoomout-on-hover',
  label: __('ZoomOut on hover', 'the-post-grid')
}, {
  value: 'zoominall-on-hover',
  label: __('ZoomIn Content on hover', 'the-post-grid')
}, {
  value: 'zoomoutall-on-hover',
  label: __('ZoomOut Content on hover', 'the-post-grid')
}];
const OVERLAY_TYPE = hover_overlay_type;
const META_ORDERING_LABEL = [{
  value: 'author',
  label: 'Author'
}, {
  value: 'date',
  label: 'Date'
}, {
  value: 'category',
  label: 'Category'
}, {
  value: 'tags',
  label: 'Tags'
}, {
  value: 'comment_count',
  label: 'Comment Count'
}, {
  value: 'post_count',
  label: 'Post Count'
}];

/***/ }),

/***/ "./src/components/Devices.js":
/*!***********************************!*\
  !*** ./src/components/Devices.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_devices_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/devices.scss */ "./src/components/scss/devices.scss");
/* harmony import */ var _helpers_useClickOutside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/useClickOutside */ "./src/helpers/useClickOutside.js");


/* global wp */

const {
  __
} = wp.i18n;



const Devices = props => {
  const [switcherIsOpen, setSwitcherIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [device, setDevice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => props.device || 'lg');
  const devicesRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const closeDevices = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => setSwitcherIsOpen(false), []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (device) {
      window.rttpgDevice = device;
    }
  }, []);

  const onClickHandler = _device => {
    window.rttpgDevice = _device;
    setDevice(_device);
    props.onChange(_device);
    setSwitcherIsOpen(() => !switcherIsOpen);
  };

  (0,_helpers_useClickOutside__WEBPACK_IMPORTED_MODULE_3__["default"])(devicesRef, closeDevices);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: devicesRef,
    className: `rttpg-device-switchers active-${device}${switcherIsOpen ? ' rttpg-device-switchers-open' : ''} `,
    onClick: () => setSwitcherIsOpen(() => !switcherIsOpen)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-device-switchers-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: `rttpg-device-switcher rttpg-device-switcher-desktop${device === 'lg' ? ' active' : ''}`,
    onClick: () => onClickHandler('lg'),
    "data-tooltip": __('Desktop')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-desktop"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: `rttpg-device-switcher rttpg-device-switcher-laptop${device === 'md' ? ' active' : ''}`,
    onClick: () => onClickHandler('md'),
    "data-tooltip": __('Tablet')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-tablet-alt"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: `rttpg-device-switcher rttpg-device-switcher-tablet${device === 'sm' ? ' active' : ''}`,
    onClick: () => onClickHandler('sm'),
    "data-tooltip": __('Mobile')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-mobile-alt"
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Devices);

/***/ }),

/***/ "./src/components/Dimension.js":
/*!*************************************!*\
  !*** ./src/components/Dimension.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Devices */ "./src/components/Devices.js");
/* harmony import */ var _scss_dimension_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/dimension.scss */ "./src/components/scss/dimension.scss");


/* global wp*/





const Dimension = props => {
  const {
    responsive,
    onChange,
    units,
    value: data,
    type
  } = props;
  const [device, setDevice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => window.rttpgDevice || 'lg');
  const defaultData = {
    isLinked: true,
    unit: 'px',
    value: ''
  };
  const currentData = responsive ? data[device] ? data[device] : defaultData : data || defaultData;

  const updateData = newData => {
    newData.type = type;
    onChange(newData);
  };

  const onChangeDimension = (type, newValue) => {
    let formattedValue = currentData.value ? currentData.value.split(" ") : ['0', '0', '0', '0'];

    if (currentData.isLinked) {
      formattedValue = new Array(5).fill(formattedValue[0] || '0');
    } else {
      if (formattedValue.length < 4) {
        formattedValue = new Array(5).fill(formattedValue[0] || '0');
      }
    }

    const [top, right, bottom, left] = formattedValue;
    const newData = JSON.parse(JSON.stringify(data));
    const updatedValue = currentData.isLinked ? `${newValue} ${newValue} ${newValue} ${newValue}` : `${type === 'top' ? `${newValue}` : `${top}`} ${type === 'right' ? `${newValue}` : `${right}`} ${type === 'bottom' ? `${newValue}` : `${bottom}`} ${type === 'left' ? `${newValue}` : `${left}`}`;

    if (responsive) {
      newData[device].value = updatedValue;
    } else {
      newData.value = updatedValue;
    }

    updateData(newData);
  };

  const updateUnit = _unit => {
    const newData = JSON.parse(JSON.stringify(data));

    if (responsive) {
      newData[device].unit = _unit;
    } else {
      newData.unit = _unit;
    }

    updateData(newData);
  };

  const toggleIsLinked = () => {
    const newData = JSON.parse(JSON.stringify(data));

    if (responsive) {
      newData[device].isLinked = !newData[device].isLinked;

      if (newData[device].isLinked) {
        newData[device].value = newData[device].value ? newData[device].value.split(" ")[0] : '0 0 0 0';
      }
    } else {
      newData.isLinked = !newData.isLinked;
    }

    updateData(newData);
  };

  const dimensionTypes = ['top', 'right', 'bottom', 'left'];
  let dimensionValues;

  if (currentData.isLinked) {
    const firstValue = currentData !== null && currentData !== void 0 && currentData.value ? currentData.value.split(" ")[0] : '';
    dimensionValues = new Array(5).fill(firstValue);
  } else {
    dimensionValues = currentData !== null && currentData !== void 0 && currentData.value ? currentData.value.split(" ") : ['0', '0', '0', '0'];
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-dimension"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-left-part"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-label"
  }, props.label), responsive && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Devices__WEBPACK_IMPORTED_MODULE_2__["default"], {
    device: device,
    onChange: _device => {
      setDevice(_device);
      const newData = JSON.parse(JSON.stringify(data));

      if (!newData[_device]) {
        newData[_device] = defaultData;
        updateData(newData);
      }
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rt-right-part"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-units-choices"
  }, (units && Array.isArray(units) ? units : ['px', 'em', '%']).map(_unit => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: (currentData === null || currentData === void 0 ? void 0 : currentData.unit) === _unit || !(currentData !== null && currentData !== void 0 && currentData.unit) && _unit === defaultData.unit ? 'active' : '',
    onClick: () => updateUnit(_unit)
  }, _unit))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-dimensions"
  }, dimensionTypes.map((_item, _i) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "rttpg-control-dimension"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "number",
      value: dimensionValues[_i],
      "data-setting": _item,
      onChange: e => onChangeDimension(_item, e.target.value)
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "rttpg-control-dimension-label"
    }, _item));
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-dimension linking"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `rttpg-link-dimensions  ${currentData !== null && currentData !== void 0 && currentData.isLinked ? "admin-links linked" : "editor-unlink"}`,
    onClick: toggleIsLinked
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `rt-dm-link-icon dashicons dashicons-${currentData !== null && currentData !== void 0 && currentData.isLinked ? "admin-links linked" : "editor-unlink"}`
  }))))));
};

Dimension.propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  value: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func.isRequired),
  type: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOf(['padding', 'margin', 'borderRadius'])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dimension);

/***/ }),

/***/ "./src/components/Gradient.js":
/*!************************************!*\
  !*** ./src/components/Gradient.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_gradient_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/gradient.scss */ "./src/components/scss/gradient.scss");

const {
  __
} = wp.i18n;
const {
  useState,
  useEffect
} = wp.element;
const {
  GradientPicker
} = wp.components;


function Gradient(props) {
  const {
    label,
    value,
    onChange
  } = props;

  const setSettings = val => {
    onChange(val);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-gradient-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GradientPicker, {
    label: 'helloooooo',
    value: value,
    onChange: val => setSettings(val),
    gradients: [{
      name: 'Green',
      gradient: 'linear-gradient(135deg, #80F1A6 0%, #EFD000 100%)',
      slug: 'green'
    }, {
      name: 'Blue',
      gradient: 'linear-gradient(45deg, #0066FF 0%, #0A51BB 100%)',
      slug: 'blue'
    }, {
      name: 'Dark Blue',
      gradient: 'linear-gradient(50deg, #15D2E3 10%, #11D6E2 40%, #10D7E2 80%)',
      slug: 'darkBlue'
    }, {
      name: 'Yellow',
      gradient: 'linear-gradient(135deg, #FBDA61 2.88%, #F76B1C 98.13%)',
      slug: 'yellow'
    }, {
      name: 'Merun',
      gradient: 'linear-gradient(135deg, #E25544 2.88%, #620C90 98.14%)',
      slug: 'merun'
    }]
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gradient);

/***/ }),

/***/ "./src/components/IconList.js":
/*!************************************!*\
  !*** ./src/components/IconList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_iconList_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/iconList.scss */ "./src/components/scss/iconList.scss");
/* harmony import */ var _assets_iconList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/iconList */ "./src/components/assets/iconList.js");



const {
  __
} = wp.i18n;
const {
  Component,
  Fragment
} = wp.element;


class IconList extends Component {
  constructor() {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "state", {
      isOpen: false,
      filterText: '',
      showIcons: false
    });
  }

  render() {
    const {
      value,
      label,
      className
    } = this.props;
    const {
      filterText,
      isOpen
    } = this.state;
    let finalData = [];

    if (filterText.length > 2) {
      _assets_iconList__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(name => {
        if (name.includes(filterText)) {
          finalData.push(name);
        }
      });
    } else {
      finalData = _assets_iconList__WEBPACK_IMPORTED_MODULE_3__["default"];
    }

    const hasIcon = value ? 'has-icon' : '';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: `rttpg-field rttpg-icon-main-wrapper ${className}`
    }, this.props.label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      class: "components-input-control__label"
    }, label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: `icon-inner-wrapper`
    }, value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      onClick: () => this.props.onChange(''),
      className: "rttpg-remove-icon far fa-trash-alt fa-fw"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: `choose-icon ${hasIcon}`,
      onClick: e => this.setState({
        isOpen: !this.state.isOpen
      })
    }, value ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: `default-icon ${value}`
    }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "fas fa-plus"
    })), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "rttpg-icon-wrapper"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      onClick: e => this.setState({
        isOpen: false
      }),
      className: "rttpg-remove-icon fas fa-times"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
      type: "text",
      value: this.state.filterText,
      placeholder: "Search...",
      onChange: e => this.setState({
        filterText: e.target.value
      }),
      autoComplete: "off"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "rttpg-icon-list-icons"
    }, finalData.map(name => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: value == name ? 'rttpg-active' : '',
        onClick: e => {
          this.props.onChange(name);
          this.setState({
            isOpen: false
          });
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: name
      }));
    })))));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconList);

/***/ }),

/***/ "./src/components/ImageAvater.js":
/*!***************************************!*\
  !*** ./src/components/ImageAvater.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);

const {
  __
} = wp.i18n;


function ImageAvater(_ref) {
  let {
    imageUrl,
    onDeleteImage,
    onEditImage = null
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-image-avatar",
    style: {
      backgroundImage: `url(${imageUrl})`
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "open-image-button",
    onClick: onEditImage
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `rttpg-media-actions`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button rttpg-btn-delete",
    onClick: () => onDeleteImage()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-label": __('Close'),
    className: "far fa-trash-alt fa-fw"
  }))));
}

ImageAvater.propTypes = {
  imageUrl: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired),
  onDeleteImage: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageAvater);

/***/ }),

/***/ "./src/components/Media.js":
/*!*********************************!*\
  !*** ./src/components/Media.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dashicon": () => (/* binding */ Dashicon),
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_media_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/media.scss */ "./src/components/scss/media.scss");

const {
  __
} = wp.i18n;

const {
  Component
} = wp.element;
const {
  MediaUpload
} = wp.blockEditor;
const {
  Tooltip,
  Dashicon
} = wp.components;

class Media extends Component {
  setSettings(media) {
    const {
      multiple,
      onChange,
      value
    } = this.props;

    if (multiple) {
      let medias = [];
      media.forEach(single => {
        if (single && single.url) {
          medias.push({
            url: single.url,
            id: single.id
          });
        }
      });
      onChange(value ? value.concat(medias) : medias);
    } else {
      if (media && media.url) {
        onChange({
          url: media.url,
          id: media.id
        });
      }
    }
  }

  removeImage(id) {
    const {
      multiple,
      onChange
    } = this.props;

    if (multiple) {
      let value = this.props.value.slice();
      value.splice(id, 1);
      onChange(value);
    } else {
      onChange({});
    }
  }

  isUrl(url) {
    if (['wbm', 'jpg', 'jpeg', 'gif', 'png', 'svg'].indexOf(url.split('.').pop().toLowerCase()) != -1) {
      return url;
    } else {
      return rttpgParams.plugin_url + 'assets/images/tpg-placeholder.jpg';
    }
  }

  render() {
    const {
      type,
      multiple,
      value,
      panel,
      video
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "rttpg-media"
    }, this.props.label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, this.props.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
      onSelect: val => this.setSettings(val),
      allowedTypes: type.length ? [...type] : ['image'],
      multiple: multiple || false,
      value: value,
      render: _ref => {
        let {
          open
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "rttpg-single-img"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, multiple ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, value.length > 0 && value.map((v, index) => {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
            className: "rttpg-media-image-parent"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            src: this.isUrl(v.url),
            alt: __('image')
          }), panel && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "rttpg-media-actions rttpg-field-button-list"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
            text: __('Edit')
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
            className: "rttpg-button",
            "aria-label": __('Edit'),
            onClick: open,
            role: "button"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
            "aria-label": __('Edit'),
            className: "fas fa-pencil-alt fa-fw"
          }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
            text: __('Remove')
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
            className: "rttpg-button",
            "aria-label": __('Remove'),
            onClick: () => this.removeImage(index),
            role: "button"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
            "aria-label": __('Close'),
            className: "far fa-trash-alt fa-fw"
          })))));
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          onClick: open,
          className: "rttpg-placeholder-image"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "dashicon dashicons dashicons-insert"
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('Insert')))) : value && value.url ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "rttpg-media-image-parent"
        }, video ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
          controls: true,
          autoPlay: true,
          loop: true,
          src: value.url
        }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: this.isUrl(value.url),
          alt: __('image')
        }), panel && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "rttpg-media-actions rttpg-field-button-list"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
          text: __('Edit')
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
          className: "rttpg-button",
          "aria-label": __('Edit'),
          onClick: open,
          role: "button"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          "aria-label": __('Edit'),
          className: "fas fa-pencil-alt fa-fw"
        }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
          text: __('Remove')
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
          className: "rttpg-button",
          "aria-label": __('Remove'),
          onClick: () => this.removeImage(value.id),
          role: "button"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          "aria-label": __('Close'),
          className: "far fa-trash-alt fa-fw"
        }))))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          onClick: open,
          className: "rttpg-placeholder-image"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "dashicon dashicons dashicons-insert"
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('Insert')))));
      }
    }));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Media);

/***/ }),

/***/ "./src/components/Range.js":
/*!*********************************!*\
  !*** ./src/components/Range.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_rangeDevice_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/rangeDevice.scss */ "./src/components/scss/rangeDevice.scss");


const {
  RangeControl,
  Button
} = wp.components;


function Range(props) {
  const {
    label,
    value: data,
    onChange,
    min,
    max,
    step,
    reset
  } = props;
  const dataAttributes = {
    min,
    max,
    step
  };

  const setSettings = val => {
    onChange(val);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-range-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rttpg-cf-head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "rttpg-label"
  }, label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rttpg-cf-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RangeControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    value: data,
    onChange: val => {
      setSettings(val);
    }
  }, dataAttributes)), reset && data ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    isSmall: true,
    className: "rttpg-undo-btn",
    icon: "image-rotate",
    onClick: () => onChange(0)
  }) : ''));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Range);

/***/ }),

/***/ "./src/components/RangeDevice.js":
/*!***************************************!*\
  !*** ./src/components/RangeDevice.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Devices */ "./src/components/Devices.js");
/* harmony import */ var _scss_rangeDevice_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/rangeDevice.scss */ "./src/components/scss/rangeDevice.scss");


const {
  __
} = wp.i18n;
const {
  useState
} = wp.element;
const {
  RangeControl,
  Button
} = wp.components;



function RangeDevice(props) {
  const {
    label,
    value: data,
    onChange,
    responsive,
    min,
    max,
    units,
    step,
    defultValue = {}
  } = props;
  const [device, setDevice] = useState(() => window.rttpgDevice || 'lg');
  const [unit, setUnit] = useState('px');
  const dataAttributes = {
    min,
    max,
    step
  };
  const dftData = defultValue;

  const updateUnit = _unit => {
    const newData = JSON.parse(JSON.stringify(data));

    if (false !== units) {
      newData.unit = _unit;
    }

    onChange(newData);
    setUnit(_unit);
  };

  const setSettings = val => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[device] = val;

    if (false !== units) {
      newData.unit = newData.unit || unit;
    }

    onChange(newData);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-range-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rttpg-cf-head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rt-left-part"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "rttpg-label"
  }, label), responsive && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Devices__WEBPACK_IMPORTED_MODULE_2__["default"], {
    device: device,
    onChange: _device => {
      setDevice(_device);
      const newData = JSON.parse(JSON.stringify(data));

      if (!newData[_device]) {
        newData[_device] = '';

        if (false !== units) {
          newData.unit = newData.unit || unit;
        }
      }

      onChange(newData);
    }
  })), units && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rt-right-part"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rttpg-units-choices"
  }, (units && Array.isArray(units) ? units : ['px', 'em', '%']).map(_unit => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: (data === null || data === void 0 ? void 0 : data.unit) === _unit || !(data !== null && data !== void 0 && data.unit) && _unit === unit ? 'active' : '',
    onClick: () => updateUnit(_unit)
  }, _unit))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "rttpg-cf-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RangeControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "rttpg-control-field",
    value: data[device],
    onChange: val => {
      setSettings(val);
    }
  }, dataAttributes)), (data[device] || data[device] !== 0) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    isSmall: true,
    className: "rttpg-undo-btn",
    icon: "image-rotate",
    onClick: () => onChange(dftData)
  })));
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RangeDevice);

/***/ }),

/***/ "./src/components/SelectObj1.js":
/*!**************************************!*\
  !*** ./src/components/SelectObj1.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Devices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Devices */ "./src/components/Devices.js");
/* harmony import */ var _scss_SelectObj1_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/SelectObj1.scss */ "./src/components/scss/SelectObj1.scss");


const {
  useState,
  useEffect
} = wp.element;
const {
  BaseControl,
  SelectControl,
  Button
} = wp.components;


function SelectObj1(props) {
  const {
    label,
    value,
    onChange,
    responsive,
    name,
    options
  } = props;
  const [device, setDevice] = useState(() => window.rttpgDevice || 'lg');
  const defaultData = {
    [device]: ''
  };

  const setSettings = val => {
    const newData = JSON.parse(JSON.stringify(value));

    if (responsive) {
      newData[name][device] = val;
    } else {
      newData[name] = val;
    } //newData[device][name] = val;


    onChange(newData);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-bg-property"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label), responsive && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Devices__WEBPACK_IMPORTED_MODULE_1__["default"], {
    device: device,
    onChange: _device => {
      setDevice(_device);
      const newData = JSON.parse(JSON.stringify(value));

      if (!newData[name]) {
        newData[name] = defaultData;
        onChange(newData);
      }
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    value: responsive ? value[name][device] : value[name],
    options: options,
    onChange: val => setSettings(val)
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectObj1);

/***/ }),

/***/ "./src/components/Styles.js":
/*!**********************************!*\
  !*** ./src/components/Styles.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/styles.scss */ "./src/components/scss/styles.scss");

const {
  __
} = wp.i18n;


function Styles(props) {
  const {
    label,
    value,
    options,
    columns = 3,
    onChange
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-styles-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-cf-head"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `rttpg-style-list rttpg-style-columns-${columns}`
  }, options.map((data, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    role: "button",
    tabindex: index,
    "aria-label": data.label ? data.label : '',
    onClick: () => onChange(data.value),
    className: `${value == data.value ? 'rttpg-active' : ''}`
  }, data.icon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-layout rttpg-style-icon"
  }, data.icon), data.svg && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-layout rttpg-style-svg"
  }, data.svg), data.img && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-layout rttpg-style-img"
  }, data.img), data.label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, data.label)))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Styles);

/***/ }),

/***/ "./src/components/Typography.js":
/*!**************************************!*\
  !*** ./src/components/Typography.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RangeDevice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RangeDevice */ "./src/components/RangeDevice.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./src/components/Constants.js");
/* harmony import */ var _scss_typography_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/typography.scss */ "./src/components/scss/typography.scss");

const {
  __
} = wp.i18n;
const {
  useState,
  useEffect
} = wp.element;
const {
  Dropdown,
  Button,
  SelectControl
} = wp.components;




function Typography(props) {
  const {
    label,
    value: data,
    onChange
  } = props;

  const setSettings = (val, type) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[type] = val;
    onChange(newData);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-control-field rttpg-cf-typography-wrap"
  }, label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "rttpg-label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rttpg-typography"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
    className: "rttpg-typography-dropdown-icon",
    contentClassName: "rttpg-components-popover rttpg-cp-typography-content",
    position: "bottom right",
    renderToggle: _ref => {
      let {
        isOpen,
        onToggle
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        isSmall: true,
        onClick: onToggle,
        "aria-expanded": isOpen,
        icon: "edit"
      });
    },
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "rttpg-typography-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RangeDevice__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __('Font Size'),
      responsive: true,
      value: data['size'],
      units: ['px', 'em', '%'],
      min: 1,
      max: data["size"]["unit"] === "em" ? 10 : 200,
      step: data["size"]["unit"] === "em" ? 0.1 : 1,
      onChange: val => setSettings(val, 'size')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: __("Font Weight"),
      value: data["weight"],
      options: _Constants__WEBPACK_IMPORTED_MODULE_2__.FONT_WEIGHTS,
      onChange: val => setSettings(val, 'weight')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: __("Text Transform"),
      value: data["transform"],
      options: _Constants__WEBPACK_IMPORTED_MODULE_2__.TEXT_TRANSFORM,
      onChange: val => setSettings(val, 'transform')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RangeDevice__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __('Letter Spacing'),
      responsive: true,
      value: data['spacing'],
      units: ['px', 'em'],
      min: -5,
      max: data["spacing"]["unit"] === "em" ? 10 : 100,
      step: data["spacing"]["unit"] === "em" ? 0.1 : 1,
      onChange: val => setSettings(val, 'spacing')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RangeDevice__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: __('Line Height'),
      responsive: true,
      value: data['height'],
      units: ['px', 'em'],
      min: 1,
      max: data["height"]["unit"] === "em" ? 10 : 100,
      step: data["height"]["unit"] === "em" ? 0.1 : 1,
      onChange: val => setSettings(val, 'height')
    }))
  })));
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Typography);

/***/ }),

/***/ "./src/components/assets/iconList.js":
/*!*******************************************!*\
  !*** ./src/components/assets/iconList.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['fas fa-ad', 'fas fa-address-book', 'fas fa-address-card', 'fas fa-adjust', 'fas fa-air-freshener', 'fas fa-align-center', 'fas fa-align-justify', 'fas fa-align-left', 'fas fa-align-right', 'fas fa-allergies', 'fas fa-ambulance', 'fas fa-american-sign-language-interpreting', 'fas fa-anchor', 'fas fa-angle-double-down', 'fas fa-angle-double-left', 'fas fa-angle-double-right', 'fas fa-angle-double-up', 'fas fa-angle-down', 'fas fa-angle-left', 'fas fa-angle-right', 'fas fa-angle-up', 'fas fa-angry', 'fas fa-ankh', 'fas fa-apple-alt', 'fas fa-archive', 'fas fa-archway', 'fas fa-arrow-alt-circle-down', 'fas fa-arrow-alt-circle-left', 'fas fa-arrow-alt-circle-right', 'fas fa-arrow-alt-circle-up', 'fas fa-arrow-circle-down', 'fas fa-arrow-circle-left', 'fas fa-arrow-circle-right', 'fas fa-arrow-circle-up', 'fas fa-arrow-down', 'fas fa-arrow-left', 'fas fa-arrow-right', 'fas fa-arrow-up', 'fas fa-arrows-alt', 'fas fa-arrows-alt-h', 'fas fa-arrows-alt-v', 'fas fa-assistive-listening-systems', 'fas fa-asterisk', 'fas fa-at', 'fas fa-atlas', 'fas fa-atom', 'fas fa-audio-description', 'fas fa-award', 'fas fa-baby', 'fas fa-baby-carriage', 'fas fa-backspace', 'fas fa-backward', 'fas fa-balance-scale', 'fas fa-ban', 'fas fa-band-aid', 'fas fa-barcode', 'fas fa-bars', 'fas fa-baseball-ball', 'fas fa-basketball-ball', 'fas fa-bath', 'fas fa-battery-empty', 'fas fa-battery-full', 'fas fa-battery-half', 'fas fa-battery-quarter', 'fas fa-battery-three-quarters', 'fas fa-bed', 'fas fa-beer', 'fas fa-bell', 'fas fa-bell-slash', 'fas fa-bezier-curve', 'fas fa-bible', 'fas fa-bicycle', 'fas fa-binoculars', 'fas fa-biohazard', 'fas fa-birthday-cake', 'fas fa-blender', 'fas fa-blender-phone', 'fas fa-blind', 'fas fa-blog', 'fas fa-bold', 'fas fa-bolt', 'fas fa-bomb', 'fas fa-bone', 'fas fa-bong', 'fas fa-book', 'fas fa-book-dead', 'fas fa-book-open', 'fas fa-book-reader', 'fas fa-bookmark', 'fas fa-bowling-ball', 'fas fa-box', 'fas fa-box-open', 'fas fa-boxes', 'fas fa-braille', 'fas fa-brain', 'fas fa-briefcase', 'fas fa-briefcase-medical', 'fas fa-broadcast-tower', 'fas fa-broom', 'fas fa-brush', 'fas fa-bug', 'fas fa-building', 'fas fa-bullhorn', 'fas fa-bullseye', 'fas fa-burn', 'fas fa-bus', 'fas fa-bus-alt', 'fas fa-business-time', 'fas fa-calculator', 'fas fa-calendar', 'fas fa-calendar-alt', 'fas fa-calendar-check', 'fas fa-calendar-day', 'fas fa-calendar-minus', 'fas fa-calendar-plus', 'fas fa-calendar-times', 'fas fa-calendar-week', 'fas fa-camera', 'fas fa-camera-retro', 'fas fa-campground', 'fas fa-candy-cane', 'fas fa-cannabis', 'fas fa-capsules', 'fas fa-car', 'fas fa-car-alt', 'fas fa-car-battery', 'fas fa-car-crash', 'fas fa-car-side', 'fas fa-caret-down', 'fas fa-caret-left', 'fas fa-caret-right', 'fas fa-caret-square-down', 'fas fa-caret-square-left', 'fas fa-caret-square-right', 'fas fa-caret-square-up', 'fas fa-caret-up', 'fas fa-carrot', 'fas fa-cart-arrow-down', 'fas fa-cart-plus', 'fas fa-cash-register', 'fas fa-cat', 'fas fa-certificate', 'fas fa-chair', 'fas fa-chalkboard', 'fas fa-chalkboard-teacher', 'fas fa-charging-station', 'fas fa-chart-area', 'fas fa-chart-bar', 'fas fa-chart-line', 'fas fa-chart-pie', 'fas fa-check', 'fas fa-check-circle', 'fas fa-check-double', 'fas fa-check-square', 'fas fa-chess', 'fas fa-chess-bishop', 'fas fa-chess-board', 'fas fa-chess-king', 'fas fa-chess-knight', 'fas fa-chess-pawn', 'fas fa-chess-queen', 'fas fa-chess-rook', 'fas fa-chevron-circle-down', 'fas fa-chevron-circle-left', 'fas fa-chevron-circle-right', 'fas fa-chevron-circle-up', 'fas fa-chevron-down', 'fas fa-chevron-left', 'fas fa-chevron-right', 'fas fa-chevron-up', 'fas fa-child', 'fas fa-church', 'fas fa-circle', 'fas fa-circle-notch', 'fas fa-city', 'fas fa-clipboard', 'fas fa-clipboard-check', 'fas fa-clipboard-list', 'fas fa-clock', 'fas fa-clone', 'fas fa-closed-captioning', 'fas fa-cloud', 'fas fa-cloud-download-alt', 'fas fa-cloud-meatball', 'fas fa-cloud-moon', 'fas fa-cloud-moon-rain', 'fas fa-cloud-rain', 'fas fa-cloud-showers-heavy', 'fas fa-cloud-sun', 'fas fa-cloud-sun-rain', 'fas fa-cloud-upload-alt', 'fas fa-cocktail', 'fas fa-code', 'fas fa-code-branch', 'fas fa-coffee', 'fas fa-cog', 'fas fa-cogs', 'fas fa-coins', 'fas fa-columns', 'fas fa-comment', 'fas fa-comment-alt', 'fas fa-comment-dollar', 'fas fa-comment-dots', 'fas fa-comment-slash', 'fas fa-comments', 'fas fa-comments-dollar', 'fas fa-compact-disc', 'fas fa-compass', 'fas fa-compress', 'fas fa-compress-arrows-alt', 'fas fa-concierge-bell', 'fas fa-cookie', 'fas fa-cookie-bite', 'fas fa-copy', 'fas fa-copyright', 'fas fa-couch', 'fas fa-credit-card', 'fas fa-crop', 'fas fa-crop-alt', 'fas fa-cross', 'fas fa-crosshairs', 'fas fa-crow', 'fas fa-crown', 'fas fa-cube', 'fas fa-cubes', 'fas fa-cut', 'fas fa-database', 'fas fa-deaf', 'fas fa-democrat', 'fas fa-desktop', 'fas fa-dharmachakra', 'fas fa-diagnoses', 'fas fa-dice', 'fas fa-dice-d20', 'fas fa-dice-d6', 'fas fa-dice-five', 'fas fa-dice-four', 'fas fa-dice-one', 'fas fa-dice-six', 'fas fa-dice-three', 'fas fa-dice-two', 'fas fa-digital-tachograph', 'fas fa-directions', 'fas fa-divide', 'fas fa-dizzy', 'fas fa-dna', 'fas fa-dog', 'fas fa-dollar-sign', 'fas fa-dolly', 'fas fa-dolly-flatbed', 'fas fa-donate', 'fas fa-door-closed', 'fas fa-door-open', 'fas fa-dot-circle', 'fas fa-dove', 'fas fa-download', 'fas fa-drafting-compass', 'fas fa-dragon', 'fas fa-draw-polygon', 'fas fa-drum', 'fas fa-drum-steelpan', 'fas fa-drumstick-bite', 'fas fa-dumbbell', 'fas fa-dumpster', 'fas fa-dumpster-fire', 'fas fa-dungeon', 'fas fa-edit', 'fas fa-eject', 'fas fa-ellipsis-h', 'fas fa-ellipsis-v', 'fas fa-envelope', 'fas fa-envelope-open', 'fas fa-envelope-open-text', 'fas fa-envelope-square', 'fas fa-equals', 'fas fa-eraser', 'fas fa-ethernet', 'fas fa-euro-sign', 'fas fa-exchange-alt', 'fas fa-exclamation', 'fas fa-exclamation-circle', 'fas fa-exclamation-triangle', 'fas fa-expand', 'fas fa-expand-arrows-alt', 'fas fa-external-link-alt', 'fas fa-external-link-square-alt', 'fas fa-eye', 'fas fa-eye-dropper', 'fas fa-eye-slash', 'fas fa-fast-backward', 'fas fa-fast-forward', 'fas fa-fax', 'fas fa-feather', 'fas fa-feather-alt', 'fas fa-female', 'fas fa-fighter-jet', 'fas fa-file', 'fas fa-file-alt', 'fas fa-file-archive', 'fas fa-file-audio', 'fas fa-file-code', 'fas fa-file-contract', 'fas fa-file-csv', 'fas fa-file-download', 'fas fa-file-excel', 'fas fa-file-export', 'fas fa-file-image', 'fas fa-file-import', 'fas fa-file-invoice', 'fas fa-file-invoice-dollar', 'fas fa-file-medical', 'fas fa-file-medical-alt', 'fas fa-file-pdf', 'fas fa-file-powerpoint', 'fas fa-file-prescription', 'fas fa-file-signature', 'fas fa-file-upload', 'fas fa-file-video', 'fas fa-file-word', 'fas fa-fill', 'fas fa-fill-drip', 'fas fa-film', 'fas fa-filter', 'fas fa-fingerprint', 'fas fa-fire', 'fas fa-fire-alt', 'fas fa-fire-extinguisher', 'fas fa-first-aid', 'fas fa-fish', 'fas fa-fist-raised', 'fas fa-flag', 'fas fa-flag-checkered', 'fas fa-flag-usa', 'fas fa-flask', 'fas fa-flushed', 'fas fa-folder', 'fas fa-folder-minus', 'fas fa-folder-open', 'fas fa-folder-plus', 'fas fa-font', 'fas fa-football-ball', 'fas fa-forward', 'fas fa-frog', 'fas fa-frown', 'fas fa-frown-open', 'fas fa-funnel-dollar', 'fas fa-futbol', 'fas fa-gamepad', 'fas fa-gas-pump', 'fas fa-gavel', 'fas fa-gem', 'fas fa-genderless', 'fas fa-ghost', 'fas fa-gift', 'fas fa-gifts', 'fas fa-glass-cheers', 'fas fa-glass-martini', 'fas fa-glass-martini-alt', 'fas fa-glass-whiskey', 'fas fa-glasses', 'fas fa-globe', 'fas fa-globe-africa', 'fas fa-globe-americas', 'fas fa-globe-asia', 'fas fa-globe-europe', 'fas fa-golf-ball', 'fas fa-gopuram', 'fas fa-graduation-cap', 'fas fa-greater-than', 'fas fa-greater-than-equal', 'fas fa-grimace', 'fas fa-grin', 'fas fa-grin-alt', 'fas fa-grin-beam', 'fas fa-grin-beam-sweat', 'fas fa-grin-hearts', 'fas fa-grin-squint', 'fas fa-grin-squint-tears', 'fas fa-grin-stars', 'fas fa-grin-tears', 'fas fa-grin-tongue', 'fas fa-grin-tongue-squint', 'fas fa-grin-tongue-wink', 'fas fa-grin-wink', 'fas fa-grip-horizontal', 'fas fa-grip-lines', 'fas fa-grip-lines-vertical', 'fas fa-grip-vertical', 'fas fa-guitar', 'fas fa-h-square', 'fas fa-hammer', 'fas fa-hamsa', 'fas fa-hand-holding', 'fas fa-hand-holding-heart', 'fas fa-hand-holding-usd', 'fas fa-hand-lizard', 'fas fa-hand-paper', 'fas fa-hand-peace', 'fas fa-hand-point-down', 'fas fa-hand-point-left', 'fas fa-hand-point-right', 'fas fa-hand-point-up', 'fas fa-hand-pointer', 'fas fa-hand-rock', 'fas fa-hand-scissors', 'fas fa-hand-spock', 'fas fa-hands', 'fas fa-hands-helping', 'fas fa-handshake', 'fas fa-hanukiah', 'fas fa-hashtag', 'fas fa-hat-wizard', 'fas fa-haykal', 'fas fa-hdd', 'fas fa-heading', 'fas fa-headphones', 'fas fa-headphones-alt', 'fas fa-headset', 'fas fa-heart', 'fas fa-heart-broken', 'fas fa-heartbeat', 'fas fa-helicopter', 'fas fa-highlighter', 'fas fa-hiking', 'fas fa-hippo', 'fas fa-history', 'fas fa-hockey-puck', 'fas fa-holly-berry', 'fas fa-home', 'fas fa-horse', 'fas fa-horse-head', 'fas fa-hospital', 'fas fa-hospital-alt', 'fas fa-hospital-symbol', 'fas fa-hot-tub', 'fas fa-hotel', 'fas fa-hourglass', 'fas fa-hourglass-end', 'fas fa-hourglass-half', 'fas fa-hourglass-start', 'fas fa-house-damage', 'fas fa-hryvnia', 'fas fa-i-cursor', 'fas fa-icicles', 'fas fa-id-badge', 'fas fa-id-card', 'fas fa-id-card-alt', 'fas fa-igloo', 'fas fa-image', 'fas fa-images', 'fas fa-inbox', 'fas fa-indent', 'fas fa-industry', 'fas fa-infinity', 'fas fa-info', 'fas fa-info-circle', 'fas fa-italic', 'fas fa-jedi', 'fas fa-joint', 'fas fa-journal-whills', 'fas fa-kaaba', 'fas fa-key', 'fas fa-keyboard', 'fas fa-khanda', 'fas fa-kiss', 'fas fa-kiss-beam', 'fas fa-kiss-wink-heart', 'fas fa-kiwi-bird', 'fas fa-landmark', 'fas fa-language', 'fas fa-laptop', 'fas fa-laptop-code', 'fas fa-laugh', 'fas fa-laugh-beam', 'fas fa-laugh-squint', 'fas fa-laugh-wink', 'fas fa-layer-group', 'fas fa-leaf', 'fas fa-lemon', 'fas fa-less-than', 'fas fa-less-than-equal', 'fas fa-level-down-alt', 'fas fa-level-up-alt', 'fas fa-life-ring', 'fas fa-lightbulb', 'fas fa-link', 'fas fa-lira-sign', 'fas fa-list', 'fas fa-list-alt', 'fas fa-list-ol', 'fas fa-list-ul', 'fas fa-location-arrow', 'fas fa-lock', 'fas fa-lock-open', 'fas fa-long-arrow-alt-down', 'fas fa-long-arrow-alt-left', 'fas fa-long-arrow-alt-right', 'fas fa-long-arrow-alt-up', 'fas fa-low-vision', 'fas fa-luggage-cart', 'fas fa-magic', 'fas fa-magnet', 'fas fa-mail-bulk', 'fas fa-male', 'fas fa-map', 'fas fa-map-marked', 'fas fa-map-marked-alt', 'fas fa-map-marker', 'fas fa-map-marker-alt', 'fas fa-map-pin', 'fas fa-map-signs', 'fas fa-marker', 'fas fa-mars', 'fas fa-mars-double', 'fas fa-mars-stroke', 'fas fa-mars-stroke-h', 'fas fa-mars-stroke-v', 'fas fa-mask', 'fas fa-medal', 'fas fa-medkit', 'fas fa-meh', 'fas fa-meh-blank', 'fas fa-meh-rolling-eyes', 'fas fa-memory', 'fas fa-menorah', 'fas fa-mercury', 'fas fa-meteor', 'fas fa-microchip', 'fas fa-microphone', 'fas fa-microphone-alt', 'fas fa-microphone-alt-slash', 'fas fa-microphone-slash', 'fas fa-microscope', 'fas fa-minus', 'fas fa-minus-circle', 'fas fa-minus-square', 'fas fa-mitten', 'fas fa-mobile', 'fas fa-mobile-alt', 'fas fa-money-bill', 'fas fa-money-bill-alt', 'fas fa-money-bill-wave', 'fas fa-money-bill-wave-alt', 'fas fa-money-check', 'fas fa-money-check-alt', 'fas fa-monument', 'fas fa-moon', 'fas fa-mortar-pestle', 'fas fa-mosque', 'fas fa-motorcycle', 'fas fa-mountain', 'fas fa-mouse-pointer', 'fas fa-mug-hot', 'fas fa-music', 'fas fa-network-wired', 'fas fa-neuter', 'fas fa-newspaper', 'fas fa-not-equal', 'fas fa-notes-medical', 'fas fa-object-group', 'fas fa-object-ungroup', 'fas fa-oil-can', 'fas fa-om', 'fas fa-otter', 'fas fa-outdent', 'fas fa-paint-brush', 'fas fa-paint-roller', 'fas fa-palette', 'fas fa-pallet', 'fas fa-paper-plane', 'fas fa-paperclip', 'fas fa-parachute-box', 'fas fa-paragraph', 'fas fa-parking', 'fas fa-passport', 'fas fa-pastafarianism', 'fas fa-paste', 'fas fa-pause', 'fas fa-pause-circle', 'fas fa-paw', 'fas fa-peace', 'fas fa-pen', 'fas fa-pen-alt', 'fas fa-pen-fancy', 'fas fa-pen-nib', 'fas fa-pen-square', 'fas fa-pencil-alt', 'fas fa-pencil-ruler', 'fas fa-people-carry', 'fas fa-percent', 'fas fa-percentage', 'fas fa-person-booth', 'fas fa-phone', 'fas fa-phone-slash', 'fas fa-phone-square', 'fas fa-phone-volume', 'fas fa-piggy-bank', 'fas fa-pills', 'fas fa-place-of-worship', 'fas fa-plane', 'fas fa-plane-arrival', 'fas fa-plane-departure', 'fas fa-play', 'fas fa-play-circle', 'fas fa-plug', 'fas fa-plus', 'fas fa-plus-circle', 'fas fa-plus-square', 'fas fa-podcast', 'fas fa-poll', 'fas fa-poll-h', 'fas fa-poo', 'fas fa-poo-storm', 'fas fa-poop', 'fas fa-portrait', 'fas fa-pound-sign', 'fas fa-power-off', 'fas fa-pray', 'fas fa-praying-hands', 'fas fa-prescription', 'fas fa-prescription-bottle', 'fas fa-prescription-bottle-alt', 'fas fa-print', 'fas fa-procedures', 'fas fa-project-diagram', 'fas fa-puzzle-piece', 'fas fa-qrcode', 'fas fa-question', 'fas fa-question-circle', 'fas fa-quidditch', 'fas fa-quote-left', 'fas fa-quote-right', 'fas fa-quran', 'fas fa-radiation', 'fas fa-radiation-alt', 'fas fa-rainbow', 'fas fa-random', 'fas fa-receipt', 'fas fa-recycle', 'fas fa-redo', 'fas fa-redo-alt', 'fas fa-registered', 'fas fa-reply', 'fas fa-reply-all', 'fas fa-republican', 'fas fa-restroom', 'fas fa-retweet', 'fas fa-ribbon', 'fas fa-ring', 'fas fa-road', 'fas fa-robot', 'fas fa-rocket', 'fas fa-route', 'fas fa-rss', 'fas fa-rss-square', 'fas fa-ruble-sign', 'fas fa-ruler', 'fas fa-ruler-combined', 'fas fa-ruler-horizontal', 'fas fa-ruler-vertical', 'fas fa-running', 'fas fa-rupee-sign', 'fas fa-sad-cry', 'fas fa-sad-tear', 'fas fa-satellite', 'fas fa-satellite-dish', 'fas fa-save', 'fas fa-school', 'fas fa-screwdriver', 'fas fa-scroll', 'fas fa-sd-card', 'fas fa-search', 'fas fa-search-dollar', 'fas fa-search-location', 'fas fa-search-minus', 'fas fa-search-plus', 'fas fa-seedling', 'fas fa-server', 'fas fa-shapes', 'fas fa-share', 'fas fa-share-alt', 'fas fa-share-alt-square', 'fas fa-share-square', 'fas fa-shekel-sign', 'fas fa-shield-alt', 'fas fa-ship', 'fas fa-shipping-fast', 'fas fa-shoe-prints', 'fas fa-shopping-bag', 'fas fa-shopping-basket', 'fas fa-shopping-cart', 'fas fa-shower', 'fas fa-shuttle-van', 'fas fa-sign', 'fas fa-sign-in-alt', 'fas fa-sign-language', 'fas fa-sign-out-alt', 'fas fa-signal', 'fas fa-signature', 'fas fa-sim-card', 'fas fa-sitemap', 'fas fa-skating', 'fas fa-skiing', 'fas fa-skiing-nordic', 'fas fa-skull', 'fas fa-skull-crossbones', 'fas fa-slash', 'fas fa-sleigh', 'fas fa-sliders-h', 'fas fa-smile', 'fas fa-smile-beam', 'fas fa-smile-wink', 'fas fa-smog', 'fas fa-smoking', 'fas fa-smoking-ban', 'fas fa-sms', 'fas fa-snowboarding', 'fas fa-snowflake', 'fas fa-snowman', 'fas fa-snowplow', 'fas fa-socks', 'fas fa-solar-panel', 'fas fa-sort', 'fas fa-sort-alpha-down', 'fas fa-sort-alpha-up', 'fas fa-sort-amount-down', 'fas fa-sort-amount-up', 'fas fa-sort-down', 'fas fa-sort-numeric-down', 'fas fa-sort-numeric-up', 'fas fa-sort-up', 'fas fa-spa', 'fas fa-space-shuttle', 'fas fa-spider', 'fas fa-spinner', 'fas fa-splotch', 'fas fa-spray-can', 'fas fa-square', 'fas fa-square-full', 'fas fa-square-root-alt', 'fas fa-stamp', 'fas fa-star', 'fas fa-star-and-crescent', 'fas fa-star-half', 'fas fa-star-half-alt', 'fas fa-star-of-david', 'fas fa-star-of-life', 'fas fa-step-backward', 'fas fa-step-forward', 'fas fa-stethoscope', 'fas fa-sticky-note', 'fas fa-stop', 'fas fa-stop-circle', 'fas fa-stopwatch', 'fas fa-store', 'fas fa-store-alt', 'fas fa-stream', 'fas fa-street-view', 'fas fa-strikethrough', 'fas fa-stroopwafel', 'fas fa-subscript', 'fas fa-subway', 'fas fa-suitcase', 'fas fa-suitcase-rolling', 'fas fa-sun', 'fas fa-superscript', 'fas fa-surprise', 'fas fa-swatchbook', 'fas fa-swimmer', 'fas fa-swimming-pool', 'fas fa-synagogue', 'fas fa-sync', 'fas fa-sync-alt', 'fas fa-syringe', 'fas fa-table', 'fas fa-table-tennis', 'fas fa-tablet', 'fas fa-tablet-alt', 'fas fa-tablets', 'fas fa-tachometer-alt', 'fas fa-tag', 'fas fa-tags', 'fas fa-tape', 'fas fa-tasks', 'fas fa-taxi', 'fas fa-teeth', 'fas fa-teeth-open', 'fas fa-temperature-high', 'fas fa-temperature-low', 'fas fa-tenge', 'fas fa-terminal', 'fas fa-text-height', 'fas fa-text-width', 'fas fa-th', 'fas fa-th-large', 'fas fa-th-list', 'fas fa-theater-masks', 'fas fa-thermometer', 'fas fa-thermometer-empty', 'fas fa-thermometer-full', 'fas fa-thermometer-half', 'fas fa-thermometer-quarter', 'fas fa-thermometer-three-quarters', 'fas fa-thumbs-down', 'fas fa-thumbs-up', 'fas fa-thumbtack', 'fas fa-ticket-alt', 'fas fa-times', 'fas fa-times-circle', 'fas fa-tint', 'fas fa-tint-slash', 'fas fa-tired', 'fas fa-toggle-off', 'fas fa-toggle-on', 'fas fa-toilet', 'fas fa-toilet-paper', 'fas fa-toolbox', 'fas fa-tools', 'fas fa-tooth', 'fas fa-torah', 'fas fa-torii-gate', 'fas fa-tractor', 'fas fa-trademark', 'fas fa-traffic-light', 'fas fa-train', 'fas fa-tram', 'fas fa-transgender', 'fas fa-transgender-alt', 'fas fa-trash', 'fas fa-trash-alt', 'fas fa-tree', 'fas fa-trophy', 'fas fa-truck', 'fas fa-truck-loading', 'fas fa-truck-monster', 'fas fa-truck-moving', 'fas fa-truck-pickup', 'fas fa-tshirt', 'fas fa-tty', 'fas fa-tv', 'fas fa-umbrella', 'fas fa-umbrella-beach', 'fas fa-underline', 'fas fa-undo', 'fas fa-undo-alt', 'fas fa-universal-access', 'fas fa-university', 'fas fa-unlink', 'fas fa-unlock', 'fas fa-unlock-alt', 'fas fa-upload', 'fas fa-user', 'fas fa-user-alt', 'fas fa-user-alt-slash', 'fas fa-user-astronaut', 'fas fa-user-check', 'fas fa-user-circle', 'fas fa-user-clock', 'fas fa-user-cog', 'fas fa-user-edit', 'fas fa-user-friends', 'fas fa-user-graduate', 'fas fa-user-injured', 'fas fa-user-lock', 'fas fa-user-md', 'fas fa-user-minus', 'fas fa-user-ninja', 'fas fa-user-plus', 'fas fa-user-secret', 'fas fa-user-shield', 'fas fa-user-slash', 'fas fa-user-tag', 'fas fa-user-tie', 'fas fa-user-times', 'fas fa-users', 'fas fa-users-cog', 'fas fa-utensil-spoon', 'fas fa-utensils', 'fas fa-vector-square', 'fas fa-venus', 'fas fa-venus-double', 'fas fa-venus-mars', 'fas fa-vial', 'fas fa-vials', 'fas fa-video', 'fas fa-video-slash', 'fas fa-vihara', 'fas fa-volleyball-ball', 'fas fa-volume-down', 'fas fa-volume-mute', 'fas fa-volume-off', 'fas fa-volume-up', 'fas fa-vote-yea', 'fas fa-vr-cardboard', 'fas fa-walking', 'fas fa-wallet', 'fas fa-warehouse', 'fas fa-water', 'fas fa-weight', 'fas fa-weight-hanging', 'fas fa-wheelchair', 'fas fa-wifi', 'fas fa-wind', 'fas fa-window-close', 'fas fa-window-maximize', 'fas fa-window-minimize', 'fas fa-window-restore', 'fas fa-wine-bottle', 'fas fa-wine-glass', 'fas fa-wine-glass-alt', 'fas fa-won-sign', 'fas fa-wrench', 'fas fa-x-ray', 'fas fa-yen-sign', 'fas fa-yin-yang', 'far fa-address-book', 'far fa-address-card', 'far fa-angry', 'far fa-arrow-alt-circle-down', 'far fa-arrow-alt-circle-left', 'far fa-arrow-alt-circle-right', 'far fa-arrow-alt-circle-up', 'far fa-bell', 'far fa-bell-slash', 'far fa-bookmark', 'far fa-building', 'far fa-calendar', 'far fa-calendar-alt', 'far fa-calendar-check', 'far fa-calendar-minus', 'far fa-calendar-plus', 'far fa-calendar-times', 'far fa-caret-square-down', 'far fa-caret-square-left', 'far fa-caret-square-right', 'far fa-caret-square-up', 'far fa-chart-bar', 'far fa-check-circle', 'far fa-check-square', 'far fa-circle', 'far fa-clipboard', 'far fa-clock', 'far fa-clone', 'far fa-closed-captioning', 'far fa-comment', 'far fa-comment-alt', 'far fa-comment-dots', 'far fa-comments', 'far fa-compass', 'far fa-copy', 'far fa-copyright', 'far fa-credit-card', 'far fa-dizzy', 'far fa-dot-circle', 'far fa-edit', 'far fa-envelope', 'far fa-envelope-open', 'far fa-eye', 'far fa-eye-slash', 'far fa-file', 'far fa-file-alt', 'far fa-file-archive', 'far fa-file-audio', 'far fa-file-code', 'far fa-file-excel', 'far fa-file-image', 'far fa-file-pdf', 'far fa-file-powerpoint', 'far fa-file-video', 'far fa-file-word', 'far fa-flag', 'far fa-flushed', 'far fa-folder', 'far fa-folder-open', 'far fa-frown', 'far fa-frown-open', 'far fa-futbol', 'far fa-gem', 'far fa-grimace', 'far fa-grin', 'far fa-grin-alt', 'far fa-grin-beam', 'far fa-grin-beam-sweat', 'far fa-grin-hearts', 'far fa-grin-squint', 'far fa-grin-squint-tears', 'far fa-grin-stars', 'far fa-grin-tears', 'far fa-grin-tongue', 'far fa-grin-tongue-squint', 'far fa-grin-tongue-wink', 'far fa-grin-wink', 'far fa-hand-lizard', 'far fa-hand-paper', 'far fa-hand-peace', 'far fa-hand-point-down', 'far fa-hand-point-left', 'far fa-hand-point-right', 'far fa-hand-point-up', 'far fa-hand-pointer', 'far fa-hand-rock', 'far fa-hand-scissors', 'far fa-hand-spock', 'far fa-handshake', 'far fa-hdd', 'far fa-heart', 'far fa-hospital', 'far fa-hourglass', 'far fa-id-badge', 'far fa-id-card', 'far fa-image', 'far fa-images', 'far fa-keyboard', 'far fa-kiss', 'far fa-kiss-beam', 'far fa-kiss-wink-heart', 'far fa-laugh', 'far fa-laugh-beam', 'far fa-laugh-squint', 'far fa-laugh-wink', 'far fa-lemon', 'far fa-life-ring', 'far fa-lightbulb', 'far fa-list-alt', 'far fa-map', 'far fa-meh', 'far fa-meh-blank', 'far fa-meh-rolling-eyes', 'far fa-minus-square', 'far fa-money-bill-alt', 'far fa-moon', 'far fa-newspaper', 'far fa-object-group', 'far fa-object-ungroup', 'far fa-paper-plane', 'far fa-pause-circle', 'far fa-play-circle', 'far fa-plus-square', 'far fa-question-circle', 'far fa-registered', 'far fa-sad-cry', 'far fa-sad-tear', 'far fa-save', 'far fa-share-square', 'far fa-smile', 'far fa-smile-beam', 'far fa-smile-wink', 'far fa-snowflake', 'far fa-square', 'far fa-star', 'far fa-star-half', 'far fa-sticky-note', 'far fa-stop-circle', 'far fa-sun', 'far fa-surprise', 'far fa-thumbs-down', 'far fa-thumbs-up', 'far fa-times-circle', 'far fa-tired', 'far fa-trash-alt', 'far fa-user', 'far fa-user-circle', 'far fa-window-close', 'far fa-window-maximize', 'far fa-window-minimize', 'far fa-window-restore', 'fab fa-500px', 'fab fa-accessible-icon', 'fab fa-accusoft', 'fab fa-acquisitions-incorporated', 'fab fa-adn', 'fab fa-adobe', 'fab fa-adversal', 'fab fa-affiliatetheme', 'fab fa-algolia', 'fab fa-alipay', 'fab fa-amazon', 'fab fa-amazon-pay', 'fab fa-amilia', 'fab fa-android', 'fab fa-angellist', 'fab fa-angrycreative', 'fab fa-angular', 'fab fa-app-store', 'fab fa-app-store-ios', 'fab fa-apper', 'fab fa-apple', 'fab fa-apple-pay', 'fab fa-artstation', 'fab fa-asymmetrik', 'fab fa-atlassian', 'fab fa-audible', 'fab fa-autoprefixer', 'fab fa-avianex', 'fab fa-aviato', 'fab fa-aws', 'fab fa-bandcamp', 'fab fa-behance', 'fab fa-behance-square', 'fab fa-bimobject', 'fab fa-bitbucket', 'fab fa-bitcoin', 'fab fa-bity', 'fab fa-black-tie', 'fab fa-blackberry', 'fab fa-blogger', 'fab fa-blogger-b', 'fab fa-bluetooth', 'fab fa-bluetooth-b', 'fab fa-btc', 'fab fa-buromobelexperte', 'fab fa-buysellads', 'fab fa-canadian-maple-leaf', 'fab fa-cc-amazon-pay', 'fab fa-cc-amex', 'fab fa-cc-apple-pay', 'fab fa-cc-diners-club', 'fab fa-cc-discover', 'fab fa-cc-jcb', 'fab fa-cc-mastercard', 'fab fa-cc-paypal', 'fab fa-cc-stripe', 'fab fa-cc-visa', 'fab fa-centercode', 'fab fa-centos', 'fab fa-chrome', 'fab fa-cloudscale', 'fab fa-cloudsmith', 'fab fa-cloudversify', 'fab fa-codepen', 'fab fa-codiepie', 'fab fa-confluence', 'fab fa-connectdevelop', 'fab fa-contao', 'fab fa-cpanel', 'fab fa-creative-commons', 'fab fa-creative-commons-by', 'fab fa-creative-commons-nc', 'fab fa-creative-commons-nc-eu', 'fab fa-creative-commons-nc-jp', 'fab fa-creative-commons-nd', 'fab fa-creative-commons-pd', 'fab fa-creative-commons-pd-alt', 'fab fa-creative-commons-remix', 'fab fa-creative-commons-sa', 'fab fa-creative-commons-sampling', 'fab fa-creative-commons-sampling-plus', 'fab fa-creative-commons-share', 'fab fa-creative-commons-zero', 'fab fa-critical-role', 'fab fa-css3', 'fab fa-css3-alt', 'fab fa-cuttlefish', 'fab fa-d-and-d', 'fab fa-d-and-d-beyond', 'fab fa-dashcube', 'fab fa-delicious', 'fab fa-deploydog', 'fab fa-deskpro', 'fab fa-dev', 'fab fa-deviantart', 'fab fa-dhl', 'fab fa-diaspora', 'fab fa-digg', 'fab fa-digital-ocean', 'fab fa-discord', 'fab fa-discourse', 'fab fa-dochub', 'fab fa-docker', 'fab fa-draft2digital', 'fab fa-dribbble', 'fab fa-dribbble-square', 'fab fa-dropbox', 'fab fa-drupal', 'fab fa-dyalog', 'fab fa-earlybirds', 'fab fa-ebay', 'fab fa-edge', 'fab fa-elementor', 'fab fa-ello', 'fab fa-ember', 'fab fa-empire', 'fab fa-envira', 'fab fa-erlang', 'fab fa-ethereum', 'fab fa-etsy', 'fab fa-expeditedssl', 'fab fa-facebook', 'fab fa-facebook-f', 'fab fa-facebook-messenger', 'fab fa-facebook-square', 'fab fa-fantasy-flight-games', 'fab fa-fedex', 'fab fa-fedora', 'fab fa-figma', 'fab fa-firefox', 'fab fa-first-order', 'fab fa-first-order-alt', 'fab fa-firstdraft', 'fab fa-flickr', 'fab fa-flipboard', 'fab fa-fly', 'fab fa-font-awesome', 'fab fa-font-awesome-alt', 'fab fa-font-awesome-flag', 'fab fa-fonticons', 'fab fa-fonticons-fi', 'fab fa-fort-awesome', 'fab fa-fort-awesome-alt', 'fab fa-forumbee', 'fab fa-foursquare', 'fab fa-free-code-camp', 'fab fa-freebsd', 'fab fa-fulcrum', 'fab fa-galactic-republic', 'fab fa-galactic-senate', 'fab fa-get-pocket', 'fab fa-gg', 'fab fa-gg-circle', 'fab fa-git', 'fab fa-git-square', 'fab fa-github', 'fab fa-github-alt', 'fab fa-github-square', 'fab fa-gitkraken', 'fab fa-gitlab', 'fab fa-gitter', 'fab fa-glide', 'fab fa-glide-g', 'fab fa-gofore', 'fab fa-goodreads', 'fab fa-goodreads-g', 'fab fa-google', 'fab fa-google-drive', 'fab fa-google-play', 'fab fa-google-plus', 'fab fa-google-plus-g', 'fab fa-google-plus-square', 'fab fa-google-wallet', 'fab fa-gratipay', 'fab fa-grav', 'fab fa-gripfire', 'fab fa-grunt', 'fab fa-gulp', 'fab fa-hacker-news', 'fab fa-hacker-news-square', 'fab fa-hackerrank', 'fab fa-hips', 'fab fa-hire-a-helper', 'fab fa-hooli', 'fab fa-hornbill', 'fab fa-hotjar', 'fab fa-houzz', 'fab fa-html5', 'fab fa-hubspot', 'fab fa-imdb', 'fab fa-instagram', 'fab fa-intercom', 'fab fa-internet-explorer', 'fab fa-invision', 'fab fa-ioxhost', 'fab fa-itunes', 'fab fa-itunes-note', 'fab fa-java', 'fab fa-jedi-order', 'fab fa-jenkins', 'fab fa-jira', 'fab fa-joget', 'fab fa-joomla', 'fab fa-js', 'fab fa-js-square', 'fab fa-jsfiddle', 'fab fa-kaggle', 'fab fa-keybase', 'fab fa-keycdn', 'fab fa-kickstarter', 'fab fa-kickstarter-k', 'fab fa-korvue', 'fab fa-laravel', 'fab fa-lastfm', 'fab fa-lastfm-square', 'fab fa-leanpub', 'fab fa-less', 'fab fa-line', 'fab fa-linkedin', 'fab fa-linkedin-in', 'fab fa-linode', 'fab fa-linux', 'fab fa-lyft', 'fab fa-magento', 'fab fa-mailchimp', 'fab fa-mandalorian', 'fab fa-markdown', 'fab fa-mastodon', 'fab fa-maxcdn', 'fab fa-medapps', 'fab fa-medium', 'fab fa-medium-m', 'fab fa-medrt', 'fab fa-meetup', 'fab fa-megaport', 'fab fa-mendeley', 'fab fa-microsoft', 'fab fa-mix', 'fab fa-mixcloud', 'fab fa-mizuni', 'fab fa-modx', 'fab fa-monero', 'fab fa-napster', 'fab fa-neos', 'fab fa-nimblr', 'fab fa-nintendo-switch', 'fab fa-node', 'fab fa-node-js', 'fab fa-npm', 'fab fa-ns8', 'fab fa-nutritionix', 'fab fa-odnoklassniki', 'fab fa-odnoklassniki-square', 'fab fa-old-republic', 'fab fa-opencart', 'fab fa-openid', 'fab fa-opera', 'fab fa-optin-monster', 'fab fa-osi', 'fab fa-page4', 'fab fa-pagelines', 'fab fa-palfed', 'fab fa-patreon', 'fab fa-paypal', 'fab fa-penny-arcade', 'fab fa-periscope', 'fab fa-phabricator', 'fab fa-phoenix-framework', 'fab fa-phoenix-squadron', 'fab fa-php', 'fab fa-pied-piper', 'fab fa-pied-piper-alt', 'fab fa-pied-piper-hat', 'fab fa-pied-piper-pp', 'fab fa-pinterest', 'fab fa-pinterest-p', 'fab fa-pinterest-square', 'fab fa-playstation', 'fab fa-product-hunt', 'fab fa-pushed', 'fab fa-python', 'fab fa-qq', 'fab fa-quinscape', 'fab fa-quora', 'fab fa-r-project', 'fab fa-raspberry-pi', 'fab fa-ravelry', 'fab fa-react', 'fab fa-reacteurope', 'fab fa-readme', 'fab fa-rebel', 'fab fa-red-river', 'fab fa-reddit', 'fab fa-reddit-alien', 'fab fa-reddit-square', 'fab fa-redhat', 'fab fa-renren', 'fab fa-replyd', 'fab fa-researchgate', 'fab fa-resolving', 'fab fa-rev', 'fab fa-rocketchat', 'fab fa-rockrms', 'fab fa-safari', 'fab fa-sass', 'fab fa-schlix', 'fab fa-scribd', 'fab fa-searchengin', 'fab fa-sellcast', 'fab fa-sellsy', 'fab fa-servicestack', 'fab fa-shirtsinbulk', 'fab fa-shopware', 'fab fa-simplybuilt', 'fab fa-sistrix', 'fab fa-sith', 'fab fa-sketch', 'fab fa-skyatlas', 'fab fa-skype', 'fab fa-slack', 'fab fa-slack-hash', 'fab fa-slideshare', 'fab fa-snapchat', 'fab fa-snapchat-ghost', 'fab fa-snapchat-square', 'fab fa-soundcloud', 'fab fa-sourcetree', 'fab fa-speakap', 'fab fa-spotify', 'fab fa-squarespace', 'fab fa-stack-exchange', 'fab fa-stack-overflow', 'fab fa-staylinked', 'fab fa-steam', 'fab fa-steam-square', 'fab fa-steam-symbol', 'fab fa-sticker-mule', 'fab fa-strava', 'fab fa-stripe', 'fab fa-stripe-s', 'fab fa-studiovinari', 'fab fa-stumbleupon', 'fab fa-stumbleupon-circle', 'fab fa-superpowers', 'fab fa-supple', 'fab fa-suse', 'fab fa-teamspeak', 'fab fa-telegram', 'fab fa-telegram-plane', 'fab fa-tencent-weibo', 'fab fa-the-red-yeti', 'fab fa-themeco', 'fab fa-themeisle', 'fab fa-think-peaks', 'fab fa-trade-federation', 'fab fa-trello', 'fab fa-tripadvisor', 'fab fa-tumblr', 'fab fa-tumblr-square', 'fab fa-twitch', 'fab fa-twitter', 'fab fa-twitter-square', 'fab fa-typo3', 'fab fa-uber', 'fab fa-ubuntu', 'fab fa-uikit', 'fab fa-uniregistry', 'fab fa-untappd', 'fab fa-ups', 'fab fa-usb', 'fab fa-usps', 'fab fa-ussunnah', 'fab fa-vaadin', 'fab fa-viacoin', 'fab fa-viadeo', 'fab fa-viadeo-square', 'fab fa-viber', 'fab fa-vimeo', 'fab fa-vimeo-square', 'fab fa-vimeo-v', 'fab fa-vine', 'fab fa-vk', 'fab fa-vnv', 'fab fa-vuejs', 'fab fa-weebly', 'fab fa-weibo', 'fab fa-weixin', 'fab fa-whatsapp', 'fab fa-whatsapp-square', 'fab fa-whmcs', 'fab fa-wikipedia-w', 'fab fa-windows', 'fab fa-wix', 'fab fa-wizards-of-the-coast', 'fab fa-wolf-pack-battalion', 'fab fa-wordpress', 'fab fa-wordpress-simple', 'fab fa-wpbeginner', 'fab fa-wpexplorer', 'fab fa-wpforms', 'fab fa-wpressr', 'fab fa-xbox', 'fab fa-xing', 'fab fa-xing-square', 'fab fa-y-combinator', 'fab fa-yahoo', 'fab fa-yandex', 'fab fa-yandex-international', 'fab fa-yarn', 'fab fa-yelp', 'fab fa-yoast', 'fab fa-youtube', 'fab fa-youtube-square', 'fab fa-zhihu']);

/***/ }),

/***/ "./src/components/icon/icons.js":
/*!**************************************!*\
  !*** ./src/components/icon/icons.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  __
} = wp.i18n;
const icons = {};
const img_path = rttpgParams.plugin_url + '/assets/images';
icons.grid_layout1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid1.png`,
  alt: __('Grid Layout 1')
});
icons.grid_layout2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_layout8.png`,
  alt: __('Grid Layout 2')
});
icons.grid_layout3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid12.png`,
  alt: __('Grid Layout 3')
});
icons.grid_layout4 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid2.png`,
  alt: __('Grid Layout 4')
});
icons.grid_layout5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_layout9.png`,
  alt: __('Grid Layout 5')
});
icons.grid_layout6 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_layout9-2.png`,
  alt: __('Grid Layout 6')
});
icons.grid_layout7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_layout10.png`,
  alt: __('Grid Layout 7')
});
icons.grid_layout8 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_layout10-2.png`,
  alt: __('Grid Layout 8')
});
icons.grid_layout9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/gallery.png`,
  alt: __('Grid Layout 9')
});
icons.list_layout1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/list1.png`,
  alt: __('List Layout 1')
});
icons.list_layout2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/list3.png`,
  alt: __('List Layout 2')
});
icons.list_layout3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/list3-2.png`,
  alt: __('List Layout 3')
});
icons.list_layout4 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/list4.png`,
  alt: __('List Layout 4')
});
icons.list_layout5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/list4-2.png`,
  alt: __('List Layout 5')
});
icons.list_layout6 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/list_layout1.png`,
  alt: __('List Layout 6')
});
icons.list_layout7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/list_layout2.png`,
  alt: __('List Layout 7')
});
icons.grid_hover1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid3.png`,
  alt: __('Grid Hover Layout 1')
});
icons.grid_hover2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid4.png`,
  alt: __('Grid Hover Layout 2')
});
icons.grid_hover3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid5.png`,
  alt: __('Grid Hover Layout 3')
});
icons.grid_hover4 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid16.png`,
  alt: __('Grid Hover Layout 4')
});
icons.grid_hover5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid16-2.png`,
  alt: __('Grid Hover Layout 5')
});
icons.grid_hover6 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover10.png`,
  alt: __('Grid Hover Layout 6')
});
icons.grid_hover7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover10-2.png`,
  alt: __('Grid Hover Layout 7')
});
icons.grid_hover8 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover11.png`,
  alt: __('Grid Hover Layout 8')
});
icons.grid_hover9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover11-2.png`,
  alt: __('Grid Hover Layout 9')
});
icons.grid_hover10 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover12.png`,
  alt: __('Grid Hover Layout 10')
});
icons.grid_hover11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover12-2.png`,
  alt: __('Grid Hover Layout 11')
});
icons.grid_hover12 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover13.png`,
  alt: __('Grid Hover Layout 12')
});
icons.grid_hover13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover9.png`,
  alt: __('Grid Hover Layout 13')
});
icons.grid_hover14 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover9-2.png`,
  alt: __('Grid Hover Layout 14')
});
icons.grid_hover15 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover15.png`,
  alt: __('Grid Hover Layout 15')
});
icons.grid_hover16 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/grid_hover16.png`,
  alt: __('Grid Hover Layout 16')
});
icons.slider_layout1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel1.png`,
  alt: __('Slider Layout 1')
});
icons.slider_layout2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel1.1.png`,
  alt: __('Slider Layout 2')
});
icons.slider_layout3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel1.3.png`,
  alt: __('Slider Layout 3')
});
icons.slider_layout4 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel2.2.png`,
  alt: __('Slider Layout 4')
});
icons.slider_layout5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel2.png`,
  alt: __('Slider Layout 5')
});
icons.slider_layout6 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel6.6.png`,
  alt: __('Slider Layout 6')
});
icons.slider_layout7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel7.7.png`,
  alt: __('Slider Layout 7')
});
icons.slider_layout8 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel8.8.png`,
  alt: __('Slider Layout 8')
});
icons.slider_layout9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel9.9.png`,
  alt: __('Slider Layout 9')
});
icons.slider_layout10 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/carousel10.2.png`,
  alt: __('Slider Layout 10')
});
icons.slider_layout11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/slider_layout11.png`,
  alt: __('Slider Layout 11')
});
icons.slider_layout12 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/slider_layout12.png`,
  alt: __('Slider Layout 12')
});
icons.slider_layout13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/slider_layout13.png`,
  alt: __('Slider Layout 13')
});
icons.slider_layout14 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: `${img_path}/layouts/slider_layout14.png`,
  alt: __('Slider Layout 14')
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icons);

/***/ }),

/***/ "./src/components/pagination/Pagination.js":
/*!*************************************************!*\
  !*** ./src/components/pagination/Pagination.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page */ "./src/components/pagination/page.js");


const {
  Component
} = wp.element;

class Pagination extends Component {
  render() {
    const {
      total,
      current,
      prevText,
      nextText,
      baseClassName,
      onClickPage
    } = this.props;

    if (!total) {
      return null;
    }

    let endSize = this.props.endSize < 1 ? 1 : this.props.endSize;
    let midSize = this.props.midSize < 0 ? 2 : this.props.midSize;
    let dots = false;
    let pages = [];

    if (current && current > 1) {
      pages.push({
        isCurrent: false,
        key: "prev",
        onClick: () => onClickPage(current - 1),
        text: prevText
      });
    }

    for (let n = 1; n <= this.props.total; n++) {
      let isCurrent = n === current;

      if (isCurrent) {
        dots = true;
        pages.push({
          isCurrent: true,
          key: n,
          onClick: () => onClickPage(n),
          className: "pages",
          text: n
        });
      } else {
        if (n <= endSize || current && n >= current - midSize && n <= current + midSize || n > total - endSize) {
          pages.push({
            isLink: true,
            key: n,
            onClick: () => onClickPage(n),
            className: "pages",
            text: n
          });
          dots = true;
        } else if (dots) {
          pages.push({
            isDots: true,
            key: n,
            onClick: () => console.log('dots'),
            className: "pages",
            text: "..."
          });
          dots = false;
        }
      }
    }

    if (current && current < total) {
      pages.push({
        isCurrent: false,
        key: "next",
        onClick: () => onClickPage(current + 1),
        text: nextText
      });
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: baseClassName
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "pagination-list"
    }, pages.map(_ref => {
      let {
        isCurrent,
        key,
        text,
        className,
        onClick,
        isDots,
        isLink
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_page__WEBPACK_IMPORTED_MODULE_1__["default"], {
        isCurrent: isCurrent,
        key: key,
        pageKey: key,
        onClick: () => onClick(),
        className: className,
        isDots: isDots,
        isLink: isLink
      }, text);
    })));
  }

}
;
Pagination.defaultProps = {
  total: 0,
  current: 1,
  prevText: '',
  nextText: '',
  endSize: 1,
  midSize: 2,
  baseClassName: 'rt-pagination'
};
Pagination.propTypes = {
  total: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  current: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  prevText: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  nextText: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  endSize: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  midSize: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  baseClassName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  onClickPage: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};

/***/ }),

/***/ "./src/components/pagination/page.js":
/*!*******************************************!*\
  !*** ./src/components/pagination/page.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);



const {
  Component
} = wp.element;
const {
  __
} = wp.i18n;

class Page extends Component {
  render() {
    const {
      className,
      isCurrent,
      isDots,
      children,
      pageKey,
      onClick
    } = this.props;
    const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, {
      'active': isCurrent
    }, {
      'dots': isDots
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      className: classes
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      onClick: () => onClick(),
      href: "#"
    }, pageKey === 'prev' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fas fa-angle-left"
    }), __(children), pageKey === 'next' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fas fa-angle-right"
    })));
  }

}

Page.defaultProps = {
  isCurrent: false,
  isDots: false,
  className: ''
};
Page.propTypes = {
  isCurrent: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  key: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  isDots: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);

/***/ }),

/***/ "./src/helpers/useClickOutside.js":
/*!****************************************!*\
  !*** ./src/helpers/useClickOutside.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
 // Improved version of https://usehooks.com/useOnClickOutside/

const useClickOutside = (ref, handler) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = event => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return; // Do nothing if clicking ref's element or descendent elements

      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    const validateEventStart = event => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useClickOutside);

/***/ }),

/***/ "./src/utils/css/CssGenerator.js":
/*!***************************************!*\
  !*** ./src/utils/css/CssGenerator.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CssGenerator": () => (/* binding */ CssGenerator),
/* harmony export */   "checkDepends": () => (/* binding */ checkDepends),
/* harmony export */   "objectAppend": () => (/* binding */ objectAppend),
/* harmony export */   "objectReplace": () => (/* binding */ objectReplace),
/* harmony export */   "singleField": () => (/* binding */ singleField)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _CssHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CssHelper */ "./src/utils/css/CssHelper.js");

 // Replace Value

const replaceData = (selector, key, value) => selector.replace(new RegExp(key, "g"), value); // Object Empty Check


const isEmpty = obj => (typeof obj === 'undefined' ? 'undefined' : (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) === 'object' && Object.keys(obj).length !== 0; // {{RTTPG}} Replace


const replaceWarp = (selector, ID) => {
  selector = selector.replace(new RegExp('{{RTTPG}}', "g"), '.rttpg-block-' + ID);
  selector = selector.replace(new RegExp('{{RTTPG_ID}}', "g"), 'block-' + ID);
  return selector;
};

const objectReplace = (warp, value) => {
  let output = '';
  value.forEach(function (sel) {
    output += sel + ';';
  });
  return warp + '{' + output + '}';
};
const objectAppend = (warp, value) => {
  let output = '';
  value.forEach(function (sel) {
    output += warp + sel;
  });
  return output;
}; // Plain String/Number Field CSS Replace

const singleField = (style, blockID, key, value) => {
  value = typeof value != 'object' ? value : objectField(value).data;

  if (typeof style == 'string') {
    if (style) {
      if (value) {
        const warpData = replaceWarp(style, blockID);

        if (typeof value == 'boolean') {
          return [warpData];
        } else {
          if (warpData.indexOf('{{') === -1 && warpData.indexOf('{') < 0) {
            return [warpData + value];
          } else {
            return [replaceData(warpData, '{{' + key + '}}', value)];
          }
        }
      } else {
        return [];
      }
    } else {
      return [replaceWarp(value, blockID)]; // Custom CSS Field
    }
  } else {
    const output = [];
    style.forEach(function (sel) {
      output.push(replaceData(replaceWarp(sel, blockID), '{{' + key + '}}', value));
    });
    return output;
  }
}; // Object Field CSS Replace

const objectField = (data, type) => {
  if (data.openTypography) {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssTypography)(data),
      action: 'append'
    }; //Typography
  } else if (data.openBg) {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssBackground)(data),
      action: 'append'
    }; //Background
  } else if (data.openBorder) {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssBorder)(data),
      action: 'append'
    }; //Border
  } else if (data.openShadow && data.color) {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssBoxShadow)(data),
      action: 'append'
    }; //Shadow
  } else if (data.openFilter) {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssFilter)(data),
      action: 'append'
    }; //Shadow
  } else if (data.direction) {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssGradient)(data, 'return'),
      action: 'append'
    }; //Gradient
  } else if (typeof data.top != 'undefined' || typeof data.left != 'undefined' || typeof data.right != 'undefined' || typeof data.bottom != 'undefined') {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssDimension)(data),
      action: 'replace'
    }; //Dimension
  } else if (data.openColor) {
    if (data.replace) {
      return {
        data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssColor)(data),
        action: 'replace'
      }; //Color Advanced
    } else {
      return {
        data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssColor)(data),
        action: 'append'
      }; //Color Advanced
    }
  } else if (data.openBGColor) {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssBackgroundColor)(data),
      action: 'append'
    };
  } else if (type === 'padding') {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssPadding)(data),
      action: 'append'
    }; //dimension
  } else if (type === 'borderRadius') {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssBorderRadius)(data),
      action: 'append'
    }; //dimension
  } else if (type === 'margin') {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssMargin)(data),
      action: 'append'
    }; //dimension
  } else if (type === 'border') {
    return {
      data: (0,_CssHelper__WEBPACK_IMPORTED_MODULE_1__.cssCustomBorder)(data),
      action: 'append'
    }; //dimension
  } else {
    return {
      data: '',
      action: 'append'
    };
  }
};

const checkDepends = (settings, selectData) => {
  let _depends = true;

  if (selectData.hasOwnProperty('depends')) {
    selectData.depends.forEach(data => {
      const previous = _depends;

      if (data.condition === '==' || data.condition === '===') {
        if (typeof data.value == 'string' || typeof data.value == 'number' || typeof data.value == 'boolean') {
          _depends = settings[data.key] === data.value;
        } else {
          let select = false;
          data.value.forEach(function (arrData) {
            if (settings[data.key] === arrData) {
              select = true;
            }
          });

          if (select) {
            _depends = true;
          }
        }
      } else if (data.condition === '!=' || data.condition === '!==') {
        if (typeof data.value == 'string' || typeof data.value == 'number' || typeof data.value == 'boolean') {
          _depends = settings[data.key] !== data.value;
        } else {
          let _select = false;
          data.value.forEach(function (arrData) {
            if (settings[data.key] !== arrData) {
              _select = true;
            }
          });

          if (_select) {
            _depends = true;
          }
        }
      }

      _depends = previous === false ? false : _depends;
    });
  }

  return _depends;
};
/**
 * @param {*} settings
 * @param {string} blockName
 * @param {*} blockID
 * @param isInline
 */

const CssGenerator = (settings, blockName, blockID, isInline) => {
  if (!blockID) return;
  let __CSS = '',
      lg = [],
      md = [],
      sm = [],
      xs = [],
      notResponsiveCss = [];
  Object.keys(settings).forEach(function (key) {
    var _wp$blocks$getBlockTy;

    const attributes = typeof blockName === 'string' ? (_wp$blocks$getBlockTy = wp.blocks.getBlockType('rttpg/' + blockName)) === null || _wp$blocks$getBlockTy === void 0 ? void 0 : _wp$blocks$getBlockTy.attributes : blockName;

    if (attributes && attributes[key] && attributes[key].hasOwnProperty('style')) {
      attributes[key].style.forEach((selectData, indexStyle) => {
        if (selectData.hasOwnProperty('selector')) {
          const cssSelector = selectData.selector;

          if (checkDepends(settings, selectData, key, indexStyle)) {
            if (typeof settings[key] == 'object') {
              let device = false;
              let dimension = '';

              if (settings[key].lg) {
                // Exta Large
                device = true;
                dimension = typeof settings[key].lg == 'object' ? objectField(settings[key].lg, settings[key].type).data : settings[key].lg + (settings[key].unit || '');
                lg = lg.concat(singleField(cssSelector, blockID, key, dimension));
              }

              if (settings[key].md) {
                // Desktop
                device = true;
                dimension = typeof settings[key].md == 'object' ? objectField(settings[key].md, settings[key].type).data : settings[key].md + (settings[key].unit || '');
                md = md.concat(singleField(cssSelector, blockID, key, dimension));
              }

              if (settings[key].sm) {
                // Tablet
                device = true;
                dimension = typeof settings[key].sm == 'object' ? objectField(settings[key].sm, settings[key].type).data : settings[key].sm + (settings[key].unit || '');
                sm = sm.concat(singleField(cssSelector, blockID, key, dimension));
              }

              if (settings[key].xs) {
                // Phone
                device = true;
                dimension = typeof settings[key].xs == 'object' ? objectField(settings[key].xs, settings[key].type).data : settings[key].xs + (settings[key].unit || '');
                xs = xs.concat(singleField(cssSelector, blockID, key, dimension));
              }

              if (!device) {
                // Object Field Type Only
                const objectCss = objectField(settings[key], settings[key].type);
                const repWarp = replaceWarp(cssSelector, blockID);

                if (typeof objectCss.data == 'object') {
                  if (Object.keys(objectCss.data).length !== 0) {
                    if (objectCss.data.background) {
                      notResponsiveCss.push(repWarp + objectCss.data.background);
                    } // Typography


                    if (isEmpty(objectCss.data.lg)) {
                      lg.push(objectReplace(repWarp, objectCss.data.lg));
                    }

                    if (isEmpty(objectCss.data.md)) {
                      md.push(objectReplace(repWarp, objectCss.data.md));
                    }

                    if (isEmpty(objectCss.data.sm)) {
                      sm.push(objectReplace(repWarp, objectCss.data.sm));
                    }

                    if (isEmpty(objectCss.data.xs)) {
                      xs.push(objectReplace(repWarp, objectCss.data.xs));
                    }

                    if (objectCss.data.simple) {
                      notResponsiveCss.push(repWarp + objectCss.data.simple);
                    }

                    if (objectCss.data.font) {
                      lg.unshift(objectCss.data.font);
                    }

                    if (objectCss.data.shape) {
                      objectCss.data.shape.forEach(function (el) {
                        notResponsiveCss.push(repWarp + el);
                      });

                      if (isEmpty(objectCss.data.data.lg)) {
                        lg.push(objectAppend(repWarp, objectCss.data.data.lg));
                      }

                      if (isEmpty(objectCss.data.data.md)) {
                        md.push(objectAppend(repWarp, objectCss.data.data.md));
                      }

                      if (isEmpty(objectCss.data.data.sm)) {
                        sm.push(objectAppend(repWarp, objectCss.data.data.sm));
                      }

                      if (isEmpty(objectCss.data.data.xs)) {
                        xs.push(objectAppend(repWarp, objectCss.data.data.xs));
                      }
                    }
                  }
                } else if (objectCss.data && objectCss.data.indexOf('{{') === -1) {
                  if (objectCss.action === 'append') {
                    notResponsiveCss.push(repWarp + objectCss.data);
                  } else {
                    notResponsiveCss.push(singleField(cssSelector, blockID, key, objectCss.data));
                  }
                }
              }
            } else {
              if (key === 'hideTablet') {
                if (isInline) {
                  sm = sm.concat(singleField(cssSelector, blockID, key, settings[key]));
                }
              } else if (key === 'hideMobile') {
                if (isInline) {
                  xs = xs.concat(singleField(cssSelector, blockID, key, settings[key]));
                }
              } else {
                if (settings[key]) {
                  notResponsiveCss = notResponsiveCss.concat(singleField(cssSelector, blockID, key, settings[key]));
                }
              }
            }
          }
        }
      });
    }
  }); // Join CSS
  //lg

  if (lg.length > 0) {
    __CSS += lg.join('');
  } //md


  if (md.length > 0) {
    __CSS += '@media (max-width: 1024px) {' + md.join('') + '}';
  } //sm


  if (sm.length > 0) {
    __CSS += '@media (max-width: 767px) {' + sm.join('') + '}';
  } //xs
  // if (xs.length > 0) {
  // 	__CSS += '@media (max-width: 768px) {' + xs.join('') + '}';
  // } 


  if (notResponsiveCss.length > 0) {
    __CSS += notResponsiveCss.join('');
  }

  if (isInline) {
    return __CSS;
  } // Set CSS


  setStyle(__CSS, blockID);
}; //Set CSS to Head
// const setStyle = function setStyle(styleCss, blockID) {
// 	const styleSelector = window.document;
// 	const cssId = 'rttpg-block-css-' + blockID;
// 	if (styleSelector.getElementById(cssId) === null) {
// 		const cssInline = document.createElement('style');
// 		cssInline.id = cssId;
// 		cssInline.innerHTML = styleCss;
// 		styleSelector.getElementsByTagName("head")[0].appendChild(cssInline);
// 	} else {
// 		styleSelector.getElementById(cssId).innerHTML = styleCss;
// 	}
// };

const setStyle = function setStyle(styleCss, blockID) {
  const cssId = 'rttpg-block-css-' + blockID;
  const iFrame = document.querySelector('iframe[name=editor-canvas]');

  if (iFrame) {
    setTimeout(function () {
      const doc = iFrame.contentDocument;

      if (doc) {
        const iframeHead = doc.getElementsByTagName('head')[0];

        if (doc.getElementById(cssId) === null && iframeHead) {
          const cssInline = document.createElement('style');
          cssInline.id = cssId;
          cssInline.innerHTML = styleCss;
          iframeHead.appendChild(cssInline);
        } else {
          doc.getElementById(cssId).innerHTML = styleCss;
        }

        if (doc.getElementById('rttpg-frontend-css') === null) {
          const link = doc.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = rttpgParams.plugin_url + '/assets/css/frontend.css';
          link.setAttribute('id', 'rttpg-frontend-css');
          iframeHead.appendChild(link);
        } // if (doc.getElementById('rttpg-preview-jquery') === null) {
        // 	const script = doc.createElement('script');
        // 	script.src = rttpgParams.site_url + '/wp-includes/js/jquery/jquery.min.js';
        // 	script.setAttribute('id', 'rttpg-preview-jquery');
        // 	iframeHead.appendChild(script);
        // }
        // if (doc.getElementById('rttpg-frontend-blocks-js') === null) {
        // 	const script = doc.createElement('script');
        // 	script.src = rttpgParams.plugin_url + '/assets/js/frontend-blocks.js';
        // 	script.setAttribute('id', 'rttpg-frontend-blocks-js');
        // 	iframeHead.appendChild(script);
        // }

      }
    }, 1);
  } else {
    const styleSelector = window.document;

    if (styleSelector.getElementById(cssId) === null) {
      const cssInline = document.createElement('style');
      cssInline.id = cssId;
      cssInline.innerHTML = styleCss;
      styleSelector.getElementsByTagName('head')[0].appendChild(cssInline);
    } else {
      styleSelector.getElementById(cssId).innerHTML = styleCss;
    }
  }
};

/***/ }),

/***/ "./src/utils/css/CssHelper.js":
/*!************************************!*\
  !*** ./src/utils/css/CssHelper.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cssBackground": () => (/* binding */ cssBackground),
/* harmony export */   "cssBackgroundColor": () => (/* binding */ cssBackgroundColor),
/* harmony export */   "cssBorder": () => (/* binding */ cssBorder),
/* harmony export */   "cssBorderRadius": () => (/* binding */ cssBorderRadius),
/* harmony export */   "cssBoxShadow": () => (/* binding */ cssBoxShadow),
/* harmony export */   "cssColor": () => (/* binding */ cssColor),
/* harmony export */   "cssCustomBorder": () => (/* binding */ cssCustomBorder),
/* harmony export */   "cssDimension": () => (/* binding */ cssDimension),
/* harmony export */   "cssFilter": () => (/* binding */ cssFilter),
/* harmony export */   "cssGradient": () => (/* binding */ cssGradient),
/* harmony export */   "cssMargin": () => (/* binding */ cssMargin),
/* harmony export */   "cssPadding": () => (/* binding */ cssPadding),
/* harmony export */   "cssTypography": () => (/* binding */ cssTypography)
/* harmony export */ });
// CSS Gradient
var cssGradient = function cssGradient(v, type) {
  let gradietValue = v.type === 'linear' ? 'linear-gradient(' + v.direction + 'deg, ' : 'radial-gradient( circle at ' + v.radial + ' , ';
  gradietValue += v.color1 + ' ' + v.start + '%,' + v.color2 + ' ' + v.stop + '%)';

  if (type === 'object') {
    return {
      background: gradietValue
    };
  } else {
    gradietValue = 'background:' + gradietValue + (v.clip ? '-webkit-background-clip: text; -webkit-text-fill-color: transparent;' : '');
    return '{' + gradietValue + '}';
  }
}; // CSS Box Shadow

var cssBoxShadow = function cssBoxShadow(v) {
  let data = '{';
  data += 'box-shadow:' + (v.inset ? 'inset' : '') + ' ' + v.width.top + 'px ' + v.width.right + 'px ' + v.width.bottom + 'px ' + v.width.left + 'px ' + v.color + ';';

  if (v.transition !== undefined) {
    data += 'transition: box-shadow ' + v.transition + 's;';
  }

  data += '}';
  return data; //return '{ box-shadow:' + (v.inset ? 'inset' : '') + ' ' + v.width.top + 'px ' + v.width.right + 'px ' + v.width.bottom + 'px ' + v.width.left + 'px ' + v.color + '; transition: box-shadow 0.5s;}';
}; // CSS Filter

var cssFilter = function cssFilter(v) {
  let data = '{';

  if (v.opacity !== undefined && v.opacity !== '') {
    data += 'opacity:' + v.opacity + ';';
  }

  data += 'filter:' + 'brightness(' + v.filter.brightness + '% ) ' + 'contrast(' + v.filter.contrast + '% ) ' + 'saturate(' + v.filter.saturate + '% ) ' + 'blur(' + v.filter.blur + 'px ) ' + 'hue-rotate(' + v.filter['hue-rotate'] + 'deg )' + ';';

  if (v.transition !== undefined && v.transition !== '') {
    data += 'transition: filter ' + v.transition + 's;';
  }

  data += '}';
  return data;
}; // CSS Border

var cssBorder = function cssBorder(v) {
  v = Object.assign({}, {
    type: 'solid',
    width: {},
    color: '#e5e5e5'
  }, v);
  const unit = v.width.unit ? v.width.unit : 'px';
  return '{ border-color:  ' + (v.color ? v.color : '#555d66') + '; border-style: ' + (v.type ? v.type : 'solid') + '; border-width: ' + cssDimension(v.width) + '; }';
}; // CSS Typography

const _device = function _device(val, selector) {
  let data = {};

  if (val && val.lg) {
    data.lg = selector.replace(new RegExp('{{key}}', "g"), val.lg + (val.unit || ''));
  }

  if (val && val.md) {
    data.md = selector.replace(new RegExp('{{key}}', "g"), val.md + (val.unit || ''));
  }

  if (val && val.sm) {
    data.sm = selector.replace(new RegExp('{{key}}', "g"), val.sm + (val.unit || ''));
  }

  if (val && val.xs) {
    data.xs = selector.replace(new RegExp('{{key}}', "g"), val.xs + (val.unit || ''));
  }

  return data;
};

const _push = function _push(val, data) {
  if (val.lg) {
    data.lg.push(val.lg);
  }

  if (val.md) {
    data.md.push(val.md);
  }

  if (val.sm) {
    data.sm.push(val.sm);
  }

  if (val.xs) {
    data.xs.push(val.xs);
  }

  return data;
};

var cssTypography = function cssTypography(v) {
  let font = '';

  if (v.family && v.family !== 'none') {
    if (!['Arial', 'Tahoma', 'Verdana', 'Helvetica', 'Times New Roman', 'Trebuchet MS', 'Georgia'].includes(v.family)) {
      font = "@import url('https://fonts.googleapis.com/css?family=" + v.family.replace(' ', '+') + ':' + (v.weight || 400) + "');";
    }
  }

  let data = {
    lg: [],
    md: [],
    sm: [],
    xs: []
  };

  if (v.size) {
    data = _push(_device(v.size, 'font-size:{{key}}'), data);
  }

  if (v.height) {
    data = _push(_device(v.height, 'line-height:{{key}} !important'), data);
  }

  if (v.spacing) {
    data = _push(_device(v.spacing, 'letter-spacing:{{key}}'), data);
  }

  const simple = '{' + (v.family && v.family !== 'none' ? "font-family:'" + v.family + "'," + (v.type || "sans-serif") + ";" : '') + (v.weight ? 'font-weight:' + v.weight + ';' : '') + (v.color ? 'color:' + v.color + ';' : '') + (v.style ? 'font-style:' + v.style + ';' : '') + (v.transform ? 'text-transform:' + v.transform + ';' : '') + (v.decoration ? 'text-decoration:' + v.decoration + ';' : '') + '}';
  return {
    lg: data.lg,
    md: data.md,
    sm: data.sm,
    xs: data.xs,
    simple: simple,
    font: font
  };
}; // CSS Dimension

const cssDimension = function cssDimension(v) {
  const unit = v.unit ? v.unit : 'px';
  let data = '';

  if (v.top || v.top === 0) {
    data += v.top + unit + ' ';
  }

  if (v.right || v.right === 0) {
    data += v.right + unit + ' ';
  }

  if (v.bottom || v.bottom === 0) {
    data += v.bottom + unit + ' ';
  }

  if (v.left || v.left === 0) {
    data += v.left + unit + ' ';
  }

  return data; //return (v.top || 0) + unit + ' ' + (v.right || 0) + unit + ' ' + (v.bottom || 0) + unit + ' ' + (v.left || 0) + unit;
}; // CSS Background

const split_bg = function split_bg(type) {
  const image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const imgPosition = arguments[2];
  const imgAttachment = arguments[3];
  const imgRepeat = arguments[4];
  const imgSize = arguments[5];
  const DefaultColor = arguments[6];
  const bgGradient = arguments[7];
  let bgData = DefaultColor ? 'background-color:' + DefaultColor + ';' : '';

  if (type === 'image') {
    bgData += (image.hasOwnProperty('url') ? 'background-image:url(' + image.url + ');' : '') + (imgPosition ? 'background-position:' + imgPosition + ';' : '') + (imgAttachment ? 'background-attachment:' + imgAttachment + ';' : '') + (imgRepeat ? 'background-repeat:' + imgRepeat + ';' : '') + (imgSize ? 'background-size:' + imgSize + ';' : '');
  } else if (type === 'gradient') {
    if (bgGradient && bgGradient.type === 'linear') {
      bgData += 'background-image: linear-gradient(' + bgGradient.direction + 'deg, ' + bgGradient.color1 + ' ' + bgGradient.start + '%,' + bgGradient.color2 + ' ' + bgGradient.stop + '%);';
    } else {
      bgData += 'background-image: radial-gradient( circle at ' + bgGradient.radial + ' , ' + bgGradient.color1 + ' ' + bgGradient.start + '%,' + bgGradient.color2 + ' ' + bgGradient.stop + '%);';
    }
  }

  return bgData;
};

const cssBackground = function cssBackground(v) {
  let background = '{';
  background += split_bg(v.bgType, v.bgImage, v.bgimgPosition, v.bgimgAttachment, v.bgimgRepeat, v.bgimgSize, v.bgDefaultColor, v.bgGradient);
  background += '}';

  if (v.bgType === 'video') {
    if (v.bgVideoFallback) {
      if (v.bgVideoFallback.url) {
        background += 'background-image: url(' + v.bgVideoFallback.url + '); background-position: center; background-repeat: no-repeat; background-size: cover;';
      }
    }
  }

  if (background !== '{}') {
    return background;
  }

  return {};
}; // CSS ColorAdvanced

const cssColor = function cssColor(v) {
  let data = v.clip ? '-webkit-background-clip: text; -webkit-text-fill-color: transparent;' : '';

  if (v.type === 'color') {
    data += v.color ? 'background-image: none; background-color: ' + v.color + ';' : '';
  } else if (v.type === 'gradient' && v.gradient) {
    if (v.gradient && v.gradient.type === 'linear') {
      data += 'background-image : linear-gradient(' + v.gradient.direction + 'deg, ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);';
    } else {
      data += 'background-image : radial-gradient( circle at ' + v.gradient.radial + ' , ' + v.gradient.color1 + ' ' + v.gradient.start + '%,' + v.gradient.color2 + ' ' + v.gradient.stop + '%);';
    }
  }

  if (v.replace) {
    return data;
  } else {
    return '{' + data + '}';
  }
};
const cssBackgroundColor = v => {
  let data = {
    lg: [],
    md: [],
    sm: [],
    xs: []
  };
  let simpleData = '';

  if (v.type === 'classic') {
    if (v.classic.imgProperty['imgPosition']) {
      data = _push(_device(v.classic.imgProperty['imgPosition'], 'background-position:{{key}} !important'), data);
    }

    if (v.classic.imgProperty['imgAttachment']) {
      data = _push(_device(v.classic.imgProperty['imgAttachment'], 'background-attachment:{{key}} !important'), data);
    }

    if (v.classic.imgProperty['imgRepeat']) {
      data = _push(_device(v.classic.imgProperty['imgRepeat'], 'background-repeat:{{key}} !important'), data);
    }

    if (v.classic.imgProperty['imgSize']) {
      data = _push(_device(v.classic.imgProperty['imgSize'], 'background-size:{{key}} !important'), data);
    }

    let imgURLVal = v['classic']['img'] !== undefined ? v['classic']['img']['imgURL'] : '';
    simpleData += v.classic['color'] ? 'background:' + v.classic['color'] + ';' : '';
    simpleData += imgURLVal ? 'background-image:url(' + imgURLVal + ');' : '';
  } else if (v.type === 'gradient' && v.gradient) {
    simpleData += v.gradient ? 'background-image :' + v.gradient : '';
  }

  const simple = '{' + simpleData + '}';
  return {
    lg: data.lg,
    md: data.md,
    sm: data.sm,
    xs: data.xs,
    simple: simple
  };
}; // Generate dimension css

const getDimensionCss = (data, cssProperty) => {
  let _css = '';
  const unit = data.unit || 'px';

  if (data !== null && data !== void 0 && data.isLinked) {
    const value = data.value.split(' ')[0];
    _css = `${cssProperty}:${value || '0'}${unit} `;
  } else {
    let temp = data.value ? data.value.split(" ") : ['0', '0', '0', '0'];

    if (temp[0] === '' || temp[1] === '' || temp[2] === '' || temp[3] === '') {
      if (temp[0]) {
        _css += `${cssProperty}-top:${temp[0]}${temp[0] !== '0' ? unit : ''};`;
      }

      if (temp[1]) {
        _css += `${cssProperty}-right:${temp[1]}${temp[1] !== '0' ? unit : ''};`;
      }

      if (temp[2]) {
        _css += `${cssProperty}-bottom:${temp[2]}${temp[2] !== '0' ? unit : ''};`;
      }

      if (temp[3]) {
        _css += `${cssProperty}-left:${temp[3]}${temp[3] !== '0' ? unit : ''};`;
      }
    } else {
      _css = `${cssProperty}:${temp[0] ? temp[0] : `0`}${unit} ${temp[1] ? temp[1] : `0`}${unit} ${temp[2] ? temp[2] : `0`}${unit} ${temp[3] ? temp[3] : `0`}${unit}`;
    }
  }

  _css = '{' + _css + '}';
  return _css;
}; // Generate dimension css


const getDimensionBorderCss = function (data, cssProperty) {
  let postfix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  let _css = '';
  const unit = data.unit || 'px';

  if (data !== null && data !== void 0 && data.isLinked) {
    const value = data.value.split(' ')[0];
    _css = `${cssProperty}${postfix}:${value || '0'}${unit} `;
  } else {
    let temp = data.value ? data.value.split(" ") : ['0', '0', '0', '0'];

    if (temp[0] === '' || temp[1] === '' || temp[2] === '' || temp[3] === '') {
      if (temp[0]) {
        _css += `${cssProperty}-top${postfix}:${temp[0]}${temp[0] !== '0' ? unit : ''};`;
      }

      if (temp[1]) {
        _css += `${cssProperty}-right${postfix}:${temp[1]}${temp[1] !== '0' ? unit : ''};`;
      }

      if (temp[2]) {
        _css += `${cssProperty}-bottom${postfix}:${temp[2]}${temp[2] !== '0' ? unit : ''};`;
      }

      if (temp[3]) {
        _css += `${cssProperty}-left${postfix}:${temp[3]}${temp[3] !== '0' ? unit : ''};`;
      }
    } else {
      _css = `${cssProperty}${postfix}:${temp[0] ? temp[0] : `0`}${unit} ${temp[1] ? temp[1] : `0`}${unit} ${temp[2] ? temp[2] : `0`}${unit} ${temp[3] ? temp[3] : `0`}${unit}`;
    }
  }

  _css = '{' + _css + '}';
  return _css;
}; // CSS cssBorderRadius


const cssBorderRadius = v => {
  return getDimensionCss(v, 'border-radius');
}; // CSS cssBorderRadius

const cssPadding = v => {
  return getDimensionCss(v, 'padding');
}; // CSS cssBorderRadius

const cssMargin = v => {
  return getDimensionCss(v, 'margin');
}; // CSS cssCustomBorder

const cssCustomBorder = v => {
  return getDimensionBorderCss(v, 'border', '-width');
};

/***/ }),

/***/ "./src/utils/css/ParseCss.js":
/*!***********************************!*\
  !*** ./src/utils/css/ParseCss.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CssGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CssGenerator */ "./src/utils/css/CssGenerator.js");
/* global wp, jQuery, ajaxurl */

const {
  select
} = wp.data;

const innerBlocks = function (blocks) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let __CSS = '';

  if (type === true) {
    __CSS = '';
    type = false;
  }

  blocks.map(row => {
    const {
      attributes,
      name
    } = row;
    const [blockType, blockName] = name.split('/');

    if (blockType === 'rttpg' && attributes.uniqueId) {
      __CSS += (0,_CssGenerator__WEBPACK_IMPORTED_MODULE_0__.CssGenerator)(attributes, blockName, attributes.uniqueId, true);
    }

    if (row.innerBlocks && row.innerBlocks.length > 0) {
      __CSS += innerBlocks(row.innerBlocks);
    }
  });
  return __CSS;
};

const isRttpgBlock = blocks => {
  let hasBlock = false;
  blocks.forEach(function (block) {
    const {
      name,
      innerBlocks = []
    } = block;
    const [blockType, blockName] = name.split('/');

    if (blockType === 'rttpg') {
      hasBlock = true;
    }

    if (!hasBlock && innerBlocks.length > 0) {
      hasBlock = isRttpgBlock(innerBlocks);
    }
  });
  return hasBlock;
};

const getData = pId => {
  jQuery.ajax({
    url: ajaxurl,
    dataType: "json",
    type: "POST",
    data: {
      postId: pId,
      action: 'rttpg_block_css_get_posts'
    }
  }).then(function (response) {
    if (response.success) {
      const innerBlock = innerBlocks(wp.blocks.parse(response.data), true);

      if (innerBlock.css) {
        jQuery.ajax({
          url: ajaxurl,
          dataType: "json",
          type: "POST",
          data: {
            inner_css: innerBlock.css,
            post_id: wp.data.select('core/editor').getCurrentPostId(),
            action: 'rttpg_block_css_appended'
          }
        }).done(function (res) {
          if (res.success) {// Save Data
          }
        });
      }
    }
  });
};

const parseBlock = blocks => {
  blocks.forEach(function (block) {
    if (block.name.indexOf('core/block') !== -1) {
      getData(block.attributes.ref);
    }

    if (block.innerBlocks && block.innerBlocks.length > 0) {
      parseBlock(block.innerBlocks);
    }
  });
};

const ParseCss = function () {
  let setDatabase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  window.bindCss = true;
  const all_blocks = select('core/block-editor').getBlocks();
  const {
    getCurrentPostId
  } = select('core/editor');
  const hasRttpgBlocks = isRttpgBlock(all_blocks);
  const blockCss = innerBlocks(all_blocks, true);

  if (setDatabase) {
    parseBlock(all_blocks);
    jQuery.ajax({
      url: ajaxurl,
      dataType: "json",
      type: "POST",
      data: {
        block_css: blockCss,
        post_id: getCurrentPostId,
        has_block: hasRttpgBlocks,
        action: 'rttpg_block_css_save'
      }
    });
  }

  setTimeout(function () {
    window.bindCss = false;
  }, 900);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParseCss);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/options */ "./node_modules/flatpickr/dist/esm/types/options.js");
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./l10n/default */ "./node_modules/flatpickr/dist/esm/l10n/default.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/flatpickr/dist/esm/utils/index.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/dom */ "./node_modules/flatpickr/dist/esm/utils/dom.js");
/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dates */ "./node_modules/flatpickr/dist/esm/utils/dates.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/formatting */ "./node_modules/flatpickr/dist/esm/utils/formatting.js");
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/polyfills */ "./node_modules/flatpickr/dist/esm/utils/polyfills.js");
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_utils_polyfills__WEBPACK_IMPORTED_MODULE_6__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};







var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    var self = {
        config: __assign(__assign({}, _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults), flatpickr.defaultConfig),
        l10n: _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"],
    };
    self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self.pluginElements = [];
    self.loadedPlugins = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self._positionCalendar = positionCalendar;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self.onMouseOver = onMouseOver;
    self._createElement = _utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement;
    self.createDay = createDay;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.updateValue = updateValue;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
            }
            updateValue(false);
        }
        setCalendarWidth();
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function getClosestActiveElement() {
        var _a;
        return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
            .activeElement || document.activeElement);
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function setCalendarWidth() {
        var config = self.config;
        if (config.weekNumbers === false && config.showMonths === 1) {
            return;
        }
        else if (config.noCalendar !== true) {
            window.requestAnimationFrame(function () {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.style.visibility = "hidden";
                    self.calendarContainer.style.display = "block";
                }
                if (self.daysContainer !== undefined) {
                    var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                    self.daysContainer.style.width = daysWidth + "px";
                    self.calendarContainer.style.width =
                        daysWidth +
                            (self.weekWrapper !== undefined
                                ? self.weekWrapper.offsetWidth
                                : 0) +
                            "px";
                    self.calendarContainer.style.removeProperty("visibility");
                    self.calendarContainer.style.removeProperty("display");
                }
            });
        }
    }
    function updateTime(e) {
        if (self.selectedDates.length === 0) {
            var defaultDate = self.config.minDate === undefined ||
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(new Date(), self.config.minDate) >= 0
                ? new Date()
                : new Date(self.config.minDate.getTime());
            var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config);
            defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
            self.selectedDates = [defaultDate];
            self.latestSelectedDateObj = defaultDate;
        }
        if (e !== undefined && e.type !== "blur") {
            timeWrapper(e);
        }
        var prevValue = self._input.value;
        setHoursFromInputs();
        updateValue();
        if (self._input.value !== prevValue) {
            self._debouncedChange();
        }
    }
    function ampm2military(hour, amPM) {
        return (hour % 12) + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined) {
            hours = ampm2military(hours, self.amPM.textContent);
        }
        var limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        var limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (self.config.maxTime !== undefined &&
            self.config.minTime !== undefined &&
            self.config.minTime > self.config.maxTime) {
            var minBound = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
            var maxBound = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
            var currentTime = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(hours, minutes, seconds);
            if (currentTime > maxBound && currentTime < minBound) {
                var result = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.parseSeconds)(minBound);
                hours = result[0];
                minutes = result[1];
                seconds = result[2];
            }
        }
        else {
            if (limitMaxHours) {
                var maxTime = self.config.maxTime !== undefined
                    ? self.config.maxTime
                    : self.config.maxDate;
                hours = Math.min(hours, maxTime.getHours());
                if (hours === maxTime.getHours())
                    minutes = Math.min(minutes, maxTime.getMinutes());
                if (minutes === maxTime.getMinutes())
                    seconds = Math.min(seconds, maxTime.getSeconds());
            }
            if (limitMinHours) {
                var minTime = self.config.minTime !== undefined
                    ? self.config.minTime
                    : self.config.minDate;
                hours = Math.max(hours, minTime.getHours());
                if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                    minutes = minTime.getMinutes();
                if (minutes === minTime.getMinutes())
                    seconds = Math.max(seconds, minTime.getSeconds());
            }
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date && date instanceof Date) {
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(!self.config.time_24hr
            ? ((12 + hours) % 12) + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(hours % 12 === 0)
            : hours);
        self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(seconds);
    }
    function onYearInput(event) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(event);
        var year = parseInt(eventTarget.value) + (event.delta || 0);
        if (year / 1000 > 1 ||
            (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
            changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler, options); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler, options); });
        element.addEventListener(event, handler, options);
        self._handlers.push({
            remove: function () { return element.removeEventListener(event, handler, options); },
        });
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.debounce)(onResize, 50);
        self._debouncedChange = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.debounce)(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", function (e) {
                if (self.config.mode === "range")
                    onMouseOver((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e));
            });
        bind(self._input, "keydown", onKeyDown);
        if (self.calendarContainer !== undefined) {
            bind(self.calendarContainer, "keydown", onKeyDown);
        }
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        else
            bind(window.document, "mousedown", documentClick);
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "click", self.open);
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "click", onMonthNavClick);
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "click", selectDate);
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e).select();
            };
            bind(self.timeContainer, ["increment"], updateTime);
            bind(self.timeContainer, "blur", updateTime, { capture: true });
            bind(self.timeContainer, "click", timeIncrement);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "click", function (e) {
                    updateTime(e);
                });
            }
        }
        if (self.config.allowInput) {
            bind(self._input, "blur", onBlur);
        }
    }
    function jumpToDate(jumpDate, triggerChange) {
        var jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        var oldYear = self.currentYear;
        var oldMonth = self.currentMonth;
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        if (triggerChange && self.currentYear !== oldYear) {
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        if (triggerChange &&
            (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
            triggerEvent("onMonthChange");
        }
        self.redraw();
    }
    function timeIncrement(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        if (~eventTarget.className.indexOf("arrow"))
            incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rangeMode", self.config.mode === "range");
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "animate", self.config.animate === true);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined &&
            self.config.appendTo.nodeType !== undefined;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, _dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (className.indexOf("hidden") === -1 &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
            dayElement.setAttribute("aria-current", "date");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(dayElement, "startRange", self.selectedDates[0] &&
                        (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[0], true) === 0);
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(dayElement, "endRange", self.selectedDates[1] &&
                        (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[1], true) === 0);
                    if (className === "nextMonthDay")
                        dayElement.classList.add("inRange");
                }
            }
        }
        else {
            dayElement.classList.add("flatpickr-disabled");
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
        }
        if (self.weekNumbers &&
            self.config.showMonths === 1 &&
            className !== "prevMonthDay" &&
            i % 7 === 6) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDayElem(targetNode) {
        targetNode.focus();
        if (self.config.mode === "range")
            onMouseOver(targetNode);
    }
    function getFirstAvailableDay(delta) {
        var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        for (var m = startMonth; m != endMonth; m += delta) {
            var month = self.daysContainer.children[m];
            var startIndex = delta > 0 ? 0 : month.children.length - 1;
            var endIndex = delta > 0 ? month.children.length : -1;
            for (var i = startIndex; i != endIndex; i += delta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                    return c;
            }
        }
        return undefined;
    }
    function getNextAvailableDay(current, delta) {
        var givenMonth = current.className.indexOf("Month") === -1
            ? current.dateObj.getMonth()
            : self.currentMonth;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        var loopDelta = delta > 0 ? 1 : -1;
        for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
            var month = self.daysContainer.children[m];
            var startIndex = givenMonth - self.currentMonth === m
                ? current.$i + delta
                : delta < 0
                    ? month.children.length - 1
                    : 0;
            var numMonthDays = month.children.length;
            for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 &&
                    isEnabled(c.dateObj) &&
                    Math.abs(current.$i - i) >= Math.abs(delta))
                    return focusOnDayElem(c);
            }
        }
        self.changeMonth(loopDelta);
        focusOnDay(getFirstAvailableDay(loopDelta), 0);
        return undefined;
    }
    function focusOnDay(current, offset) {
        var activeElement = getClosestActiveElement();
        var dayFocused = isInView(activeElement || document.body);
        var startElem = current !== undefined
            ? current
            : dayFocused
                ? activeElement
                : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                    ? self.selectedDateElem
                    : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                        ? self.todayDateElem
                        : getFirstAvailableDay(offset > 0 ? 1 : -1);
        if (startElem === undefined) {
            self._input.focus();
        }
        else if (!dayFocused) {
            focusOnDayElem(startElem);
        }
        else {
            getNextAvailableDay(startElem, offset);
        }
    }
    function buildMonthDays(year, month) {
        var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
        var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
        var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
            (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        var dayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "dayContainer");
        dayContainer.appendChild(days);
        return dayContainer;
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.daysContainer);
        if (self.weekNumbers)
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.weekNumbers);
        var frag = document.createDocumentFragment();
        for (var i = 0; i < self.config.showMonths; i++) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
        }
        self.daysContainer.appendChild(frag);
        self.days = self.daysContainer.firstChild;
        if (self.config.mode === "range" && self.selectedDates.length === 1) {
            onMouseOver();
        }
    }
    function buildMonthSwitch() {
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType !== "dropdown")
            return;
        var shouldBuildMonth = function (month) {
            if (self.config.minDate !== undefined &&
                self.currentYear === self.config.minDate.getFullYear() &&
                month < self.config.minDate.getMonth()) {
                return false;
            }
            return !(self.config.maxDate !== undefined &&
                self.currentYear === self.config.maxDate.getFullYear() &&
                month > self.config.maxDate.getMonth());
        };
        self.monthsDropdownContainer.tabIndex = -1;
        self.monthsDropdownContainer.innerHTML = "";
        for (var i = 0; i < 12; i++) {
            if (!shouldBuildMonth(i))
                continue;
            var month = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("option", "flatpickr-monthDropdown-month");
            month.value = new Date(self.currentYear, i).getMonth().toString();
            month.textContent = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.monthToStr)(i, self.config.shorthandCurrentMonth, self.l10n);
            month.tabIndex = -1;
            if (self.currentMonth === i) {
                month.selected = true;
            }
            self.monthsDropdownContainer.appendChild(month);
        }
    }
    function buildMonth() {
        var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-month");
        var monthNavFragment = window.document.createDocumentFragment();
        var monthElement;
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType === "static") {
            monthElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "cur-month");
        }
        else {
            self.monthsDropdownContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("select", "flatpickr-monthDropdown-months");
            self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
            bind(self.monthsDropdownContainer, "change", function (e) {
                var target = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
                var selectedMonth = parseInt(target.value, 10);
                self.changeMonth(selectedMonth - self.currentMonth);
                triggerEvent("onMonthChange");
            });
            buildMonthSwitch();
            monthElement = self.monthsDropdownContainer;
        }
        var yearInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("cur-year", { tabindex: "-1" });
        var yearElement = yearInput.getElementsByTagName("input")[0];
        yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
        if (self.config.minDate) {
            yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
        }
        if (self.config.maxDate) {
            yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
            yearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        var currentMonth = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-current-month");
        currentMonth.appendChild(monthElement);
        currentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(currentMonth);
        container.appendChild(monthNavFragment);
        return {
            container: container,
            yearElement: yearElement,
            monthElement: monthElement,
        };
    }
    function buildMonths() {
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.monthNav);
        self.monthNav.appendChild(self.prevMonthNav);
        if (self.config.showMonths) {
            self.yearElements = [];
            self.monthElements = [];
        }
        for (var m = self.config.showMonths; m--;) {
            var month = buildMonth();
            self.yearElements.push(month.yearElement);
            self.monthElements.push(month.monthElement);
            self.monthNav.appendChild(month.container);
        }
        self.monthNav.appendChild(self.nextMonthNav);
    }
    function buildMonthNav() {
        self.monthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-months");
        self.yearElements = [];
        self.monthElements = [];
        self.prevMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.nextMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        buildMonths();
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool) {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.prevMonthNav, "flatpickr-disabled", bool);
                    self.__hidePrevMonthArrow = bool;
                }
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool) {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.nextMonthNav, "flatpickr-disabled", bool);
                    self.__hideNextMonthArrow = bool;
                }
            },
        });
        self.currentYearElement = self.yearElements[0];
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config);
        self.timeContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-time-separator", ":");
        var hourInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-hour", {
            "aria-label": self.l10n.hourAriaLabel,
        });
        self.hourElement = hourInput.getElementsByTagName("input")[0];
        var minuteInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-minute", {
            "aria-label": self.l10n.minuteAriaLabel,
        });
        self.minuteElement = minuteInput.getElementsByTagName("input")[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? defaults.hours
                : military2ampm(defaults.hours));
        self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : defaults.minutes);
        self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
        self.hourElement.setAttribute("maxlength", "2");
        self.minuteElement.setAttribute("min", "0");
        self.minuteElement.setAttribute("max", "59");
        self.minuteElement.setAttribute("maxlength", "2");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-second");
            self.secondElement = secondInput.getElementsByTagName("input")[0];
            self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : defaults.seconds);
            self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
            self.secondElement.setAttribute("min", "0");
            self.secondElement.setAttribute("max", "59");
            self.secondElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-am-pm", self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekdays");
        else
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.weekdayContainer);
        for (var i = self.config.showMonths; i--;) {
            var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekdaycontainer");
            self.weekdayContainer.appendChild(container);
        }
        updateWeekdays();
        return self.weekdayContainer;
    }
    function updateWeekdays() {
        if (!self.weekdayContainer) {
            return;
        }
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
        }
        for (var i = self.config.showMonths; i--;) {
            self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
        }
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, isOffset) {
        if (isOffset === void 0) { isOffset = true; }
        var delta = isOffset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow === true) ||
            (delta > 0 && self._hideNextMonthArrow === true))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
    }
    function clear(triggerChangeEvent, toInitial) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        if (toInitial === void 0) { toInitial = true; }
        self.input.value = "";
        if (self.altInput !== undefined)
            self.altInput.value = "";
        if (self.mobileInput !== undefined)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        if (toInitial === true) {
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
        }
        if (self.config.enableTime === true) {
            var _a = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
            setHours(hours, minutes, seconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            if (self.calendarContainer !== undefined) {
                self.calendarContainer.classList.remove("open");
            }
            if (self._input !== undefined) {
                self._input.classList.remove("active");
            }
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            self._handlers[i].remove();
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode) {
            if (self.config.static && self.calendarContainer.parentNode) {
                var wrapper = self.calendarContainer.parentNode;
                wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                if (wrapper.parentNode) {
                    while (wrapper.firstChild)
                        wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }
            else
                self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        }
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "monthsDropdownContainer",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var eventTarget_1 = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
            var isCalendarElement = isCalendarElem(eventTarget_1);
            var isInput = eventTarget_1 === self.input ||
                eventTarget_1 === self.altInput ||
                self.element.contains(eventTarget_1) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = !isInput &&
                !isCalendarElement &&
                !isCalendarElem(e.relatedTarget);
            var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                return elem.contains(eventTarget_1);
            });
            if (lostFocus && isIgnored) {
                if (self.config.allowInput) {
                    self.setDate(self._input.value, false, self.config.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                }
                if (self.timeContainer !== undefined &&
                    self.minuteElement !== undefined &&
                    self.hourElement !== undefined &&
                    self.input.value !== "" &&
                    self.input.value !== undefined) {
                    updateTime();
                }
                self.close();
                if (self.config &&
                    self.config.mode === "range" &&
                    self.selectedDates.length === 1)
                    self.clear(false);
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
            (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
    }
    function isEnabled(date, timeless) {
        var _a;
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable && self.config.disable.length === 0)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string") {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function isInView(elem) {
        if (self.daysContainer !== undefined)
            return (elem.className.indexOf("hidden") === -1 &&
                elem.className.indexOf("flatpickr-disabled") === -1 &&
                self.daysContainer.contains(elem));
        return false;
    }
    function onBlur(e) {
        var isInput = e.target === self._input;
        var valueChanged = self._input.value.trimEnd() !== getDateStr();
        if (isInput &&
            valueChanged &&
            !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
            self.setDate(self._input.value, true, e.target === self.altInput
                ? self.config.altFormat
                : self.config.dateFormat);
        }
    }
    function onKeyDown(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var isInput = self.config.wrap
            ? element.contains(eventTarget)
            : eventTarget === self._input;
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, eventTarget === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                self.close();
                return eventTarget.blur();
            }
            else {
                self.open();
            }
        }
        else if (isCalendarElem(eventTarget) ||
            allowKeydown ||
            allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(eventTarget);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj) {
                        e.preventDefault();
                        updateTime();
                        focusAndClose();
                    }
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    focusAndClose();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput) {
                        e.preventDefault();
                        self.clear();
                    }
                    break;
                case 37:
                case 39:
                    if (!isTimeObj && !isInput) {
                        e.preventDefault();
                        var activeElement = getClosestActiveElement();
                        if (self.daysContainer !== undefined &&
                            (allowInput === false ||
                                (activeElement && isInView(activeElement)))) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(undefined, delta_1);
                            else {
                                e.stopPropagation();
                                changeMonth(delta_1);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if ((self.daysContainer &&
                        eventTarget.$i !== undefined) ||
                        eventTarget === self.input ||
                        eventTarget === self.altInput) {
                        if (e.ctrlKey) {
                            e.stopPropagation();
                            changeYear(self.currentYear - delta);
                            focusOnDay(getFirstAvailableDay(1), 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(undefined, delta * 7);
                    }
                    else if (eventTarget === self.currentYearElement) {
                        changeYear(self.currentYear - delta);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (isTimeObj) {
                        var elems = [
                            self.hourElement,
                            self.minuteElement,
                            self.secondElement,
                            self.amPM,
                        ]
                            .concat(self.pluginElements)
                            .filter(function (x) { return x; });
                        var i = elems.indexOf(eventTarget);
                        if (i !== -1) {
                            var target = elems[i + (e.shiftKey ? -1 : 1)];
                            e.preventDefault();
                            (target || self._input).focus();
                        }
                    }
                    else if (!self.config.noCalendar &&
                        self.daysContainer &&
                        self.daysContainer.contains(eventTarget) &&
                        e.shiftKey) {
                        e.preventDefault();
                        self._input.focus();
                    }
                    break;
                default:
                    break;
            }
        }
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                case self.l10n.amPM[0].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[0];
                    setHoursFromInputs();
                    updateValue();
                    break;
                case self.l10n.amPM[1].charAt(0):
                case self.l10n.amPM[1].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[1];
                    setHoursFromInputs();
                    updateValue();
                    break;
            }
        }
        if (isInput || isCalendarElem(eventTarget)) {
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem, cellClass) {
        if (cellClass === void 0) { cellClass = "flatpickr-day"; }
        if (self.selectedDates.length !== 1 ||
            (elem &&
                (!elem.classList.contains(cellClass) ||
                    elem.classList.contains("flatpickr-disabled"))))
            return;
        var hoverDate = elem
            ? elem.dateObj.getTime()
            : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
        var containsDisabled = false;
        var minRange = 0, maxRange = 0;
        for (var t = rangeStartDate; t < rangeEndDate; t += _utils_dates__WEBPACK_IMPORTED_MODULE_4__.duration.DAY) {
            if (!isEnabled(new Date(t), true)) {
                containsDisabled =
                    containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                if (t < initialDate && (!minRange || t > minRange))
                    minRange = t;
                else if (t > initialDate && (!maxRange || t < maxRange))
                    maxRange = t;
            }
        }
        var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
        hoverableCells.forEach(function (dayElem) {
            var date = dayElem.dateObj;
            var timestamp = date.getTime();
            var outOfRange = (minRange > 0 && timestamp < minRange) ||
                (maxRange > 0 && timestamp > maxRange);
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return;
            }
            else if (containsDisabled && !outOfRange)
                return;
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            if (elem !== undefined) {
                elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                    ? "startRange"
                    : "endRange");
                if (initialDate < hoverDate && timestamp === initialDate)
                    dayElem.classList.add("startRange");
                else if (initialDate > hoverDate && timestamp === initialDate)
                    dayElem.classList.add("endRange");
                if (timestamp >= minRange &&
                    (maxRange === 0 || timestamp <= maxRange) &&
                    (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.isBetween)(timestamp, initialDate, hoverDate))
                    dayElem.classList.add("inRange");
            }
        });
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.isMobile === true) {
            if (e) {
                e.preventDefault();
                var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
                if (eventTarget) {
                    eventTarget.blur();
                }
            }
            if (self.mobileInput !== undefined) {
                self.mobileInput.focus();
                self.mobileInput.click();
            }
            triggerEvent("onOpen");
            return;
        }
        else if (self._input.disabled || self.config.inline) {
            return;
        }
        var wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
        if (self.config.enableTime === true && self.config.noCalendar === true) {
            if (self.config.allowInput === false &&
                (e === undefined ||
                    !self.timeContainer.contains(e.relatedTarget))) {
                setTimeout(function () { return self.hourElement.select(); }, 50);
            }
        }
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "allowInvalidPreload",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
        var formats = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        var timeMode = userConfig.mode === "time";
        if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
            var defaultDateFormat = flatpickr.defaultConfig.dateFormat || _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults.dateFormat;
            formats.dateFormat =
                userConfig.noCalendar || timeMode
                    ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                    : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput &&
            (userConfig.enableTime || timeMode) &&
            !userConfig.altFormat) {
            var defaultAltFormat = flatpickr.defaultConfig.altFormat || _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults.altFormat;
            formats.altFormat =
                userConfig.noCalendar || timeMode
                    ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                    : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        var minMaxTimeSetter = function (type) { return function (val) {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
        }; };
        Object.defineProperty(self.config, "minTime", {
            get: function () { return self.config._minTime; },
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: function () { return self.config._maxTime; },
            set: minMaxTimeSetter("max"),
        });
        if (userConfig.mode === "time") {
            self.config.noCalendar = true;
            self.config.enableTime = true;
        }
        Object.assign(self.config, formats, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        _types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
            self.config[hook] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(self.config[hook] || []).map(bindToInstance);
        });
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (_types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.indexOf(key) > -1) {
                    self.config[key] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        if (!userConfig.altInputClass) {
            self.config.altInputClass =
                getInputElem().className + " " + self.config.altInputClass;
        }
        triggerEvent("onParseConfig");
    }
    function getInputElem() {
        return self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
        self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
        var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
        if (userConfig.time_24hr === undefined &&
            flatpickr.defaultConfig.time_24hr === undefined) {
            self.config.time_24hr = self.l10n.time_24hr;
        }
        self.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateFormatter)(self);
        self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({ config: self.config, l10n: self.l10n });
    }
    function positionCalendar(customPositionElement) {
        if (typeof self.config.position === "function") {
            return void self.config.position(self, customPositionElement);
        }
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        var positionElement = customPositionElement || self._positionElement;
        var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
            (configPosVertical !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowTop", !showOnTop);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var isCenter = false;
        var isRight = false;
        if (configPosHorizontal === "center") {
            left -= (calendarWidth - inputBounds.width) / 2;
            isCenter = true;
        }
        else if (configPosHorizontal === "right") {
            left -= calendarWidth - inputBounds.width;
            isRight = true;
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowCenter", isCenter);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowRight", isRight);
        var right = window.document.body.offsetWidth -
            (window.pageXOffset + inputBounds.right);
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        var centerMost = right + calendarWidth > window.document.body.offsetWidth;
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else if (!centerMost) {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
        else {
            var doc = getDocumentStyleSheet();
            if (doc === undefined)
                return;
            var bodyWidth = window.document.body.offsetWidth;
            var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
            var centerBefore = ".flatpickr-calendar.centerMost:before";
            var centerAfter = ".flatpickr-calendar.centerMost:after";
            var centerIndex = doc.cssRules.length;
            var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rightMost", false);
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "centerMost", true);
            doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
            self.calendarContainer.style.left = centerLeft + "px";
            self.calendarContainer.style.right = "auto";
        }
    }
    function getDocumentStyleSheet() {
        var editableSheet = null;
        for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (!sheet.cssRules)
                continue;
            try {
                sheet.cssRules;
            }
            catch (err) {
                continue;
            }
            editableSheet = sheet;
            break;
        }
        return editableSheet != null ? editableSheet : createStyleSheet();
    }
    function createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildMonthSwitch();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("flatpickr-disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.findParent)((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e), isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
            selectedDate.getMonth() >
                self.currentMonth + self.config.showMonths - 1) &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2) {
                self.clear(false, false);
            }
            self.latestSelectedDateObj = selectedDate;
            self.selectedDates.push(selectedDate);
            if ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            triggerEvent("onMonthChange");
        }
        updateNavigationCurrentMonth();
        buildDays();
        updateValue();
        if (!shouldChangeMonth &&
            self.config.mode !== "range" &&
            self.config.showMonths === 1)
            focusOnDayElem(target);
        else if (self.selectedDateElem !== undefined &&
            self.hourElement === undefined) {
            self.selectedDateElem && self.selectedDateElem.focus();
        }
        if (self.hourElement !== undefined)
            self.hourElement !== undefined && self.hourElement.focus();
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    var CALLBACKS = {
        locale: [setupLocale, updateWeekdays],
        showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
        minDate: [jumpToDate],
        maxDate: [jumpToDate],
        positionElement: [updatePositionElement],
        clickOpens: [
            function () {
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                }
                else {
                    self._input.removeEventListener("focus", self.open);
                    self._input.removeEventListener("click", self.open);
                }
            },
        ],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object") {
            Object.assign(self.config, option);
            for (var key in option) {
                if (CALLBACKS[key] !== undefined)
                    CALLBACKS[key].forEach(function (x) { return x(); });
            }
        }
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach(function (x) { return x(); });
            else if (_types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.indexOf(option) > -1)
                self.config[option] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(value);
        }
        self.redraw();
        updateValue(true);
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                case "time":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        else
            self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
        self.selectedDates = (self.config.allowInvalidPreload
            ? dates
            : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
        if (self.config.mode === "range")
            self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = self.config.dateFormat; }
        if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.latestSelectedDateObj =
            self.selectedDates[self.selectedDates.length - 1];
        self.redraw();
        jumpToDate(undefined, triggerChange);
        setHoursFromDate();
        if (self.selectedDates.length === 0) {
            self.clear(false);
        }
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .slice()
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = self.parseDate(self.config.now) || new Date();
        var preloadedDate = self.config.defaultDate ||
            ((self.input.nodeName === "INPUT" ||
                self.input.nodeName === "TEXTAREA") &&
                self.input.placeholder &&
                self.input.value === self.input.placeholder
                ? null
                : self.input.value);
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        self._initialDate =
            self.selectedDates.length > 0
                ? self.selectedDates[0]
                : self.config.minDate &&
                    self.config.minDate.getTime() > self.now.getTime()
                    ? self.config.minDate
                    : self.config.maxDate &&
                        self.config.maxDate.getTime() < self.now.getTime()
                        ? self.config.maxDate
                        : self.now;
        self.currentYear = self._initialDate.getFullYear();
        self.currentMonth = self._initialDate.getMonth();
        if (self.selectedDates.length > 0)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
    }
    function setupInputs() {
        self.input = getInputElem();
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)(self.input.nodeName, self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.setAttribute("type", "hidden");
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        updatePositionElement();
    }
    function updatePositionElement() {
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar
                ? "time"
                : "datetime-local"
            : "date";
        self.mobileInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date"
                    ? "Y-m-d"
                    : "H:i:S";
        if (self.selectedDates.length > 0) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        if (self.input.getAttribute("step"))
            self.mobileInput.step = String(self.input.getAttribute("step"));
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", function (e) {
            self.setDate((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e).value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle(e) {
        if (self.isOpen === true)
            return self.close();
        self.open(e);
    }
    function triggerEvent(event, data) {
        if (self.config === undefined)
            return;
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            var selectedDate = self.selectedDates[i];
            if (selectedDate instanceof Date &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(selectedDate, date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[0]) >= 0 &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.yearElements.forEach(function (yearElement, i) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                self.monthElements[i].textContent =
                    (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.monthToStr)(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
            }
            else {
                self.monthsDropdownContainer.value = d.getMonth().toString();
            }
            yearElement.value = d.getFullYear().toString();
        });
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function getDateStr(specificFormat) {
        var format = specificFormat ||
            (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
        return self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, format); })
            .filter(function (d, i, arr) {
            return self.config.mode !== "range" ||
                self.config.enableTime ||
                arr.indexOf(d) === i;
        })
            .join(self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator);
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        self.input.value = getDateStr(self.config.dateFormat);
        if (self.altInput !== undefined) {
            self.altInput.value = getDateStr(self.config.altFormat);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var isPrevMonth = self.prevMonthNav.contains(eventTarget);
        var isNextMonth = self.nextMonthNav.contains(eventTarget);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (self.yearElements.indexOf(eventTarget) >= 0) {
            eventTarget.select();
        }
        else if (eventTarget.classList.contains("arrowUp")) {
            self.changeYear(self.currentYear + 1);
        }
        else if (eventTarget.classList.contains("arrowDown")) {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e), input = eventTarget;
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(self.amPM.textContent === self.l10n.amPM[0])];
        }
        var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!isHourElem) +
                        ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(isHourElem) && (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice
        .call(nodeList)
        .filter(function (x) { return x instanceof HTMLElement; });
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" &&
    typeof HTMLCollection !== "undefined" &&
    typeof NodeList !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr = function (selector, config) {
    if (typeof selector === "string") {
        return _flatpickr(window.document.querySelectorAll(selector), config);
    }
    else if (selector instanceof Node) {
        return _flatpickr([selector], config);
    }
    else {
        return _flatpickr(selector, config);
    }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
    en: __assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"]),
    default: __assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"]),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({});
flatpickr.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateFormatter)({});
flatpickr.compareDates = _utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
    window.flatpickr = flatpickr;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flatpickr);


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/l10n/default.js":
/*!*********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/l10n/default.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "english": () => (/* binding */ english)
/* harmony export */ });
var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time_24hr: false,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (english);


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/types/options.js":
/*!**********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/types/options.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HOOKS": () => (/* binding */ HOOKS),
/* harmony export */   "defaults": () => (/* binding */ defaults)
/* harmony export */ });
var HOOKS = [
    "onChange",
    "onClose",
    "onDayCreate",
    "onDestroy",
    "onKeyDown",
    "onMonthChange",
    "onOpen",
    "onParseConfig",
    "onReady",
    "onValueUpdate",
    "onYearChange",
    "onPreCalendarPosition",
];
var defaults = {
    _disable: [],
    allowInput: false,
    allowInvalidPreload: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    autoFillDefaultTime: true,
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enableSeconds: false,
    enableTime: false,
    errorHandler: function (err) {
        return typeof console !== "undefined" && console.warn(err);
    },
    getWeek: function (givenDate) {
        var date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return (1 +
            Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7));
    },
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    monthSelectorType: "dropdown",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    now: new Date(),
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    showMonths: 1,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/dates.js":
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dates.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateSecondsSinceMidnight": () => (/* binding */ calculateSecondsSinceMidnight),
/* harmony export */   "compareDates": () => (/* binding */ compareDates),
/* harmony export */   "compareTimes": () => (/* binding */ compareTimes),
/* harmony export */   "createDateFormatter": () => (/* binding */ createDateFormatter),
/* harmony export */   "createDateParser": () => (/* binding */ createDateParser),
/* harmony export */   "duration": () => (/* binding */ duration),
/* harmony export */   "getDefaultHours": () => (/* binding */ getDefaultHours),
/* harmony export */   "isBetween": () => (/* binding */ isBetween),
/* harmony export */   "parseSeconds": () => (/* binding */ parseSeconds)
/* harmony export */ });
/* harmony import */ var _formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatting */ "./node_modules/flatpickr/dist/esm/utils/formatting.js");
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/options */ "./node_modules/flatpickr/dist/esm/types/options.js");
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../l10n/default */ "./node_modules/flatpickr/dist/esm/l10n/default.js");



var createDateFormatter = function (_a) {
    var _b = _a.config, config = _b === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
    return function (dateObj, frmt, overrideLocale) {
        var locale = overrideLocale || l10n;
        if (config.formatDate !== undefined && !isMobile) {
            return config.formatDate(dateObj, frmt, locale);
        }
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c] && arr[i - 1] !== "\\"
                ? _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c](dateObj, locale, config)
                : c !== "\\"
                    ? c
                    : "";
        })
            .join("");
    };
};
var createDateParser = function (_a) {
    var _b = _a.config, config = _b === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _c;
    return function (date, givenFormat, timeless, customLocale) {
        if (date !== 0 && !date)
            return undefined;
        var locale = customLocale || l10n;
        var parsedDate;
        var dateOrig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (config || _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (config && config.parseDate) {
                parsedDate = config.parseDate(date, format);
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr)) {
                parsedDate = new Date(date);
            }
            else {
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (_formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token] && !escaped) {
                        regexStr += _formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: _formatting__WEBPACK_IMPORTED_MODULE_0__.revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                }
                parsedDate =
                    !config || !config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                ops.forEach(function (_a) {
                    var fn = _a.fn, val = _a.val;
                    return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                });
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
            config.errorHandler(new Error("Invalid date provided: " + dateOrig));
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    };
};
function compareDates(date1, date2, timeless) {
    if (timeless === void 0) { timeless = true; }
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
function compareTimes(date1, date2) {
    return (3600 * (date1.getHours() - date2.getHours()) +
        60 * (date1.getMinutes() - date2.getMinutes()) +
        date1.getSeconds() -
        date2.getSeconds());
}
var isBetween = function (ts, ts1, ts2) {
    return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
};
var parseSeconds = function (secondsSinceMidnight) {
    var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
    return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
};
var duration = {
    DAY: 86400000,
};
function getDefaultHours(config) {
    var hours = config.defaultHour;
    var minutes = config.defaultMinute;
    var seconds = config.defaultSeconds;
    if (config.minDate !== undefined) {
        var minHour = config.minDate.getHours();
        var minMinutes = config.minDate.getMinutes();
        var minSeconds = config.minDate.getSeconds();
        if (hours < minHour) {
            hours = minHour;
        }
        if (hours === minHour && minutes < minMinutes) {
            minutes = minMinutes;
        }
        if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
            seconds = config.minDate.getSeconds();
    }
    if (config.maxDate !== undefined) {
        var maxHr = config.maxDate.getHours();
        var maxMinutes = config.maxDate.getMinutes();
        hours = Math.min(hours, maxHr);
        if (hours === maxHr)
            minutes = Math.min(maxMinutes, minutes);
        if (hours === maxHr && minutes === maxMinutes)
            seconds = config.maxDate.getSeconds();
    }
    return { hours: hours, minutes: minutes, seconds: seconds };
}


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/dom.js":
/*!******************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dom.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearNode": () => (/* binding */ clearNode),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "createNumberInput": () => (/* binding */ createNumberInput),
/* harmony export */   "findParent": () => (/* binding */ findParent),
/* harmony export */   "getEventTarget": () => (/* binding */ getEventTarget),
/* harmony export */   "toggleClass": () => (/* binding */ toggleClass)
/* harmony export */ });
function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
        numInput.type = "number";
    }
    else {
        numInput.type = "text";
        numInput.pattern = "\\d*";
    }
    if (opts !== undefined)
        for (var key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}
function getEventTarget(event) {
    try {
        if (typeof event.composedPath === "function") {
            var path = event.composedPath();
            return path[0];
        }
        return event.target;
    }
    catch (error) {
        return event.target;
    }
}


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/formatting.js":
/*!*************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/formatting.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formats": () => (/* binding */ formats),
/* harmony export */   "monthToStr": () => (/* binding */ monthToStr),
/* harmony export */   "revFormat": () => (/* binding */ revFormat),
/* harmony export */   "tokenRegex": () => (/* binding */ tokenRegex)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./node_modules/flatpickr/dist/esm/utils/index.js");

var doNothing = function () { return undefined; };
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var revFormat = {
    D: doNothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours((dateObj.getHours() % 12) +
            12 * (0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum, locale) {
        var weekNumber = parseInt(weekNum);
        var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
        date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
        return date;
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    u: function (_, unixMillSeconds) {
        return new Date(parseFloat(unixMillSeconds));
    },
    w: doNothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "",
    F: "",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(formats.h(date, locale, options));
    },
    H: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getFullYear(), 4); },
    d: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    u: function (date) { return date.getTime(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/index.js":
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayify": () => (/* binding */ arrayify),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "int": () => (/* binding */ int),
/* harmony export */   "pad": () => (/* binding */ pad)
/* harmony export */ });
var pad = function (number, length) {
    if (length === void 0) { length = 2; }
    return ("000" + number).slice(length * -1);
};
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(fn, wait) {
    var t;
    return function () {
        var _this = this;
        var args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { return fn.apply(_this, args); }, wait);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};


/***/ }),

/***/ "./node_modules/flatpickr/dist/esm/utils/polyfills.js":
/*!************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/polyfills.js ***!
  \************************************************************/
/***/ (() => {

"use strict";

if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/memoize-one/dist/memoize-one.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/memoize-one/dist/memoize-one.esm.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoizeOne);


/***/ }),

/***/ "./node_modules/flatpickr/dist/themes/light.css":
/*!******************************************************!*\
  !*** ./node_modules/flatpickr/dist/themes/light.css ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/SelectObj1.scss":
/*!*********************************************!*\
  !*** ./src/components/scss/SelectObj1.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/alignment.scss":
/*!********************************************!*\
  !*** ./src/components/scss/alignment.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/background.scss":
/*!*********************************************!*\
  !*** ./src/components/scss/background.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/bgImage.scss":
/*!******************************************!*\
  !*** ./src/components/scss/bgImage.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/boxshadow.scss":
/*!********************************************!*\
  !*** ./src/components/scss/boxshadow.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/color.scss":
/*!****************************************!*\
  !*** ./src/components/scss/color.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/devices.scss":
/*!******************************************!*\
  !*** ./src/components/scss/devices.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/dimension.scss":
/*!********************************************!*\
  !*** ./src/components/scss/dimension.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/gradient.scss":
/*!*******************************************!*\
  !*** ./src/components/scss/gradient.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/iconList.scss":
/*!*******************************************!*\
  !*** ./src/components/scss/iconList.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/media.scss":
/*!****************************************!*\
  !*** ./src/components/scss/media.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/rangeDevice.scss":
/*!**********************************************!*\
  !*** ./src/components/scss/rangeDevice.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/styles.scss":
/*!*****************************************!*\
  !*** ./src/components/scss/styles.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/scss/typography.scss":
/*!*********************************************!*\
  !*** ./src/components/scss/typography.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-flatpickr/build/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-flatpickr/build/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _flatpickr = _interopRequireDefault(__webpack_require__(/*! flatpickr */ "./node_modules/flatpickr/dist/esm/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hooks = ['onChange', 'onOpen', 'onClose', 'onMonthChange', 'onYearChange', 'onReady', 'onValueUpdate', 'onDayCreate'];

var hookPropType = _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].func)]);

var callbacks = ['onCreate', 'onDestroy'];
var callbackPropTypes = _propTypes["default"].func;

var DateTimePicker = /*#__PURE__*/function (_Component) {
  _inherits(DateTimePicker, _Component);

  var _super = _createSuper(DateTimePicker);

  function DateTimePicker() {
    var _this;

    _classCallCheck(this, DateTimePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "createFlatpickrInstance", function () {
      var options = _objectSpread({
        onClose: function onClose() {
          _this.node.blur && _this.node.blur();
        }
      }, _this.props.options); // Add prop hooks to options


      options = mergeHooks(options, _this.props);
      _this.flatpickr = (0, _flatpickr["default"])(_this.node, options);

      if (_this.props.hasOwnProperty('value')) {
        _this.flatpickr.setDate(_this.props.value, false);
      }

      var onCreate = _this.props.onCreate;
      if (onCreate) onCreate(_this.flatpickr);
    });

    _defineProperty(_assertThisInitialized(_this), "destroyFlatpickrInstance", function () {
      var onDestroy = _this.props.onDestroy;
      if (onDestroy) onDestroy(_this.flatpickr);

      _this.flatpickr.destroy();

      _this.flatpickr = null;
    });

    _defineProperty(_assertThisInitialized(_this), "handleNodeChange", function (node) {
      _this.node = node;

      if (_this.flatpickr) {
        _this.destroyFlatpickrInstance();

        _this.createFlatpickrInstance();
      }
    });

    return _this;
  }

  _createClass(DateTimePicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var options = this.props.options;
      var prevOptions = prevProps.options;
      options = mergeHooks(options, this.props); // Add prev ones too so we can compare against them later

      prevOptions = mergeHooks(prevOptions, prevProps);
      var optionsKeys = Object.getOwnPropertyNames(options);

      for (var index = optionsKeys.length - 1; index >= 0; index--) {
        var key = optionsKeys[index];
        var value = options[key];

        if (value !== prevOptions[key]) {
          // Hook handlers must be set as an array
          if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
            value = [value];
          }

          this.flatpickr.set(key, value);
        }
      }

      if (this.props.hasOwnProperty('value') && !(this.props.value && Array.isArray(this.props.value) && prevProps.value && Array.isArray(prevProps.value) && this.props.value.every(function (v, i) {
        prevProps[i] === v;
      })) && this.props.value !== prevProps.value) {
        this.flatpickr.setDate(this.props.value, false);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createFlatpickrInstance();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroyFlatpickrInstance();
    }
  }, {
    key: "render",
    value: function render() {
      // eslint-disable-next-line no-unused-vars
      var _this$props = this.props,
          options = _this$props.options,
          defaultValue = _this$props.defaultValue,
          value = _this$props.value,
          children = _this$props.children,
          render = _this$props.render,
          props = _objectWithoutProperties(_this$props, ["options", "defaultValue", "value", "children", "render"]); // Don't pass hooks and callbacks to dom node


      hooks.forEach(function (hook) {
        delete props[hook];
      });
      callbacks.forEach(function (callback) {
        delete props[callback];
      });
      if (render) return render(_objectSpread(_objectSpread({}, props), {}, {
        defaultValue: defaultValue,
        value: value
      }), this.handleNodeChange);
      return options.wrap ? /*#__PURE__*/_react["default"].createElement("div", _extends({}, props, {
        ref: this.handleNodeChange
      }), children) : /*#__PURE__*/_react["default"].createElement("input", _extends({}, props, {
        defaultValue: defaultValue,
        ref: this.handleNodeChange
      }));
    }
  }]);

  return DateTimePicker;
}(_react.Component);

_defineProperty(DateTimePicker, "propTypes", {
  defaultValue: _propTypes["default"].string,
  options: _propTypes["default"].object,
  onChange: hookPropType,
  onOpen: hookPropType,
  onClose: hookPropType,
  onMonthChange: hookPropType,
  onYearChange: hookPropType,
  onReady: hookPropType,
  onValueUpdate: hookPropType,
  onDayCreate: hookPropType,
  onCreate: callbackPropTypes,
  onDestroy: callbackPropTypes,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array, _propTypes["default"].object, _propTypes["default"].number]),
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  render: _propTypes["default"].func
});

_defineProperty(DateTimePicker, "defaultProps", {
  options: {}
});

function mergeHooks(inputOptions, props) {
  var options = _objectSpread({}, inputOptions);

  hooks.forEach(function (hook) {
    if (props.hasOwnProperty(hook)) {
      var _options$hook;

      if (options[hook] && !Array.isArray(options[hook])) {
        options[hook] = [options[hook]];
      } else if (!options[hook]) {
        options[hook] = [];
      }

      var propHook = Array.isArray(props[hook]) ? props[hook] : [props[hook]];

      (_options$hook = options[hook]).push.apply(_options$hook, _toConsumableArray(propHook));
    }
  });
  return options;
}

var _default = DateTimePicker;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/react-select/dist/Select-54ac8379.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-select/dist/Select-54ac8379.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ Select),
/* harmony export */   "a": () => (/* binding */ getOptionLabel$1),
/* harmony export */   "b": () => (/* binding */ defaultProps),
/* harmony export */   "c": () => (/* binding */ createFilter),
/* harmony export */   "d": () => (/* binding */ defaultTheme),
/* harmony export */   "g": () => (/* binding */ getOptionValue$1),
/* harmony export */   "m": () => (/* binding */ mergeStyles)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./index-a7690a33.esm.js */ "./node_modules/react-select/dist/index-a7690a33.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");












function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var _ref =  false ? 0 : {
  name: "1f43avz-a11yText-A11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};

var A11yText = function A11yText(props) {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: _ref
  }, props));
};

var defaultAriaLiveMessages = {
  guidance: function guidance(props) {
    var isSearchable = props.isSearchable,
        isMulti = props.isMulti,
        isDisabled = props.isDisabled,
        tabSelectsValue = props.tabSelectsValue,
        context = props.context;

    switch (context) {
      case 'menu':
        return "Use Up and Down to choose options".concat(isDisabled ? '' : ', press Enter to select the currently focused option', ", press Escape to exit the menu").concat(tabSelectsValue ? ', press Tab to select the option and exit the menu' : '', ".");

      case 'input':
        return "".concat(props['aria-label'] || 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '');

      case 'value':
        return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';

      default:
        return '';
    }
  },
  onChange: function onChange(props) {
    var action = props.action,
        _props$label = props.label,
        label = _props$label === void 0 ? '' : _props$label,
        labels = props.labels,
        isDisabled = props.isDisabled;

    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return "option ".concat(label, ", deselected.");

      case 'clear':
        return 'All selected options have been cleared.';

      case 'initial-input-focus':
        return "option".concat(labels.length > 1 ? 's' : '', " ").concat(labels.join(','), ", selected.");

      case 'select-option':
        return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");

      default:
        return '';
    }
  },
  onFocus: function onFocus(props) {
    var context = props.context,
        focused = props.focused,
        options = props.options,
        _props$label2 = props.label,
        label = _props$label2 === void 0 ? '' : _props$label2,
        selectValue = props.selectValue,
        isDisabled = props.isDisabled,
        isSelected = props.isSelected;

    var getArrayIndex = function getArrayIndex(arr, item) {
      return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : '';
    };

    if (context === 'value' && selectValue) {
      return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
    }

    if (context === 'menu') {
      var disabled = isDisabled ? ' disabled' : '';
      var status = "".concat(isSelected ? 'selected' : 'focused').concat(disabled);
      return "option ".concat(label, " ").concat(status, ", ").concat(getArrayIndex(options, focused), ".");
    }

    return '';
  },
  onFilter: function onFilter(props) {
    var inputValue = props.inputValue,
        resultsMessage = props.resultsMessage;
    return "".concat(resultsMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
  }
};

var LiveRegion = function LiveRegion(props) {
  var ariaSelection = props.ariaSelection,
      focusedOption = props.focusedOption,
      focusedValue = props.focusedValue,
      focusableOptions = props.focusableOptions,
      isFocused = props.isFocused,
      selectValue = props.selectValue,
      selectProps = props.selectProps,
      id = props.id;
  var ariaLiveMessages = selectProps.ariaLiveMessages,
      getOptionLabel = selectProps.getOptionLabel,
      inputValue = selectProps.inputValue,
      isMulti = selectProps.isMulti,
      isOptionDisabled = selectProps.isOptionDisabled,
      isSearchable = selectProps.isSearchable,
      menuIsOpen = selectProps.menuIsOpen,
      options = selectProps.options,
      screenReaderStatus = selectProps.screenReaderStatus,
      tabSelectsValue = selectProps.tabSelectsValue;
  var ariaLabel = selectProps['aria-label'];
  var ariaLive = selectProps['aria-live']; // Update aria live message configuration when prop changes

  var messages = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(function () {
    return (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({}, defaultAriaLiveMessages), ariaLiveMessages || {});
  }, [ariaLiveMessages]); // Update aria live selected option when prop changes

  var ariaSelected = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(function () {
    var message = '';

    if (ariaSelection && messages.onChange) {
      var option = ariaSelection.option,
          selectedOptions = ariaSelection.options,
          removedValue = ariaSelection.removedValue,
          removedValues = ariaSelection.removedValues,
          value = ariaSelection.value; // select-option when !isMulti does not return option so we assume selected option is value

      var asOption = function asOption(val) {
        return !Array.isArray(val) ? val : null;
      }; // If there is just one item from the action then get its label


      var selected = removedValue || option || asOption(value);
      var label = selected ? getOptionLabel(selected) : ''; // If there are multiple items from the action then return an array of labels

      var multiSelected = selectedOptions || removedValues || undefined;
      var labels = multiSelected ? multiSelected.map(getOptionLabel) : [];

      var onChangeProps = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({
        // multiSelected items are usually items that have already been selected
        // or set by the user as a default value so we assume they are not disabled
        isDisabled: selected && isOptionDisabled(selected, selectValue),
        label: label,
        labels: labels
      }, ariaSelection);

      message = messages.onChange(onChangeProps);
    }

    return message;
  }, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);
  var ariaFocused = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(function () {
    var focusMsg = '';
    var focused = focusedOption || focusedValue;
    var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));

    if (focused && messages.onFocus) {
      var onFocusProps = {
        focused: focused,
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused, selectValue),
        isSelected: isSelected,
        options: options,
        context: focused === focusedOption ? 'menu' : 'value',
        selectValue: selectValue
      };
      focusMsg = messages.onFocus(onFocusProps);
    }

    return focusMsg;
  }, [focusedOption, focusedValue, getOptionLabel, isOptionDisabled, messages, options, selectValue]);
  var ariaResults = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(function () {
    var resultsMsg = '';

    if (menuIsOpen && options.length && messages.onFilter) {
      var resultsMessage = screenReaderStatus({
        count: focusableOptions.length
      });
      resultsMsg = messages.onFilter({
        inputValue: inputValue,
        resultsMessage: resultsMessage
      });
    }

    return resultsMsg;
  }, [focusableOptions, inputValue, menuIsOpen, messages, options, screenReaderStatus]);
  var ariaGuidance = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(function () {
    var guidanceMsg = '';

    if (messages.guidance) {
      var context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
      guidanceMsg = messages.guidance({
        'aria-label': ariaLabel,
        context: context,
        isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
        isMulti: isMulti,
        isSearchable: isSearchable,
        tabSelectsValue: tabSelectsValue
      });
    }

    return guidanceMsg;
  }, [ariaLabel, focusedOption, focusedValue, isMulti, isOptionDisabled, isSearchable, menuIsOpen, messages, selectValue, tabSelectsValue]);
  var ariaContext = "".concat(ariaFocused, " ").concat(ariaResults, " ").concat(ariaGuidance);
  var ScreenReaderText = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
    id: "aria-selection"
  }, ariaSelected), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
    id: "aria-context"
  }, ariaContext));
  var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus';
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(A11yText, {
    id: id
  }, isInitialFocus && ScreenReaderText), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(A11yText, {
    "aria-live": ariaLive,
    "aria-atomic": "false",
    "aria-relevant": "additions text"
  }, isFocused && !isInitialFocus && ScreenReaderText));
};

var diacritics = [{
  base: 'A',
  letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
}, {
  base: 'AA',
  letters: "\uA732"
}, {
  base: 'AE',
  letters: "\xC6\u01FC\u01E2"
}, {
  base: 'AO',
  letters: "\uA734"
}, {
  base: 'AU',
  letters: "\uA736"
}, {
  base: 'AV',
  letters: "\uA738\uA73A"
}, {
  base: 'AY',
  letters: "\uA73C"
}, {
  base: 'B',
  letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
}, {
  base: 'C',
  letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
}, {
  base: 'D',
  letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779"
}, {
  base: 'DZ',
  letters: "\u01F1\u01C4"
}, {
  base: 'Dz',
  letters: "\u01F2\u01C5"
}, {
  base: 'E',
  letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
}, {
  base: 'F',
  letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
}, {
  base: 'G',
  letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
}, {
  base: 'H',
  letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
}, {
  base: 'I',
  letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
}, {
  base: 'J',
  letters: "J\u24BF\uFF2A\u0134\u0248"
}, {
  base: 'K',
  letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
}, {
  base: 'L',
  letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
}, {
  base: 'LJ',
  letters: "\u01C7"
}, {
  base: 'Lj',
  letters: "\u01C8"
}, {
  base: 'M',
  letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
}, {
  base: 'N',
  letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
}, {
  base: 'NJ',
  letters: "\u01CA"
}, {
  base: 'Nj',
  letters: "\u01CB"
}, {
  base: 'O',
  letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
}, {
  base: 'OI',
  letters: "\u01A2"
}, {
  base: 'OO',
  letters: "\uA74E"
}, {
  base: 'OU',
  letters: "\u0222"
}, {
  base: 'P',
  letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
}, {
  base: 'Q',
  letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
}, {
  base: 'R',
  letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
}, {
  base: 'S',
  letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
}, {
  base: 'T',
  letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
}, {
  base: 'TZ',
  letters: "\uA728"
}, {
  base: 'U',
  letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
}, {
  base: 'V',
  letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
}, {
  base: 'VY',
  letters: "\uA760"
}, {
  base: 'W',
  letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
}, {
  base: 'X',
  letters: "X\u24CD\uFF38\u1E8A\u1E8C"
}, {
  base: 'Y',
  letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
}, {
  base: 'Z',
  letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
}, {
  base: 'a',
  letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
}, {
  base: 'aa',
  letters: "\uA733"
}, {
  base: 'ae',
  letters: "\xE6\u01FD\u01E3"
}, {
  base: 'ao',
  letters: "\uA735"
}, {
  base: 'au',
  letters: "\uA737"
}, {
  base: 'av',
  letters: "\uA739\uA73B"
}, {
  base: 'ay',
  letters: "\uA73D"
}, {
  base: 'b',
  letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
}, {
  base: 'c',
  letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
}, {
  base: 'd',
  letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
}, {
  base: 'dz',
  letters: "\u01F3\u01C6"
}, {
  base: 'e',
  letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
}, {
  base: 'f',
  letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
}, {
  base: 'g',
  letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
}, {
  base: 'h',
  letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
}, {
  base: 'hv',
  letters: "\u0195"
}, {
  base: 'i',
  letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
}, {
  base: 'j',
  letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
}, {
  base: 'k',
  letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
}, {
  base: 'l',
  letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
}, {
  base: 'lj',
  letters: "\u01C9"
}, {
  base: 'm',
  letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
}, {
  base: 'n',
  letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
}, {
  base: 'nj',
  letters: "\u01CC"
}, {
  base: 'o',
  letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
}, {
  base: 'oi',
  letters: "\u01A3"
}, {
  base: 'ou',
  letters: "\u0223"
}, {
  base: 'oo',
  letters: "\uA74F"
}, {
  base: 'p',
  letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
}, {
  base: 'q',
  letters: "q\u24E0\uFF51\u024B\uA757\uA759"
}, {
  base: 'r',
  letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
}, {
  base: 's',
  letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
}, {
  base: 't',
  letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
}, {
  base: 'tz',
  letters: "\uA729"
}, {
  base: 'u',
  letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
}, {
  base: 'v',
  letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
}, {
  base: 'vy',
  letters: "\uA761"
}, {
  base: 'w',
  letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
}, {
  base: 'x',
  letters: "x\u24E7\uFF58\u1E8B\u1E8D"
}, {
  base: 'y',
  letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
}, {
  base: 'z',
  letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
}];
var anyDiacritic = new RegExp('[' + diacritics.map(function (d) {
  return d.letters;
}).join('') + ']', 'g');
var diacriticToBase = {};

for (var i = 0; i < diacritics.length; i++) {
  var diacritic = diacritics[i];

  for (var j = 0; j < diacritic.letters.length; j++) {
    diacriticToBase[diacritic.letters[j]] = diacritic.base;
  }
}

var stripDiacritics = function stripDiacritics(str) {
  return str.replace(anyDiacritic, function (match) {
    return diacriticToBase[match];
  });
};

var memoizedStripDiacriticsForInput = (0,memoize_one__WEBPACK_IMPORTED_MODULE_9__["default"])(stripDiacritics);

var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var defaultStringify = function defaultStringify(option) {
  return "".concat(option.label, " ").concat(option.value);
};

var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    // eslint-disable-next-line no-underscore-dangle
    if (option.data.__isNew__) return true;

    var _ignoreCase$ignoreAcc = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({
      ignoreCase: true,
      ignoreAccents: true,
      stringify: defaultStringify,
      trim: true,
      matchFrom: 'any'
    }, config),
        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
        stringify = _ignoreCase$ignoreAcc.stringify,
        trim = _ignoreCase$ignoreAcc.trim,
        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);

    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }

    if (ignoreAccents) {
      input = memoizedStripDiacriticsForInput(input);
      candidate = stripDiacritics(candidate);
    }

    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

var _excluded = ["innerRef"];
function DummyInput(_ref) {
  var innerRef = _ref.innerRef,
      props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref, _excluded);

  // Remove animation props not meant for HTML elements
  var filteredProps = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.r)(props, 'onExited', 'in', 'enter', 'exit', 'appear');
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: innerRef
  }, filteredProps, {
    css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.css)({
      label: 'dummyInput',
      // get rid of any default styles
      background: 0,
      border: 0,
      // important! this hides the flashing cursor
      caretColor: 'transparent',
      fontSize: 'inherit',
      gridArea: '1 / 1 / 2 / 3',
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: 'transparent',
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: 'relative',
      transform: 'scale(.01)'
    },  false ? 0 : ";label:DummyInput;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgcmVtb3ZlUHJvcHMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIER1bW15SW5wdXQoe1xuICBpbm5lclJlZixcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW5wdXQnXSAmIHtcbiAgcmVhZG9ubHkgaW5uZXJSZWY6IFJlZjxIVE1MSW5wdXRFbGVtZW50Pjtcbn0pIHtcbiAgLy8gUmVtb3ZlIGFuaW1hdGlvbiBwcm9wcyBub3QgbWVhbnQgZm9yIEhUTUwgZWxlbWVudHNcbiAgY29uc3QgZmlsdGVyZWRQcm9wcyA9IHJlbW92ZVByb3BzKFxuICAgIHByb3BzLFxuICAgICdvbkV4aXRlZCcsXG4gICAgJ2luJyxcbiAgICAnZW50ZXInLFxuICAgICdleGl0JyxcbiAgICAnYXBwZWFyJ1xuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLmZpbHRlcmVkUHJvcHN9XG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdkdW1teUlucHV0JyxcbiAgICAgICAgLy8gZ2V0IHJpZCBvZiBhbnkgZGVmYXVsdCBzdHlsZXNcbiAgICAgICAgYmFja2dyb3VuZDogMCxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHRoaXMgaGlkZXMgdGhlIGZsYXNoaW5nIGN1cnNvclxuICAgICAgICBjYXJldENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgICBncmlkQXJlYTogJzEgLyAxIC8gMiAvIDMnLFxuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHdpdGhvdXQgYHdpZHRoYCBicm93c2VycyB3b24ndCBhbGxvdyBmb2N1c1xuICAgICAgICB3aWR0aDogMSxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIGRlc2t0b3BcbiAgICAgICAgY29sb3I6ICd0cmFuc3BhcmVudCcsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBtb2JpbGUgd2hpbHN0IG1haW50YWluaW5nIFwic2Nyb2xsIGludG8gdmlld1wiIGJlaGF2aW91clxuICAgICAgICBsZWZ0OiAtMTAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoLjAxKScsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG4iXX0= */")
  }));
}

var cancelScroll = function cancelScroll(event) {
  event.preventDefault();
  event.stopPropagation();
};

function useScrollCapture(_ref) {
  var isEnabled = _ref.isEnabled,
      onBottomArrive = _ref.onBottomArrive,
      onBottomLeave = _ref.onBottomLeave,
      onTopArrive = _ref.onTopArrive,
      onTopLeave = _ref.onTopLeave;
  var isBottom = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(false);
  var isTop = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(false);
  var touchStart = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(0);
  var scrollTarget = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
  var handleEventDelta = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (event, delta) {
    if (scrollTarget.current === null) return;
    var _scrollTarget$current = scrollTarget.current,
        scrollTop = _scrollTarget$current.scrollTop,
        scrollHeight = _scrollTarget$current.scrollHeight,
        clientHeight = _scrollTarget$current.clientHeight;
    var target = scrollTarget.current;
    var isDeltaPositive = delta > 0;
    var availableScroll = scrollHeight - clientHeight - scrollTop;
    var shouldCancelScroll = false; // reset bottom/top flags

    if (availableScroll > delta && isBottom.current) {
      if (onBottomLeave) onBottomLeave(event);
      isBottom.current = false;
    }

    if (isDeltaPositive && isTop.current) {
      if (onTopLeave) onTopLeave(event);
      isTop.current = false;
    } // bottom limit


    if (isDeltaPositive && delta > availableScroll) {
      if (onBottomArrive && !isBottom.current) {
        onBottomArrive(event);
      }

      target.scrollTop = scrollHeight;
      shouldCancelScroll = true;
      isBottom.current = true; // top limit
    } else if (!isDeltaPositive && -delta > scrollTop) {
      if (onTopArrive && !isTop.current) {
        onTopArrive(event);
      }

      target.scrollTop = 0;
      shouldCancelScroll = true;
      isTop.current = true;
    } // cancel scroll


    if (shouldCancelScroll) {
      cancelScroll(event);
    }
  }, [onBottomArrive, onBottomLeave, onTopArrive, onTopLeave]);
  var onWheel = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (event) {
    handleEventDelta(event, event.deltaY);
  }, [handleEventDelta]);
  var onTouchStart = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (event) {
    // set touch start so we can calculate touchmove delta
    touchStart.current = event.changedTouches[0].clientY;
  }, []);
  var onTouchMove = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (event) {
    var deltaY = touchStart.current - event.changedTouches[0].clientY;
    handleEventDelta(event, deltaY);
  }, [handleEventDelta]);
  var startListening = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (el) {
    // bail early if no element is available to attach to
    if (!el) return;
    var notPassive = _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.s ? {
      passive: false
    } : false;
    el.addEventListener('wheel', onWheel, notPassive);
    el.addEventListener('touchstart', onTouchStart, notPassive);
    el.addEventListener('touchmove', onTouchMove, notPassive);
  }, [onTouchMove, onTouchStart, onWheel]);
  var stopListening = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (el) {
    // bail early if no element is available to detach from
    if (!el) return;
    el.removeEventListener('wheel', onWheel, false);
    el.removeEventListener('touchstart', onTouchStart, false);
    el.removeEventListener('touchmove', onTouchMove, false);
  }, [onTouchMove, onTouchStart, onWheel]);
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    startListening(element);
    return function () {
      stopListening(element);
    };
  }, [isEnabled, startListening, stopListening]);
  return function (element) {
    scrollTarget.current = element;
  };
}

var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
var LOCK_STYLES = {
  boxSizing: 'border-box',
  // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};

function preventTouchMove(e) {
  e.preventDefault();
}

function allowTouchMove(e) {
  e.stopPropagation();
}

function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;

  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
} // `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface


function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
  capture: false,
  passive: false
};
function useScrollLock(_ref) {
  var isEnabled = _ref.isEnabled,
      _ref$accountForScroll = _ref.accountForScrollbars,
      accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
  var originalStyles = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)({});
  var scrollTarget = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
  var addScrollLock = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style;

    if (accountForScrollbars) {
      // store any styles already applied to the body
      STYLE_KEYS.forEach(function (key) {
        var val = targetStyle && targetStyle[key];
        originalStyles.current[key] = val;
      });
    } // apply the lock styles and padding if this is the first scroll lock


    if (accountForScrollbars && activeScrollLocks < 1) {
      var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
      var clientWidth = document.body ? document.body.clientWidth : 0;
      var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
      Object.keys(LOCK_STYLES).forEach(function (key) {
        var val = LOCK_STYLES[key];

        if (targetStyle) {
          targetStyle[key] = val;
        }
      });

      if (targetStyle) {
        targetStyle.paddingRight = "".concat(adjustedPadding, "px");
      }
    } // account for touch devices


    if (target && isTouchDevice()) {
      // Mobile Safari ignores { overflow: hidden } declaration on the body.
      target.addEventListener('touchmove', preventTouchMove, listenerOptions); // Allow scroll on provided target

      if (touchScrollTarget) {
        touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.addEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    } // increment active scroll locks


    activeScrollLocks += 1;
  }, [accountForScrollbars]);
  var removeScrollLock = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style; // safely decrement active scroll locks

    activeScrollLocks = Math.max(activeScrollLocks - 1, 0); // reapply original body styles, if any

    if (accountForScrollbars && activeScrollLocks < 1) {
      STYLE_KEYS.forEach(function (key) {
        var val = originalStyles.current[key];

        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
    } // remove touch listeners


    if (target && isTouchDevice()) {
      target.removeEventListener('touchmove', preventTouchMove, listenerOptions);

      if (touchScrollTarget) {
        touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.removeEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    }
  }, [accountForScrollbars]);
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    addScrollLock(element);
    return function () {
      removeScrollLock(element);
    };
  }, [isEnabled, addScrollLock, removeScrollLock]);
  return function (element) {
    scrollTarget.current = element;
  };
}

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var blurSelectInput = function blurSelectInput() {
  return document.activeElement && document.activeElement.blur();
};

var _ref2 =  false ? 0 : {
  name: "bp8cua-ScrollManager",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9ICgpID0+XG4gIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmJsdXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2Nyb2xsTWFuYWdlcih7XG4gIGNoaWxkcmVuLFxuICBsb2NrRW5hYmxlZCxcbiAgY2FwdHVyZUVuYWJsZWQgPSB0cnVlLFxuICBvbkJvdHRvbUFycml2ZSxcbiAgb25Cb3R0b21MZWF2ZSxcbiAgb25Ub3BBcnJpdmUsXG4gIG9uVG9wTGVhdmUsXG59OiBQcm9wcykge1xuICBjb25zdCBzZXRTY3JvbGxDYXB0dXJlVGFyZ2V0ID0gdXNlU2Nyb2xsQ2FwdHVyZSh7XG4gICAgaXNFbmFibGVkOiBjYXB0dXJlRW5hYmxlZCxcbiAgICBvbkJvdHRvbUFycml2ZSxcbiAgICBvbkJvdHRvbUxlYXZlLFxuICAgIG9uVG9wQXJyaXZlLFxuICAgIG9uVG9wTGVhdmUsXG4gIH0pO1xuICBjb25zdCBzZXRTY3JvbGxMb2NrVGFyZ2V0ID0gdXNlU2Nyb2xsTG9jayh7IGlzRW5hYmxlZDogbG9ja0VuYWJsZWQgfSk7XG5cbiAgY29uc3QgdGFyZ2V0UmVmOiBSZWZDYWxsYmFjazxIVE1MRWxlbWVudD4gPSAoZWxlbWVudCkgPT4ge1xuICAgIHNldFNjcm9sbENhcHR1cmVUYXJnZXQoZWxlbWVudCk7XG4gICAgc2V0U2Nyb2xsTG9ja1RhcmdldChlbGVtZW50KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIHtsb2NrRW5hYmxlZCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXtibHVyU2VsZWN0SW5wdXR9XG4gICAgICAgICAgY3NzPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0OiAwLCBib3R0b206IDAsIHJpZ2h0OiAwLCB0b3A6IDAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7Y2hpbGRyZW4odGFyZ2V0UmVmKX1cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufVxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

function ScrollManager(_ref) {
  var children = _ref.children,
      lockEnabled = _ref.lockEnabled,
      _ref$captureEnabled = _ref.captureEnabled,
      captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled,
      onBottomArrive = _ref.onBottomArrive,
      onBottomLeave = _ref.onBottomLeave,
      onTopArrive = _ref.onTopArrive,
      onTopLeave = _ref.onTopLeave;
  var setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive: onBottomArrive,
    onBottomLeave: onBottomLeave,
    onTopArrive: onTopArrive,
    onTopLeave: onTopLeave
  });
  var setScrollLockTarget = useScrollLock({
    isEnabled: lockEnabled
  });

  var targetRef = function targetRef(element) {
    setScrollCaptureTarget(element);
    setScrollLockTarget(element);
  };

  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null, lockEnabled && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
    onClick: blurSelectInput,
    css: _ref2
  }), children(targetRef));
}

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
  return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
  return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};

var defaultStyles = {
  clearIndicator: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.b,
  container: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.d,
  control: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.e,
  dropdownIndicator: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.f,
  group: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.g,
  groupHeading: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.h,
  indicatorsContainer: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.i,
  indicatorSeparator: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.j,
  input: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.k,
  loadingIndicator: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.l,
  loadingMessage: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.m,
  menu: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.n,
  menuList: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.o,
  menuPortal: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.p,
  multiValue: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.q,
  multiValueLabel: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.t,
  multiValueRemove: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.u,
  noOptionsMessage: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.v,
  option: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.w,
  placeholder: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.x,
  singleValue: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.y,
  valueContainer: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.z
}; // Merge Utility
// Allows consumers to extend a base Select with additional styles

function mergeStyles(source) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // initialize with source styles
  var styles = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({}, source); // massage in target styles


  Object.keys(target).forEach(function (keyAsString) {
    var key = keyAsString;

    if (source[key]) {
      styles[key] = function (rsCss, props) {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });
  return styles;
}

var colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',
  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
};
var borderRadius = 4; // Used to calculate consistent margin/padding on elements

var baseUnit = 4; // The minimum height of the control

var controlHeight = 38; // The amount of space between the control and menu */

var menuGutter = baseUnit * 2;
var spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
};
var defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};

var defaultProps = {
  'aria-live': 'polite',
  backspaceRemovesValue: true,
  blurInputOnSelect: (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.A)(),
  captureMenuScroll: !(0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.A)(),
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel$1,
  getOptionValue: getOptionValue$1,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !(0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.B)(),
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: true
};

function toCategorizedOption(props, option, selectValue, index) {
  var isDisabled = _isOptionDisabled(props, option, selectValue);

  var isSelected = _isOptionSelected(props, option, selectValue);

  var label = getOptionLabel(props, option);
  var value = getOptionValue(props, option);
  return {
    type: 'option',
    data: option,
    isDisabled: isDisabled,
    isSelected: isSelected,
    label: label,
    value: value,
    index: index
  };
}

function buildCategorizedOptions(props, selectValue) {
  return props.options.map(function (groupOrOption, groupOrOptionIndex) {
    if ('options' in groupOrOption) {
      var categorizedOptions = groupOrOption.options.map(function (option, optionIndex) {
        return toCategorizedOption(props, option, selectValue, optionIndex);
      }).filter(function (categorizedOption) {
        return isFocusable(props, categorizedOption);
      });
      return categorizedOptions.length > 0 ? {
        type: 'group',
        data: groupOrOption,
        options: categorizedOptions,
        index: groupOrOptionIndex
      } : undefined;
    }

    var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
    return isFocusable(props, categorizedOption) ? categorizedOption : undefined;
  }).filter(_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.H);
}

function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
  return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
    if (categorizedOption.type === 'group') {
      optionsAccumulator.push.apply(optionsAccumulator, (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__["default"])(categorizedOption.options.map(function (option) {
        return option.data;
      })));
    } else {
      optionsAccumulator.push(categorizedOption.data);
    }

    return optionsAccumulator;
  }, []);
}

function buildFocusableOptions(props, selectValue) {
  return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}

function isFocusable(props, categorizedOption) {
  var _props$inputValue = props.inputValue,
      inputValue = _props$inputValue === void 0 ? '' : _props$inputValue;
  var data = categorizedOption.data,
      isSelected = categorizedOption.isSelected,
      label = categorizedOption.label,
      value = categorizedOption.value;
  return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
    label: label,
    value: value,
    data: data
  }, inputValue);
}

function getNextFocusedValue(state, nextSelectValue) {
  var focusedValue = state.focusedValue,
      lastSelectValue = state.selectValue;
  var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);

  if (lastFocusedIndex > -1) {
    var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);

    if (nextFocusedIndex > -1) {
      // the focused value is still in the selectValue, return it
      return focusedValue;
    } else if (lastFocusedIndex < nextSelectValue.length) {
      // the focusedValue is not present in the next selectValue array by
      // reference, so return the new value at the same index
      return nextSelectValue[lastFocusedIndex];
    }
  }

  return null;
}

function getNextFocusedOption(state, options) {
  var lastFocusedOption = state.focusedOption;
  return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
}

var getOptionLabel = function getOptionLabel(props, data) {
  return props.getOptionLabel(data);
};

var getOptionValue = function getOptionValue(props, data) {
  return props.getOptionValue(data);
};

function _isOptionDisabled(props, option, selectValue) {
  return typeof props.isOptionDisabled === 'function' ? props.isOptionDisabled(option, selectValue) : false;
}

function _isOptionSelected(props, option, selectValue) {
  if (selectValue.indexOf(option) > -1) return true;

  if (typeof props.isOptionSelected === 'function') {
    return props.isOptionSelected(option, selectValue);
  }

  var candidate = getOptionValue(props, option);
  return selectValue.some(function (i) {
    return getOptionValue(props, i) === candidate;
  });
}

function _filterOption(props, option, inputValue) {
  return props.filterOption ? props.filterOption(option, inputValue) : true;
}

var shouldHideSelectedOptions = function shouldHideSelectedOptions(props) {
  var hideSelectedOptions = props.hideSelectedOptions,
      isMulti = props.isMulti;
  if (hideSelectedOptions === undefined) return isMulti;
  return hideSelectedOptions;
};

var instanceId = 1;

var Select = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Select, _Component);

  var _super = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__._)(Select);

  // Misc. Instance Properties
  // ------------------------------
  // TODO
  // Refs
  // ------------------------------
  // Lifecycle
  // ------------------------------
  function Select(_props) {
    var _this;

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Select);

    _this = _super.call(this, _props);
    _this.state = {
      ariaSelection: null,
      focusedOption: null,
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      selectValue: [],
      clearFocusValueOnUpdate: false,
      prevWasFocused: false,
      inputIsHiddenAfterUpdate: undefined,
      prevProps: undefined
    };
    _this.blockOptionHover = false;
    _this.isComposing = false;
    _this.commonProps = void 0;
    _this.initialTouchX = 0;
    _this.initialTouchY = 0;
    _this.instancePrefix = '';
    _this.openAfterFocus = false;
    _this.scrollToFocusedOptionOnUpdate = false;
    _this.userIsDragging = void 0;
    _this.controlRef = null;

    _this.getControlRef = function (ref) {
      _this.controlRef = ref;
    };

    _this.focusedOptionRef = null;

    _this.getFocusedOptionRef = function (ref) {
      _this.focusedOptionRef = ref;
    };

    _this.menuListRef = null;

    _this.getMenuListRef = function (ref) {
      _this.menuListRef = ref;
    };

    _this.inputRef = null;

    _this.getInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _this.focus = _this.focusInput;
    _this.blur = _this.blurInput;

    _this.onChange = function (newValue, actionMeta) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          name = _this$props.name;
      actionMeta.name = name;

      _this.ariaOnChange(newValue, actionMeta);

      onChange(newValue, actionMeta);
    };

    _this.setValue = function (newValue, action, option) {
      var _this$props2 = _this.props,
          closeMenuOnSelect = _this$props2.closeMenuOnSelect,
          isMulti = _this$props2.isMulti,
          inputValue = _this$props2.inputValue;

      _this.onInputChange('', {
        action: 'set-value',
        prevInputValue: inputValue
      });

      if (closeMenuOnSelect) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });

        _this.onMenuClose();
      } // when the select value should change, we should reset focusedValue


      _this.setState({
        clearFocusValueOnUpdate: true
      });

      _this.onChange(newValue, {
        action: action,
        option: option
      });
    };

    _this.selectOption = function (newValue) {
      var _this$props3 = _this.props,
          blurInputOnSelect = _this$props3.blurInputOnSelect,
          isMulti = _this$props3.isMulti,
          name = _this$props3.name;
      var selectValue = _this.state.selectValue;

      var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);

      var isDisabled = _this.isOptionDisabled(newValue, selectValue);

      if (deselected) {
        var candidate = _this.getOptionValue(newValue);

        _this.setValue((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.C)(selectValue.filter(function (i) {
          return _this.getOptionValue(i) !== candidate;
        })), 'deselect-option', newValue);
      } else if (!isDisabled) {
        // Select option if option is not disabled
        if (isMulti) {
          _this.setValue((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.C)([].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__["default"])(selectValue), [newValue])), 'select-option', newValue);
        } else {
          _this.setValue((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.D)(newValue), 'select-option');
        }
      } else {
        _this.ariaOnChange((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.D)(newValue), {
          action: 'select-option',
          option: newValue,
          name: name
        });

        return;
      }

      if (blurInputOnSelect) {
        _this.blurInput();
      }
    };

    _this.removeValue = function (removedValue) {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;

      var candidate = _this.getOptionValue(removedValue);

      var newValueArray = selectValue.filter(function (i) {
        return _this.getOptionValue(i) !== candidate;
      });
      var newValue = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.E)(isMulti, newValueArray, newValueArray[0] || null);

      _this.onChange(newValue, {
        action: 'remove-value',
        removedValue: removedValue
      });

      _this.focusInput();
    };

    _this.clearValue = function () {
      var selectValue = _this.state.selectValue;

      _this.onChange((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.E)(_this.props.isMulti, [], null), {
        action: 'clear',
        removedValues: selectValue
      });
    };

    _this.popValue = function () {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var lastSelectedValue = selectValue[selectValue.length - 1];
      var newValueArray = selectValue.slice(0, selectValue.length - 1);
      var newValue = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.E)(isMulti, newValueArray, newValueArray[0] || null);

      _this.onChange(newValue, {
        action: 'pop-value',
        removedValue: lastSelectedValue
      });
    };

    _this.getValue = function () {
      return _this.state.selectValue;
    };

    _this.cx = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.F.apply(void 0, [_this.props.classNamePrefix].concat(args));
    };

    _this.getOptionLabel = function (data) {
      return getOptionLabel(_this.props, data);
    };

    _this.getOptionValue = function (data) {
      return getOptionValue(_this.props, data);
    };

    _this.getStyles = function (key, props) {
      var base = defaultStyles[key](props);
      base.boxSizing = 'border-box';
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    };

    _this.getElementId = function (element) {
      return "".concat(_this.instancePrefix, "-").concat(element);
    };

    _this.getComponents = function () {
      return (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.G)(_this.props);
    };

    _this.buildCategorizedOptions = function () {
      return buildCategorizedOptions(_this.props, _this.state.selectValue);
    };

    _this.getCategorizedOptions = function () {
      return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
    };

    _this.buildFocusableOptions = function () {
      return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
    };

    _this.getFocusableOptions = function () {
      return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
    };

    _this.ariaOnChange = function (value, actionMeta) {
      _this.setState({
        ariaSelection: (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({
          value: value
        }, actionMeta)
      });
    };

    _this.onMenuMouseDown = function (event) {
      if (event.button !== 0) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      _this.focusInput();
    };

    _this.onMenuMouseMove = function (event) {
      _this.blockOptionHover = false;
    };

    _this.onControlMouseDown = function (event) {
      // Event captured by dropdown indicator
      if (event.defaultPrevented) {
        return;
      }

      var openMenuOnClick = _this.props.openMenuOnClick;

      if (!_this.state.isFocused) {
        if (openMenuOnClick) {
          _this.openAfterFocus = true;
        }

        _this.focusInput();
      } else if (!_this.props.menuIsOpen) {
        if (openMenuOnClick) {
          _this.openMenu('first');
        }
      } else {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          _this.onMenuClose();
        }
      }

      if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
      }
    };

    _this.onDropdownIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }

      if (_this.props.isDisabled) return;
      var _this$props4 = _this.props,
          isMulti = _this$props4.isMulti,
          menuIsOpen = _this$props4.menuIsOpen;

      _this.focusInput();

      if (menuIsOpen) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });

        _this.onMenuClose();
      } else {
        _this.openMenu('first');
      }

      event.preventDefault();
    };

    _this.onClearIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }

      _this.clearValue();

      event.preventDefault();
      _this.openAfterFocus = false;

      if (event.type === 'touchend') {
        _this.focusInput();
      } else {
        setTimeout(function () {
          return _this.focusInput();
        });
      }
    };

    _this.onScroll = function (event) {
      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
        if (event.target instanceof HTMLElement && (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.I)(event.target)) {
          _this.props.onMenuClose();
        }
      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
        if (_this.props.closeMenuOnScroll(event)) {
          _this.props.onMenuClose();
        }
      }
    };

    _this.onCompositionStart = function () {
      _this.isComposing = true;
    };

    _this.onCompositionEnd = function () {
      _this.isComposing = false;
    };

    _this.onTouchStart = function (_ref2) {
      var touches = _ref2.touches;
      var touch = touches && touches.item(0);

      if (!touch) {
        return;
      }

      _this.initialTouchX = touch.clientX;
      _this.initialTouchY = touch.clientY;
      _this.userIsDragging = false;
    };

    _this.onTouchMove = function (_ref3) {
      var touches = _ref3.touches;
      var touch = touches && touches.item(0);

      if (!touch) {
        return;
      }

      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
      var moveThreshold = 5;
      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
    };

    _this.onTouchEnd = function (event) {
      if (_this.userIsDragging) return; // close the menu if the user taps outside
      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
      // on events on child elements, not the document (which we've attached this handler to).

      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
        _this.blurInput();
      } // reset move vars


      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
    };

    _this.onControlTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onControlMouseDown(event);
    };

    _this.onClearIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onClearIndicatorMouseDown(event);
    };

    _this.onDropdownIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onDropdownIndicatorMouseDown(event);
    };

    _this.handleInputChange = function (event) {
      var prevInputValue = _this.props.inputValue;
      var inputValue = event.currentTarget.value;

      _this.setState({
        inputIsHiddenAfterUpdate: false
      });

      _this.onInputChange(inputValue, {
        action: 'input-change',
        prevInputValue: prevInputValue
      });

      if (!_this.props.menuIsOpen) {
        _this.onMenuOpen();
      }
    };

    _this.onInputFocus = function (event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }

      _this.setState({
        inputIsHiddenAfterUpdate: false,
        isFocused: true
      });

      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
        _this.openMenu('first');
      }

      _this.openAfterFocus = false;
    };

    _this.onInputBlur = function (event) {
      var prevInputValue = _this.props.inputValue;

      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
        _this.inputRef.focus();

        return;
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }

      _this.onInputChange('', {
        action: 'input-blur',
        prevInputValue: prevInputValue
      });

      _this.onMenuClose();

      _this.setState({
        focusedValue: null,
        isFocused: false
      });
    };

    _this.onOptionHover = function (focusedOption) {
      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
        return;
      }

      _this.setState({
        focusedOption: focusedOption
      });
    };

    _this.shouldHideSelectedOptions = function () {
      return shouldHideSelectedOptions(_this.props);
    };

    _this.onKeyDown = function (event) {
      var _this$props5 = _this.props,
          isMulti = _this$props5.isMulti,
          backspaceRemovesValue = _this$props5.backspaceRemovesValue,
          escapeClearsValue = _this$props5.escapeClearsValue,
          inputValue = _this$props5.inputValue,
          isClearable = _this$props5.isClearable,
          isDisabled = _this$props5.isDisabled,
          menuIsOpen = _this$props5.menuIsOpen,
          onKeyDown = _this$props5.onKeyDown,
          tabSelectsValue = _this$props5.tabSelectsValue,
          openMenuOnFocus = _this$props5.openMenuOnFocus;
      var _this$state = _this.state,
          focusedOption = _this$state.focusedOption,
          focusedValue = _this$state.focusedValue,
          selectValue = _this$state.selectValue;
      if (isDisabled) return;

      if (typeof onKeyDown === 'function') {
        onKeyDown(event);

        if (event.defaultPrevented) {
          return;
        }
      } // Block option hover events when the user has just pressed a key


      _this.blockOptionHover = true;

      switch (event.key) {
        case 'ArrowLeft':
          if (!isMulti || inputValue) return;

          _this.focusValue('previous');

          break;

        case 'ArrowRight':
          if (!isMulti || inputValue) return;

          _this.focusValue('next');

          break;

        case 'Delete':
        case 'Backspace':
          if (inputValue) return;

          if (focusedValue) {
            _this.removeValue(focusedValue);
          } else {
            if (!backspaceRemovesValue) return;

            if (isMulti) {
              _this.popValue();
            } else if (isClearable) {
              _this.clearValue();
            }
          }

          break;

        case 'Tab':
          if (_this.isComposing) return;

          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || // don't capture the event if the menu opens on focus and the focused
          // option is already selected; it breaks the flow of navigation
          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
            return;
          }

          _this.selectOption(focusedOption);

          break;

        case 'Enter':
          if (event.keyCode === 229) {
            // ignore the keydown event from an Input Method Editor(IME)
            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
            break;
          }

          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;

            _this.selectOption(focusedOption);

            break;
          }

          return;

        case 'Escape':
          if (menuIsOpen) {
            _this.setState({
              inputIsHiddenAfterUpdate: false
            });

            _this.onInputChange('', {
              action: 'menu-close',
              prevInputValue: inputValue
            });

            _this.onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            _this.clearValue();
          }

          break;

        case ' ':
          // space
          if (inputValue) {
            return;
          }

          if (!menuIsOpen) {
            _this.openMenu('first');

            break;
          }

          if (!focusedOption) return;

          _this.selectOption(focusedOption);

          break;

        case 'ArrowUp':
          if (menuIsOpen) {
            _this.focusOption('up');
          } else {
            _this.openMenu('last');
          }

          break;

        case 'ArrowDown':
          if (menuIsOpen) {
            _this.focusOption('down');
          } else {
            _this.openMenu('first');
          }

          break;

        case 'PageUp':
          if (!menuIsOpen) return;

          _this.focusOption('pageup');

          break;

        case 'PageDown':
          if (!menuIsOpen) return;

          _this.focusOption('pagedown');

          break;

        case 'Home':
          if (!menuIsOpen) return;

          _this.focusOption('first');

          break;

        case 'End':
          if (!menuIsOpen) return;

          _this.focusOption('last');

          break;

        default:
          return;
      }

      event.preventDefault();
    };

    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);
    _this.state.selectValue = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.J)(_props.value);
    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startListeningComposition();
      this.startListeningToTouch();

      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
        // Listen to all scroll events, and filter them out inside of 'onScroll'
        document.addEventListener('scroll', this.onScroll, true);
      }

      if (this.props.autoFocus) {
        this.focusInput();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
          isDisabled = _this$props6.isDisabled,
          menuIsOpen = _this$props6.menuIsOpen;
      var isFocused = this.state.isFocused;

      if ( // ensure focus is restored correctly when the control becomes enabled
      isFocused && !isDisabled && prevProps.isDisabled || // ensure focus is on the Input when the menu opens
      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
        this.focusInput();
      }

      if (isFocused && isDisabled && !prevProps.isDisabled) {
        // ensure select state gets blurred in case Select is programmatically disabled while focused
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isFocused: false
        }, this.onMenuClose);
      } // scroll the focused option into view if necessary


      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.K)(this.menuListRef, this.focusedOptionRef);
        this.scrollToFocusedOptionOnUpdate = false;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopListeningComposition();
      this.stopListeningToTouch();
      document.removeEventListener('scroll', this.onScroll, true);
    } // ==============================
    // Consumer Handlers
    // ==============================

  }, {
    key: "onMenuOpen",
    value: function onMenuOpen() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function onMenuClose() {
      this.onInputChange('', {
        action: 'menu-close',
        prevInputValue: this.props.inputValue
      });
      this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    } // ==============================
    // Methods
    // ==============================

  }, {
    key: "focusInput",
    value: function focusInput() {
      if (!this.inputRef) return;
      this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function blurInput() {
      if (!this.inputRef) return;
      this.inputRef.blur();
    } // aliased for consumers

  }, {
    key: "openMenu",
    value: function openMenu(focusOption) {
      var _this2 = this;

      var _this$state2 = this.state,
          selectValue = _this$state2.selectValue,
          isFocused = _this$state2.isFocused;
      var focusableOptions = this.buildFocusableOptions();
      var openAtIndex = focusOption === 'first' ? 0 : focusableOptions.length - 1;

      if (!this.props.isMulti) {
        var selectedIndex = focusableOptions.indexOf(selectValue[0]);

        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      } // only scroll if the menu isn't already open


      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
      this.setState({
        inputIsHiddenAfterUpdate: false,
        focusedValue: null,
        focusedOption: focusableOptions[openAtIndex]
      }, function () {
        return _this2.onMenuOpen();
      });
    }
  }, {
    key: "focusValue",
    value: function focusValue(direction) {
      var _this$state3 = this.state,
          selectValue = _this$state3.selectValue,
          focusedValue = _this$state3.focusedValue; // Only multiselects support value focusing

      if (!this.props.isMulti) return;
      this.setState({
        focusedOption: null
      });
      var focusedIndex = selectValue.indexOf(focusedValue);

      if (!focusedValue) {
        focusedIndex = -1;
      }

      var lastIndex = selectValue.length - 1;
      var nextFocus = -1;
      if (!selectValue.length) return;

      switch (direction) {
        case 'previous':
          if (focusedIndex === 0) {
            // don't cycle from the start to the end
            nextFocus = 0;
          } else if (focusedIndex === -1) {
            // if nothing is focused, focus the last value first
            nextFocus = lastIndex;
          } else {
            nextFocus = focusedIndex - 1;
          }

          break;

        case 'next':
          if (focusedIndex > -1 && focusedIndex < lastIndex) {
            nextFocus = focusedIndex + 1;
          }

          break;
      }

      this.setState({
        inputIsHidden: nextFocus !== -1,
        focusedValue: selectValue[nextFocus]
      });
    }
  }, {
    key: "focusOption",
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var pageSize = this.props.pageSize;
      var focusedOption = this.state.focusedOption;
      var options = this.getFocusableOptions();
      if (!options.length) return;
      var nextFocus = 0; // handles 'first'

      var focusedIndex = options.indexOf(focusedOption);

      if (!focusedOption) {
        focusedIndex = -1;
      }

      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }

      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options[nextFocus],
        focusedValue: null
      });
    }
  }, {
    key: "getTheme",
    value: // ==============================
    // Getters
    // ==============================
    function getTheme() {
      // Use the default theme if there are no customizations.
      if (!this.props.theme) {
        return defaultTheme;
      } // If the theme prop is a function, assume the function
      // knows how to merge the passed-in default theme with
      // its own modifications.


      if (typeof this.props.theme === 'function') {
        return this.props.theme(defaultTheme);
      } // Otherwise, if a plain theme object was passed in,
      // overlay it with the default theme.


      return (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({}, defaultTheme), this.props.theme);
    }
  }, {
    key: "getCommonProps",
    value: function getCommonProps() {
      var clearValue = this.clearValue,
          cx = this.cx,
          getStyles = this.getStyles,
          getValue = this.getValue,
          selectOption = this.selectOption,
          setValue = this.setValue,
          props = this.props;
      var isMulti = props.isMulti,
          isRtl = props.isRtl,
          options = props.options;
      var hasValue = this.hasValue();
      return {
        clearValue: clearValue,
        cx: cx,
        getStyles: getStyles,
        getValue: getValue,
        hasValue: hasValue,
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        selectProps: props,
        setValue: setValue,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      var selectValue = this.state.selectValue;
      return selectValue.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function hasOptions() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function isClearable() {
      var _this$props7 = this.props,
          isClearable = _this$props7.isClearable,
          isMulti = _this$props7.isMulti; // single select, by default, IS NOT clearable
      // multi select, by default, IS clearable

      if (isClearable === undefined) return isMulti;
      return isClearable;
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled(option, selectValue) {
      return _isOptionDisabled(this.props, option, selectValue);
    }
  }, {
    key: "isOptionSelected",
    value: function isOptionSelected(option, selectValue) {
      return _isOptionSelected(this.props, option, selectValue);
    }
  }, {
    key: "filterOption",
    value: function filterOption(option, inputValue) {
      return _filterOption(this.props, option, inputValue);
    }
  }, {
    key: "formatOptionLabel",
    value: function formatOptionLabel(data, context) {
      if (typeof this.props.formatOptionLabel === 'function') {
        var _inputValue = this.props.inputValue;
        var _selectValue = this.state.selectValue;
        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: _inputValue,
          selectValue: _selectValue
        });
      } else {
        return this.getOptionLabel(data);
      }
    }
  }, {
    key: "formatGroupLabel",
    value: function formatGroupLabel(data) {
      return this.props.formatGroupLabel(data);
    } // ==============================
    // Mouse Handlers
    // ==============================

  }, {
    key: "startListeningComposition",
    value: // ==============================
    // Composition Handlers
    // ==============================
    function startListeningComposition() {
      if (document && document.addEventListener) {
        document.addEventListener('compositionstart', this.onCompositionStart, false);
        document.addEventListener('compositionend', this.onCompositionEnd, false);
      }
    }
  }, {
    key: "stopListeningComposition",
    value: function stopListeningComposition() {
      if (document && document.removeEventListener) {
        document.removeEventListener('compositionstart', this.onCompositionStart);
        document.removeEventListener('compositionend', this.onCompositionEnd);
      }
    }
  }, {
    key: "startListeningToTouch",
    value: // ==============================
    // Touch Handlers
    // ==============================
    function startListeningToTouch() {
      if (document && document.addEventListener) {
        document.addEventListener('touchstart', this.onTouchStart, false);
        document.addEventListener('touchmove', this.onTouchMove, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
      }
    }
  }, {
    key: "stopListeningToTouch",
    value: function stopListeningToTouch() {
      if (document && document.removeEventListener) {
        document.removeEventListener('touchstart', this.onTouchStart);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
      }
    }
  }, {
    key: "renderInput",
    value: // ==============================
    // Renderers
    // ==============================
    function renderInput() {
      var _this$props8 = this.props,
          isDisabled = _this$props8.isDisabled,
          isSearchable = _this$props8.isSearchable,
          inputId = _this$props8.inputId,
          inputValue = _this$props8.inputValue,
          tabIndex = _this$props8.tabIndex,
          form = _this$props8.form,
          menuIsOpen = _this$props8.menuIsOpen;

      var _this$getComponents = this.getComponents(),
          Input = _this$getComponents.Input;

      var _this$state4 = this.state,
          inputIsHidden = _this$state4.inputIsHidden,
          ariaSelection = _this$state4.ariaSelection;
      var commonProps = this.commonProps;
      var id = inputId || this.getElementId('input'); // aria attributes makes the JSX "noisy", separated for clarity

      var ariaAttributes = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({
        'aria-autocomplete': 'list',
        'aria-expanded': menuIsOpen,
        'aria-haspopup': true,
        'aria-errormessage': this.props['aria-errormessage'],
        'aria-invalid': this.props['aria-invalid'],
        'aria-label': this.props['aria-label'],
        'aria-labelledby': this.props['aria-labelledby'],
        role: 'combobox'
      }, menuIsOpen && {
        'aria-controls': this.getElementId('listbox'),
        'aria-owns': this.getElementId('listbox')
      }), !isSearchable && {
        'aria-readonly': true
      }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus' && {
        'aria-describedby': this.getElementId('live-region')
      } : {
        'aria-describedby': this.getElementId('placeholder')
      });

      if (!isSearchable) {
        // use a dummy input to maintain focus/blur functionality
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(DummyInput, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          id: id,
          innerRef: this.getInputRef,
          onBlur: this.onInputBlur,
          onChange: _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.L,
          onFocus: this.onInputFocus,
          disabled: isDisabled,
          tabIndex: tabIndex,
          inputMode: "none",
          form: form,
          value: ""
        }, ariaAttributes));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(Input, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        id: id,
        innerRef: this.getInputRef,
        isDisabled: isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: "false",
        tabIndex: tabIndex,
        form: form,
        type: "text",
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: "renderPlaceholderOrValue",
    value: function renderPlaceholderOrValue() {
      var _this3 = this;

      var _this$getComponents2 = this.getComponents(),
          MultiValue = _this$getComponents2.MultiValue,
          MultiValueContainer = _this$getComponents2.MultiValueContainer,
          MultiValueLabel = _this$getComponents2.MultiValueLabel,
          MultiValueRemove = _this$getComponents2.MultiValueRemove,
          SingleValue = _this$getComponents2.SingleValue,
          Placeholder = _this$getComponents2.Placeholder;

      var commonProps = this.commonProps;
      var _this$props9 = this.props,
          controlShouldRenderValue = _this$props9.controlShouldRenderValue,
          isDisabled = _this$props9.isDisabled,
          isMulti = _this$props9.isMulti,
          inputValue = _this$props9.inputValue,
          placeholder = _this$props9.placeholder;
      var _this$state5 = this.state,
          selectValue = _this$state5.selectValue,
          focusedValue = _this$state5.focusedValue,
          isFocused = _this$state5.isFocused;

      if (!this.hasValue() || !controlShouldRenderValue) {
        return inputValue ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(Placeholder, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          key: "placeholder",
          isDisabled: isDisabled,
          isFocused: isFocused,
          innerProps: {
            id: this.getElementId('placeholder')
          }
        }), placeholder);
      }

      if (isMulti) {
        return selectValue.map(function (opt, index) {
          var isOptionFocused = opt === focusedValue;
          var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(MultiValue, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
            components: {
              Container: MultiValueContainer,
              Label: MultiValueLabel,
              Remove: MultiValueRemove
            },
            isFocused: isOptionFocused,
            isDisabled: isDisabled,
            key: key,
            index: index,
            removeProps: {
              onClick: function onClick() {
                return _this3.removeValue(opt);
              },
              onTouchEnd: function onTouchEnd() {
                return _this3.removeValue(opt);
              },
              onMouseDown: function onMouseDown(e) {
                e.preventDefault();
              }
            },
            data: opt
          }), _this3.formatOptionLabel(opt, 'value'));
        });
      }

      if (inputValue) {
        return null;
      }

      var singleValue = selectValue[0];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(SingleValue, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        data: singleValue,
        isDisabled: isDisabled
      }), this.formatOptionLabel(singleValue, 'value'));
    }
  }, {
    key: "renderClearIndicator",
    value: function renderClearIndicator() {
      var _this$getComponents3 = this.getComponents(),
          ClearIndicator = _this$getComponents3.ClearIndicator;

      var commonProps = this.commonProps;
      var _this$props10 = this.props,
          isDisabled = _this$props10.isDisabled,
          isLoading = _this$props10.isLoading;
      var isFocused = this.state.isFocused;

      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }

      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(ClearIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function renderLoadingIndicator() {
      var _this$getComponents4 = this.getComponents(),
          LoadingIndicator = _this$getComponents4.LoadingIndicator;

      var commonProps = this.commonProps;
      var _this$props11 = this.props,
          isDisabled = _this$props11.isDisabled,
          isLoading = _this$props11.isLoading;
      var isFocused = this.state.isFocused;
      if (!LoadingIndicator || !isLoading) return null;
      var innerProps = {
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(LoadingIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function renderIndicatorSeparator() {
      var _this$getComponents5 = this.getComponents(),
          DropdownIndicator = _this$getComponents5.DropdownIndicator,
          IndicatorSeparator = _this$getComponents5.IndicatorSeparator; // separator doesn't make sense without the dropdown indicator


      if (!DropdownIndicator || !IndicatorSeparator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(IndicatorSeparator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function renderDropdownIndicator() {
      var _this$getComponents6 = this.getComponents(),
          DropdownIndicator = _this$getComponents6.DropdownIndicator;

      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      var innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(DropdownIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this4 = this;

      var _this$getComponents7 = this.getComponents(),
          Group = _this$getComponents7.Group,
          GroupHeading = _this$getComponents7.GroupHeading,
          Menu = _this$getComponents7.Menu,
          MenuList = _this$getComponents7.MenuList,
          MenuPortal = _this$getComponents7.MenuPortal,
          LoadingMessage = _this$getComponents7.LoadingMessage,
          NoOptionsMessage = _this$getComponents7.NoOptionsMessage,
          Option = _this$getComponents7.Option;

      var commonProps = this.commonProps;
      var focusedOption = this.state.focusedOption;
      var _this$props12 = this.props,
          captureMenuScroll = _this$props12.captureMenuScroll,
          inputValue = _this$props12.inputValue,
          isLoading = _this$props12.isLoading,
          loadingMessage = _this$props12.loadingMessage,
          minMenuHeight = _this$props12.minMenuHeight,
          maxMenuHeight = _this$props12.maxMenuHeight,
          menuIsOpen = _this$props12.menuIsOpen,
          menuPlacement = _this$props12.menuPlacement,
          menuPosition = _this$props12.menuPosition,
          menuPortalTarget = _this$props12.menuPortalTarget,
          menuShouldBlockScroll = _this$props12.menuShouldBlockScroll,
          menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView,
          noOptionsMessage = _this$props12.noOptionsMessage,
          onMenuScrollToTop = _this$props12.onMenuScrollToTop,
          onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
      if (!menuIsOpen) return null; // TODO: Internal Option Type here

      var render = function render(props, id) {
        var type = props.type,
            data = props.data,
            isDisabled = props.isDisabled,
            isSelected = props.isSelected,
            label = props.label,
            value = props.value;
        var isFocused = focusedOption === data;
        var onHover = isDisabled ? undefined : function () {
          return _this4.onOptionHover(data);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this4.selectOption(data);
        };
        var optionId = "".concat(_this4.getElementId('option'), "-").concat(id);
        var innerProps = {
          id: optionId,
          onClick: onSelect,
          onMouseMove: onHover,
          onMouseOver: onHover,
          tabIndex: -1
        };
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(Option, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          innerProps: innerProps,
          data: data,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: type,
          value: value,
          isFocused: isFocused,
          innerRef: isFocused ? _this4.getFocusedOptionRef : undefined
        }), _this4.formatOptionLabel(props.data, 'menu'));
      };

      var menuUI;

      if (this.hasOptions()) {
        menuUI = this.getCategorizedOptions().map(function (item) {
          if (item.type === 'group') {
            var _data = item.data,
                options = item.options,
                groupIndex = item.index;
            var groupId = "".concat(_this4.getElementId('group'), "-").concat(groupIndex);
            var headingId = "".concat(groupId, "-heading");
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(Group, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
              key: groupId,
              data: _data,
              options: options,
              Heading: GroupHeading,
              headingProps: {
                id: headingId,
                data: item.data
              },
              label: _this4.formatGroupLabel(item.data)
            }), item.options.map(function (option) {
              return render(option, "".concat(groupIndex, "-").concat(option.index));
            }));
          } else if (item.type === 'option') {
            return render(item, "".concat(item.index));
          }
        });
      } else if (isLoading) {
        var message = loadingMessage({
          inputValue: inputValue
        });
        if (message === null) return null;
        menuUI = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(LoadingMessage, commonProps, message);
      } else {
        var _message = noOptionsMessage({
          inputValue: inputValue
        });

        if (_message === null) return null;
        menuUI = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(NoOptionsMessage, commonProps, _message);
      }

      var menuPlacementProps = {
        minMenuHeight: minMenuHeight,
        maxMenuHeight: maxMenuHeight,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition,
        menuShouldScrollIntoView: menuShouldScrollIntoView
      };
      var menuElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.M, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, menuPlacementProps), function (_ref4) {
        var ref = _ref4.ref,
            _ref4$placerProps = _ref4.placerProps,
            placement = _ref4$placerProps.placement,
            maxHeight = _ref4$placerProps.maxHeight;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(Menu, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, menuPlacementProps, {
          innerRef: ref,
          innerProps: {
            onMouseDown: _this4.onMenuMouseDown,
            onMouseMove: _this4.onMenuMouseMove,
            id: _this4.getElementId('listbox')
          },
          isLoading: isLoading,
          placement: placement
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(ScrollManager, {
          captureEnabled: captureMenuScroll,
          onTopArrive: onMenuScrollToTop,
          onBottomArrive: onMenuScrollToBottom,
          lockEnabled: menuShouldBlockScroll
        }, function (scrollTargetRef) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(MenuList, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
            innerRef: function innerRef(instance) {
              _this4.getMenuListRef(instance);

              scrollTargetRef(instance);
            },
            isLoading: isLoading,
            maxHeight: maxHeight,
            focusedOption: focusedOption
          }), menuUI);
        }));
      }); // positioning behaviour is almost identical for portalled and fixed,
      // so we use the same component. the actual portalling logic is forked
      // within the component based on `menuPosition`

      return menuPortalTarget || menuPosition === 'fixed' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(MenuPortal, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        appendTo: menuPortalTarget,
        controlElement: this.controlRef,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition
      }), menuElement) : menuElement;
    }
  }, {
    key: "renderFormField",
    value: function renderFormField() {
      var _this5 = this;

      var _this$props13 = this.props,
          delimiter = _this$props13.delimiter,
          isDisabled = _this$props13.isDisabled,
          isMulti = _this$props13.isMulti,
          name = _this$props13.name;
      var selectValue = this.state.selectValue;
      if (!name || isDisabled) return;

      if (isMulti) {
        if (delimiter) {
          var value = selectValue.map(function (opt) {
            return _this5.getOptionValue(opt);
          }).join(delimiter);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("input", {
            name: name,
            type: "hidden",
            value: value
          });
        } else {
          var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("input", {
              key: "i-".concat(i),
              name: name,
              type: "hidden",
              value: _this5.getOptionValue(opt)
            });
          }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("input", {
            name: name,
            type: "hidden"
          });
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", null, input);
        }
      } else {
        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("input", {
          name: name,
          type: "hidden",
          value: _value
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function renderLiveRegion() {
      var commonProps = this.commonProps;
      var _this$state6 = this.state,
          ariaSelection = _this$state6.ariaSelection,
          focusedOption = _this$state6.focusedOption,
          focusedValue = _this$state6.focusedValue,
          isFocused = _this$state6.isFocused,
          selectValue = _this$state6.selectValue;
      var focusableOptions = this.getFocusableOptions();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(LiveRegion, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        id: this.getElementId('live-region'),
        ariaSelection: ariaSelection,
        focusedOption: focusedOption,
        focusedValue: focusedValue,
        isFocused: isFocused,
        selectValue: selectValue,
        focusableOptions: focusableOptions
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$getComponents8 = this.getComponents(),
          Control = _this$getComponents8.Control,
          IndicatorsContainer = _this$getComponents8.IndicatorsContainer,
          SelectContainer = _this$getComponents8.SelectContainer,
          ValueContainer = _this$getComponents8.ValueContainer;

      var _this$props14 = this.props,
          className = _this$props14.className,
          id = _this$props14.id,
          isDisabled = _this$props14.isDisabled,
          menuIsOpen = _this$props14.menuIsOpen;
      var isFocused = this.state.isFocused;
      var commonProps = this.commonProps = this.getCommonProps();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(SelectContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        className: className,
        innerProps: {
          id: id,
          onKeyDown: this.onKeyDown
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }), this.renderLiveRegion(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(Control, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: isDisabled,
        isFocused: isFocused,
        menuIsOpen: menuIsOpen
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(ValueContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderPlaceholderOrValue(), this.renderInput()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(IndicatorsContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevProps = state.prevProps,
          clearFocusValueOnUpdate = state.clearFocusValueOnUpdate,
          inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate,
          ariaSelection = state.ariaSelection,
          isFocused = state.isFocused,
          prevWasFocused = state.prevWasFocused;
      var options = props.options,
          value = props.value,
          menuIsOpen = props.menuIsOpen,
          inputValue = props.inputValue,
          isMulti = props.isMulti;
      var selectValue = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.J)(value);
      var newMenuOptionsState = {};

      if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
        var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
        var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
        var focusedOption = getNextFocusedOption(state, focusableOptions);
        newMenuOptionsState = {
          selectValue: selectValue,
          focusedOption: focusedOption,
          focusedValue: focusedValue,
          clearFocusValueOnUpdate: false
        };
      } // some updates should toggle the state of the input visibility


      var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
        inputIsHidden: inputIsHiddenAfterUpdate,
        inputIsHiddenAfterUpdate: undefined
      } : {};
      var newAriaSelection = ariaSelection;
      var hasKeptFocus = isFocused && prevWasFocused;

      if (isFocused && !hasKeptFocus) {
        // If `value` or `defaultValue` props are not empty then announce them
        // when the Select is initially focused
        newAriaSelection = {
          value: (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.E)(isMulti, selectValue, selectValue[0] || null),
          options: selectValue,
          action: 'initial-input-focus'
        };
        hasKeptFocus = !prevWasFocused;
      } // If the 'initial-input-focus' action has been set already
      // then reset the ariaSelection to null


      if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus') {
        newAriaSelection = null;
      }

      return (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_8__.a)({}, newMenuOptionsState), newInputIsHiddenState), {}, {
        prevProps: props,
        ariaSelection: newAriaSelection,
        prevWasFocused: hasKeptFocus
      });
    }
  }]);

  return Select;
}(react__WEBPACK_IMPORTED_MODULE_5__.Component);

Select.defaultProps = defaultProps;




/***/ }),

/***/ "./node_modules/react-select/dist/index-a7690a33.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-select/dist/index-a7690a33.esm.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ isTouchCapable),
/* harmony export */   "B": () => (/* binding */ isMobileDevice),
/* harmony export */   "C": () => (/* binding */ multiValueAsValue),
/* harmony export */   "D": () => (/* binding */ singleValueAsValue),
/* harmony export */   "E": () => (/* binding */ valueTernary),
/* harmony export */   "F": () => (/* binding */ classNames),
/* harmony export */   "G": () => (/* binding */ defaultComponents),
/* harmony export */   "H": () => (/* binding */ notNullish),
/* harmony export */   "I": () => (/* binding */ isDocumentElement),
/* harmony export */   "J": () => (/* binding */ cleanValue),
/* harmony export */   "K": () => (/* binding */ scrollIntoView),
/* harmony export */   "L": () => (/* binding */ noop),
/* harmony export */   "M": () => (/* binding */ MenuPlacer),
/* harmony export */   "N": () => (/* binding */ handleInputChange),
/* harmony export */   "_": () => (/* binding */ _createSuper),
/* harmony export */   "a": () => (/* binding */ _objectSpread2),
/* harmony export */   "b": () => (/* binding */ clearIndicatorCSS),
/* harmony export */   "c": () => (/* binding */ components),
/* harmony export */   "d": () => (/* binding */ containerCSS),
/* harmony export */   "e": () => (/* binding */ css$1),
/* harmony export */   "f": () => (/* binding */ dropdownIndicatorCSS),
/* harmony export */   "g": () => (/* binding */ groupCSS),
/* harmony export */   "h": () => (/* binding */ groupHeadingCSS),
/* harmony export */   "i": () => (/* binding */ indicatorsContainerCSS),
/* harmony export */   "j": () => (/* binding */ indicatorSeparatorCSS),
/* harmony export */   "k": () => (/* binding */ inputCSS),
/* harmony export */   "l": () => (/* binding */ loadingIndicatorCSS),
/* harmony export */   "m": () => (/* binding */ loadingMessageCSS),
/* harmony export */   "n": () => (/* binding */ menuCSS),
/* harmony export */   "o": () => (/* binding */ menuListCSS),
/* harmony export */   "p": () => (/* binding */ menuPortalCSS),
/* harmony export */   "q": () => (/* binding */ multiValueCSS),
/* harmony export */   "r": () => (/* binding */ removeProps),
/* harmony export */   "s": () => (/* binding */ supportsPassiveEvents),
/* harmony export */   "t": () => (/* binding */ multiValueLabelCSS),
/* harmony export */   "u": () => (/* binding */ multiValueRemoveCSS),
/* harmony export */   "v": () => (/* binding */ noOptionsMessageCSS),
/* harmony export */   "w": () => (/* binding */ optionCSS),
/* harmony export */   "x": () => (/* binding */ placeholderCSS),
/* harmony export */   "y": () => (/* binding */ css),
/* harmony export */   "z": () => (/* binding */ valueContainerCSS)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_10__);













function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var _excluded$3 = ["className", "clearValue", "cx", "getStyles", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
// ==============================
// NO OP
// ==============================
var noop = function noop() {};
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/

function applyPrefixToName(prefix, name) {
  if (!name) {
    return prefix;
  } else if (name[0] === '-') {
    return prefix + name;
  } else {
    return prefix + '__' + name;
  }
}

function classNames(prefix, state, className) {
  var arr = [className];

  if (state && prefix) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push("".concat(applyPrefixToName(prefix, key)));
      }
    }
  }

  return arr.filter(function (i) {
    return i;
  }).map(function (i) {
    return String(i).trim();
  }).join(' ');
} // ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (isArray(value)) return value.filter(Boolean);
  if ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_4__["default"])(value) === 'object' && value !== null) return [value];
  return [];
}; // ==============================
// Clean Common Props
// ==============================

var cleanCommonProps = function cleanCommonProps(props) {
  //className
  props.className;
      props.clearValue;
      props.cx;
      props.getStyles;
      props.getValue;
      props.hasValue;
      props.isMulti;
      props.isRtl;
      props.options;
      props.selectOption;
      props.selectProps;
      props.setValue;
      props.theme;
      var innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(props, _excluded$3);

  return _objectSpread2({}, innerProps);
}; // ==============================
// Handle Input Change
// ==============================

function handleInputChange(inputValue, actionMeta, onInputChange) {
  if (onInputChange) {
    var _newValue = onInputChange(inputValue, actionMeta);

    if (typeof _newValue === 'string') return _newValue;
  }

  return inputValue;
} // ==============================
// Scroll Helpers
// ==============================

function isDocumentElement(el) {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
} // Normalized Scroll Top
// ------------------------------

function normalizedHeight(el) {
  if (isDocumentElement(el)) {
    return window.innerHeight;
  }

  return el.clientHeight;
} // Normalized scrollTo & scrollTop
// ------------------------------

function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }

  return el.scrollTop;
}
function scrollTo(el, top) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }

  el.scrollTop = top;
} // Get Scroll Parent
// ------------------------------

function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === 'absolute';
  var overflowRx = /(auto|scroll)/;
  if (style.position === 'fixed') return document.documentElement;

  for (var parent = element; parent = parent.parentElement;) {
    style = getComputedStyle(parent);

    if (excludeStaticParent && style.position === 'static') {
      continue;
    }

    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return document.documentElement;
} // Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function animatedScrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;

  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);

    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }

  animateScroll();
} // Scroll Into View
// ------------------------------

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
} // ==============================
// Get bounding client object
// ==============================
// cannot get keys using array notation with DOMRect

function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}
// Touch Capability Detector
// ==============================

function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
} // ==============================
// Mobile Device Detector
// ==============================

function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
} // ==============================
// Passive Event Detector
// ==============================
// https://github.com/rafgraph/detect-it/blob/main/src/index.ts#L19-L36

var passiveOptionAccessed = false;
var options = {
  get passive() {
    return passiveOptionAccessed = true;
  }

}; // check for SSR

var w = typeof window !== 'undefined' ? window : {};

if (w.addEventListener && w.removeEventListener) {
  w.addEventListener('p', noop, options);
  w.removeEventListener('p', noop, false);
}

var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
  return item != null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
  return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
  return singleValue;
}
function multiValueAsValue(multiValue) {
  return multiValue;
}
var removeProps = function removeProps(propsObj) {
  for (var _len = arguments.length, properties = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    properties[_key - 1] = arguments[_key];
  }

  var propsMap = Object.entries(propsObj).filter(function (_ref) {
    var _ref2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref, 1),
        key = _ref2[0];

    return !properties.includes(key);
  });
  return propsMap.reduce(function (newProps, _ref3) {
    var _ref4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    newProps[key] = val;
    return newProps;
  }, {});
};

function getMenuPlacement(_ref) {
  var maxHeight = _ref.maxHeight,
      menuEl = _ref.menuEl,
      minHeight = _ref.minHeight,
      placement = _ref.placement,
      shouldScroll = _ref.shouldScroll,
      isFixedPosition = _ref.isFixedPosition,
      theme = _ref.theme;
  var spacing = theme.spacing;
  var scrollParent = getScrollParent(menuEl);
  var defaultState = {
    placement: 'bottom',
    maxHeight: maxHeight
  }; // something went wrong, return default state

  if (!menuEl || !menuEl.offsetParent) return defaultState; // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered

  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
      scrollHeight = _scrollParent$getBoun.height;

  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
      menuBottom = _menuEl$getBoundingCl.bottom,
      menuHeight = _menuEl$getBoundingCl.height,
      menuTop = _menuEl$getBoundingCl.top;

  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
      containerTop = _menuEl$offsetParent$.top;

  var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
  var scrollTop = getScrollTop(scrollParent);
  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  var viewSpaceAbove = containerTop - marginTop;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  var scrollUp = scrollTop + menuTop - marginTop;
  var scrollDuration = 160;

  switch (placement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      } // 2: the menu will fit, if scrolled


      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      } // 3: the menu will fit, if constrained


      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        } // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.


        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
        return {
          placement: 'bottom',
          maxHeight: constrainedHeight
        };
      } // 4. Forked beviour when there isn't enough space below
      // AUTO: flip the menu, render above


      if (placement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        var _constrainedHeight = maxHeight;
        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

        if (spaceAbove >= minHeight) {
          _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight);
        }

        return {
          placement: 'top',
          maxHeight: _constrainedHeight
        };
      } // BOTTOM: allow browser to increase scrollable area and immediately set scroll


      if (placement === 'bottom') {
        if (shouldScroll) {
          scrollTo(scrollParent, scrollDown);
        }

        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      }

      break;

    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return {
          placement: 'top',
          maxHeight: maxHeight
        };
      } // 2: the menu will fit, if scrolled


      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: maxHeight
        };
      } // 3: the menu will fit, if constrained


      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = maxHeight; // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.

        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
        }

        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: _constrainedHeight2
        };
      } // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below


      return {
        placement: 'bottom',
        maxHeight: maxHeight
      };

    default:
      throw new Error("Invalid placement provided \"".concat(placement, "\"."));
  }

  return defaultState;
} // Menu Component
// ------------------------------

function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: 'top',
    top: 'bottom'
  };
  return placement ? placementToCSSProp[placement] : 'bottom';
}

var coercePlacement = function coercePlacement(p) {
  return p === 'auto' ? 'bottom' : p;
};

var menuCSS = function menuCSS(_ref2) {
  var _ref3;

  var placement = _ref2.placement,
      _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      spacing = _ref2$theme.spacing,
      colors = _ref2$theme.colors;
  return _ref3 = {
    label: 'menu'
  }, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, alignToControl(placement), '100%'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "backgroundColor", colors.neutral0), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "borderRadius", borderRadius), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "boxShadow", '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "marginBottom", spacing.menuGutter), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "marginTop", spacing.menuGutter), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "position", 'absolute'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "width", '100%'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, "zIndex", 1), _ref3;
};
var PortalPlacementContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_9__.createContext)({
  getPortalPlacement: null
}); // NOTE: internal only

var MenuPlacer = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(MenuPlacer, _Component);

  var _super = _createSuper(MenuPlacer);

  function MenuPlacer() {
    var _this;

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, MenuPlacer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      maxHeight: _this.props.maxMenuHeight,
      placement: null
    };
    _this.context = void 0;

    _this.getPlacement = function (ref) {
      var _this$props = _this.props,
          minMenuHeight = _this$props.minMenuHeight,
          maxMenuHeight = _this$props.maxMenuHeight,
          menuPlacement = _this$props.menuPlacement,
          menuPosition = _this$props.menuPosition,
          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView,
          theme = _this$props.theme;
      if (!ref) return; // DO NOT scroll if position is fixed

      var isFixedPosition = menuPosition === 'fixed';
      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
      var state = getMenuPlacement({
        maxHeight: maxMenuHeight,
        menuEl: ref,
        minHeight: minMenuHeight,
        placement: menuPlacement,
        shouldScroll: shouldScroll,
        isFixedPosition: isFixedPosition,
        theme: theme
      });
      var getPortalPlacement = _this.context.getPortalPlacement;
      if (getPortalPlacement) getPortalPlacement(state);

      _this.setState(state);
    };

    _this.getUpdatedProps = function () {
      var menuPlacement = _this.props.menuPlacement;
      var placement = _this.state.placement || coercePlacement(menuPlacement);
      return _objectSpread2(_objectSpread2({}, _this.props), {}, {
        placement: placement,
        maxHeight: _this.state.maxHeight
      });
    };

    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(MenuPlacer, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return children({
        ref: this.getPlacement,
        placerProps: this.getUpdatedProps()
      });
    }
  }]);

  return MenuPlacer;
}(react__WEBPACK_IMPORTED_MODULE_9__.Component);
MenuPlacer.contextType = PortalPlacementContext;

var Menu = function Menu(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('menu', props),
    className: cx({
      menu: true
    }, className),
    ref: innerRef
  }, innerProps), children);
};
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref4) {
  var maxHeight = _ref4.maxHeight,
      baseUnit = _ref4.theme.spacing.baseUnit;
  return {
    maxHeight: maxHeight,
    overflowY: 'auto',
    paddingBottom: baseUnit,
    paddingTop: baseUnit,
    position: 'relative',
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: 'touch'
  };
};
var MenuList = function MenuList(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      innerRef = props.innerRef,
      isMulti = props.isMulti;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('menuList', props),
    className: cx({
      'menu-list': true,
      'menu-list--is-multi': isMulti
    }, className),
    ref: innerRef
  }, innerProps), children);
}; // ==============================
// Menu Notices
// ==============================

var noticeCSS = function noticeCSS(_ref5) {
  var _ref5$theme = _ref5.theme,
      baseUnit = _ref5$theme.spacing.baseUnit,
      colors = _ref5$theme.colors;
  return {
    color: colors.neutral40,
    padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px"),
    textAlign: 'center'
  };
};

var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('noOptionsMessage', props),
    className: cx({
      'menu-notice': true,
      'menu-notice--no-options': true
    }, className)
  }, innerProps), children);
};
NoOptionsMessage.defaultProps = {
  children: 'No options'
};
var LoadingMessage = function LoadingMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('loadingMessage', props),
    className: cx({
      'menu-notice': true,
      'menu-notice--loading': true
    }, className)
  }, innerProps), children);
};
LoadingMessage.defaultProps = {
  children: 'Loading...'
}; // ==============================
// Menu Portal
// ==============================

var menuPortalCSS = function menuPortalCSS(_ref6) {
  var rect = _ref6.rect,
      offset = _ref6.offset,
      position = _ref6.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};
var MenuPortal = /*#__PURE__*/function (_Component2) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(MenuPortal, _Component2);

  var _super2 = _createSuper(MenuPortal);

  function MenuPortal() {
    var _this2;

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, MenuPortal);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _this2.state = {
      placement: null
    };

    _this2.getPortalPlacement = function (_ref7) {
      var placement = _ref7.placement;
      var initialPlacement = coercePlacement(_this2.props.menuPlacement); // avoid re-renders if the placement has not changed

      if (placement !== initialPlacement) {
        _this2.setState({
          placement: placement
        });
      }
    };

    return _this2;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(MenuPortal, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          appendTo = _this$props2.appendTo,
          children = _this$props2.children,
          className = _this$props2.className,
          controlElement = _this$props2.controlElement,
          cx = _this$props2.cx,
          innerProps = _this$props2.innerProps,
          menuPlacement = _this$props2.menuPlacement,
          position = _this$props2.menuPosition,
          getStyles = _this$props2.getStyles;
      var isFixed = position === 'fixed'; // bail early if required elements aren't present

      if (!appendTo && !isFixed || !controlElement) {
        return null;
      }

      var placement = this.state.placement || coercePlacement(menuPlacement);
      var rect = getBoundingClientObj(controlElement);
      var scrollDistance = isFixed ? 0 : window.pageYOffset;
      var offset = rect[placement] + scrollDistance;
      var state = {
        offset: offset,
        position: position,
        rect: rect
      }; // same wrapper element whether fixed or portalled

      var menuWrapper = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        css: getStyles('menuPortal', state),
        className: cx({
          'menu-portal': true
        }, className)
      }, innerProps), children);
      return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(PortalPlacementContext.Provider, {
        value: {
          getPortalPlacement: this.getPortalPlacement
        }
      }, appendTo ? /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_10__.createPortal)(menuWrapper, appendTo) : menuWrapper);
    }
  }]);

  return MenuPortal;
}(react__WEBPACK_IMPORTED_MODULE_9__.Component);

var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isRtl = _ref.isRtl;
  return {
    label: 'container',
    direction: isRtl ? 'rtl' : undefined,
    pointerEvents: isDisabled ? 'none' : undefined,
    // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      isRtl = props.isRtl;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('container', props),
    className: cx({
      '--is-disabled': isDisabled,
      '--is-rtl': isRtl
    }, className)
  }, innerProps), children);
}; // ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS(_ref2) {
  var spacing = _ref2.theme.spacing,
      isMulti = _ref2.isMulti,
      hasValue = _ref2.hasValue,
      controlShouldRenderValue = _ref2.selectProps.controlShouldRenderValue;
  return {
    alignItems: 'center',
    display: isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
    flex: 1,
    flexWrap: 'wrap',
    padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px"),
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden'
  };
};
var ValueContainer = function ValueContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      innerProps = props.innerProps,
      isMulti = props.isMulti,
      getStyles = props.getStyles,
      hasValue = props.hasValue;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('valueContainer', props),
    className: cx({
      'value-container': true,
      'value-container--is-multi': isMulti,
      'value-container--has-value': hasValue
    }, className)
  }, innerProps), children);
}; // ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      innerProps = props.innerProps,
      getStyles = props.getStyles;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('indicatorsContainer', props),
    className: cx({
      indicators: true
    }, className)
  }, innerProps), children);
};

var _templateObject;

var _excluded$2 = ["size"];

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var _ref2 =  false ? 0 : {
  name: "tj5bde-Svg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0ZvY3VzZWQsXG4gIHRoZW1lOiB7XG4gICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIGNvbG9ycyxcbiAgfSxcbn06XG4gIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuXG4gICc6aG92ZXInOiB7XG4gICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93bkluZGljYXRvckNTUyA9IGJhc2VDU1M7XG5leHBvcnQgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBEcm9wZG93bkluZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e2dldFN0eWxlcygnZHJvcGRvd25JbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdjbGVhckluZGljYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgZm9udFNpemU6IHNpemUsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG1hcmdpblJpZ2h0OiBzaXplLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcywgaXNSdGwgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2xvYWRpbmdJbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5Mb2FkaW5nSW5kaWNhdG9yLmRlZmF1bHRQcm9wcyA9IHsgc2l6ZTogNCB9O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

// ==============================
// Dropdown & Clear Icons
// ==============================
var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, _excluded$2);

  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("svg", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2
  }, props));
};

var CrossIcon = function CrossIcon(props) {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(Svg, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    size: 20
  }, props), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
};
var DownChevron = function DownChevron(props) {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(Svg, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    size: 20
  }, props), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
}; // ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref3) {
  var isFocused = _ref3.isFocused,
      _ref3$theme = _ref3.theme,
      baseUnit = _ref3$theme.spacing.baseUnit,
      colors = _ref3$theme.colors;
  return {
    label: 'indicatorContainer',
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',
    ':hover': {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  };
};

var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('dropdownIndicator', props),
    className: cx({
      indicator: true,
      'dropdown-indicator': true
    }, className)
  }, innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('clearIndicator', props),
    className: cx({
      indicator: true,
      'clear-indicator': true
    }, className)
  }, innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(CrossIcon, null));
}; // ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4) {
  var isDisabled = _ref4.isDisabled,
      _ref4$theme = _ref4.theme,
      baseUnit = _ref4$theme.spacing.baseUnit,
      colors = _ref4$theme.colors;
  return {
    label: 'indicatorSeparator',
    alignSelf: 'stretch',
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: baseUnit * 2,
    marginTop: baseUnit * 2,
    width: 1
  };
};
var IndicatorSeparator = function IndicatorSeparator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innerProps, {
    css: getStyles('indicatorSeparator', props),
    className: cx({
      'indicator-separator': true
    }, className)
  }));
}; // ==============================
// Loading
// ==============================

var loadingDotAnimations = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.keyframes)(_templateObject || (_templateObject = (0,_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5) {
  var isFocused = _ref5.isFocused,
      size = _ref5.size,
      _ref5$theme = _ref5.theme,
      colors = _ref5$theme.colors,
      baseUnit = _ref5$theme.spacing.baseUnit;
  return {
    label: 'loadingIndicator',
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  };
};

var LoadingDot = function LoadingDot(_ref6) {
  var delay = _ref6.delay,
      offset = _ref6.offset;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
    css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.css)({
      animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : undefined,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    },  false ? 0 : ";label:LoadingDot;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFQSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0ZvY3VzZWQsXG4gIHRoZW1lOiB7XG4gICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIGNvbG9ycyxcbiAgfSxcbn06XG4gIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuXG4gICc6aG92ZXInOiB7XG4gICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93bkluZGljYXRvckNTUyA9IGJhc2VDU1M7XG5leHBvcnQgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBEcm9wZG93bkluZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e2dldFN0eWxlcygnZHJvcGRvd25JbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdjbGVhckluZGljYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgZm9udFNpemU6IHNpemUsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG1hcmdpblJpZ2h0OiBzaXplLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcywgaXNSdGwgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2xvYWRpbmdJbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5Mb2FkaW5nSW5kaWNhdG9yLmRlZmF1bHRQcm9wcyA9IHsgc2l6ZTogNCB9O1xuIl19 */")
  });
};

var LoadingIndicator = function LoadingIndicator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isRtl = props.isRtl;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('loadingIndicator', props),
    className: cx({
      indicator: true,
      'loading-indicator': true
    }, className)
  }, innerProps), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(LoadingDot, {
    delay: 160,
    offset: true
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};
LoadingIndicator.defaultProps = {
  size: 4
};

var css$1 = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      _ref$theme = _ref.theme,
      colors = _ref$theme.colors,
      borderRadius = _ref$theme.borderRadius,
      spacing = _ref$theme.spacing;
  return {
    label: 'control',
    alignItems: 'center',
    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : undefined,
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',
    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  };
};

var Control = function Control(props) {
  var children = props.children,
      cx = props.cx,
      getStyles = props.getStyles,
      className = props.className,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      innerRef = props.innerRef,
      innerProps = props.innerProps,
      menuIsOpen = props.menuIsOpen;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: innerRef,
    css: getStyles('control', props),
    className: cx({
      control: true,
      'control--is-disabled': isDisabled,
      'control--is-focused': isFocused,
      'control--menu-is-open': menuIsOpen
    }, className)
  }, innerProps), children);
};

var _excluded$1 = ["data"];
var groupCSS = function groupCSS(_ref) {
  var spacing = _ref.theme.spacing;
  return {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};

var Group = function Group(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      Heading = props.Heading,
      headingProps = props.headingProps,
      innerProps = props.innerProps,
      label = props.label,
      theme = props.theme,
      selectProps = props.selectProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('group', props),
    className: cx({
      group: true
    }, className)
  }, innerProps), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(Heading, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, headingProps, {
    selectProps: selectProps,
    theme: theme,
    getStyles: getStyles,
    cx: cx
  }), label), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", null, children));
};

var groupHeadingCSS = function groupHeadingCSS(_ref2) {
  var spacing = _ref2.theme.spacing;
  return {
    label: 'group',
    color: '#999',
    cursor: 'default',
    display: 'block',
    fontSize: '75%',
    fontWeight: 500,
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  };
};
var GroupHeading = function GroupHeading(props) {
  var getStyles = props.getStyles,
      cx = props.cx,
      className = props.className;

  var _cleanCommonProps = cleanCommonProps(props);
      _cleanCommonProps.data;
      var innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_cleanCommonProps, _excluded$1);

  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('groupHeading', props),
    className: cx({
      'group-heading': true
    }, className)
  }, innerProps));
};

var _excluded = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
var inputCSS = function inputCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      value = _ref.value,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return _objectSpread2({
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    visibility: isDisabled ? 'hidden' : 'visible',
    color: colors.neutral80,
    // force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: value ? 'translateZ(0)' : ''
  }, containerStyle);
};
var spacingStyle = {
  gridArea: '1 / 2',
  font: 'inherit',
  minWidth: '2px',
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0
};
var containerStyle = {
  flex: '1 1 auto',
  display: 'inline-grid',
  gridArea: '1 / 1 / 2 / 3',
  gridTemplateColumns: '0 min-content',
  '&:after': _objectSpread2({
    content: 'attr(data-value) " "',
    visibility: 'hidden',
    whiteSpace: 'pre'
  }, spacingStyle)
};

var inputStyle = function inputStyle(isHidden) {
  return _objectSpread2({
    label: 'input',
    color: 'inherit',
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: '100%'
  }, spacingStyle);
};

var Input = function Input(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      value = props.value;

  var _cleanCommonProps = cleanCommonProps(props),
      innerRef = _cleanCommonProps.innerRef,
      isDisabled = _cleanCommonProps.isDisabled,
      isHidden = _cleanCommonProps.isHidden,
      inputClassName = _cleanCommonProps.inputClassName,
      innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_cleanCommonProps, _excluded);

  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
    className: cx({
      'input-container': true
    }, className),
    css: getStyles('input', props),
    "data-value": value || ''
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: cx({
      input: true
    }, inputClassName),
    ref: innerRef,
    style: inputStyle(isHidden),
    disabled: isDisabled
  }, innerProps)));
};

var multiValueCSS = function multiValueCSS(_ref) {
  var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      borderRadius = _ref$theme.borderRadius,
      colors = _ref$theme.colors;
  return {
    label: 'multiValue',
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    display: 'flex',
    margin: spacing.baseUnit / 2,
    minWidth: 0 // resolves flex/text-overflow bug

  };
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
  var _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      colors = _ref2$theme.colors,
      cropWithEllipsis = _ref2.cropWithEllipsis;
  return {
    borderRadius: borderRadius / 2,
    color: colors.neutral80,
    fontSize: '85%',
    overflow: 'hidden',
    padding: 3,
    paddingLeft: 6,
    textOverflow: cropWithEllipsis || cropWithEllipsis === undefined ? 'ellipsis' : undefined,
    whiteSpace: 'nowrap'
  };
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
  var _ref3$theme = _ref3.theme,
      spacing = _ref3$theme.spacing,
      borderRadius = _ref3$theme.borderRadius,
      colors = _ref3$theme.colors,
      isFocused = _ref3.isFocused;
  return {
    alignItems: 'center',
    borderRadius: borderRadius / 2,
    backgroundColor: isFocused ? colors.dangerLight : undefined,
    display: 'flex',
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  };
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
  var children = _ref4.children,
      innerProps = _ref4.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
  var children = _ref5.children,
      innerProps = _ref5.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: "button"
  }, innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(CrossIcon, {
    size: 14
  }));
}

var MultiValue = function MultiValue(props) {
  var children = props.children,
      className = props.className,
      components = props.components,
      cx = props.cx,
      data = props.data,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      removeProps = props.removeProps,
      selectProps = props.selectProps;
  var Container = components.Container,
      Label = components.Label,
      Remove = components.Remove;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_11__.ClassNames, null, function (_ref6) {
    var css = _ref6.css,
        emotionCx = _ref6.cx;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(Container, {
      data: data,
      innerProps: _objectSpread2({
        className: emotionCx(css(getStyles('multiValue', props)), cx({
          'multi-value': true,
          'multi-value--is-disabled': isDisabled
        }, className))
      }, innerProps),
      selectProps: selectProps
    }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(Label, {
      data: data,
      innerProps: {
        className: emotionCx(css(getStyles('multiValueLabel', props)), cx({
          'multi-value__label': true
        }, className))
      },
      selectProps: selectProps
    }, children), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)(Remove, {
      data: data,
      innerProps: _objectSpread2({
        className: emotionCx(css(getStyles('multiValueRemove', props)), cx({
          'multi-value__remove': true
        }, className)),
        'aria-label': "Remove ".concat(children || 'option')
      }, removeProps),
      selectProps: selectProps
    }));
  });
};

var optionCSS = function optionCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'option',
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
    width: '100%',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    // provide some affordance on touch devices
    ':active': {
      backgroundColor: !isDisabled ? isSelected ? colors.primary : colors.primary50 : undefined
    }
  };
};

var Option = function Option(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      isSelected = props.isSelected,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('option', props),
    className: cx({
      option: true,
      'option--is-disabled': isDisabled,
      'option--is-focused': isFocused,
      'option--is-selected': isSelected
    }, className),
    ref: innerRef,
    "aria-disabled": isDisabled
  }, innerProps), children);
};

var placeholderCSS = function placeholderCSS(_ref) {
  var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'placeholder',
    color: colors.neutral50,
    gridArea: '1 / 1 / 2 / 3',
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2
  };
};

var Placeholder = function Placeholder(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('placeholder', props),
    className: cx({
      placeholder: true
    }, className)
  }, innerProps), children);
};

var css = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'singleValue',
    color: isDisabled ? colors.neutral40 : colors.neutral80,
    gridArea: '1 / 1 / 2 / 3',
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
};

var SingleValue = function SingleValue(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: getStyles('singleValue', props),
    className: cx({
      'single-value': true,
      'single-value--is-disabled': isDisabled
    }, className)
  }, innerProps), children);
};

var components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};
var defaultComponents = function defaultComponents(props) {
  return _objectSpread2(_objectSpread2({}, components), props.components);
};




/***/ }),

/***/ "./node_modules/react-select/dist/react-select.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.esm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NonceProvider": () => (/* binding */ NonceProvider),
/* harmony export */   "components": () => (/* reexport safe */ _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_7__.c),
/* harmony export */   "createFilter": () => (/* reexport safe */ _Select_54ac8379_esm_js__WEBPACK_IMPORTED_MODULE_3__.c),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "defaultTheme": () => (/* reexport safe */ _Select_54ac8379_esm_js__WEBPACK_IMPORTED_MODULE_3__.d),
/* harmony export */   "mergeStyles": () => (/* reexport safe */ _Select_54ac8379_esm_js__WEBPACK_IMPORTED_MODULE_3__.m),
/* harmony export */   "useStateManager": () => (/* reexport safe */ _useStateManager_68425271_esm_js__WEBPACK_IMPORTED_MODULE_0__.u)
/* harmony export */ });
/* harmony import */ var _useStateManager_68425271_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useStateManager-68425271.esm.js */ "./node_modules/react-select/dist/useStateManager-68425271.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Select_54ac8379_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Select-54ac8379.esm.js */ "./node_modules/react-select/dist/Select-54ac8379.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index-a7690a33.esm.js */ "./node_modules/react-select/dist/index-a7690a33.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_15__);























var StateManagedSelect = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function (props, ref) {
  var baseSelectProps = (0,_useStateManager_68425271_esm_js__WEBPACK_IMPORTED_MODULE_0__.u)(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_Select_54ac8379_esm_js__WEBPACK_IMPORTED_MODULE_3__.S, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: ref
  }, baseSelectProps));
});

var NonceProvider = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(NonceProvider, _Component);

  var _super = (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_7__._)(NonceProvider);

  function NonceProvider(props) {
    var _this;

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, NonceProvider);

    _this = _super.call(this, props);

    _this.createEmotionCache = function (nonce, key) {
      return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_8__["default"])({
        nonce: nonce,
        key: key
      });
    };

    _this.createEmotionCache = (0,memoize_one__WEBPACK_IMPORTED_MODULE_16__["default"])(_this.createEmotionCache);
    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(NonceProvider, [{
    key: "render",
    value: function render() {
      var emotionCache = this.createEmotionCache(this.props.nonce, this.props.cacheKey);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_17__.C, {
        value: emotionCache
      }, this.props.children);
    }
  }]);

  return NonceProvider;
}(react__WEBPACK_IMPORTED_MODULE_2__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateManagedSelect);



/***/ }),

/***/ "./node_modules/react-select/dist/useStateManager-68425271.esm.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-select/dist/useStateManager-68425271.esm.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ useStateManager)
/* harmony export */ });
/* harmony import */ var _index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index-a7690a33.esm.js */ "./node_modules/react-select/dist/index-a7690a33.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);





var _excluded = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function useStateManager(_ref) {
  var _ref$defaultInputValu = _ref.defaultInputValue,
      defaultInputValue = _ref$defaultInputValu === void 0 ? '' : _ref$defaultInputValu,
      _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen,
      defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
      propsInputValue = _ref.inputValue,
      propsMenuIsOpen = _ref.menuIsOpen,
      propsOnChange = _ref.onChange,
      propsOnInputChange = _ref.onInputChange,
      propsOnMenuClose = _ref.onMenuClose,
      propsOnMenuOpen = _ref.onMenuOpen,
      propsValue = _ref.value,
      restSelectProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(propsInputValue !== undefined ? propsInputValue : defaultInputValue),
      _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      stateInputValue = _useState2[0],
      setStateInputValue = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen),
      _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      stateMenuIsOpen = _useState4[0],
      setStateMenuIsOpen = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(propsValue !== undefined ? propsValue : defaultValue),
      _useState6 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
      stateValue = _useState6[0],
      setStateValue = _useState6[1];

  var onChange = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function (value, actionMeta) {
    if (typeof propsOnChange === 'function') {
      propsOnChange(value, actionMeta);
    }

    setStateValue(value);
  }, [propsOnChange]);
  var onInputChange = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function (value, actionMeta) {
    var newValue;

    if (typeof propsOnInputChange === 'function') {
      newValue = propsOnInputChange(value, actionMeta);
    }

    setStateInputValue(newValue !== undefined ? newValue : value);
  }, [propsOnInputChange]);
  var onMenuOpen = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    if (typeof propsOnMenuOpen === 'function') {
      propsOnMenuOpen();
    }

    setStateMenuIsOpen(true);
  }, [propsOnMenuOpen]);
  var onMenuClose = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    if (typeof propsOnMenuClose === 'function') {
      propsOnMenuClose();
    }

    setStateMenuIsOpen(false);
  }, [propsOnMenuClose]);
  var inputValue = propsInputValue !== undefined ? propsInputValue : stateInputValue;
  var menuIsOpen = propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
  var value = propsValue !== undefined ? propsValue : stateValue;
  return (0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_3__.a)((0,_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_3__.a)({}, restSelectProps), {}, {
    inputValue: inputValue,
    menuIsOpen: menuIsOpen,
    onChange: onChange,
    onInputChange: onInputChange,
    onMenuClose: onMenuClose,
    onMenuOpen: onMenuOpen,
    value: value
  });
}




/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutProperties)
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _taggedTemplateLiteral)
/* harmony export */ });
function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ }),

/***/ "./node_modules/stylis/src/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHARSET": () => (/* binding */ CHARSET),
/* harmony export */   "COMMENT": () => (/* binding */ COMMENT),
/* harmony export */   "COUNTER_STYLE": () => (/* binding */ COUNTER_STYLE),
/* harmony export */   "DECLARATION": () => (/* binding */ DECLARATION),
/* harmony export */   "DOCUMENT": () => (/* binding */ DOCUMENT),
/* harmony export */   "FONT_FACE": () => (/* binding */ FONT_FACE),
/* harmony export */   "FONT_FEATURE_VALUES": () => (/* binding */ FONT_FEATURE_VALUES),
/* harmony export */   "IMPORT": () => (/* binding */ IMPORT),
/* harmony export */   "KEYFRAMES": () => (/* binding */ KEYFRAMES),
/* harmony export */   "MEDIA": () => (/* binding */ MEDIA),
/* harmony export */   "MOZ": () => (/* binding */ MOZ),
/* harmony export */   "MS": () => (/* binding */ MS),
/* harmony export */   "NAMESPACE": () => (/* binding */ NAMESPACE),
/* harmony export */   "PAGE": () => (/* binding */ PAGE),
/* harmony export */   "RULESET": () => (/* binding */ RULESET),
/* harmony export */   "SUPPORTS": () => (/* binding */ SUPPORTS),
/* harmony export */   "VIEWPORT": () => (/* binding */ VIEWPORT),
/* harmony export */   "WEBKIT": () => (/* binding */ WEBKIT)
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'


/***/ }),

/***/ "./node_modules/stylis/src/Middleware.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": () => (/* binding */ middleware),
/* harmony export */   "namespace": () => (/* binding */ namespace),
/* harmony export */   "prefixer": () => (/* binding */ prefixer),
/* harmony export */   "rulesheet": () => (/* binding */ rulesheet)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length)
					break
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
					return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
					if (element.length)
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
							switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/stylis/src/Parser.js":
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "compile": () => (/* binding */ compile),
/* harmony export */   "declaration": () => (/* binding */ declaration),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "ruleset": () => (/* binding */ ruleset)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// (
			case 40:
				if (previous != 108 && characters.charCodeAt(length - 1) == 58) {
					if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset:
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/stylis/src/Prefixer.js":
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": () => (/* binding */ prefix)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix (value, length) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// flex, flex-direction
		case 6828: case 4268:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/, '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length) + value : value
				}
			break
		// position: sticky
		case 4949:
			// (s)ticky?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1) !== 115)
				break
		// display: (flex|inline-flex)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 3 - (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, '!important') && 10))) {
				// stic(k)y
				case 107:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
				// (inline-)?fl(e)x
				case 101:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
			}
			break
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
			}

			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/stylis/src/Serializer.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/stylis/src/Tokenizer.js":
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alloc": () => (/* binding */ alloc),
/* harmony export */   "caret": () => (/* binding */ caret),
/* harmony export */   "char": () => (/* binding */ char),
/* harmony export */   "character": () => (/* binding */ character),
/* harmony export */   "characters": () => (/* binding */ characters),
/* harmony export */   "column": () => (/* binding */ column),
/* harmony export */   "commenter": () => (/* binding */ commenter),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "dealloc": () => (/* binding */ dealloc),
/* harmony export */   "delimit": () => (/* binding */ delimit),
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "escaping": () => (/* binding */ escaping),
/* harmony export */   "identifier": () => (/* binding */ identifier),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "peek": () => (/* binding */ peek),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "token": () => (/* binding */ token),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "tokenizer": () => (/* binding */ tokenizer),
/* harmony export */   "whitespace": () => (/* binding */ whitespace)
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/stylis/src/Utility.js":
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "charat": () => (/* binding */ charat),
/* harmony export */   "combine": () => (/* binding */ combine),
/* harmony export */   "from": () => (/* binding */ from),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "indexof": () => (/* binding */ indexof),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "sizeof": () => (/* binding */ sizeof),
/* harmony export */   "strlen": () => (/* binding */ strlen),
/* harmony export */   "substr": () => (/* binding */ substr),
/* harmony export */   "trim": () => (/* binding */ trim)
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/blocks/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _grid_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid-layout */ "./src/blocks/grid-layout/index.js");
/* harmony import */ var _utils_css_ParseCss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/css/ParseCss */ "./src/utils/css/ParseCss.js");
/* global wp */


window.rttpgDevice = 'lg'; // Save Style CSS within Database/File

window.bindCss = false;
wp.data.subscribe(() => {
  try {
    const _wp$data$select = wp.data.select("core/editor");

    if (!_wp$data$select) {
      return;
    }

    const isSavingPost = _wp$data$select.isSavingPost;
    const isAutoSavingPost = _wp$data$select.isAutosavingPost;

    if (isSavingPost() && !isAutoSavingPost()) {
      (0,_utils_css_ParseCss__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }
  } catch (err) {
    console.error(err);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map