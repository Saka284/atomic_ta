<script setup>
import { ref, computed, watch } from "vue";
import { Head, usePage } from "@inertiajs/vue3";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import Tabs from "@/Components/Tabs.vue";
import Gauge from "@/Components/Gauge.vue";
import Chart from "@/Components/Chart.vue";
import DigitalClock from "@/Components/DigitalClock.vue";
import Button from "@/Components/Button.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";

const toast = useToast();

const page = usePage();
const greenhouses = computed(() => page.props.greenhouses || []);
const gaugeData = computed(() => page.props.gaugeData || []);
const latestData = computed(() => page.props.latestData || []);
const actuatorStatus = computed(() => page.props.actuatorStatus || {});

const activeTab = ref(greenhouses.value[0]?.id);
const data = ref({});
const datetime = ref({});
const isFetching = ref({});
const chartResponseCache = new Map();
const CHART_CACHE_TTL_MS = 60000;
const CHART_CACHE_LIMIT = 200;
const chartMode = ref({});
const chartRange = ref({});

const chartRangeOptions = [
    { value: "custom", label: "ALL" },
    { value: "last_1h", label: "1H" },
    { value: "last_1d", label: "1D" },
    { value: "last_1w", label: "1W" },
    { value: "last_1m", label: "1M" },
];

const actuatorCards = [
    {
        key: "exhaust",
        name: "Exhaust Fan",
        icon: "fas fa-fan",
        color: "text-yellow-500",
    },
    {
        key: "dehumidifier",
        name: "Dehumidifier",
        icon: "fas fa-tint",
        color: "text-cyan-500",
    },
    {
        key: "blower",
        name: "Blower",
        icon: "fas fa-fan",
        color: "text-red-500",
    },
];

const nodeColorMap = {
    1: "#3B82F6",
    2: "#FB7185",
    3: "#F59E0B",
    4: "#FACC15",
    5: "#22C55E",
    6: "#0EA5E9",
    7: "#EC4899",
    8: "#A855F7",
    9: "#F97316",
    10: "#14B8A6",
};

