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
    chartInstance.value = new Chart(ctx, {
        type: "line",
        data: {
            labels: [...props.label],
            datasets: [
                {
                    label: props.sensor_name,
                    data: [...props.data],
                    backgroundColor: props.chartColor.background,
                    borderColor: props.chartColor.border,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top" },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
                    },
                },
            },
            scales: {
                y: { suggestedMin: 0, suggestedMax: 10 },
            },
        },
    });
};

watch(() => [props.data, props.label], createChart, { deep: true });

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
