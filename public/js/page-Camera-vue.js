"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-Camera-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Button.vue?vue&type=script&setup=true&lang=js"
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Button.vue?vue&type=script&setup=true&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Button',
  props: {
    type: {
      type: String,
      "default": "submit"
    },
    active: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var __returned__ = {};
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js"
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      currentTime: new Date()
    };
  },
  computed: {
    formattedTime: function formattedTime() {
      return this.currentTime.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).replace(",", "");
    }
  },
  mounted: function mounted() {
    var _this = this;
    setInterval(function () {
      _this.currentTime = new Date();
    }, 1000);
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js"
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Dropdown',
  props: {
    align: {
      "default": 'right'
    },
    width: {
      "default": '48'
    },
    contentClasses: {
      "default": function _default() {
        return ['py-1', 'bg-white'];
      }
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var props = __props;
    var closeOnEscape = function closeOnEscape(e) {
      if (open.value && e.key === 'Escape') {
        open.value = false;
      }
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      return document.addEventListener('keydown', closeOnEscape);
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(function () {
      return document.removeEventListener('keydown', closeOnEscape);
    });
    var widthClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return {
        '48': 'w-48',
        '52': 'w-52',
        '56': 'w-56',
        '64': 'w-64'
      }[props.width.toString()];
    });
    var alignmentClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      if (props.align === 'left') {
        return 'origin-top-left left-0';
      } else if (props.align === 'right') {
        return 'origin-top-right right-0';
      } else {
        return 'origin-top';
      }
    });
    var open = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var __returned__ = {
      props: props,
      closeOnEscape: closeOnEscape,
      widthClass: widthClass,
      alignmentClasses: alignmentClasses,
      open: open,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onUnmounted: vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js"
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'DropdownLink',
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var __returned__ = {
      get Link() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_0__.Link;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js"
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js ***!
  \************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'NavLink',
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      "default": false
    },
    icon: {
      type: String,
      "default": null
    },
    description: {
      type: String,
      "default": ""
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var props = __props;
    var classes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return ["group relative flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-all duration-200", props.active ? "border-emerald-300 bg-emerald-500 text-white shadow-md shadow-emerald-700/25" : "border-transparent text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"];
    });
    var iconWrapClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return ["inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200", props.active ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200"];
    });
    var descriptionClasses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return props.active ? "text-emerald-50/90" : "text-slate-400 group-hover:text-emerald-600/80";
    });
    var __returned__ = {
      props: props,
      classes: classes,
      iconWrapClasses: iconWrapClasses,
      descriptionClasses: descriptionClasses,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      get Link() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.Link;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js"
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _Components_NavLink_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/NavLink.vue */ "./resources/js/Components/NavLink.vue");
/* harmony import */ var _Components_Dropdown_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Dropdown.vue */ "./resources/js/Components/Dropdown.vue");
/* harmony import */ var _Components_DropdownLink_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/DropdownLink.vue */ "./resources/js/Components/DropdownLink.vue");
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");
/* harmony import */ var _composables_useLocale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/composables/useLocale */ "./resources/js/composables/useLocale.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Authenticated',
  props: ["titlePage"],
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var isSidebarOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var _useLocale = (0,_composables_useLocale__WEBPACK_IMPORTED_MODULE_5__.useLocale)(),
      locale = _useLocale.locale,
      setLocale = _useLocale.setLocale,
      t = _useLocale.t;
    var props = __props;
    var navItems = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return [{
        label: t("nav.monitoring"),
        routeName: "monitoring",
        icon: "fas fa-chart-line",
        description: t("nav.monitoring_desc")
      }, {
        label: t("nav.heatmap"),
        routeName: "heatmap",
        icon: "fas fa-layer-group",
        description: t("nav.heatmap_desc")
      }, {
        label: t("nav.table"),
        routeName: "table",
        icon: "fas fa-table",
        description: t("nav.table_desc")
      }, {
        label: t("nav.camera"),
        routeName: "camera",
        icon: "fas fa-camera",
        description: t("nav.camera_desc")
      }, {
        label: t("nav.controlling"),
        routeName: "controlling",
        icon: "fas fa-sliders-h",
        description: t("nav.controlling_desc")
      }];
    });
    var pageTitle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var normalized = String(props.titlePage || "").trim().toLowerCase();
      var titleKeyMap = {
        monitoring: "title.monitoring",
        heatmap: "title.heatmap",
        table: "title.table",
        camera: "title.camera",
        controlling: "title.controlling"
      };
      var key = titleKeyMap[normalized];
      return key ? t(key) : props.titlePage;
    });
    var closeSidebar = function closeSidebar() {
      isSidebarOpen.value = false;
    };
    var toggleSidebar = function toggleSidebar() {
      isSidebarOpen.value = !isSidebarOpen.value;
    };
    var handleNavClick = function handleNavClick() {
      if (typeof window !== "undefined" && window.innerWidth < 640) {
        closeSidebar();
      }
    };
    var switchToIndonesian = function switchToIndonesian() {
      setLocale("id");
    };
    var switchToEnglish = function switchToEnglish() {
      setLocale("en");
    };
    var __returned__ = {
      isSidebarOpen: isSidebarOpen,
      locale: locale,
      setLocale: setLocale,
      t: t,
      props: props,
      navItems: navItems,
      pageTitle: pageTitle,
      closeSidebar: closeSidebar,
      toggleSidebar: toggleSidebar,
      handleNavClick: handleNavClick,
      switchToIndonesian: switchToIndonesian,
      switchToEnglish: switchToEnglish,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      BreezeNavLink: _Components_NavLink_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
      BreezeDropdown: _Components_Dropdown_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      BreezeDropdownLink: _Components_DropdownLink_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      get Link() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_4__.Link;
      },
      get useLocale() {
        return _composables_useLocale__WEBPACK_IMPORTED_MODULE_5__.useLocale;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=script&setup=true&lang=js"
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=script&setup=true&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");
/* harmony import */ var _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Layouts/Authenticated.vue */ "./resources/js/Layouts/Authenticated.vue");
/* harmony import */ var _vuepic_vue_datepicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vuepic/vue-datepicker */ "./node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js");
/* harmony import */ var _vuepic_vue_datepicker_dist_main_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vuepic/vue-datepicker/dist/main.css */ "./node_modules/@vuepic/vue-datepicker/dist/main.css");
/* harmony import */ var _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Components/DigitalClock.vue */ "./resources/js/Components/DigitalClock.vue");
/* harmony import */ var _Components_Button_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Components/Button.vue */ "./resources/js/Components/Button.vue");
/* harmony import */ var ag_grid_vue3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ag-grid-vue3 */ "./node_modules/ag-grid-vue3/dist/main.mjs");
/* harmony import */ var ag_grid_community__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ag-grid-community */ "./node_modules/ag-grid-community/dist/package/main.esm.mjs");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _composables_useLocale__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/composables/useLocale */ "./resources/js/composables/useLocale.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }











