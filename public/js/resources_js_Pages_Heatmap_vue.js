"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Heatmap_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
        '48': 'w-48'
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

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'DropdownLink',
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var __returned__ = {
      get Link() {
        return _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.Link;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'NavLink',
  props: ["href", "active", "icon"],
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var props = __props;
    var classes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return props.active ? "flex items-center px-4 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out" : "flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-green-100 rounded-lg transition duration-150 ease-in-out";
    });
    var __returned__ = {
      props: props,
      classes: classes,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      get Link() {
        return _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_1__.Link;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
      return props.greenhouses.findIndex(function (g) {
        return g.id == props.modelValue;
      });
    });
    var __returned__ = {
      props: props,
      activeIndex: activeIndex,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _Components_ApplicationLogo_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/ApplicationLogo.vue */ "./resources/js/Components/ApplicationLogo.vue");
/* harmony import */ var _Components_NavLink_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/NavLink.vue */ "./resources/js/Components/NavLink.vue");
/* harmony import */ var _Components_Dropdown_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Dropdown.vue */ "./resources/js/Components/Dropdown.vue");
/* harmony import */ var _Components_DropdownLink_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/DropdownLink.vue */ "./resources/js/Components/DropdownLink.vue");
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Authenticated',
  props: ["titlePage"],
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var isSidebarOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    var __returned__ = {
      isSidebarOpen: isSidebarOpen,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      BreezeApplicationLogo: _Components_ApplicationLogo_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
      BreezeNavLink: _Components_NavLink_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      BreezeDropdown: _Components_Dropdown_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      BreezeDropdownLink: _Components_DropdownLink_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
      get Link() {
        return _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_5__.Link;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");
/* harmony import */ var _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Layouts/Authenticated.vue */ "./resources/js/Layouts/Authenticated.vue");
/* harmony import */ var _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Tabs.vue */ "./resources/js/Components/Tabs.vue");
/* harmony import */ var _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Components/DigitalClock.vue */ "./resources/js/Components/DigitalClock.vue");
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









