<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { Head, usePage, router } from "@inertiajs/vue3";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import Tabs from "@/Components/Tabs.vue";
import Gauge from "@/Components/Gauge.vue";
import Chart from "@/Components/Chart.vue";
import DigitalClock from "@/Components/DigitalClock.vue";
import Button from "@/Components/Button.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";
import { useLocale } from "@/composables/useLocale";

const toast = useToast();
const { t, locale } = useLocale();

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
const mobileFilterOpen = ref({});
const mobileRangeOpen = ref({});
const chartAbortControllers = new Map();
const chartRequestTokens = new Map();

const abortChartRequest = (sensorId) => {
    const controller = chartAbortControllers.get(sensorId);
    if (!controller) {
        return;
    }

    controller.abort();
    chartAbortControllers.delete(sensorId);
};

const abortAllChartRequests = () => {
    chartAbortControllers.forEach((controller) => controller.abort());
    chartAbortControllers.clear();
};

const chartRangeOptions = computed(() => [
    { value: "today", label: t("monitoring.range_today") },
    { value: "last_1h", label: t("monitoring.range_1h") },
    { value: "last_1d", label: t("monitoring.range_1d") },
    { value: "last_1w", label: t("monitoring.range_1w") },
    { value: "last_1m", label: t("monitoring.range_1m") },
]);

const datePickerLocale = computed(() =>
    locale.value === "id" ? "id-ID" : "en-US"
);

const getSensorLabel = (sensorName = "") => {
    const normalized = String(sensorName).trim().toLowerCase();
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

const getNodeLabel = (nodeId) => `${t("table.node")} ${nodeId}`;

const parseBucketDate = (bucket) => {
    if (!bucket) {
        return null;
    }

    const normalized = String(bucket).includes("T")
        ? String(bucket)
        : String(bucket).includes(" ")
          ? String(bucket).replace(" ", "T")
          : `${bucket}T00:00:00`;

    const parsedDate = new Date(normalized);
    if (Number.isNaN(parsedDate.getTime())) {
        return null;
    }

    return parsedDate;
};

const formatDayMonthLabel = (date) => {
    const formatter = new Intl.DateTimeFormat(datePickerLocale.value, {
        day: "2-digit",
        month: "short",
    });
    const parts = formatter.formatToParts(date);
    const day = parts.find((part) => part.type === "day")?.value;
    const month = parts.find((part) => part.type === "month")?.value;

    return day && month ? `${day} ${month}` : formatter.format(date);
};

const formatHourMinuteLabel = (date) => {
    return new Intl.DateTimeFormat(datePickerLocale.value, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);
};

const localizeBucketLabel = (bucket, bucketType = "hour") => {
    const parsedDate = parseBucketDate(bucket);
    if (!parsedDate) {
        return bucket || "";
    }

    if (bucketType === "minute") {
        return formatHourMinuteLabel(parsedDate);
    }

    if (bucketType === "day") {
        return formatDayMonthLabel(parsedDate);
    }

    return `${formatDayMonthLabel(parsedDate)} ${formatHourMinuteLabel(
        parsedDate
    )}`;
};

const localizeChartLabels = (rawLabels = [], bucketType = "hour") => {
    return rawLabels.map((bucket) => localizeBucketLabel(bucket, bucketType));
};

const buildPerNodeDatasets = (datasets = []) => {
    return datasets.map((dataset) => {
        const nodeId = Number(
            dataset.node_id || String(dataset.label || "").replace(/[^\d]/g, "")
        );
        const color = getNodeColor(nodeId);

        return {
            label: getNodeLabel(nodeId),
            data: Array.isArray(dataset.data) ? dataset.data : [],
            borderColor: color,
            backgroundColor: hexToRgba(color, 0.18),
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 2.5,
            pointHoverRadius: 4,
            fill: false,
        };
    });
};

const actuatorCards = computed(() => [
    {
        key: "exhaust",
        name: t("monitoring.exhaust_fan"),
        icon: "fas fa-fan",
        color: "text-yellow-500",
    },
    {
        key: "dehumidifier",
        name: t("monitoring.dehumidifier"),
        icon: "fas fa-tint",
        color: "text-cyan-500",
    },
    {
        key: "blower",
        name: t("monitoring.blower"),
        icon: "fas fa-fan",
        color: "text-red-500",
    },
]);

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
        chartRange.value[sensor_id] = "today";
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

const getChartRangeLabel = (sensor_id) => {
    return (
        chartRangeOptions.value.find(
            (option) => option.value === getChartRange(sensor_id)
        )?.label || t("monitoring.range_custom")
    );
};

const getActiveDateText = (sensor_id) => {
    const range = getChartRange(sensor_id);
    if (range === "custom") {
        const dt = getDateTime(sensor_id);
        const formattedDate = formatDateRangeDisplay(dt.date);
        if (dt.time && (!Array.isArray(dt.date) || !dt.date[1])) {
            return `${formattedDate} ${dt.time}`.trim();
        }
        return formattedDate || t("monitoring.range_custom");
    }
    const label = getChartRangeLabel(sensor_id);
    if (range === "today") {
        return `${label} (${formatCompactDate(new Date())})`;
    }
    return label;
};

const setCustomRangeFromDatePicker = (sensor_id) => {
    if (getChartRange(sensor_id) !== "custom") {
        chartRange.value[sensor_id] = "custom";
    }
};

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

    return actuatorCards.value.map((actuator) => {
        const actuatorData = currentStatus[actuator.key] || {};
        return {
            ...actuator,
            status: Boolean(actuatorData.status),
            mode: actuatorData.mode || "threshold",
            gatewayOnline: Boolean(actuatorData.gateway_online),
        };
    });
});

