<script setup>
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

import { onMounted, onUnmounted, ref, watch, computed, nextTick } from "vue";
import { Head, router } from "@inertiajs/vue3";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import Tabs from "@/Components/Tabs.vue";
import DigitalClock from "@/Components/DigitalClock.vue";
import { useLocale } from "@/composables/useLocale";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const { t } = useLocale();

// ===============================
// PROPS DARI CONTROLLER
// Data yang dikirim dari PageController@heatmap
// OPTIMIZED: Semua data greenhouse di-preload sekaligus
// ===============================
const props = defineProps({
  // Data sensor per greenhouse: { gh_id: { temperature, humidity, lux } }
  sensorDataByGh: {
    type: Object,
    default: () => ({}),
  },
  
  // Thresholds per greenhouse: { gh_id: { temperature, humidity, lux } }
  thresholdsByGh: {
    type: Object,
    default: () => ({}),
  },
  
  // Daftar greenhouse untuk switch tab
  greenhouses: Array,
  
  // ID greenhouse yang sedang aktif (initial value dari URL)
  activeGhId: Number,
  
  // Latest data timestamp per greenhouse
  latestData: {
    type: Array,
    default: () => [],
  },
});

// ===============================
// REACTIVE STATE
// ===============================
const activeGH = ref(props.activeGhId);           // Greenhouse yang dipilih
const activeParameter = ref("temperature");       // Parameter aktif (temperature/humidity/lux)
const mapHeight = ref('280px');                    // Dynamic map height based on aspect ratio
const mapContainer = ref(null);                   // Reference ke container div untuk Leaflet
const mapOpacity = ref(1);                         // Opacity untuk fade transition saat switch GH
let resizeDebounceTimer = null;                    // Debounce timer untuk ResizeObserver
let isTransitioning = false;                       // Flag: sedang transisi switch GH
let autoRefreshInterval = null;                   // Interval untuk auto-refresh
let resizeObserver = null;                         // Resize observer cleanup ref
let pendingClipFrame = null;                       // RAF id untuk clip heatmap
let pendingHeatmapFrame = null;                    // RAF id untuk update heatmap

// ===============================
// AUTO-REFRESH INTERVAL 
// ===============================
const AUTO_REFRESH_SECONDS = 30;

// Computed: Latest data time untuk greenhouse aktif
const currentLatestTime = computed(() => {
  const latestItem = props.latestData.find(item => item.gh_id === activeGH.value);
  return latestItem?.latest_time || '-';
});

// ===============================
// KONFIGURASI GREENHOUSE
// Setiap greenhouse punya dimensi gambar dan posisi node yang berbeda
// ===============================
const greenhouseConfig = {
  // GH 1 - Landscape layout
  1: {
    width: 1024,
    height: 450,
    image: '/images/greenhouse_plan.webp',
    // Node positions: { node_id: [y, x] }
    nodeLocations: {
      1: [420, 150],   // Bawah kiri
      2: [35, 310],    // Atas kiri-tengah
      3: [420, 585],   // Bawah tengah
      4: [35, 785],    // Atas kanan-tengah
      5: [420, 950],   // Bawah kanan
    },
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
      6: [175, 561],     // Atas kiri (area pertama)
      7: [175, 159],     // Atas kanan (area kedua)
      8: [325, 65],    // Tengah kiri
      9: [325, 438],    // Tengah kanan
      10: [405, 278],    // Bawah tengah (dekat Gateway)
    },
  },
};

// Computed: config greenhouse aktif
const currentGHConfig = computed(() => greenhouseConfig[activeGH.value] || greenhouseConfig[1]);

// Computed: nilai-nilai yang sering dipakai
const IMAGE_WIDTH = computed(() => currentGHConfig.value.width);
const IMAGE_HEIGHT = computed(() => currentGHConfig.value.height);
const nodeLocations = computed(() => currentGHConfig.value.nodeLocations);
const currentGreenhouseImage = computed(() => currentGHConfig.value.image);

// ===============================
// KONFIGURASI PARAMETER
// Setiap parameter punya setting berbeda untuk:
// - min/max: rentang nilai untuk skala legend
// - unit: satuan yang ditampilkan
// - label: nama yang ditampilkan di UI
// ===============================
const parameterConfig = {
  temperature: { min: 0, max: 40, unit: '°C', labelKey: 'sensor.temperature' },
  humidity: { min: 0, max: 100, unit: '%', labelKey: 'sensor.humidity' },
  lux: { min: 0, max: 65535, unit: 'lux', labelKey: 'sensor.light_intensity' },
};

// ===============================
// COMPUTED PROPERTIES (REAKTIF)
// Otomatis berubah saat activeParameter berubah
// ===============================

// Config untuk parameter yang sedang aktif - MENGGUNAKAN THRESHOLD sebagai min/max legend
const currentConfig = computed(() => {
  const baseConfig = parameterConfig[activeParameter.value];
  const thresholds = currentThresholds.value;
  
  return {
    ...baseConfig,
    label: t(baseConfig.labelKey),
    min: thresholds.min,  // Override dengan threshold min
    max: thresholds.max,  // Override dengan threshold max
  };
});