// ===============================
// PROPS DARI CONTROLLER
// Data yang dikirim dari PageController@heatmap
// ===============================
var AUTO_REFRESH_SECONDS = 30;

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
    // Data sensor per parameter (array of {node_id, value})
    temperatureData: Array,
    humidityData: Array,
    luxData: Array,
    // Daftar greenhouse untuk switch tab
    greenhouses: Array,
    // ID greenhouse yang sedang aktif
    activeGhId: Number,
    // Threshold min-max untuk menentukan warna/status
    // Diambil dari tabel sensors di database
    temperatureThresholds: {
      type: Object,
      "default": function _default() {
        return {
          min: 25,
          max: 35
        };
      }
    },
    humidityThresholds: {
      type: Object,
      "default": function _default() {
        return {
          min: 50,
          max: 80
        };
      }
    },
    luxThresholds: {
      type: Object,
      "default": function _default() {
        return {
          min: 20000,
          max: 50000
        };
      }
    },
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

    var props = __props;

    // ===============================
    // REACTIVE STATE
    // ===============================
    var activeGH = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(props.activeGhId); // Greenhouse yang dipilih
    var activeParameter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("temperature"); // Parameter aktif (temperature/humidity/lux)
    var mapContainer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null); // Reference ke container div untuk Leaflet
    var autoRefreshInterval = null; // Interval untuk auto-refresh

    // ===============================
    // AUTO-REFRESH INTERVAL (30 detik)
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
        label: 'Temperature'
      },
      humidity: {
        min: 0,
        max: 100,
        unit: '%',
        label: 'Humidity'
      },
      lux: {
        min: 0,
        max: 65535,
        unit: 'lux',
        label: 'Light Intensity'
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
        min: thresholds.min,
        // Override dengan threshold min
        max: thresholds.max // Override dengan threshold max
      });
    });

    // Threshold (min/max) untuk parameter aktif - dari database
    var currentThresholds = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      if (activeParameter.value === 'temperature') return props.temperatureThresholds;
      if (activeParameter.value === 'humidity') return props.humidityThresholds;
      return props.luxThresholds;
    });

    // Data sensor untuk parameter aktif
    var currentSensorData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      if (activeParameter.value === 'temperature') return props.temperatureData;
      if (activeParameter.value === 'humidity') return props.humidityData;
      return props.luxData;
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
      var t = rangeStop === 0 ? 0 : (normalized - lower.stop) / rangeStop;
      var r = Math.round(lower.r + (upper.r - lower.r) * t);
      var g = Math.round(lower.g + (upper.g - lower.g) * t);
      var b = Math.round(lower.b + (upper.b - lower.b) * t);
      var color = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");

      // Tentukan text status berdasarkan zona
      var text;
      if (normalized <= 0.3) text = "Aman";else if (normalized <= 0.5) text = "Normal";else if (normalized <= 1) text = "Waspada";else text = "Kritis";
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
          closeButton: true,
          className: isTopNode ? "node-popup popup-bottom" : "node-popup",
          // Offset: [x, y] - y positif = popup ke bawah
          offset: isTopNode ? [0, 140] : [0, 0]
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
      var t = range === 0 ? 0 : (v - lower.stop) / range;
      return {
        r: Math.round(lower.r + (upper.r - lower.r) * t),
        g: Math.round(lower.g + (upper.g - lower.g) * t),
        b: Math.round(lower.b + (upper.b - lower.b) * t)
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

        // IDW power parameter - higher = sharper transitions near sensors
        var IDW_POWER = 2;

        // Render each pixel using IDW (Inverse Distance Weighting)
        // SEMUA sensor mempengaruhi SEMUA pixel, dengan bobot berdasarkan jarak
        var RESOLUTION = 2; // Skip pixels for performance (1 = full, 2 = half, etc)

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

                // IDW: weight = 1 / distance^power
                // Tambah epsilon untuk avoid division by zero saat tepat di sensor
                var epsilon = 1;
                var weight = 1 / Math.pow(dist + epsilon, IDW_POWER);
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
            var radiusPx = Math.abs(this._map.latLngToContainerPoint([0, this.options.radius]).x - this._map.latLngToContainerPoint([0, 0]).x);

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
    function getOptimalZoomSettings() {
      var isMobile = window.innerWidth < 768;

      // GH 2 punya rasio aspek yang berbeda (640x500 = lebih square)
      // GH 1 punya rasio lebih landscape (1024x450)
      if (activeGH.value === 2) {
        // GH 2: gambar lebih square, butuh zoom berbeda
        return {
          minZoom: isMobile ? -0.75 : 0,
          fitMaxZoom: isMobile ? 0.4 : 0.5,
          padding: isMobile ? [5, 5] : [20, 20]
        };
      } else {
        // GH 1: gambar landscape
        return {
          minZoom: isMobile ? -1 : -0.5,
          fitMaxZoom: isMobile ? 0 : -0.5,
          padding: [5, 5]
        };
      }
    }
    function initMap() {
      var bounds = [[0, 0], [IMAGE_HEIGHT.value, IMAGE_WIDTH.value]];
      var zoomSettings = getOptimalZoomSettings();
      map = leaflet__WEBPACK_IMPORTED_MODULE_6___default().map(mapContainer.value, {
        crs: (leaflet__WEBPACK_IMPORTED_MODULE_6___default().CRS).Simple,
        minZoom: zoomSettings.minZoom,
        maxZoom: 2,
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
      map.on('zoomend moveend zoom move', function () {
        requestAnimationFrame(clipHeatmapToBounds);
      });
      updateHeatmap();
    }
    function clipHeatmapToBounds() {
      if (!map) return;

      // Dapatkan posisi pixel dari bounds gambar
      var topLeft = map.latLngToContainerPoint([IMAGE_HEIGHT.value, 0]);
      var bottomRight = map.latLngToContainerPoint([0, IMAGE_WIDTH.value]);

      // Cari semua canvas heatmap (bisa lebih dari satu)
      var heatCanvases = document.querySelectorAll('.leaflet-heatmap-layer, .leaflet-pane canvas');
      heatCanvases.forEach(function (canvas) {
        var left = Math.max(0, topLeft.x);
        var top = Math.max(0, topLeft.y);
        var right = bottomRight.x;
        var bottom = bottomRight.y;
        canvas.style.clipPath = "polygon(".concat(left, "px ").concat(top, "px, ").concat(right, "px ").concat(top, "px, ").concat(right, "px ").concat(bottom, "px, ").concat(left, "px ").concat(bottom, "px)");
      });
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
      if (sensorData.length > 0) {
        drawCustomHeatmap(sensorData); // Render heatmap canvas
        drawMarkers(); // Render marker circles
      }
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
        _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__.Inertia.get(route("heatmap"), {
          gh_id: activeGH.value
        }, {
          preserveState: true,
          preserveScroll: true,
          only: ['temperatureData', 'humidityData', 'luxData', 'latestData']
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
      initMap();
      startAutoRefresh();
    });

    // Saat komponen di-unmount, hentikan auto-refresh
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(function () {
      stopAutoRefresh();
    });

    // ===============================
    // WATCHERS - Reaktif terhadap perubahan
    // ===============================

    // Watch 1: Saat user switch greenhouse
    // Request data baru dari server dan update image overlay
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(activeGH, function (newGhId) {
      // Request data baru dari server via Inertia
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__.Inertia.get(route("heatmap"), {
        gh_id: newGhId
      }, {
        preserveState: true
      });

      // Update image overlay dan bounds ke greenhouse yang baru
      if (imageOverlay && map) {
        // Bounds baru sesuai dimensi gambar greenhouse yang dipilih
        var bounds = [[0, 0], [IMAGE_HEIGHT.value, IMAGE_WIDTH.value]];

        // Remove old overlay dan tambah yang baru
        map.removeLayer(imageOverlay);
        imageOverlay = leaflet__WEBPACK_IMPORTED_MODULE_6___default().imageOverlay(currentGreenhouseImage.value, bounds).addTo(map);

        // Update map bounds dan fit ke gambar baru dengan zoom optimal
        var zoomSettings = getOptimalZoomSettings();

        // Update minZoom sesuai greenhouse
        map.setMinZoom(zoomSettings.minZoom);
        map.setMaxBounds([[-20, -20], [IMAGE_HEIGHT.value + 20, IMAGE_WIDTH.value + 20]]);
        map.fitBounds(bounds, {
          padding: zoomSettings.padding,
          maxZoom: zoomSettings.fitMaxZoom
        });

        // Pindahkan image ke belakang agar heatmap tetap di atas
        imageOverlay.bringToBack();

        // Clear dan redraw heatmap dengan posisi node baru
        if (customHeatLayer) {
          map.removeLayer(customHeatLayer);
          customHeatLayer = null;
        }
      }
    });

    // Watch 2: Saat user switch parameter (Temperature/Humidity/Light Intensity)
    // Tidak perlu request server, cukup update heatmap dengan data yang sudah ada
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(activeParameter, function () {
      updateHeatmap();
    });

    // Watch 3: Saat data dari server berubah
    // Deep watch untuk mendeteksi perubahan di dalam array
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)([function () {
      return props.temperatureData;
    }, function () {
      return props.humidityData;
    }, function () {
      return props.luxData;
    }], function () {
      updateHeatmap();
    }, {
      deep: true
    });
    var __returned__ = {
      props: props,
      activeGH: activeGH,
      activeParameter: activeParameter,
      mapContainer: mapContainer,
      get autoRefreshInterval() {
        return autoRefreshInterval;
      },
      set autoRefreshInterval(v) {
        autoRefreshInterval = v;
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
      getOptimalZoomSettings: getOptimalZoomSettings,
      initMap: initMap,
      clipHeatmapToBounds: clipHeatmapToBounds,
      updateHeatmap: updateHeatmap,
      startAutoRefresh: startAutoRefresh,
      stopAutoRefresh: stopAutoRefresh,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onUnmounted: vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      get Head() {
        return _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_1__.Head;
      },
      get Inertia() {
        return _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__.Inertia;
      },
      BreezeAuthenticatedLayout: _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      Tabs: _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
      DigitalClock: _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
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

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ApplicationLogo.vue?vue&type=template&id=3ac4aa20":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ApplicationLogo.vue?vue&type=template&id=3ac4aa20 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  viewBox: "0 0 316 316",
  xmlns: "http://www.w3.org/2000/svg"
};
function render(_ctx, _cache) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_1, _cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z"
  }, null, -1 /* HOISTED */)]));
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formattedTime), 1 /* TEXT */);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["Link"], {
    "class": "block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")];
    }),
    _: 3 /* FORWARDED */
  });
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "flex items-center gap-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["Link"], {
    href: $props.href,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.classes, "flex items-center justify-between w-full"])
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [$props.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
        key: 0,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)("".concat($props.icon, " text-lg"))
      }, null, 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")])];
    }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["href", "class"]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(greenhouse.name), 11 /* TEXT, CLASS, PROPS */, _hoisted_3);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Animated Background (Fixed Translate) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300 shadow-md",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: "".concat(100 / $props.greenhouses.length, "%"),
      transform: "translateX(".concat($setup.activeIndex * (100 / $props.greenhouses.length) * 2, "%)")
    })
  }, null, 4 /* STYLE */)])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "flex min-h-screen bg-gray-100 relative"
};
var _hoisted_2 = {
  "class": "h-16 flex items-center justify-center border-b"
};
var _hoisted_3 = {
  "class": "px-4 py-6 flex flex-col"
};
var _hoisted_4 = {
  "class": "flex-1 flex flex-col w-full"
};
var _hoisted_5 = {
  "class": "bg-white shadow h-16 flex items-center px-4 sm:px-6 lg:px-8"
};
var _hoisted_6 = {
  "class": "h-6 w-6",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 24 24"
};
var _hoisted_7 = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M4 6h16M4 12h16M4 18h16"
};
var _hoisted_8 = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M6 18L18 6M6 6l12 12"
};
var _hoisted_9 = {
  "class": "ml-auto"
};
var _hoisted_10 = {
  "class": "w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
};
var _hoisted_11 = {
  "class": "flex-1 p-6"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Backdrop overlay untuk mobile (tutup saat klik di luar sidebar) "), $setup.isSidebarOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $setup.isSidebarOpen = false;
    }),
    "class": "fixed inset-0 bg-black bg-opacity-50 z-[999] sm:hidden"
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['w-64 bg-white border-r border-gray-200 transform transition-transform z-[1000] min-h-screen fixed sm:relative', $setup.isSidebarOpen ? 'translate-x-0' : '-translate-x-64', 'sm:translate-x-0'])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tombol Close (X) hanya muncul di mobile "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $setup.isSidebarOpen = false;
    }),
    "class": "absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 sm:hidden"
  }, _cache[3] || (_cache[3] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    "class": "w-6 h-6 text-gray-600",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M6 18L18 6M6 6l12 12"
  })], -1 /* HOISTED */)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Link"], {
    href: _ctx.route('monitoring'),
    "class": "text-2xl font-bold tracking-wide text-green-600 flex items-center gap-2"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _cache[4] || (_cache[4] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-seedling text-green-600 text-3xl"
      }, null, -1 /* HOISTED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Medini ")]);
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeNavLink"], {
    href: _ctx.route('monitoring'),
    active: _ctx.route().current('monitoring'),
    icon: 'fas fa-chart-bar',
    "class": "justify-center"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Monitoring ")]);
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href", "active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeNavLink"], {
    href: _ctx.route('heatmap'),
    active: _ctx.route().current('heatmap'),
    icon: 'fas fa-map-marked-alt',
    "class": "justify-center"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Heatmap ")]);
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href", "active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeNavLink"], {
    href: _ctx.route('table'),
    active: _ctx.route().current('table'),
    icon: 'fas fa-table',
    "class": "justify-center"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Table ")]);
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href", "active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeNavLink"], {
    href: _ctx.route('camera'),
    active: _ctx.route().current('camera'),
    icon: 'fas fa-camera-retro',
    "class": "justify-center"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Camera ")]);
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href", "active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeNavLink"], {
    href: _ctx.route('controlling'),
    active: _ctx.route().current('controlling'),
    icon: 'fas fa-sliders-h',
    "class": "justify-center"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Controlling ")]);
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href", "active"])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navbar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $setup.isSidebarOpen = !$setup.isSidebarOpen;
    }),
    "class": "sm:hidden text-gray-500 hover:text-gray-700"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_6, [!$setup.isSidebarOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("path", _hoisted_7)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("path", _hoisted_8))]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['text-2xl font-bold', !$setup.isSidebarOpen ? 'ml-2' : ''])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.titlePage), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Log Out Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeDropdown"], {
    align: "right",
    width: "48"
  }, {
    trigger: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref) {
      var open = _ref.open;
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$page.props.auth.user.name) + " ", 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["h-4 w-4 transition-transform duration-200", {
          'rotate-180': open
        }]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, _cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
        "fill-rule": "evenodd",
        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
        "clip-rule": "evenodd"
      }, null, -1 /* HOISTED */)]), 2 /* CLASS */))])];
    }),
    content: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeDropdownLink"], {
        href: _ctx.route('logout'),
        method: "post",
        as: "button"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return _cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Log Out ")]);
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["href"])];
    }),
    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Page Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default")])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "py-2"
};
var _hoisted_2 = {
  "class": "max-w-7xl mx-auto sm:px-2 lg:px-2"
};
var _hoisted_3 = {
  "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4 mt-3"
};
var _hoisted_4 = {
  "class": "flex flex-col w-full"
};
var _hoisted_5 = {
  "class": "flex justify-between"
};
var _hoisted_6 = {
  "class": "flex justify-between"
};
var _hoisted_7 = {
  "class": "heatmap-layout"
};
var _hoisted_8 = {
  "class": "map-container"
};
var _hoisted_9 = {
  ref: "mapContainer",
  "class": "map-view"
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
  "class": "legend-mobile-edge"
};
var _hoisted_16 = {
  "class": "edge-value"
};
var _hoisted_17 = {
  "class": "legend-desktop"
};
var _hoisted_18 = {
  "class": "text-sm font-semibold text-gray-700 mb-3"
};
var _hoisted_19 = {
  "class": "legend-desktop-content"
};
var _hoisted_20 = {
  "class": "legend-bar-container"
};
var _hoisted_21 = {
  "class": "legend-labels"
};
var _hoisted_22 = {
  "class": "param-buttons"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Head"], {
    title: "Heatmap"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeAuthenticatedLayout"], {
    titlePage: "Heatmap"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _cache[4] || (_cache[4] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
        "class": "font-semibold text-xl text-gray-800 leading-tight"
      }, " Heatmap ", -1 /* HOISTED */)]);
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SWITCH GREENHOUSE "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Tabs"], {
        greenhouses: $setup.props.greenhouses,
        modelValue: $setup.activeGH,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $setup.activeGH = $event;
        })
      }, null, 8 /* PROPS */, ["greenhouses", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" INFO CARD: Time & Latest Data (sama seperti Monitoring) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Time", -1 /* HOISTED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["DigitalClock"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Latest Data", -1 /* HOISTED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentLatestTime), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAP + LEGEND "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAP "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, null, 512 /* NEED_PATCH */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" LEGEND MOBILE (Horizontal, always visible on mobile) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.label) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.unit) + ")", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.min), 1 /* TEXT */), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "edge-label"
      }, "Aman", -1 /* HOISTED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "legend-mobile-bar",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.legendGradientStyleHorizontal)
      }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.max), 1 /* TEXT */), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "edge-label"
      }, "Kritis", -1 /* HOISTED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" LEGEND DESKTOP (Vertical, sidebar on desktop) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.label) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.unit) + ") ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Legend Bar (skala langsung dari threshold min ke max) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "legend-bar",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.legendGradientStyle)
      }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Scale Labels (dynamic) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.max), 1 /* TEXT */), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */)), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Kritis"))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($setup.currentConfig.max * 0.75)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($setup.currentConfig.max * 0.5)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($setup.currentConfig.max * 0.25)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentConfig.min), 1 /* TEXT */), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Aman"))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" PARAMETER BUTTON "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["param-btn", $setup.activeParameter === 'temperature' ? 'param-active' : 'param-inactive']),
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $setup.activeParameter = 'temperature';
        })
      }, " Temperature ", 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["param-btn", $setup.activeParameter === 'humidity' ? 'param-active' : 'param-inactive']),
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $setup.activeParameter = 'humidity';
        })
      }, " Humidity ", 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["param-btn", $setup.activeParameter === 'lux' ? 'param-active' : 'param-inactive']),
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return $setup.activeParameter = 'lux';
        })
      }, " Light Intensity ", 2 /* CLASS */)])])])];
    }),
    _: 1 /* STABLE */
  })], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n\r\n/* ===========================\r\n   LAYOUT - RESPONSIVE\r\n   =========================== */\n.heatmap-layout[data-v-373293d3] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n  margin-top: 1rem;\n}\n@media (min-width: 1024px) {\n.heatmap-layout[data-v-373293d3] {\r\n    flex-direction: row;\n}\n}\r\n\r\n/* ===========================\r\n   MAP CONTAINER\r\n   =========================== */\n.map-container[data-v-373293d3] {\r\n  flex: 1;\r\n  background: white;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n  /* Mobile: full rounded */\r\n  border-radius: 0.5rem;\r\n  padding: 0.75rem;\n}\n@media (min-width: 640px) {\n.map-container[data-v-373293d3] {\r\n    padding: 1rem;\n}\n}\n@media (min-width: 1024px) {\n.map-container[data-v-373293d3] {\r\n    /* Desktop: bottom-left not rounded (button attached) */\r\n    border-radius: 0.5rem 0.5rem 0.5rem 0;\n}\n}\n.map-view[data-v-373293d3] {\r\n  width: 100%;\r\n  height: 280px; /* Mobile default */\r\n  border: 1px solid #d1d5db;\r\n  border-radius: 0.5rem;\r\n  overflow: hidden;\n}\n@media (min-width: 480px) {\n.map-view[data-v-373293d3] {\r\n    height: 350px;\n}\n}\n@media (min-width: 640px) {\n.map-view[data-v-373293d3] {\r\n    height: 400px;\n}\n}\n@media (min-width: 1024px) {\n.map-view[data-v-373293d3] {\r\n    height: 450px;\n}\n}\r\n\r\n/* ===========================\r\n   LEGEND MOBILE (Horizontal)\r\n   =========================== */\n.legend-mobile[data-v-373293d3] {\r\n  display: block;\r\n  background: #f9fafb;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 0.5rem;\r\n  padding: 0.5rem 0.75rem;\n}\n@media (min-width: 1024px) {\n.legend-mobile[data-v-373293d3] {\r\n    display: none;\n}\n}\n.legend-mobile-title[data-v-373293d3] {\r\n  font-size: 0.875rem;\r\n  font-weight: 600;\r\n  color: #374151;\r\n  text-align: center;\r\n  margin-bottom: 0.5rem;\n}\n.legend-mobile-content[data-v-373293d3] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 0.5rem;\n}\n.legend-mobile-edge[data-v-373293d3] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  line-height: 1.1;\n}\n.legend-mobile-edge .edge-value[data-v-373293d3] {\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n  color: #374151;\n}\n.legend-mobile-edge .edge-label[data-v-373293d3] {\r\n  font-size: 11px;\r\n  font-weight: 400;\r\n  color: #6b7280;\n}\n.legend-mobile-bar[data-v-373293d3] {\r\n  position: relative;\r\n  flex: 1;\r\n  max-width: 180px;\r\n  height: 16px;\r\n  border-radius: 8px;\n}\r\n\r\n/* ===========================\r\n   LEGEND DESKTOP (Vertical)\r\n   =========================== */\n.legend-desktop[data-v-373293d3] {\r\n  display: none;\r\n  background: #f9fafb;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 0.5rem;\r\n  padding: 1rem;\r\n  min-width: 160px;\n}\n@media (min-width: 1024px) {\n.legend-desktop[data-v-373293d3] {\r\n    display: block;\n}\n}\n.legend-desktop-content[data-v-373293d3] {\r\n  display: flex;\r\n  gap: 0.75rem;\r\n  align-items: stretch;\r\n  justify-content: center;\r\n  height: 380px;\n}\r\n\r\n/* ===========================\r\n   LEGEND BAR (Desktop)\r\n   =========================== */\n.legend-bar-container[data-v-373293d3] {\r\n  position: relative;\r\n  width: 22px;\n}\n.legend-bar[data-v-373293d3] {\r\n  width: 22px;\r\n  height: 100%;\r\n  border-radius: 12px;\n}\n.legend-labels[data-v-373293d3] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  font-size: 12px;\r\n  color: #4b5563;\r\n  text-align: center;\n}\r\n\r\n/* ===========================\r\n   PARAMETER BUTTONS\r\n   =========================== */\n.param-buttons[data-v-373293d3] {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  overflow-x: auto;\r\n  -webkit-overflow-scrolling: touch;\r\n  scrollbar-width: none;\r\n  margin-top: 0.75rem;\n}\n.param-buttons[data-v-373293d3]::-webkit-scrollbar {\r\n  display: none;\n}\n@media (min-width: 1024px) {\n.param-buttons[data-v-373293d3] {\r\n    gap: 0.25rem;\r\n    margin-top: 0;\n}\n}\n.param-btn[data-v-373293d3] {\r\n  flex: 1;\r\n  min-width: 0;\r\n  padding: 0.65rem 0.5rem;\r\n  font-size: 0.875rem;\r\n  /* Mobile: full rounded */\r\n  border-radius: 0.5rem;\r\n  border: 1px solid #d1d5db;\r\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\r\n  transition: all 0.2s ease;\r\n  white-space: nowrap;\r\n  text-align: center;\n}\n@media (min-width: 1024px) {\n.param-btn[data-v-373293d3] {\r\n    flex: none;\r\n    padding: 0.5rem 1rem;\r\n    font-size: 0.875rem;\r\n    /* Desktop: only bottom rounded (attached to map) */\r\n    border-radius: 0;\r\n    border-bottom-left-radius: 0.375rem;\r\n    border-bottom-right-radius: 0.375rem;\r\n    border: none;\r\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n}\n}\n.param-active[data-v-373293d3] {\r\n  background-color: #ffffff;\r\n  color: #4b5563;\n}\n.param-inactive[data-v-373293d3] {\r\n  background-color: #e5e7eb;\r\n  color: #4b5563;\n}\n.param-inactive[data-v-373293d3]:active,\r\n.param-inactive[data-v-373293d3]:hover {\r\n  background-color: #d1d5db;\r\n  color: #374151;\n}\n.leaflet-container[data-v-373293d3] {\r\n  background: #f9fafb;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* MARKER STYLES (global, tidak scoped) */\n.custom-marker {\r\n  background: transparent;\r\n  border: none;\n}\n.marker-pin {\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 3px solid white;\r\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\r\n  cursor: pointer;\r\n  transition: transform 0.2s ease;\n}\n.marker-pin:hover {\r\n  transform: scale(1.2);\n}\n.marker-number {\r\n  color: white;\r\n  font-weight: bold;\r\n  font-size: 12px;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n}\r\n\r\n/* POPUP STYLES */\n.node-popup .leaflet-popup-content-wrapper {\r\n  border-radius: 12px;\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.node-popup .leaflet-popup-content {\r\n  margin: 12px 16px;\n}\n.node-popup .leaflet-popup-tip {\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\r\n\r\n/* Popup untuk node atas - panah mengarah ke atas */\n.popup-bottom.leaflet-popup .leaflet-popup-tip-container {\r\n  top: -1px !important;\r\n  bottom: auto !important;\r\n  margin-top: 0 !important;\r\n  transform: rotate(180deg) !important;\n}\n.popup-bottom.leaflet-popup .leaflet-popup-content-wrapper {\r\n  margin-top: 13px;\n}\r\n\r\n/* Turunkan z-index Leaflet controls agar tidak muncul di atas sidebar mobile */\n.leaflet-control-container,\r\n.leaflet-control-container .leaflet-top,\r\n.leaflet-control-container .leaflet-left,\r\n.leaflet-control-container .leaflet-right,\r\n.leaflet-control-container .leaflet-bottom,\r\n.leaflet-top.leaflet-left,\r\n.leaflet-top.leaflet-right,\r\n.leaflet-control-zoom,\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out,\r\n.leaflet-control {\r\n  z-index: 500 !important;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./resources/js/Components/ApplicationLogo.vue":
/*!*****************************************************!*\
  !*** ./resources/js/Components/ApplicationLogo.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ApplicationLogo_vue_vue_type_template_id_3ac4aa20__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApplicationLogo.vue?vue&type=template&id=3ac4aa20 */ "./resources/js/Components/ApplicationLogo.vue?vue&type=template&id=3ac4aa20");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");

