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

import { onMounted, ref, watch, computed } from "vue";
import { Head } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import Tabs from "@/Components/Tabs.vue";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ===============================
// PROPS DARI CONTROLLER
// Data yang dikirim dari PageController@heatmap
// ===============================
const props = defineProps({
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
    default: () => ({ min: 25, max: 35 }),
  },
  humidityThresholds: {
    type: Object,
    default: () => ({ min: 50, max: 80 }),
  },
  luxThresholds: {
    type: Object,
    default: () => ({ min: 20000, max: 50000 }),
  },
});

// ===============================
// REACTIVE STATE
// ===============================
const activeGH = ref(props.activeGhId);           // Greenhouse yang dipilih
const activeParameter = ref("temperature");       // Parameter aktif (temperature/humidity/lux)
const mapContainer = ref(null);                   // Reference ke container div untuk Leaflet
const showLegend = ref(false);                    // Toggle legend di mobile

// ===============================
// KONFIGURASI GREENHOUSE
// Setiap greenhouse punya dimensi gambar dan posisi node yang berbeda
// ===============================
const greenhouseConfig = {
  // GH 1 - Landscape layout
  1: {
    width: 1024,
    height: 450,
    image: '/images/greenhouse_plan.png',
    // Node positions: { node_id: [y, x] }
    nodeLocations: {
      1: [420, 150],   // Bawah kiri
      2: [35, 310],    // Atas kiri-tengah
      3: [420, 585],   // Bawah tengah
      4: [35, 785],    // Atas kanan-tengah
      5: [420, 950],   // Bawah kanan
    },
  },
  // GH 2 - Portrait/square layout (sesuaikan ukuran dengan gambar sebenarnya)
  2: {
    width: 1768,        // Sesuaikan dengan ukuran gambar GH 2
    height: 1792,       // Sesuaikan dengan ukuran gambar GH 2
    image: '/images/greenhouse_plan2.png',
    // Node positions
    nodeLocations: {
      1: [50, 50],     
      2: [50, 320],
      3: [265, 160],
      4: [265, 480],
      5: [480, 50],
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

// Config untuk parameter yang sedang aktif
const currentConfig = computed(() => parameterConfig[activeParameter.value]);

// Threshold (min/max) untuk parameter aktif - dari database
const currentThresholds = computed(() => {
  if (activeParameter.value === 'temperature') return props.temperatureThresholds;
  if (activeParameter.value === 'humidity') return props.humidityThresholds;
  return props.luxThresholds;
});

// Data sensor untuk parameter aktif
const currentSensorData = computed(() => {
  if (activeParameter.value === 'temperature') return props.temperatureData;
  if (activeParameter.value === 'humidity') return props.humidityData;
  return props.luxData;
});

// Simbol unit untuk label (° untuk suhu, % untuk humidity, kosong untuk lux)
const unitSymbol = computed(() => {
  if (activeParameter.value === 'temperature') return '°';
  if (activeParameter.value === 'humidity') return '%';
  return '';
});

// ===============================
// POSISI THRESHOLD DI LEGEND (dalam persen)
// Menghitung posisi garis threshold di legend bar
// 0% = nilai minimum, 100% = nilai maximum
// ===============================
const thresholdMinPosition = computed(() => {
  const scaleMin = currentConfig.value.min;
  const scaleMax = currentConfig.value.max;
  // Rumus: (nilai - min) / (max - min) * 100
  const pos = ((currentThresholds.value.min - scaleMin) / (scaleMax - scaleMin)) * 100;
  return Math.min(Math.max(pos, 0), 100); // Clamp antara 0-100
});

const thresholdMaxPosition = computed(() => {
  const scaleMin = currentConfig.value.min;
  const scaleMax = currentConfig.value.max;
  const pos = ((currentThresholds.value.max - scaleMin) / (scaleMax - scaleMin)) * 100;
  return Math.min(Math.max(pos, 0), 100);
});

// ===============================
// COMPUTED: DYNAMIC LEGEND GRADIENT STYLE
// Solid di luar range threshold, gradient di antara min-max
// ===============================
const legendGradientStyle = computed(() => {
  const minPos = thresholdMinPosition.value;
  const maxPos = thresholdMaxPosition.value;
  
  // Warna solid untuk area di luar threshold
  const coldColor = "#2563eb"; // Biru - di bawah min threshold
  const hotColor = "#dc2626";  // Merah - di atas max threshold
  
  // Gradient colors untuk area di antara threshold
  const gradientColors = [
    { pos: 0, color: "#2563eb" },   // Biru
    { pos: 0.15, color: "#3b82f6" }, // Biru terang
    { pos: 0.3, color: "#06b6d4" },  // Cyan
    { pos: 0.45, color: "#facc15" }, // Kuning
    { pos: 0.6, color: "#fb923c" },  // Orange
    { pos: 0.8, color: "#ef4444" },  // Merah
    { pos: 1, color: "#dc2626" },    // Merah gelap
  ];
  
  // Build gradient stops
  const stops = [];
  
  // Area solid di bawah min threshold (warna hijau solid)
  if (minPos > 0) {
    stops.push(`${coldColor} 0%`);
    stops.push(`${coldColor} ${minPos}%`);
  }
  
  // Area gradient di antara min dan max threshold
  gradientColors.forEach(({ pos, color }) => {
    const actualPos = minPos + pos * (maxPos - minPos);
    stops.push(`${color} ${actualPos}%`);
  });
  
  // Area solid di atas max threshold (warna merah solid)
  if (maxPos < 100) {
    stops.push(`${hotColor} ${maxPos}%`);
    stops.push(`${hotColor} 100%`);
  }
  
  return {
    background: `linear-gradient(to top, ${stops.join(", ")})`
  };
});

// Horizontal gradient untuk mobile legend
const legendGradientStyleHorizontal = computed(() => {
  const minPos = thresholdMinPosition.value;
  const maxPos = thresholdMaxPosition.value;
  
  const coldColor = "#2563eb";
  const hotColor = "#dc2626";
  
  const gradientColors = [
    { pos: 0, color: "#2563eb" },
    { pos: 0.15, color: "#3b82f6" },
    { pos: 0.3, color: "#06b6d4" },
    { pos: 0.45, color: "#facc15" },
    { pos: 0.6, color: "#fb923c" },
    { pos: 0.8, color: "#ef4444" },
    { pos: 1, color: "#dc2626" },
  ];
  
  const stops = [];
  
  if (minPos > 0) {
    stops.push(`${coldColor} 0%`);
    stops.push(`${coldColor} ${minPos}%`);
  }
  
  gradientColors.forEach(({ pos, color }) => {
    const actualPos = minPos + pos * (maxPos - minPos);
    stops.push(`${color} ${actualPos}%`);
  });
  
  if (maxPos < 100) {
    stops.push(`${hotColor} ${maxPos}%`);
    stops.push(`${hotColor} 100%`);
  }
  
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
 * Status dibagi menjadi 4 zona berdasarkan threshold:
 * - Aman: 0% - 25% dari range (biru)
 * - Normal: 25% - 50% dari range (cyan)  
 * - Waspada: 50% - 100% dari range (kuning)
 * - Kritis: di atas threshold max (merah)
 */
function getStatus(value) {
  const val = parseFloat(value);
  const thresholds = currentThresholds.value;
  const range = thresholds.max - thresholds.min;
  
  // Hitung batas tiap zona
  const safeLimit = thresholds.min + range * 0.25;    // 25% dari range
  const normalLimit = thresholds.min + range * 0.5;   // 50% dari range
  const warningLimit = thresholds.max;                // 100% = threshold max
  
  // Return status dengan warna yang sesuai
  if (val <= safeLimit) return { text: "Aman", color: "#2563eb" };     // Biru
  if (val <= normalLimit) return { text: "Normal", color: "#06b6d4" }; // Cyan
  if (val <= warningLimit) return { text: "Waspada", color: "#facc15" }; // Kuning
  return { text: "Kritis", color: "#ef4444" };                          // Merah
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
const heatmapGradientColors = [
  { stop: 0.0, r: 37, g: 99, b: 235 },   // #2563eb - Aman (biru)
  { stop: 0.35, r: 6, g: 182, b: 212 },  // #06b6d4 - Normal (cyan)
  { stop: 0.65, r: 250, g: 204, b: 21 }, // #facc15 - Waspada (kuning)
  { stop: 1.0, r: 251, g: 146, b: 60 },  // #fb923c - Mendekati max (orange)
  { stop: 1.25, r: 239, g: 68, b: 68 },  // #ef4444 - Kritis (merah)
  { stop: 1.5, r: 220, g: 38, b: 38 },   // #dc2626 - Sangat Kritis (merah gelap)
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

function initMap() {
  const bounds = [
    [0, 0],
    [IMAGE_HEIGHT.value, IMAGE_WIDTH.value],
  ];

  // Responsive minZoom: mobile lebih zoom out, desktop pas
  const isMobile = window.innerWidth < 768;
  const minZoomValue = isMobile ? -1 : -0.5;
  const fitMaxZoom = isMobile ? 0 : -0.5; // Batasi zoom awal

  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: minZoomValue,
    maxZoom: 2,
    zoomControl: true,
    attributionControl: false,
  });

  // Image overlay dengan bounds - menggunakan gambar sesuai greenhouse aktif
  imageOverlay = L.imageOverlay(currentGreenhouseImage.value, bounds).addTo(map);
  
  // Fit ke bounds gambar - maxZoom mencegah zoom terlalu jauh
  map.fitBounds(bounds, { padding: [5, 5], maxZoom: fitMaxZoom });
  
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
// LIFECYCLE HOOKS
// ===============================

// Saat komponen di-mount, inisialisasi Leaflet map
onMounted(() => {
  initMap();
});

// ===============================
// WATCHERS - Reaktif terhadap perubahan
// ===============================

// Watch 1: Saat user switch greenhouse
// Request data baru dari server dan update image overlay
watch(activeGH, (newGhId) => {
  // Request data baru dari server via Inertia
  Inertia.get(route("heatmap"), { gh_id: newGhId }, { preserveState: true });
  
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
    
    // Update map bounds dan fit ke gambar baru
    map.setMaxBounds([
      [-20, -20],
      [IMAGE_HEIGHT.value + 20, IMAGE_WIDTH.value + 20],
    ]);
    map.fitBounds(bounds, { padding: [5, 5] });
    
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
watch(activeParameter, () => {
  updateHeatmap();
});

// Watch 3: Saat data dari server berubah
// Deep watch untuk mendeteksi perubahan di dalam array
watch(
  [() => props.temperatureData, () => props.humidityData, () => props.luxData],
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
              
              <div class="legend-mobile-bar" :style="legendGradientStyleHorizontal">
                <div 
                  class="mobile-threshold mobile-threshold-min"
                  :style="{ left: thresholdMinPosition + '%' }"
                >
                  <span class="mobile-threshold-label">{{ currentThresholds.min }}{{ unitSymbol }}</span>
                </div>
                <div 
                  class="mobile-threshold mobile-threshold-max"
                  :style="{ left: thresholdMaxPosition + '%' }"
                >
                  <span class="mobile-threshold-label">{{ currentThresholds.max }}{{ unitSymbol }}</span>
                </div>
              </div>
              
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
              <!-- Legend Bar with Threshold Lines -->
              <div class="legend-bar-container">
                <div class="legend-bar" :style="legendGradientStyle"></div>
                
                <!-- Threshold Max Line -->
                <div 
                  class="threshold-line threshold-max"
                  :style="{ bottom: thresholdMaxPosition + '%' }"
                >
                  <span class="threshold-label">Max: {{ currentThresholds.max }}{{ unitSymbol }}</span>
                </div>
                
                <!-- Threshold Min Line -->
                <div 
                  class="threshold-line threshold-min"
                  :style="{ bottom: thresholdMinPosition + '%' }"
                >
                  <span class="threshold-label">Min: {{ currentThresholds.min }}{{ unitSymbol }}</span>
                </div>
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
            
            <!-- Legend Info -->
            <div class="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
              <div class="flex items-center gap-2 mb-1">
                <span class="w-4 h-0.5 bg-red-500"></span>
                <span>Batas Maks</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-4 h-0.5 bg-blue-500"></span>
                <span>Batas Min</span>
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

.mobile-threshold {
  position: absolute;
  top: -2px;
  bottom: -2px;
  width: 3px;
  border-radius: 2px;
  transform: translateX(-50%);
}

.mobile-threshold-min {
  background-color: #3b82f6;
  box-shadow: 0 0 3px rgba(59, 130, 246, 0.5);
}

.mobile-threshold-max {
  background-color: #ef4444;
  box-shadow: 0 0 3px rgba(239, 68, 68, 0.5);
}

.mobile-threshold-label {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  margin-top: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  padding: 2px 4px;
  border-radius: 3px;
  background: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.mobile-threshold-min .mobile-threshold-label {
  color: #3b82f6;
}

.mobile-threshold-max .mobile-threshold-label {
  color: #ef4444;
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
   LEGEND BAR & THRESHOLD (Desktop)
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

.threshold-line {
  position: absolute;
  left: -8px;
  right: -8px;
  height: 3px;
  border-radius: 2px;
  z-index: 10;
}

.threshold-line.threshold-max {
  background-color: #ef4444;
  box-shadow: 0 0 4px rgba(239, 68, 68, 0.5);
}

.threshold-line.threshold-min {
  background-color: #3b82f6;
  box-shadow: 0 0 4px rgba(59, 130, 246, 0.5);
}

.threshold-label {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  padding: 2px 6px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.threshold-max .threshold-label {
  color: #ef4444;
  border: 1px solid #fecaca;
}

.threshold-min .threshold-label {
  color: #3b82f6;
  border: 1px solid #bfdbfe;
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
</style>