const getActuatorIconAnimationClass = (actuator) => {
    if (!actuator?.status) {
        return "";
    }

    if (actuator.key === "dehumidifier") {
        return "actuator-dehumidifier-active";
    }

    return "actuator-fan-active";
};

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
        "Light Intensity": { min: 0, max: 30000 },
        RSSI: { min: -100, max: 0 },
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

const applyChartPayload = (ghId, sensor_id, payload) => {
    if (!ghId) {
        return;
    }

    if (!data.value[ghId]) {
        data.value[ghId] = { gauge: {}, chart: {} };
    }

    if (!data.value[ghId].chart[sensor_id]) {
        data.value[ghId].chart[sensor_id] = {};
    }

    const isPerNode =
        Array.isArray(payload?.datasets) && payload.datasets.length > 0;
    const chartRawLabels =
        Array.isArray(payload?.raw_labels) && payload.raw_labels.length > 0
            ? payload.raw_labels
            : Array.isArray(payload?.label)
              ? payload.label
              : [];
    const chartRawDatasets = isPerNode
        ? Array.isArray(payload?.datasets)
            ? payload.datasets
            : []
        : [];
    const bucketType = payload?.bucket_type || "hour";
    const chartDatasets = isPerNode
        ? buildPerNodeDatasets(chartRawDatasets)
        : [];

    data.value[ghId].chart[sensor_id] = {
        chartData: Array.isArray(payload?.data) ? payload.data : [],
        chartLabel: localizeChartLabels(chartRawLabels, bucketType),
        chartRawLabels,
        chartRawDatasets,
        bucketType,
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
    raw_labels: Array.isArray(payload?.raw_labels) ? payload.raw_labels : [],
    bucket_type: payload?.bucket_type || "hour",
    data: Array.isArray(payload?.data) ? payload.data : [],
    datasets: Array.isArray(payload?.datasets) ? payload.datasets : [],
});