var DEFAULT_CAMERA_PER_PAGE = 5;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Camera',
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    ag_grid_community__WEBPACK_IMPORTED_MODULE_8__.ModuleRegistry.registerModules([ag_grid_community__WEBPACK_IMPORTED_MODULE_8__.AllCommunityModule]);
    var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_9__.useToast)();
    var _useLocale = (0,_composables_useLocale__WEBPACK_IMPORTED_MODULE_10__.useLocale)(),
      t = _useLocale.t,
      locale = _useLocale.locale;
    var page = (0,_inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.usePage)();
    var _page$props = page.props,
      greenhouses = _page$props.greenhouses,
      latestData = _page$props.latestData;
    var actuatorStatus = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return page.props.actuatorStatus || {};
    });
    var daterange = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    var isExporting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var selectedGreenhouse = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("");
    var rowImageLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var rowTableLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var activeActuatorGhId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var _greenhouses$;
      var parsedSelected = Number(selectedGreenhouse.value);
      if (Number.isFinite(parsedSelected) && parsedSelected > 0) {
        return parsedSelected;
      }
      var fallback = Number(greenhouses === null || greenhouses === void 0 || (_greenhouses$ = greenhouses[0]) === null || _greenhouses$ === void 0 ? void 0 : _greenhouses$.id);
      return Number.isFinite(fallback) && fallback > 0 ? fallback : 1;
    });
    var actuators = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var _actuatorStatus$value, _actuatorStatus$value2, _currentStatus$exhaus, _currentStatus$dehumi, _currentStatus$blower;
      var currentStatus = ((_actuatorStatus$value = actuatorStatus.value) === null || _actuatorStatus$value === void 0 ? void 0 : _actuatorStatus$value[activeActuatorGhId.value]) || ((_actuatorStatus$value2 = actuatorStatus.value) === null || _actuatorStatus$value2 === void 0 ? void 0 : _actuatorStatus$value2[String(activeActuatorGhId.value)]) || {};
      return [{
        key: "exhaust",
        name: t("monitoring.exhaust_fan"),
        icon: "fas fa-fan",
        color: "text-yellow-500",
        status: Boolean((_currentStatus$exhaus = currentStatus.exhaust) === null || _currentStatus$exhaus === void 0 ? void 0 : _currentStatus$exhaus.status)
      }, {
        key: "dehumidifier",
        name: t("monitoring.dehumidifier"),
        icon: "fas fa-tint",
        color: "text-cyan-500",
        status: Boolean((_currentStatus$dehumi = currentStatus.dehumidifier) === null || _currentStatus$dehumi === void 0 ? void 0 : _currentStatus$dehumi.status)
      }, {
        key: "blower",
        name: t("monitoring.blower"),
        icon: "fas fa-fan",
        color: "text-red-500",
        status: Boolean((_currentStatus$blower = currentStatus.blower) === null || _currentStatus$blower === void 0 ? void 0 : _currentStatus$blower.status)
      }];
    });
    var getActuatorIconAnimationClass = function getActuatorIconAnimationClass(actuator) {
      if (!(actuator !== null && actuator !== void 0 && actuator.status)) {
        return "";
      }
      if (actuator.key === "dehumidifier") {
        return "actuator-dehumidifier-active";
      }
      return "actuator-fan-active";
    };
    var rowSelectionConfig = {
      mode: "singleRow",
      checkboxes: false,
      enableClickSelection: true
    };

    // column
    var formatCameraDateTime = function formatCameraDateTime(rawValue) {
      if (rawValue === null || rawValue === undefined || rawValue === "") {
        return "-";
      }
      var value = String(rawValue).trim();
      var slashFormatMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})\s(\d{1,2}):(\d{2}):(\d{2})(?:\s?(AM|PM))?$/i);
      if (slashFormatMatch) {
        var _slashFormatMatch = _slicedToArray(slashFormatMatch, 8),
          _day = _slashFormatMatch[1],
          _month = _slashFormatMatch[2],
          _year = _slashFormatMatch[3],
          hourRaw = _slashFormatMatch[4],
          _minute = _slashFormatMatch[5],
          _second = _slashFormatMatch[6],
          meridiemRaw = _slashFormatMatch[7];
        var _hour = Number(hourRaw);
        var meridiem = meridiemRaw ? meridiemRaw.toUpperCase() : null;
        if (meridiem === "PM" && _hour < 12) {
          _hour += 12;
        }
        if (meridiem === "AM" && _hour === 12) {
          _hour = 0;
        }
        return "".concat(_day, "/").concat(_month, "/").concat(_year, " ").concat(String(_hour).padStart(2, "0"), ":").concat(_minute, ":").concat(_second);
      }
      var isoLikeValue = value.includes("T") ? value : value.replace(" ", "T");
      var parsedDate = new Date(isoLikeValue);
      if (Number.isNaN(parsedDate.getTime())) {
        return value;
      }
      var day = String(parsedDate.getDate()).padStart(2, "0");
      var month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      var year = parsedDate.getFullYear();
      var hour = String(parsedDate.getHours()).padStart(2, "0");
      var minute = String(parsedDate.getMinutes()).padStart(2, "0");
      var second = String(parsedDate.getSeconds()).padStart(2, "0");
      return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hour, ":").concat(minute, ":").concat(second);
    };
    var columnDefs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return [{
        headerName: t("camera.date_time"),
        field: "recorded_at",
        sortable: true,
        resizable: false,
        suppressMovable: true,
        headerClass: "camera-header-center",
        cellClass: "camera-cell-center",
        cellStyle: {
          textAlign: "center"
        },
        valueFormatter: function valueFormatter(params) {
          return formatCameraDateTime(params.value);
        },
        flex: 1
      }, {
        headerName: t("camera.fog_accuracy"),
        field: "fog_percentage",
        sortable: true,
        resizable: false,
        suppressMovable: true,
        headerClass: "camera-header-center",
        flex: 1,
        cellClass: "camera-cell-center",
        cellStyle: {
          textAlign: "center"
        },
        cellRenderer: function cellRenderer(params) {
          return params.value !== null && params.value !== undefined ? "".concat(params.value, "%") : "-";
        }
      }, {
        headerName: t("camera.status"),
        field: "status",
        sortable: true,
        resizable: false,
        suppressMovable: true,
        headerClass: "camera-header-center",
        flex: 1,
        cellClass: "camera-cell-center",
        cellStyle: {
          textAlign: "center"
        },
        cellRenderer: function cellRenderer(params) {
          var status = params.value || "Unknown";
          var statusLabelMap = {
            Berkabut: t("camera.status_foggy"),
            "Tidak Berkabut": t("camera.status_clear"),
            Unknown: t("camera.status_unknown")
          };
          var statusClasses = {
            Berkabut: "bg-sky-100 text-sky-600",
            "Tidak Berkabut": "bg-green-100 text-green-600",
            Unknown: "bg-gray-100 text-gray-600"
          };
          var badgeClass = statusClasses[status] || "bg-gray-100 text-gray-600";
          var wrapper = document.createElement("div");
          wrapper.style.display = "flex";
          wrapper.style.justifyContent = "center";
          wrapper.style.alignItems = "center";
          wrapper.style.width = "100%";
          wrapper.style.height = "100%";
          var div = document.createElement("div");
          div.className = "my-auto px-3 py-2 rounded-full text-xs font-semibold ".concat(badgeClass);
          div.textContent = statusLabelMap[status] || status;
          div.style.display = "inline-block";
          wrapper.appendChild(div);
          return wrapper;
        }
      }];
    });

    // change pointer on hover
    var rowClassRules = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      "cursor-pointer hover:bg-gray-100": function cursorPointer_hoverBgGray100(params) {
        return true;
      }
    });

    // data
    var rowDataMap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var rowImageMap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var paginationMetaMap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var rowImageLoadingTimers = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var isComponentAlive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    var loadedGreenhouseMap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var cameraRequestTokens = new Map();
    var cameraFetchControllers = new Map();
    var CAMERA_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
    var cameraPageMap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var sharedPerPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(DEFAULT_CAMERA_PER_PAGE);
    var getGreenhouseLabel = function getGreenhouseLabel(greenhouse) {
      var label = String((greenhouse === null || greenhouse === void 0 ? void 0 : greenhouse.name) || "").trim();
      var ghId = Number(greenhouse === null || greenhouse === void 0 ? void 0 : greenhouse.id);
      var fallbackNumber = Number.isFinite(ghId) && ghId > 0 ? ghId : null;
      var normalized = label.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
      var labelNumberMatch = normalized.match(/(\d+)$/);
      var labelNumber = labelNumberMatch ? Number(labelNumberMatch[1]) : null;
      var tabNumber = labelNumber !== null && labelNumber !== void 0 ? labelNumber : fallbackNumber;
      return Number.isFinite(tabNumber) && tabNumber > 0 ? "GH Von Florist ".concat(tabNumber) : "GH Von Florist";
    };
    var getCameraLabel = function getCameraLabel(index) {
      return "".concat(t("monitoring.camera"), " ").concat(index + 1);
    };
    var abortCameraFetch = function abortCameraFetch(gh_id) {
      var controller = cameraFetchControllers.get(gh_id);
      if (!controller) {
        return;
      }
      controller.abort();
      cameraFetchControllers["delete"](gh_id);
    };
    var abortAllCameraFetches = function abortAllCameraFetches() {
      cameraFetchControllers.forEach(function (controller) {
        return controller.abort();
      });
      cameraFetchControllers.clear();
    };
    var ensurePaginationMeta = function ensurePaginationMeta(gh_id) {
      if (!paginationMetaMap.value[gh_id]) {
        paginationMetaMap.value[gh_id] = {
          total: 0,
          lastPage: 1
        };
      }
      return paginationMetaMap.value[gh_id];
    };
    var ensureCameraPage = function ensureCameraPage(gh_id) {
      if (!cameraPageMap.value[gh_id]) {
        cameraPageMap.value[gh_id] = 1;
      }
      return cameraPageMap.value[gh_id];
    };
    var getCurrentPage = function getCurrentPage(gh_id) {
      return ensureCameraPage(gh_id);
    };
    var getCameraLastPage = function getCameraLastPage(gh_id) {
      var meta = ensurePaginationMeta(gh_id);
      return Math.max(1, Number(meta.lastPage || 1));
    };
    var globalLastPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var greenhouseList = Array.isArray(greenhouses) ? greenhouses : [];
      if (greenhouseList.length === 0) {
        return 1;
      }
      var maxLastPage = greenhouseList.reduce(function (maxValue, greenhouse) {
        var meta = ensurePaginationMeta(greenhouse.id);
        return Math.max(maxValue, Number(meta.lastPage || 1));
      }, 1);
      return Math.max(1, maxLastPage);
    });
    var getPaginationText = function getPaginationText(gh_id) {
      var meta = ensurePaginationMeta(gh_id);
      if (meta.total <= 0) {
        return t("camera.page_no_data");
      }
      return "".concat(getCurrentPage(gh_id), " ").concat(t("common.of"), " ").concat(globalLastPage.value);
    };
    var canPrevPage = function canPrevPage(gh_id) {
      return getCurrentPage(gh_id) > 1;
    };
    var canNextPage = function canNextPage(gh_id) {
      return getCurrentPage(gh_id) < getCameraLastPage(gh_id);
    };
    var fetchAllGreenhouses = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _ref3,
          _ref3$force,
          force,
          greenhouseList,
          jobs,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _ref3 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref3$force = _ref3.force, force = _ref3$force === void 0 ? false : _ref3$force;
              greenhouseList = Array.isArray(greenhouses) ? greenhouses : [];
              jobs = greenhouseList.map(function (greenhouse) {
                return _fetchData(greenhouse.id, {
                  force: force
                });
              });
              _context.n = 1;
              return Promise.all(jobs);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function fetchAllGreenhouses() {
        return _ref2.apply(this, arguments);
      };
    }();
    var goToPage = function goToPage(gh_id, nextPage) {
      var parsedGhId = Number(gh_id);
      if (!Number.isFinite(parsedGhId) || parsedGhId <= 0) {
        return;
      }
      var clampedPage = Math.max(1, Math.min(nextPage, getCameraLastPage(parsedGhId)));
      if (clampedPage === getCurrentPage(parsedGhId)) {
        return;
      }
      cameraPageMap.value[parsedGhId] = clampedPage;
      _fetchData(parsedGhId, {
        force: true
      });
    };
    var onBtNext = function onBtNext(gh_id) {
      goToPage(gh_id, getCurrentPage(gh_id) + 1);
    };
    var onBtPrevious = function onBtPrevious(gh_id) {
      goToPage(gh_id, getCurrentPage(gh_id) - 1);
    };
    var onPerPageChange = function onPerPageChange(value) {
      var parsedPerPage = Number(value);
      sharedPerPage.value = Number.isFinite(parsedPerPage) && parsedPerPage > 0 ? parsedPerPage : DEFAULT_CAMERA_PER_PAGE;
      var greenhouseList = Array.isArray(greenhouses) ? greenhouses : [];
      greenhouseList.forEach(function (greenhouse) {
        cameraPageMap.value[greenhouse.id] = 1;
      });
      fetchAllGreenhouses({
        force: true
      });
    };

    // fetch data table
    var _fetchData = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(gh_id) {
        var _ref5,
          _ref5$force,
          force,
          parsedGhId,
          requestToken,
          controller,
          queryData,
          url,
          response,
          jsonData,
          _rowImageMap$value$pa,
          nextPreview,
          meta,
          maxPage,
          _args2 = arguments,
          _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _ref5 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref5$force = _ref5.force, force = _ref5$force === void 0 ? false : _ref5$force;
              parsedGhId = Number(gh_id);
              if (!(!Number.isFinite(parsedGhId) || parsedGhId <= 0)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (!(!force && loadedGreenhouseMap.value[parsedGhId] && Array.isArray(rowDataMap.value[parsedGhId]))) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              ensurePaginationMeta(parsedGhId);
              requestToken = (cameraRequestTokens.get(parsedGhId) || 0) + 1;
              cameraRequestTokens.set(parsedGhId, requestToken);
              abortCameraFetch(parsedGhId);
              controller = null;
              _context2.p = 3;
              rowTableLoading.value[parsedGhId] = true;
              queryData = {
                gh_id: parsedGhId,
                page: getCurrentPage(parsedGhId),
                per_page: sharedPerPage.value
              };
              url = "/api/camera-per-gh?dict=" + encodeURIComponent(JSON.stringify(queryData));
              controller = new AbortController();
              cameraFetchControllers.set(parsedGhId, controller);
              _context2.n = 4;
              return fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
                signal: controller.signal
              });
            case 4:
              response = _context2.v;
              _context2.n = 5;
              return response.json();
            case 5:
              jsonData = _context2.v;
              if (!(!isComponentAlive.value || cameraRequestTokens.get(parsedGhId) !== requestToken)) {
                _context2.n = 6;
                break;
              }
              return _context2.a(2);
            case 6:
              if (!Array.isArray(jsonData.data)) {
                _context2.n = 9;
                break;
              }
              nextPreview = jsonData.data[0] || null;
              if (((_rowImageMap$value$pa = rowImageMap.value[parsedGhId]) === null || _rowImageMap$value$pa === void 0 ? void 0 : _rowImageMap$value$pa.image) !== (nextPreview === null || nextPreview === void 0 ? void 0 : nextPreview.image)) {
                rowImageLoading.value[parsedGhId] = Boolean(nextPreview);
              }
              rowDataMap.value[parsedGhId] = jsonData.data;
              rowImageMap.value[parsedGhId] = nextPreview;
              meta = ensurePaginationMeta(parsedGhId);
              meta.total = Number(jsonData.total || 0);
              meta.lastPage = Number(jsonData.last_page || 1);
              loadedGreenhouseMap.value[parsedGhId] = true;
              maxPage = getCameraLastPage(parsedGhId);
              if (!(getCurrentPage(parsedGhId) > maxPage)) {
                _context2.n = 8;
                break;
              }
              cameraPageMap.value[parsedGhId] = maxPage;
              _context2.n = 7;
              return _fetchData(parsedGhId, {
                force: true
              });
            case 7:
              return _context2.a(2);
            case 8:
              _context2.n = 10;
              break;
            case 9:
              toast.error(t("camera.failed_load_data"));
              console.error("Data format error: Expected array", jsonData);
            case 10:
              _context2.n = 13;
              break;
            case 11:
              _context2.p = 11;
              _t = _context2.v;
              if (!(!isComponentAlive.value || (_t === null || _t === void 0 ? void 0 : _t.name) === "AbortError")) {
                _context2.n = 12;
                break;
              }
              return _context2.a(2);
            case 12:
              toast.error(t("camera.failed_load_data"));
              console.error("Fetch error:", _t);
              rowImageLoading.value[parsedGhId] = false;
            case 13:
              _context2.p = 13;
              if (controller && cameraFetchControllers.get(parsedGhId) === controller) {
                cameraFetchControllers["delete"](parsedGhId);
              }
              if (cameraRequestTokens.get(parsedGhId) === requestToken) {
                rowTableLoading.value[parsedGhId] = false;
              }
              return _context2.f(13);
            case 14:
              return _context2.a(2);
          }
        }, _callee2, null, [[3, 11, 13, 14]]);
      }));
      return function fetchData(_x) {
        return _ref4.apply(this, arguments);
      };
    }();
    var loadGreenhouseDataIfNeeded = function loadGreenhouseDataIfNeeded(gh_id) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref6$force = _ref6.force,
        force = _ref6$force === void 0 ? false : _ref6$force;
      var parsedGhId = Number(gh_id);
      if (!Number.isFinite(parsedGhId) || parsedGhId <= 0) {
        return;
      }
      ensurePaginationState(parsedGhId);
      _fetchData(parsedGhId, {
        force: force
      });
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      fetchAllGreenhouses();
    });
    var formatDate = function formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    };
    var exportData = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var payload, response, blob, url, a, filePrefix, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              isExporting.value = true;

              // 1. Cek tanggal
              if (daterange.value) {
                _context3.n = 1;
                break;
              }
              toast.warning(t("camera.date_range_required"));
              isExporting.value = false;
              return _context3.a(2);
            case 1:
              // 2. Siapkan Payload
              payload = {
                start_date: formatDate(daterange.value[0]),
                end_date: formatDate(daterange.value[1]),
                gh_id: selectedGreenhouse.value
              };
              _context3.p = 2;
              _context3.n = 3;
              return axios.post("/api/export-camera", payload, {
                responseType: "blob" // PENTING: Response berupa file binary
              });
            case 3:
              response = _context3.v;
              // 4. Proses Download
              blob = new Blob([response.data], {
                type: response.headers["content-type"] // Ambil tipe file dari server
              });
              url = window.URL.createObjectURL(blob);
              a = document.createElement("a");
              a.href = url;
              filePrefix = locale.value === "id" ? "laporan_kamera" : "camera_report";
              a.download = "".concat(filePrefix, "_").concat(payload.start_date, "_to_").concat(payload.end_date, ".zip");
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              toast.success(t("camera.zip_downloaded"));
              isExporting.value = false;
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t2 = _context3.v;
              console.error(_t2);
              if (_t2.response && _t2.response.status === 404) {
                toast.error(t("camera.no_data_selected_range"));
              } else {
                toast.error(t("camera.failed_download"));
              }
              isExporting.value = false;
            case 5:
              return _context3.a(2);
          }
        }, _callee3, null, [[2, 4]]);
      }));
      return function exportData() {
        return _ref7.apply(this, arguments);
      };
    }();
    var onRowSelected = function onRowSelected(event, gh_id) {
      if (!isComponentAlive.value) {
        return;
      }
      if (event.node.isSelected()) {
        var _rowImageMap$value$gh;
        rowImageLoading.value[gh_id] = true;
        if (((_rowImageMap$value$gh = rowImageMap.value[gh_id]) === null || _rowImageMap$value$gh === void 0 ? void 0 : _rowImageMap$value$gh.image) !== event.data.image) {
          rowImageMap.value[gh_id] = _objectSpread({}, event.data);
        }
        if (rowImageLoadingTimers.value[gh_id]) {
          clearTimeout(rowImageLoadingTimers.value[gh_id]);
        }
        rowImageLoadingTimers.value[gh_id] = setTimeout(function () {
          if (!isComponentAlive.value) {
            return;
          }
          rowImageLoading.value[gh_id] = false;
        }, 500);
      }
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(function () {
      isComponentAlive.value = false;
      abortAllCameraFetches();
      Object.values(rowImageLoadingTimers.value).forEach(function (timerId) {
        clearTimeout(timerId);
      });
      rowImageLoadingTimers.value = {};
    });
    var __returned__ = {
      toast: toast,
      t: t,
      locale: locale,
      page: page,
      greenhouses: greenhouses,
      latestData: latestData,
      actuatorStatus: actuatorStatus,
      daterange: daterange,
      isExporting: isExporting,
      selectedGreenhouse: selectedGreenhouse,
      rowImageLoading: rowImageLoading,
      rowTableLoading: rowTableLoading,
      activeActuatorGhId: activeActuatorGhId,
      actuators: actuators,
      getActuatorIconAnimationClass: getActuatorIconAnimationClass,
      rowSelectionConfig: rowSelectionConfig,
      formatCameraDateTime: formatCameraDateTime,
      columnDefs: columnDefs,
      rowClassRules: rowClassRules,
      rowDataMap: rowDataMap,
      rowImageMap: rowImageMap,
      paginationMetaMap: paginationMetaMap,
      rowImageLoadingTimers: rowImageLoadingTimers,
      isComponentAlive: isComponentAlive,
      loadedGreenhouseMap: loadedGreenhouseMap,
      cameraRequestTokens: cameraRequestTokens,
      cameraFetchControllers: cameraFetchControllers,
      DEFAULT_CAMERA_PER_PAGE: DEFAULT_CAMERA_PER_PAGE,
      CAMERA_PER_PAGE_OPTIONS: CAMERA_PER_PAGE_OPTIONS,
      cameraPageMap: cameraPageMap,
      sharedPerPage: sharedPerPage,
      getGreenhouseLabel: getGreenhouseLabel,
      getCameraLabel: getCameraLabel,
      abortCameraFetch: abortCameraFetch,
      abortAllCameraFetches: abortAllCameraFetches,
      ensurePaginationMeta: ensurePaginationMeta,
      ensureCameraPage: ensureCameraPage,
      getCurrentPage: getCurrentPage,
      getCameraLastPage: getCameraLastPage,
      globalLastPage: globalLastPage,
      getPaginationText: getPaginationText,
      canPrevPage: canPrevPage,
      canNextPage: canNextPage,
      fetchAllGreenhouses: fetchAllGreenhouses,
      goToPage: goToPage,
      onBtNext: onBtNext,
      onBtPrevious: onBtPrevious,
      onPerPageChange: onPerPageChange,
      fetchData: _fetchData,
      loadGreenhouseDataIfNeeded: loadGreenhouseDataIfNeeded,
      formatDate: formatDate,
      exportData: exportData,
      onRowSelected: onRowSelected,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onUnmounted: vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted,
      get Head() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.Head;
      },
      get usePage() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.usePage;
      },
      BreezeAuthenticatedLayout: _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      get VueDatePicker() {
        return _vuepic_vue_datepicker__WEBPACK_IMPORTED_MODULE_3__["default"];
      },
      DigitalClock: _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
      Button: _Components_Button_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
      get AgGridVue() {
        return ag_grid_vue3__WEBPACK_IMPORTED_MODULE_7__.AgGridVue;
      },
      get AllCommunityModule() {
        return ag_grid_community__WEBPACK_IMPORTED_MODULE_8__.AllCommunityModule;
      },
      get ModuleRegistry() {
        return ag_grid_community__WEBPACK_IMPORTED_MODULE_8__.ModuleRegistry;
      },
      get themeAlpine() {
        return ag_grid_community__WEBPACK_IMPORTED_MODULE_8__.themeAlpine;
      },
      get useToast() {
        return vue_toastification__WEBPACK_IMPORTED_MODULE_9__.useToast;
      },
      get useLocale() {
        return _composables_useLocale__WEBPACK_IMPORTED_MODULE_10__.useLocale;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Button.vue?vue&type=template&id=067f8786"
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Button.vue?vue&type=template&id=067f8786 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["type"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    type: $props.type,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 bg-sky-400', 'hover:bg-sky-600'])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")], 8 /* PROPS */, _hoisted_1);
}

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1"
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formattedTime), 1 /* TEXT */);
}

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc"
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "relative"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $setup.open = !$setup.open;
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "trigger", {
    open: $setup.open
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Full Screen Dropdown Overlay "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "fixed inset-0 z-40",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $setup.open = false;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.open]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    "enter-active-class": "transition ease-out duration-200",
    "enter-from-class": "transform opacity-0 scale-95",
    "enter-to-class": "transform opacity-100 scale-100",
    "leave-active-class": "transition ease-in duration-75",
    "leave-from-class": "transform opacity-100 scale-100",
    "leave-to-class": "transform opacity-0 scale-95",
    persisted: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["absolute z-50 mt-2 rounded-md shadow-lg", [$setup.widthClass, $setup.alignmentClasses]]),
        style: {
          "display": "none"
        },
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $setup.open = false;
        })
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["rounded-md ring-1 ring-black ring-opacity-5", $props.contentClasses])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "content")], 2 /* CLASS */)], 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.open]])];
    }),
    _: 3 /* FORWARDED */
  })]);
}

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414"
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["Link"], {
    "class": "block w-full px-4 py-2 text-left text-sm leading-5 whitespace-nowrap text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")];
    }),
    _: 3 /* FORWARDED */
  });
}

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2"
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var _hoisted_1 = {
  "class": "flex min-w-0 flex-1 flex-col text-left leading-tight"
};
var _hoisted_2 = {
  "class": "truncate text-sm font-semibold tracking-[0.01em]"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["Link"], {
    href: $props.href,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.classes),
    prefetch: ['mount', 'hover', 'click'],
    cacheFor: 60000
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.iconWrapClasses)
      }, [$props.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
        key: 0,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)("".concat($props.icon, " text-sm"))
      }, null, 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")]), $props.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: 0,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["truncate text-[11px]", $setup.descriptionClasses])
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.description), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["text-[11px] transition-transform duration-200", $setup.props.active ? 'text-white/90' : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-emerald-400'])
      }, _toConsumableArray(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-chevron-right"
      }, null, -1 /* CACHED */)])), 2 /* CLASS */)];
    }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["href", "class"]);
}

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a"
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var _hoisted_1 = {
  "class": "relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-white text-slate-800"
};
var _hoisted_2 = {
  "class": "relative flex min-h-screen"
};
var _hoisted_3 = {
  "class": "h-full p-3"
};
var _hoisted_4 = {
  "class": "flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200/70 bg-white/95 shadow-xl shadow-emerald-900/5 backdrop-blur"
};
var _hoisted_5 = {
  "class": "flex items-center justify-between border-b border-emerald-100 px-4 py-4"
};
var _hoisted_6 = {
  "class": "leading-tight"
};
var _hoisted_7 = {
  "class": "block text-xs text-slate-500"
};
var _hoisted_8 = ["aria-label"];
var _hoisted_9 = {
  "class": "flex-1 overflow-y-auto px-3 py-4"
};
var _hoisted_10 = {
  "class": "px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
};
var _hoisted_11 = {
  "class": "mt-3 space-y-2"
};
var _hoisted_12 = {
  "class": "border-t border-emerald-100 px-4 py-4"
};
var _hoisted_13 = {
  "class": "rounded-xl border border-emerald-200 bg-emerald-50/80 p-3"
};
var _hoisted_14 = {
  "class": "text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700"
};
var _hoisted_15 = {
  "class": "mt-1 text-sm font-medium text-slate-700"
};
var _hoisted_16 = {
  "class": "flex min-w-0 flex-1 flex-col"
};
var _hoisted_17 = {
  "class": "sticky top-0 z-30 border-b border-emerald-100/70 bg-white/90 backdrop-blur"
};
var _hoisted_18 = {
  "class": "flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8"
};
var _hoisted_19 = ["aria-label"];
var _hoisted_20 = {
  "class": "min-w-0"
};
var _hoisted_21 = {
  "class": "truncate text-xl font-bold tracking-tight text-slate-800 sm:text-2xl"
};
var _hoisted_22 = {
  "class": "hidden text-xs text-slate-500 sm:block"
};
var _hoisted_23 = {
  "class": "ml-auto flex items-center gap-2"
};
var _hoisted_24 = ["title"];
var _hoisted_25 = {
  "class": "inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
};
var _hoisted_26 = {
  "class": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
};
var _hoisted_27 = {
  "class": "hidden sm:inline"
};
var _hoisted_28 = {
  "class": "flex-1 p-4 sm:p-6 lg:p-8"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [$setup.isSidebarOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    onClick: $setup.closeSidebar,
    "class": "fixed inset-0 z-[1990] bg-slate-900/45 backdrop-blur-[1px]"
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fixed inset-y-0 left-0 z-[2000] w-72 max-w-[88vw] transform transition-transform duration-300 ease-out', $setup.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Link"], {
    href: _ctx.route('monitoring'),
    "class": "inline-flex items-center gap-3"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-600/25"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-seedling text-lg"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "block text-lg font-bold tracking-tight text-emerald-700"
      }, " Medini ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("layout.brand_console")), 1 /* TEXT */)])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: $setup.closeSidebar,
    "class": "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700",
    "aria-label": $setup.t('layout.close_sidebar')
  }, _toConsumableArray(_cache[2] || (_cache[2] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-times text-sm"
  }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_8)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("layout.navigation")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.navItems, function (item) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["BreezeNavLink"], {
      key: item.routeName,
      href: _ctx.route(item.routeName),
      active: _ctx.route().current(item.routeName),
      icon: item.icon,
      description: item.description,
      onClick: $setup.handleNavClick
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.label), 1 /* TEXT */)];
      }),
      _: 2 /* DYNAMIC */
    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["href", "active", "icon", "description"]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("layout.system_status")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("layout.dashboard_ready")), 1 /* TEXT */)])])])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: $setup.toggleSidebar,
    "class": "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700",
    "aria-label": $setup.t('layout.toggle_navigation')
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.isSidebarOpen ? 'fas fa-times' : 'fas fa-bars')
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.pageTitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("layout.header_subtitle")), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "inline-flex items-center rounded-xl border border-slate-200 bg-white p-1",
    title: $setup.t('layout.language')
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["rounded-lg px-2 py-1 text-xs font-semibold transition", $setup.locale === 'id' ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100']),
    onClick: $setup.switchToIndonesian
  }, " ID ", 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["rounded-lg px-2 py-1 text-xs font-semibold transition", $setup.locale === 'en' ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100']),
    onClick: $setup.switchToEnglish
  }, " EN ", 2 /* CLASS */)], 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeDropdown"], {
    align: "right",
    width: "52"
  }, {
    trigger: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref) {
      var open = _ref.open;
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx.$page.props.auth.user.username || "U")[0].toUpperCase()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$page.props.auth.user.username), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas fa-chevron-down text-[11px] transition-transform duration-200", {
          'rotate-180': open
        }])
      }, null, 2 /* CLASS */)])];
    }),
    content: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeDropdownLink"], {
        href: _ctx.route('logout'),
        method: "post",
        as: "button"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("layout.logout")), 1 /* TEXT */)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["href"])];
    }),
    _: 1 /* STABLE */
  })])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")])])])]);
}

