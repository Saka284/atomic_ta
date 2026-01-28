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

import { onMounted, onUnmounted, ref, watch, computed } from "vue";
import { Head } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import Tabs from "@/Components/Tabs.vue";
import DigitalClock from "@/Components/DigitalClock.vue";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
const mapContainer = ref(null);                   // Reference ke container div untuk Leaflet
let autoRefreshInterval = null;                   // Interval untuk auto-refresh

// ===============================
// AUTO-REFRESH INTERVAL (30 detik)
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
  temperature: { min: 0, max: 40, unit: '°C', label: 'Temperature' },
  humidity: { min: 0, max: 100, unit: '%', label: 'Humidity' },
  lux: { min: 0, max: 65535, unit: 'lux', label: 'Light Intensity' },
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



// ===============================
// COMPUTED: LEGEND GRADIENT STYLE
// Gradient langsung dari threshold min ke max (skala sudah = threshold)
// ===============================
const legendGradientStyle = computed(() => {
  // Gradient colors - langsung dari 0% ke 100% karena skala = threshold
  const gradientColors = [
    { pos: 0, color: "#2563eb" },    // Biru (Aman)
    { pos: 0.15, color: "#3b82f6" }, // Biru terang
    { pos: 0.3, color: "#06b6d4" },  // Cyan (Normal)
    { pos: 0.45, color: "#facc15" }, // Kuning (Waspada)
    { pos: 0.6, color: "#fb923c" },  // Orange
    { pos: 0.8, color: "#ef4444" },  // Merah
    { pos: 1, color: "#dc2626" },    // Merah gelap (Kritis)
  ];
  
  const stops = gradientColors.map(({ pos, color }) => `${color} ${pos * 100}%`);
  
  return {
    background: `linear-gradient(to top, ${stops.join(", ")})`
  };
});

