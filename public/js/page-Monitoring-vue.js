"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-Monitoring-vue"],{

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=script&setup=true&lang=js"
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=script&setup=true&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



// Props

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Chart',
  props: {
    data: {
      type: Array,
      "default": function _default() {
        return [12, 19, 3, 5, 2, 3];
      }
    },
    label: {
      type: Array,
      "default": function _default() {
        return ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
      }
    },
    id: {
      type: Number,
      required: true
    },
    sensor_name: {
      type: String,
      "default": ""
    },
    chartColor: {
      type: Object,
      "default": function _default() {
        return {
          background: "rgba(75, 192, 192, 0.2)",
          border: "rgba(75, 192, 192, 1)"
        };
      }
    },
    datasets: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    subtitle: {
      type: String,
      "default": ""
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var props = __props;
    var canvasRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    var chartInstance = (0,vue__WEBPACK_IMPORTED_MODULE_0__.shallowRef)(null);
    var chartStructureSignature = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)("");
    var isLightIntensitySensor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var sensorName = String(props.sensor_name || "").trim().toLowerCase();
      return sensorName === "light intensity" || sensorName === "light_intensity" || sensorName === "intensitas cahaya";
    });
    var getDecimalPlaces = function getDecimalPlaces() {
      return isLightIntensitySensor.value ? 0 : 2;
    };
    var formatSensorValue = function formatSensorValue(value) {
      var numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return value;
      }
      return numericValue.toFixed(getDecimalPlaces());
    };
    var normalizeDatasetValue = function normalizeDatasetValue(value) {
      if (value === null || value === undefined) {
        return null;
      }
      var numericValue = Number(value);
      return Number.isFinite(numericValue) ? numericValue : value;
    };
    var normalizeDatasetSeries = function normalizeDatasetSeries() {
      var series = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return series.map(function (value) {
        return normalizeDatasetValue(value);
      });
    };
    var normalizeNumberOption = function normalizeNumberOption(value, fallback) {
      var parsedValue = Number(value);
      return Number.isFinite(parsedValue) ? parsedValue : fallback;
    };
    var normalizeBooleanOption = function normalizeBooleanOption(value) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (value === undefined || value === null) {
        return fallback;
      }
      return Boolean(value);
    };
    var normalizeDataset = function normalizeDataset() {
      var _safeDataset$backgrou, _safeDataset$borderCo;
      var dataset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var safeDataset = dataset && _typeof(dataset) === "object" ? dataset : {};
      return {
        label: safeDataset.label !== undefined && safeDataset.label !== null ? String(safeDataset.label) : "".concat(props.sensor_name || "Series", " ").concat(index + 1),
        data: normalizeDatasetSeries(Array.isArray(safeDataset.data) ? safeDataset.data : []),
        backgroundColor: (_safeDataset$backgrou = safeDataset.backgroundColor) !== null && _safeDataset$backgrou !== void 0 ? _safeDataset$backgrou : props.chartColor.background,
        borderColor: (_safeDataset$borderCo = safeDataset.borderColor) !== null && _safeDataset$borderCo !== void 0 ? _safeDataset$borderCo : props.chartColor.border,
        borderWidth: normalizeNumberOption(safeDataset.borderWidth, 2),
        tension: normalizeNumberOption(safeDataset.tension, 0.35),
        pointRadius: normalizeNumberOption(safeDataset.pointRadius, 2.5),
        pointHoverRadius: normalizeNumberOption(safeDataset.pointHoverRadius, 4),
        fill: normalizeBooleanOption(safeDataset.fill, false)
      };
    };
    var buildDefaultDataset = function buildDefaultDataset() {
      return [{
        label: String(props.sensor_name || ""),
        data: normalizeDatasetSeries(Array.isArray(props.data) ? _toConsumableArray(props.data) : []),
        backgroundColor: props.chartColor.background,
        borderColor: props.chartColor.border,
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        fill: false
      }];
    };
    var getDatasetSource = function getDatasetSource() {
      var datasets = Array.isArray(props.datasets) ? props.datasets : [];
      if (!datasets.length) {
        return buildDefaultDataset();
      }
      return datasets.map(function (dataset, index) {
        return normalizeDataset(dataset, index);
      });
    };
    var getChartLabels = function getChartLabels() {
      if (!Array.isArray(props.label)) {
        return [];
      }
      return props.label.map(function (label) {
        return label === null || label === undefined ? "" : String(label);
      });
    };
    var getChartOptions = function getChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
        interaction: {
          mode: "nearest",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        plugins: {
          legend: {
            position: "top",
            display: true
          },
          tooltip: {
            callbacks: {
              label: function label(tooltipItem) {
                var rawValue = tooltipItem.raw;
                var formattedValue = rawValue === null || rawValue === undefined ? "-" : formatSensorValue(rawValue);
                return "".concat(tooltipItem.dataset.label, ": ").concat(formattedValue);
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: Boolean(props.subtitle),
              text: props.subtitle
            }
          },
          y: {
            beginAtZero: false,
            ticks: {
              callback: function callback(value) {
                return formatSensorValue(value);
              }
            }
          }
        }
      };
    };
    var normalizeStructureValue = function normalizeStructureValue(value) {
      return value === null || value === undefined ? "" : String(value);
    };
    var buildChartStructureSignature = function buildChartStructureSignature() {
      var labels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var datasets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var safeLabels = Array.isArray(labels) ? labels : [];
      var safeDatasets = Array.isArray(datasets) ? datasets : [];
      var datasetSignature = safeDatasets.map(function (dataset, index) {
        var safeDataset = dataset && _typeof(dataset) === "object" ? dataset : {};
        return [index, normalizeStructureValue(safeDataset.label), Array.isArray(safeDataset.data) ? safeDataset.data.length : 0, normalizeStructureValue(safeDataset.fill), normalizeStructureValue(safeDataset.borderColor), normalizeStructureValue(safeDataset.backgroundColor)].join("|");
      }).join("||");
      return ["labels:".concat(safeLabels.length), "datasets:".concat(safeDatasets.length), datasetSignature].join("::");
    };
    var destroyChart = function destroyChart() {
      if (chartInstance.value !== null) {
        chartInstance.value.destroy();
        chartInstance.value = null;
      }
      chartStructureSignature.value = "";
    };
    var createChart = function createChart(chartLabels, datasetSource, structureSignature) {
      if (!canvasRef.value) {
        return;
      }
      var ctx = canvasRef.value.getContext("2d");
      if (!ctx) {
        return;
      }
      chartInstance.value = (0,vue__WEBPACK_IMPORTED_MODULE_0__.markRaw)(new chart_js_auto__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, {
        type: "line",
        data: {
          labels: chartLabels,
          datasets: datasetSource
        },
        options: getChartOptions()
      }));
      chartStructureSignature.value = structureSignature;
    };
    var upsertChart = function upsertChart() {
      if (!canvasRef.value) return;
      var chartLabels = getChartLabels();
      var datasetSource = getDatasetSource();
      var structureSignature = buildChartStructureSignature(chartLabels, datasetSource);
      if (chartInstance.value === null) {
        createChart(chartLabels, datasetSource, structureSignature);
        return;
      }
      if (chartStructureSignature.value !== structureSignature) {
        destroyChart();
        createChart(chartLabels, datasetSource, structureSignature);
        return;
      }
      var chart = chartInstance.value;
      if (!chart) {
        createChart(chartLabels, datasetSource, structureSignature);
        return;
      }
      try {
        var _chart$setActiveEleme, _chart$tooltip, _chart$tooltip$setAct;
        (_chart$setActiveEleme = chart.setActiveElements) === null || _chart$setActiveEleme === void 0 || _chart$setActiveEleme.call(chart, []);
        (_chart$tooltip = chart.tooltip) === null || _chart$tooltip === void 0 || (_chart$tooltip$setAct = _chart$tooltip.setActiveElements) === null || _chart$tooltip$setAct === void 0 || _chart$tooltip$setAct.call(_chart$tooltip, [], {
          x: 0,
          y: 0
        });
        chart.data.labels = chartLabels;
        chart.data.datasets = datasetSource;
        chart.update("none");
        chartStructureSignature.value = structureSignature;
      } catch (error) {
        console.error("Chart update failed, recreating chart instance.", error);
        destroyChart();
        createChart(chartLabels, datasetSource, structureSignature);
      }
    };
    var normalizeWatchValue = function normalizeWatchValue(value) {
      return value === null || value === undefined ? "" : String(value);
    };
    var toListSignature = function toListSignature() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return Array.isArray(list) ? list.map(function (item) {
        return normalizeWatchValue(item);
      }).join("\x01") : "";
    };
    var buildDatasetSignature = function buildDatasetSignature() {
      var dataset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var safeDataset = dataset && _typeof(dataset) === "object" ? dataset : {};
      return [normalizeWatchValue(safeDataset.label), toListSignature(Array.isArray(safeDataset.data) ? safeDataset.data : []), normalizeWatchValue(safeDataset.borderColor), normalizeWatchValue(safeDataset.backgroundColor), normalizeWatchValue(safeDataset.borderWidth), normalizeWatchValue(safeDataset.tension), normalizeWatchValue(safeDataset.pointRadius), normalizeWatchValue(safeDataset.pointHoverRadius), normalizeWatchValue(safeDataset.fill)].join("|");
    };
    var buildWatchSignature = function buildWatchSignature() {
      var _props$chartColor, _props$chartColor2;
      var labelSignature = toListSignature(getChartLabels());
      var dataSignature = toListSignature(Array.isArray(props.data) ? props.data : []);
      var datasets = Array.isArray(props.datasets) ? props.datasets : [];
      var datasetSignature = datasets.map(function (dataset) {
        return buildDatasetSignature(dataset);
      }).join("||");
      return [normalizeWatchValue(props.sensor_name), normalizeWatchValue((_props$chartColor = props.chartColor) === null || _props$chartColor === void 0 ? void 0 : _props$chartColor.background), normalizeWatchValue((_props$chartColor2 = props.chartColor) === null || _props$chartColor2 === void 0 ? void 0 : _props$chartColor2.border), normalizeWatchValue(props.subtitle), labelSignature, dataSignature, datasetSignature].join("::");
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(buildWatchSignature, upsertChart, {
      flush: "post"
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(upsertChart);
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(function () {
      destroyChart();
    });
    var __returned__ = {
      props: props,
      canvasRef: canvasRef,
      chartInstance: chartInstance,
      chartStructureSignature: chartStructureSignature,
      isLightIntensitySensor: isLightIntensitySensor,
      getDecimalPlaces: getDecimalPlaces,
      formatSensorValue: formatSensorValue,
      normalizeDatasetValue: normalizeDatasetValue,
      normalizeDatasetSeries: normalizeDatasetSeries,
      normalizeNumberOption: normalizeNumberOption,
      normalizeBooleanOption: normalizeBooleanOption,
      normalizeDataset: normalizeDataset,
      buildDefaultDataset: buildDefaultDataset,
      getDatasetSource: getDatasetSource,
      getChartLabels: getChartLabels,
      getChartOptions: getChartOptions,
      normalizeStructureValue: normalizeStructureValue,
      buildChartStructureSignature: buildChartStructureSignature,
      destroyChart: destroyChart,
      createChart: createChart,
      upsertChart: upsertChart,
      normalizeWatchValue: normalizeWatchValue,
      toListSignature: toListSignature,
      buildDatasetSignature: buildDatasetSignature,
      buildWatchSignature: buildWatchSignature,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onBeforeUnmount: vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount,
      markRaw: vue__WEBPACK_IMPORTED_MODULE_0__.markRaw,
      shallowRef: vue__WEBPACK_IMPORTED_MODULE_0__.shallowRef,
      get Chart() {
        return chart_js_auto__WEBPACK_IMPORTED_MODULE_1__["default"];
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=script&lang=js"
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "GaugeComponent",
  props: {
    value: {
      type: Number,
      "default": 50
    },
    thd_min: {
      type: Number,
      "default": 0
    },
    thd_max: {
      type: Number,
      "default": 100
    },
    symbol: {
      type: String,
      "default": ""
    },
    title: {
      type: String,
      "default": ""
    },
    id: {
      type: Number
    }
  },
  data: function data() {
    return {
      gaugeInstance: null
    };
  },
  mounted: function mounted() {
    this.createGauge();
  },
  beforeUnmount: function beforeUnmount() {
    if (this.gaugeInstance && typeof this.gaugeInstance.destroy === "function") {
      this.gaugeInstance.destroy();
    }
    this.gaugeInstance = null;
  },
  watch: {
    value: function value(newValue) {
      if (this.gaugeInstance && typeof this.gaugeInstance.refresh === "function") {
        this.gaugeInstance.refresh(this.normalizeValue(newValue));
      }
    }
  },
  methods: {
    isLightIntensityGauge: function isLightIntensityGauge() {
      var normalizedTitle = String(this.title || "").trim().toLowerCase();
      var normalizedSymbol = String(this.symbol || "").trim().toLowerCase();
      return normalizedTitle === "light intensity" || normalizedTitle === "light_intensity" || normalizedTitle === "intensitas cahaya" || normalizedSymbol === "lux";
    },
    getDecimalPlaces: function getDecimalPlaces() {
      return this.isLightIntensityGauge() ? 0 : 2;
    },
    normalizeValue: function normalizeValue(value) {
      var numericValue = Number(value);
      return Number.isFinite(numericValue) ? numericValue : 0;
    },
    formatGaugeValue: function formatGaugeValue(value) {
      var numericValue = Number(value);
      if (!Number.isFinite(numericValue)) {
        return "-";
      }
      return numericValue.toFixed(this.getDecimalPlaces());
    },
    createGauge: function createGauge() {
      var _this = this;
      var gaugeId = "gauge-container-" + this.id;
      var decimalPlaces = this.getDecimalPlaces();
      this.gaugeInstance = new JustGage({
        id: gaugeId,
        value: this.normalizeValue(this.value),
        min: this.thd_min,
        max: this.thd_max,
        title: this.title,
        symbol: " " + this.symbol,
        gaugeWidthScale: 1.0,
        humanFriendly: false,
        humanFriendlyDecimal: decimalPlaces,
        startAnimationType: "bounce",
        decimals: decimalPlaces,
        textRenderer: function textRenderer(value) {
          return _this.formatGaugeValue(value);
        },
        relativeGaugeSize: true,
        pointer: true,
        pointerOptions: {
          length: 0.9,
          width: 0.03
        },
        counter: true
      });
    }
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=script&setup=true&lang=js"
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=script&setup=true&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/vue3 */ "./node_modules/@inertiajs/vue3/dist/index.esm.js");
/* harmony import */ var _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Layouts/Authenticated.vue */ "./resources/js/Layouts/Authenticated.vue");
/* harmony import */ var _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Tabs.vue */ "./resources/js/Components/Tabs.vue");
/* harmony import */ var _Components_Gauge_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Gauge.vue */ "./resources/js/Components/Gauge.vue");
/* harmony import */ var _Components_Chart_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Components/Chart.vue */ "./resources/js/Components/Chart.vue");
/* harmony import */ var _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Components/DigitalClock.vue */ "./resources/js/Components/DigitalClock.vue");
/* harmony import */ var _Components_Button_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/Components/Button.vue */ "./resources/js/Components/Button.vue");
/* harmony import */ var _vuepic_vue_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @vuepic/vue-datepicker */ "./node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js");
/* harmony import */ var _vuepic_vue_datepicker_dist_main_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @vuepic/vue-datepicker/dist/main.css */ "./node_modules/@vuepic/vue-datepicker/dist/main.css");
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/index.mjs");
/* harmony import */ var _composables_useLocale__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/composables/useLocale */ "./resources/js/composables/useLocale.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }












