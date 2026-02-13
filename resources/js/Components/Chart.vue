<template>
    <div class="chart-container w-full max-h-[300px]">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
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

const createChart = async () => {
    await nextTick(); // Pastikan DOM sudah ada

    if (!canvasRef.value) return;

    const ctx = canvasRef.value.getContext("2d");

    // Hapus chart lama jika ada
    if (chartInstance.value !== null) {
        chartInstance.value.destroy();
        chartInstance.value = null;
    }

    // Buat chart baru
    const datasetSource = props.datasets.length
        ? props.datasets.map((dataset) => ({
              ...dataset,
              borderWidth: dataset.borderWidth ?? 2,
              tension: dataset.tension ?? 0.35,
              pointRadius: dataset.pointRadius ?? 2.5,
              pointHoverRadius: dataset.pointHoverRadius ?? 4,
              fill: dataset.fill ?? false,
          }))
        : [
              {
                  label: props.sensor_name,
                  data: [...props.data],
                  backgroundColor: props.chartColor.background,
                  borderColor: props.chartColor.border,
                  borderWidth: 2,
                  tension: 0.35,
                  pointRadius: 2.5,
                  pointHoverRadius: 4,
              },
          ];

    chartInstance.value = new Chart(ctx, {
        type: "line",
        data: {
            labels: [...props.label],
            datasets: datasetSource,
        },
        options: {
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
                            const numericValue = Number(rawValue);
                            const formattedValue =
                                rawValue === null || rawValue === undefined
                                    ? "-"
                                    : Number.isFinite(numericValue)
                                      ? numericValue.toFixed(2)
                                      : rawValue;

                            return `${tooltipItem.dataset.label}: ${formattedValue}`;
                        },
                    },
                },
            },
            scales: {
                y: { beginAtZero: false },
            },
        },
    });
};

watch(
    () => [props.data, props.label, props.datasets, props.sensor_name],
    createChart,
    { deep: true }
);

onMounted(createChart);

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