/***/ },

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=template&id=1add80e4&scoped=true"
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=template&id=1add80e4&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var _hoisted_1 = {
  "class": "font-semibold text-xl text-gray-800 leading-tight"
};
var _hoisted_2 = {
  "class": "py-2 font-sans"
};
var _hoisted_3 = {
  "class": "max-w-7xl mx-auto sm:px-2 lg:px-2"
};
var _hoisted_4 = {
  "class": "flex flex-col lg:flex-row gap-2 mb-2"
};
var _hoisted_5 = {
  "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4 w-full lg:w-3/5 flex items-center"
};
var _hoisted_6 = {
  "class": "flex flex-col w-full gap-2"
};
var _hoisted_7 = {
  "class": "flex justify-between"
};
var _hoisted_8 = {
  "class": "flex justify-between"
};
var _hoisted_9 = {
  "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4 w-full lg:w-2/5"
};
var _hoisted_10 = {
  "class": "flex flex-col w-full"
};
var _hoisted_11 = {
  "class": "flex justify-between"
};
var _hoisted_12 = {
  "class": "text-lg"
};
var _hoisted_13 = {
  "class": "flex justify-between gap-2"
};
var _hoisted_14 = {
  value: ""
};
var _hoisted_15 = ["value"];
var _hoisted_16 = ["disabled"];
var _hoisted_17 = {
  "class": "mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
};
var _hoisted_18 = {
  "class": "flex items-center justify-between h-full"
};
var _hoisted_19 = {
  "class": "flex items-center"
};
var _hoisted_20 = {
  "class": "ml-4"
};
var _hoisted_21 = {
  "class": "font-semibold text-gray-800"
};
var _hoisted_22 = {
  "class": "text-sm text-gray-500"
};
var _hoisted_23 = {
  "class": "mb-2 flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-center"
};
var _hoisted_24 = {
  "class": "flex w-full items-center justify-center gap-2 sm:w-auto"
};
var _hoisted_25 = {
  "class": "text-xs font-medium text-gray-500"
};
var _hoisted_26 = ["value"];
var _hoisted_27 = ["value"];
var _hoisted_28 = {
  "class": "text-xs font-medium text-gray-500"
};
var _hoisted_29 = {
  "class": "flex flex-col lg:flex-row gap-2"
};
var _hoisted_30 = {
  "class": "mb-4 flex w-full flex-col items-center gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left"
};
var _hoisted_31 = {
  "class": "flex flex-col"
};
var _hoisted_32 = {
  "class": "text-lg font-semibold leading-tight"
};
var _hoisted_33 = {
  "class": "text-xs font-medium uppercase tracking-wide text-gray-500"
};
var _hoisted_34 = {
  "class": "flex flex-col items-center md:items-end"
};
var _hoisted_35 = {
  key: 0,
  "class": "px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 border border-blue-200 shadow-sm"
};
var _hoisted_36 = {
  "class": "text-xs font-bold"
};
var _hoisted_37 = {
  "class": "flex flex-col gap-4 w-full"
};
var _hoisted_38 = {
  "class": "p-3 border rounded-lg flex justify-center items-center w-full h-[300px]"
};
var _hoisted_39 = {
  key: 0,
  "class": "flex justify-center items-center"
};
var _hoisted_40 = ["src", "alt", "onLoad", "onError"];
var _hoisted_41 = {
  "class": "flex flex-col gap-2"
};
var _hoisted_42 = {
  "class": "relative"
};
var _hoisted_43 = {
  key: 0,
  "class": "absolute inset-0 z-10 flex items-center justify-center bg-white/80"
};
var _hoisted_44 = {
  "class": "flex flex-col items-center gap-3"
};
var _hoisted_45 = {
  "class": "font-medium text-gray-600"
};
var _hoisted_46 = {
  "class": "flex items-center justify-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-2 text-center sm:gap-2"
};
var _hoisted_47 = {
  "class": "min-w-[92px] text-center text-xs font-medium text-gray-700 sm:text-sm"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Head"], {
    title: $setup.t('title.camera')
  }, null, 8 /* PROPS */, ["title"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeAuthenticatedLayout"], {
    titlePage: 'Camera'
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("title.camera")), 1 /* TEXT */)];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.time")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["DigitalClock"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.latest_data")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.latestData || "-"), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.export")), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $setup.selectedGreenhouse = $event;
        }),
        "class": "w-3/4 sm:w-1/2 p-1.5 border rounded-lg text-center focus:ring focus:ring-blue-300 hover:border-blue-400 transition"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.all")), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.greenhouses, function (greenhouse) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          key: greenhouse.id,
          value: greenhouse.id
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(greenhouse.name), 9 /* TEXT, PROPS */, _hoisted_15);
      }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.selectedGreenhouse]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["VueDatePicker"], {
        modelValue: $setup.daterange,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $setup.daterange = $event;
        }),
        range: "",
        teleport: true,
        position: "left",
        placeholder: $setup.t('camera.pick_date_range')
      }, null, 8 /* PROPS */, ["modelValue", "placeholder"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        disabled: $setup.isExporting,
        onClick: $setup.exportData,
        "class": "bg-green-500 text-white p-1 rounded"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.isExporting ? 'fas fa-spinner fa-spin' : 'far fa-file-excel', ' w-8 h-full py-1.5'])
      }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_16)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.actuators, function (actuator, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: index,
          "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([actuator.icon, actuator.color, $setup.getActuatorIconAnimationClass(actuator), 'text-3xl w-10'])
        }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(actuator.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.status")), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([actuator.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700', "px-3 py-1 text-xs font-bold rounded-full"])
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(actuator.status ? $setup.t("monitoring.on") : $setup.t("monitoring.off")), 3 /* TEXT, CLASS */)])]);
      }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.show")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        value: $setup.sharedPerPage,
        "class": "h-8 rounded border border-gray-300 px-2 text-sm",
        onChange: _cache[2] || (_cache[2] = function ($event) {
          return $setup.onPerPageChange($event.target.value);
        })
      }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.CAMERA_PER_PAGE_OPTIONS, function (option) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
          key: "shared-per-page-".concat(option),
          value: option
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option), 9 /* TEXT, PROPS */, _hoisted_27);
      }), 64 /* STABLE_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_26), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.per_page")), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.greenhouses, function (greenhouse, index) {
        var _$setup$rowImageMap$g, _$setup$rowImageMap$g2, _$setup$rowImageMap$g3, _$setup$rowImageMap$g4;
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: greenhouse.id,
          "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4 w-full"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getCameraLabel(index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getGreenhouseLabel(greenhouse)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [((_$setup$rowImageMap$g = $setup.rowImageMap[greenhouse.id]) === null || _$setup$rowImageMap$g === void 0 ? void 0 : _$setup$rowImageMap$g.fog_percentage) !== null && ((_$setup$rowImageMap$g2 = $setup.rowImageMap[greenhouse.id]) === null || _$setup$rowImageMap$g2 === void 0 ? void 0 : _$setup$rowImageMap$g2.fog_percentage) !== undefined ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("camera.accuracy")) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$rowImageMap$g3 = $setup.rowImageMap[greenhouse.id]) === null || _$setup$rowImageMap$g3 === void 0 ? void 0 : _$setup$rowImageMap$g3.fog_percentage) + "% ", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [$setup.rowImageLoading[greenhouse.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_39, _toConsumableArray(_cache[3] || (_cache[3] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": "fas fa-spinner fa-spin text-gray-400 text-3xl"
        }, null, -1 /* CACHED */)])))) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
          key: 1,
          src: ((_$setup$rowImageMap$g4 = $setup.rowImageMap[greenhouse.id]) === null || _$setup$rowImageMap$g4 === void 0 ? void 0 : _$setup$rowImageMap$g4.image) || '/images/no-image.svg',
          alt: $setup.t('title.camera'),
          "class": "w-full h-full object-contain",
          onLoad: function onLoad($event) {
            return $setup.rowImageLoading[greenhouse.id] = false;
          },
          onError: function onError(e) {
            e.target.src = '/images/no-image.svg';
            $setup.rowImageLoading[greenhouse.id] = false;
          }
        }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_40))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [$setup.rowTableLoading[greenhouse.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          "class": "h-10 w-10 animate-spin rounded-full border-b-2 border-indigo-600"
        }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.loading_data")), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["AgGridVue"], {
          "class": "camera-grid",
          rowData: $setup.rowDataMap[greenhouse.id] || [],
          columnDefs: $setup.columnDefs,
          domLayout: 'autoHeight',
          animateRows: true,
          suppressPaginationPanel: true,
          rowSelection: $setup.rowSelectionConfig,
          rowClassRules: $setup.rowClassRules,
          onRowSelected: function onRowSelected(event) {
            return $setup.onRowSelected(event, greenhouse.id);
          },
          theme: $setup.themeAlpine
        }, null, 8 /* PROPS */, ["rowData", "columnDefs", "rowClassRules", "onRowSelected", "theme"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Button"], {
          onClick: function onClick($event) {
            return $setup.onBtPrevious(greenhouse.id);
          },
          disabled: !$setup.canPrevPage(greenhouse.id)
        }, {
          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
            return _toConsumableArray(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
              "class": "fas fa-angle-left"
            }, null, -1 /* CACHED */)]));
          }),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick", "disabled"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getPaginationText(greenhouse.id)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Button"], {
          onClick: function onClick($event) {
            return $setup.onBtNext(greenhouse.id);
          },
          disabled: !$setup.canNextPage(greenhouse.id)
        }, {
          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
            return _toConsumableArray(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
              "class": "fas fa-angle-right"
            }, null, -1 /* CACHED */)]));
          }),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick", "disabled"])])])])]);
      }), 128 /* KEYED_FRAGMENT */))])])])];
    }),
    _: 1 /* STABLE */
  })], 64 /* STABLE_FRAGMENT */);
}

