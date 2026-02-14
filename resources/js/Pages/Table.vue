<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { debounce } from "lodash";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import { Head, usePage } from "@inertiajs/vue3";
import Tabs from "@/Components/Tabs.vue";
import { AgGridVue } from "ag-grid-vue3";
import { AllCommunityModule, ModuleRegistry, themeAlpine } from "ag-grid-community";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";
import { useLocale } from "@/composables/useLocale";

ModuleRegistry.registerModules([AllCommunityModule]);

const toast = useToast();
const { t } = useLocale();

const { greenhouses } = usePage().props;
const activeTab = ref(greenhouses[0].id);
const daterange = ref();
const selectedNode = ref("");
const isExporting = ref(false);
const isLoading = ref(false);

// Server-side pagination state
const rowData = ref([]);
const currentPage = ref(1);
const perPage = ref(10);
const totalRows = ref(0);
const lastPage = ref(1);
const sortField = ref("recorded_at");
const sortDirection = ref("desc");
const columnFilters = ref({});
const responseCache = new Map();
const CACHE_TTL_MS = 30000;
const CACHE_LIMIT = 40;
const gridApi = ref(null);
let activeAbortController = null;
let latestRequestId = 0;

const columnDefs = computed(() => [
    {
        headerName: t("table.no"),
        valueGetter: (params) => {
            return (
                (currentPage.value - 1) * perPage.value + params.node.rowIndex + 1
            );
        },
        minWidth: 60,
        maxWidth: 70,
        filter: false,
        sortable: false,
        resizable: false,
    },
    {
        headerName: t("table.node"),
        field: "node_id",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 80,
        maxWidth: 90,
    },
    {
        headerName: t("table.date"),
        field: "date",
        filter: "agTextColumnFilter",
        sortable: true,
        minWidth: 120,
    },
    {
        headerName: t("table.time"),
        field: "time",
        filter: "agTextColumnFilter",
        sortable: true,
        minWidth: 100,
    },
    {
        headerName: t("table.temperature"),
        field: "temperature",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 150,
    },
    {
        headerName: t("table.humidity"),
        field: "humidity",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 130,
    },
    {
        headerName: t("table.light_intensity"),
        field: "light_intensity",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 160,
    },
    {
        headerName: t("table.rssi"),
        field: "rssi",
        filter: "agNumberColumnFilter",
        sortable: true,
        minWidth: 120,
    },
]);
const defaultColDef = ref({
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: false,
    suppressMovable: true,
});

// Computed display values
const fromRow = () => totalRows.value === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1;
const toRow = () => Math.min(currentPage.value * perPage.value, totalRows.value);

const buildQueryData = () => {
    const queryData = {
        gh_id: activeTab.value,
        page: currentPage.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value,
    };

    if (daterange.value) {
        queryData.start_date = formatDate(daterange.value[0]);
        queryData.end_date = formatDate(daterange.value[1]);
    }

    if (selectedNode.value) {
        queryData.node_id = selectedNode.value;
    }

    if (Object.keys(columnFilters.value).length > 0) {
        queryData.column_filters = columnFilters.value;
    }

    return queryData;
};

const buildCacheKey = (queryData) => JSON.stringify(queryData);

const applyTablePayload = (payload) => {
    rowData.value = payload.data || [];
    totalRows.value = payload.total || 0;
    lastPage.value = payload.last_page || 1;
};

const getCachedPayload = (cacheKey) => {
    const cached = responseCache.get(cacheKey);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
        responseCache.delete(cacheKey);
        return null;
    }

    return cached.payload;
};

const setCachedPayload = (cacheKey, payload) => {
    if (responseCache.size >= CACHE_LIMIT) {
        const oldestKey = responseCache.keys().next().value;
        responseCache.delete(oldestKey);
    }

    responseCache.set(cacheKey, {
        timestamp: Date.now(),
        payload,
    });
};

