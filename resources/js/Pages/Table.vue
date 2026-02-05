<script setup>
import { ref, onMounted, watch } from "vue";
import { debounce } from "lodash";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import { Head, usePage } from "@inertiajs/vue3";
import Tabs from "@/Components/Tabs.vue";
import { AgGridVue } from "ag-grid-vue3";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";

ModuleRegistry.registerModules([AllCommunityModule]);

const toast = useToast();

const { greenhouses, allTableData } = usePage().props;
const activeTab = ref(greenhouses[0].id);
const daterange = ref();
const selectedNode = ref("");
const isExporting = ref(false);
const isLoading = ref(false);

const rowData = ref(allTableData?.[greenhouses[0].id] || []);

const columnDefs = ref([
    {
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        minWidth: 50,
        filter: false,
        sortable: false,
        resizable: true,
    },
    { headerName: "Node", field: "node_id", filter: "agNumberColumnFilter" },
    {
        headerName: "Date",
        field: "date",
        filter: "agDateColumnFilter",
    },
    {
        headerName: "Time",
        field: "time",
        filter: false,
    },
    {
        headerName: "Temperature (°C)",
        field: "temperature",
        filter: "agNumberColumnFilter",
    },
    {
        headerName: "Humidity (%)",
        field: "humidity",
        filter: "agNumberColumnFilter",
    },
    {
        headerName: "Light Intensity (lx)",
        field: "light_intensity",
        filter: "agNumberColumnFilter",
    },
    {
        headerName: "RSSI (dBm)",
        field: "rssi",
        filter: "agNumberColumnFilter",
    },
]);
const defaultColDef = ref({
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
    suppressHeaderMenuButton: true,
});

const paginationPageSize = ref(10);
const paginationPageSizeSelector = ref([10, 20, 50, 100]);

let gridApi;

const fetchData = async () => {
    if (!daterange.value && !selectedNode.value) {
        rowData.value = allTableData?.[activeTab.value] || [];
        return;
    }
    
    try {
        isLoading.value = true;
        
        const queryData = { gh_id: activeTab.value };
        
        if (daterange.value) {
            queryData.start_date = formatDate(daterange.value[0]);
            queryData.end_date = formatDate(daterange.value[1]);
        }

        if (selectedNode.value) {
            queryData.node_id = selectedNode.value;
        }

        const url = `/api/table-per-gh?dict=` + JSON.stringify(queryData);

        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const jsonData = await response.json();

        if (Array.isArray(jsonData.data)) {
            rowData.value = jsonData.data;
        } else {
            toast.error("Gagal memuat data!");
            console.error("Data format error: Expected array", jsonData);
        }
    } catch (error) {
        toast.error("Gagal memuat data!");
        console.error("Fetch error:", error);
    } finally {
        isLoading.value = false;
    }
};

const debouncedFetchData = debounce(() => {
    fetchData();
}, 300);

watch(activeTab, () => {
    if (!daterange.value && !selectedNode.value) {
        rowData.value = allTableData?.[activeTab.value] || [];
    } else {
        debouncedFetchData();
    }
});

watch([daterange, selectedNode], () => {
    debouncedFetchData();
});

const onGridReady = (params) => {
    gridApi = params.api;
};

const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
};

const exportData = async () => {
    isExporting.value = true;

    if (!daterange.value) {
        toast.warning("Rentang tanggal belum dipilih");
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

        toast.success("Excel berhasil diunduh!");

        isExporting.value = false;
    } catch (error) {
        toast.error("Gagal mengunduh file!");
        console.error(error);
        isExporting.value = false;
    }
};
</script>
<template>
    <Head title="Table" />

    <BreezeAuthenticatedLayout :titlePage="'Table'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Table
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

                <div class="bg-white shadow-sm rounded-lg p-4">
                    <div class="flex flex-col md:flex-row justify-center md:justify-between mb-6 gap-4">
                        <h3 class="text-2xl text-center md:text-left self-center">
                            Monitoring Data
                        </h3>
                        
                        <!-- Filter Controls -->
                        <div class="flex flex-col gap-3 items-end justify-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                            
                            <!-- Date Filter (Global View) -->
                            <div class="flex items-center gap-2 w-full justify-end">
                                <span class="text-xs text-gray-500 uppercase font-bold tracking-wider">Date</span>
                                <VueDatePicker
                                    v-model="daterange"
                                    range
                                    position:right
                                    placeholder="Filter by Date"
                                    class="w-64 shadow-sm"
                                />
                            </div>

                            <!-- Node Filter & Export Action -->
                            <div class="flex gap-2 w-full justify-end items-center">
                                <span class="text-xs text-gray-500 uppercase font-bold tracking-wider">Node</span>
                                <select 
                                    v-model="selectedNode"
                                    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm h-[38px] w-40 text-sm"
                                >
                                    <option value="">All Nodes</option>
                                    <option v-for="n in 5" :key="n" :value="activeTab == 1 ? n : n+5">
                                        Node {{ activeTab == 1 ? n : n+5 }}
                                    </option>
                                </select>
                                
                                <div class="h-8 w-[1px] bg-gray-300 mx-1"></div> <!-- Divider -->

                                <button
                                    :disabled="isExporting"
                                    @click="exportData"
                                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded shadow-md h-[38px] flex items-center gap-2 transition-all transform active:scale-95"
                                    title="Export Current View to Excel"
                                >
                                    <i :class="[isExporting ? 'fas fa-spinner fa-spin' : 'fas fa-file-excel']"></i>
                                    <span class="text-sm font-semibold">Export</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- AG Grid -->
                    <div class="ag-theme-alpine relative">
                        <!-- Loading Skeleton -->
                        <div v-if="isLoading" class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                            <div class="flex flex-col items-center gap-3">
                                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                                <span class="text-gray-600 font-medium">Memuat data...</span>
                            </div>
                        </div>
                        <ag-grid-vue
                            :rowData="rowData"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :pagination="true"
                            :domLayout="'autoHeight'"
                            :paginationPageSize="paginationPageSize"
                            :paginationPageSizeSelector="paginationPageSizeSelector"
                            :animateRows="true"
                            :loading="isLoading"
                            @grid-ready="onGridReady"
                            class="ag-theme-alpine"
                        >
                        </ag-grid-vue>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>