/***/ },

/***/ "./resources/js/composables/useLocale.js"
/*!***********************************************!*\
  !*** ./resources/js/composables/useLocale.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLocale: () => (/* binding */ useLocale)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var STORAGE_KEY = "app_locale";
var DEFAULT_LOCALE = "id";
var SUPPORTED_LOCALES = ["id", "en"];
var messages = {
  id: {
    "layout.brand_console": "Konsol Greenhouse",
    "layout.navigation": "Navigasi",
    "layout.system_status": "Status Sistem",
    "layout.dashboard_ready": "Dashboard online dan siap",
    "layout.header_subtitle": "Pusat operasi greenhouse atomic",
    "layout.close_sidebar": "Tutup sidebar",
    "layout.toggle_navigation": "Tampilkan navigasi",
    "layout.logout": "Keluar",
    "layout.language": "Bahasa",
    "layout.lang_id": "Indonesia",
    "layout.lang_en": "Inggris",
    "nav.monitoring": "Monitor",
    "nav.monitoring_desc": "Ringkasan sensor langsung",
    "nav.heatmap": "Peta Iklim",
    "nav.heatmap_desc": "Peta kondisi area",
    "nav.table": "Tabel",
    "nav.table_desc": "Riwayat data sensor",
    "nav.camera": "Kamera",
    "nav.camera_desc": "Linimasa gambar kabut",
    "nav.controlling": "Kontrol",
    "nav.controlling_desc": "Ambang dan jadwal",
    "title.monitoring": "Monitor",
    "title.heatmap": "Peta Iklim",
    "title.table": "Tabel",
    "title.camera": "Kamera",
    "title.controlling": "Kontrol",
    "common.all": "Semua",
    "common.of": "dari",
    "common.to": "sampai",
    "common.no_data": "Tidak ada data",
    "common.unexpected_error": "Ups! Terjadi kesalahan.",
    "sensor.temperature": "Suhu",
    "sensor.humidity": "Kelembapan",
    "sensor.light_intensity": "Intensitas Cahaya",
    "monitoring.time": "Waktu",
    "monitoring.latest_data": "Data Terbaru",
    "monitoring.status": "Status",
    "monitoring.exhaust_fan": "Kipas Buang",
    "monitoring.dehumidifier": "Dehumidifier",
    "monitoring.blower": "Kipas Sirkulasi",
    "monitoring.camera": "Kamera",
    "monitoring.on": "NYALA",
    "monitoring.off": "MATI",
    "monitoring.average": "Rata-rata",
    "monitoring.per_node": "Per Node",
    "monitoring.range_custom": "Kustom",
    "monitoring.range_1h": "1 Jam",
    "monitoring.range_1d": "1 Hari",
    "monitoring.range_1w": "1 Minggu",
    "monitoring.range_1m": "1 Bulan",
    "monitoring.date": "Tanggal",
    "monitoring.hour": "Jam",
    "monitoring.filter": "Filter",
    "monitoring.search": "Cari",
    "monitoring.loading_chart": "Memuat grafik...",
    "monitoring.no_data": "Data tidak tersedia.",
    "monitoring.loading_gauge": "Memuat gauge...",
    "monitoring.failed_load_chart": "Gagal memuat grafik.",
    "monitoring.failed_load_data": "Gagal memuat data.",
    "camera.date_time": "Tanggal Waktu",
    "camera.fog_accuracy": "Akurasi Kabut",
    "camera.status": "Status",
    "camera.time": "Waktu",
    "camera.latest_data": "Data Terbaru",
    "camera.export": "Ekspor",
    "camera.all": "Semua",
    "camera.show": "Tampil",
    "camera.per_page": "per halaman",
    "camera.showing": "Menampilkan",
    "camera.page_no_data": "Tidak ada data",
    "camera.pick_date_range": "Pilih rentang tanggal",
    "camera.status_foggy": "Berkabut",
    "camera.status_clear": "Tidak Berkabut",
    "camera.status_unknown": "Tidak Diketahui",
    "camera.accuracy": "Akurasi",
    "camera.failed_load_data": "Gagal memuat data.",
    "camera.date_range_required": "Rentang tanggal wajib diisi.",
    "camera.zip_downloaded": "File ZIP berhasil diunduh.",
    "camera.no_data_selected_range": "Tidak ada data pada rentang tanggal tersebut.",
    "camera.failed_download": "Gagal mengunduh file.",
    "table.failed_load_data": "Gagal memuat data.",
    "table.date_range_required": "Rentang tanggal wajib diisi.",
    "table.excel_downloaded": "File Excel berhasil diunduh.",
    "table.failed_download": "Gagal mengunduh file.",
    "table.no": "No",
    "table.node": "Node",
    "table.date": "Tanggal",
    "table.time": "Waktu",
    "table.temperature": "Suhu (°C)",
    "table.humidity": "Kelembapan (%)",
    "table.light_intensity": "Intensitas Cahaya (lx)",
    "table.rssi": "RSSI (dBm)",
    "table.monitoring_data": "Data Monitoring",
    "table.filter_by_date": "Filter Tanggal",
    "table.all_nodes": "Semua Node",
    "table.export": "Ekspor",
    "table.export_current_view": "Ekspor tampilan saat ini ke Excel",
    "table.loading_data": "Memuat data...",
    "controlling.threshold_tab": "Ambang Batas",
    "controlling.scheduling_tab": "Penjadwalan",
    "controlling.min": "Min",
    "controlling.max": "Maks",
    "controlling.save_thresholds": "Simpan Ambang Batas",
    "controlling.scheduling_mode": "Mode Penjadwalan",
    "controlling.rule_threshold_desc": "Aktuator mengikuti ambang sensor (otomatis)",
    "controlling.rule_force_on_desc": "Aktuator tetap NYALA selama waktu jadwal",
    "controlling.rule_force_off_desc": "Aktuator tetap MATI selama waktu jadwal",
    "controlling.no_schedules": "Belum ada jadwal",
    "controlling.add_first_schedule": "Tambah Jadwal Pertama",
    "controlling.add_schedule": "Tambah Jadwal",
    "controlling.max_schedule_reached": "Maksimal jadwal tercapai",
    "controlling.save_all_schedules": "Simpan Semua Jadwal",
    "controlling.schedule_label": "Jadwal",
    "controlling.invalid_time_range": "Rentang waktu tidak valid",
    "controlling.delete_schedule": "Hapus Jadwal",
    "controlling.start_time": "Waktu Mulai",
    "controlling.end_time": "Waktu Selesai",
    "controlling.actuator_settings": "Pengaturan Aktuator",
    "controlling.force_on": "Paksa NYALA",
    "controlling.force_off": "Paksa MATI",
    "controlling.all_follow_threshold": "Semua aktuator mengikuti ambang",
    "controlling.threshold_mode": "Ambang Batas",
    "controlling.unsaved_threshold_changes": "Ada perubahan ambang batas yang belum disimpan!",
    "controlling.unsaved_schedule_changes": "Ada perubahan jadwal yang belum disimpan!",
    "controlling.no_threshold_changes": "Tidak ada perubahan untuk disimpan.",
    "controlling.threshold_updated": "Ambang batas berhasil diperbarui!",
    "controlling.failed_update_threshold": "Gagal memperbarui ambang batas.",
    "controlling.max_schedule": "Maksimal 4 jadwal per greenhouse!",
    "controlling.schedule_deleted": "Jadwal berhasil dihapus!",
    "controlling.failed_delete_schedule": "Gagal menghapus jadwal.",
    "controlling.invalid_schedule_time": "Periksa waktu jadwal. Waktu mulai harus sebelum waktu selesai.",
    "controlling.schedule_saved": "Jadwal berhasil disimpan!",
    "controlling.failed_save_schedule": "Gagal menyimpan jadwal.",
    "controlling.validation_failed_prefix": "Validasi gagal: ",
    "heatmap.safe": "Aman",
    "heatmap.normal": "Normal",
    "heatmap.warning": "Waspada",
    "heatmap.critical": "Kritis",
    "auth.login_title": "Masuk",
    "auth.register_title": "Daftar",
    "auth.forgot_password_title": "Lupa Kata Sandi",
    "auth.reset_password_title": "Atur Ulang Kata Sandi",
    "auth.confirm_password_title": "Konfirmasi Kata Sandi",
    "auth.verify_email_title": "Verifikasi Email",
    "auth.name": "Nama",
    "auth.email": "Email",
    "auth.username": "Username",
    "auth.password": "Kata Sandi",
    "auth.confirm_password": "Konfirmasi Kata Sandi",
    "auth.login": "Masuk",
    "auth.register": "Daftar",
    "auth.forgot_password_desc": "Lupa kata sandi? Masukkan email Anda dan kami akan mengirim tautan untuk mengatur ulang kata sandi.",
    "auth.email_password_reset_link": "Kirim Tautan Atur Ulang Kata Sandi",
    "auth.reset_password": "Atur Ulang Kata Sandi",
    "auth.confirm_password_desc": "Ini adalah area aman aplikasi. Silakan konfirmasi kata sandi sebelum melanjutkan.",
    "auth.confirm": "Konfirmasi",
    "auth.already_registered": "Sudah punya akun?",
    "auth.verify_email_desc": "Terima kasih sudah mendaftar. Sebelum mulai, verifikasi alamat email Anda melalui tautan yang kami kirim. Jika belum menerima email, kami bisa mengirim ulang.",
    "auth.verification_link_sent": "Tautan verifikasi baru sudah dikirim ke alamat email yang Anda daftarkan.",
    "auth.resend_verification_email": "Kirim Ulang Verifikasi Email"
  },
  en: {
    "layout.brand_console": "Greenhouse Console",
    "layout.navigation": "Navigation",
    "layout.system_status": "System Status",
    "layout.dashboard_ready": "Dashboard online and ready",
    "layout.header_subtitle": "Atomic greenhouse operation center",
    "layout.close_sidebar": "Close sidebar",
    "layout.toggle_navigation": "Toggle navigation",
    "layout.logout": "Log Out",
    "layout.language": "Language",
    "layout.lang_id": "Indonesia",
    "layout.lang_en": "English",
    "nav.monitoring": "Monitoring",
    "nav.monitoring_desc": "Live sensor overview",
    "nav.heatmap": "Heatmap",
    "nav.heatmap_desc": "Spatial condition map",
    "nav.table": "Table",
    "nav.table_desc": "Historical data explorer",
    "nav.camera": "Camera",
    "nav.camera_desc": "Fog image timeline",
    "nav.controlling": "Controlling",
    "nav.controlling_desc": "Threshold and schedule",
    "title.monitoring": "Monitoring",
    "title.heatmap": "Heatmap",
    "title.table": "Table",
    "title.camera": "Camera",
    "title.controlling": "Controlling",
    "common.all": "All",
    "common.of": "of",
    "common.to": "to",
    "common.no_data": "No data",
    "common.unexpected_error": "Whoops! Something went wrong.",
    "sensor.temperature": "Temperature",
    "sensor.humidity": "Humidity",
    "sensor.light_intensity": "Light Intensity",
    "monitoring.time": "Time",
    "monitoring.latest_data": "Latest Data",
    "monitoring.status": "Status",
    "monitoring.exhaust_fan": "Exhaust Fan",
    "monitoring.dehumidifier": "Dehumidifier",
    "monitoring.blower": "Drum Fan",
    "monitoring.camera": "Camera",
    "monitoring.on": "ON",
    "monitoring.off": "OFF",
    "monitoring.average": "Average",
    "monitoring.per_node": "Per Node",
    "monitoring.range_custom": "Custom",
    "monitoring.range_1h": "1 Hour",
    "monitoring.range_1d": "1 Day",
    "monitoring.range_1w": "1 Week",
    "monitoring.range_1m": "1 Month",
    "monitoring.date": "Date",
    "monitoring.hour": "Hour",
    "monitoring.filter": "Filter",
    "monitoring.search": "Search",
    "monitoring.loading_chart": "Loading chart...",
    "monitoring.no_data": "No data available.",
    "monitoring.loading_gauge": "Loading gauge...",
    "monitoring.failed_load_chart": "Failed to load chart.",
    "monitoring.failed_load_data": "Failed to load data.",
    "camera.date_time": "Date Time",
    "camera.fog_accuracy": "Fog Accuracy",
    "camera.status": "Status",
    "camera.time": "Time",
    "camera.latest_data": "Latest Data",
    "camera.export": "Export",
    "camera.all": "All",
    "camera.show": "Show",
    "camera.per_page": "per page",
    "camera.showing": "Showing",
    "camera.page_no_data": "No data",
    "camera.pick_date_range": "Pick a date range",
    "camera.status_foggy": "Foggy",
    "camera.status_clear": "Clear",
    "camera.status_unknown": "Unknown",
    "camera.accuracy": "Accuracy",
    "camera.failed_load_data": "Failed to load data.",
    "camera.date_range_required": "Date range is required.",
    "camera.zip_downloaded": "ZIP file downloaded successfully.",
    "camera.no_data_selected_range": "No data found for selected date range.",
    "camera.failed_download": "Failed to download file.",
    "table.failed_load_data": "Failed to load data.",
    "table.date_range_required": "Date range is required.",
    "table.excel_downloaded": "Excel file downloaded successfully.",
    "table.failed_download": "Failed to download file.",
    "table.no": "No",
    "table.node": "Node",
    "table.date": "Date",
    "table.time": "Time",
    "table.temperature": "Temperature (°C)",
    "table.humidity": "Humidity (%)",
    "table.light_intensity": "Light Intensity (lx)",
    "table.rssi": "RSSI (dBm)",
    "table.monitoring_data": "Monitoring Data",
    "table.filter_by_date": "Filter by Date",
    "table.all_nodes": "All Nodes",
    "table.export": "Export",
    "table.export_current_view": "Export current view to Excel",
    "table.loading_data": "Loading data...",
    "controlling.threshold_tab": "Threshold",
    "controlling.scheduling_tab": "Scheduling",
    "controlling.min": "Min",
    "controlling.max": "Max",
    "controlling.save_thresholds": "Save Thresholds",
    "controlling.scheduling_mode": "Scheduling Mode",
    "controlling.rule_threshold_desc": "Actuator follows sensor threshold (automatic)",
    "controlling.rule_force_on_desc": "Actuator stays ON during scheduled time",
    "controlling.rule_force_off_desc": "Actuator stays OFF during scheduled time",
    "controlling.no_schedules": "No schedules created yet",
    "controlling.add_first_schedule": "Add First Schedule",
    "controlling.add_schedule": "Add Schedule",
    "controlling.max_schedule_reached": "Maximum schedules reached",
    "controlling.save_all_schedules": "Save All Schedules",
    "controlling.schedule_label": "Schedule",
    "controlling.invalid_time_range": "Invalid time range",
    "controlling.delete_schedule": "Delete Schedule",
    "controlling.start_time": "Start Time",
    "controlling.end_time": "End Time",
    "controlling.actuator_settings": "Actuator Settings",
    "controlling.force_on": "Force ON",
    "controlling.force_off": "Force OFF",
    "controlling.all_follow_threshold": "All actuators follow threshold",
    "controlling.threshold_mode": "Threshold",
    "controlling.unsaved_threshold_changes": "There are unsaved threshold changes.",
    "controlling.unsaved_schedule_changes": "There are unsaved schedule changes.",
    "controlling.no_threshold_changes": "There are no changes to save.",
    "controlling.threshold_updated": "Threshold updated successfully.",
    "controlling.failed_update_threshold": "Failed to update threshold.",
    "controlling.max_schedule": "Maximum 4 schedules per greenhouse.",
    "controlling.schedule_deleted": "Schedule deleted successfully.",
    "controlling.failed_delete_schedule": "Failed to delete schedule.",
    "controlling.invalid_schedule_time": "Check schedule time. Start time must be before end time.",
    "controlling.schedule_saved": "Schedule saved successfully.",
    "controlling.failed_save_schedule": "Failed to save schedule.",
    "controlling.validation_failed_prefix": "Validation failed: ",
    "heatmap.safe": "Safe",
    "heatmap.normal": "Normal",
    "heatmap.warning": "Warning",
    "heatmap.critical": "Critical",
    "auth.login_title": "Log In",
    "auth.register_title": "Register",
    "auth.forgot_password_title": "Forgot Password",
    "auth.reset_password_title": "Reset Password",
    "auth.confirm_password_title": "Confirm Password",
    "auth.verify_email_title": "Email Verification",
    "auth.name": "Name",
    "auth.email": "Email",
    "auth.username": "Username",
    "auth.password": "Password",
    "auth.confirm_password": "Confirm Password",
    "auth.login": "Log In",
    "auth.register": "Register",
    "auth.forgot_password_desc": "Forgot your password? No problem. Enter your email and we will send you a password reset link.",
    "auth.email_password_reset_link": "Email Password Reset Link",
    "auth.reset_password": "Reset Password",
    "auth.confirm_password_desc": "This is a secure area of the application. Please confirm your password before continuing.",
    "auth.confirm": "Confirm",
    "auth.already_registered": "Already registered?",
    "auth.verify_email_desc": "Thanks for signing up! Before getting started, verify your email by clicking the link we just sent. If you did not receive it, we can resend it.",
    "auth.verification_link_sent": "A new verification link has been sent to the email address you provided during registration.",
    "auth.resend_verification_email": "Resend Verification Email"
  }
};
var locale = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(DEFAULT_LOCALE);
var initialized = false;
var normalizeLocale = function normalizeLocale(nextLocale) {
  return SUPPORTED_LOCALES.includes(nextLocale) ? nextLocale : DEFAULT_LOCALE;
};
var initLocale = function initLocale() {
  if (initialized) {
    return;
  }
  initialized = true;
  if (typeof window === "undefined") {
    locale.value = DEFAULT_LOCALE;
    return;
  }
  var saved = window.localStorage.getItem(STORAGE_KEY);
  locale.value = normalizeLocale(saved);
};
var setLocale = function setLocale(nextLocale) {
  var normalized = normalizeLocale(nextLocale);
  locale.value = normalized;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, normalized);
  }
};
var t = function t(key) {
  var _ref, _byLocale$key;
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var byLocale = messages[locale.value] || messages[DEFAULT_LOCALE];
  var byDefault = messages[DEFAULT_LOCALE];
  return ((_ref = (_byLocale$key = byLocale[key]) !== null && _byLocale$key !== void 0 ? _byLocale$key : byDefault[key]) !== null && _ref !== void 0 ? _ref : fallback) || key;
};
var useLocale = function useLocale() {
  initLocale();
  return {
    locale: locale,
    setLocale: setLocale,
    t: t
  };
};