// Threshold (min/max) untuk parameter aktif - dari database
// OPTIMIZED: Mengambil dari thresholdsByGh berdasarkan activeGH
const currentThresholds = computed(() => {
  const ghThresholds = props.thresholdsByGh[activeGH.value];
  if (!ghThresholds) return { min: 25, max: 35 }; // fallback
  
  if (activeParameter.value === 'temperature') return ghThresholds.temperature || { min: 25, max: 35 };
  if (activeParameter.value === 'humidity') return ghThresholds.humidity || { min: 50, max: 80 };
  return ghThresholds.lux || { min: 20000, max: 50000 };
});

// Data sensor untuk parameter aktif
// OPTIMIZED: Mengambil dari sensorDataByGh berdasarkan activeGH
const currentSensorData = computed(() => {
  const ghData = props.sensorDataByGh[activeGH.value];
  if (!ghData) return [];
  
  if (activeParameter.value === 'temperature') return ghData.temperature || [];
  if (activeParameter.value === 'humidity') return ghData.humidity || [];
  return ghData.lux || [];
});

const currentSensorDataSignature = computed(() =>
  (currentSensorData.value || [])
    .map((sensor) => `${sensor.node_id}:${sensor.value}:${sensor.recorded_at || ""}`)
    .join("|")
);



// ===============================
// COMPUTED: LEGEND GRADIENT STYLE
// Linear: Biru di minimum, Merah di maximum
// ===============================
const legendGradientStyle = computed(() => {
  const gradientColors = [
    { pos: 0.0,  color: "#2563eb" },  // Biru (Min)
    { pos: 0.25, color: "#06b6d4" },  // Cyan
    { pos: 0.5,  color: "#facc15" },  // Kuning
    { pos: 0.75, color: "#fb923c" },  // Orange
    { pos: 1.0,  color: "#ef4444" },  // Merah (Max)
  ];
  
  const stops = gradientColors.map(({ pos, color }) => `${color} ${pos * 100}%`);
  
  return {
    background: `linear-gradient(to top, ${stops.join(", ")})`
  };
});

// Horizontal gradient untuk mobile legend (linear)
const legendGradientStyleHorizontal = computed(() => {
  const gradientColors = [
    { pos: 0.0,  color: "#2563eb" },
    { pos: 0.25, color: "#06b6d4" },
    { pos: 0.5,  color: "#facc15" },
    { pos: 0.75, color: "#fb923c" },
    { pos: 1.0,  color: "#ef4444" },
  ];
  
  const stops = gradientColors.map(({ pos, color }) => `${color} ${pos * 100}%`);
  
  return {
    background: `linear-gradient(to right, ${stops.join(", ")})`
  };
});

// ===============================
// FUNGSI NORMALISASI NILAI SENSOR (LINEAR)
// ===============================
/**
 * Mengkonversi nilai sensor menjadi proporsi 0 - 1 dari rentang min-max
 * LINEAR: 0 = minimum (Biru), 1 = maximum (Merah)
 */
function normalizeValue(value) {
  const val = parseFloat(value);
  if (isNaN(val)) return 0;
  const thresholds = currentThresholds.value;
  
  const range = thresholds.max - thresholds.min;
  if (range === 0) return 0.5; // tengah
  
  let linear = (val - thresholds.min) / range;
  return Math.max(0, Math.min(linear, 1)); // Clamp 0-1
}

// ===============================
// FUNGSI PENENTUAN STATUS (LINEAR)
// ===============================
/**
 * Menentukan status dan warna marker berdasarkan nilai linear yang dipetakan
 */
function getStatus(value) {
  const val = parseFloat(value);
  const normalized = normalizeValue(val);
  const colorObj = interpolateColor(normalized);
  const color = `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`;
  
  // Tentukan text status berdasarkan posisi linear
  let text = "-";
  if (normalized <= 0.3) {
    text = t("heatmap.low") || "Min"; 
  } else if (normalized <= 0.7) {
    text = t("heatmap.normal") || "Normal";
  } else {
    text = t("heatmap.high") || "Max";
  }
  
  return { text, color };
}

// ===============================
// LEAFLET MAP VARIABLES
// ===============================
let map = null;           // Instance Leaflet map
let markersLayer = null;  // Layer group untuk marker nodes

function createCustomIcon(nodeId, value) {
  const status = getStatus(value);
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-pin" style="background-color: ${status.color};">
        <span class="marker-number">${nodeId}</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}