const fetchData = async ({ force = false } = {}) => {
    const requestId = ++latestRequestId;

    if (activeAbortController) {
        activeAbortController.abort();
        activeAbortController = null;
    }

    const queryData = buildQueryData();
    const cacheKey = buildCacheKey(queryData);

    if (!force) {
        const cachedPayload = getCachedPayload(cacheKey);
        if (cachedPayload) {
            applyTablePayload(cachedPayload);
            isLoading.value = false;
            return;
        }
    }

    activeAbortController = new AbortController();

    try {
        isLoading.value = true;

        const url = `/api/table-per-gh?dict=${encodeURIComponent(
            JSON.stringify(queryData),
        )}`;

        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            signal: activeAbortController.signal,
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const jsonData = await response.json();

        if (requestId !== latestRequestId) {
            return;
        }

        if (jsonData.success && Array.isArray(jsonData.data)) {
            setCachedPayload(cacheKey, jsonData);
            applyTablePayload(jsonData);
            return;
        }

        toast.error(t("table.failed_load_data"));
        console.error("Data format error:", jsonData);
    } catch (error) {
        if (error?.name === "AbortError") {
            return;
        }

        toast.error(t("table.failed_load_data"));
        console.error("Fetch error:", error);
    } finally {
        if (requestId === latestRequestId) {
            isLoading.value = false;
        }
    }
};

// Debounced fetch for filter changes
const debouncedFetchData = debounce(() => {
    currentPage.value = 1; // Reset to page 1 on filter change
    fetchData();
}, 300);
const debouncedColumnFilterFetch = debounce(() => {
    fetchData({ force: true });
}, 250);

// Pagination controls
const goToFirst = () => { currentPage.value = 1; fetchData(); };
const goToPrev = () => { if (currentPage.value > 1) { currentPage.value--; fetchData(); } };
const goToNext = () => { if (currentPage.value < lastPage.value) { currentPage.value++; fetchData(); } };
const goToLast = () => { currentPage.value = lastPage.value; fetchData(); };

const onPerPageChange = () => {
    currentPage.value = 1;
    fetchData();
};

const onSortChanged = (params) => {
    const sortedColumn = params.api
        .getColumnState()
        .find((column) => Boolean(column.sort));

    if (!sortedColumn) {
        sortField.value = "recorded_at";
        sortDirection.value = "desc";
    } else {
        const nextSortField = sortedColumn.colId || "recorded_at";
        sortField.value = nextSortField;
        sortDirection.value = sortedColumn.sort || "desc";
    }

    currentPage.value = 1;
    fetchData({ force: true });
};

const onGridReady = (params) => {
    gridApi.value = params.api;
};

const onFilterChanged = (params) => {
    columnFilters.value = params.api.getFilterModel() || {};
    currentPage.value = 1;
    debouncedColumnFilterFetch();
};

// On tab switch, reset everything and fetch
watch(activeTab, () => {
    currentPage.value = 1;
    columnFilters.value = {};
    if (gridApi.value) {
        gridApi.value.setFilterModel(null);
    }
    debouncedFetchData();
});

// On filter change, reset page and fetch
watch([daterange, selectedNode], () => {
    debouncedFetchData();
});

// Initial fetch
onMounted(() => {
    fetchData();
});

onBeforeUnmount(() => {
    debouncedFetchData.cancel();
    debouncedColumnFilterFetch.cancel();
    if (activeAbortController) {
        activeAbortController.abort();
    }
});

const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
};

