<script setup>
import { Link } from "@inertiajs/inertia-vue3";
</script>

<template>
    <div
        class="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-100"
    >
        <div>
            <Link
                href="/"
                class="text-5xl font-bold tracking-wide text-green-600 flex items-center gap-2"
            >
                <i class="fas fa-seedling text-green-600 text-6xl"></i>
                Medini
            </Link>
        </div>

        <div
            class="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
            <slot />
        </div>
    </div>
</template>
