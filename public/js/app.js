(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/app"],{

/***/ "./resources/js/app.js"
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var vue_toastification_dist_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-toastification/dist/index.css */ "./node_modules/vue-toastification/dist/index.css");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js");
var _window$document$getE;
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");





if (typeof globalThis !== "undefined") {
  globalThis.__VUE_OPTIONS_API__ = true;
  globalThis.__VUE_PROD_DEVTOOLS__ = false;
  globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
}
var appName = ((_window$document$getE = window.document.getElementsByTagName("title")[0]) === null || _window$document$getE === void 0 ? void 0 : _window$document$getE.innerText) || "Laravel";
_inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.config.set({
  "prefetch.cacheFor": 60000,
  "prefetch.hoverDelay": 50
});
(0,_inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.createInertiaApp)({
  title: function title(_title) {
    return "".concat(_title, " - ").concat(appName);
  },
  resolve: function resolve(name) {
    return __webpack_require__("./resources/js/Pages lazy recursive ^\\.\\/.*\\.vue$")("./".concat(name, ".vue"));
  },
  progress: {
    color: '#4B5563',
    showSpinner: true
  },
  setup: function setup(_ref) {
    var el = _ref.el,
      App = _ref.App,
      props = _ref.props,
      plugin = _ref.plugin;
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)({
      render: function render() {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(App, props);
      }
    }).use(plugin).use(vue_toastification__WEBPACK_IMPORTED_MODULE_2__["default"]).use(ziggy_js__WEBPACK_IMPORTED_MODULE_4__.ZiggyVue, window.Ziggy).mount(el);
  }
});

/***/ },

/***/ "./resources/js/bootstrap.js"
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

/***/ },

/***/ "./resources/css/app.css"
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./resources/js/Pages lazy recursive ^\\.\\/.*\\.vue$"
/*!*******************************************************************************************!*\
  !*** ./resources/js/Pages/ lazy ^\.\/.*\.vue$ chunkName: page-[request] namespace object ***!
  \*******************************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./Auth/ConfirmPassword.vue": [
		"./resources/js/Pages/Auth/ConfirmPassword.vue",
		[
			"/js/vendor",
			"page-Auth-ConfirmPassword-vue"
		]
	],
	"./Auth/ForgotPassword.vue": [
		"./resources/js/Pages/Auth/ForgotPassword.vue",
		[
			"/js/vendor",
			"page-Auth-ForgotPassword-vue"
		]
	],
	"./Auth/Login.vue": [
		"./resources/js/Pages/Auth/Login.vue",
		[
			"/js/vendor",
			"page-Auth-Login-vue"
		]
	],
	"./Auth/Register.vue": [
		"./resources/js/Pages/Auth/Register.vue",
		[
			"/js/vendor",
			"page-Auth-Register-vue"
		]
	],
	"./Auth/ResetPassword.vue": [
		"./resources/js/Pages/Auth/ResetPassword.vue",
		[
			"/js/vendor",
			"page-Auth-ResetPassword-vue"
		]
	],
	"./Auth/VerifyEmail.vue": [
		"./resources/js/Pages/Auth/VerifyEmail.vue",
		[
			"/js/vendor",
			"page-Auth-VerifyEmail-vue"
		]
	],
	"./Camera.vue": [
		"./resources/js/Pages/Camera.vue",
		[
			"/js/vendor",
			"page-Camera-vue"
		]
	],
	"./Controlling.vue": [
		"./resources/js/Pages/Controlling.vue",
		[
			"/js/vendor",
			"page-Controlling-vue"
		]
	],
	"./Heatmap.vue": [
		"./resources/js/Pages/Heatmap.vue",
		[
			"/js/vendor",
			"page-Heatmap-vue"
		]
	],
	"./Monitoring.vue": [
		"./resources/js/Pages/Monitoring.vue",
		[
			"/js/vendor",
			"page-Monitoring-vue"
		]
	],
	"./Table.vue": [
		"./resources/js/Pages/Table.vue",
		[
			"/js/vendor",
			"page-Table-vue"
		]
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids[1].map(__webpack_require__.e)).then(() => (__webpack_require__(id)));
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./resources/js/Pages lazy recursive ^\\.\\/.*\\.vue$";
module.exports = webpackAsyncContext;

/***/ },

/***/ "?2128"
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
() {

/* (ignored) */

/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/app","/js/vendor"], () => (__webpack_exec__("./resources/js/app.js"), __webpack_exec__("./resources/css/app.css")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);