// Horizontal gradient untuk mobile legend
const legendGradientStyleHorizontal = computed(() => {
  const gradientColors = [
    { pos: 0, color: "#2563eb" },
    { pos: 0.15, color: "#3b82f6" },
    { pos: 0.3, color: "#06b6d4" },
    { pos: 0.45, color: "#facc15" },
    { pos: 0.6, color: "#fb923c" },
    { pos: 0.8, color: "#ef4444" },
    { pos: 1, color: "#dc2626" },
  ];
  
  const stops = gradientColors.map(({ pos, color }) => `${color} ${pos * 100}%`);
  
  return {
    background: `linear-gradient(to right, ${stops.join(", ")})`
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
  const val = parseFloat(value);
  if (isNaN(val)) return 0;
  const thresholds = currentThresholds.value;
  
  // Rumus normalisasi: (nilai - min) / (max - min)
  let normalized = (val - thresholds.min) / (thresholds.max - thresholds.min);
  
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
  const val = parseFloat(value);
  const thresholds = currentThresholds.value;
  const range = thresholds.max - thresholds.min;
  
  // Normalisasi nilai: 0 = min, 1 = max
  let normalized = (val - thresholds.min) / range;
  normalized = Math.max(0, Math.min(1, normalized)); // Clamp 0-1
  
  // Gradient colors SAMA dengan heatmap dan legend
  const gradientColors = [
    { stop: 0.0, r: 37, g: 99, b: 235 },    // #2563eb - Biru (Aman)
    { stop: 0.15, r: 59, g: 130, b: 246 },  // #3b82f6 - Biru terang
    { stop: 0.3, r: 6, g: 182, b: 212 },    // #06b6d4 - Cyan (Normal)
    { stop: 0.45, r: 250, g: 204, b: 21 },  // #facc15 - Kuning (Waspada)
    { stop: 0.6, r: 251, g: 146, b: 60 },   // #fb923c - Orange
    { stop: 0.8, r: 239, g: 68, b: 68 },    // #ef4444 - Merah
    { stop: 1.0, r: 220, g: 38, b: 38 },    // #dc2626 - Merah gelap (Kritis)
  ];
  
  // Interpolasi warna berdasarkan normalized value
  let lower = gradientColors[0];
  let upper = gradientColors[gradientColors.length - 1];
  
  for (let i = 0; i < gradientColors.length - 1; i++) {
    if (normalized >= gradientColors[i].stop && normalized <= gradientColors[i + 1].stop) {
      lower = gradientColors[i];
      upper = gradientColors[i + 1];
      break;
    }
  }
  
  const rangeStop = upper.stop - lower.stop;
  const t = rangeStop === 0 ? 0 : (normalized - lower.stop) / rangeStop;
  
  const r = Math.round(lower.r + (upper.r - lower.r) * t);
  const g = Math.round(lower.g + (upper.g - lower.g) * t);
  const b = Math.round(lower.b + (upper.b - lower.b) * t);
  
  const color = `rgb(${r}, ${g}, ${b})`;
  
  // Tentukan text status berdasarkan zona
  let text;
  if (normalized <= 0.3) text = "Aman";
  else if (normalized <= 0.5) text = "Normal";
  else if (normalized <= 1) text = "Waspada";
  else text = "Kritis";
  
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
      closeButton: true,
      className: isTopNode ? "node-popup popup-bottom" : "node-popup",
      // Offset: [x, y] - y positif = popup ke bawah
      offset: isTopNode ? [0, 140] : [0, 0],
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
// GRADIENT COLORS UNTUK HEATMAP
// ===============================
/**
 * Definisi warna gradient berdasarkan nilai normalized (0-1.5)
 * Format: { stop, r, g, b }
 * - stop: posisi di gradient (0 = nilai min, 1 = nilai max)
 * - r, g, b: komponen warna RGB
 */
// HARUS SAMA dengan legend gradient untuk konsistensi warna!
const heatmapGradientColors = [
  { stop: 0.0, r: 37, g: 99, b: 235 },    // #2563eb - Biru (Aman)
  { stop: 0.15, r: 59, g: 130, b: 246 },  // #3b82f6 - Biru terang
  { stop: 0.3, r: 6, g: 182, b: 212 },    // #06b6d4 - Cyan (Normal)
  { stop: 0.45, r: 250, g: 204, b: 21 },  // #facc15 - Kuning (Waspada)
  { stop: 0.6, r: 251, g: 146, b: 60 },   // #fb923c - Orange
  { stop: 0.8, r: 239, g: 68, b: 68 },    // #ef4444 - Merah
  { stop: 1.0, r: 220, g: 38, b: 38 },    // #dc2626 - Merah gelap (Kritis)
];

function interpolateColor(value) {
  // Clamp value 0-1.5 (1.5 for Kritis)
  const v = Math.max(0, Math.min(1.5, value));
  
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
  const t = range === 0 ? 0 : (v - lower.stop) / range;
  
  return {
    r: Math.round(lower.r + (upper.r - lower.r) * t),
    g: Math.round(lower.g + (upper.g - lower.g) * t),
    b: Math.round(lower.b + (upper.b - lower.b) * t),
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
    
    // IDW power parameter - higher = sharper transitions near sensors
    const IDW_POWER = 2;
    
    // Render each pixel using IDW (Inverse Distance Weighting)
    // SEMUA sensor mempengaruhi SEMUA pixel, dengan bobot berdasarkan jarak
    const RESOLUTION = 2; // Skip pixels for performance (1 = full, 2 = half, etc)
    
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
          
          // IDW: weight = 1 / distance^power
          // Tambah epsilon untuk avoid division by zero saat tepat di sensor
          const epsilon = 1;
          const weight = 1 / Math.pow(dist + epsilon, IDW_POWER);
          
          weightSum += weight;
          valueSum += weight * sensor.intensity;
        }
        
        // Calculate final intensity (weighted average)
        const intensity = valueSum / weightSum;
        const color = interpolateColor(intensity);
        
        // Alpha: fade di edges berdasarkan jarak ke sensor terdekat
        // radiusPx berfungsi sebagai "max influence distance" untuk alpha
        const radiusPx = Math.abs(
          this._map.latLngToContainerPoint([0, this.options.radius]).x -
          this._map.latLngToContainerPoint([0, 0]).x
        );
        
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
function getOptimalZoomSettings() {
  const isMobile = window.innerWidth < 768;
  
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
  const bounds = [
    [0, 0],
    [IMAGE_HEIGHT.value, IMAGE_WIDTH.value],
  ];

  const zoomSettings = getOptimalZoomSettings();

  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: zoomSettings.minZoom,
    maxZoom: 2,
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
  map.on('zoomend moveend zoom move', () => {
    requestAnimationFrame(clipHeatmapToBounds);
  });
  
  updateHeatmap();
}

function clipHeatmapToBounds() {
  if (!map) return;
  
  // Dapatkan posisi pixel dari bounds gambar
  const topLeft = map.latLngToContainerPoint([IMAGE_HEIGHT.value, 0]);
  const bottomRight = map.latLngToContainerPoint([0, IMAGE_WIDTH.value]);
  
  // Cari semua canvas heatmap (bisa lebih dari satu)
  const heatCanvases = document.querySelectorAll('.leaflet-heatmap-layer, .leaflet-pane canvas');
  heatCanvases.forEach(canvas => {
    const left = Math.max(0, topLeft.x);
    const top = Math.max(0, topLeft.y);
    const right = bottomRight.x;
    const bottom = bottomRight.y;
    
    canvas.style.clipPath = `polygon(${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px)`;
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
  const sensorData = currentSensorData.value.filter(
    (sensor) => nodeLocations.value[sensor.node_id]
  );
  
  if (sensorData.length > 0) {
    drawCustomHeatmap(sensorData);  // Render heatmap canvas
    drawMarkers();                   // Render marker circles
  }
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
    Inertia.get(route("heatmap"), {}, { 
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
  initMap();
  startAutoRefresh();
});

// Saat komponen di-unmount, hentikan auto-refresh
onUnmounted(() => {
  stopAutoRefresh();
});

// ===============================
// WATCHERS - Reaktif terhadap perubahan
// ===============================

// Watch 1: Saat user switch greenhouse
// OPTIMIZED: Tidak perlu request ke server! Data sudah di-preload.
// Cukup update map overlay dan re-render heatmap dengan data yang sudah ada.
watch(activeGH, (newGhId) => {
  // Update image overlay dan bounds ke greenhouse yang baru
  if (imageOverlay && map) {
    // Bounds baru sesuai dimensi gambar greenhouse yang dipilih
    const bounds = [
      [0, 0],
      [IMAGE_HEIGHT.value, IMAGE_WIDTH.value],
    ];
    
    // Remove old overlay dan tambah yang baru
    map.removeLayer(imageOverlay);
    imageOverlay = L.imageOverlay(currentGreenhouseImage.value, bounds).addTo(map);
    
    // Update map bounds dan fit ke gambar baru dengan zoom optimal
    const zoomSettings = getOptimalZoomSettings();
    
    // Update minZoom sesuai greenhouse
    map.setMinZoom(zoomSettings.minZoom);
    
    map.setMaxBounds([
      [-20, -20],
      [IMAGE_HEIGHT.value + 20, IMAGE_WIDTH.value + 20],
    ]);
    map.fitBounds(bounds, { padding: zoomSettings.padding, maxZoom: zoomSettings.fitMaxZoom });
    
    // Pindahkan image ke belakang agar heatmap tetap di atas
    imageOverlay.bringToBack();
    
    // Clear dan redraw heatmap dengan posisi node baru
    if (customHeatLayer) {
      map.removeLayer(customHeatLayer);
      customHeatLayer = null;
    }
    
    // OPTIMIZED: Update heatmap langsung dengan data yang sudah ada
    updateHeatmap();
  }
});

// Watch 2: Saat user switch parameter (Temperature/Humidity/Light Intensity)
// Tidak perlu request server, cukup update heatmap dengan data yang sudah ada
watch(activeParameter, () => {
  updateHeatmap();
});

// Watch 3: Saat data dari server berubah (auto-refresh)
// OPTIMIZED: Watch sensorDataByGh karena struktur data baru
watch(
  () => props.sensorDataByGh,
  () => {
    updateHeatmap();
  },
  { deep: true }
);
</script>

<template>
  <Head title="Heatmap" />
  <BreezeAuthenticatedLayout titlePage="Heatmap">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Heatmap
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
              <p>Time</p>
              <DigitalClock />
            </div>
            <div class="flex justify-between">
              <p>Latest Data</p>
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
            ></div>
          </div>

          <!-- LEGEND MOBILE (Horizontal, always visible on mobile) -->
          <div class="legend-mobile">
            <p class="legend-mobile-title">{{ currentConfig.label }} ({{ currentConfig.unit }})</p>
            <div class="legend-mobile-content">
              <div class="legend-mobile-edge">
                <span class="edge-value">{{ currentConfig.min }}</span>
                <span class="edge-label">Aman</span>
              </div>
              
              <div class="legend-mobile-bar" :style="legendGradientStyleHorizontal"></div>
              
              <div class="legend-mobile-edge">
                <span class="edge-value">{{ currentConfig.max }}</span>
                <span class="edge-label">Kritis</span>
              </div>
            </div>
          </div>

          <!-- LEGEND DESKTOP (Vertical, sidebar on desktop) -->
          <div class="legend-desktop">
            <p class="text-sm font-semibold text-gray-700 mb-3">
              {{ currentConfig.label }} ({{ currentConfig.unit }})
            </p>

            <div class="legend-desktop-content">
              <!-- Legend Bar (skala langsung dari threshold min ke max) -->
              <div class="legend-bar-container">
                <div class="legend-bar" :style="legendGradientStyle"></div>
              </div>
              
              <!-- Scale Labels (dynamic) -->
              <div class="legend-labels">
                <span><b>{{ currentConfig.max }}</b><br />Kritis</span>
                <span>{{ Math.round(currentConfig.max * 0.75) }}</span>
                <span>{{ Math.round(currentConfig.max * 0.5) }}</span>
                <span>{{ Math.round(currentConfig.max * 0.25) }}</span>
                <span><b>{{ currentConfig.min }}</b><br />Aman</span>
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
            Temperature
          </button>
          <button
            class="param-btn"
            :class="activeParameter === 'humidity'
              ? 'param-active'
              : 'param-inactive'"
            @click="activeParameter = 'humidity'"
          >
            Humidity
          </button>
          <button
            class="param-btn"
            :class="activeParameter === 'lux'
              ? 'param-active'
              : 'param-inactive'"
            @click="activeParameter = 'lux'"
          >
            Light Intensity
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
  height: 280px; /* Mobile default */
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
}

@media (min-width: 480px) {
  .map-view {
    height: 350px;
  }
}

@media (min-width: 640px) {
  .map-view {
    height: 400px;
  }
}

@media (min-width: 1024px) {
  .map-view {
    height: 450px;
  }
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

.legend-mobile-bar {
  position: relative;
  flex: 1;
  max-width: 180px;
  height: 16px;
  border-radius: 8px;
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
  top: -1px !important;
  bottom: auto !important;
  margin-top: 0 !important;
  transform: rotate(180deg) !important;
}

.popup-bottom.leaflet-popup .leaflet-popup-content-wrapper {
  margin-top: 13px;
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

