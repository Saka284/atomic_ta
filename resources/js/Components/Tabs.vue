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
                {{ greenhouse.name }}
            </div>

            <!-- Animated Background (Fixed Translate) -->
            <div
                class="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300 shadow-md"
                :style="{
                    width: `${100 / greenhouses.length}%`,
                    transform: `translateX(${
                        activeIndex * (100 / greenhouses.length) * 2
                    }%)`,
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
    props.greenhouses.findIndex((g) => g.id == props.modelValue)
);
</script>