/***/ },

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css"
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n[data-v-1add80e4] .camera-grid .camera-header-center .ag-header-cell-label {\r\n    justify-content: center;\n}\n[data-v-1add80e4] .camera-grid .camera-cell-center {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    text-align: center;\n}\n.actuator-fan-active[data-v-1add80e4] {\r\n    animation: actuator-fan-spin-1add80e4 1.5s linear infinite;\r\n    transform-origin: 50% 50%;\n}\n.actuator-dehumidifier-active[data-v-1add80e4] {\r\n    animation: actuator-dehumidifier-pulse-1add80e4 1.7s ease-in-out infinite;\r\n    transform-origin: 50% 50%;\n}\n@keyframes actuator-fan-spin-1add80e4 {\nfrom {\r\n        transform: rotate(0deg);\n}\nto {\r\n        transform: rotate(360deg);\n}\n}\n@keyframes actuator-dehumidifier-pulse-1add80e4 {\n0%,\r\n    100% {\r\n        transform: translateY(0) scale(1);\r\n        opacity: 1;\n}\n50% {\r\n        transform: translateY(-2px) scale(1.08);\r\n        opacity: 0.82;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css"
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_style_index_0_id_1add80e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_style_index_0_id_1add80e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_style_index_0_id_1add80e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ },

/***/ "./resources/js/Components/Button.vue"
/*!********************************************!*\
  !*** ./resources/js/Components/Button.vue ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Button_vue_vue_type_template_id_067f8786__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button.vue?vue&type=template&id=067f8786 */ "./resources/js/Components/Button.vue?vue&type=template&id=067f8786");