function drawMarkers() {
  if (markersLayer) {
    map.removeLayer(markersLayer);
  }

  markersLayer = L.layerGroup().addTo(map);

  const sensorData = currentSensorData.value || [];
  const unit = currentConfig.value.unit;

  sensorData.forEach((sensor) => {
    const loc = nodeLocations.value[sensor.node_id];
    if (!loc) return;

    const [y, x] = loc;
    const status = getStatus(sensor.value);

    const marker = L.marker([y, x], {
      icon: createCustomIcon(sensor.node_id, sensor.value),
    });

    // Cek apakah node di bagian atas gambar
    // Dalam Simple CRS: y besar = atas, y kecil = bawah
    // Node 1, 3, 5 (y=420) di atas → popup di bawah marker
    // Node 2, 4 (y=35) di bawah → popup di atas marker (default)
    const isTopNode = y > 200;
    
    // Popup dengan informasi node
    marker.bindPopup(`
      <div style="text-align: center; min-width: 120px;">
        <strong style="font-size: 14px;">Node ${sensor.node_id}</strong>
        <hr style="margin: 8px 0;">
        <div style="font-size: 24px; font-weight: bold; color: ${status.color};">
          ${sensor.value}${unit}
        </div>
        <div style="margin-top: 4px; padding: 4px 8px; border-radius: 4px; 
                    background-color: ${status.color}; color: white; font-weight: 500;">
          ${status.text}
        </div>
      </div>
    `, {
      closeButton: false,
      className: isTopNode ? "node-popup popup-bottom" : "node-popup",
      // Offset: [x, y] - y positif = popup ke bawah
      offset: isTopNode ? [0, 140] : [0, 0],
    });

    // UX: tampilkan informasi node saat hover, tanpa harus klik marker.
    let popupCloseTimer = null;
    let popupElement = null;
    const cancelPopupClose = () => {
      if (popupCloseTimer !== null) {
        clearTimeout(popupCloseTimer);
        popupCloseTimer = null;
      }
    };
    const schedulePopupClose = () => {
      cancelPopupClose();
      popupCloseTimer = setTimeout(() => {
        marker.closePopup();
      }, 140);
    };

    const onPopupMouseEnter = () => {
      cancelPopupClose();
    };
    const onPopupMouseLeave = () => {
      schedulePopupClose();
    };

    marker.on("mouseover", () => {
      cancelPopupClose();
      marker.openPopup();
    });
    marker.on("mouseout", () => {
      schedulePopupClose();
    });
    marker.on("popupopen", () => {
      popupElement = marker.getPopup()?.getElement() || null;
      if (popupElement) {
        popupElement.addEventListener("mouseenter", onPopupMouseEnter);
        popupElement.addEventListener("mouseleave", onPopupMouseLeave);
      }
    });
    marker.on("popupclose", () => {
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
let customHeatLayer = null;

// Radius pengaruh sensor dalam koordinat gambar (bukan pixel)
// Semakin besar = area pengaruh sensor semakin luas
const HEATMAP_RADIUS = 300;

// ===============================
// GRADIENT COLORS UNTUK HEATMAP (LINEAR)
// ===============================
const heatmapGradientColors = [
  { stop: 0.0,  r: 37, g: 99, b: 235 },   // #2563eb - Biru (Min)
  { stop: 0.25, r: 6, g: 182, b: 212 },   // #06b6d4 - Cyan
  { stop: 0.5,  r: 250, g: 204, b: 21 },  // #facc15 - Kuning
  { stop: 0.75, r: 251, g: 146, b: 60 },  // #fb923c - Orange
  { stop: 1.0,  r: 239, g: 68, b: 68 },   // #ef4444 - Merah (Max)
];

function interpolateColor(value) {
  // Clamp value 0-1
  const v = Math.max(0, Math.min(1, value));
  
  // Find gradient segment
  let lower = heatmapGradientColors[0];
  let upper = heatmapGradientColors[heatmapGradientColors.length - 1];
  
  for (let i = 0; i < heatmapGradientColors.length - 1; i++) {
    if (v >= heatmapGradientColors[i].stop && v <= heatmapGradientColors[i + 1].stop) {
      lower = heatmapGradientColors[i];
      upper = heatmapGradientColors[i + 1];
      break;
    }
  }
  
  // Interpolate between lower and upper
  const range = upper.stop - lower.stop;
  const ratio = range === 0 ? 0 : (v - lower.stop) / range;
  
  return {
    r: Math.round(lower.r + (upper.r - lower.r) * ratio),
    g: Math.round(lower.g + (upper.g - lower.g) * ratio),
    b: Math.round(lower.b + (upper.b - lower.b) * ratio),
  };
}

// Custom Leaflet Layer untuk Canvas Heatmap
const CanvasHeatmapLayer = L.Layer.extend({
  options: {
    opacity: 0.6,
    radius: HEATMAP_RADIUS,
  },

  initialize: function(sensorData, options) {
    this._sensorData = sensorData || [];
    L.setOptions(this, options);
  },

  onAdd: function(map) {
    this._map = map;
    
    // Create canvas element
    this._canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-canvas');
    this._canvas.style.position = 'absolute';
    this._canvas.style.pointerEvents = 'none';
    
    // Add to overlay pane
    const pane = this.getPane();
    pane.appendChild(this._canvas);
    
    // Bindmo events
    map.on('zoomend viewreset moveend resize', this._redraw, this);
    
    this._redraw();
  },

  onRemove: function(map) {
    L.DomUtil.remove(this._canvas);
    map.off('zoomend viewreset moveend resize', this._redraw, this);
  },

  setData: function(sensorData) {
    this._sensorData = sensorData || [];
    this._redraw();
  },

  _redraw: function() {
    if (!this._map) return;

    const mapSize = this._map.getSize();
    const canvas = this._canvas;
    
    // Set canvas size
    canvas.width = mapSize.x;
    canvas.height = mapSize.y;
    
    // Position canvas
    const topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(canvas, topLeft);
    
    // Draw heatmap
    this._renderHeatmap();
  },

  _renderHeatmap: function() {
    const ctx = this._canvas.getContext('2d');
    const width = this._canvas.width;
    const height = this._canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (!this._sensorData || this._sensorData.length === 0) return;
    
    // Get image bounds in pixel coordinates
    const imgTopLeft = this._map.latLngToContainerPoint([IMAGE_HEIGHT.value, 0]);
    const imgBottomRight = this._map.latLngToContainerPoint([0, IMAGE_WIDTH.value]);
    
    const imgLeft = Math.max(0, imgTopLeft.x);
    const imgTop = Math.max(0, imgTopLeft.y);
    const imgRight = Math.min(width, imgBottomRight.x);
    const imgBottom = Math.min(height, imgBottomRight.y);
    
    // Skip if image not visible
    if (imgLeft >= imgRight || imgTop >= imgBottom) return;
    
    // Create imageData for pixel manipulation
    const imgWidth = Math.ceil(imgRight - imgLeft);
    const imgHeight = Math.ceil(imgBottom - imgTop);
    
    if (imgWidth <= 0 || imgHeight <= 0) return;
    
    const imageData = ctx.createImageData(imgWidth, imgHeight);
    const data = imageData.data;
    
    // Prepare sensor data with pixel positions
    const sensors = this._sensorData.map(sensor => {
      const loc = nodeLocations.value[sensor.node_id];
      if (!loc) return null;
      const [y, x] = loc;
      const pixelPos = this._map.latLngToContainerPoint([y, x]);
      return {
        px: pixelPos.x - imgLeft,
        py: pixelPos.y - imgTop,
        intensity: normalizeValue(sensor.value),
        value: parseFloat(sensor.value),
      };
    }).filter(s => s !== null);
    
    if (sensors.length === 0) return;
    
    // Render each pixel using IDW (Inverse Distance Weighting)
    // SEMUA sensor mempengaruhi SEMUA pixel, dengan bobot berdasarkan jarak
    const RESOLUTION = 2; // Skip pixels for performance (1 = full, 2 = half, etc)
    const epsilon = 1;
    const radiusPx = Math.max(
      1,
      Math.abs(
        this._map.latLngToContainerPoint([0, this.options.radius]).x -
        this._map.latLngToContainerPoint([0, 0]).x
      )
    );
    
    for (let py = 0; py < imgHeight; py += RESOLUTION) {
      for (let px = 0; px < imgWidth; px += RESOLUTION) {
        let weightSum = 0;
        let valueSum = 0;
        let minDist = Infinity;
        
        // Hitung pengaruh dari SEMUA sensor
        for (const sensor of sensors) {
          const dx = px - sensor.px;
          const dy = py - sensor.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Track jarak terdekat untuk alpha calculation
          if (dist < minDist) minDist = dist;
          
          // IDW: weight = 1 / distance²
          // Tambah epsilon untuk avoid division by zero saat tepat di sensor
          const denominator = (dist + epsilon) * (dist + epsilon);
          const weight = 1 / denominator;
          
          weightSum += weight;
          valueSum += weight * sensor.intensity;
        }
        
        // Calculate final intensity (weighted average)
        const intensity = valueSum / weightSum;
        const color = interpolateColor(intensity);
        
        // Alpha: fade di edges berdasarkan jarak ke sensor terdekat
        // radiusPx berfungsi sebagai "max influence distance" untuk alpha
        // Alpha: 1.0 di dekat sensor, fade ke 0 di luar radius
        let alpha;
        if (minDist < radiusPx * 0.5) {
          // Fully opaque near sensors
          alpha = this.options.opacity;
        } else if (minDist < radiusPx) {
          // Gradient fade
          const fadeProgress = (minDist - radiusPx * 0.5) / (radiusPx * 0.5);
          alpha = this.options.opacity * (1 - fadeProgress * 0.5);
        } else {
          // Outside radius - partial fade but don't disappear
          const fadeProgress = Math.min(1, (minDist - radiusPx) / radiusPx);
          alpha = this.options.opacity * (0.5 - fadeProgress * 0.3);
        }
        
        // Minimum alpha to ensure some color everywhere
        alpha = Math.max(alpha, 0.15);
        
        // Fill pixels (with resolution)
        for (let ry = 0; ry < RESOLUTION && py + ry < imgHeight; ry++) {
          for (let rx = 0; rx < RESOLUTION && px + rx < imgWidth; rx++) {
            const idx = ((py + ry) * imgWidth + (px + rx)) * 4;
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
  },
});

function drawCustomHeatmap(sensorData) {
  if (customHeatLayer) {
    customHeatLayer.setData(sensorData);
  } else {
    customHeatLayer = new CanvasHeatmapLayer(sensorData, {
      opacity: 0.65,
      radius: HEATMAP_RADIUS,
    });
    customHeatLayer.addTo(map);
  }
}

// Variable untuk menyimpan image overlay agar bisa di-update
let imageOverlay = null;

// Helper function untuk mendapatkan zoom optimal berdasarkan greenhouse
// ===============================
// DYNAMIC MAP HEIGHT
// Menghitung tinggi container map berdasarkan aspect ratio gambar greenhouse
// agar denah fit sempurna tanpa whitespace di mobile
// ===============================
function updateMapHeight() {
  const container = mapContainer.value;
  if (!container) return;
  
  // Dapatkan lebar container yang tersedia
  const containerWidth = container.clientWidth || container.offsetWidth;
  if (containerWidth <= 0) return;
  
  const imgWidth = IMAGE_WIDTH.value;
  const imgHeight = IMAGE_HEIGHT.value;
  const aspectRatio = imgHeight / imgWidth;
  
  // fitBounds padding (harus sama dengan getOptimalZoomSettings)
  const fitPadding = window.innerWidth < 768 ? 0 : 10;
  
  // Leaflet fitBounds mereserve padding di kiri-kanan,
  // jadi gambar sebenarnya di-render di area (containerWidth - 2*fitPadding)
  // Tinggi gambar = (containerWidth - 2*fitPadding) * aspectRatio
  // Container height = tinggi gambar + 2*fitPadding (atas-bawah)
  const availableWidth = containerWidth - (fitPadding * 2);
  const imageHeight = availableWidth * aspectRatio;
  let calculatedHeight = Math.round(imageHeight + (fitPadding * 2));
  
  // Minimum dan maximum height
  const minHeight = window.innerWidth < 768 ? 120 : 200;
  const maxHeight = window.innerWidth >= 1024 ? 500 : 450;
  calculatedHeight = Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
  
  mapHeight.value = calculatedHeight + 'px';
}

function getFitMinZoom(fitPadding) {
  const container = mapContainer.value;
  if (!container) return window.innerWidth < 768 ? -3 : -1;

  const containerWidth = container.clientWidth || container.offsetWidth || 0;
  const containerHeight =
    container.clientHeight ||
    parseInt(mapHeight.value, 10) ||
    280;

  const availableWidth = Math.max(1, containerWidth - (fitPadding * 2));
  const availableHeight = Math.max(1, containerHeight - (fitPadding * 2));

  // CRS.Simple: 1 unit = 1 pixel pada zoom 0, jadi gunakan log2 untuk hitung zoom fit.
  const widthFitZoom = Math.log2(availableWidth / IMAGE_WIDTH.value);
  const heightFitZoom = Math.log2(availableHeight / IMAGE_HEIGHT.value);
  const fitZoom = Math.min(widthFitZoom, heightFitZoom);

  // Round down ke 0.1 agar tidak ada crop karena pembulatan float.
  return Math.floor((fitZoom - 0.01) * 10) / 10;
}

function getOptimalZoomSettings() {
  const fitPadding = window.innerWidth < 768 ? 0 : 10;
  const minZoom = getFitMinZoom(fitPadding);
  
  return {
    minZoom,
    fitMaxZoom: 4,  // Biarkan fitBounds menentukan zoom terbaik
    padding: [fitPadding, fitPadding]
  };
}

function initMap() {
  const bounds = [
    [0, 0],
    [IMAGE_HEIGHT.value, IMAGE_WIDTH.value],
  ];

  const zoomSettings = getOptimalZoomSettings();

  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: zoomSettings.minZoom,
    maxZoom: 2,
    zoomSnap: 0.1,
    zoomDelta: 0.25,
    zoomControl: true,
    attributionControl: false,
  });

  // Image overlay dengan bounds - menggunakan gambar sesuai greenhouse aktif
  imageOverlay = L.imageOverlay(currentGreenhouseImage.value, bounds).addTo(map);
  
  // Fit ke bounds gambar dengan zoom optimal
  map.fitBounds(bounds, { padding: zoomSettings.padding, maxZoom: zoomSettings.fitMaxZoom });
  
  // Batasi panning agar tidak terlalu jauh dari gambar
  map.setMaxBounds([
    [-20, -20],
    [IMAGE_HEIGHT.value + 20, IMAGE_WIDTH.value + 20],
  ]);

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

  pendingClipFrame = requestAnimationFrame(() => {
    pendingClipFrame = null;
    clipHeatmapToBounds();
  });
}

function scheduleHeatmapUpdate() {
  if (pendingHeatmapFrame !== null) {
    cancelAnimationFrame(pendingHeatmapFrame);
  }

  pendingHeatmapFrame = requestAnimationFrame(() => {
    pendingHeatmapFrame = null;
    updateHeatmap();
  });
}

function clipHeatmapToBounds() {
  if (!map) return;

  const heatCanvas = customHeatLayer?._canvas;
  if (!heatCanvas) {
    return;
  }
  
  // Dapatkan posisi pixel dari bounds gambar
  const topLeft = map.latLngToContainerPoint([IMAGE_HEIGHT.value, 0]);
  const bottomRight = map.latLngToContainerPoint([0, IMAGE_WIDTH.value]);

  const left = Math.max(0, topLeft.x);
  const top = Math.max(0, topLeft.y);
  const right = bottomRight.x;
  const bottom = bottomRight.y;
  const clipPath = `polygon(${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px)`;

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
  const sensorData = currentSensorData.value.filter(
    (sensor) => nodeLocations.value[sensor.node_id]
  );

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

  drawCustomHeatmap(sensorData);  // Render heatmap canvas
  drawMarkers();                   // Render marker circles
  scheduleClipHeatmap();
}

// ===============================
// AUTO-REFRESH FUNCTIONS
// ===============================
function startAutoRefresh() {
  // Clear existing interval if any
  stopAutoRefresh();
  
  // Set new interval
  autoRefreshInterval = setInterval(() => {
    // Refresh data dari server via Inertia tanpa full page reload
    // OPTIMIZED: Tidak perlu gh_id karena server sekarang mengirim semua data greenhouse
    router.get(route("heatmap"), {}, {
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
onMounted(() => {
  // Hitung tinggi map sebelum inisialisasi
  updateMapHeight();
  
  // Tunggu sebentar agar DOM terupdate dengan tinggi baru
  nextTick(() => {
    initMap();
    startAutoRefresh();
  });
  
  // ResizeObserver untuk recalculate saat resize window
  // DEBOUNCED: Hanya fire setelah 350ms stabil (setelah CSS transition selesai)
  if (window.ResizeObserver && mapContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      // Skip jika sedang transisi GH switch (ditangani oleh watcher)
      if (isTransitioning) return;
      
      clearTimeout(resizeDebounceTimer);
      resizeDebounceTimer = setTimeout(() => {
        updateMapHeight();
        if (map) {
          nextTick(() => {
            map.invalidateSize();
            const bounds = [[0, 0], [IMAGE_HEIGHT.value, IMAGE_WIDTH.value]];
            const zoomSettings = getOptimalZoomSettings();
            map.setMinZoom(zoomSettings.minZoom);
            map.fitBounds(bounds, { padding: zoomSettings.padding, maxZoom: zoomSettings.fitMaxZoom });
            scheduleClipHeatmap();
          });
        }
      }, 350);
    });
    resizeObserver.observe(mapContainer.value);
  }
});

// Saat komponen di-unmount, hentikan auto-refresh
onUnmounted(() => {
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
watch(activeGH, (newGhId) => {
  if (!imageOverlay || !map) return;
  
  isTransitioning = true;
  
  // Step 1: Fade out map content
  mapOpacity.value = 0;
  
  // Step 2: Setelah fade out selesai (300ms), update height + content
  setTimeout(() => {
    // Update tinggi container berdasarkan aspect ratio GH baru
    updateMapHeight();
    
    // Step 3: Setelah height transition selesai (300ms), update Leaflet
    setTimeout(() => {
      const bounds = [
        [0, 0],
        [IMAGE_HEIGHT.value, IMAGE_WIDTH.value],
      ];
      
      // Remove old overlay dan tambah yang baru
      map.removeLayer(imageOverlay);
      imageOverlay = L.imageOverlay(currentGreenhouseImage.value, bounds).addTo(map);
      
      const zoomSettings = getOptimalZoomSettings();
      map.setMinZoom(zoomSettings.minZoom);
      
      // Invalidate size karena container height sudah berubah
      map.invalidateSize();
      
      map.setMaxBounds([
        [-20, -20],
        [IMAGE_HEIGHT.value + 20, IMAGE_WIDTH.value + 20],
      ]);
      map.fitBounds(bounds, { padding: zoomSettings.padding, maxZoom: zoomSettings.fitMaxZoom });
      
      imageOverlay.bringToBack();
      
      // Clear dan redraw heatmap
      if (customHeatLayer) {
        map.removeLayer(customHeatLayer);
        customHeatLayer = null;
      }
      scheduleHeatmapUpdate();
      
      // Step 4: Fade in map content
      requestAnimationFrame(() => {
        mapOpacity.value = 1;
        isTransitioning = false;
      });
    }, 350); // Tunggu height transition CSS selesai
  }, 300); // Tunggu fade out selesai
});

// Watch 2: Saat user switch parameter (Temperature/Humidity/Light Intensity)
// Tidak perlu request server, cukup update heatmap dengan data yang sudah ada
watch(activeParameter, () => {
  scheduleHeatmapUpdate();
});

// Watch 3: Saat data dari server berubah (auto-refresh)
// OPTIMIZED: Watch signature data aktif agar tidak deep-watch seluruh payload.
watch(
  currentSensorDataSignature,
  () => {
    scheduleHeatmapUpdate();
  }
);

watch(
  () => `${currentThresholds.value.min}|${currentThresholds.value.max}`,
  () => {
    scheduleHeatmapUpdate();
  }
);
</script>

<template>
  <Head :title="t('title.heatmap')" />
  <BreezeAuthenticatedLayout titlePage="Heatmap">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ t("title.heatmap") }}
      </h2>
    </template>

    <div class="py-2">
      <div class="max-w-7xl mx-auto sm:px-2 lg:px-2">

        <!-- SWITCH GREENHOUSE -->
        <Tabs
          :greenhouses="props.greenhouses"
          v-model="activeGH"
        />

        <!-- INFO CARD: Time & Latest Data (sama seperti Monitoring) -->
        <div class="bg-white overflow-hidden shadow-sm rounded-lg p-4 mt-3">
          <div class="flex flex-col w-full">
            <div class="flex justify-between">
              <p>{{ t("monitoring.time") }}</p>
              <DigitalClock />
            </div>
            <div class="flex justify-between">
              <p>{{ t("monitoring.latest_data") }}</p>
              <p>{{ currentLatestTime }}</p>
            </div>
          </div>
        </div>

        <!-- MAP + LEGEND -->
        <div class="heatmap-layout">

          <!-- MAP -->
          <div class="map-container">
            <div
              ref="mapContainer"
              class="map-view"
              :style="{ height: mapHeight, opacity: mapOpacity }"
            ></div>
          </div>

          <!-- LEGEND MOBILE (Horizontal, linear) -->
          <div class="legend-mobile">
            <p class="legend-mobile-title">{{ currentConfig.label }} ({{ currentConfig.unit }})</p>
            <div class="legend-mobile-content">
              <div class="legend-mobile-edge">
                <span class="edge-value">{{ currentConfig.min }}</span>
                <span class="edge-label">Min</span>
              </div>
              
              <div class="legend-mobile-bar-wrapper">
                <div class="legend-mobile-bar" :style="legendGradientStyleHorizontal"></div>
                <div class="legend-mobile-center">
                  <span class="edge-value">{{ Math.round((currentConfig.min + currentConfig.max) / 2) }}</span>
                  <span class="edge-label">Avg</span>
                </div>
              </div>
              
              <div class="legend-mobile-edge">
                <span class="edge-value">{{ currentConfig.max }}</span>
                <span class="edge-label">Max</span>
              </div>
            </div>
          </div>

          <!-- LEGEND DESKTOP (Vertical, sidebar on desktop) -->
          <div class="legend-desktop">
            <p class="text-sm font-semibold text-gray-700 mb-3">
              {{ currentConfig.label }} ({{ currentConfig.unit }})
            </p>

            <div class="legend-desktop-content">
              <!-- Legend Bar (linear: biru ke merah) -->
              <div class="legend-bar-container">
                <div class="legend-bar" :style="legendGradientStyle"></div>
              </div>
              
              <!-- Scale Labels (linear) -->
              <div class="legend-labels">
                <span><b>{{ currentConfig.max }}</b><br />Max</span>
                <span>{{ Math.round(currentConfig.min + (currentConfig.max - currentConfig.min) * 0.75) }}</span>
                <span><b style="color: #2563eb;">{{ Math.round((currentConfig.min + currentConfig.max) / 2) }}</b><br />Avg</span>
                <span>{{ Math.round(currentConfig.min + (currentConfig.max - currentConfig.min) * 0.25) }}</span>
                <span><b>{{ currentConfig.min }}</b><br />Min</span>
              </div>
            </div>
            
          </div>

        </div>

        <!-- PARAMETER BUTTON -->
        <div class="param-buttons">
          <button
            class="param-btn"
            :class="activeParameter === 'temperature'
              ? 'param-active'
              : 'param-inactive'"
            @click="activeParameter = 'temperature'"
          >
            {{ t("sensor.temperature") }}
          </button>
          <button
            class="param-btn"
            :class="activeParameter === 'humidity'
              ? 'param-active'
              : 'param-inactive'"
            @click="activeParameter = 'humidity'"
          >
            {{ t("sensor.humidity") }}
          </button>
          <button
            class="param-btn"
            :class="activeParameter === 'lux'
              ? 'param-active'
              : 'param-inactive'"
            @click="activeParameter = 'lux'"
          >
            {{ t("sensor.light_intensity") }}
          </button>
        </div>

      </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<style scoped>

/* ===========================
   LAYOUT - RESPONSIVE
   =========================== */
.heatmap-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

@media (min-width: 1024px) {
  .heatmap-layout {
    flex-direction: row;
  }
}

/* ===========================
   MAP CONTAINER
   =========================== */
.map-container {
  flex: 1;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  /* Mobile: full rounded */
  border-radius: 0.5rem;
  padding: 0.75rem;
}

@media (min-width: 640px) {
  .map-container {
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  .map-container {
    /* Desktop: bottom-left not rounded (button attached) */
    border-radius: 0.5rem 0.5rem 0.5rem 0;
  }
}

.map-view {
  width: 100%;
  /* height di-set secara dynamic via inline style berdasarkan aspect ratio */
  height: 280px; /* Fallback jika JS belum jalan */
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: height 0.3s ease, opacity 0.3s ease;
}

/* ===========================
   LEGEND MOBILE (Horizontal)
   =========================== */
.legend-mobile {
  display: block;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}

@media (min-width: 1024px) {
  .legend-mobile {
    display: none;
  }
}

.legend-mobile-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
  margin-bottom: 0.5rem;
}

.legend-mobile-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.legend-mobile-edge {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
}

.legend-mobile-edge .edge-value {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.legend-mobile-edge .edge-label {
  font-size: 11px;
  font-weight: 400;
  color: #6b7280;
}

.legend-mobile-bar-wrapper {
  position: relative;
  flex: 1;
  max-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.legend-mobile-bar {
  position: relative;
  width: 100%;
  height: 16px;
  border-radius: 8px;
}

.legend-mobile-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
}

.legend-mobile-center .edge-value {
  font-size: 12px;
  font-weight: 700;
  color: #22c55e;
}

.legend-mobile-center .edge-label {
  font-size: 10px;
  font-weight: 500;
  color: #2563eb;
}

/* ===========================
   LEGEND DESKTOP (Vertical)
   =========================== */
.legend-desktop {
  display: none;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  min-width: 160px;
}

@media (min-width: 1024px) {
  .legend-desktop {
    display: block;
  }
}

.legend-desktop-content {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
  justify-content: center;
  height: 380px;
}

/* ===========================
   LEGEND BAR (Desktop)
   =========================== */
.legend-bar-container {
  position: relative;
  width: 22px;
}

.legend-bar {
  width: 22px;
  height: 100%;
  border-radius: 12px;
}

.legend-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  color: #4b5563;
  text-align: center;
}

/* ===========================
   PARAMETER BUTTONS
   =========================== */
.param-buttons {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin-top: 0.75rem;
}

.param-buttons::-webkit-scrollbar {
  display: none;
}

@media (min-width: 1024px) {
  .param-buttons {
    gap: 0.25rem;
    margin-top: 0;
  }
}

.param-btn {
  flex: 1;
  min-width: 0;
  padding: 0.65rem 0.5rem;
  font-size: 0.875rem;
  /* Mobile: full rounded */
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  white-space: nowrap;
  text-align: center;
}

@media (min-width: 1024px) {
  .param-btn {
    flex: none;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    /* Desktop: only bottom rounded (attached to map) */
    border-radius: 0;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    border: none;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
}

.param-active {
  background-color: #ffffff;
  color: #4b5563;
}

.param-inactive {
  background-color: #e5e7eb;
  color: #4b5563;
}

.param-inactive:active,
.param-inactive:hover {
  background-color: #d1d5db;
  color: #374151;
}

.leaflet-container {
  background: #f9fafb;
}
</style>

<style>
/* MARKER STYLES (global, tidak scoped) */
.custom-marker {
  background: transparent;
  border: none;
}

.marker-pin {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.marker-pin:hover {
  transform: scale(1.2);
}

.marker-number {
  color: white;
  font-weight: bold;
  font-size: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* POPUP STYLES */
.node-popup .leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.node-popup .leaflet-popup-content {
  margin: 12px 16px;
}

.node-popup .leaflet-popup-tip {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Popup untuk node atas - panah mengarah ke atas */
.popup-bottom.leaflet-popup .leaflet-popup-tip-container {
  top: -19px !important;
  bottom: auto !important;
  margin-top: 0 !important;
  transform: rotate(180deg) !important;
}

.popup-bottom.leaflet-popup .leaflet-popup-content-wrapper {
  margin-top: 0 !important;
}

/* Turunkan z-index Leaflet controls agar tidak muncul di atas sidebar mobile */
.leaflet-control-container,
.leaflet-control-container .leaflet-top,
.leaflet-control-container .leaflet-left,
.leaflet-control-container .leaflet-right,
.leaflet-control-container .leaflet-bottom,
.leaflet-top.leaflet-left,
.leaflet-top.leaflet-right,
.leaflet-control-zoom,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out,
.leaflet-control {
  z-index: 500 !important;
}
</style>

