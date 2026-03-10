<template>
    <div class="gauge-container w-full max-h-[300px]">
        <div :id="'gauge-container-' + id" class="w-full"></div>
    </div>
</template>

<script>
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
    data() {
        return {
            gaugeInstance: null,
        };
    },
    mounted() {
        this.createGauge();
    },
    beforeUnmount() {
        if (this.gaugeInstance && typeof this.gaugeInstance.destroy === "function") {
            this.gaugeInstance.destroy();
        }

        this.gaugeInstance = null;
    },
    watch: {
        value(newValue) {
            if (this.gaugeInstance && typeof this.gaugeInstance.refresh === "function") {
                this.gaugeInstance.refresh(this.normalizeValue(newValue));
            }
        },
    },
    methods: {
        isLightIntensityGauge() {
            const normalizedTitle = String(this.title || "").trim().toLowerCase();
            const normalizedSymbol = String(this.symbol || "").trim().toLowerCase();

            return (
                normalizedTitle === "light intensity" ||
                normalizedTitle === "light_intensity" ||
                normalizedTitle === "intensitas cahaya" ||
                normalizedSymbol === "lux"
            );
        },
        getDecimalPlaces() {
            return this.isLightIntensityGauge() ? 0 : 2;
        },
        normalizeValue(value) {
            const numericValue = Number(value);
            return Number.isFinite(numericValue) ? numericValue : 0;
        },
        formatGaugeValue(value) {
            const numericValue = Number(value);
            if (!Number.isFinite(numericValue)) {
                return "-";
            }

            return numericValue.toFixed(this.getDecimalPlaces());
        },
        createGauge() {
            const gaugeId = "gauge-container-" + this.id;
            const decimalPlaces = this.getDecimalPlaces();

            this.gaugeInstance = new JustGage({
                id: gaugeId,
                value: this.normalizeValue(this.value),
                min: this.thd_min,
                max: this.thd_max,
                title: this.title,
                symbol: " " + this.symbol,
                gaugeWidthScale: 1.0,
                humanFriendly: false,
                humanFriendlyDecimal: decimalPlaces,
                startAnimationType: "bounce",
                decimals: decimalPlaces,
                textRenderer: (value) => this.formatGaugeValue(value),
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