/* harmony import */ var _Button_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/Button.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Button_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Button_vue_vue_type_template_id_067f8786__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/Button.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ },

/***/ "./resources/js/Components/DigitalClock.vue"
/*!**************************************************!*\
  !*** ./resources/js/Components/DigitalClock.vue ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DigitalClock_vue_vue_type_template_id_22760da1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DigitalClock.vue?vue&type=template&id=22760da1 */ "./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1");
/* harmony import */ var _DigitalClock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DigitalClock.vue?vue&type=script&lang=js */ "./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_DigitalClock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DigitalClock_vue_vue_type_template_id_22760da1__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/DigitalClock.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ },

/***/ "./resources/js/Components/Dropdown.vue"
/*!**********************************************!*\
  !*** ./resources/js/Components/Dropdown.vue ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dropdown_vue_vue_type_template_id_4210c0dc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dropdown.vue?vue&type=template&id=4210c0dc */ "./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc");
/* harmony import */ var _Dropdown_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dropdown.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Dropdown_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Dropdown_vue_vue_type_template_id_4210c0dc__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/Dropdown.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ },

/***/ "./resources/js/Components/DropdownLink.vue"
/*!**************************************************!*\
  !*** ./resources/js/Components/DropdownLink.vue ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DropdownLink_vue_vue_type_template_id_6e0ef414__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DropdownLink.vue?vue&type=template&id=6e0ef414 */ "./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414");