const hexToRgba = (hex, alpha = 0.2) => {
    const normalized = hex.replace("#", "");
    if (normalized.length !== 6) {
        return `rgba(59,130,246,${alpha})`;
    }

    const r = Number.parseInt(normalized.substring(0, 2), 16);
    const g = Number.parseInt(normalized.substring(2, 4), 16);
    const b = Number.parseInt(normalized.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getNodeColor = (nodeId) => {
    return nodeColorMap[nodeId] || "#64748B";
};

const getDateTime = (sensor_id) =>
    datetime.value[sensor_id] ??
    (datetime.value[sensor_id] = {
        date: null,
        time: "",
    });

const getChartMode = (sensor_id) => {
    if (!chartMode.value[sensor_id]) {
        chartMode.value[sensor_id] = "avg";
    }
    return chartMode.value[sensor_id];
};

const setChartMode = (sensor_id, mode) => {
    chartMode.value[sensor_id] = mode;
    fetchData(sensor_id);
};

const getChartRange = (sensor_id) => {
    if (!chartRange.value[sensor_id]) {
        chartRange.value[sensor_id] = "custom";
    }
    return chartRange.value[sensor_id];
};

const isQuickRangeActive = (sensor_id) => getChartRange(sensor_id) !== "custom";

const setChartRange = (sensor_id, range) => {
    chartRange.value[sensor_id] = range;

    if (range !== "custom") {
        const dt = getDateTime(sensor_id);
        dt.date = null;
        dt.time = "";
    }

    fetchData(sensor_id);
};

const isChartRangeActive = (sensor_id, range) =>
    getChartRange(sensor_id) === range;

const clearTime = (sensorId) => {
    if (datetime.value[sensorId]) {
        datetime.value[sensorId].time = "";
    }
};

const formatHour = (hour) => {
    return `${hour.toString().padStart(2, "0")}:00`;
};

const isRangeSelected = (sensorId) => {
    const selectedDate = getDateTime(sensorId).date;
    return Boolean(
        Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1]
    );
};

const isTimeFilterDisabled = (sensorId) => {
    return isQuickRangeActive(sensorId) || isRangeSelected(sensorId);
};

const activeActuators = computed(() => {
    const currentGhId = activeTab.value;
    const currentStatus =
        actuatorStatus.value?.[currentGhId] ||
        actuatorStatus.value?.[String(currentGhId)] ||
        {};

    return actuatorCards.map((actuator) => {
        const actuatorData = currentStatus[actuator.key] || {};
        return {
            ...actuator,
            status: Boolean(actuatorData.status),
            mode: actuatorData.mode || "threshold",
        };
    });
});

const getChartColor = (sensorName) => {
    const colors = {
        Temperature: {
            background: "rgba(255, 99, 132, 0.2)",
            border: "rgba(255, 99, 132, 1)",
        },
        Humidity: {
            background: "rgba(54, 162, 235, 0.2)",
            border: "rgba(54, 162, 235, 1)",
        },
        "Light Intensity": {
            background: "rgba(255, 159, 64, 0.2)",
            border: "rgba(255, 159, 64, 1)",
        },
    };
    return (
        colors[sensorName] || {
            background: "rgba(201, 203, 207, 0.2)",
            border: "rgba(201, 203, 207, 1)",
        }
    );
};

// Static gauge scale based on sensor type
const getGaugeScale = (sensorName) => {
    const scales = {
        Temperature: { min: 0, max: 40 },
        Humidity: { min: 0, max: 100 },
        "Light Intensity": { min: 0, max: 65535 },
    };
    return scales[sensorName] || { min: 0, max: 100 };
};

const populateData = () => {
    gaugeData.value.forEach((gauge) => {
        if (!data.value[gauge.gh_id]) {
            data.value[gauge.gh_id] = { gauge: {}, chart: {} };
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

const formatDate = (date) => {
    if (!date) {
        return "";
    }

    const parsedDate = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toISOString().split("T")[0];
};

const formatCompactDate = (date) => {
    if (!date) {
        return "";
    }

    const parsedDate = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
};

const formatDateRangeDisplay = (value) => {
    if (Array.isArray(value)) {
        const [startDate, endDate] = value;
        if (startDate && endDate) {
            return `${formatCompactDate(startDate)}-${formatCompactDate(
                endDate
            )}`;
        }

        if (startDate) {
            return `${formatCompactDate(startDate)}-`;
        }

        return "";
    }

    return formatCompactDate(value);
};

const buildChartQueryData = (sensor_id) => {
    const selectedRange = getChartRange(sensor_id);
    const selectedDate = getDateTime(sensor_id).date;
    const hasDateRange = Boolean(
        Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1]
    );

    return {
        sensor_id,
        gh_id: activeTab.value,
        mode: getChartMode(sensor_id),
        range: selectedRange,
        date_start:
            selectedRange === "custom"
                ? formatDate(selectedDate?.[0])
                : "",
        date_end:
            selectedRange === "custom"
                ? formatDate(selectedDate?.[1])
                : "",
        time:
            selectedRange === "custom" && !hasDateRange
                ? getDateTime(sensor_id).time
                : "",
    };
};

const buildChartCacheKey = (queryData) => JSON.stringify(queryData);

const getChartCachedPayload = (cacheKey) => {
    const cached = chartResponseCache.get(cacheKey);
    if (!cached) {
        return null;
    }

    if (Date.now() - cached.timestamp > CHART_CACHE_TTL_MS) {
        chartResponseCache.delete(cacheKey);
        return null;
    }

    return cached.payload;
};

const setChartCachedPayload = (cacheKey, payload) => {
    if (chartResponseCache.size >= CHART_CACHE_LIMIT) {
        const oldestKey = chartResponseCache.keys().next().value;
        chartResponseCache.delete(oldestKey);
    }

    chartResponseCache.set(cacheKey, {
        timestamp: Date.now(),
        payload,
    });
};

const applyChartPayload = (sensor_id, payload) => {
    if (!data.value[activeTab.value]) {
        data.value[activeTab.value] = { gauge: {}, chart: {} };
    }

    if (!data.value[activeTab.value].chart[sensor_id]) {
        data.value[activeTab.value].chart[sensor_id] = {};
    }

    const isPerNode = Array.isArray(payload?.datasets) && payload.datasets.length > 0;
    const chartDatasets = isPerNode
        ? payload.datasets.map((dataset) => {
              const nodeId = Number(dataset.node_id || String(dataset.label || "").replace(/[^\d]/g, ""));
              const color = getNodeColor(nodeId);
              return {
                  label: dataset.label || `Node ${nodeId}`,
                  data: Array.isArray(dataset.data) ? dataset.data : [],
                  borderColor: color,
                  backgroundColor: hexToRgba(color, 0.18),
                  borderWidth: 2,
                  tension: 0.35,
                  pointRadius: 2.5,
                  pointHoverRadius: 4,
                  fill: false,
              };
          })
        : [];

    data.value[activeTab.value].chart[sensor_id] = {
        chartData: Array.isArray(payload?.data) ? payload.data : [],
        chartLabel: Array.isArray(payload?.label) ? payload.label : [],
        chartColor: getChartColor(
            gaugeData.value.find((s) => s.sensor_id == sensor_id)?.name
        ),
        chartDatasets,
        chartMode: payload?.mode || getChartMode(sensor_id),
    };
};

const normalizeChartPayload = (payload) => ({
    mode: payload?.mode === "per_node" ? "per_node" : "avg",
    label: Array.isArray(payload?.label) ? payload.label : [],
    data: Array.isArray(payload?.data) ? payload.data : [],
    datasets: Array.isArray(payload?.datasets) ? payload.datasets : [],
});

const fetchData = async (sensor_id) => {
    try {
        isFetching.value[sensor_id] = true;

        const queryData = buildChartQueryData(sensor_id);
        const cacheKey = buildChartCacheKey(queryData);

        const cachedPayload = getChartCachedPayload(cacheKey);
        if (cachedPayload) {
            applyChartPayload(sensor_id, cachedPayload);
            return;
        }

        const url =
            `/api/chart-data?dict=` +
            encodeURIComponent(JSON.stringify(queryData));

        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const jsonData = await response.json();
        if (jsonData?.success === false) {
            throw new Error(jsonData?.message || "Gagal memuat chart.");
        }

        const normalizedPayload = normalizeChartPayload(jsonData);
        setChartCachedPayload(cacheKey, normalizedPayload);
        applyChartPayload(sensor_id, normalizedPayload);
    } catch (error) {
        toast.error(error?.message || "Gagal memuat data!");
        console.error("Fetch error:", error);
    } finally {
        isFetching.value[sensor_id] = false;
    }
};

const loadChartsForTab = async (ghId) => {
    if (!ghId) {
        return;
    }

    const sensors = gaugeData.value.filter((sensor) => sensor.gh_id == ghId);
    await Promise.all(sensors.map((sensor) => fetchData(sensor.sensor_id)));
};

const selectedGHSensor = computed(() => {
    const sensors = gaugeData.value.filter(
        (sensor) => sensor.gh_id == activeTab.value
    );
    return sensors;
});

const filterChart = (sensor_id) => {
    fetchData(sensor_id);
};

watch(greenhouses, (value) => {
    if (!activeTab.value && value.length) {
        activeTab.value = value[0].id;
    }
});

watch(
    gaugeData,
    async (value) => {
        if (!value.length || !activeTab.value) {
            return;
        }

        populateData();
        await loadChartsForTab(activeTab.value);
    },
    { immediate: true }
);

watch(activeTab, async (newTab) => {
    if (!newTab || !gaugeData.value.length) {
        return;
    }

    if (!data.value[newTab]) {
        data.value[newTab] = { gauge: {}, chart: {} };
    }

    await loadChartsForTab(newTab);
});
</script>

<template>
    <Head title="Monitoring" />

    <BreezeAuthenticatedLayout :titlePage="'Monitoring'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Monitoring
            </h2>
        </template>

        <div class="py-2">
            <div class="max-w-7xl mx-auto sm:px-2 lg:px-2">
                <!-- Tabs -->
                <Tabs
                    :greenhouses="greenhouses"
                    v-model="activeTab"
                    class="mb-4"
                />

                <!-- Tab content -->
                <div class="flex flex-col gap-2">
                    <div
                        class="bg-white overflow-hidden shadow-sm rounded-lg p-4"
                    >
                        <div class="flex flex-col w-full">
                            <div class="flex justify-between">
                                <p>Time</p>
                                <DigitalClock />
                            </div>
                            <div class="flex justify-between">
                                <p>Latest Data</p>
                                <p>
                                    {{
                                        latestData.find(
                                            (item) => item.gh_id == activeTab
                                        )?.latest_time || "-"
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <div
                            v-for="actuator in activeActuators"
                            :key="actuator.key"
                            class="bg-white overflow-hidden shadow-sm rounded-lg p-4"
                        >
                            <div class="flex items-center justify-between h-full">
                                <div class="flex items-center">
                                    <i
                                        :class="[
                                            actuator.icon,
                                            actuator.color,
                                            'text-3xl w-10',
                                        ]"
                                    ></i>
                                    <div class="ml-4">
                                        <p class="font-semibold text-gray-800">
                                            {{ actuator.name }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            Status
                                        </p>
                                    </div>
                                </div>

                                <div
                                    :class="
                                        actuator.status
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    "
                                    class="px-3 py-1 text-xs font-bold rounded-full"
                                >
                                    {{ actuator.status ? "ON" : "OFF" }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-for="sensor in selectedGHSensor"
                        :key="sensor.sensor_id"
                        class="flex flex-col lg:flex-row gap-2"
                    >
                        <div
                            class="bg-white shadow-sm rounded-lg w-full lg:w-3/4 p-4"
                        >
                            <div
                                class="mb-2 flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between"
                            >
                                <h3 class="text-xl">
                                    {{ sensor.name }}
                                </h3>

                                <div class="w-full lg:w-auto">
                                    <div
                                        class="flex min-w-max items-center gap-2 overflow-x-auto pb-1"
                                    >
                                        <div
                                            class="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white p-1"
                                        >
                                            <button
                                                v-for="option in chartRangeOptions"
                                                :key="
                                                    `${sensor.sensor_id}-${option.value}`
                                                "
                                                type="button"
                                                class="rounded px-2.5 py-1 text-xs font-semibold transition"
                                                :class="
                                                    isChartRangeActive(
                                                        sensor.sensor_id,
                                                        option.value
                                                    )
                                                        ? 'bg-sky-500 text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                "
                                                @click="
                                                    setChartRange(
                                                        sensor.sensor_id,
                                                        option.value
                                                    )
                                                "
                                            >
                                                {{ option.label }}
                                            </button>
                                        </div>

                                        <select
                                            class="h-10 min-w-[145px] shrink-0 rounded-md border px-3 text-sm"
                                            :value="getChartMode(sensor.sensor_id)"
                                            @change="
                                                setChartMode(
                                                    sensor.sensor_id,
                                                    $event.target.value
                                                )
                                            "
                                        >
                                            <option value="avg">Average</option>
                                            <option value="per_node">Per Node</option>
                                        </select>

                                        <VueDatePicker
                                            class="w-[150px] min-w-[150px] shrink-0"
                                            v-model="
                                                getDateTime(sensor.sensor_id)
                                                    .date
                                            "
                                            range
                                            position="right"
                                            placeholder="Tanggal"
                                            :format="formatDateRangeDisplay"
                                            :enable-time-picker="false"
                                            :disabled="
                                                isQuickRangeActive(
                                                    sensor.sensor_id
                                                )
                                            "
                                        />

                                        <div
                                            class="relative min-w-[120px] shrink-0 flex items-center"
                                        >
                                            <select
                                                class="h-10 w-full rounded-md border px-3 text-sm"
                                                v-model="
                                                    getDateTime(
                                                        sensor.sensor_id
                                                    ).time
                                                "
                                                :disabled="
                                                    isTimeFilterDisabled(
                                                        sensor.sensor_id
                                                    )
                                                "
                                                :class="{
                                                    'cursor-not-allowed bg-gray-200 text-gray-500':
                                                        isTimeFilterDisabled(
                                                            sensor.sensor_id
                                                        ),
                                                }"
                                            >
                                                <option value="">
                                                    Pilih Jam
                                                </option>
                                                <option
                                                    v-for="hour in 24"
                                                    :key="hour"
                                                    :value="
                                                        formatHour(hour - 1)
                                                    "
                                                >
                                                    {{ formatHour(hour - 1) }}
                                                </option>
                                            </select>
                                            <button
                                                v-if="
                                                    getDateTime(
                                                        sensor.sensor_id
                                                    ).time &&
                                                    !isQuickRangeActive(
                                                        sensor.sensor_id
                                                    )
                                                "
                                                @click="
                                                    clearTime(sensor.sensor_id)
                                                "
                                                class="absolute right-3 text-gray-500 hover:text-gray-700"
                                            >
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>

                                        <Button
                                            :disabled="
                                                isFetching[sensor.sensor_id]
                                            "
                                            @click="
                                                filterChart(sensor.sensor_id)
                                            "
                                            class="h-10 shrink-0 px-3"
                                        >
                                            <i
                                                :class="[
                                                    isFetching[sensor.sensor_id]
                                                        ? 'fas fa-spinner fa-spin'
                                                        : 'fas fa-search fa-lg',
                                                ]"
                                            ></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <!-- Chart Component -->
                            <Chart
                                v-if="
                                    (
                                        data[activeTab]?.chart?.[sensor.sensor_id]
                                            ?.chartData &&
                                        data[activeTab]?.chart?.[sensor.sensor_id]
                                            ?.chartData.length > 0
                                    ) ||
                                    (
                                        data[activeTab]?.chart?.[sensor.sensor_id]
                                            ?.chartDatasets &&
                                        data[activeTab]?.chart?.[sensor.sensor_id]
                                            ?.chartDatasets.length > 0
                                    )
                                "
                                :data="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        .chartData
                                "
                                :label="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        .chartLabel
                                "
                                :id="sensor.sensor_id"
                                :sensor_name="sensor.name"
                                :chartColor="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        .chartColor
                                "
                                :datasets="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        ?.chartDatasets || []
                                "
                            />
                            <p
                                v-else-if="isFetching[sensor.sensor_id]"
                                class="text-center text-gray-500"
                            >
                                Loading chart...
                            </p>
                            <p v-else class="text-center text-gray-500">
                                No data available.
                            </p>
                        </div>

                        <div
                            class="bg-white overflow-hidden shadow-sm rounded-lg w-full lg:w-1/4 p-4"
                        >
                            <div class="flex mb-4">
                                <h3 class="text-xl">{{ sensor.name }}</h3>
                            </div>
                            <!-- Gauge Component -->
                            <Gauge
                                v-if="
                                    data[activeTab]?.gauge?.[
                                        sensor.sensor_id
                                    ] !== undefined
                                "
                                :title="sensor.name"
                                :symbol="sensor.unit"
                                :value="
                                    data[activeTab]?.gauge?.[sensor.sensor_id]
                                "
                                :thd_min="getGaugeScale(sensor.name).min"
                                :thd_max="getGaugeScale(sensor.name).max"
                                :id="sensor.sensor_id"
                            />
                            <p v-else class="text-center text-gray-500">
                                Loading gauge...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>
