<template>
    <div
        class="bg-gray-200 p-2 flex items-center rounded-full shadow-md w-full md:w-max mx-auto"
    >
        <div class="relative flex w-full">
            <div
                v-for="greenhouse in greenhouses"
                :key="greenhouse.id"
                @click="$emit('update:modelValue', greenhouse.id)"
                class="relative z-10 flex-1 px-6 py-3 text-center text-sm md:text-lg font-medium cursor-pointer transition-all duration-300"
                :class="[
                    modelValue == greenhouse.id
                        ? 'text-white'
                        : 'text-gray-700 hover:text-green-600',
                ]"
            >
                {{ getGreenhouseLabel(greenhouse) }}
            </div>

            <!-- Animated Background (Fixed Translate) -->
            <div
                v-if="greenhouseCount > 0"
                class="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300 shadow-md"
                :style="{
                    width: `${100 / greenhouseCount}%`,
                    transform: `translateX(${safeActiveIndex * 100}%)`,
                }"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    greenhouses: Array,
    modelValue: Number,
});

defineEmits(["update:modelValue"]);

// Mencari index dari greenhouse yang aktif
const activeIndex = computed(() =>
    (props.greenhouses || []).findIndex((g) => g.id == props.modelValue)
);

const greenhouseCount = computed(() => props.greenhouses?.length || 0);

const safeActiveIndex = computed(() => {
    if (greenhouseCount.value <= 0) {
        return 0;
    }

    if (activeIndex.value < 0) {
        return 0;
    }

    return Math.min(activeIndex.value, greenhouseCount.value - 1);
});

const getGreenhouseLabel = (greenhouse) => {
    const label = String(greenhouse?.name || "").trim();
    const ghId = Number(greenhouse?.id);
    const fallbackNumber = Number.isFinite(ghId) && ghId > 0 ? ghId : null;

    const normalized = label
        .toLowerCase()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const labelNumberMatch = normalized.match(/(\d+)$/);
    const labelNumber = labelNumberMatch ? Number(labelNumberMatch[1]) : null;
    const tabNumber = labelNumber ?? fallbackNumber;
    const defaultLabel = Number.isFinite(tabNumber) && tabNumber > 0
        ? `GH VONFLORIST ${tabNumber}`
        : "GH VONFLORIST";

    // Normalisasi semua variasi nama default greenhouse agar label tab konsisten
    const shouldUseDefaultLabel =
        !label ||
        /^gh\s*\d+$/.test(normalized) ||
        /^greenhouse\s*\d+$/.test(normalized) ||
        /^gh\s*von\s*florist\s*\d+$/.test(normalized) ||
        /^gh\s*vonflorist\s*\d+$/.test(normalized);

    if (shouldUseDefaultLabel) {
        return defaultLabel;
    }

    return label;
};
</script>