/* harmony import */ var _DropdownLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DropdownLink.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_DropdownLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DropdownLink_vue_vue_type_template_id_6e0ef414__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/DropdownLink.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ },

/***/ "./resources/js/Components/NavLink.vue"
/*!*********************************************!*\
  !*** ./resources/js/Components/NavLink.vue ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NavLink_vue_vue_type_template_id_337232c2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavLink.vue?vue&type=template&id=337232c2 */ "./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2");
/* harmony import */ var _NavLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavLink.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_NavLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_NavLink_vue_vue_type_template_id_337232c2__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/NavLink.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ },

/***/ "./resources/js/Layouts/Authenticated.vue"
/*!************************************************!*\
  !*** ./resources/js/Layouts/Authenticated.vue ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Authenticated_vue_vue_type_template_id_7412da4a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Authenticated.vue?vue&type=template&id=7412da4a */ "./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a");
/* harmony import */ var _Authenticated_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Authenticated.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Authenticated_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Authenticated_vue_vue_type_template_id_7412da4a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Layouts/Authenticated.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ },

/***/ "./resources/js/Pages/Camera.vue"
/*!***************************************!*\
  !*** ./resources/js/Pages/Camera.vue ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Camera_vue_vue_type_template_id_1add80e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera.vue?vue&type=template&id=1add80e4&scoped=true */ "./resources/js/Pages/Camera.vue?vue&type=template&id=1add80e4&scoped=true");
