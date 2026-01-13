<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { Head } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import Tabs from "@/Components/Tabs.vue";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// ===============================
// PROPS DARI CONTROLLER
// ===============================
const props = defineProps({
  sensorData: Array,
  greenhouses: Array,
  activeGhId: Number,
  thresholds: {
    type: Object,
    default: () => ({ min: 25, max: 35 }),
  },
});

const activeGH = ref(props.activeGhId);
const activeParameter = ref("temperature");
const mapContainer = ref(null);

// ===============================
// DIMENSI GAMBAR GREENHOUSE (LANDSCAPE)
// ===============================
const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 450;

// ===============================
// POSISI NODE (dalam koordinat gambar [y, x])
// y = dari atas ke bawah, x = dari kiri ke kanan
// ===============================
const nodeLocations = {
  1: [420, 150],
  2: [35, 310],
  3: [420, 585],
  4: [35, 785],
  5: [420, 950],
};

// ===============================
// SETTING RENTANG SUHU (SCALE LEGEND)
// ===============================
const SCALE_MIN = 0;
const SCALE_MAX = 40;

// ===============================
// COMPUTED: THRESHOLD POSITIONS (dalam persen untuk legend)
// 0% = bawah (SCALE_MIN), 100% = atas (SCALE_MAX)
// ===============================
const thresholdMinPosition = computed(() => {
  const pos = ((props.thresholds.min - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
  return Math.min(Math.max(pos, 0), 100);
});

const thresholdMaxPosition = computed(() => {
  const pos = ((props.thresholds.max - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
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
  const coldColor = "#16a34a"; // Hijau - di bawah min threshold
  const hotColor = "#dc2626";  // Merah - di atas max threshold
  
  // Gradient colors untuk area di antara threshold
  const gradientColors = [
    { pos: 0, color: "#16a34a" },   // Hijau gelap
    { pos: 0.15, color: "#22c55e" }, // Hijau
    { pos: 0.3, color: "#84cc16" },  // Lime
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

// ===============================
// NORMALISASI SUHU UNTUK HEATMAP
// Menggunakan SCALE untuk gradient, tapi threshold untuk intensity
// ===============================
function normalizeTemp(value) {
  const val = parseFloat(value);
  if (isNaN(val)) return 0;
  // Normalkan berdasarkan threshold min-max untuk intensitas warna
  let normalized = (val - props.thresholds.min) / (props.thresholds.max - props.thresholds.min);
  return Math.min(Math.max(normalized, 0), 1);
}

// ===============================
// STATUS BERDASARKAN THRESHOLD DINAMIS
// Kritis = di atas threshold max
// ===============================
function getStatus(value) {
  const val = parseFloat(value);
  const range = props.thresholds.max - props.thresholds.min;
  
  // Status zones berdasarkan threshold
  const safeLimit = props.thresholds.min + range * 0.25;
  const normalLimit = props.thresholds.min + range * 0.5;
  const warningLimit = props.thresholds.max;
  
  if (val <= safeLimit) return { text: "Aman", color: "#22c55e" };
  if (val <= normalLimit) return { text: "Normal", color: "#84cc16" };
  if (val <= warningLimit) return { text: "Waspada", color: "#facc15" };
  return { text: "Kritis", color: "#ef4444" };
}

// ===============================
// MAP & LAYERS
// ===============================
let map = null;
let heatLayer = null;
let markersLayer = null;

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

function drawHeatmap(heatData) {
  if (heatLayer) {
    map.removeLayer(heatLayer);
  }

  // Buat pane khusus untuk heatmap dengan z-index di bawah marker
  if (!map.getPane('heatPane')) {
    map.createPane('heatPane');
    map.getPane('heatPane').style.zIndex = 400;
  }

  heatLayer = L.heatLayer(heatData, {
    pane: 'heatPane',
    radius: 80,
    blur: 50,
    maxZoom: 2,
    max: 1.0,
    minOpacity: 0.55,
    gradient: {
      0.0: "#16a34a",
      0.15: "#22c55e",
      0.3: "#84cc16",
      0.45: "#facc15",
      0.6: "#fb923c",
      0.8: "#ef4444",
      1.0: "#dc2626",
    },
  }).addTo(map);
}

function drawMarkers() {
  if (markersLayer) {
    map.removeLayer(markersLayer);
  }

  markersLayer = L.layerGroup().addTo(map);

  props.sensorData.forEach((sensor) => {
    const loc = nodeLocations[sensor.node_id];
    if (!loc) return;

    const [y, x] = loc;
    const status = getStatus(sensor.value);

    const marker = L.marker([y, x], {
      icon: createCustomIcon(sensor.node_id, sensor.value),
    });

    // Popup dengan informasi node
    marker.bindPopup(`
      <div style="text-align: center; min-width: 120px;">
        <strong style="font-size: 14px;">Node ${sensor.node_id}</strong>
        <hr style="margin: 8px 0;">
        <div style="font-size: 24px; font-weight: bold; color: ${status.color};">
          ${sensor.value}°C
        </div>
        <div style="margin-top: 4px; padding: 4px 8px; border-radius: 4px; 
                    background-color: ${status.color}; color: white; font-weight: 500;">
          ${status.text}
        </div>
      </div>
    `, {
      closeButton: true,
      className: "node-popup",
    });

    marker.addTo(markersLayer);
  });
}

function initMap() {
  const bounds = [
    [0, 0],
    [IMAGE_HEIGHT, IMAGE_WIDTH],
  ];

  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: -0.5,
    maxZoom: 2,
    zoomControl: true,
    attributionControl: false,
  });

  // Image overlay dengan bounds
  L.imageOverlay("/images/greenhouse_plan.png", bounds).addTo(map);
  
  // Fit ke bounds gambar
  map.fitBounds(bounds);
  
  // Batasi panning agar tidak terlalu jauh dari gambar
  map.setMaxBounds([
    [-20, -20],
    [IMAGE_HEIGHT + 20, IMAGE_WIDTH + 20],
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
  const topLeft = map.latLngToContainerPoint([IMAGE_HEIGHT, 0]);
  const bottomRight = map.latLngToContainerPoint([0, IMAGE_WIDTH]);
  
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

function updateHeatmap() {
  if (!map || !props.sensorData) return;

  const heatData = props.sensorData
    .filter((sensor) => nodeLocations[sensor.node_id])
    .map((sensor) => {
      const [y, x] = nodeLocations[sensor.node_id];
      const intensity = normalizeTemp(sensor.value);
      console.log(`Node ${sensor.node_id}: value=${sensor.value}, intensity=${intensity.toFixed(2)}`);
      return [y, x, intensity];
    });

  if (heatData.length > 0) {
    drawHeatmap(heatData);
    drawMarkers();
    // Clip setelah heatmap digambar
    setTimeout(clipHeatmapToBounds, 100);
  }
}

// ===============================
// LIFECYCLE
// ===============================
onMounted(() => {
  initMap();
});

watch(activeGH, (newGhId) => {
  Inertia.get(route("heatmap"), { gh_id: newGhId }, { preserveState: true });
});

watch(
  () => props.sensorData,
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
        <div class="flex flex-col lg:flex-row gap-4 mt-4">

          <!-- MAP -->
          <div class="flex-1 bg-white shadow rounded-t-lg rounded-br-lg p-4">
            <div
              ref="mapContainer"
              class="w-full h-[450px] border border-gray-300 rounded-lg overflow-hidden"
            ></div>
          </div>

          <!-- LEGEND -->
          <div class="bg-gray-50 border rounded-lg p-4 min-w-[160px]">
            <p class="text-sm font-semibold text-gray-700 mb-3">
              Skala Suhu (°C)
            </p>

            <div class="flex gap-3 items-stretch mx-auto h-[380px] place-content-center">
              <!-- Legend Bar with Threshold Lines -->
              <div class="legend-bar-container">
                <div class="legend-bar" :style="legendGradientStyle"></div>
                
                <!-- Threshold Max Line -->
                <div 
                  class="threshold-line threshold-max"
                  :style="{ bottom: thresholdMaxPosition + '%' }"
                >
                  <span class="threshold-label">Max: {{ props.thresholds.max }}°</span>
                </div>
                
                <!-- Threshold Min Line -->
                <div 
                  class="threshold-line threshold-min"
                  :style="{ bottom: thresholdMinPosition + '%' }"
                >
                  <span class="threshold-label">Min: {{ props.thresholds.min }}°</span>
                </div>
              </div>
              
              <!-- Scale Labels (0-40) -->
              <div class="legend-labels">
                <span><b>40</b><br />Kritis</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span><b>0</b><br />Aman</span>
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
        <div class="flex gap-2">
          <button
            class="param-btn"
            :class="activeParameter === 'temperature'
              ? 'param-active'
              : 'param-inactive'"
          >
            Suhu
          </button>
          <button class="param-btn param-inactive">Kelembapan</button>
          <button class="param-btn param-inactive">Cahaya</button>
        </div>

      </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<style scoped>
.param-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  border-width: 1px;
  transition: all 0.2s ease;
}

.param-active {
  background-color: #ffffff;
  color: #4b5563;
  border-color: #e5e7eb;
}

.param-inactive {
  background-color: #e5e7eb;
  color: #4b5563;
  border-color: #d1d5db;
  cursor: not-allowed;
}

/* LEGEND */
.legend-bar-container {
  position: relative;
  width: 22px;
}

.legend-bar {
  width: 22px;
  height: 100%;
  border-radius: 12px;
  /* Gradient now applied via inline style for dynamic threshold-based colors */
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
</style>
