"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-Table-vue"],{

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js"
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Tabs',
  props: {
    greenhouses: Array,
    modelValue: Number
  },
  emits: ["update:modelValue"],
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var props = __props;

    // Mencari index dari greenhouse yang aktif
    var activeIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return (props.greenhouses || []).findIndex(function (g) {
        return g.id == props.modelValue;
      });
    });
    var greenhouseCount = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var _props$greenhouses;
      return ((_props$greenhouses = props.greenhouses) === null || _props$greenhouses === void 0 ? void 0 : _props$greenhouses.length) || 0;
    });
    var safeActiveIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      if (greenhouseCount.value <= 0) {
        return 0;
      }
      if (activeIndex.value < 0) {
        return 0;
      }
      return Math.min(activeIndex.value, greenhouseCount.value - 1);
    });
    var getGreenhouseLabel = function getGreenhouseLabel(greenhouse) {
      var label = String((greenhouse === null || greenhouse === void 0 ? void 0 : greenhouse.name) || "").trim();
      var ghId = Number(greenhouse === null || greenhouse === void 0 ? void 0 : greenhouse.id);
      var fallbackNumber = Number.isFinite(ghId) && ghId > 0 ? ghId : null;
      var normalized = label.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
      var labelNumberMatch = normalized.match(/(\d+)$/);
      var labelNumber = labelNumberMatch ? Number(labelNumberMatch[1]) : null;
      var tabNumber = labelNumber !== null && labelNumber !== void 0 ? labelNumber : fallbackNumber;
      var defaultLabel = Number.isFinite(tabNumber) && tabNumber > 0 ? "GH Von Florist ".concat(tabNumber) : "GH Von Florist";

      // Normalisasi semua variasi nama default greenhouse agar label tab konsisten
      var shouldUseDefaultLabel = !label || /^gh\s*\d+$/.test(normalized) || /^greenhouse\s*\d+$/.test(normalized) || /^gh\s*von\s*florist\s*\d+$/.test(normalized) || /^gh\s*vonflorist\s*\d+$/.test(normalized);
      if (shouldUseDefaultLabel) {
        return defaultLabel;
      }
      return label;
    };
    var __returned__ = {
      props: props,
      activeIndex: activeIndex,
      greenhouseCount: greenhouseCount,
      safeActiveIndex: safeActiveIndex,
      getGreenhouseLabel: getGreenhouseLabel,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed
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
      if (typeof window !== "undefined") {
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Table.vue?vue&type=script&setup=true&lang=js"
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Table.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Layouts/Authenticated.vue */ "./resources/js/Layouts/Authenticated.vue");
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");
/* harmony import */ var _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Tabs.vue */ "./resources/js/Components/Tabs.vue");
/* harmony import */ var ag_grid_vue3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ag-grid-vue3 */ "./node_modules/ag-grid-vue3/dist/main.mjs");
/* harmony import */ var ag_grid_community__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ag-grid-community */ "./node_modules/ag-grid-community/dist/package/main.esm.mjs");
/* harmony import */ var _vuepic_vue_datepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vuepic/vue-datepicker */ "./node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js");
/* harmony import */ var _vuepic_vue_datepicker_dist_main_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @vuepic/vue-datepicker/dist/main.css */ "./node_modules/@vuepic/vue-datepicker/dist/main.css");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _composables_useLocale__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/composables/useLocale */ "./resources/js/composables/useLocale.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }











var CACHE_TTL_MS = 30000;
var CACHE_LIMIT = 40;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Table',
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    ag_grid_community__WEBPACK_IMPORTED_MODULE_6__.ModuleRegistry.registerModules([ag_grid_community__WEBPACK_IMPORTED_MODULE_6__.AllCommunityModule]);
    var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_9__.useToast)();
    var _useLocale = (0,_composables_useLocale__WEBPACK_IMPORTED_MODULE_10__.useLocale)(),
      t = _useLocale.t;
    var greenhouses = (0,_inertiajs_vue3__WEBPACK_IMPORTED_MODULE_3__.usePage)().props.greenhouses;
    var activeTab = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(greenhouses[0].id);
    var daterange = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
    var selectedNode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("");
    var isExporting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

    // Server-side pagination state
    var rowData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var currentPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    var perPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(10);
    var totalRows = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    var lastPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    var sortField = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("recorded_at");
    var sortDirection = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("desc");
    var columnFilters = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var responseCache = new Map();
    var gridApi = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    var activeAbortController = null;
    var latestRequestId = 0;
    var columnDefs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return [{
        headerName: t("table.no"),
        valueGetter: function valueGetter(params) {
          return (currentPage.value - 1) * perPage.value + params.node.rowIndex + 1;
        },
        minWidth: 60,
        maxWidth: 70,
        filter: false,
        sortable: false,
        resizable: false
      }, {
        headerName: t("table.node"),
        field: "node_id",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 80,
        maxWidth: 90
      }, {
        headerName: t("table.date"),
        field: "date",
        filter: "agTextColumnFilter",
        sortable: true,
        minWidth: 120
      }, {
        headerName: t("table.time"),
        field: "time",
        filter: "agTextColumnFilter",
        sortable: true,
        minWidth: 100
      }, {
        headerName: t("table.temperature"),
        field: "temperature",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 150
      }, {
        headerName: t("table.humidity"),
        field: "humidity",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 130
      }, {
        headerName: t("table.light_intensity"),
        field: "light_intensity",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 160
      }, {
        headerName: t("table.rssi"),
        field: "rssi",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 120
      }];
    });
    var defaultColDef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: false,
      suppressMovable: true
    });

    // Computed display values
    var fromRow = function fromRow() {
      return totalRows.value === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1;
    };
    var toRow = function toRow() {
      return Math.min(currentPage.value * perPage.value, totalRows.value);
    };
    var buildQueryData = function buildQueryData() {
      var queryData = {
        gh_id: activeTab.value,
        page: currentPage.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
      };
      if (daterange.value) {
        queryData.start_date = formatDate(daterange.value[0]);
        queryData.end_date = formatDate(daterange.value[1]);
      }
      if (selectedNode.value) {
        queryData.node_id = selectedNode.value;
      }
      if (Object.keys(columnFilters.value).length > 0) {
        queryData.column_filters = columnFilters.value;
      }
      return queryData;
    };
    var buildCacheKey = function buildCacheKey(queryData) {
      return JSON.stringify(queryData);
    };
    var applyTablePayload = function applyTablePayload(payload) {
      rowData.value = payload.data || [];
      totalRows.value = payload.total || 0;
      lastPage.value = payload.last_page || 1;
    };
    var getCachedPayload = function getCachedPayload(cacheKey) {
      var cached = responseCache.get(cacheKey);
      if (!cached) return null;
      if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
        responseCache["delete"](cacheKey);
        return null;
      }
      return cached.payload;
    };
    var setCachedPayload = function setCachedPayload(cacheKey, payload) {
      if (responseCache.size >= CACHE_LIMIT) {
        var oldestKey = responseCache.keys().next().value;
        responseCache["delete"](oldestKey);
      }
      responseCache.set(cacheKey, {
        timestamp: Date.now(),
        payload: payload
      });
    };
    var fetchData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _ref3,
          _ref3$force,
          force,
          requestId,
          queryData,
          cacheKey,
          cachedPayload,
          url,
          response,
          jsonData,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _ref3 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref3$force = _ref3.force, force = _ref3$force === void 0 ? false : _ref3$force;
              requestId = ++latestRequestId;
              if (activeAbortController) {
                activeAbortController.abort();
                activeAbortController = null;
              }
              queryData = buildQueryData();
              cacheKey = buildCacheKey(queryData);
              if (force) {
                _context.n = 1;
                break;
              }
              cachedPayload = getCachedPayload(cacheKey);
              if (!cachedPayload) {
                _context.n = 1;
                break;
              }
              applyTablePayload(cachedPayload);
              isLoading.value = false;
              return _context.a(2);
            case 1:
              activeAbortController = new AbortController();
              _context.p = 2;
              isLoading.value = true;
              url = "/api/table-per-gh?dict=".concat(encodeURIComponent(JSON.stringify(queryData)));
              _context.n = 3;
              return fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
                signal: activeAbortController.signal
              });
            case 3:
              response = _context.v;
              if (response.ok) {
                _context.n = 4;
                break;
              }
              throw new Error("Request failed with status ".concat(response.status));
            case 4:
              _context.n = 5;
              return response.json();
            case 5:
              jsonData = _context.v;
              if (!(requestId !== latestRequestId)) {
                _context.n = 6;
                break;
              }
              return _context.a(2);
            case 6:
              if (!(jsonData.success && Array.isArray(jsonData.data))) {
                _context.n = 7;
                break;
              }
              setCachedPayload(cacheKey, jsonData);
              applyTablePayload(jsonData);
              return _context.a(2);
            case 7:
              toast.error(t("table.failed_load_data"));
              console.error("Data format error:", jsonData);
              _context.n = 10;
              break;
            case 8:
              _context.p = 8;
              _t = _context.v;
              if (!((_t === null || _t === void 0 ? void 0 : _t.name) === "AbortError")) {
                _context.n = 9;
                break;
              }
              return _context.a(2);
            case 9:
              toast.error(t("table.failed_load_data"));
              console.error("Fetch error:", _t);
            case 10:
              _context.p = 10;
              if (requestId === latestRequestId) {
                isLoading.value = false;
              }
              return _context.f(10);
            case 11:
              return _context.a(2);
          }
        }, _callee, null, [[2, 8, 10, 11]]);
      }));
      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();

    // Debounced fetch for filter changes
    var debouncedFetchData = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)(function () {
      currentPage.value = 1; // Reset to page 1 on filter change
      fetchData();
    }, 300);
    var debouncedColumnFilterFetch = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)(function () {
      fetchData({
        force: true
      });
    }, 250);

    // Pagination controls
    var goToFirst = function goToFirst() {
      currentPage.value = 1;
      fetchData();
    };
    var goToPrev = function goToPrev() {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchData();
      }
    };
    var goToNext = function goToNext() {
      if (currentPage.value < lastPage.value) {
        currentPage.value++;
        fetchData();
      }
    };
    var goToLast = function goToLast() {
      currentPage.value = lastPage.value;
      fetchData();
    };
    var onPerPageChange = function onPerPageChange() {
      currentPage.value = 1;
      fetchData();
    };
    var onSortChanged = function onSortChanged(params) {
      var sortedColumn = params.api.getColumnState().find(function (column) {
        return Boolean(column.sort);
      });
      if (!sortedColumn) {
        sortField.value = "recorded_at";
        sortDirection.value = "desc";
      } else {
        var nextSortField = sortedColumn.colId || "recorded_at";
        sortField.value = nextSortField;
        sortDirection.value = sortedColumn.sort || "desc";
      }
      currentPage.value = 1;
      fetchData({
        force: true
      });
    };
    var onGridReady = function onGridReady(params) {
      gridApi.value = params.api;
    };
    var onFilterChanged = function onFilterChanged(params) {
      columnFilters.value = params.api.getFilterModel() || {};
      currentPage.value = 1;
      debouncedColumnFilterFetch();
    };

    // On tab switch, reset everything and fetch
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(activeTab, function () {
      currentPage.value = 1;
      columnFilters.value = {};
      if (gridApi.value) {
        gridApi.value.setFilterModel(null);
      }
      debouncedFetchData();
    });

    // On filter change, reset page and fetch
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)([daterange, selectedNode], function () {
      debouncedFetchData();
    });

    // Initial fetch
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      fetchData();
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(function () {
      debouncedFetchData.cancel();
      debouncedColumnFilterFetch.cancel();
      if (activeAbortController) {
        activeAbortController.abort();
      }
    });
    var formatDate = function formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    };
    var exportData = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var payload, response, blob, url, a, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              isExporting.value = true;
              if (daterange.value) {
                _context2.n = 1;
                break;
              }
              toast.warning(t("table.date_range_required"));
              isExporting.value = false;
              return _context2.a(2);
            case 1:
              payload = {
                gh_id: activeTab.value,
                start_date: formatDate(daterange.value[0]),
                end_date: formatDate(daterange.value[1])
              };
              if (selectedNode.value) {
                payload.node_id = selectedNode.value;
              }
              _context2.p = 2;
              _context2.n = 3;
              return axios.post("/api/export-sensor", payload, {
                responseType: "blob"
              });
            case 3:
              response = _context2.v;
              blob = new Blob([response.data], {
                type: response.headers["content-type"]
              });
              url = window.URL.createObjectURL(blob);
              a = document.createElement("a");
              a.href = url;
              a.download = "sensor_".concat(formatDate(daterange.value[0]), "_to_").concat(formatDate(daterange.value[1]), ".xlsx");
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              toast.success(t("table.excel_downloaded"));
              isExporting.value = false;
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              toast.error(t("table.failed_download"));
              console.error(_t2);
              isExporting.value = false;
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[2, 4]]);
      }));
      return function exportData() {
        return _ref4.apply(this, arguments);
      };
    }();
    var __returned__ = {
      toast: toast,
      t: t,
      greenhouses: greenhouses,
      activeTab: activeTab,
      daterange: daterange,
      selectedNode: selectedNode,
      isExporting: isExporting,
      isLoading: isLoading,
      rowData: rowData,
      currentPage: currentPage,
      perPage: perPage,
      totalRows: totalRows,
      lastPage: lastPage,
      sortField: sortField,
      sortDirection: sortDirection,
      columnFilters: columnFilters,
      responseCache: responseCache,
      CACHE_TTL_MS: CACHE_TTL_MS,
      CACHE_LIMIT: CACHE_LIMIT,
      gridApi: gridApi,
      get activeAbortController() {
        return activeAbortController;
      },
      set activeAbortController(v) {
        activeAbortController = v;
      },
      get latestRequestId() {
        return latestRequestId;
      },
      set latestRequestId(v) {
        latestRequestId = v;
      },
      columnDefs: columnDefs,
      defaultColDef: defaultColDef,
      fromRow: fromRow,
      toRow: toRow,
      buildQueryData: buildQueryData,
      buildCacheKey: buildCacheKey,
      applyTablePayload: applyTablePayload,
      getCachedPayload: getCachedPayload,
      setCachedPayload: setCachedPayload,
      fetchData: fetchData,
      debouncedFetchData: debouncedFetchData,
      debouncedColumnFilterFetch: debouncedColumnFilterFetch,
      goToFirst: goToFirst,
      goToPrev: goToPrev,
      goToNext: goToNext,
      goToLast: goToLast,
      onPerPageChange: onPerPageChange,
      onSortChanged: onSortChanged,
      onGridReady: onGridReady,
      onFilterChanged: onFilterChanged,
      formatDate: formatDate,
      exportData: exportData,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onBeforeUnmount: vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      get debounce() {
        return lodash__WEBPACK_IMPORTED_MODULE_1__.debounce;
      },
      BreezeAuthenticatedLayout: _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      get Head() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_3__.Head;
      },
      get usePage() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_3__.usePage;
      },
      Tabs: _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
      get AgGridVue() {
        return ag_grid_vue3__WEBPACK_IMPORTED_MODULE_5__.AgGridVue;
      },
      get AllCommunityModule() {
        return ag_grid_community__WEBPACK_IMPORTED_MODULE_6__.AllCommunityModule;
      },
      get ModuleRegistry() {
        return ag_grid_community__WEBPACK_IMPORTED_MODULE_6__.ModuleRegistry;
      },
      get themeAlpine() {
        return ag_grid_community__WEBPACK_IMPORTED_MODULE_6__.themeAlpine;
      },
      get VueDatePicker() {
        return _vuepic_vue_datepicker__WEBPACK_IMPORTED_MODULE_7__["default"];
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
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.classes)
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e"
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "bg-gray-200 p-2 flex items-center rounded-full shadow-md w-full md:w-max mx-auto"
};
var _hoisted_2 = {
  "class": "relative flex w-full"
};
var _hoisted_3 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.greenhouses, function (greenhouse) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: greenhouse.id,
      onClick: function onClick($event) {
        return _ctx.$emit('update:modelValue', greenhouse.id);
      },
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["relative z-10 flex-1 px-6 py-3 text-center text-sm md:text-lg font-medium cursor-pointer transition-all duration-300", [$props.modelValue == greenhouse.id ? 'text-white' : 'text-gray-700 hover:text-green-600']])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getGreenhouseLabel(greenhouse)), 11 /* TEXT, CLASS, PROPS */, _hoisted_3);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Animated Background (Fixed Translate) "), $setup.greenhouseCount > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": "absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300 shadow-md",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: "".concat(100 / $setup.greenhouseCount, "%"),
      transform: "translateX(".concat($setup.safeActiveIndex * 100, "%)")
    })
  }, null, 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
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
  "class": "flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg"
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
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fixed inset-y-0 left-0 z-[2000] w-72 max-w-[88vw] transform transition-transform duration-200 ease-in-out', $setup.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Link"], {
    href: _ctx.route('monitoring'),
    "class": "inline-flex items-center gap-3"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md"
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Table.vue?vue&type=template&id=201db616"
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Table.vue?vue&type=template&id=201db616 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "py-2"
};
var _hoisted_3 = {
  "class": "max-w-7xl mx-auto sm:px-2 lg:px-2"
};
var _hoisted_4 = {
  "class": "rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
};
var _hoisted_5 = {
  "class": "mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
};
var _hoisted_6 = {
  "class": "self-center text-2xl font-semibold text-gray-800 md:self-auto"
};
var _hoisted_7 = {
  "class": "flex flex-wrap items-center justify-end gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2"
};
var _hoisted_8 = {
  "class": "flex items-center gap-2"
};
var _hoisted_9 = {
  "class": "text-xs font-bold uppercase tracking-wider text-gray-500"
};
var _hoisted_10 = {
  "class": "flex items-center gap-2"
};
var _hoisted_11 = {
  "class": "text-xs font-bold uppercase tracking-wider text-gray-500"
};
var _hoisted_12 = {
  value: ""
};
var _hoisted_13 = ["value"];
var _hoisted_14 = ["disabled", "title"];
var _hoisted_15 = {
  "class": "text-sm font-semibold"
};
var _hoisted_16 = {
  "class": "relative"
};
var _hoisted_17 = {
  key: 0,
  "class": "absolute inset-0 bg-white/80 z-10 flex items-center justify-center"
};
var _hoisted_18 = {
  "class": "flex flex-col items-center gap-3"
};
var _hoisted_19 = {
  "class": "text-gray-600 font-medium"
};
var _hoisted_20 = {
  "class": "flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 text-sm"
};
var _hoisted_21 = {
  "class": "flex items-center gap-2"
};
var _hoisted_22 = {
  "class": "flex items-center gap-2"
};
var _hoisted_23 = ["disabled"];
var _hoisted_24 = ["disabled"];
var _hoisted_25 = {
  "class": "text-gray-600 mx-2"
};
var _hoisted_26 = ["disabled"];
var _hoisted_27 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Head"], {
    title: $setup.t('title.table')
  }, null, 8 /* PROPS */, ["title"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeAuthenticatedLayout"], {
    titlePage: 'Table'
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("title.table")), 1 /* TEXT */)];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tabs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Tabs"], {
        greenhouses: $setup.greenhouses,
        modelValue: $setup.activeTab,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $setup.activeTab = $event;
        }),
        "class": "mb-4"
      }, null, 8 /* PROPS */, ["greenhouses", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.monitoring_data")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Filter Controls "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Date Filter "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.date")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["VueDatePicker"], {
        modelValue: $setup.daterange,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $setup.daterange = $event;
        }),
        range: "",
        "position:right": "",
        placeholder: $setup.t('table.filter_by_date'),
        "class": "w-52 shadow-sm"
      }, null, 8 /* PROPS */, ["modelValue", "placeholder"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Node Filter & Export Action "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.node")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
          return $setup.selectedNode = $event;
        }),
        "class": "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm h-[38px] w-40 text-sm"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.all_nodes")), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(5, function (n) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
          key: n,
          value: $setup.activeTab == 1 ? n : n + 5
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.node")) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.activeTab == 1 ? n : n + 5), 9 /* TEXT, PROPS */, _hoisted_13);
      }), 64 /* STABLE_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.selectedNode]]), _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "mx-1 h-8 w-[1px] bg-gray-300"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        disabled: $setup.isExporting,
        onClick: $setup.exportData,
        "class": "bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded shadow-md h-[38px] flex items-center gap-2 transition-all transform active:scale-95",
        title: $setup.t('table.export_current_view')
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.isExporting ? 'fas fa-spinner fa-spin' : 'fas fa-file-excel'])
      }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.export")), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_14)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AG Grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading Overlay "), $setup.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("table.loading_data")), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["AgGridVue"], {
        rowData: $setup.rowData,
        columnDefs: $setup.columnDefs,
        defaultColDef: $setup.defaultColDef,
        domLayout: 'autoHeight',
        theme: $setup.themeAlpine,
        suppressMenuHide: true,
        suppressPaginationPanel: true,
        onSortChanged: $setup.onSortChanged,
        onFilterChanged: $setup.onFilterChanged
      }, null, 8 /* PROPS */, ["rowData", "columnDefs", "defaultColDef", "theme"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Custom Pagination "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Page Size Selector "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return $setup.perPage = $event;
        }),
        onChange: $setup.onPerPageChange,
        "class": "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm h-[34px] text-sm"
      }, _toConsumableArray(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: 10
      }, "10", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: 20
      }, "20", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: 50
      }, "50", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: 100
      }, "100", -1 /* CACHED */)])), 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.perPage]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Page Info & Navigation "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: $setup.goToFirst,
        disabled: $setup.currentPage <= 1,
        "class": "px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      }, _toConsumableArray(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-angle-double-left"
      }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: $setup.goToPrev,
        disabled: $setup.currentPage <= 1,
        "class": "px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      }, _toConsumableArray(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-angle-left"
      }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.fromRow()) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("common.to")) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.toRow()) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("common.of")) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.totalRows.toLocaleString()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: $setup.goToNext,
        disabled: $setup.currentPage >= $setup.lastPage,
        "class": "px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      }, _toConsumableArray(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-angle-right"
      }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_26), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: $setup.goToLast,
        disabled: $setup.currentPage >= $setup.lastPage,
        "class": "px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      }, _toConsumableArray(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-angle-double-right"
      }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_27)])])])])])];
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
    "monitoring.online": "ONLINE",
    "monitoring.offline": "OFFLINE",
    "monitoring.average": "Rata-rata",
    "monitoring.per_node": "Per Node",
    "monitoring.range_custom": "Kustom",
    "monitoring.range_today": "Hari Ini",
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
    "monitoring.online": "ONLINE",
    "monitoring.offline": "OFFLINE",
    "monitoring.average": "Average",
    "monitoring.per_node": "Per Node",
    "monitoring.range_custom": "Custom",
    "monitoring.range_today": "Today",
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

