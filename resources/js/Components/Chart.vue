<template>
    <div class="chart-container w-full max-h-[300px]">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup>
import {
    computed,
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    markRaw,
    shallowRef,
} from "vue";
import Chart from "chart.js/auto";

// Props
const props = defineProps({
    data: {
        type: Array,
        default: () => [12, 19, 3, 5, 2, 3],
    },
    label: {
        type: Array,
        default: () => ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    },
    id: {
        type: Number,
        required: true,
    },
    sensor_name: {
        type: String,
        default: "",
    },
    symbol: {
        type: String,
        default: "",
    },
    chartColor: {
        type: Object,
        default: () => ({
            background: "rgba(75, 192, 192, 0.2)",
            border: "rgba(75, 192, 192, 1)",
        }),
    },
    datasets: {
        type: Array,
        default: () => [],
    },
    subtitle: {
        type: String,
        default: "",
    },
});

const canvasRef = ref(null);
const chartInstance = shallowRef(null);
const chartStructureSignature = ref("");

const isLightIntensitySensor = computed(() => {
    const sensorName = String(props.sensor_name || "").trim().toLowerCase();
    return (
        sensorName === "light intensity" ||
        sensorName === "light_intensity" ||
        sensorName === "intensitas cahaya"
    );
});

const getDecimalPlaces = () => (isLightIntensitySensor.value ? 0 : 2);

const formatSensorValue = (value) => {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return value;
    }

    return numericValue.toFixed(getDecimalPlaces());
};

const normalizeDatasetValue = (value) => {
    if (value === null || value === undefined) {
        return null;
    }

    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : value;
};

const normalizeDatasetSeries = (series = []) =>
    series.map((value) => normalizeDatasetValue(value));

const normalizeNumberOption = (value, fallback) => {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

const normalizeBooleanOption = (value, fallback = false) => {
    if (value === undefined || value === null) {
        return fallback;
    }
    return Boolean(value);
};

const normalizeDataset = (dataset = {}, index = 0) => {
    const safeDataset =
        dataset && typeof dataset === "object" ? dataset : {};

    return {
        label:
            safeDataset.label !== undefined && safeDataset.label !== null
                ? String(safeDataset.label)
                : `${props.sensor_name || "Series"} ${index + 1}`,
        data: normalizeDatasetSeries(
            Array.isArray(safeDataset.data) ? safeDataset.data : []
        ),
        backgroundColor:
            safeDataset.backgroundColor ?? props.chartColor.background,
        borderColor: safeDataset.borderColor ?? props.chartColor.border,
        borderWidth: normalizeNumberOption(safeDataset.borderWidth, 2),
        tension: normalizeNumberOption(safeDataset.tension, 0.35),
        pointRadius: normalizeNumberOption(safeDataset.pointRadius, 2.5),
        pointHoverRadius: normalizeNumberOption(
            safeDataset.pointHoverRadius,
            4
        ),
        fill: normalizeBooleanOption(safeDataset.fill, false),
    };
};

const buildDefaultDataset = () => [
    {
        label: String(props.sensor_name || ""),
        data: normalizeDatasetSeries(
            Array.isArray(props.data) ? [...props.data] : []
        ),
        backgroundColor: props.chartColor.background,
        borderColor: props.chartColor.border,
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2.5,
        pointHoverRadius: 4,
        fill: false,
    },
];

const getDatasetSource = () => {
    const datasets = Array.isArray(props.datasets) ? props.datasets : [];
    if (!datasets.length) {
        return buildDefaultDataset();
    }

    return datasets.map((dataset, index) =>
        normalizeDataset(dataset, index)
    );
};

const getChartLabels = () => {
    if (!Array.isArray(props.label)) {
        return [];
    }

    return props.label.map((label) =>
        label === null || label === undefined ? "" : String(label)
    );
};

const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    interaction: {
        mode: "nearest",
        intersect: false,
    },
    hover: {
        mode: "nearest",
        intersect: false,
    },
    plugins: {
        legend: {
            position: "top",
            display: true,
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem) => {
                    const rawValue = tooltipItem.raw;
                    const formattedValue =
                        rawValue === null || rawValue === undefined
                            ? "-"
                            : formatSensorValue(rawValue) + (props.symbol ? ` ${props.symbol}` : "");

                    return `${tooltipItem.dataset.label}: ${formattedValue}`;
                },
            },
        },
    },
    scales: {
        x: {
            title: {
                display: Boolean(props.subtitle),
                text: props.subtitle,
            },
        },
        y: {
            beginAtZero: false,
            ticks: {
                callback: (value) => formatSensorValue(value) + (props.symbol ? ` ${props.symbol}` : ""),
            },
        },
    },
});