const exportData = async () => {
    isExporting.value = true;

    if (!daterange.value) {
        toast.warning(t("table.date_range_required"));
        isExporting.value = false;
        return;
    }

    const payload = {
        gh_id: activeTab.value,
        start_date: formatDate(daterange.value[0]),
        end_date: formatDate(daterange.value[1]),
    };

    if (selectedNode.value) {
        payload.node_id = selectedNode.value;
    }

    try {
        const response = await axios.post("/api/export-sensor", payload, {
            responseType: "blob",
        });

        const blob = new Blob([response.data], {
            type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sensor_${formatDate(daterange.value[0])}_to_${formatDate(
            daterange.value[1]
        )}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        toast.success(t("table.excel_downloaded"));

        isExporting.value = false;
    } catch (error) {
        toast.error(t("table.failed_download"));
        console.error(error);
        isExporting.value = false;
    }
};
</script>
<template>
    <Head :title="t('title.table')" />

    <BreezeAuthenticatedLayout :titlePage="'Table'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ t("title.table") }}
            </h2>
        </template>

        <div class="py-2">
            <!-- Tabs -->
            <div class="max-w-7xl mx-auto sm:px-2 lg:px-2">
                <Tabs
                    :greenhouses="greenhouses"
                    v-model="activeTab"
                    class="mb-4"
                />

                <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div class="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <h3 class="self-center text-2xl font-semibold text-gray-800 md:self-auto">
                            {{ t("table.monitoring_data") }}
                        </h3>
                        
                        <!-- Filter Controls -->
                        <div class="flex flex-wrap items-center justify-end gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
                            
                            <!-- Date Filter -->
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-gray-500">{{ t("table.date") }}</span>
                                <VueDatePicker
                                    v-model="daterange"
                                    range
                                    position:right
                                    :placeholder="t('table.filter_by_date')"
                                    class="w-52 shadow-sm"
                                />
                            </div>

                            <!-- Node Filter & Export Action -->
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-gray-500">{{ t("table.node") }}</span>
                                <select 
                                    v-model="selectedNode"
                                    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm h-[38px] w-40 text-sm"
                                >
                                    <option value="">{{ t("table.all_nodes") }}</option>
                                    <option v-for="n in 5" :key="n" :value="activeTab == 1 ? n : n+5">
                                        {{ t("table.node") }} {{ activeTab == 1 ? n : n+5 }}
                                    </option>
                                </select>
                                
                                <div class="mx-1 h-8 w-[1px] bg-gray-300"></div>

                                <button
                                    :disabled="isExporting"
                                    @click="exportData"
                                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded shadow-md h-[38px] flex items-center gap-2 transition-all transform active:scale-95"
                                    :title="t('table.export_current_view')"
                                >
                                    <i :class="[isExporting ? 'fas fa-spinner fa-spin' : 'fas fa-file-excel']"></i>
                                    <span class="text-sm font-semibold">{{ t("table.export") }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- AG Grid -->
                    <div class="relative">
                        <!-- Loading Overlay -->
                        <div v-if="isLoading" class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                            <div class="flex flex-col items-center gap-3">
                                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                                <span class="text-gray-600 font-medium">{{ t("table.loading_data") }}</span>
                            </div>
                        </div>
                        <ag-grid-vue
                            :rowData="rowData"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :domLayout="'autoHeight'"
                            :theme="themeAlpine"
                            :suppressMenuHide="true"
                            :suppressPaginationPanel="true"
                            @grid-ready="onGridReady"
                            @sort-changed="onSortChanged"
                            @filter-changed="onFilterChanged"
                        >
                        </ag-grid-vue>
                    </div>

                    <!-- Custom Pagination -->
                    <div class="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 text-sm">
                        <!-- Page Size Selector -->
                        <div class="flex items-center gap-2">
                            <select
                                v-model="perPage"
                                @change="onPerPageChange"
                                class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm h-[34px] text-sm"
                            >
                                <option :value="10">10</option>
                                <option :value="20">20</option>
                                <option :value="50">50</option>
                                <option :value="100">100</option>
                            </select>
                        </div>

                        <!-- Page Info & Navigation -->
                        <div class="flex items-center gap-2">
                            <button @click="goToFirst" :disabled="currentPage <= 1" class="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                                <i class="fas fa-angle-double-left"></i>
                            </button>
                            <button @click="goToPrev" :disabled="currentPage <= 1" class="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                                <i class="fas fa-angle-left"></i>
                            </button>
                            
                            <span class="text-gray-600 mx-2">
                                {{ fromRow() }} {{ t("common.to") }} {{ toRow() }} {{ t("common.of") }} {{ totalRows.toLocaleString() }}
                            </span>

                            <button @click="goToNext" :disabled="currentPage >= lastPage" class="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                                <i class="fas fa-angle-right"></i>
                            </button>
                            <button @click="goToLast" :disabled="currentPage >= lastPage" class="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                                <i class="fas fa-angle-double-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>
