<script setup>
import { onMounted, ref } from "vue";
import { Head } from "@inertiajs/inertia-vue3";
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
});

const activeGH = ref(props.activeGhId);
const activeParameter = ref("temperature");
const mapContainer = ref(null);

// ===============================
// POSISI NODE (SUDAH FINAL)
// ===============================
const nodeLocations = {
  1: [930, 220],
  2: [75, 450],
  3: [930, 860],
  4: [75, 1145],
  5: [930, 1390],
};

// ===============================
// NORMALISASI SUHU (20–40 °C)
// ===============================
const TEMP_MIN = 20;
const TEMP_MAX = 40;

function normalizeTemp(value) {
  return Math.min(
    Math.max((value - TEMP_MIN) / (TEMP_MAX - TEMP_MIN), 0),
    1
  );
}

// ===============================
// HEATMAP LAYER
// ===============================
let heatLayer = null;

function drawHeatmap(map, heatData) {
  const zoom = map.getZoom();
  const radius = 90 + zoom * 30; // DINAMIS

  if (heatLayer) {
    map.removeLayer(heatLayer);
  }

  heatLayer = L.heatLayer(heatData, {
    radius,
    blur: radius * 0.6,
    minOpacity: 0.65,
    gradient: {
      0.0: "#16a34a", // hijau (aman)
      0.4: "#84cc16",
      0.6: "#facc15", // kuning (waspada)
      0.8: "#fb923c",
      1.0: "#dc2626", // merah (kritis)
    },
  }).addTo(map);
}

onMounted(() => {
  initMap();
});

function initMap() {
  const map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2,
  });

  const bounds = [[0, 0], [1000, 1500]];
  L.imageOverlay("/images/greenhouse_plan.png", bounds).addTo(map);
  map.fitBounds(bounds, { padding: [40, 40] });

  // ===============================
  // DATA HEATMAP DARI CONTROLLER
  // ===============================
  const heatData = props.sensorData.map((d) => {
    const c = nodeLocations[d.node_id];
    return [c[0], c[1], normalizeTemp(d.value)];
  });

  drawHeatmap(map, heatData);

  map.on("zoomend", () => {
    drawHeatmap(map, heatData);
  });

  // ===============================
  // MARKER NODE
  // ===============================
  props.sensorData.forEach((d) => {
    const c = nodeLocations[d.node_id];
    L.circleMarker(c, {
      radius: 5,
      color: "#1d4ed8",
      fillColor: "#3b82f6",
      fillOpacity: 1,
    })
      .bindPopup(`<b>Node ${d.node_id}</b><br/>Suhu: ${d.value} °C`)
      .addTo(map);
  });
}
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
              class="w-full h-[420px] border border-gray-300 rounded-lg"
            ></div>
          </div>

          <!-- LEGEND -->
          <div class="bg-gray-50 border rounded-lg p-4">
            <p class="text-sm font-semibold text-gray-700 mb-3">
              Skala Suhu (°C)
            </p>

            <div class="flex gap-3 items-stretch mx-auto h-[380px] place-content-center">
              <div class="legend-bar"></div>
              <div class="legend-labels">
                <span><b>40</b><br />Kritis</span>
                <span>30</span>
                <span><b>20</b><br />Aman</span>
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
.legend-bar {
  width: 22px;
  border-radius: 12px;
  background: linear-gradient(
    to top,
    #16a34a,
    #84cc16,
    #facc15,
    #fb923c,
    #dc2626
  );
}

.legend-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  color: #4b5563;
  text-align: center;
}
</style>
