"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-Heatmap-vue"],{

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js"
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");
/* harmony import */ var _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Layouts/Authenticated.vue */ "./resources/js/Layouts/Authenticated.vue");
/* harmony import */ var _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Tabs.vue */ "./resources/js/Components/Tabs.vue");
/* harmony import */ var _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/DigitalClock.vue */ "./resources/js/Components/DigitalClock.vue");
/* harmony import */ var _composables_useLocale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/composables/useLocale */ "./resources/js/composables/useLocale.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }








var AUTO_REFRESH_SECONDS = 300;

// Computed: Latest data time untuk greenhouse aktif
var HEATMAP_RADIUS = 300;

// ===============================
// GRADIENT COLORS UNTUK HEATMAP
// ===============================
/**
 * Definisi warna gradient berdasarkan nilai normalized (0-1.5)
 * Format: { stop, r, g, b }
 * - stop: posisi di gradient (0 = nilai min, 1 = nilai max)
 * - r, g, b: komponen warna RGB
 */
// HARUS SAMA dengan legend gradient untuk konsistensi warna!

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Heatmap',
  props: {
    // Data sensor per greenhouse: { gh_id: { temperature, humidity, lux } }
    sensorDataByGh: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    // Thresholds per greenhouse: { gh_id: { temperature, humidity, lux } }
    thresholdsByGh: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    // Daftar greenhouse untuk switch tab
    greenhouses: Array,
    // ID greenhouse yang sedang aktif (initial value dari URL)
    activeGhId: Number,
    // Latest data timestamp per greenhouse
    latestData: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();

    /**
     * ========================================
     * HEATMAP.VUE - HALAMAN VISUALISASI HEATMAP GREENHOUSE
     * ========================================
     * 
     * FLOW UTAMA:
     * 1. Controller mengirim data sensor (temperature, humidity, lux) + thresholds
     * 2. User bisa switch parameter via tombol Temperature/Humidity/Light Intensity
     * 3. Computed properties secara reaktif mengambil data sesuai parameter aktif
     * 4. Leaflet.js menampilkan peta dengan overlay gambar greenhouse
     * 5. Heatmap di-render menggunakan Canvas dengan algoritma IDW (Inverse Distance Weighting)
     * 6. Legend menampilkan skala warna dan threshold yang dinamis
     * 
     * STRUKTUR KODE:
     * - PROPS: Data dari controller (sensor data, thresholds, greenhouses)
     * - STATE: activeParameter, activeGH (greenhouse aktif)
     * - COMPUTED: currentConfig, currentThresholds, currentSensorData (reaktif berdasarkan parameter)
     * - FUNCTIONS: normalizeValue, getStatus, interpolateColor (kalkulasi warna)
     * - LEAFLET: initMap, drawMarkers, drawCustomHeatmap (rendering peta)
     * - WATCHERS: Memantau perubahan parameter/data untuk update heatmap
     */

    var _useLocale = (0,_composables_useLocale__WEBPACK_IMPORTED_MODULE_5__.useLocale)(),
      t = _useLocale.t;

    // ===============================
    // PROPS DARI CONTROLLER
    // Data yang dikirim dari PageController@heatmap
    // OPTIMIZED: Semua data greenhouse di-preload sekaligus
    // ===============================
    var props = __props;

    // ===============================
    // REACTIVE STATE
    // ===============================
    var activeGH = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.activeGhId); // Greenhouse yang dipilih
    var activeParameter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("temperature"); // Parameter aktif (temperature/humidity/lux)
    var mapHeight = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('280px'); // Dynamic map height based on aspect ratio
    var mapContainer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null); // Reference ke container div untuk Leaflet
    var mapOpacity = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1); // Opacity untuk fade transition saat switch GH
    var resizeDebounceTimer = null; // Debounce timer untuk ResizeObserver
    var isTransitioning = false; // Flag: sedang transisi switch GH
    var autoRefreshInterval = null; // Interval untuk auto-refresh
    var resizeObserver = null; // Resize observer cleanup ref
    var pendingClipFrame = null; // RAF id untuk clip heatmap
    var pendingHeatmapFrame = null; // RAF id untuk update heatmap

    // ===============================
    // AUTO-REFRESH INTERVAL 
    // ===============================
    var currentLatestTime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var latestItem = props.latestData.find(function (item) {
        return item.gh_id === activeGH.value;
      });
      return (latestItem === null || latestItem === void 0 ? void 0 : latestItem.latest_time) || '-';
    });

    // ===============================
    // KONFIGURASI GREENHOUSE
    // Setiap greenhouse punya dimensi gambar dan posisi node yang berbeda
    // ===============================
    var greenhouseConfig = {
      // GH 1 - Landscape layout
      1: {
        width: 1024,
        height: 450,
        image: '/images/greenhouse_plan.webp',
        // Node positions: { node_id: [y, x] }
        nodeLocations: {
          1: [420, 150],
          // Bawah kiri
          2: [35, 310],
          // Atas kiri-tengah
          3: [420, 585],
          // Bawah tengah
          4: [35, 785],
          // Atas kanan-tengah
          5: [420, 950] // Bawah kanan
        }
      },
      // GH 2 - Landscape layout (640x500 based on actual image dimensions)
      2: {
        width: 640,
        height: 500,
        image: '/images/greenhouse_plan2.webp',
        // Node positions: { node_id: [y, x] } - disesuaikan dengan lokasi sensor di gambar
        // y dari atas ke bawah (0 = atas, 500 = bawah)
        // x dari kiri ke kanan (0 = kiri, 640 = kanan)
        nodeLocations: {
          6: [175, 561],
          // Atas kiri (area pertama)
          7: [175, 159],
          // Atas kanan (area kedua)
          8: [325, 65],
          // Tengah kiri
          9: [325, 438],
          // Tengah kanan
          10: [405, 278] // Bawah tengah (dekat Gateway)
        }
      }
    };

    // Computed: config greenhouse aktif
    var currentGHConfig = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return greenhouseConfig[activeGH.value] || greenhouseConfig[1];
    });

    // Computed: nilai-nilai yang sering dipakai
    var IMAGE_WIDTH = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return currentGHConfig.value.width;
    });
    var IMAGE_HEIGHT = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return currentGHConfig.value.height;
    });
    var nodeLocations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return currentGHConfig.value.nodeLocations;
    });
    var currentGreenhouseImage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return currentGHConfig.value.image;
    });

    // ===============================
    // KONFIGURASI PARAMETER
    // Setiap parameter punya setting berbeda untuk:
    // - min/max: rentang nilai untuk skala legend
    // - unit: satuan yang ditampilkan
    // - label: nama yang ditampilkan di UI
    // ===============================
    var parameterConfig = {
      temperature: {
        min: 0,
        max: 40,
        unit: '°C',
        labelKey: 'sensor.temperature'
      },
      humidity: {
        min: 0,
        max: 100,
        unit: '%',
        labelKey: 'sensor.humidity'
      },
      lux: {
        min: 0,
        max: 65535,
        unit: 'lux',
        labelKey: 'sensor.light_intensity'
      }
    };

    // ===============================
    // COMPUTED PROPERTIES (REAKTIF)
    // Otomatis berubah saat activeParameter berubah
    // ===============================

    // Config untuk parameter yang sedang aktif - MENGGUNAKAN THRESHOLD sebagai min/max legend
    var currentConfig = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var baseConfig = parameterConfig[activeParameter.value];
      var thresholds = currentThresholds.value;
      return _objectSpread(_objectSpread({}, baseConfig), {}, {
        label: t(baseConfig.labelKey),
        min: thresholds.min,
        // Override dengan threshold min
        max: thresholds.max // Override dengan threshold max
      });
    });

    // Threshold (min/max) untuk parameter aktif - dari database
    // OPTIMIZED: Mengambil dari thresholdsByGh berdasarkan activeGH
    var currentThresholds = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var ghThresholds = props.thresholdsByGh[activeGH.value];
      if (!ghThresholds) return {
        min: 25,
        max: 35
      }; // fallback

      if (activeParameter.value === 'temperature') return ghThresholds.temperature || {
        min: 25,
        max: 35
      };
      if (activeParameter.value === 'humidity') return ghThresholds.humidity || {
        min: 50,
        max: 80
      };
      return ghThresholds.lux || {
        min: 20000,
        max: 50000
      };
    });

    // Data sensor untuk parameter aktif
    // OPTIMIZED: Mengambil dari sensorDataByGh berdasarkan activeGH
    var currentSensorData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var ghData = props.sensorDataByGh[activeGH.value];
      if (!ghData) return [];
      if (activeParameter.value === 'temperature') return ghData.temperature || [];
      if (activeParameter.value === 'humidity') return ghData.humidity || [];
      return ghData.lux || [];
    });
    var currentSensorDataSignature = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return (currentSensorData.value || []).map(function (sensor) {
        return "".concat(sensor.node_id, ":").concat(sensor.value, ":").concat(sensor.recorded_at || "");
      }).join("|");
    });

    // ===============================
    // COMPUTED: LEGEND GRADIENT STYLE
    // Gradient langsung dari threshold min ke max (skala sudah = threshold)
    // ===============================
    var legendGradientStyle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      // Gradient colors - langsung dari 0% ke 100% karena skala = threshold
      var gradientColors = [{
        pos: 0,
        color: "#2563eb"
      },
      // Biru (Aman)
      {
        pos: 0.15,
        color: "#3b82f6"
      },
      // Biru terang
      {
        pos: 0.3,
        color: "#06b6d4"
      },
      // Cyan (Normal)
      {
        pos: 0.45,
        color: "#facc15"
      },
      // Kuning (Waspada)
      {
        pos: 0.6,
        color: "#fb923c"
      },
      // Orange
      {
        pos: 0.8,
        color: "#ef4444"
      },
      // Merah
      {
        pos: 1,
        color: "#dc2626"
      } // Merah gelap (Kritis)
      ];
      var stops = gradientColors.map(function (_ref2) {
        var pos = _ref2.pos,
          color = _ref2.color;
        return "".concat(color, " ").concat(pos * 100, "%");
      });
      return {
        background: "linear-gradient(to top, ".concat(stops.join(", "), ")")
      };
    });

    // Horizontal gradient untuk mobile legend
    var legendGradientStyleHorizontal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var gradientColors = [{
        pos: 0,
        color: "#2563eb"
      }, {
        pos: 0.15,
        color: "#3b82f6"
      }, {
        pos: 0.3,
        color: "#06b6d4"
      }, {
        pos: 0.45,
        color: "#facc15"
      }, {
        pos: 0.6,
        color: "#fb923c"
      }, {
        pos: 0.8,
        color: "#ef4444"
      }, {
        pos: 1,
        color: "#dc2626"
      }];
      var stops = gradientColors.map(function (_ref3) {
        var pos = _ref3.pos,
          color = _ref3.color;
        return "".concat(color, " ").concat(pos * 100, "%");
      });
      return {
        background: "linear-gradient(to right, ".concat(stops.join(", "), ")")
      };
    });

    // ===============================
    // FUNGSI NORMALISASI NILAI SENSOR
    // ===============================
    /**
     * Mengkonversi nilai sensor mentah menjadi nilai 0-1.5 untuk warna heatmap
     * - 0 = di batas minimum threshold (biru/aman)
     * - 1 = di batas maximum threshold (orange/waspada)
     * - 1.5 = jauh di atas maximum (merah/kritis)
     * 
     * Contoh: threshold min=25, max=35
     * - nilai 25 → normalized = 0 (biru)
     * - nilai 30 → normalized = 0.5 (kuning)
     * - nilai 35 → normalized = 1 (orange)
     * - nilai 40 → normalized = 1.5 (merah kritis)
     */
    function normalizeValue(value) {
      var val = parseFloat(value);
      if (isNaN(val)) return 0;
      var thresholds = currentThresholds.value;

      // Rumus normalisasi: (nilai - min) / (max - min)
      var normalized = (val - thresholds.min) / (thresholds.max - thresholds.min);

      // Clamp: minimal 0, maksimal 1.5
      return Math.min(Math.max(normalized, 0), 1.5);
    }

    // ===============================
    // FUNGSI PENENTUAN STATUS
    // ===============================
    /**
     * Menentukan status dan warna marker berdasarkan nilai sensor
     * Menggunakan gradient yang SAMA dengan heatmap dan legend untuk konsistensi
     * Warna dihitung berdasarkan posisi normalized value di gradient
     */
    function getStatus(value) {
      var val = parseFloat(value);
      var thresholds = currentThresholds.value;
      var range = thresholds.max - thresholds.min;

      // Normalisasi nilai: 0 = min, 1 = max
      var normalized = (val - thresholds.min) / range;
      normalized = Math.max(0, Math.min(1, normalized)); // Clamp 0-1

      // Gradient colors SAMA dengan heatmap dan legend
      var gradientColors = [{
        stop: 0.0,
        r: 37,
        g: 99,
        b: 235
      },
      // #2563eb - Biru (Aman)
      {
        stop: 0.15,
        r: 59,
        g: 130,
        b: 246
      },
      // #3b82f6 - Biru terang
      {
        stop: 0.3,
        r: 6,
        g: 182,
        b: 212
      },
      // #06b6d4 - Cyan (Normal)
      {
        stop: 0.45,
        r: 250,
        g: 204,
        b: 21
      },
      // #facc15 - Kuning (Waspada)
      {
        stop: 0.6,
        r: 251,
        g: 146,
        b: 60
      },
      // #fb923c - Orange
      {
        stop: 0.8,
        r: 239,
        g: 68,
        b: 68
      },
      // #ef4444 - Merah
      {
        stop: 1.0,
        r: 220,
        g: 38,
        b: 38
      } // #dc2626 - Merah gelap (Kritis)
      ];

      // Interpolasi warna berdasarkan normalized value
      var lower = gradientColors[0];
      var upper = gradientColors[gradientColors.length - 1];
      for (var i = 0; i < gradientColors.length - 1; i++) {
        if (normalized >= gradientColors[i].stop && normalized <= gradientColors[i + 1].stop) {
          lower = gradientColors[i];
          upper = gradientColors[i + 1];
          break;
        }
      }
      var rangeStop = upper.stop - lower.stop;
      var ratio = rangeStop === 0 ? 0 : (normalized - lower.stop) / rangeStop;
      var r = Math.round(lower.r + (upper.r - lower.r) * ratio);
      var g = Math.round(lower.g + (upper.g - lower.g) * ratio);
      var b = Math.round(lower.b + (upper.b - lower.b) * ratio);
      var color = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");

      // Tentukan text status berdasarkan zona
      var text;
      if (normalized <= 0.3) text = t("heatmap.safe");else if (normalized <= 0.5) text = t("heatmap.normal");else if (normalized <= 1) text = t("heatmap.warning");else text = t("heatmap.critical");
      return {
        text: text,
        color: color
      };
    }

    // ===============================
    // LEAFLET MAP VARIABLES
    // ===============================
    var map = null; // Instance Leaflet map
    var markersLayer = null; // Layer group untuk marker nodes

    function createCustomIcon(nodeId, value) {
      var status = getStatus(value);
      return leaflet__WEBPACK_IMPORTED_MODULE_6___default().divIcon({
        className: "custom-marker",
        html: "\n      <div class=\"marker-pin\" style=\"background-color: ".concat(status.color, ";\">\n        <span class=\"marker-number\">").concat(nodeId, "</span>\n      </div>\n    "),
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
    }
    function drawMarkers() {
      if (markersLayer) {
        map.removeLayer(markersLayer);
      }
      markersLayer = leaflet__WEBPACK_IMPORTED_MODULE_6___default().layerGroup().addTo(map);
      var sensorData = currentSensorData.value || [];
      var unit = currentConfig.value.unit;
      sensorData.forEach(function (sensor) {
        var loc = nodeLocations.value[sensor.node_id];
        if (!loc) return;
        var _loc = _slicedToArray(loc, 2),
          y = _loc[0],
          x = _loc[1];
        var status = getStatus(sensor.value);
        var marker = leaflet__WEBPACK_IMPORTED_MODULE_6___default().marker([y, x], {
          icon: createCustomIcon(sensor.node_id, sensor.value)
        });

        // Cek apakah node di bagian atas gambar
        // Dalam Simple CRS: y besar = atas, y kecil = bawah
        // Node 1, 3, 5 (y=420) di atas → popup di bawah marker
        // Node 2, 4 (y=35) di bawah → popup di atas marker (default)
        var isTopNode = y > 200;

        // Popup dengan informasi node
        marker.bindPopup("\n      <div style=\"text-align: center; min-width: 120px;\">\n        <strong style=\"font-size: 14px;\">Node ".concat(sensor.node_id, "</strong>\n        <hr style=\"margin: 8px 0;\">\n        <div style=\"font-size: 24px; font-weight: bold; color: ").concat(status.color, ";\">\n          ").concat(sensor.value).concat(unit, "\n        </div>\n        <div style=\"margin-top: 4px; padding: 4px 8px; border-radius: 4px; \n                    background-color: ").concat(status.color, "; color: white; font-weight: 500;\">\n          ").concat(status.text, "\n        </div>\n      </div>\n    "), {
          closeButton: false,
          className: isTopNode ? "node-popup popup-bottom" : "node-popup",
          // Offset: [x, y] - y positif = popup ke bawah
          offset: isTopNode ? [0, 140] : [0, 0]
        });

        // UX: tampilkan informasi node saat hover, tanpa harus klik marker.
        var popupCloseTimer = null;
        var popupElement = null;
        var cancelPopupClose = function cancelPopupClose() {
          if (popupCloseTimer !== null) {
            clearTimeout(popupCloseTimer);
            popupCloseTimer = null;
          }
        };
        var schedulePopupClose = function schedulePopupClose() {
          cancelPopupClose();
          popupCloseTimer = setTimeout(function () {
            marker.closePopup();
          }, 140);
        };
        var onPopupMouseEnter = function onPopupMouseEnter() {
          cancelPopupClose();
        };
        var onPopupMouseLeave = function onPopupMouseLeave() {
          schedulePopupClose();
        };
        marker.on("mouseover", function () {
          cancelPopupClose();
          marker.openPopup();
        });
        marker.on("mouseout", function () {
          schedulePopupClose();
        });
        marker.on("popupopen", function () {
          var _marker$getPopup;
          popupElement = ((_marker$getPopup = marker.getPopup()) === null || _marker$getPopup === void 0 ? void 0 : _marker$getPopup.getElement()) || null;
          if (popupElement) {
            popupElement.addEventListener("mouseenter", onPopupMouseEnter);
            popupElement.addEventListener("mouseleave", onPopupMouseLeave);
          }
        });
        marker.on("popupclose", function () {
          if (popupElement) {
            popupElement.removeEventListener("mouseenter", onPopupMouseEnter);
            popupElement.removeEventListener("mouseleave", onPopupMouseLeave);
            popupElement = null;
          }
          cancelPopupClose();
        });
        marker.addTo(markersLayer);
      });
    }

    // ===============================
    // CUSTOM CANVAS HEATMAP LAYER
    // ===============================
    /**
     * Heatmap di-render menggunakan HTML Canvas dengan algoritma IDW
     * (Inverse Distance Weighting)
     * 
     * CARA KERJA IDW:
     * 1. Untuk setiap pixel di canvas, hitung jarak ke SEMUA sensor
     * 2. Sensor yang lebih dekat punya pengaruh lebih besar (weight = 1/distance²)
     * 3. Nilai akhir pixel = weighted average dari semua sensor
     * 4. Konversi nilai ke warna menggunakan gradient
     * 
     * KEUNTUNGAN IDW:
     * - Warna berblend smooth antar sensor
     * - Tidak ada batas tajam/kotak-kotak
     * - Representasi lebih realistis dari distribusi suhu/kelembapan
     */
    var customHeatLayer = null;

    // Radius pengaruh sensor dalam koordinat gambar (bukan pixel)
    // Semakin besar = area pengaruh sensor semakin luas
    var heatmapGradientColors = [{
      stop: 0.0,
      r: 37,
      g: 99,
      b: 235
    },
    // #2563eb - Biru (Aman)
    {
      stop: 0.15,
      r: 59,
      g: 130,
      b: 246
    },
    // #3b82f6 - Biru terang
    {
      stop: 0.3,
      r: 6,
      g: 182,
      b: 212
    },
    // #06b6d4 - Cyan (Normal)
    {
      stop: 0.45,
      r: 250,
      g: 204,
      b: 21
    },
    // #facc15 - Kuning (Waspada)
    {
      stop: 0.6,
      r: 251,
      g: 146,
      b: 60
    },
    // #fb923c - Orange
    {
      stop: 0.8,
      r: 239,
      g: 68,
      b: 68
    },
    // #ef4444 - Merah
    {
      stop: 1.0,
      r: 220,
      g: 38,
      b: 38
    } // #dc2626 - Merah gelap (Kritis)
    ];
    function interpolateColor(value) {
      // Clamp value 0-1.5 (1.5 for Kritis)
      var v = Math.max(0, Math.min(1.5, value));

      // Find gradient segment
      var lower = heatmapGradientColors[0];
      var upper = heatmapGradientColors[heatmapGradientColors.length - 1];
      for (var i = 0; i < heatmapGradientColors.length - 1; i++) {
        if (v >= heatmapGradientColors[i].stop && v <= heatmapGradientColors[i + 1].stop) {
          lower = heatmapGradientColors[i];
          upper = heatmapGradientColors[i + 1];
          break;
        }
      }

      // Interpolate between lower and upper
      var range = upper.stop - lower.stop;
      var ratio = range === 0 ? 0 : (v - lower.stop) / range;
      return {
        r: Math.round(lower.r + (upper.r - lower.r) * ratio),
        g: Math.round(lower.g + (upper.g - lower.g) * ratio),
        b: Math.round(lower.b + (upper.b - lower.b) * ratio)
      };
    }

    // Custom Leaflet Layer untuk Canvas Heatmap
    var CanvasHeatmapLayer = leaflet__WEBPACK_IMPORTED_MODULE_6___default().Layer.extend({
      options: {
        opacity: 0.6,
        radius: HEATMAP_RADIUS
      },
      initialize: function initialize(sensorData, options) {
        this._sensorData = sensorData || [];
        leaflet__WEBPACK_IMPORTED_MODULE_6___default().setOptions(this, options);
      },
      onAdd: function onAdd(map) {
        this._map = map;

        // Create canvas element
        this._canvas = leaflet__WEBPACK_IMPORTED_MODULE_6___default().DomUtil.create('canvas', 'leaflet-heatmap-canvas');
        this._canvas.style.position = 'absolute';
        this._canvas.style.pointerEvents = 'none';

        // Add to overlay pane
        var pane = this.getPane();
        pane.appendChild(this._canvas);

        // Bindmo events
        map.on('zoomend viewreset moveend resize', this._redraw, this);
        this._redraw();
      },
      onRemove: function onRemove(map) {
        leaflet__WEBPACK_IMPORTED_MODULE_6___default().DomUtil.remove(this._canvas);
        map.off('zoomend viewreset moveend resize', this._redraw, this);
      },
      setData: function setData(sensorData) {
        this._sensorData = sensorData || [];
        this._redraw();
      },
      _redraw: function _redraw() {
        if (!this._map) return;
        var mapSize = this._map.getSize();
        var canvas = this._canvas;

        // Set canvas size
        canvas.width = mapSize.x;
        canvas.height = mapSize.y;

        // Position canvas
        var topLeft = this._map.containerPointToLayerPoint([0, 0]);
        leaflet__WEBPACK_IMPORTED_MODULE_6___default().DomUtil.setPosition(canvas, topLeft);

        // Draw heatmap
        this._renderHeatmap();
      },
      _renderHeatmap: function _renderHeatmap() {
        var _this = this;
        var ctx = this._canvas.getContext('2d');
        var width = this._canvas.width;
        var height = this._canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        if (!this._sensorData || this._sensorData.length === 0) return;

        // Get image bounds in pixel coordinates
        var imgTopLeft = this._map.latLngToContainerPoint([IMAGE_HEIGHT.value, 0]);
        var imgBottomRight = this._map.latLngToContainerPoint([0, IMAGE_WIDTH.value]);
        var imgLeft = Math.max(0, imgTopLeft.x);
        var imgTop = Math.max(0, imgTopLeft.y);
        var imgRight = Math.min(width, imgBottomRight.x);
        var imgBottom = Math.min(height, imgBottomRight.y);

        // Skip if image not visible
        if (imgLeft >= imgRight || imgTop >= imgBottom) return;

        // Create imageData for pixel manipulation
        var imgWidth = Math.ceil(imgRight - imgLeft);
        var imgHeight = Math.ceil(imgBottom - imgTop);
        if (imgWidth <= 0 || imgHeight <= 0) return;
        var imageData = ctx.createImageData(imgWidth, imgHeight);
        var data = imageData.data;

        // Prepare sensor data with pixel positions
        var sensors = this._sensorData.map(function (sensor) {
          var loc = nodeLocations.value[sensor.node_id];
          if (!loc) return null;
          var _loc2 = _slicedToArray(loc, 2),
            y = _loc2[0],
            x = _loc2[1];
          var pixelPos = _this._map.latLngToContainerPoint([y, x]);
          return {
            px: pixelPos.x - imgLeft,
            py: pixelPos.y - imgTop,
            intensity: normalizeValue(sensor.value),
            value: parseFloat(sensor.value)
          };
        }).filter(function (s) {
          return s !== null;
        });
        if (sensors.length === 0) return;

        // Render each pixel using IDW (Inverse Distance Weighting)
        // SEMUA sensor mempengaruhi SEMUA pixel, dengan bobot berdasarkan jarak
        var RESOLUTION = 2; // Skip pixels for performance (1 = full, 2 = half, etc)
        var epsilon = 1;
        var radiusPx = Math.max(1, Math.abs(this._map.latLngToContainerPoint([0, this.options.radius]).x - this._map.latLngToContainerPoint([0, 0]).x));
        for (var py = 0; py < imgHeight; py += RESOLUTION) {
          for (var px = 0; px < imgWidth; px += RESOLUTION) {
            var weightSum = 0;
            var valueSum = 0;
            var minDist = Infinity;

            // Hitung pengaruh dari SEMUA sensor
            var _iterator = _createForOfIteratorHelper(sensors),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var sensor = _step.value;
                var dx = px - sensor.px;
                var dy = py - sensor.py;
                var dist = Math.sqrt(dx * dx + dy * dy);

                // Track jarak terdekat untuk alpha calculation
                if (dist < minDist) minDist = dist;

                // IDW: weight = 1 / distance²
                // Tambah epsilon untuk avoid division by zero saat tepat di sensor
                var denominator = (dist + epsilon) * (dist + epsilon);
                var weight = 1 / denominator;
                weightSum += weight;
                valueSum += weight * sensor.intensity;
              }

              // Calculate final intensity (weighted average)
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            var intensity = valueSum / weightSum;
            var color = interpolateColor(intensity);

            // Alpha: fade di edges berdasarkan jarak ke sensor terdekat
            // radiusPx berfungsi sebagai "max influence distance" untuk alpha
            // Alpha: 1.0 di dekat sensor, fade ke 0 di luar radius
            var alpha = void 0;
            if (minDist < radiusPx * 0.5) {
              // Fully opaque near sensors
              alpha = this.options.opacity;
            } else if (minDist < radiusPx) {
              // Gradient fade
              var fadeProgress = (minDist - radiusPx * 0.5) / (radiusPx * 0.5);
              alpha = this.options.opacity * (1 - fadeProgress * 0.5);
            } else {
              // Outside radius - partial fade but don't disappear
              var _fadeProgress = Math.min(1, (minDist - radiusPx) / radiusPx);
              alpha = this.options.opacity * (0.5 - _fadeProgress * 0.3);
            }

            // Minimum alpha to ensure some color everywhere
            alpha = Math.max(alpha, 0.15);

            // Fill pixels (with resolution)
            for (var ry = 0; ry < RESOLUTION && py + ry < imgHeight; ry++) {
              for (var rx = 0; rx < RESOLUTION && px + rx < imgWidth; rx++) {
                var idx = ((py + ry) * imgWidth + (px + rx)) * 4;
                data[idx] = color.r;
                data[idx + 1] = color.g;
                data[idx + 2] = color.b;
                data[idx + 3] = Math.round(alpha * 255);
              }
            }
          }
        }

        // Put image data onto canvas
        ctx.putImageData(imageData, imgLeft, imgTop);
      }
    });
    function drawCustomHeatmap(sensorData) {
      if (customHeatLayer) {
        customHeatLayer.setData(sensorData);
      } else {
        customHeatLayer = new CanvasHeatmapLayer(sensorData, {
          opacity: 0.65,
          radius: HEATMAP_RADIUS
        });
        customHeatLayer.addTo(map);
      }
    }

    // Variable untuk menyimpan image overlay agar bisa di-update
    var imageOverlay = null;

    // Helper function untuk mendapatkan zoom optimal berdasarkan greenhouse
    // ===============================
    // DYNAMIC MAP HEIGHT
    // Menghitung tinggi container map berdasarkan aspect ratio gambar greenhouse
    // agar denah fit sempurna tanpa whitespace di mobile
    // ===============================
    function updateMapHeight() {
      var container = mapContainer.value;
      if (!container) return;

      // Dapatkan lebar container yang tersedia
      var containerWidth = container.clientWidth || container.offsetWidth;
      if (containerWidth <= 0) return;
      var imgWidth = IMAGE_WIDTH.value;
      var imgHeight = IMAGE_HEIGHT.value;
      var aspectRatio = imgHeight / imgWidth;

      // fitBounds padding (harus sama dengan getOptimalZoomSettings)
      var fitPadding = window.innerWidth < 768 ? 0 : 10;

      // Leaflet fitBounds mereserve padding di kiri-kanan,
      // jadi gambar sebenarnya di-render di area (containerWidth - 2*fitPadding)
      // Tinggi gambar = (containerWidth - 2*fitPadding) * aspectRatio
      // Container height = tinggi gambar + 2*fitPadding (atas-bawah)
      var availableWidth = containerWidth - fitPadding * 2;
      var imageHeight = availableWidth * aspectRatio;
      var calculatedHeight = Math.round(imageHeight + fitPadding * 2);

      // Minimum dan maximum height
      var minHeight = window.innerWidth < 768 ? 120 : 200;
      var maxHeight = window.innerWidth >= 1024 ? 500 : 450;
      calculatedHeight = Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
      mapHeight.value = calculatedHeight + 'px';
    }
    function getFitMinZoom(fitPadding) {
      var container = mapContainer.value;
      if (!container) return window.innerWidth < 768 ? -3 : -1;
      var containerWidth = container.clientWidth || container.offsetWidth || 0;
      var containerHeight = container.clientHeight || parseInt(mapHeight.value, 10) || 280;
      var availableWidth = Math.max(1, containerWidth - fitPadding * 2);
      var availableHeight = Math.max(1, containerHeight - fitPadding * 2);

      // CRS.Simple: 1 unit = 1 pixel pada zoom 0, jadi gunakan log2 untuk hitung zoom fit.
      var widthFitZoom = Math.log2(availableWidth / IMAGE_WIDTH.value);
      var heightFitZoom = Math.log2(availableHeight / IMAGE_HEIGHT.value);
      var fitZoom = Math.min(widthFitZoom, heightFitZoom);

      // Round down ke 0.1 agar tidak ada crop karena pembulatan float.
      return Math.floor((fitZoom - 0.01) * 10) / 10;
    }
    function getOptimalZoomSettings() {
      var fitPadding = window.innerWidth < 768 ? 0 : 10;
      var minZoom = getFitMinZoom(fitPadding);
      return {
        minZoom: minZoom,
        fitMaxZoom: 4,
        // Biarkan fitBounds menentukan zoom terbaik
        padding: [fitPadding, fitPadding]
      };
    }
    function initMap() {
      var bounds = [[0, 0], [IMAGE_HEIGHT.value, IMAGE_WIDTH.value]];
      var zoomSettings = getOptimalZoomSettings();
      map = leaflet__WEBPACK_IMPORTED_MODULE_6___default().map(mapContainer.value, {
        crs: (leaflet__WEBPACK_IMPORTED_MODULE_6___default().CRS).Simple,
        minZoom: zoomSettings.minZoom,
        maxZoom: 2,
        zoomSnap: 0.1,
        zoomDelta: 0.25,
        zoomControl: true,
        attributionControl: false
      });

      // Image overlay dengan bounds - menggunakan gambar sesuai greenhouse aktif
      imageOverlay = leaflet__WEBPACK_IMPORTED_MODULE_6___default().imageOverlay(currentGreenhouseImage.value, bounds).addTo(map);

      // Fit ke bounds gambar dengan zoom optimal
      map.fitBounds(bounds, {
        padding: zoomSettings.padding,
        maxZoom: zoomSettings.fitMaxZoom
      });

      // Batasi panning agar tidak terlalu jauh dari gambar
      map.setMaxBounds([[-20, -20], [IMAGE_HEIGHT.value + 20, IMAGE_WIDTH.value + 20]]);

      // Tambahkan event untuk clip heatmap setelah render
      map.on('zoom move', handleMapViewportChange);
      scheduleHeatmapUpdate();
    }
    function handleMapViewportChange() {
      scheduleClipHeatmap();
    }
    function scheduleClipHeatmap() {
      if (pendingClipFrame !== null) {
        cancelAnimationFrame(pendingClipFrame);
      }
      pendingClipFrame = requestAnimationFrame(function () {
        pendingClipFrame = null;
        clipHeatmapToBounds();
      });
    }
    function scheduleHeatmapUpdate() {
      if (pendingHeatmapFrame !== null) {
        cancelAnimationFrame(pendingHeatmapFrame);
      }
      pendingHeatmapFrame = requestAnimationFrame(function () {
        pendingHeatmapFrame = null;
        updateHeatmap();
      });
    }
    function clipHeatmapToBounds() {
      var _customHeatLayer;
      if (!map) return;
      var heatCanvas = (_customHeatLayer = customHeatLayer) === null || _customHeatLayer === void 0 ? void 0 : _customHeatLayer._canvas;
      if (!heatCanvas) {
        return;
      }

      // Dapatkan posisi pixel dari bounds gambar
      var topLeft = map.latLngToContainerPoint([IMAGE_HEIGHT.value, 0]);
      var bottomRight = map.latLngToContainerPoint([0, IMAGE_WIDTH.value]);
      var left = Math.max(0, topLeft.x);
      var top = Math.max(0, topLeft.y);
      var right = bottomRight.x;
      var bottom = bottomRight.y;
      var clipPath = "polygon(".concat(left, "px ").concat(top, "px, ").concat(right, "px ").concat(top, "px, ").concat(right, "px ").concat(bottom, "px, ").concat(left, "px ").concat(bottom, "px)");
      heatCanvas.style.clipPath = clipPath;
      heatCanvas.style.webkitClipPath = clipPath;
    }

    /**
     * Update heatmap dan markers
     * Dipanggil saat:
     * - Parameter berubah (temperature/humidity/lux)
     * - Data sensor berubah dari server
     */
    function updateHeatmap() {
      if (!map || !currentSensorData.value) return;

      // Filter hanya sensor yang punya lokasi terdefinisi
      var sensorData = currentSensorData.value.filter(function (sensor) {
        return nodeLocations.value[sensor.node_id];
      });
      if (sensorData.length <= 0) {
        if (customHeatLayer) {
          map.removeLayer(customHeatLayer);
          customHeatLayer = null;
        }
        if (markersLayer) {
          map.removeLayer(markersLayer);
          markersLayer = null;
        }
        return;
      }
      drawCustomHeatmap(sensorData); // Render heatmap canvas
      drawMarkers(); // Render marker circles
      scheduleClipHeatmap();
    }

    // ===============================
    // AUTO-REFRESH FUNCTIONS
    // ===============================
    function startAutoRefresh() {
      // Clear existing interval if any
      stopAutoRefresh();

      // Set new interval
      autoRefreshInterval = setInterval(function () {
        // Refresh data dari server via Inertia tanpa full page reload
        // OPTIMIZED: Tidak perlu gh_id karena server sekarang mengirim semua data greenhouse
        _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.router.get(route("heatmap"), {}, {
          preserveState: true,
          preserveScroll: true,
          only: ['sensorDataByGh', 'thresholdsByGh', 'latestData']
        });
      }, AUTO_REFRESH_SECONDS * 1000);
    }
    function stopAutoRefresh() {
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
      }
    }

    // ===============================
    // LIFECYCLE HOOKS
    // ===============================

    // Saat komponen di-mount, inisialisasi Leaflet map dan auto-refresh
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      // Hitung tinggi map sebelum inisialisasi
      updateMapHeight();

      // Tunggu sebentar agar DOM terupdate dengan tinggi baru
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(function () {
        initMap();
        startAutoRefresh();
      });

      // ResizeObserver untuk recalculate saat resize window
      // DEBOUNCED: Hanya fire setelah 350ms stabil (setelah CSS transition selesai)
      if (window.ResizeObserver && mapContainer.value) {
        resizeObserver = new ResizeObserver(function () {
          // Skip jika sedang transisi GH switch (ditangani oleh watcher)
          if (isTransitioning) return;
          clearTimeout(resizeDebounceTimer);
          resizeDebounceTimer = setTimeout(function () {
            updateMapHeight();
            if (map) {
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(function () {
                map.invalidateSize();
                var bounds = [[0, 0], [IMAGE_HEIGHT.value, IMAGE_WIDTH.value]];
                var zoomSettings = getOptimalZoomSettings();
                map.setMinZoom(zoomSettings.minZoom);
                map.fitBounds(bounds, {
                  padding: zoomSettings.padding,
                  maxZoom: zoomSettings.fitMaxZoom
                });
                scheduleClipHeatmap();
              });
            }
          }, 350);
        });
        resizeObserver.observe(mapContainer.value);
      }
    });

    // Saat komponen di-unmount, hentikan auto-refresh
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(function () {
      stopAutoRefresh();
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (resizeDebounceTimer) {
        clearTimeout(resizeDebounceTimer);
        resizeDebounceTimer = null;
      }
      if (pendingClipFrame !== null) {
        cancelAnimationFrame(pendingClipFrame);
        pendingClipFrame = null;
      }
      if (pendingHeatmapFrame !== null) {
        cancelAnimationFrame(pendingHeatmapFrame);
        pendingHeatmapFrame = null;
      }
      if (map) {
        map.off('zoom move', handleMapViewportChange);
        map.remove();
        map = null;
      }
      markersLayer = null;
      customHeatLayer = null;
      imageOverlay = null;
    });

    // ===============================
    // WATCHERS - Reaktif terhadap perubahan
    // ===============================

    // Watch 1: Saat user switch greenhouse
    // OPTIMIZED: Tidak perlu request ke server! Data sudah di-preload.
    // Cukup update map overlay dan re-render heatmap dengan data yang sudah ada.
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(activeGH, function (newGhId) {
      if (!imageOverlay || !map) return;
      isTransitioning = true;

      // Step 1: Fade out map content
      mapOpacity.value = 0;

      // Step 2: Setelah fade out selesai (300ms), update height + content
      setTimeout(function () {
        // Update tinggi container berdasarkan aspect ratio GH baru
        updateMapHeight();

        // Step 3: Setelah height transition selesai (300ms), update Leaflet
        setTimeout(function () {
          var bounds = [[0, 0], [IMAGE_HEIGHT.value, IMAGE_WIDTH.value]];

          // Remove old overlay dan tambah yang baru
          map.removeLayer(imageOverlay);
          imageOverlay = leaflet__WEBPACK_IMPORTED_MODULE_6___default().imageOverlay(currentGreenhouseImage.value, bounds).addTo(map);
          var zoomSettings = getOptimalZoomSettings();
          map.setMinZoom(zoomSettings.minZoom);

          // Invalidate size karena container height sudah berubah
          map.invalidateSize();
          map.setMaxBounds([[-20, -20], [IMAGE_HEIGHT.value + 20, IMAGE_WIDTH.value + 20]]);
          map.fitBounds(bounds, {
            padding: zoomSettings.padding,
            maxZoom: zoomSettings.fitMaxZoom
          });
          imageOverlay.bringToBack();

          // Clear dan redraw heatmap
          if (customHeatLayer) {
            map.removeLayer(customHeatLayer);
            customHeatLayer = null;
          }
          scheduleHeatmapUpdate();

          // Step 4: Fade in map content
          requestAnimationFrame(function () {
            mapOpacity.value = 1;
            isTransitioning = false;
          });
        }, 350); // Tunggu height transition CSS selesai
      }, 300); // Tunggu fade out selesai
    });

    // Watch 2: Saat user switch parameter (Temperature/Humidity/Light Intensity)
    // Tidak perlu request server, cukup update heatmap dengan data yang sudah ada
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(activeParameter, function () {
      scheduleHeatmapUpdate();
    });

    // Watch 3: Saat data dari server berubah (auto-refresh)
    // OPTIMIZED: Watch signature data aktif agar tidak deep-watch seluruh payload.
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(currentSensorDataSignature, function () {
      scheduleHeatmapUpdate();
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(function () {
      return "".concat(currentThresholds.value.min, "|").concat(currentThresholds.value.max);
    }, function () {
      scheduleHeatmapUpdate();
    });
    var __returned__ = {
      t: t,
      props: props,
      activeGH: activeGH,
      activeParameter: activeParameter,
      mapHeight: mapHeight,
      mapContainer: mapContainer,
      mapOpacity: mapOpacity,
      get resizeDebounceTimer() {
        return resizeDebounceTimer;
      },
      set resizeDebounceTimer(v) {
        resizeDebounceTimer = v;
      },
      get isTransitioning() {
        return isTransitioning;
      },
      set isTransitioning(v) {
        isTransitioning = v;
      },
      get autoRefreshInterval() {
        return autoRefreshInterval;
      },
      set autoRefreshInterval(v) {
        autoRefreshInterval = v;
      },
      get resizeObserver() {
        return resizeObserver;
      },
      set resizeObserver(v) {
        resizeObserver = v;
      },
      get pendingClipFrame() {
        return pendingClipFrame;
      },
      set pendingClipFrame(v) {
        pendingClipFrame = v;
      },
      get pendingHeatmapFrame() {
        return pendingHeatmapFrame;
      },
      set pendingHeatmapFrame(v) {
        pendingHeatmapFrame = v;
      },
      AUTO_REFRESH_SECONDS: AUTO_REFRESH_SECONDS,
      currentLatestTime: currentLatestTime,
      greenhouseConfig: greenhouseConfig,
      currentGHConfig: currentGHConfig,
      IMAGE_WIDTH: IMAGE_WIDTH,
      IMAGE_HEIGHT: IMAGE_HEIGHT,
      nodeLocations: nodeLocations,
      currentGreenhouseImage: currentGreenhouseImage,
      parameterConfig: parameterConfig,
      currentConfig: currentConfig,
      currentThresholds: currentThresholds,
      currentSensorData: currentSensorData,
      currentSensorDataSignature: currentSensorDataSignature,
      legendGradientStyle: legendGradientStyle,
      legendGradientStyleHorizontal: legendGradientStyleHorizontal,
      normalizeValue: normalizeValue,
      getStatus: getStatus,
      get map() {
        return map;
      },
      set map(v) {
        map = v;
      },
      get markersLayer() {
        return markersLayer;
      },
      set markersLayer(v) {
        markersLayer = v;
      },
      createCustomIcon: createCustomIcon,
      drawMarkers: drawMarkers,
      get customHeatLayer() {
        return customHeatLayer;
      },
      set customHeatLayer(v) {
        customHeatLayer = v;
      },
      HEATMAP_RADIUS: HEATMAP_RADIUS,
      heatmapGradientColors: heatmapGradientColors,
      interpolateColor: interpolateColor,
      CanvasHeatmapLayer: CanvasHeatmapLayer,
      drawCustomHeatmap: drawCustomHeatmap,
      get imageOverlay() {
        return imageOverlay;
      },
      set imageOverlay(v) {
        imageOverlay = v;
      },
      updateMapHeight: updateMapHeight,
      getFitMinZoom: getFitMinZoom,
      getOptimalZoomSettings: getOptimalZoomSettings,
      initMap: initMap,
      handleMapViewportChange: handleMapViewportChange,
      scheduleClipHeatmap: scheduleClipHeatmap,
      scheduleHeatmapUpdate: scheduleHeatmapUpdate,
      clipHeatmapToBounds: clipHeatmapToBounds,
      updateHeatmap: updateHeatmap,
      startAutoRefresh: startAutoRefresh,
      stopAutoRefresh: stopAutoRefresh,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onUnmounted: vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      nextTick: vue__WEBPACK_IMPORTED_MODULE_0__.nextTick,
      get Head() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.Head;
      },
      get router() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.router;
      },
      BreezeAuthenticatedLayout: _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      Tabs: _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      DigitalClock: _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
      get useLocale() {
        return _composables_useLocale__WEBPACK_IMPORTED_MODULE_5__.useLocale;
      },
      get L() {
        return (leaflet__WEBPACK_IMPORTED_MODULE_6___default());
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true"
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

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
  "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4 mt-3"
};
var _hoisted_5 = {
  "class": "flex flex-col w-full"
};
var _hoisted_6 = {
  "class": "flex justify-between"
};
var _hoisted_7 = {
  "class": "flex justify-between"
};
var _hoisted_8 = {
  "class": "heatmap-layout"
};
var _hoisted_9 = {
  "class": "map-container"
};
var _hoisted_10 = {
  "class": "legend-mobile"
};
var _hoisted_11 = {
  "class": "legend-mobile-title"
};
var _hoisted_12 = {
  "class": "legend-mobile-content"
};
var _hoisted_13 = {
  "class": "legend-mobile-edge"
};
var _hoisted_14 = {
  "class": "edge-value"
};
var _hoisted_15 = {
  "class": "edge-label"
};
var _hoisted_16 = {
  "class": "legend-mobile-edge"
};
var _hoisted_17 = {
  "class": "edge-value"
};
var _hoisted_18 = {
  "class": "edge-label"
};
var _hoisted_19 = {
  "class": "legend-desktop"
};
var _hoisted_20 = {
  "class": "text-sm font-semibold text-gray-700 mb-3"
};
var _hoisted_21 = {
  "class": "legend-desktop-content"
};
var _hoisted_22 = {
  "class": "legend-bar-container"
};
var _hoisted_23 = {
  "class": "legend-labels"
};
var _hoisted_24 = {
  "class": "param-buttons"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Head"], {
    title: $setup.t('title.heatmap')
  }, null, 8 /* PROPS */, ["title"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeAuthenticatedLayout"], {
    titlePage: "Heatmap"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("title.heatmap")), 1 /* TEXT */)];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SWITCH GREENHOUSE "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Tabs"], {
        greenhouses: $setup.props.greenhouses,
        modelValue: $setup.activeGH,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $setup.activeGH = $event;
        })
      }, null, 8 /* PROPS */, ["greenhouses", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" INFO CARD: Time & Latest Data (sama seperti Monitoring) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.time")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["DigitalClock"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.latest_data")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentLatestTime), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAP + LEGEND "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAP "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        ref: "mapContainer",
        "class": "map-view",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          height: $setup.mapHeight,
          opacity: $setup.mapOpacity
        })
      }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" LEGEND MOBILE (Horizontal, always visible on mobile) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.label) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.unit) + ")", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.min), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("heatmap.safe")), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "legend-mobile-bar",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.legendGradientStyleHorizontal)
      }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.max), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("heatmap.critical")), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" LEGEND DESKTOP (Vertical, sidebar on desktop) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.label) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.unit) + ") ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Legend Bar (skala langsung dari threshold min ke max) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "legend-bar",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.legendGradientStyle)
      }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Scale Labels (dynamic) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.max), 1 /* TEXT */), _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("heatmap.critical")), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($setup.currentConfig.max * 0.75)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($setup.currentConfig.max * 0.5)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($setup.currentConfig.max * 0.25)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.min), 1 /* TEXT */), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("heatmap.safe")), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" PARAMETER BUTTON "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["param-btn", $setup.activeParameter === 'temperature' ? 'param-active' : 'param-inactive']),
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $setup.activeParameter = 'temperature';
        })
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("sensor.temperature")), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["param-btn", $setup.activeParameter === 'humidity' ? 'param-active' : 'param-inactive']),
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $setup.activeParameter = 'humidity';
        })
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("sensor.humidity")), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["param-btn", $setup.activeParameter === 'lux' ? 'param-active' : 'param-inactive']),
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return $setup.activeParameter = 'lux';
        })
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("sensor.light_intensity")), 3 /* TEXT, CLASS */)])])])];
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css"
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n\r\n/* ===========================\r\n   LAYOUT - RESPONSIVE\r\n   =========================== */\n.heatmap-layout[data-v-373293d3] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n  margin-top: 1rem;\n}\n@media (min-width: 1024px) {\n.heatmap-layout[data-v-373293d3] {\r\n    flex-direction: row;\n}\n}\r\n\r\n/* ===========================\r\n   MAP CONTAINER\r\n   =========================== */\n.map-container[data-v-373293d3] {\r\n  flex: 1;\r\n  background: white;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n  /* Mobile: full rounded */\r\n  border-radius: 0.5rem;\r\n  padding: 0.75rem;\n}\n@media (min-width: 640px) {\n.map-container[data-v-373293d3] {\r\n    padding: 1rem;\n}\n}\n@media (min-width: 1024px) {\n.map-container[data-v-373293d3] {\r\n    /* Desktop: bottom-left not rounded (button attached) */\r\n    border-radius: 0.5rem 0.5rem 0.5rem 0;\n}\n}\n.map-view[data-v-373293d3] {\r\n  width: 100%;\r\n  /* height di-set secara dynamic via inline style berdasarkan aspect ratio */\r\n  height: 280px; /* Fallback jika JS belum jalan */\r\n  border: 1px solid #d1d5db;\r\n  border-radius: 0.5rem;\r\n  overflow: hidden;\r\n  transition: height 0.3s ease, opacity 0.3s ease;\n}\r\n\r\n/* ===========================\r\n   LEGEND MOBILE (Horizontal)\r\n   =========================== */\n.legend-mobile[data-v-373293d3] {\r\n  display: block;\r\n  background: #f9fafb;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 0.5rem;\r\n  padding: 0.5rem 0.75rem;\n}\n@media (min-width: 1024px) {\n.legend-mobile[data-v-373293d3] {\r\n    display: none;\n}\n}\n.legend-mobile-title[data-v-373293d3] {\r\n  font-size: 0.875rem;\r\n  font-weight: 600;\r\n  color: #374151;\r\n  text-align: center;\r\n  margin-bottom: 0.5rem;\n}\n.legend-mobile-content[data-v-373293d3] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 0.5rem;\n}\n.legend-mobile-edge[data-v-373293d3] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  line-height: 1.1;\n}\n.legend-mobile-edge .edge-value[data-v-373293d3] {\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n  color: #374151;\n}\n.legend-mobile-edge .edge-label[data-v-373293d3] {\r\n  font-size: 11px;\r\n  font-weight: 400;\r\n  color: #6b7280;\n}\n.legend-mobile-bar[data-v-373293d3] {\r\n  position: relative;\r\n  flex: 1;\r\n  max-width: 180px;\r\n  height: 16px;\r\n  border-radius: 8px;\n}\r\n\r\n/* ===========================\r\n   LEGEND DESKTOP (Vertical)\r\n   =========================== */\n.legend-desktop[data-v-373293d3] {\r\n  display: none;\r\n  background: #f9fafb;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 0.5rem;\r\n  padding: 1rem;\r\n  min-width: 160px;\n}\n@media (min-width: 1024px) {\n.legend-desktop[data-v-373293d3] {\r\n    display: block;\n}\n}\n.legend-desktop-content[data-v-373293d3] {\r\n  display: flex;\r\n  gap: 0.75rem;\r\n  align-items: stretch;\r\n  justify-content: center;\r\n  height: 380px;\n}\r\n\r\n/* ===========================\r\n   LEGEND BAR (Desktop)\r\n   =========================== */\n.legend-bar-container[data-v-373293d3] {\r\n  position: relative;\r\n  width: 22px;\n}\n.legend-bar[data-v-373293d3] {\r\n  width: 22px;\r\n  height: 100%;\r\n  border-radius: 12px;\n}\n.legend-labels[data-v-373293d3] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  font-size: 12px;\r\n  color: #4b5563;\r\n  text-align: center;\n}\r\n\r\n/* ===========================\r\n   PARAMETER BUTTONS\r\n   =========================== */\n.param-buttons[data-v-373293d3] {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  overflow-x: auto;\r\n  -webkit-overflow-scrolling: touch;\r\n  scrollbar-width: none;\r\n  margin-top: 0.75rem;\n}\n.param-buttons[data-v-373293d3]::-webkit-scrollbar {\r\n  display: none;\n}\n@media (min-width: 1024px) {\n.param-buttons[data-v-373293d3] {\r\n    gap: 0.25rem;\r\n    margin-top: 0;\n}\n}\n.param-btn[data-v-373293d3] {\r\n  flex: 1;\r\n  min-width: 0;\r\n  padding: 0.65rem 0.5rem;\r\n  font-size: 0.875rem;\r\n  /* Mobile: full rounded */\r\n  border-radius: 0.5rem;\r\n  border: 1px solid #d1d5db;\r\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\r\n  transition: all 0.2s ease;\r\n  white-space: nowrap;\r\n  text-align: center;\n}\n@media (min-width: 1024px) {\n.param-btn[data-v-373293d3] {\r\n    flex: none;\r\n    padding: 0.5rem 1rem;\r\n    font-size: 0.875rem;\r\n    /* Desktop: only bottom rounded (attached to map) */\r\n    border-radius: 0;\r\n    border-bottom-left-radius: 0.375rem;\r\n    border-bottom-right-radius: 0.375rem;\r\n    border: none;\r\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n}\n}\n.param-active[data-v-373293d3] {\r\n  background-color: #ffffff;\r\n  color: #4b5563;\n}\n.param-inactive[data-v-373293d3] {\r\n  background-color: #e5e7eb;\r\n  color: #4b5563;\n}\n.param-inactive[data-v-373293d3]:active,\r\n.param-inactive[data-v-373293d3]:hover {\r\n  background-color: #d1d5db;\r\n  color: #374151;\n}\n.leaflet-container[data-v-373293d3] {\r\n  background: #f9fafb;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css"
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* MARKER STYLES (global, tidak scoped) */\n.custom-marker {\r\n  background: transparent;\r\n  border: none;\n}\n.marker-pin {\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 3px solid white;\r\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\r\n  cursor: pointer;\r\n  transition: transform 0.2s ease;\n}\n.marker-pin:hover {\r\n  transform: scale(1.2);\n}\n.marker-number {\r\n  color: white;\r\n  font-weight: bold;\r\n  font-size: 12px;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n}\r\n\r\n/* POPUP STYLES */\n.node-popup .leaflet-popup-content-wrapper {\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.node-popup .leaflet-popup-content {\r\n  margin: 12px 16px;\n}\n.node-popup .leaflet-popup-tip {\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\r\n\r\n/* Popup untuk node atas - panah mengarah ke atas */\n.popup-bottom.leaflet-popup .leaflet-popup-tip-container {\r\n  top: -19px !important;\r\n  bottom: auto !important;\r\n  margin-top: 0 !important;\r\n  transform: rotate(180deg) !important;\n}\n.popup-bottom.leaflet-popup .leaflet-popup-content-wrapper {\r\n  margin-top: 0 !important;\n}\r\n\r\n/* Turunkan z-index Leaflet controls agar tidak muncul di atas sidebar mobile */\n.leaflet-control-container,\r\n.leaflet-control-container .leaflet-top,\r\n.leaflet-control-container .leaflet-left,\r\n.leaflet-control-container .leaflet-right,\r\n.leaflet-control-container .leaflet-bottom,\r\n.leaflet-top.leaflet-left,\r\n.leaflet-top.leaflet-right,\r\n.leaflet-control-zoom,\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out,\r\n.leaflet-control {\r\n  z-index: 500 !important;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css"
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_0_id_373293d3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_0_id_373293d3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_0_id_373293d3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ },

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css"
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_1_id_373293d3_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_1_id_373293d3_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_1_id_373293d3_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./resources/js/Pages/Heatmap.vue"
/*!****************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Heatmap_vue_vue_type_template_id_373293d3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Heatmap.vue?vue&type=template&id=373293d3&scoped=true */ "./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true");
/* harmony import */ var _Heatmap_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Heatmap.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _Heatmap_vue_vue_type_style_index_0_id_373293d3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css */ "./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css");
/* harmony import */ var _Heatmap_vue_vue_type_style_index_1_id_373293d3_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css */ "./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_Heatmap_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Heatmap_vue_vue_type_template_id_373293d3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-373293d3"],['__file',"resources/js/Pages/Heatmap.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

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

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js"
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js");
 

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

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true"
/*!**********************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_template_id_373293d3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_template_id_373293d3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=template&id=373293d3&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true");


/***/ },

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css"
/*!************************************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_0_id_373293d3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css");


/***/ },

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css"
/*!************************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_1_id_373293d3_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css");


/***/ }

}]);