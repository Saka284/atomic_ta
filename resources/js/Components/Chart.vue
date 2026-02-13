<template>
    <div class="chart-container w-full max-h-[300px]">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
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

const getDatasetSource = () =>
    props.datasets.length
        ? props.datasets.map((dataset) => ({
              ...dataset,
              data: normalizeDatasetSeries(
                  Array.isArray(dataset.data) ? dataset.data : []
              ),
              borderWidth: dataset.borderWidth ?? 2,
              tension: dataset.tension ?? 0.35,
              pointRadius: dataset.pointRadius ?? 2.5,
              pointHoverRadius: dataset.pointHoverRadius ?? 4,
              fill: dataset.fill ?? false,
          }))
        : [
              {
                  label: props.sensor_name,
                  data: normalizeDatasetSeries(
                      Array.isArray(props.data) ? [...props.data] : []
                  ),
                  backgroundColor: props.chartColor.background,
                  borderColor: props.chartColor.border,
                  borderWidth: 2,
                  tension: 0.35,
                  pointRadius: 2.5,
                  pointHoverRadius: 4,
              },
          ];

const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
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

const upsertChart = async () => {
    await nextTick();

    if (!canvasRef.value) return;

    const chartLabels = Array.isArray(props.label) ? [...props.label] : [];
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

watch(
    () => [
        props.data,
        props.label,
        props.datasets,
        props.sensor_name,
        props.chartColor,
    ],
    upsertChart,
    { deep: true }
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