var CHART_CACHE_TTL_MS = 60000;
var CHART_CACHE_LIMIT = 200;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'Monitoring',
  setup: function setup(__props, _ref) {
    var _greenhouses$value$;
    var __expose = _ref.expose;
    __expose();
    var toast = (0,vue_toastification__WEBPACK_IMPORTED_MODULE_10__.useToast)();
    var _useLocale = (0,_composables_useLocale__WEBPACK_IMPORTED_MODULE_11__.useLocale)(),
      t = _useLocale.t,
      locale = _useLocale.locale;
    var page = (0,_inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.usePage)();
    var greenhouses = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return page.props.greenhouses || [];
    });
    var gaugeData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return page.props.gaugeData || [];
    });
    var latestData = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return page.props.latestData || [];
    });
    var actuatorStatus = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return page.props.actuatorStatus || {};
    });
    var activeTab = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)((_greenhouses$value$ = greenhouses.value[0]) === null || _greenhouses$value$ === void 0 ? void 0 : _greenhouses$value$.id);
    var data = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var datetime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var isFetching = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var chartResponseCache = new Map();
    var chartMode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var chartRange = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var mobileFilterOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var mobileRangeOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var chartAbortControllers = new Map();
    var chartRequestTokens = new Map();
    var abortChartRequest = function abortChartRequest(sensorId) {
      var controller = chartAbortControllers.get(sensorId);
      if (!controller) {
        return;
      }
      controller.abort();
      chartAbortControllers["delete"](sensorId);
    };
    var abortAllChartRequests = function abortAllChartRequests() {
      chartAbortControllers.forEach(function (controller) {
        return controller.abort();
      });
      chartAbortControllers.clear();
    };
    var chartRangeOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return [{
        value: "today",
        label: t("monitoring.range_today")
      }, {
        value: "last_1h",
        label: t("monitoring.range_1h")
      }, {
        value: "last_1d",
        label: t("monitoring.range_1d")
      }, {
        value: "last_1w",
        label: t("monitoring.range_1w")
      }, {
        value: "last_1m",
        label: t("monitoring.range_1m")
      }];
    });
    var datePickerLocale = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return locale.value === "id" ? "id-ID" : "en-US";
    });
    var getSensorLabel = function getSensorLabel() {
      var sensorName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var normalized = String(sensorName).trim().toLowerCase();
      if (normalized === "temperature") {
        return t("sensor.temperature");
      }
      if (normalized === "humidity") {
        return t("sensor.humidity");
      }
      if (normalized === "light intensity" || normalized === "light_intensity") {
        return t("sensor.light_intensity");
      }
      return sensorName;
    };
    var getNodeLabel = function getNodeLabel(nodeId) {
      return "".concat(t("table.node"), " ").concat(nodeId);
    };
    var parseBucketDate = function parseBucketDate(bucket) {
      if (!bucket) {
        return null;
      }
      var normalized = String(bucket).includes("T") ? String(bucket) : String(bucket).includes(" ") ? String(bucket).replace(" ", "T") : "".concat(bucket, "T00:00:00");
      var parsedDate = new Date(normalized);
      if (Number.isNaN(parsedDate.getTime())) {
        return null;
      }
      return parsedDate;
    };
    var formatDayMonthLabel = function formatDayMonthLabel(date) {
      var _parts$find, _parts$find2;
      var formatter = new Intl.DateTimeFormat(datePickerLocale.value, {
        day: "2-digit",
        month: "short"
      });
      var parts = formatter.formatToParts(date);
      var day = (_parts$find = parts.find(function (part) {
        return part.type === "day";
      })) === null || _parts$find === void 0 ? void 0 : _parts$find.value;
      var month = (_parts$find2 = parts.find(function (part) {
        return part.type === "month";
      })) === null || _parts$find2 === void 0 ? void 0 : _parts$find2.value;
      return day && month ? "".concat(day, " ").concat(month) : formatter.format(date);
    };
    var formatHourMinuteLabel = function formatHourMinuteLabel(date) {
      return new Intl.DateTimeFormat(datePickerLocale.value, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(date);
    };
    var localizeBucketLabel = function localizeBucketLabel(bucket) {
      var bucketType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hour";
      var parsedDate = parseBucketDate(bucket);
      if (!parsedDate) {
        return bucket || "";
      }
      if (bucketType === "minute") {
        return formatHourMinuteLabel(parsedDate);
      }
      if (bucketType === "day") {
        return formatDayMonthLabel(parsedDate);
      }
      return "".concat(formatDayMonthLabel(parsedDate), " ").concat(formatHourMinuteLabel(parsedDate));
    };
    var localizeChartLabels = function localizeChartLabels() {
      var rawLabels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var bucketType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hour";
      return rawLabels.map(function (bucket) {
        return localizeBucketLabel(bucket, bucketType);
      });
    };
    var buildPerNodeDatasets = function buildPerNodeDatasets() {
      var datasets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return datasets.map(function (dataset) {
        var nodeId = Number(dataset.node_id || String(dataset.label || "").replace(/[^\d]/g, ""));
        var color = getNodeColor(nodeId);
        return {
          label: getNodeLabel(nodeId),
          data: Array.isArray(dataset.data) ? dataset.data : [],
          borderColor: color,
          backgroundColor: hexToRgba(color, 0.18),
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 2.5,
          pointHoverRadius: 4,
          fill: false
        };
      });
    };
    var actuatorCards = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return [{
        key: "exhaust",
        name: t("monitoring.exhaust_fan"),
        icon: "fas fa-fan",
        color: "text-yellow-500"
      }, {
        key: "dehumidifier",
        name: t("monitoring.dehumidifier"),
        icon: "fas fa-tint",
        color: "text-cyan-500"
      }, {
        key: "blower",
        name: t("monitoring.blower"),
        icon: "fas fa-fan",
        color: "text-red-500"
      }];
    });
    var nodeColorMap = {
      1: "#3B82F6",
      2: "#FB7185",
      3: "#F59E0B",
      4: "#FACC15",
      5: "#22C55E",
      6: "#0EA5E9",
      7: "#EC4899",
      8: "#A855F7",
      9: "#F97316",
      10: "#14B8A6"
    };
    var hexToRgba = function hexToRgba(hex) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      var normalized = hex.replace("#", "");
      if (normalized.length !== 6) {
        return "rgba(59,130,246,".concat(alpha, ")");
      }
      var r = Number.parseInt(normalized.substring(0, 2), 16);
      var g = Number.parseInt(normalized.substring(2, 4), 16);
      var b = Number.parseInt(normalized.substring(4, 6), 16);
      return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
    };
    var getNodeColor = function getNodeColor(nodeId) {
      return nodeColorMap[nodeId] || "#64748B";
    };
    var getDateTime = function getDateTime(sensor_id) {
      var _datetime$value$senso;
      return (_datetime$value$senso = datetime.value[sensor_id]) !== null && _datetime$value$senso !== void 0 ? _datetime$value$senso : datetime.value[sensor_id] = {
        date: null,
        time: ""
      };
    };
    var getChartMode = function getChartMode(sensor_id) {
      if (!chartMode.value[sensor_id]) {
        chartMode.value[sensor_id] = "avg";
      }
      return chartMode.value[sensor_id];
    };
    var setChartMode = function setChartMode(sensor_id, mode) {
      chartMode.value[sensor_id] = mode;
      fetchData(sensor_id);
    };
    var getChartRange = function getChartRange(sensor_id) {
      if (!chartRange.value[sensor_id]) {
        chartRange.value[sensor_id] = "today";
      }
      return chartRange.value[sensor_id];
    };
    var isQuickRangeActive = function isQuickRangeActive(sensor_id) {
      return getChartRange(sensor_id) !== "custom";
    };
    var setChartRange = function setChartRange(sensor_id, range) {
      chartRange.value[sensor_id] = range;
      if (range !== "custom") {
        var dt = getDateTime(sensor_id);
        dt.date = null;
        dt.time = "";
      }
      fetchData(sensor_id);
    };
    var isChartRangeActive = function isChartRangeActive(sensor_id, range) {
      return getChartRange(sensor_id) === range;
    };
    var getChartRangeLabel = function getChartRangeLabel(sensor_id) {
      var _chartRangeOptions$va;
      return ((_chartRangeOptions$va = chartRangeOptions.value.find(function (option) {
        return option.value === getChartRange(sensor_id);
      })) === null || _chartRangeOptions$va === void 0 ? void 0 : _chartRangeOptions$va.label) || t("monitoring.range_custom");
    };
    var getActiveDateText = function getActiveDateText(sensor_id) {
      var range = getChartRange(sensor_id);
      if (range === "custom") {
        var dt = getDateTime(sensor_id);
        var formattedDate = formatDateRangeDisplay(dt.date);
        if (dt.time && (!Array.isArray(dt.date) || !dt.date[1])) {
          return "".concat(formattedDate, " ").concat(dt.time).trim();
        }
        return formattedDate || t("monitoring.range_custom");
      }
      var label = getChartRangeLabel(sensor_id);
      if (range === "today") {
        return "".concat(label, " (").concat(formatCompactDate(new Date()), ")");
      }
      return label;
    };
    var setCustomRangeFromDatePicker = function setCustomRangeFromDatePicker(sensor_id) {
      if (getChartRange(sensor_id) !== "custom") {
        chartRange.value[sensor_id] = "custom";
      }
    };
    var clearTime = function clearTime(sensorId) {
      if (datetime.value[sensorId]) {
        datetime.value[sensorId].time = "";
      }
    };
    var formatHour = function formatHour(hour) {
      return "".concat(hour.toString().padStart(2, "0"), ":00");
    };
    var isRangeSelected = function isRangeSelected(sensorId) {
      var selectedDate = getDateTime(sensorId).date;
      return Boolean(Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1]);
    };
    var isTimeFilterDisabled = function isTimeFilterDisabled(sensorId) {
      return isQuickRangeActive(sensorId) || isRangeSelected(sensorId);
    };
    var activeActuators = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var _actuatorStatus$value, _actuatorStatus$value2;
      var currentGhId = activeTab.value;
      var currentStatus = ((_actuatorStatus$value = actuatorStatus.value) === null || _actuatorStatus$value === void 0 ? void 0 : _actuatorStatus$value[currentGhId]) || ((_actuatorStatus$value2 = actuatorStatus.value) === null || _actuatorStatus$value2 === void 0 ? void 0 : _actuatorStatus$value2[String(currentGhId)]) || {};
      return actuatorCards.value.map(function (actuator) {
        var actuatorData = currentStatus[actuator.key] || {};
        return _objectSpread(_objectSpread({}, actuator), {}, {
          status: Boolean(actuatorData.status),
          mode: actuatorData.mode || "threshold",
          gatewayOnline: Boolean(actuatorData.gateway_online)
        });
      });
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
    var getChartColor = function getChartColor(sensorName) {
      var colors = {
        Temperature: {
          background: "rgba(255, 99, 132, 0.2)",
          border: "rgba(255, 99, 132, 1)"
        },
        Humidity: {
          background: "rgba(54, 162, 235, 0.2)",
          border: "rgba(54, 162, 235, 1)"
        },
        "Light Intensity": {
          background: "rgba(255, 159, 64, 0.2)",
          border: "rgba(255, 159, 64, 1)"
        }
      };
      return colors[sensorName] || {
        background: "rgba(201, 203, 207, 0.2)",
        border: "rgba(201, 203, 207, 1)"
      };
    };

    // Static gauge scale based on sensor type
    var getGaugeScale = function getGaugeScale(sensorName) {
      var scales = {
        Temperature: {
          min: 0,
          max: 40
        },
        Humidity: {
          min: 0,
          max: 100
        },
        "Light Intensity": {
          min: 0,
          max: 65535
        }
      };
      return scales[sensorName] || {
        min: 0,
        max: 100
      };
    };
    var populateData = function populateData() {
      gaugeData.value.forEach(function (gauge) {
        if (!data.value[gauge.gh_id]) {
          data.value[gauge.gh_id] = {
            gauge: {},
            chart: {}
          };
        }
        if (!data.value[gauge.gh_id].chart[gauge.sensor_id]) {
          data.value[gauge.gh_id].chart[gauge.sensor_id] = {};
        }

        // Inisialisasi filter date jika belum ada
        getDateTime(gauge.sensor_id);
        getChartMode(gauge.sensor_id);
        getChartRange(gauge.sensor_id);

        // Data gauge
        data.value[gauge.gh_id].gauge[gauge.sensor_id] = gauge.avg_value || 0;
      });
    };
    var formatDate = function formatDate(date) {
      if (!date) {
        return "";
      }
      var parsedDate = date instanceof Date ? date : new Date(date);
      if (Number.isNaN(parsedDate.getTime())) {
        return "";
      }
      return parsedDate.toISOString().split("T")[0];
    };
    var formatCompactDate = function formatCompactDate(date) {
      if (!date) {
        return "";
      }
      var parsedDate = date instanceof Date ? date : new Date(date);
      if (Number.isNaN(parsedDate.getTime())) {
        return "";
      }
      var day = String(parsedDate.getDate()).padStart(2, "0");
      var month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      return "".concat(day, "/").concat(month);
    };
    var formatDateRangeDisplay = function formatDateRangeDisplay(value) {
      if (Array.isArray(value)) {
        var _value = _slicedToArray(value, 2),
          startDate = _value[0],
          endDate = _value[1];
        if (startDate && endDate) {
          return "".concat(formatCompactDate(startDate), "-").concat(formatCompactDate(endDate));
        }
        if (startDate) {
          return "".concat(formatCompactDate(startDate), "-");
        }
        return "";
      }
      return formatCompactDate(value);
    };
    var buildChartQueryData = function buildChartQueryData(sensor_id) {
      var selectedRange = getChartRange(sensor_id);
      var selectedDate = getDateTime(sensor_id).date;
      var hasDateRange = Boolean(Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1]);
      return {
        sensor_id: sensor_id,
        gh_id: activeTab.value,
        mode: getChartMode(sensor_id),
        range: selectedRange,
        date_start: selectedRange === "custom" ? formatDate(selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate[0]) : "",
        date_end: selectedRange === "custom" ? formatDate(selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate[1]) : "",
        time: selectedRange === "custom" && !hasDateRange ? getDateTime(sensor_id).time : ""
      };
    };
    var buildChartCacheKey = function buildChartCacheKey(queryData) {
      return JSON.stringify(queryData);
    };
    var getChartCachedPayload = function getChartCachedPayload(cacheKey) {
      var cached = chartResponseCache.get(cacheKey);
      if (!cached) {
        return null;
      }
      if (Date.now() - cached.timestamp > CHART_CACHE_TTL_MS) {
        chartResponseCache["delete"](cacheKey);
        return null;
      }
      return cached.payload;
    };
    var setChartCachedPayload = function setChartCachedPayload(cacheKey, payload) {
      if (chartResponseCache.size >= CHART_CACHE_LIMIT) {
        var oldestKey = chartResponseCache.keys().next().value;
        chartResponseCache["delete"](oldestKey);
      }
      chartResponseCache.set(cacheKey, {
        timestamp: Date.now(),
        payload: payload
      });
    };
    var applyChartPayload = function applyChartPayload(ghId, sensor_id, payload) {
      var _gaugeData$value$find;
      if (!ghId) {
        return;
      }
      if (!data.value[ghId]) {
        data.value[ghId] = {
          gauge: {},
          chart: {}
        };
      }
      if (!data.value[ghId].chart[sensor_id]) {
        data.value[ghId].chart[sensor_id] = {};
      }
      var isPerNode = Array.isArray(payload === null || payload === void 0 ? void 0 : payload.datasets) && payload.datasets.length > 0;
      var chartRawLabels = Array.isArray(payload === null || payload === void 0 ? void 0 : payload.raw_labels) && payload.raw_labels.length > 0 ? payload.raw_labels : Array.isArray(payload === null || payload === void 0 ? void 0 : payload.label) ? payload.label : [];
      var chartRawDatasets = isPerNode ? Array.isArray(payload === null || payload === void 0 ? void 0 : payload.datasets) ? payload.datasets : [] : [];
      var bucketType = (payload === null || payload === void 0 ? void 0 : payload.bucket_type) || "hour";
      var chartDatasets = isPerNode ? buildPerNodeDatasets(chartRawDatasets) : [];
      data.value[ghId].chart[sensor_id] = {
        chartData: Array.isArray(payload === null || payload === void 0 ? void 0 : payload.data) ? payload.data : [],
        chartLabel: localizeChartLabels(chartRawLabels, bucketType),
        chartRawLabels: chartRawLabels,
        chartRawDatasets: chartRawDatasets,
        bucketType: bucketType,
        chartColor: getChartColor((_gaugeData$value$find = gaugeData.value.find(function (s) {
          return s.sensor_id == sensor_id;
        })) === null || _gaugeData$value$find === void 0 ? void 0 : _gaugeData$value$find.name),
        chartDatasets: chartDatasets,
        chartMode: (payload === null || payload === void 0 ? void 0 : payload.mode) || getChartMode(sensor_id)
      };
    };
    var normalizeChartPayload = function normalizeChartPayload(payload) {
      return {
        mode: (payload === null || payload === void 0 ? void 0 : payload.mode) === "per_node" ? "per_node" : "avg",
        label: Array.isArray(payload === null || payload === void 0 ? void 0 : payload.label) ? payload.label : [],
        raw_labels: Array.isArray(payload === null || payload === void 0 ? void 0 : payload.raw_labels) ? payload.raw_labels : [],
        bucket_type: (payload === null || payload === void 0 ? void 0 : payload.bucket_type) || "hour",
        data: Array.isArray(payload === null || payload === void 0 ? void 0 : payload.data) ? payload.data : [],
        datasets: Array.isArray(payload === null || payload === void 0 ? void 0 : payload.datasets) ? payload.datasets : []
      };
    };
    var relocalizeLoadedCharts = function relocalizeLoadedCharts() {
      Object.values(data.value).forEach(function (ghData) {
        var chartEntries = ghData === null || ghData === void 0 ? void 0 : ghData.chart;
        if (!chartEntries) {
          return;
        }
        Object.values(chartEntries).forEach(function (entry) {
          if (!entry) {
            return;
          }
          var nextRawLabels = Array.isArray(entry.chartRawLabels) ? entry.chartRawLabels : Array.isArray(entry.chartLabel) ? entry.chartLabel : [];
          var nextBucketType = entry.bucketType || "hour";
          entry.chartLabel = localizeChartLabels(nextRawLabels, nextBucketType);
          if (Array.isArray(entry.chartRawDatasets) && entry.chartRawDatasets.length > 0) {
            entry.chartDatasets = buildPerNodeDatasets(entry.chartRawDatasets);
          }
        });
      });
    };
    var fetchData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sensor_id) {
        var requestToken, controller, queryData, cacheKey, targetGhId, cachedPayload, url, response, jsonData, normalizedPayload, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              requestToken = (chartRequestTokens.get(sensor_id) || 0) + 1;
              chartRequestTokens.set(sensor_id, requestToken);
              abortChartRequest(sensor_id);
              controller = null;
              _context.p = 1;
              isFetching.value[sensor_id] = true;
              queryData = buildChartQueryData(sensor_id);
              cacheKey = buildChartCacheKey(queryData);
              targetGhId = queryData.gh_id;
              cachedPayload = getChartCachedPayload(cacheKey);
              if (!cachedPayload) {
                _context.n = 3;
                break;
              }
              if (!(chartRequestTokens.get(sensor_id) !== requestToken)) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              applyChartPayload(targetGhId, sensor_id, cachedPayload);
              return _context.a(2);
            case 3:
              controller = new AbortController();
              chartAbortControllers.set(sensor_id, controller);
              url = "/api/chart-data?dict=" + encodeURIComponent(JSON.stringify(queryData));
              _context.n = 4;
              return fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
                signal: controller.signal
              });
            case 4:
              response = _context.v;
              if (response.ok) {
                _context.n = 5;
                break;
              }
              throw new Error("Request failed with status ".concat(response.status));
            case 5:
              _context.n = 6;
              return response.json();
            case 6:
              jsonData = _context.v;
              if (!(chartRequestTokens.get(sensor_id) !== requestToken)) {
                _context.n = 7;
                break;
              }
              return _context.a(2);
            case 7:
              if (!((jsonData === null || jsonData === void 0 ? void 0 : jsonData.success) === false)) {
                _context.n = 8;
                break;
              }
              throw new Error((jsonData === null || jsonData === void 0 ? void 0 : jsonData.message) || t("monitoring.failed_load_chart"));
            case 8:
              normalizedPayload = normalizeChartPayload(jsonData);
              setChartCachedPayload(cacheKey, normalizedPayload);
              applyChartPayload(targetGhId, sensor_id, normalizedPayload);
              _context.n = 12;
              break;
            case 9:
              _context.p = 9;
              _t = _context.v;
              if (!((_t === null || _t === void 0 ? void 0 : _t.name) === "AbortError")) {
                _context.n = 10;
                break;
              }
              return _context.a(2);
            case 10:
              if (!(chartRequestTokens.get(sensor_id) !== requestToken)) {
                _context.n = 11;
                break;
              }
              return _context.a(2);
            case 11:
              toast.error((_t === null || _t === void 0 ? void 0 : _t.message) || t("monitoring.failed_load_data"));
              console.error("Fetch error:", _t);
            case 12:
              _context.p = 12;
              if (controller && chartAbortControllers.get(sensor_id) === controller) {
                chartAbortControllers["delete"](sensor_id);
              }
              if (chartRequestTokens.get(sensor_id) === requestToken) {
                isFetching.value[sensor_id] = false;
              }
              return _context.f(12);
            case 13:
              return _context.a(2);
          }
        }, _callee, null, [[1, 9, 12, 13]]);
      }));
      return function fetchData(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var loadChartsForTab = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ghId) {
        var sensors;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (ghId) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              sensors = gaugeData.value.filter(function (sensor) {
                return sensor.gh_id == ghId;
              });
              _context2.n = 2;
              return Promise.all(sensors.map(function (sensor) {
                return fetchData(sensor.sensor_id);
              }));
            case 2:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function loadChartsForTab(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    var selectedGHSensor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      var sensors = gaugeData.value.filter(function (sensor) {
        return sensor.gh_id == activeTab.value;
      });
      return sensors;
    });
    var isMobileFilterOpen = function isMobileFilterOpen(sensor_id) {
      return Boolean(mobileFilterOpen.value[sensor_id]);
    };
    var toggleMobileFilter = function toggleMobileFilter(sensor_id) {
      mobileFilterOpen.value[sensor_id] = !isMobileFilterOpen(sensor_id);
    };
    var closeAllMobileFilters = function closeAllMobileFilters() {
      mobileFilterOpen.value = {};
    };
    var isMobileRangeOpen = function isMobileRangeOpen(sensor_id) {
      return Boolean(mobileRangeOpen.value[sensor_id]);
    };
    var toggleMobileRange = function toggleMobileRange(sensor_id) {
      mobileRangeOpen.value[sensor_id] = !isMobileRangeOpen(sensor_id);
    };
    var closeMobileRange = function closeMobileRange(sensor_id) {
      mobileRangeOpen.value[sensor_id] = false;
    };
    var closeAllMobileRanges = function closeAllMobileRanges() {
      mobileRangeOpen.value = {};
    };
    var selectMobileRange = function selectMobileRange(sensor_id, range) {
      setChartRange(sensor_id, range);
      closeMobileRange(sensor_id);
    };
    var filterChart = function filterChart(sensor_id) {
      fetchData(sensor_id);
    };
    var applyMobileFilter = function applyMobileFilter(sensor_id) {
      filterChart(sensor_id);
      mobileFilterOpen.value[sensor_id] = false;
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(greenhouses, function (value) {
      if (!activeTab.value && value.length) {
        activeTab.value = value[0].id;
      }
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(gaugeData, /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(value) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(!value.length || !activeTab.value)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              populateData();
              _context3.n = 2;
              return loadChartsForTab(activeTab.value);
            case 2:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }(), {
      immediate: true
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(activeTab, /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(newTab) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!(!newTab || !gaugeData.value.length)) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              closeAllMobileFilters();
              closeAllMobileRanges();
              abortAllChartRequests();
              if (!data.value[newTab]) {
                data.value[newTab] = {
                  gauge: {},
                  chart: {}
                };
              }
              _context4.n = 2;
              return loadChartsForTab(newTab);
            case 2:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }());
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(locale, function () {
      relocalizeLoadedCharts();
    });
    var pollingInterval = null;
    var startPolling = function startPolling() {
      stopPolling();
      pollingInterval = setInterval(function () {
        // Reload Inertia props for gauges and status
        _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.router.reload({
          only: ["gaugeData", "latestData", "actuatorStatus"],
          preserveScroll: true,
          preserveState: true,
          onSuccess: function onSuccess() {
            // After props update, refetch charts
            if (activeTab.value) {
              loadChartsForTab(activeTab.value);
            }
          }
        });
      }, 30000); // Poll every 30 seconds
    };
    var stopPolling = function stopPolling() {
      if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
      }
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      populateData();
      if (activeTab.value) {
        loadChartsForTab(activeTab.value);
      }
      startPolling();
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(function () {
      stopPolling();
      abortAllChartRequests();
    });
    var __returned__ = {
      toast: toast,
      t: t,
      locale: locale,
      page: page,
      greenhouses: greenhouses,
      gaugeData: gaugeData,
      latestData: latestData,
      actuatorStatus: actuatorStatus,
      activeTab: activeTab,
      data: data,
      datetime: datetime,
      isFetching: isFetching,
      chartResponseCache: chartResponseCache,
      CHART_CACHE_TTL_MS: CHART_CACHE_TTL_MS,
      CHART_CACHE_LIMIT: CHART_CACHE_LIMIT,
      chartMode: chartMode,
      chartRange: chartRange,
      mobileFilterOpen: mobileFilterOpen,
      mobileRangeOpen: mobileRangeOpen,
      chartAbortControllers: chartAbortControllers,
      chartRequestTokens: chartRequestTokens,
      abortChartRequest: abortChartRequest,
      abortAllChartRequests: abortAllChartRequests,
      chartRangeOptions: chartRangeOptions,
      datePickerLocale: datePickerLocale,
      getSensorLabel: getSensorLabel,
      getNodeLabel: getNodeLabel,
      parseBucketDate: parseBucketDate,
      formatDayMonthLabel: formatDayMonthLabel,
      formatHourMinuteLabel: formatHourMinuteLabel,
      localizeBucketLabel: localizeBucketLabel,
      localizeChartLabels: localizeChartLabels,
      buildPerNodeDatasets: buildPerNodeDatasets,
      actuatorCards: actuatorCards,
      nodeColorMap: nodeColorMap,
      hexToRgba: hexToRgba,
      getNodeColor: getNodeColor,
      getDateTime: getDateTime,
      getChartMode: getChartMode,
      setChartMode: setChartMode,
      getChartRange: getChartRange,
      isQuickRangeActive: isQuickRangeActive,
      setChartRange: setChartRange,
      isChartRangeActive: isChartRangeActive,
      getChartRangeLabel: getChartRangeLabel,
      getActiveDateText: getActiveDateText,
      setCustomRangeFromDatePicker: setCustomRangeFromDatePicker,
      clearTime: clearTime,
      formatHour: formatHour,
      isRangeSelected: isRangeSelected,
      isTimeFilterDisabled: isTimeFilterDisabled,
      activeActuators: activeActuators,
      getActuatorIconAnimationClass: getActuatorIconAnimationClass,
      getChartColor: getChartColor,
      getGaugeScale: getGaugeScale,
      populateData: populateData,
      formatDate: formatDate,
      formatCompactDate: formatCompactDate,
      formatDateRangeDisplay: formatDateRangeDisplay,
      buildChartQueryData: buildChartQueryData,
      buildChartCacheKey: buildChartCacheKey,
      getChartCachedPayload: getChartCachedPayload,
      setChartCachedPayload: setChartCachedPayload,
      applyChartPayload: applyChartPayload,
      normalizeChartPayload: normalizeChartPayload,
      relocalizeLoadedCharts: relocalizeLoadedCharts,
      fetchData: fetchData,
      loadChartsForTab: loadChartsForTab,
      selectedGHSensor: selectedGHSensor,
      isMobileFilterOpen: isMobileFilterOpen,
      toggleMobileFilter: toggleMobileFilter,
      closeAllMobileFilters: closeAllMobileFilters,
      isMobileRangeOpen: isMobileRangeOpen,
      toggleMobileRange: toggleMobileRange,
      closeMobileRange: closeMobileRange,
      closeAllMobileRanges: closeAllMobileRanges,
      selectMobileRange: selectMobileRange,
      filterChart: filterChart,
      applyMobileFilter: applyMobileFilter,
      get pollingInterval() {
        return pollingInterval;
      },
      set pollingInterval(v) {
        pollingInterval = v;
      },
      startPolling: startPolling,
      stopPolling: stopPolling,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onBeforeUnmount: vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount,
      get Head() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.Head;
      },
      get usePage() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.usePage;
      },
      get router() {
        return _inertiajs_vue3__WEBPACK_IMPORTED_MODULE_1__.router;
      },
      BreezeAuthenticatedLayout: _Layouts_Authenticated_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      Tabs: _Components_Tabs_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      Gauge: _Components_Gauge_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
      Chart: _Components_Chart_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
      DigitalClock: _Components_DigitalClock_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
      Button: _Components_Button_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
      get VueDatePicker() {
        return _vuepic_vue_datepicker__WEBPACK_IMPORTED_MODULE_8__["default"];
      },
      get useToast() {
        return vue_toastification__WEBPACK_IMPORTED_MODULE_10__.useToast;
      },
      get useLocale() {
        return _composables_useLocale__WEBPACK_IMPORTED_MODULE_11__.useLocale;
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=template&id=3c5c65a3&scoped=true"
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=template&id=3c5c65a3&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "chart-container w-full max-h-[300px]"
};
var _hoisted_2 = {
  ref: "canvasRef"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_2, null, 512 /* NEED_PATCH */)]);
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=template&id=76ac4d84&scoped=true"
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=template&id=76ac4d84&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "gauge-container w-full max-h-[300px]"
};
var _hoisted_2 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: 'gauge-container-' + $props.id,
    "class": "w-full"
  }, null, 8 /* PROPS */, _hoisted_2)]);
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=template&id=4917729e&scoped=true"
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=template&id=4917729e&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "flex flex-col gap-2"
};
var _hoisted_5 = {
  "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4"
};
var _hoisted_6 = {
  "class": "flex flex-col w-full"
};
var _hoisted_7 = {
  "class": "flex justify-between"
};
var _hoisted_8 = {
  "class": "flex justify-between"
};
var _hoisted_9 = {
  "class": "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
};
var _hoisted_10 = {
  "class": "flex items-center justify-between h-full"
};
var _hoisted_11 = {
  "class": "flex items-center"
};
var _hoisted_12 = {
  "class": "ml-4"
};
var _hoisted_13 = {
  "class": "font-semibold text-gray-800"
};
var _hoisted_14 = {
  "class": "text-sm text-gray-500"
};
var _hoisted_15 = {
  "class": "flex flex-col items-end gap-1"
};
var _hoisted_16 = {
  "class": "bg-white shadow-sm rounded-lg w-full lg:w-3/4 p-4"
};
var _hoisted_17 = {
  "class": "mb-2"
};
var _hoisted_18 = {
  "class": "flex items-center justify-between gap-2"
};
var _hoisted_19 = {
  "class": "text-xl"
};
var _hoisted_20 = {
  "class": "relative sm:hidden"
};
var _hoisted_21 = ["onClick"];
var _hoisted_22 = {
  key: 0,
  "class": "absolute right-0 top-12 z-30 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-xl"
};
var _hoisted_23 = {
  "class": "flex flex-col gap-2"
};
var _hoisted_24 = ["value", "onChange"];
var _hoisted_25 = {
  value: "avg"
};
var _hoisted_26 = {
  value: "per_node"
};
var _hoisted_27 = {
  "class": "relative flex w-full items-center"
};
var _hoisted_28 = ["onUpdate:modelValue", "disabled"];
var _hoisted_29 = {
  value: ""
};
var _hoisted_30 = ["value"];
var _hoisted_31 = ["onClick"];
var _hoisted_32 = {
  "class": "mt-2 sm:hidden"
};
var _hoisted_33 = {
  "class": "relative"
};
var _hoisted_34 = ["onClick"];
var _hoisted_35 = {
  key: 0,
  "class": "absolute left-0 right-0 top-11 z-20 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
};
var _hoisted_36 = ["onClick"];
var _hoisted_37 = {
  "class": "mt-2 hidden w-full lg:w-auto sm:block"
};
var _hoisted_38 = {
  "class": "flex flex-col gap-2 pb-1 sm:flex-row sm:flex-wrap sm:items-center"
};
var _hoisted_39 = {
  "class": "w-full overflow-x-auto rounded-md border border-gray-300 bg-white p-1 sm:w-auto"
};
var _hoisted_40 = {
  "class": "inline-flex h-8 items-center"
};
var _hoisted_41 = ["onClick"];
var _hoisted_42 = ["value", "onChange"];
var _hoisted_43 = {
  value: "avg"
};
var _hoisted_44 = {
  value: "per_node"
};
var _hoisted_45 = {
  "class": "relative flex w-full items-center sm:min-w-[120px] sm:w-[120px]"
};
var _hoisted_46 = ["onUpdate:modelValue", "disabled"];
var _hoisted_47 = {
  value: ""
};
var _hoisted_48 = ["value"];
var _hoisted_49 = ["onClick"];
var _hoisted_50 = {
  key: 1,
  "class": "text-center text-gray-500"
};
var _hoisted_51 = {
  key: 2,
  "class": "text-center text-gray-500"
};
var _hoisted_52 = {
  "class": "bg-white overflow-hidden shadow-sm rounded-lg w-full lg:w-1/4 p-4"
};
var _hoisted_53 = {
  "class": "flex mb-4"
};
var _hoisted_54 = {
  "class": "text-xl"
};
var _hoisted_55 = {
  key: 1,
  "class": "text-center text-gray-500"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Head"], {
    title: $setup.t('title.monitoring')
  }, null, 8 /* PROPS */, ["title"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["BreezeAuthenticatedLayout"], {
    titlePage: 'Monitoring'
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("title.monitoring")), 1 /* TEXT */)];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      var _$setup$latestData$fi;
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tabs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Tabs"], {
        greenhouses: $setup.greenhouses,
        modelValue: $setup.activeTab,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $setup.activeTab = $event;
        }),
        "class": "mb-4"
      }, null, 8 /* PROPS */, ["greenhouses", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tab content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.time")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["DigitalClock"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.latest_data")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_$setup$latestData$fi = $setup.latestData.find(function (item) {
        return item.gh_id == $setup.activeTab;
      })) === null || _$setup$latestData$fi === void 0 ? void 0 : _$setup$latestData$fi.latest_time) || "-"), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.activeActuators, function (actuator) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: actuator.key,
          "class": "bg-white overflow-hidden shadow-sm rounded-lg p-4"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([actuator.icon, actuator.color, $setup.getActuatorIconAnimationClass(actuator), 'text-3xl w-10'])
        }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(actuator.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.status")), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([actuator.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700', "px-3 py-1 text-xs font-bold rounded-full"])
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(actuator.status ? $setup.t("monitoring.on") : $setup.t("monitoring.off")), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([actuator.gatewayOnline ? 'text-green-600' : 'text-red-600', "text-[11px] font-semibold uppercase tracking-wide"])
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(actuator.gatewayOnline ? $setup.t('monitoring.online') : $setup.t('monitoring.offline')), 3 /* TEXT, CLASS */)])])]);
      }), 128 /* KEYED_FRAGMENT */))]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.selectedGHSensor, function (sensor) {
        var _$setup$data$$setup$a, _$setup$data$$setup$a2, _$setup$data$$setup$a3, _$setup$data$$setup$a4, _$setup$data$$setup$a5, _$setup$data$$setup$a6, _$setup$data$$setup$a7, _$setup$data$$setup$a8, _$setup$data$$setup$a9, _$setup$data$$setup$a0;
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: sensor.sensor_id,
          "class": "flex flex-col lg:flex-row gap-2"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getSensorLabel(sensor.name)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
          type: "button",
          "class": "inline-flex h-10 items-center gap-2 rounded-md bg-sky-500 px-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-sky-600",
          onClick: function onClick($event) {
            return $setup.toggleMobileFilter(sensor.sensor_id);
          }
        }, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": "fas fa-filter"
        }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.filter")), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_21), $setup.isMobileFilterOpen(sensor.sensor_id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
          "class": "h-10 w-full rounded-md border px-3 text-sm",
          value: $setup.getChartMode(sensor.sensor_id),
          onChange: function onChange($event) {
            return $setup.setChartMode(sensor.sensor_id, $event.target.value);
          }
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.average")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.per_node")), 1 /* TEXT */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["VueDatePicker"], {
          "class": "monitoring-date-picker w-full",
          modelValue: $setup.getDateTime(sensor.sensor_id).date,
          "onUpdate:modelValue": [function ($event) {
            return $setup.getDateTime(sensor.sensor_id).date = $event;
          }, function ($event) {
            return $setup.setCustomRangeFromDatePicker(sensor.sensor_id);
          }],
          range: "",
          position: "right",
          locale: $setup.datePickerLocale,
          placeholder: $setup.t('monitoring.date'),
          format: $setup.formatDateRangeDisplay,
          "enable-time-picker": false,
          teleport: true
        }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "locale", "placeholder", "format"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["h-10 w-full rounded-md border px-3 text-sm", {
            'cursor-not-allowed bg-gray-200 text-gray-500': $setup.isTimeFilterDisabled(sensor.sensor_id)
          }]),
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return $setup.getDateTime(sensor.sensor_id).time = $event;
          },
          disabled: $setup.isTimeFilterDisabled(sensor.sensor_id)
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('monitoring.hour')), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(24, function (hour) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
            key: hour,
            value: $setup.formatHour(hour - 1)
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatHour(hour - 1)), 9 /* TEXT, PROPS */, _hoisted_30);
        }), 64 /* STABLE_FRAGMENT */))], 10 /* CLASS, PROPS */, _hoisted_28), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.getDateTime(sensor.sensor_id).time]]), $setup.getDateTime(sensor.sensor_id).time && !$setup.isQuickRangeActive(sensor.sensor_id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
          key: 0,
          onClick: function onClick($event) {
            return $setup.clearTime(sensor.sensor_id);
          },
          "class": "absolute right-3 text-gray-500 hover:text-gray-700"
        }, _toConsumableArray(_cache[2] || (_cache[2] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": "fas fa-times"
        }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_31)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Button"], {
          disabled: $setup.isFetching[sensor.sensor_id],
          onClick: function onClick($event) {
            return $setup.applyMobileFilter(sensor.sensor_id);
          },
          "class": "h-10 w-full justify-center gap-2 px-3"
        }, {
          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
              "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.isFetching[sensor.sensor_id] ? 'fas fa-spinner fa-spin' : 'fas fa-search'])
            }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('monitoring.search')), 1 /* TEXT */)];
          }),
          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "onClick"])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
          type: "button",
          "class": "flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm",
          onClick: function onClick($event) {
            return $setup.toggleMobileRange(sensor.sensor_id);
          }
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getChartRangeLabel(sensor.sensor_id)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas fa-chevron-down text-xs transition-transform", {
            'rotate-180': $setup.isMobileRangeOpen(sensor.sensor_id)
          }])
        }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_34), $setup.isMobileRangeOpen(sensor.sensor_id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.chartRangeOptions, function (option) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
            key: "mobile-outside-".concat(sensor.sensor_id, "-").concat(option.value),
            type: "button",
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["block w-full px-3 py-2 text-left text-sm transition", $setup.isChartRangeActive(sensor.sensor_id, option.value) ? 'bg-sky-500 text-white' : 'text-gray-700 hover:bg-gray-100']),
            onClick: function onClick($event) {
              return $setup.selectMobileRange(sensor.sensor_id, option.value);
            }
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_36);
        }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.chartRangeOptions, function (option) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
            key: "".concat(sensor.sensor_id, "-").concat(option.value),
            type: "button",
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["rounded px-2.5 py-1 text-xs font-semibold transition", $setup.isChartRangeActive(sensor.sensor_id, option.value) ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100']),
            onClick: function onClick($event) {
              return $setup.setChartRange(sensor.sensor_id, option.value);
            }
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_41);
        }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
          "class": "h-10 w-full rounded-md border px-3 text-sm sm:min-w-[145px] sm:w-auto",
          value: $setup.getChartMode(sensor.sensor_id),
          onChange: function onChange($event) {
            return $setup.setChartMode(sensor.sensor_id, $event.target.value);
          }
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.average")), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.per_node")), 1 /* TEXT */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_42), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["VueDatePicker"], {
          "class": "monitoring-date-picker w-full sm:w-[128px]",
          modelValue: $setup.getDateTime(sensor.sensor_id).date,
          "onUpdate:modelValue": [function ($event) {
            return $setup.getDateTime(sensor.sensor_id).date = $event;
          }, function ($event) {
            return $setup.setCustomRangeFromDatePicker(sensor.sensor_id);
          }],
          range: "",
          position: "right",
          locale: $setup.datePickerLocale,
          placeholder: $setup.t('monitoring.date'),
          format: $setup.formatDateRangeDisplay,
          "enable-time-picker": false,
          teleport: true
        }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "locale", "placeholder"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["h-10 w-full rounded-md border px-3 text-sm", {
            'cursor-not-allowed bg-gray-200 text-gray-500': $setup.isTimeFilterDisabled(sensor.sensor_id)
          }]),
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return $setup.getDateTime(sensor.sensor_id).time = $event;
          },
          disabled: $setup.isTimeFilterDisabled(sensor.sensor_id)
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.hour")), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(24, function (hour) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
            key: hour,
            value: $setup.formatHour(hour - 1)
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatHour(hour - 1)), 9 /* TEXT, PROPS */, _hoisted_48);
        }), 64 /* STABLE_FRAGMENT */))], 10 /* CLASS, PROPS */, _hoisted_46), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.getDateTime(sensor.sensor_id).time]]), $setup.getDateTime(sensor.sensor_id).time && !$setup.isQuickRangeActive(sensor.sensor_id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
          key: 0,
          onClick: function onClick($event) {
            return $setup.clearTime(sensor.sensor_id);
          },
          "class": "absolute right-3 text-gray-500 hover:text-gray-700"
        }, _toConsumableArray(_cache[3] || (_cache[3] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          "class": "fas fa-times"
        }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_49)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["Button"], {
          disabled: $setup.isFetching[sensor.sensor_id],
          onClick: function onClick($event) {
            return $setup.filterChart(sensor.sensor_id);
          },
          "class": "h-10 w-full px-3 sm:w-auto sm:shrink-0"
        }, {
          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
              "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.isFetching[sensor.sensor_id] ? 'fas fa-spinner fa-spin' : 'fas fa-search fa-lg'])
            }, null, 2 /* CLASS */)];
          }),
          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "onClick"])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chart Component "), (_$setup$data$$setup$a = $setup.data[$setup.activeTab]) !== null && _$setup$data$$setup$a !== void 0 && (_$setup$data$$setup$a = _$setup$data$$setup$a.chart) !== null && _$setup$data$$setup$a !== void 0 && (_$setup$data$$setup$a = _$setup$data$$setup$a[sensor.sensor_id]) !== null && _$setup$data$$setup$a !== void 0 && _$setup$data$$setup$a.chartData && ((_$setup$data$$setup$a2 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a2 === void 0 || (_$setup$data$$setup$a2 = _$setup$data$$setup$a2.chart) === null || _$setup$data$$setup$a2 === void 0 || (_$setup$data$$setup$a2 = _$setup$data$$setup$a2[sensor.sensor_id]) === null || _$setup$data$$setup$a2 === void 0 ? void 0 : _$setup$data$$setup$a2.chartData.length) > 0 || (_$setup$data$$setup$a3 = $setup.data[$setup.activeTab]) !== null && _$setup$data$$setup$a3 !== void 0 && (_$setup$data$$setup$a3 = _$setup$data$$setup$a3.chart) !== null && _$setup$data$$setup$a3 !== void 0 && (_$setup$data$$setup$a3 = _$setup$data$$setup$a3[sensor.sensor_id]) !== null && _$setup$data$$setup$a3 !== void 0 && _$setup$data$$setup$a3.chartDatasets && ((_$setup$data$$setup$a4 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a4 === void 0 || (_$setup$data$$setup$a4 = _$setup$data$$setup$a4.chart) === null || _$setup$data$$setup$a4 === void 0 || (_$setup$data$$setup$a4 = _$setup$data$$setup$a4[sensor.sensor_id]) === null || _$setup$data$$setup$a4 === void 0 ? void 0 : _$setup$data$$setup$a4.chartDatasets.length) > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["Chart"], {
          key: 0,
          data: (_$setup$data$$setup$a5 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a5 === void 0 || (_$setup$data$$setup$a5 = _$setup$data$$setup$a5.chart) === null || _$setup$data$$setup$a5 === void 0 ? void 0 : _$setup$data$$setup$a5[sensor.sensor_id].chartData,
          label: (_$setup$data$$setup$a6 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a6 === void 0 || (_$setup$data$$setup$a6 = _$setup$data$$setup$a6.chart) === null || _$setup$data$$setup$a6 === void 0 ? void 0 : _$setup$data$$setup$a6[sensor.sensor_id].chartLabel,
          id: sensor.sensor_id,
          sensor_name: $setup.getSensorLabel(sensor.name),
          chartColor: (_$setup$data$$setup$a7 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a7 === void 0 || (_$setup$data$$setup$a7 = _$setup$data$$setup$a7.chart) === null || _$setup$data$$setup$a7 === void 0 ? void 0 : _$setup$data$$setup$a7[sensor.sensor_id].chartColor,
          datasets: ((_$setup$data$$setup$a8 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a8 === void 0 || (_$setup$data$$setup$a8 = _$setup$data$$setup$a8.chart) === null || _$setup$data$$setup$a8 === void 0 || (_$setup$data$$setup$a8 = _$setup$data$$setup$a8[sensor.sensor_id]) === null || _$setup$data$$setup$a8 === void 0 ? void 0 : _$setup$data$$setup$a8.chartDatasets) || [],
          subtitle: $setup.getActiveDateText(sensor.sensor_id)
        }, null, 8 /* PROPS */, ["data", "label", "id", "sensor_name", "chartColor", "datasets", "subtitle"])) : $setup.isFetching[sensor.sensor_id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.loading_chart")), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.no_data")), 1 /* TEXT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getSensorLabel(sensor.name)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Gauge Component "), ((_$setup$data$$setup$a9 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a9 === void 0 || (_$setup$data$$setup$a9 = _$setup$data$$setup$a9.gauge) === null || _$setup$data$$setup$a9 === void 0 ? void 0 : _$setup$data$$setup$a9[sensor.sensor_id]) !== undefined ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["Gauge"], {
          key: 0,
          title: $setup.getSensorLabel(sensor.name),
          symbol: sensor.unit,
          value: (_$setup$data$$setup$a0 = $setup.data[$setup.activeTab]) === null || _$setup$data$$setup$a0 === void 0 || (_$setup$data$$setup$a0 = _$setup$data$$setup$a0.gauge) === null || _$setup$data$$setup$a0 === void 0 ? void 0 : _$setup$data$$setup$a0[sensor.sensor_id],
          thd_min: $setup.getGaugeScale(sensor.name).min,
          thd_max: $setup.getGaugeScale(sensor.name).max,
          id: sensor.sensor_id
        }, null, 8 /* PROPS */, ["title", "symbol", "value", "thd_min", "thd_max", "id"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t("monitoring.loading_gauge")), 1 /* TEXT */))])]);
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css"
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.chart-container[data-v-3c5c65a3] {\n    height: 100%;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css"
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.gauge-container[data-v-76ac4d84] {\n    width: 100%;\n}\n#gauge-container[data-v-76ac4d84] {\n    width: 100%;\n    height: 100%;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css"
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n[data-v-4917729e] .monitoring-date-picker {\n    width: 100%;\n    min-width: 0;\n}\n[data-v-4917729e] .monitoring-date-picker .dp__input {\n    width: 100%;\n    min-height: 2.5rem;\n    height: 2.5rem;\n    padding-right: 0.5rem;\n    padding-left: 2rem;\n    font-size: 0.875rem;\n}\n@media (min-width: 640px) {\n[data-v-4917729e] .monitoring-date-picker {\n        width: 128px;\n        min-width: 128px;\n}\n}\n.actuator-fan-active[data-v-4917729e] {\n    animation: actuator-fan-spin-4917729e 1.5s linear infinite;\n    transform-origin: 50% 50%;\n}\n.actuator-dehumidifier-active[data-v-4917729e] {\n    animation: actuator-dehumidifier-pulse-4917729e 1.7s ease-in-out infinite;\n    transform-origin: 50% 50%;\n}\n@keyframes actuator-fan-spin-4917729e {\nfrom {\n        transform: rotate(0deg);\n}\nto {\n        transform: rotate(360deg);\n}\n}\n@keyframes actuator-dehumidifier-pulse-4917729e {\n0%,\n    100% {\n        transform: translateY(0) scale(1);\n        opacity: 1;\n}\n50% {\n        transform: translateY(-2px) scale(1.08);\n        opacity: 0.82;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css"
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_style_index_0_id_3c5c65a3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_style_index_0_id_3c5c65a3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_style_index_0_id_3c5c65a3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ },

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css"
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_style_index_0_id_76ac4d84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_style_index_0_id_76ac4d84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_style_index_0_id_76ac4d84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ },

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css"
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_style_index_0_id_4917729e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_style_index_0_id_4917729e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_style_index_0_id_4917729e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./resources/js/Components/Chart.vue"
/*!*******************************************!*\
  !*** ./resources/js/Components/Chart.vue ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Chart_vue_vue_type_template_id_3c5c65a3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chart.vue?vue&type=template&id=3c5c65a3&scoped=true */ "./resources/js/Components/Chart.vue?vue&type=template&id=3c5c65a3&scoped=true");