const script = {}

;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(script, [['render',_ApplicationLogo_vue_vue_type_template_id_3ac4aa20__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/ApplicationLogo.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/ApplicationLogo.vue?vue&type=template&id=3ac4aa20":
/*!***********************************************************************************!*\
  !*** ./resources/js/Components/ApplicationLogo.vue?vue&type=template&id=3ac4aa20 ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ApplicationLogo_vue_vue_type_template_id_3ac4aa20__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ApplicationLogo_vue_vue_type_template_id_3ac4aa20__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ApplicationLogo.vue?vue&type=template&id=3ac4aa20 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ApplicationLogo.vue?vue&type=template&id=3ac4aa20");


/***/ }),

/***/ "./resources/js/Components/DigitalClock.vue":
/*!**************************************************!*\
  !*** ./resources/js/Components/DigitalClock.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalClock.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_template_id_22760da1__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalClock_vue_vue_type_template_id_22760da1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalClock.vue?vue&type=template&id=22760da1 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DigitalClock.vue?vue&type=template&id=22760da1");


/***/ }),

/***/ "./resources/js/Components/Dropdown.vue":
/*!**********************************************!*\
  !*** ./resources/js/Components/Dropdown.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dropdown.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc":
/*!****************************************************************************!*\
  !*** ./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_template_id_4210c0dc__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Dropdown_vue_vue_type_template_id_4210c0dc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Dropdown.vue?vue&type=template&id=4210c0dc */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Dropdown.vue?vue&type=template&id=4210c0dc");