const normalizeStructureValue = (value) =>
    value === null || value === undefined ? "" : String(value);

const buildChartStructureSignature = (labels = [], datasets = []) => {
    const safeLabels = Array.isArray(labels) ? labels : [];
    const safeDatasets = Array.isArray(datasets) ? datasets : [];

    const datasetSignature = safeDatasets
        .map((dataset, index) => {
            const safeDataset =
                dataset && typeof dataset === "object" ? dataset : {};

            return [
                index,
                normalizeStructureValue(safeDataset.label),
                Array.isArray(safeDataset.data) ? safeDataset.data.length : 0,
                normalizeStructureValue(safeDataset.fill),
                normalizeStructureValue(safeDataset.borderColor),
                normalizeStructureValue(safeDataset.backgroundColor),
            ].join("|");
        })
        .join("||");

    return [
        `labels:${safeLabels.length}`,
        `datasets:${safeDatasets.length}`,
        datasetSignature,
    ].join("::");
};

const destroyChart = () => {
    if (chartInstance.value !== null) {
        chartInstance.value.destroy();
        chartInstance.value = null;
    }

    chartStructureSignature.value = "";
};

const createChart = (chartLabels, datasetSource, structureSignature) => {
    if (!canvasRef.value) {
        return;
    }

    const ctx = canvasRef.value.getContext("2d");
    if (!ctx) {
        return;
    }

    chartInstance.value = markRaw(
        new Chart(ctx, {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: datasetSource,
            },
            options: getChartOptions(),
        })
    );
    chartStructureSignature.value = structureSignature;
};

const upsertChart = () => {
    if (!canvasRef.value) return;

    const chartLabels = getChartLabels();
    const datasetSource = getDatasetSource();
    const structureSignature = buildChartStructureSignature(
        chartLabels,
        datasetSource
    );

    if (chartInstance.value === null) {
        createChart(chartLabels, datasetSource, structureSignature);
        return;
    }

    if (chartStructureSignature.value !== structureSignature) {
        destroyChart();
        createChart(chartLabels, datasetSource, structureSignature);
        return;
    }

    const chart = chartInstance.value;

    if (!chart) {
        createChart(chartLabels, datasetSource, structureSignature);
        return;
    }

    try {
        chart.setActiveElements?.([]);
        chart.tooltip?.setActiveElements?.([], { x: 0, y: 0 });

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

const normalizeWatchValue = (value) =>
    value === null || value === undefined ? "" : String(value);

const toListSignature = (list = []) =>
    Array.isArray(list)
        ? list.map((item) => normalizeWatchValue(item)).join("\u0001")
        : "";

const buildDatasetSignature = (dataset = {}) => {
    const safeDataset =
        dataset && typeof dataset === "object" ? dataset : {};

    return [
        normalizeWatchValue(safeDataset.label),
        toListSignature(
            Array.isArray(safeDataset.data) ? safeDataset.data : []
        ),
        normalizeWatchValue(safeDataset.borderColor),
        normalizeWatchValue(safeDataset.backgroundColor),
        normalizeWatchValue(safeDataset.borderWidth),
        normalizeWatchValue(safeDataset.tension),
        normalizeWatchValue(safeDataset.pointRadius),
        normalizeWatchValue(safeDataset.pointHoverRadius),
        normalizeWatchValue(safeDataset.fill),
    ].join("|");
};

const buildWatchSignature = () => {
    const labelSignature = toListSignature(getChartLabels());
    const dataSignature = toListSignature(
        Array.isArray(props.data) ? props.data : []
    );
    const datasets = Array.isArray(props.datasets) ? props.datasets : [];
    const datasetSignature = datasets
        .map((dataset) => buildDatasetSignature(dataset))
        .join("||");

    return [
        normalizeWatchValue(props.sensor_name),
        normalizeWatchValue(props.symbol),
        normalizeWatchValue(props.chartColor?.background),
        normalizeWatchValue(props.chartColor?.border),
        normalizeWatchValue(props.subtitle),
        labelSignature,
        dataSignature,
        datasetSignature,
    ].join("::");
};

watch(
    buildWatchSignature,
    upsertChart,
    { flush: "post" }
);

onMounted(upsertChart);

onBeforeUnmount(() => {
    destroyChart();
});
</script>

<style scoped>
.chart-container {
    height: 100%;
}
</style>