/***/ "./resources/js/Components/Tabs.vue"
/*!******************************************!*\
  !*** ./resources/js/Components/Tabs.vue ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tabs_vue_vue_type_template_id_8d60f96e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tabs.vue?vue&type=template&id=8d60f96e */ "./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e");
/* harmony import */ var _Tabs_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tabs.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tabs_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Tabs_vue_vue_type_template_id_8d60f96e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/Tabs.vue"]])
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

/***/ "./resources/js/Pages/Table.vue"
/*!**************************************!*\
  !*** ./resources/js/Pages/Table.vue ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Table_vue_vue_type_template_id_201db616__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Table.vue?vue&type=template&id=201db616 */ "./resources/js/Pages/Table.vue?vue&type=template&id=201db616");
/* harmony import */ var _Table_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Table.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Pages/Table.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Table_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Table_vue_vue_type_template_id_201db616__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Table.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

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

/***/ "./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js"
/*!*****************************************************************************!*\
  !*** ./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tabs.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js");
 

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

/***/ "./resources/js/Pages/Table.vue?vue&type=script&setup=true&lang=js"
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/Table.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Table_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Table_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Table.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Table.vue?vue&type=script&setup=true&lang=js");
 

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

/***/ "./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e"
/*!************************************************************************!*\
  !*** ./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_template_id_8d60f96e__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_template_id_8d60f96e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tabs.vue?vue&type=template&id=8d60f96e */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e");


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

/***/ "./resources/js/Pages/Table.vue?vue&type=template&id=201db616"
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Table.vue?vue&type=template&id=201db616 ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Table_vue_vue_type_template_id_201db616__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Table_vue_vue_type_template_id_201db616__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Table.vue?vue&type=template&id=201db616 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Table.vue?vue&type=template&id=201db616");


/***/ }

}]);