/***/ }),

/***/ "./resources/js/Components/DropdownLink.vue":
/*!**************************************************!*\
  !*** ./resources/js/Components/DropdownLink.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DropdownLink.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_template_id_6e0ef414__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DropdownLink_vue_vue_type_template_id_6e0ef414__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DropdownLink.vue?vue&type=template&id=6e0ef414 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/DropdownLink.vue?vue&type=template&id=6e0ef414");


/***/ }),

/***/ "./resources/js/Components/NavLink.vue":
/*!*********************************************!*\
  !*** ./resources/js/Components/NavLink.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NavLink.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2":
/*!***************************************************************************!*\
  !*** ./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_template_id_337232c2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavLink_vue_vue_type_template_id_337232c2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NavLink.vue?vue&type=template&id=337232c2 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/NavLink.vue?vue&type=template&id=337232c2");


/***/ }),

/***/ "./resources/js/Components/Tabs.vue":
/*!******************************************!*\
  !*** ./resources/js/Components/Tabs.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tabs.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e":
/*!************************************************************************!*\
  !*** ./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_template_id_8d60f96e__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tabs_vue_vue_type_template_id_8d60f96e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tabs.vue?vue&type=template&id=8d60f96e */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Tabs.vue?vue&type=template&id=8d60f96e");


/***/ }),

/***/ "./resources/js/Layouts/Authenticated.vue":
/*!************************************************!*\
  !*** ./resources/js/Layouts/Authenticated.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Authenticated.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a":
/*!******************************************************************************!*\
  !*** ./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_template_id_7412da4a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Authenticated_vue_vue_type_template_id_7412da4a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Authenticated.vue?vue&type=template&id=7412da4a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Layouts/Authenticated.vue?vue&type=template&id=7412da4a");


/***/ }),

/***/ "./resources/js/Pages/Heatmap.vue":
/*!****************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css":
/*!************************************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_0_id_373293d3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=0&id=373293d3&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css":
/*!************************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_style_index_1_id_373293d3_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=style&index=1&id=373293d3&lang=css");


/***/ }),

/***/ "./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true":
/*!**********************************************************************************!*\
  !*** ./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_template_id_373293d3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Heatmap_vue_vue_type_template_id_373293d3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Heatmap.vue?vue&type=template&id=373293d3&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Heatmap.vue?vue&type=template&id=373293d3&scoped=true");


/***/ })

}]);