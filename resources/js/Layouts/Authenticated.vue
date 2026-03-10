<script setup>
import { computed, ref } from "vue";
import BreezeNavLink from "@/Components/NavLink.vue";
import BreezeDropdown from "@/Components/Dropdown.vue";
import BreezeDropdownLink from "@/Components/DropdownLink.vue";
import { Link } from "@inertiajs/vue3";
import { useLocale } from "@/composables/useLocale";

const isSidebarOpen = ref(false);
const { locale, setLocale, t } = useLocale();

const props = defineProps(["titlePage"]);

const navItems = computed(() => [
    {
        label: t("nav.monitoring"),
        routeName: "monitoring",
        icon: "fas fa-chart-line",
        description: t("nav.monitoring_desc"),
    },
    {
        label: t("nav.heatmap"),
        routeName: "heatmap",
        icon: "fas fa-layer-group",
        description: t("nav.heatmap_desc"),
    },
    {
        label: t("nav.table"),
        routeName: "table",
        icon: "fas fa-table",
        description: t("nav.table_desc"),
    },
    {
        label: t("nav.camera"),
        routeName: "camera",
        icon: "fas fa-camera",
        description: t("nav.camera_desc"),
    },
    {
        label: t("nav.controlling"),
        routeName: "controlling",
        icon: "fas fa-sliders-h",
        description: t("nav.controlling_desc"),
    },
]);

const pageTitle = computed(() => {
    const normalized = String(props.titlePage || "")
        .trim()
        .toLowerCase();
    const titleKeyMap = {
        monitoring: "title.monitoring",
        heatmap: "title.heatmap",
        table: "title.table",
        camera: "title.camera",
        controlling: "title.controlling",
    };
    const key = titleKeyMap[normalized];
    return key ? t(key) : props.titlePage;
});

const closeSidebar = () => {
    isSidebarOpen.value = false;
};

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const handleNavClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
        closeSidebar();
    }
};

const switchToIndonesian = () => {
    setLocale("id");
};

const switchToEnglish = () => {
    setLocale("en");
};
</script>

<template>
    <div class="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-white text-slate-800">
        <div
            v-if="isSidebarOpen"
            @click="closeSidebar"
            class="fixed inset-0 z-[1990] bg-slate-900/45 backdrop-blur-[1px]"
        ></div>

        <div class="relative flex min-h-screen">
            <aside
                :class="[
                    'fixed inset-y-0 left-0 z-[2000] w-72 max-w-[88vw] transform transition-transform duration-200 ease-in-out',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
                ]"
            >
                <div class="h-full p-3">
                    <div class="flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg">
                        <div class="flex items-center justify-between border-b border-emerald-100 px-4 py-4">
                            <Link
                                :href="route('monitoring')"
                                class="inline-flex items-center gap-3"
                            >
                                <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
                                    <i class="fas fa-seedling text-lg"></i>
                                </span>
                                <span class="leading-tight">
                                    <span class="block text-lg font-bold tracking-tight text-emerald-700">
                                        Medini
                                    </span>
                                    <span class="block text-xs text-slate-500">
                                        {{ t("layout.brand_console") }}
                                    </span>
                                </span>
                            </Link>

                            <button
                                @click="closeSidebar"
                                class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                                :aria-label="t('layout.close_sidebar')"
                            >
                                <i class="fas fa-times text-sm"></i>
                            </button>
                        </div>

                        <div class="flex-1 overflow-y-auto px-3 py-4">
                            <p class="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                {{ t("layout.navigation") }}
                            </p>
                            <nav class="mt-3 space-y-2">
                                <BreezeNavLink
                                    v-for="item in navItems"
                                    :key="item.routeName"
                                    :href="route(item.routeName)"
                                    :active="route().current(item.routeName)"
                                    :icon="item.icon"
                                    :description="item.description"
                                    @click="handleNavClick"
                                >
                                    {{ item.label }}
                                </BreezeNavLink>
                            </nav>
                        </div>

                        <div class="border-t border-emerald-100 px-4 py-4">
                            <div class="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3">
                                <p class="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">
                                    {{ t("layout.system_status") }}
                                </p>
                                <p class="mt-1 text-sm font-medium text-slate-700">
                                    {{ t("layout.dashboard_ready") }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <div class="flex min-w-0 flex-1 flex-col">
                <header class="sticky top-0 z-30 border-b border-emerald-100/70 bg-white/90 backdrop-blur">
                    <div class="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
                        <button
                            @click="toggleSidebar"
                            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                            :aria-label="t('layout.toggle_navigation')"
                        >
                            <i :class="isSidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
                        </button>

                        <div class="min-w-0">
                            <h1 class="truncate text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                                {{ pageTitle }}
                            </h1>
                            <p class="hidden text-xs text-slate-500 sm:block">
                                {{ t("layout.header_subtitle") }}
                            </p>
                        </div>

                        <div class="ml-auto flex items-center gap-2">
                            <div
                                class="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1"
                                :title="t('layout.language')"
                            >
                                <button
                                    type="button"
                                    class="rounded-lg px-2 py-1 text-xs font-semibold transition"
                                    :class="
                                        locale === 'id'
                                            ? 'bg-emerald-500 text-white'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    "
                                    @click="switchToIndonesian"
                                >
                                    ID
                                </button>
                                <button
                                    type="button"
                                    class="rounded-lg px-2 py-1 text-xs font-semibold transition"
                                    :class="
                                        locale === 'en'
                                            ? 'bg-emerald-500 text-white'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    "
                                    @click="switchToEnglish"
                                >
                                    EN
                                </button>
                            </div>

                            <BreezeDropdown align="right" width="52">
                                <template #trigger="{ open }">
                                    <button
                                        class="inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
                                    >
                                        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                            {{ ($page.props.auth.user.username || "U")[0].toUpperCase() }}
                                        </span>
                                        <span class="hidden sm:inline">{{ $page.props.auth.user.username }}</span>
                                        <i
                                            class="fas fa-chevron-down text-[11px] transition-transform duration-200"
                                            :class="{ 'rotate-180': open }"
                                        ></i>
                                    </button>
                                </template>
                                <template #content>
                                    <BreezeDropdownLink
                                        :href="route('logout')"
                                        method="post"
                                        as="button"
                                    >
                                        {{ t("layout.logout") }}
                                    </BreezeDropdownLink>
                                </template>
                            </BreezeDropdown>
                        </div>
                    </div>
                </header>

                <main class="flex-1 p-4 sm:p-6 lg:p-8">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>