/* harmony import */ var _Chart_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chart.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Components/Chart.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _Chart_vue_vue_type_style_index_0_id_3c5c65a3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css */ "./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Chart_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Chart_vue_vue_type_template_id_3c5c65a3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3c5c65a3"],['__file',"resources/js/Components/Chart.vue"]])
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

/***/ "./resources/js/Components/Gauge.vue"
/*!*******************************************!*\
  !*** ./resources/js/Components/Gauge.vue ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Gauge_vue_vue_type_template_id_76ac4d84_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gauge.vue?vue&type=template&id=76ac4d84&scoped=true */ "./resources/js/Components/Gauge.vue?vue&type=template&id=76ac4d84&scoped=true");
/* harmony import */ var _Gauge_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gauge.vue?vue&type=script&lang=js */ "./resources/js/Components/Gauge.vue?vue&type=script&lang=js");
/* harmony import */ var _Gauge_vue_vue_type_style_index_0_id_76ac4d84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css */ "./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Gauge_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Gauge_vue_vue_type_template_id_76ac4d84_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-76ac4d84"],['__file',"resources/js/Components/Gauge.vue"]])
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

/***/ "./resources/js/Pages/Monitoring.vue"
/*!*******************************************!*\
  !*** ./resources/js/Pages/Monitoring.vue ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Monitoring_vue_vue_type_template_id_4917729e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Monitoring.vue?vue&type=template&id=4917729e&scoped=true */ "./resources/js/Pages/Monitoring.vue?vue&type=template&id=4917729e&scoped=true");
