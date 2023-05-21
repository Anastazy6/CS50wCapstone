/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./gwybodaeth/scripts lazy recursive":
/*!***************************************************!*\
  !*** ./gwybodaeth/scripts/ lazy namespace object ***!
  \***************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./gwybodaeth/scripts lazy recursive\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://gwybodaeth/./gwybodaeth/scripts/_lazy_namespace_object?");

/***/ }),

/***/ "./gwybodaeth/scripts/index.js":
/*!*************************************!*\
  !*** ./gwybodaeth/scripts/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes.js */ \"./gwybodaeth/scripts/routes.js\");\n/* harmony import */ var _vanillaJS_modules_Utilities_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vanillaJS/modules/Utilities/util.js */ \"./gwybodaeth/scripts/vanillaJS/modules/Utilities/util.js\");\n\n\nvar location = window.location.pathname;\nvar path = location.substring(0, location.lastIndexOf(\"/\"));\nvar directoryName = path.substring(path.lastIndexOf(\"/\") + 1);\nconsole.log(directoryName);\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  main();\n});\nvar main = function main() {\n  if (_vanillaJS_modules_Utilities_util_js__WEBPACK_IMPORTED_MODULE_1__.Util.isStudySetActive()) _vanillaJS_modules_Utilities_util_js__WEBPACK_IMPORTED_MODULE_1__.Util.highlightCurrentLearningOption();\n  var modulePath = _vanillaJS_modules_Utilities_util_js__WEBPACK_IMPORTED_MODULE_1__.Util.getModulePath(_routes_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  if (modulePath) loadModule(modulePath);\n};\nvar loadModule = function loadModule(modulePath) {\n  console.log(window.location.pathname);\n  console.log(modulePath);\n  __webpack_require__(\"./gwybodaeth/scripts lazy recursive\")(modulePath).then(function (module) {\n    return module[\"default\"]();\n  })[\"catch\"](function (error) {\n    return console.log(error);\n  });\n};\n\n//# sourceURL=webpack://gwybodaeth/./gwybodaeth/scripts/index.js?");

/***/ }),

/***/ "./gwybodaeth/scripts/routes.js":
/*!**************************************!*\
  !*** ./gwybodaeth/scripts/routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar studySetPattern = function studySetPattern(subroute) {\n  var pattern = \"^/set/\\\\d+/\".concat(subroute, \"$\");\n  return new RegExp(pattern);\n};\nvar simplePattern = function simplePattern(pattern) {\n  return new RegExp(\"^/\".concat(pattern, \"$\"));\n};\nvar JSModulesRoot = \"vanillaJS/modules\";\nvar ReactRoot = \"reactApps\";\nvar jsModule = function jsModule(path) {\n  return \"\".concat(JSModulesRoot, \"/\").concat(path);\n};\nvar reactApp = function reactApp(path) {\n  return \"\".concat(ReactRoot, \"/\").concat(path);\n};\n\n//TODO (optional): consider refactoring into Django-like routing system.\n\nvar routes = [{\n  route: simplePattern(\"create-set\"),\n  module: jsModule(\"Create/create.js\")\n}, {\n  route: studySetPattern(\"flashcards\"),\n  module: jsModule(\"Flashcards/flashcards.js\")\n}, {\n  route: studySetPattern(\"learn\"),\n  module: jsModule(\"Learn/learn.js\")\n}, {\n  route: studySetPattern(\"write\"),\n  module: jsModule(\"Write/write.js\")\n}, {\n  route: simplePattern(\"test\"),\n  module: reactApp(\"test.js\")\n}, {\n  route: simplePattern(\"create-set-react\"),\n  module: reactApp(\"CreateReact/App.js\")\n}];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);\n\n//# sourceURL=webpack://gwybodaeth/./gwybodaeth/scripts/routes.js?");

/***/ }),

/***/ "./gwybodaeth/scripts/vanillaJS/modules/Utilities/util.js":
/*!****************************************************************!*\
  !*** ./gwybodaeth/scripts/vanillaJS/modules/Utilities/util.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Util: () => (/* binding */ Util)\n/* harmony export */ });\nvar Util = function () {\n  var highlightCurrentLearningOption = function highlightCurrentLearningOption() {\n    var currentOption = _getLearningOption() || 'set';\n    var optionButton = document.getElementById(\"learning-options-\".concat(currentOption));\n    if (optionButton) {\n      optionButton.classList.add(\"active-learning-option\");\n    }\n  };\n  var generateIndex = function () {\n    var index = 0;\n    return function () {\n      index += 1;\n      return index;\n    };\n  }();\n\n  /**\r\n   * Source: https://stackoverflow.com/a/50735730\r\n   * @param {*} name \r\n   * @returns Cookie value\r\n   */\n  var getCookie = function getCookie(name) {\n    var cookieValue = null;\n    if (document.cookie && document.cookie !== '') {\n      var cookies = document.cookie.split(';');\n      for (var i = 0; i < cookies.length; i++) {\n        var cookie = jQuery.trim(cookies[i]);\n        if (cookie.substring(0, name.length + 1) === name + '=') {\n          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));\n          break;\n        }\n      }\n    }\n    return cookieValue;\n  };\n  var getPath = function getPath() {\n    return window.location.pathname;\n  };\n  var getRoute = function getRoute() {\n    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getPath();\n    return path.slice(1).split(\"/\");\n  };\n  var getStudySetID = function getStudySetID() {\n    return getRoute()[1];\n  };\n  var _getLearningOption = function _getLearningOption() {\n    return getRoute()[2];\n  };\n  var isStudySetActive = function isStudySetActive() {\n    return getRoute()[0] === 'set';\n  };\n  var getModulePath = function getModulePath(routes) {\n    var path = Util.getPath();\n    var currentRoute = routes.filter(function (r) {\n      return r.route.test(path);\n    });\n    switch (currentRoute.length) {\n      case 0:\n        // No module path if the current route is not associated with any of the VanillaJS modules.\n        // This may happen if the route uses React, Angular.js or Django template rendering\n        return false;\n      case 1:\n        return currentRoute[0].module;\n      default:\n        throw \"Routing error: current route matches more than one from the predefined ones.\";\n    }\n  };\n\n  /**\r\n   *  Redirects to another page WITHIN this web service. The url argument is relative\r\n   *    to the site's root location.\r\n   * \r\n   * @param {String} url \r\n   * @returns void\r\n   */\n  var redirect = function redirect(url) {\n    var origin = window.location.origin;\n    window.location.replace(\"\".concat(origin).concat(url));\n  };\n  return {\n    generateIndex: generateIndex,\n    getCookie: getCookie,\n    getPath: getPath,\n    getRoute: getRoute,\n    getStudySetID: getStudySetID,\n    getModulePath: getModulePath,\n    isStudySetActive: isStudySetActive,\n    highlightCurrentLearningOption: highlightCurrentLearningOption,\n    redirect: redirect\n  };\n}();\n\n//# sourceURL=webpack://gwybodaeth/./gwybodaeth/scripts/vanillaJS/modules/Utilities/util.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./gwybodaeth/scripts/index.js");
/******/ 	
/******/ })()
;