const relocalizeLoadedCharts = () => {
    Object.values(data.value).forEach((ghData) => {
        const chartEntries = ghData?.chart;
        if (!chartEntries) {
            return;
        }

        Object.values(chartEntries).forEach((entry) => {
            if (!entry) {
                return;
            }

            const nextRawLabels = Array.isArray(entry.chartRawLabels)
                ? entry.chartRawLabels
                : Array.isArray(entry.chartLabel)
                  ? entry.chartLabel
                  : [];
            const nextBucketType = entry.bucketType || "hour";

            entry.chartLabel = localizeChartLabels(
                nextRawLabels,
                nextBucketType
            );

            if (
                Array.isArray(entry.chartRawDatasets) &&
                entry.chartRawDatasets.length > 0
            ) {
                entry.chartDatasets = buildPerNodeDatasets(
                    entry.chartRawDatasets
                );
            }
        });
    });
};

const fetchData = async (sensor_id) => {
    const requestToken = (chartRequestTokens.get(sensor_id) || 0) + 1;
    chartRequestTokens.set(sensor_id, requestToken);
    abortChartRequest(sensor_id);

    let controller = null;

    try {
        isFetching.value[sensor_id] = true;

        const queryData = buildChartQueryData(sensor_id);
        const cacheKey = buildChartCacheKey(queryData);
        const targetGhId = queryData.gh_id;

        const cachedPayload = getChartCachedPayload(cacheKey);
        if (cachedPayload) {
            if (chartRequestTokens.get(sensor_id) !== requestToken) {
                return;
            }
            applyChartPayload(targetGhId, sensor_id, cachedPayload);
            return;
        }

        controller = new AbortController();
        chartAbortControllers.set(sensor_id, controller);

        const url =
            `/api/chart-data?dict=` +
            encodeURIComponent(JSON.stringify(queryData));

        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const jsonData = await response.json();
        if (chartRequestTokens.get(sensor_id) !== requestToken) {
            return;
        }

        if (jsonData?.success === false) {
            throw new Error(jsonData?.message || t("monitoring.failed_load_chart"));
        }

        const normalizedPayload = normalizeChartPayload(jsonData);
        setChartCachedPayload(cacheKey, normalizedPayload);
        applyChartPayload(targetGhId, sensor_id, normalizedPayload);
    } catch (error) {
        if (error?.name === "AbortError") {
            return;
        }

        if (chartRequestTokens.get(sensor_id) !== requestToken) {
            return;
        }

        toast.error(error?.message || t("monitoring.failed_load_data"));
        console.error("Fetch error:", error);
    } finally {
        if (
            controller &&
            chartAbortControllers.get(sensor_id) === controller
        ) {
            chartAbortControllers.delete(sensor_id);
        }

        if (chartRequestTokens.get(sensor_id) === requestToken) {
            isFetching.value[sensor_id] = false;
        }
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

const isMobileFilterOpen = (sensor_id) =>
    Boolean(mobileFilterOpen.value[sensor_id]);

const toggleMobileFilter = (sensor_id) => {
    mobileFilterOpen.value[sensor_id] = !isMobileFilterOpen(sensor_id);
};

const closeAllMobileFilters = () => {
    mobileFilterOpen.value = {};
};

const isMobileRangeOpen = (sensor_id) => Boolean(mobileRangeOpen.value[sensor_id]);

const toggleMobileRange = (sensor_id) => {
    mobileRangeOpen.value[sensor_id] = !isMobileRangeOpen(sensor_id);
};

const closeMobileRange = (sensor_id) => {
    mobileRangeOpen.value[sensor_id] = false;
};

const closeAllMobileRanges = () => {
    mobileRangeOpen.value = {};
};

const selectMobileRange = (sensor_id, range) => {
    setChartRange(sensor_id, range);
    closeMobileRange(sensor_id);
};

const filterChart = (sensor_id) => {
    fetchData(sensor_id);
};

const applyMobileFilter = (sensor_id) => {
    filterChart(sensor_id);
    mobileFilterOpen.value[sensor_id] = false;
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

    closeAllMobileFilters();
    closeAllMobileRanges();
    abortAllChartRequests();

    if (!data.value[newTab]) {
        data.value[newTab] = { gauge: {}, chart: {} };
    }

    await loadChartsForTab(newTab);
});

watch(locale, () => {
    relocalizeLoadedCharts();
});

let pollingInterval = null;

const startPolling = () => {
    stopPolling();
    pollingInterval = setInterval(() => {
        // Reload Inertia props for gauges and status
        router.reload({
            only: ["gaugeData", "latestData", "actuatorStatus"],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // After props update, refetch charts
                if (activeTab.value) {
                    loadChartsForTab(activeTab.value);
                }
            },
        });
    }, 30000); // Poll every 30 seconds
};

