<script setup>
import { ref, onMounted, watch } from "vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import DigitalClock from "@/Components/DigitalClock.vue";
import Button from "@/Components/Button.vue";
import { AgGridVue } from "ag-grid-vue3";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useToast } from "vue-toastification";

ModuleRegistry.registerModules([AllCommunityModule]);

const toast = useToast();

const { greenhouses, auth, latestData } = usePage().props.value;
const daterange = ref();
const isExporting = ref(false);
const selectedGreenhouse = ref("");
const rowImageLoading = ref({});

const actuators = ref([
    {
        name: "Exhaust Fan",
        icon: "fas fa-fan", // Font Awesome icon class
        color: "text-yellow-500",
        status: false, // false = off, true = on
    },
    {
        name: "Dehumidifier",
        icon: "fas fa-tint",
        color: "text-cyan-500",
        status: false,
    },
    {
        name: "Blower",
        icon: "fas fa-fan",
        color: "text-red-500",
        status: false,
    },
]);

// grid
const gridOptions = ref({
    columnDefs: [
        { field: "recorded_at", sortable: true, resizable: true, flex: 1 },
        { field: "status", sortable: true, resizable: true, flex: 1 },
    ],
    rowSelection: {
        mode: "singleRow",
        checkboxes: false,
        enableClickSelection: true,
    },
    initialState: {
        rowSelection: [],
    },
});

// column
const columnDefs = ref([
    {
        headerName: "Datetime",
        field: "recorded_at",
        sortable: true,
        resizable: true,
        flex: 1,
    },
    {
        headerName: "Akurasi Kabut",
        field: "fog_percentage",
        sortable: true,
        resizable: true,
        flex: 1,
        cellClass: "text-center",
        cellRenderer: (params) => {
            return params.value ? `${params.value}%` : '-';
        }
    },
    {
        headerName: "Status",
        field: "status",
        sortable: true,
        resizable: true,
        flex: 1,
        cellClass: "text-center",
        cellRenderer: (params) => {
            const status = params.value || "Unknown";

            const statusClasses = {
                Berkabut: "bg-sky-100 text-sky-600",
                "Tidak Berkabut": "bg-green-100 text-green-600",
                Unknown: "bg-gray-100 text-gray-600",
            };

            const badgeClass =
                statusClasses[status] || "bg-gray-100 text-gray-600";

            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.justifyContent = "center";
            wrapper.style.alignItems = "center";
            wrapper.style.width = "100%";
            wrapper.style.height = "100%";

            const div = document.createElement("div");
            div.className = `my-auto px-3 py-2 rounded-full text-xs font-semibold ${badgeClass}`;
            div.textContent = status;
            div.style.display = "inline-block";

            wrapper.appendChild(div);
            return wrapper;
        },
    },
]);

// change pointer on hover
const rowClassRules = ref({
    "cursor-pointer hover:bg-gray-100": (params) => true,
});

// data
const rowDataMap = ref({});
const rowImageMap = ref({});

// page
const paginationPageSize = ref(5);
const paginationPageSizeSelector = ref([5, 10, 20]);

const gridApiMap = ref({});

const setText = (selector, text) => {
    document.querySelector(selector).innerHTML = text;
};

const onPaginationChanged = (gh_id) => {
    if (gridApiMap.value[gh_id]) {
        const totalPages = gridApiMap.value[gh_id].paginationGetTotalPages();
        const currentPage = gridApiMap.value[gh_id].paginationGetCurrentPage();

        let paginationText =
            totalPages > 0 ? `${currentPage + 1} of ${totalPages}` : "No Data";
        setText("#lbPages" + gh_id, paginationText);
    }
};

const onBtFirst = (gh_id) => {
    gridApiMap.value[gh_id].paginationGoToFirstPage();
};

const onBtLast = (gh_id) => {
    gridApiMap.value[gh_id].paginationGoToLastPage();
};

const onBtNext = (gh_id) => {
    gridApiMap.value[gh_id].paginationGoToNextPage();
};

const onBtPrevious = (gh_id) => {
    gridApiMap.value[gh_id].paginationGoToPreviousPage();
};