/* harmony import */ var _Camera_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Camera.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Pages/Camera.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _Camera_vue_vue_type_style_index_0_id_1add80e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css */ "./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Camera_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Camera_vue_vue_type_template_id_1add80e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-1add80e4"],['__file',"resources/js/Pages/Camera.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ },

/***/ "./resources/js/Components/Button.vue?vue&type=script&setup=true&lang=js"
/*!*******************************************************************************!*\
  !*** ./resources/js/Components/Button.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Button_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Button_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Button.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Button.vue?vue&type=script&setup=true&lang=js");
 

/***/ },

/***/ "./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js"
/*!**************************************************************************!*\
  !*** ./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalClock.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js");
 

/***/ },

/***/ "./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js"
/*!*********************************************************************************!*\
  !*** ./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dropdown.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js");
 

/***/ },

/***/ "./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js"
/*!*************************************************************************************!*\
  !*** ./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DropdownLink.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js");
 

/***/ },

/***/ "./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js"
/*!********************************************************************************!*\
  !*** ./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NavLink.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js");
 

/***/ },

/***/ "./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js"
/*!***********************************************************************************!*\
  !*** ./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Authenticated.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js");
 

/***/ },

/***/ "./resources/js/Pages/Camera.vue?vue&type=script&setup=true&lang=js"
/*!**************************************************************************!*\
  !*** ./resources/js/Pages/Camera.vue?vue&type=script&setup=true&lang=js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Camera.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=script&setup=true&lang=js");
 

/***/ },

/***/ "./resources/js/Components/Button.vue?vue&type=template&id=067f8786"
/*!**************************************************************************!*\
  !*** ./resources/js/Components/Button.vue?vue&type=template&id=067f8786 ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Button_vue_vue_type_template_id_067f8786__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Button_vue_vue_type_template_id_067f8786__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Button.vue?vue&type=template&id=067f8786 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Button.vue?vue&type=template&id=067f8786");


/***/ },

/***/ "./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1"
/*!********************************************************************************!*\
  !*** ./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1 ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_template_id_22760da1__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_template_id_22760da1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalClock.vue?vue&type=template&id=22760da1 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1");


/***/ },

/***/ "./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc"
/*!****************************************************************************!*\
  !*** ./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_template_id_4210c0dc__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_template_id_4210c0dc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dropdown.vue?vue&type=template&id=4210c0dc */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc");


/***/ },

/***/ "./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414"
/*!********************************************************************************!*\
  !*** ./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414 ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_template_id_6e0ef414__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_template_id_6e0ef414__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DropdownLink.vue?vue&type=template&id=6e0ef414 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414");


/***/ },

/***/ "./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2"
/*!***************************************************************************!*\
  !*** ./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2 ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_template_id_337232c2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_template_id_337232c2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NavLink.vue?vue&type=template&id=337232c2 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2");


/***/ },

/***/ "./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a"
/*!******************************************************************************!*\
  !*** ./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_template_id_7412da4a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_template_id_7412da4a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Authenticated.vue?vue&type=template&id=7412da4a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a");


/***/ },

/***/ "./resources/js/Pages/Camera.vue?vue&type=template&id=1add80e4&scoped=true"
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/Camera.vue?vue&type=template&id=1add80e4&scoped=true ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_template_id_1add80e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_template_id_1add80e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Camera.vue?vue&type=template&id=1add80e4&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=template&id=1add80e4&scoped=true");


/***/ },

/***/ "./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css"
/*!***********************************************************************************************!*\
  !*** ./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css ***!
  \***********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Camera_vue_vue_type_style_index_0_id_1add80e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Camera.vue?vue&type=style&index=0&id=1add80e4&scoped=true&lang=css");


/***/ }

}]);