const stopPolling = () => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
};

onMounted(() => {
    populateData();
    if (activeTab.value) {
        loadChartsForTab(activeTab.value);
    }
    startPolling();
});

onBeforeUnmount(() => {
    stopPolling();
    abortAllChartRequests();
});
</script>

<template>
    <Head :title="t('title.monitoring')" />

    <BreezeAuthenticatedLayout :titlePage="'Monitoring'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ t("title.monitoring") }}
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
                                <p>{{ t("monitoring.time") }}</p>
                                <DigitalClock />
                            </div>
                            <div class="flex justify-between">
                                <p>{{ t("monitoring.latest_data") }}</p>
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
                                            getActuatorIconAnimationClass(
                                                actuator
                                            ),
                                            'text-3xl w-10',
                                        ]"
                                    ></i>
                                    <div class="ml-4">
                                        <p class="font-semibold text-gray-800">
                                            {{ actuator.name }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            {{ t("monitoring.status") }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-col items-end gap-1">
                                    <div
                                        :class="
                                            actuator.status
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        "
                                        class="px-3 py-1 text-xs font-bold rounded-full"
                                    >
                                        {{
                                            actuator.status
                                                ? t("monitoring.on")
                                                : t("monitoring.off")
                                        }}
                                    </div>
                                    <p
                                        :class="
                                            actuator.gatewayOnline
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        "
                                        class="text-[11px] font-semibold uppercase tracking-wide"
                                    >
                                        {{
                                            actuator.gatewayOnline
                                                ? t('monitoring.online')
                                                : t('monitoring.offline')
                                        }}
                                    </p>
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
                            <div class="mb-2">
                                <div class="flex items-center justify-between gap-2">
                                    <h3 class="text-xl">
                                        {{ getSensorLabel(sensor.name) }}
                                    </h3>

                                    <div class="relative sm:hidden">
                                        <button
                                            type="button"
                                            class="inline-flex h-10 items-center gap-2 rounded-md bg-sky-500 px-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-sky-600"
                                            @click="
                                                toggleMobileFilter(
                                                    sensor.sensor_id
                                                )
                                            "
                                        >
                                            <i class="fas fa-filter"></i>
                                            <span>{{ t("monitoring.filter") }}</span>
                                        </button>

                                        <div
                                            v-if="
                                                isMobileFilterOpen(
                                                    sensor.sensor_id
                                                )
                                            "
                                            class="absolute right-0 top-12 z-30 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-xl"
                                        >
                                            <div class="flex flex-col gap-2">
                                                <select
                                                    class="h-10 w-full rounded-md border px-3 text-sm"
                                                    :value="
                                                        getChartMode(
                                                            sensor.sensor_id
                                                        )
                                                    "
                                                    @change="
                                                        setChartMode(
                                                            sensor.sensor_id,
                                                            $event.target.value
                                                        )
                                                    "
                                                >
                                                    <option value="avg">
                                                        {{ t("monitoring.average") }}
                                                    </option>
                                                    <option value="per_node">
                                                        {{ t("monitoring.per_node") }}
                                                    </option>
                                                </select>

                                                <VueDatePicker
                                                    class="monitoring-date-picker w-full"
                                                    v-model="
                                                        getDateTime(
                                                            sensor.sensor_id
                                                        ).date
                                                    "
                                                    range
                                                    position="right"
                                                    :locale="datePickerLocale"
                                                    :placeholder="
                                                        t('monitoring.date')
                                                    "
                                                    :format="
                                                        formatDateRangeDisplay
                                                    "
                                                    :enable-time-picker="false"
                                                    :teleport="true"
                                                    @update:model-value="
                                                        setCustomRangeFromDatePicker(
                                                            sensor.sensor_id
                                                        )
                                                    "
                                                />

                                                <div
                                                    class="relative flex w-full items-center"
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
                                                            {{
                                                                t(
                                                                    'monitoring.hour'
                                                                )
                                                            }}
                                                        </option>
                                                        <option
                                                            v-for="hour in 24"
                                                            :key="hour"
                                                            :value="
                                                                formatHour(
                                                                    hour - 1
                                                                )
                                                            "
                                                        >
                                                            {{
                                                                formatHour(
                                                                    hour - 1
                                                                )
                                                            }}
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
                                                            clearTime(
                                                                sensor.sensor_id
                                                            )
                                                        "
                                                        class="absolute right-3 text-gray-500 hover:text-gray-700"
                                                    >
                                                        <i
                                                            class="fas fa-times"
                                                        ></i>
                                                    </button>
                                                </div>

                                                <Button
                                                    :disabled="
                                                        isFetching[
                                                            sensor.sensor_id
                                                        ]
                                                    "
                                                    @click="
                                                        applyMobileFilter(
                                                            sensor.sensor_id
                                                        )
                                                    "
                                                    class="h-10 w-full justify-center gap-2 px-3"
                                                >
                                                    <i
                                                        :class="[
                                                            isFetching[
                                                                sensor.sensor_id
                                                            ]
                                                                ? 'fas fa-spinner fa-spin'
                                                                : 'fas fa-search',
                                                        ]"
                                                    ></i>
                                                    <span>
                                                        {{
                                                            t(
                                                                'monitoring.search'
                                                            )
                                                        }}
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-2 sm:hidden">
                                    <div class="relative">
                                        <button
                                            type="button"
                                            class="flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm"
                                            @click="
                                                toggleMobileRange(
                                                    sensor.sensor_id
                                                )
                                            "
                                        >
                                            <span>{{
                                                getChartRangeLabel(
                                                    sensor.sensor_id
                                                )
                                            }}</span>
                                            <i
                                                class="fas fa-chevron-down text-xs transition-transform"
                                                :class="{
                                                    'rotate-180':
                                                        isMobileRangeOpen(
                                                            sensor.sensor_id
                                                        ),
                                                }"
                                            ></i>
                                        </button>

                                        <div
                                            v-if="
                                                isMobileRangeOpen(
                                                    sensor.sensor_id
                                                )
                                            "
                                            class="absolute left-0 right-0 top-11 z-20 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
                                        >
                                            <button
                                                v-for="option in chartRangeOptions"
                                                :key="
                                                    `mobile-outside-${sensor.sensor_id}-${option.value}`
                                                "
                                                type="button"
                                                class="block w-full px-3 py-2 text-left text-sm transition"
                                                :class="
                                                    isChartRangeActive(
                                                        sensor.sensor_id,
                                                        option.value
                                                    )
                                                        ? 'bg-sky-500 text-white'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                "
                                                @click="
                                                    selectMobileRange(
                                                        sensor.sensor_id,
                                                        option.value
                                                    )
                                                "
                                            >
                                                {{ option.label }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-2 hidden w-full lg:w-auto sm:block">
                                    <div
                                        class="flex flex-col gap-2 pb-1 sm:flex-row sm:flex-wrap sm:items-center"
                                    >
                                        <div
                                            class="w-full overflow-x-auto rounded-md border border-gray-300 bg-white p-1 sm:w-auto"
                                        >
                                            <div class="inline-flex h-8 items-center">
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
                                        </div>

                                        <select
                                            class="h-10 w-full rounded-md border px-3 text-sm sm:min-w-[145px] sm:w-auto"
                                            :value="getChartMode(sensor.sensor_id)"
                                            @change="
                                                setChartMode(
                                                    sensor.sensor_id,
                                                    $event.target.value
                                                )
                                            "
                                        >
                                            <option value="avg">
                                                {{ t("monitoring.average") }}
                                            </option>
                                            <option value="per_node">
                                                {{ t("monitoring.per_node") }}
                                            </option>
                                        </select>

                                        <VueDatePicker
                                            class="monitoring-date-picker w-full sm:w-[128px]"
                                            v-model="
                                                getDateTime(sensor.sensor_id)
                                                    .date
                                            "
                                            range
                                            position="right"
                                            :locale="datePickerLocale"
                                            :placeholder="t('monitoring.date')"
                                            :format="formatDateRangeDisplay"
                                            :enable-time-picker="false"
                                            :teleport="true"
                                            @update:model-value="
                                                setCustomRangeFromDatePicker(
                                                    sensor.sensor_id
                                                )
                                            "
                                        />

                                        <div
                                            class="relative flex w-full items-center sm:min-w-[120px] sm:w-[120px]"
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
                                                    {{ t("monitoring.hour") }}
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
                                            class="h-10 w-full px-3 sm:w-auto sm:shrink-0"
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
                                :sensor_name="getSensorLabel(sensor.name)"
                                :symbol="sensor.unit === '%' ? '%RH' : sensor.unit"
                                :chartColor="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        .chartColor
                                "
                                :datasets="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        ?.chartDatasets || []
                                "
                                :subtitle="getActiveDateText(sensor.sensor_id)"
                            />
                            <p
                                v-else-if="isFetching[sensor.sensor_id]"
                                class="text-center text-gray-500"
                            >
                                {{ t("monitoring.loading_chart") }}
                            </p>
                            <p v-else class="text-center text-gray-500">
                                {{ t("monitoring.no_data") }}
                            </p>
                        </div>

                        <div
                            class="bg-white overflow-hidden shadow-sm rounded-lg w-full lg:w-1/4 p-4"
                        >
                            <div class="flex mb-4">
                                <h3 class="text-xl">
                                    {{ getSensorLabel(sensor.name) }}
                                </h3>
                            </div>
                            <!-- Gauge Component -->
                            <Gauge
                                v-if="
                                    data[activeTab]?.gauge?.[
                                        sensor.sensor_id
                                    ] !== undefined
                                "
                                :title="getSensorLabel(sensor.name)"
                                :symbol="sensor.unit === '%' ? '%RH' : sensor.unit"
                                :value="
                                    data[activeTab]?.gauge?.[sensor.sensor_id]
                                "
                                :thd_min="getGaugeScale(sensor.name).min"
                                :thd_max="getGaugeScale(sensor.name).max"
                                :id="sensor.sensor_id"
                            />
                            <p v-else class="text-center text-gray-500">
                                {{ t("monitoring.loading_gauge") }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>

<style scoped>
:deep(.monitoring-date-picker) {
    width: 100%;
    min-width: 0;
}

:deep(.monitoring-date-picker .dp__input) {
    width: 100%;
    min-height: 2.5rem;
    height: 2.5rem;
    padding-right: 0.5rem;
    padding-left: 2rem;
    font-size: 0.875rem;
}

@media (min-width: 640px) {
    :deep(.monitoring-date-picker) {
        width: 128px;
        min-width: 128px;
    }
}

.actuator-fan-active {
    animation: actuator-fan-spin 1.5s linear infinite;
    transform-origin: 50% 50%;
}

.actuator-dehumidifier-active {
    animation: actuator-dehumidifier-pulse 1.7s ease-in-out infinite;
    transform-origin: 50% 50%;
}

@keyframes actuator-fan-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes actuator-dehumidifier-pulse {
    0%,
    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    50% {
        transform: translateY(-2px) scale(1.08);
        opacity: 0.82;
    }
}
</style>