// fetch data table
const fetchData = async (gh_id) => {
    try {
        showLoading(gh_id);
        rowImageLoading.value[gh_id] = true;

        const queryData = { gh_id: gh_id };
        const url = `/api/camera-per-gh?dict=` + JSON.stringify(queryData);

        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const jsonData = await response.json();

        if (Array.isArray(jsonData.data)) {
            rowDataMap.value[gh_id] = jsonData.data;
            rowImageMap.value[gh_id] = jsonData.data[0] || [];
        } else {
            toast.error("Gagal memuat data!");
            console.error("Data format error: Expected array", jsonData);
        }

        hideLoading(gh_id);
        rowImageLoading.value[gh_id] = false;
    } catch (error) {
        toast.error("Gagal memuat data!");
        console.error("Fetch error:", error);
        hideLoading(gh_id);
        rowImageLoading.value[gh_id] = false;
    }
};

onMounted(() => {
    greenhouses.forEach((greenhouse) => {
        fetchData(greenhouse.id).then(() => {
            onPaginationChanged(greenhouse.id);
        });
    });
});

const onGridReady = (params, gh_id) => {
    gridApiMap.value[gh_id] = params.api;
};

const showLoading = (gh_id) => {
    if (gridApiMap.value[gh_id]) {
        gridApiMap.value[gh_id].showLoadingOverlay();
    }
};

