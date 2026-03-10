<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: "",
    },
});

const classes = computed(() => [
    "group relative flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-all duration-200",
    props.active
        ? "border-emerald-300 bg-emerald-500 text-white shadow-md shadow-emerald-700/25"
        : "border-transparent text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700",
]);

const iconWrapClasses = computed(() => [
    "inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
    props.active
        ? "bg-white/20 text-white"
        : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200",
]);

const descriptionClasses = computed(() =>
    props.active ? "text-emerald-50/90" : "text-slate-400 group-hover:text-emerald-600/80",
);
</script>

<template>
    <Link
        :href="href"
        :class="classes"
    >
        <span :class="iconWrapClasses">
            <i v-if="icon" :class="`${icon} text-sm`"></i>
        </span>

        <span class="flex min-w-0 flex-1 flex-col text-left leading-tight">
            <span class="truncate text-sm font-semibold tracking-[0.01em]">
                <slot />
            </span>
            <span
                v-if="description"
                class="truncate text-[11px]"
                :class="descriptionClasses"
            >
                {{ description }}
            </span>
        </span>

        <span
            class="text-[11px] transition-transform duration-200"
            :class="props.active ? 'text-white/90' : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-emerald-400'"
        >
            <i class="fas fa-chevron-right"></i>
        </span>
    </Link>
</template>
