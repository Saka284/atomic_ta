<template>
    <div class="gauge-container w-full max-h-[300px]">
        <div :id="'gauge-container-' + id" class="w-full"></div>
    </div>
</template>

<script>
import { onMounted } from "vue";

export default {
    name: "GaugeComponent",
    props: {
        value: {
            type: Number,
            default: 50,
        },
        thd_min: {
            type: Number,
            default: 0,
        },
        thd_max: {
            type: Number,
            default: 100,
        },
        symbol: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        id: {
            type: Number,
        },
    },
    mounted() {
        this.createGauge();
    },
    methods: {
        createGauge() {
            const gaugeId = "gauge-container-" + this.id;

            const gauge = new JustGage({
                id: gaugeId,
                value: this.value,
                min: this.thd_min,
                max: this.thd_max,
                title: this.title,
                symbol: " " + this.symbol,
                gaugeWidthScale: 1.0,
                humanFriendlyDecimal: 2,
                startAnimationType: "bounce",
                decimals: 2,
                relativeGaugeSize: true,
                pointer: true,
                pointerOptions: {
                    length: 0.9,
                    width: 0.03,
                },
                counter: true,
            });
        },
    },
};
</script>

<style scoped>
.gauge-container {
    width: 100%;
}

#gauge-container {
    width: 100%;
    height: 100%;
}
</style>