const hideLoading = (gh_id) => {
    if (gridApiMap.value[gh_id]) {
        gridApiMap.value[gh_id].hideOverlay();
    }
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
        start_date: daterange.value[0],
        end_date: daterange.value[1],
        gh_id: selectedGreenhouse.value,
    };

    try {
        const response = await axios.post("/api/export-camera", payload, {
            responseType: "blob",
        });

        const blob = new Blob([response.data], {
            type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `camera_${formatDate(daterange.value[0])}_to_${formatDate(
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

const onRowSelected = (event, gh_id) => {
    if (event.node.isSelected()) {
        rowImageLoading.value[gh_id] = true;

        if (rowImageMap.value[gh_id]?.image !== event.data.image) {
            rowImageMap.value[gh_id] = { ...event.data };
        }

        setTimeout(() => {
            rowImageLoading.value[gh_id] = false;
        }, 500);
    }
};
</script>

<template>
    <Head title="Camera" />

    <BreezeAuthenticatedLayout :titlePage="'Camera'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Camera
            </h2>
        </template>

        <div class="py-2 font-sans">
            <div class="max-w-7xl mx-auto sm:px-2 lg:px-2">
                <div class="flex flex-col lg:flex-row gap-2 mb-2">
                    <div
                        class="bg-white overflow-hidden shadow-sm rounded-lg p-4 w-full lg:w-3/5 flex items-center"
                    >
                        <div class="flex flex-col w-full gap-2">
                            <div class="flex justify-between">
                                <p>Time</p>
                                <DigitalClock />
                            </div>
                            <div class="flex justify-between">
                                <p>Latest Data</p>
                                <p>
                                    {{ latestData || "-" }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-white overflow-hidden shadow-sm rounded-lg p-4 w-full lg:w-2/5"
                    >
                        <div class="flex flex-col w-full">
                            <div class="flex justify-between">
                                <p class="text-lg">Export</p>
                            </div>
                            <div class="flex justify-between gap-2">
                                <select
                                    v-model="selectedGreenhouse"
                                    class="w-3/4 sm:w-1/2 p-1.5 border rounded-lg text-center focus:ring focus:ring-blue-300 hover:border-blue-400 transition"
                                >
                                    <option value="">All</option>
                                    <option
                                        v-for="greenhouse in greenhouses"
                                        :key="greenhouse.id"
                                        :value="greenhouse.id"
                                    >
                                        {{ greenhouse.name }}
                                    </option>
                                </select>
                                <VueDatePicker
                                    v-model="daterange"
                                    range
                                    :teleport="true"
                                    position="left"
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
                    </div>
                </div>

                <div
                    class="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
                >
                    <div
                        v-for="(actuator, index) in actuators"
                        :key="index"
                        class="bg-white overflow-hidden shadow-sm rounded-lg p-4"
                    >
                        <div
                            class="flex items-center justify-between h-full"
                        >
                            <div class="flex items-center">
                                <i
                                    :class="[
                                        actuator.icon,
                                        actuator.color,
                                        'text-3xl w-10',
                                    ]"
                                ></i>
                                <div class="ml-4">
                                    <p
                                        class="font-semibold text-gray-800"
                                    >
                                        {{ actuator.name }}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        Status
                                    </p>
                                </div>
                            </div>

                            <div
                                :class="actuator.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                                class="px-3 py-1 text-xs font-bold rounded-full"
                            >
                                {{ actuator.status ? 'ON' : 'OFF' }}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex flex-col lg:flex-row gap-2">
                    <div
                        v-for="greenhouse in greenhouses"
                        :key="greenhouse.id"
                        class="bg-white overflow-hidden shadow-sm rounded-lg p-4 w-full"
                    >
                        <div class="flex flex-col md:flex-row md:justify-between w-full items-center mb-4">
                            <div class="flex flex-col md:flex-row md:justify-between w-full items-center mb-4">
                            <p class="text-lg font-semibold leading-tight">
                                Camera {{ greenhouse.name }}
                            </p>
                            
                            <div class="flex flex-col items-end">
                                
                                <div v-if="rowImageMap[greenhouse.id]?.fog_percentage" 
                                    class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 border border-blue-200 shadow-sm">
                                    <span class="text-xs font-bold">
                                        Akurasi: {{ rowImageMap[greenhouse.id]?.fog_percentage }}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-4 w-full">
                            <div
                                class="p-3 border rounded-lg flex justify-center items-center w-full h-[300px]"
                            >
                                <div
                                    v-if="rowImageLoading[greenhouse.id]"
                                    class="flex justify-center items-center"
                                >
                                    <i
                                        class="fas fa-spinner fa-spin text-gray-400 text-3xl"
                                    ></i>
                                </div>
                                <img
                                    v-else
                                    :src="
                                        rowImageMap[greenhouse.id]?.image ||
                                        '/images/no-image.svg'
                                    "
                                    alt="image"
                                    class="w-full h-full object-contain"
                                    @load="
                                        rowImageLoading[greenhouse.id] = false
                                    "
                                    @error="
                                        (e) => {
                                            e.target.src =
                                                '/images/no-image.svg';
                                            rowImageLoading[
                                                greenhouse.id
                                            ] = false;
                                        }
                                    "
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <div class="ag-theme-alpine">
                                    <ag-grid-vue
                                        :rowData="
                                            rowDataMap[greenhouse.id] || []
                                        "
                                        :columnDefs="columnDefs"
                                        :pagination="true"
                                        :domLayout="'autoHeight'"
                                        :paginationPageSize="paginationPageSize"
                                        :paginationPageSizeSelector="
                                            paginationPageSizeSelector
                                        "
                                        :animateRows="true"
                                        :suppressPaginationPanel="true"
                                        :gridOptions="gridOptions"
                                        :rowClassRules="rowClassRules"
                                        @rowSelected="
                                            (event) =>
                                                onRowSelected(
                                                    event,
                                                    greenhouse.id
                                                )
                                        "
                                        @pagination-changed="
                                            () =>
                                                onPaginationChanged(
                                                    greenhouse.id
                                                )
                                        "
                                        @grid-ready="
                                            (params) =>
                                                onGridReady(
                                                    params,
                                                    greenhouse.id
                                                )
                                        "
                                        class="ag-theme-alpine"
                                    >
                                    </ag-grid-vue>
                                </div>
                                <div class="flex justify-between">
                                    <div class="flex gap-2">
                                        <Button
                                            @click="onBtFirst(greenhouse.id)"
                                        >
                                            <i
                                                class="fas fa-angle-double-left"
                                            ></i>
                                        </Button>
                                        <Button
                                            @click="onBtPrevious(greenhouse.id)"
                                        >
                                            <i class="fas fa-angle-left"></i>
                                        </Button>
                                    </div>
                                    <div>
                                        <span :id="'lbPages' + greenhouse.id"
                                            >- of -</span
                                        >
                                    </div>
                                    <div class="flex gap-2">
                                        <Button
                                            @click="onBtNext(greenhouse.id)"
                                        >
                                            <i class="fas fa-angle-right"></i>
                                        </Button>
                                        <Button
                                            @click="onBtLast(greenhouse.id)"
                                            id="btLast"
                                        >
                                            <i
                                                class="fas fa-angle-double-right"
                                            ></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>