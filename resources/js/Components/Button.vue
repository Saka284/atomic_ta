<script setup>
defineProps({
    type: {
        type: String,
        default: "submit",
    },
    active: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        :type="type"
        :class="[
            'inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 bg-sky-400',
            'hover:bg-sky-600',
        ]"
    >
        <slot />
    </button>
</template>