/* harmony import */ var _Monitoring_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Monitoring.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Pages/Monitoring.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _Monitoring_vue_vue_type_style_index_0_id_4917729e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css */ "./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Monitoring_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Monitoring_vue_vue_type_template_id_4917729e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-4917729e"],['__file',"resources/js/Pages/Monitoring.vue"]])
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

/***/ "./resources/js/Components/Chart.vue?vue&type=script&setup=true&lang=js"
/*!******************************************************************************!*\
  !*** ./resources/js/Components/Chart.vue?vue&type=script&setup=true&lang=js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Chart.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=script&setup=true&lang=js");
 

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

/***/ "./resources/js/Components/Gauge.vue?vue&type=script&lang=js"
/*!*******************************************************************!*\
  !*** ./resources/js/Components/Gauge.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Gauge.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=script&lang=js");
 

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

/***/ "./resources/js/Pages/Monitoring.vue?vue&type=script&setup=true&lang=js"
/*!******************************************************************************!*\
  !*** ./resources/js/Pages/Monitoring.vue?vue&type=script&setup=true&lang=js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Monitoring.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=script&setup=true&lang=js");
 

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

/***/ "./resources/js/Components/Chart.vue?vue&type=template&id=3c5c65a3&scoped=true"
/*!*************************************************************************************!*\
  !*** ./resources/js/Components/Chart.vue?vue&type=template&id=3c5c65a3&scoped=true ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_template_id_3c5c65a3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_template_id_3c5c65a3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Chart.vue?vue&type=template&id=3c5c65a3&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=template&id=3c5c65a3&scoped=true");


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

/***/ "./resources/js/Components/Gauge.vue?vue&type=template&id=76ac4d84&scoped=true"
/*!*************************************************************************************!*\
  !*** ./resources/js/Components/Gauge.vue?vue&type=template&id=76ac4d84&scoped=true ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_template_id_76ac4d84_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_template_id_76ac4d84_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Gauge.vue?vue&type=template&id=76ac4d84&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=template&id=76ac4d84&scoped=true");


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

/***/ "./resources/js/Pages/Monitoring.vue?vue&type=template&id=4917729e&scoped=true"
/*!*************************************************************************************!*\
  !*** ./resources/js/Pages/Monitoring.vue?vue&type=template&id=4917729e&scoped=true ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_template_id_4917729e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_template_id_4917729e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Monitoring.vue?vue&type=template&id=4917729e&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=template&id=4917729e&scoped=true");


/***/ },

/***/ "./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css"
/*!***************************************************************************************************!*\
  !*** ./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css ***!
  \***************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Chart_vue_vue_type_style_index_0_id_3c5c65a3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Chart.vue?vue&type=style&index=0&id=3c5c65a3&scoped=true&lang=css");


/***/ },

/***/ "./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css"
/*!***************************************************************************************************!*\
  !*** ./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css ***!
  \***************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Gauge_vue_vue_type_style_index_0_id_76ac4d84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Gauge.vue?vue&type=style&index=0&id=76ac4d84&scoped=true&lang=css");


/***/ },

/***/ "./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css"
/*!***************************************************************************************************!*\
  !*** ./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css ***!
  \***************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Monitoring_vue_vue_type_style_index_0_id_4917729e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Monitoring.vue?vue&type=style&index=0&id=4917729e&scoped=true&lang=css");


/***/ }

}]);