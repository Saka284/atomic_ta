<template>
    <div class="chart-container w-full max-h-[300px]">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
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
});

const canvasRef = ref(null);
const chartInstance = ref(null);

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
                            : formatSensorValue(rawValue);

                    return `${tooltipItem.dataset.label}: ${formattedValue}`;
                },
            },
        },
    },
    scales: {
        y: {
            beginAtZero: false,
            ticks: {
                callback: (value) => formatSensorValue(value),
            },
        },
    },
});

const upsertChart = () => {
    if (!canvasRef.value) return;

    const chartLabels = getChartLabels();
    const datasetSource = getDatasetSource();

    if (chartInstance.value === null) {
        const ctx = canvasRef.value.getContext("2d");
        chartInstance.value = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: datasetSource,
            },
            options: getChartOptions(),
        });
        return;
    }

    const chart = chartInstance.value;
    chart.data.labels = chartLabels;
    chart.data.datasets = datasetSource;
    chart.update("none");
};

const buildWatchSignature = () =>
    JSON.stringify({
        sensor_name: props.sensor_name || "",
        labels: getChartLabels(),
        data: Array.isArray(props.data) ? props.data : [],
        datasets: Array.isArray(props.datasets)
            ? props.datasets.map((dataset) => ({
                  label:
                      dataset?.label !== undefined && dataset?.label !== null
                          ? String(dataset.label)
                          : "",
                  data: Array.isArray(dataset?.data) ? dataset.data : [],
                  borderColor: dataset?.borderColor ?? null,
                  backgroundColor: dataset?.backgroundColor ?? null,
                  borderWidth: dataset?.borderWidth ?? null,
                  tension: dataset?.tension ?? null,
                  pointRadius: dataset?.pointRadius ?? null,
                  pointHoverRadius: dataset?.pointHoverRadius ?? null,
                  fill: dataset?.fill ?? null,
              }))
            : [],
        chartColor: {
            background: props.chartColor?.background ?? "",
            border: props.chartColor?.border ?? "",
        },
    });

watch(
    buildWatchSignature,
    upsertChart,
    { flush: "post" }
);

onMounted(upsertChart);

onBeforeUnmount(() => {
    if (chartInstance.value !== null) {
        chartInstance.value.destroy();
        chartInstance.value = null;
    }
});
</script>

<style scoped>
.chart-container {
    height: 100%;
}
</style>
