<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps(["href", "active", "icon"]);

const classes = computed(() =>
    props.active
        ? "flex items-center px-4 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out"
        : "flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-green-100 rounded-lg transition duration-150 ease-in-out"
);
</script>

<template>
    <Link
        :href="href"
        :class="classes"
        class="flex items-center justify-between w-full"
        :prefetch="['mount', 'hover', 'click']"
        :cacheFor="60000"
    >
        <div class="flex items-center gap-4">
            <i v-if="icon" :class="`${icon} text-lg`"></i>
            <slot />
        </div>
    </Link>
</template>
