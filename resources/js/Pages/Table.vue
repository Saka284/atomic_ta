<script setup>
import { ref, onMounted, watch } from "vue";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
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

const { greenhouses } = usePage().props.value;
const activeTab = ref(greenhouses[0].id);
const daterange = ref();
const isExporting = ref(false);

// column
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
]);
const defaultColDef = ref({
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
});

// data
const rowData = ref([]);

// page
const paginationPageSize = ref(10);
const paginationPageSizeSelector = ref([10, 20, 50, 100]);

let gridApi;

// fetch data table
const fetchData = async () => {
    try {
        if (gridApi) {
            gridApi.showLoadingOverlay(
                `<div class="skeleton-loader">Loading...</div>`
            );
        }
        const queryData = { gh_id: activeTab.value };
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

        if (gridApi) {
            gridApi.hideOverlay();
        }
    } catch (error) {
        toast.error("Gagal memuat data!");
        console.error("Fetch error:", error);
        if (gridApi) {
            gridApi.hideOverlay();
        }
    }
};

onMounted(() => {
    fetchData();
});

watch(activeTab, () => {
    fetchData();
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
        start_date: daterange.value[0],
        end_date: daterange.value[1],
    };

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
                    <div
                        class="flex flex-col md:flex-row justify-center md:justify-between mb-6"
                    >
                        <h3 class="text-2xl text-center md:text-left">
                            Monitoring Data
                        </h3>
                        <div class="flex gap-2 items-center">
                            <p>Export</p>
                            <VueDatePicker
                                v-model="daterange"
                                range
                                position:right
                                placeholder="Pick a Date Range"
                            />
                            <button
                                :disabled="isExporting"
                                @click="exportData"
                                class="bg-green-500 text-white p-1 rounded"
                            >
                                <i
                                    :class="[
                                        isExporting
                                            ? 'fas fa-spinner fa-spin'
                                            : 'far fa-file-excel',
                                        ' w-8 h-full py-1.5',
                                    ]"
                                ></i>
                            </button>
                        </div>
                    </div>
                    <!-- AG Grid -->
                    <div class="ag-theme-alpine">
                        <ag-grid-vue
                            :rowData="rowData"
                            :columnDefs="columnDefs"
                            :defaultColDef="defaultColDef"
                            :pagination="true"
                            :domLayout="'autoHeight'"
                            :paginationPageSize="paginationPageSize"
                            :paginationPageSizeSelector="
                                paginationPageSizeSelector
                            "
                            :animateRows="true"
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
