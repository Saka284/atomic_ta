<script setup>
import { ref } from "vue";
import BreezeApplicationLogo from "@/Components/ApplicationLogo.vue";
import BreezeNavLink from "@/Components/NavLink.vue";
import BreezeDropdown from "@/Components/Dropdown.vue";
import BreezeDropdownLink from "@/Components/DropdownLink.vue";
import { Link } from "@inertiajs/inertia-vue3";

const isSidebarOpen = ref(false);

defineProps(["titlePage"]);
</script>

<template>
    <div class="flex min-h-screen bg-gray-100 relative">
        
        <div 
            v-if="isSidebarOpen" 
            @click="isSidebarOpen = false"
            class="fixed inset-0 bg-black bg-opacity-50 z-[9998] transition-opacity"
        ></div>

        <aside
            :class="[
                'fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-[9999]',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            ]"
        >
            <button
                @click="isSidebarOpen = false"
                class="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <div class="h-16 flex items-center justify-center border-b">
                <Link
                    :href="route('monitoring')"
                    class="text-2xl font-bold tracking-wide text-green-600 flex items-center gap-2"
                >
                    <i class="fas fa-seedling text-green-600 text-3xl"></i>
                    Medini
                </Link>
            </div>

            <nav class="px-4 py-6 flex flex-col space-y-2">
                <BreezeNavLink
                    :href="route('monitoring')"
                    :active="route().current('monitoring')"
                    :icon="'fas fa-chart-bar'"
                    class="justify-start pl-6" 
                >
                    Monitoring
                </BreezeNavLink>
                <BreezeNavLink
                    :href="route('heatmap')"
                    :active="route().current('heatmap')"
                    :icon="'fas fa-map-marked-alt'" 
                    class="justify-start pl-6"
                >
                    Heatmap
                </BreezeNavLink>
                <BreezeNavLink
                    :href="route('table')"
                    :active="route().current('table')"
                    :icon="'fas fa-table'"
                    class="justify-start pl-6"
                >
                    Table
                </BreezeNavLink>
                <BreezeNavLink
                    :href="route('camera')"
                    :active="route().current('camera')"
                    :icon="'fas fa-camera-retro'"
                    class="justify-start pl-6"
                >
                    Camera
                </BreezeNavLink>
                <BreezeNavLink
                    :href="route('controlling')"
                    :active="route().current('controlling')"
                    :icon="'fas fa-sliders-h'"
                    class="justify-start pl-6"
                >
                    Controlling
                </BreezeNavLink>
            </nav>
        </aside>

        <div class="flex-1 flex flex-col w-full min-h-screen transition-all duration-300">
            <header
                class="bg-white shadow h-16 flex items-center px-4 sm:px-6 lg:px-8 sticky top-0 z-30"
            >
                <button
                    @click="isSidebarOpen = true"
                    class="text-gray-500 hover:text-gray-700 mr-4 focus:outline-none p-2 rounded hover:bg-gray-100"
                >
                    <svg
                        class="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
                    {{ titlePage }}
                </h1>

                <div class="ml-auto">
                    <BreezeDropdown align="right" width="48">
                        <template #trigger="{ open }">
                            <button
                                class="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                {{ $page.props.auth.user.name }}
                                <svg
                                    class="h-4 w-4 transition-transform duration-200"
                                    :class="{ 'rotate-180': open }"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </template>
                        <template #content>
                            <BreezeDropdownLink
                                :href="route('logout')"
                                method="post"
                                as="button"
                            >
                                Log Out
                            </BreezeDropdownLink>
                        </template>
                    </BreezeDropdown>
                </div>
            </header>

            <main class="flex-1 p-4 sm:p-6 overflow-y-auto">
                <slot />
            </main>
        </div>
    </div>
</template>