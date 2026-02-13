<script setup>
import { ref, computed, watch } from "vue";
import { Head, usePage } from "@inertiajs/vue3";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import Tabs from "@/Components/Tabs.vue";
import Dropdown from "@/Components/Dropdown.vue";
import Gauge from "@/Components/Gauge.vue";
import Chart from "@/Components/Chart.vue";
import DigitalClock from "@/Components/DigitalClock.vue";
import Button from "@/Components/Button.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";

const toast = useToast();

const page = usePage();
const greenhouses = computed(() => page.props.greenhouses || []);
const gaugeData = computed(() => page.props.gaugeData || []);
const latestData = computed(() => page.props.latestData || []);

const activeTab = ref(greenhouses.value[0]?.id);
const data = ref({});
const datetime = ref({});
const isFetching = ref({});

const getDateTime = (sensor_id) =>
    datetime.value[sensor_id] ??
    (datetime.value[sensor_id] = {
        date: "",
        time: "",
    });

const clearTime = (sensorId) => {
    if (datetime.value[sensorId]) {
        datetime.value[sensorId].time = "";
    }
};

const formatHour = (hour) => {
    return `${hour.toString().padStart(2, "0")}:00`;
};

const isRangeSelected = (sensorId) => {
    const datetime = getDateTime(sensorId);
    if (datetime.date && datetime.date[1] !== null) {
        clearTime(sensorId);
        return true;
    }
};

const getChartColor = (sensorName) => {
    const colors = {
        Temperature: {
            background: "rgba(255, 99, 132, 0.2)",
            border: "rgba(255, 99, 132, 1)",
        },
        Humidity: {
            background: "rgba(54, 162, 235, 0.2)",
            border: "rgba(54, 162, 235, 1)",
        },
        "Light Intensity": {
            background: "rgba(255, 159, 64, 0.2)",
            border: "rgba(255, 159, 64, 1)",
        },
    };
    return (
        colors[sensorName] || {
            background: "rgba(201, 203, 207, 0.2)",
            border: "rgba(201, 203, 207, 1)",
        }
    );
};

// Static gauge scale based on sensor type
const getGaugeScale = (sensorName) => {
    const scales = {
        Temperature: { min: 0, max: 40 },
        Humidity: { min: 0, max: 100 },
        "Light Intensity": { min: 0, max: 65535 },
    };
    return scales[sensorName] || { min: 0, max: 100 };
};

const populateData = () => {
    gaugeData.value.forEach((gauge) => {
        if (!data.value[gauge.gh_id]) {
            data.value[gauge.gh_id] = { gauge: {}, chart: {} };
        }
        if (!data.value[gauge.gh_id].chart[gauge.sensor_id]) {
            data.value[gauge.gh_id].chart[gauge.sensor_id] = {};
        }

        // Inisialisasi filter date jika belum ada
        getDateTime(gauge.sensor_id);

        // Data gauge
        data.value[gauge.gh_id].gauge[gauge.sensor_id] = gauge.avg_value || 0;
    });
};

const formatDate = (date) => {
    return date ? date.toISOString().split("T")[0] : "";
};

const fetchData = async (sensor_id) => {
    try {
        isFetching.value[sensor_id] = true;

        const queryData = {
            sensor_id: sensor_id,
            date_start: formatDate(getDateTime(sensor_id).date?.[0]),
            date_end: formatDate(getDateTime(sensor_id).date?.[1]),
            time: getDateTime(sensor_id).time,
        };

        const url =
            `/api/chart-data?dict=` +
            encodeURIComponent(JSON.stringify(queryData));

        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const jsonData = await response.json();

        if (jsonData.data && jsonData.label) {
            if (!data.value[activeTab.value]) {
                data.value[activeTab.value] = { gauge: {}, chart: {} };
            }

            if (!data.value[activeTab.value].chart[sensor_id]) {
                data.value[activeTab.value].chart[sensor_id] = {};
            }

            if (jsonData.data && jsonData.label) {
                data.value[activeTab.value].chart[sensor_id] = {
                    chartData: jsonData.data.length ? jsonData.data : [],
                    chartLabel: jsonData.label.length ? jsonData.label : [],
                    chartColor: getChartColor(
                        gaugeData.value.find((s) => s.sensor_id == sensor_id)
                            ?.name
                    ),
                };
            } else {
                data.value[activeTab.value].chart[sensor_id] = {
                    chartData: [],
                    chartLabel: [],
                    chartColor: getChartColor(
                        gaugeData.value.find((s) => s.sensor_id == sensor_id)
                            ?.name
                    ),
                };
            }
        } else {
            toast.error("Gagal memuat data! Format tidak sesuai.");
            console.error("Data format error:", jsonData);
        }
    } catch (error) {
        toast.error("Gagal memuat data!");
        console.error("Fetch error:", error);
    } finally {
        isFetching.value[sensor_id] = false;
    }
};

const loadChartsForTab = async (ghId) => {
    if (!ghId) {
        return;
    }

    const sensors = gaugeData.value.filter((sensor) => sensor.gh_id == ghId);
    await Promise.all(sensors.map((sensor) => fetchData(sensor.sensor_id)));
};

const selectedGHSensor = computed(() => {
    const sensors = gaugeData.value.filter(
        (sensor) => sensor.gh_id == activeTab.value
    );
    return sensors;
});

const filterChart = (sensor_id) => {
    fetchData(sensor_id);
};

watch(greenhouses, (value) => {
    if (!activeTab.value && value.length) {
        activeTab.value = value[0].id;
    }
});

watch(
    gaugeData,
    async (value) => {
        if (!value.length || !activeTab.value) {
            return;
        }

        populateData();
        await loadChartsForTab(activeTab.value);
    },
    { immediate: true }
);

watch(activeTab, async (newTab) => {
    if (!newTab || !gaugeData.value.length) {
        return;
    }

    if (!data.value[newTab]) {
        data.value[newTab] = { gauge: {}, chart: {} };
    }

    await loadChartsForTab(newTab);
});
</script>

<template>
    <Head title="Monitoring" />

    <BreezeAuthenticatedLayout :titlePage="'Monitoring'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Monitoring
            </h2>
        </template>

        <div class="py-2">
            <div class="max-w-7xl mx-auto sm:px-2 lg:px-2">
                <!-- Tabs -->
                <Tabs
                    :greenhouses="greenhouses"
                    v-model="activeTab"
                    class="mb-4"
                />

                <!-- Tab content -->
                <div class="flex flex-col gap-2">
                    <div
                        class="bg-white overflow-hidden shadow-sm rounded-lg p-4"
                    >
                        <div class="flex flex-col w-full">
                            <div class="flex justify-between">
                                <p>Time</p>
                                <DigitalClock />
                            </div>
                            <div class="flex justify-between">
                                <p>Latest Data</p>
                                <p>
                                    {{
                                        latestData.find(
                                            (item) => item.gh_id == activeTab
                                        )?.latest_time || "-"
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        v-for="sensor in selectedGHSensor"
                        :key="sensor.sensor_id"
                        class="flex flex-col lg:flex-row gap-2"
                    >
                        <div
                            class="bg-white shadow-sm rounded-lg w-full lg:w-3/4 p-4"
                        >
                            <div class="flex justify-between mb-2">
                                <h3 class="text-xl w-full lg:w-1/2">
                                    {{ sensor.name }}
                                </h3>

                                <div>
                                    <!-- Desktop View -->
                                    <div
                                        class="hidden sm:flex flex-col sm:flex-row w-full gap-2"
                                    >
                                        <VueDatePicker
                                            class="w-full"
                                            v-model="
                                                getDateTime(sensor.sensor_id)
                                                    .date
                                            "
                                            range
                                            position:right
                                            placeholder="Pick a Date Range"
                                            :enable-time-picker="false"
                                        />
                                        <div
                                            class="relative w-full flex items-center"
                                        >
                                            <select
                                                class="w-full px-3 py-1.5 border rounded-md"
                                                v-model="
                                                    getDateTime(
                                                        sensor.sensor_id
                                                    ).time
                                                "
                                                :disabled="
                                                    isRangeSelected(
                                                        sensor.sensor_id
                                                    )
                                                "
                                                :class="{
                                                    'cursor-not-allowed bg-gray-200 text-gray-500':
                                                        isRangeSelected(
                                                            sensor.sensor_id
                                                        ),
                                                }"
                                            >
                                                <option value="">
                                                    Pilih Jam
                                                </option>
                                                <option
                                                    v-for="hour in 23"
                                                    :key="hour"
                                                    :value="
                                                        formatHour(hour - 1)
                                                    "
                                                >
                                                    {{ formatHour(hour - 1) }}
                                                </option>
                                            </select>
                                            <button
                                                v-if="
                                                    getDateTime(
                                                        sensor.sensor_id
                                                    ).time
                                                "
                                                @click="
                                                    clearTime(sensor.sensor_id)
                                                "
                                                class="absolute right-3 text-gray-500 hover:text-gray-700"
                                            >
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                        <Button
                                            :disabled="
                                                isFetching[sensor.sensor_id]
                                            "
                                            @click="
                                                filterChart(sensor.sensor_id)
                                            "
                                            class="flex justify-between"
                                        >
                                            <i
                                                :class="[
                                                    isFetching[sensor.sensor_id]
                                                        ? 'fas fa-spinner fa-spin'
                                                        : 'fas fa-search fa-lg',
                                                ]"
                                            ></i>
                                        </Button>
                                    </div>

                                    <!-- Mobile View with Dropdown -->
                                    <div class="sm:hidden">
                                        <Dropdown>
                                            <template #trigger>
                                                <Button>
                                                    <i
                                                        class="fas fa-filter"
                                                    ></i>
                                                    <span class="ml-2"
                                                        >Filter</span
                                                    >
                                                </Button>
                                            </template>
                                            <template #content>
                                                <div
                                                    class="p-4 w-full"
                                                    @click.stop
                                                >
                                                    <VueDatePicker
                                                        class="w-full"
                                                        v-model="
                                                            getDateTime(
                                                                sensor.sensor_id
                                                            ).date
                                                        "
                                                        range
                                                        position:right
                                                        placeholder="Pick a Date Range"
                                                        :enable-time-picker="
                                                            false
                                                        "
                                                    />
                                                    <div
                                                        class="relative w-full flex items-center mt-2"
                                                    >
                                                        <select
                                                            class="w-full px-3 py-2 border rounded-md"
                                                            v-model="
                                                                getDateTime(
                                                                    sensor.sensor_id
                                                                ).time
                                                            "
                                                            :disabled="
                                                                isRangeSelected(
                                                                    sensor.sensor_id
                                                                )
                                                            "
                                                            :class="{
                                                                'cursor-not-allowed bg-gray-200 text-gray-500':
                                                                    isRangeSelected(
                                                                        sensor.sensor_id
                                                                    ),
                                                            }"
                                                        >
                                                            <option value="">
                                                                Pilih Jam
                                                            </option>
                                                            <option
                                                                v-for="hour in 23"
                                                                :key="hour"
                                                                :value="
                                                                    formatHour(
                                                                        hour - 1
                                                                    )
                                                                "
                                                            >
                                                                {{
                                                                    formatHour(
                                                                        hour - 1
                                                                    )
                                                                }}
                                                            </option>
                                                        </select>
                                                        <button
                                                            v-if="
                                                                getDateTime(
                                                                    sensor.sensor_id
                                                                ).time
                                                            "
                                                            @click="
                                                                clearTime(
                                                                    sensor.sensor_id
                                                                )
                                                            "
                                                            class="absolute right-3 text-gray-500 hover:text-gray-700"
                                                        >
                                                            <i
                                                                class="fas fa-times"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <Button
                                                        :disabled="
                                                            isFetching[
                                                                sensor.sensor_id
                                                            ]
                                                        "
                                                        @click="
                                                            filterChart(
                                                                sensor.sensor_id
                                                            )
                                                        "
                                                        class="mt-3 w-full flex justify-center"
                                                    >
                                                        <i
                                                            :class="[
                                                                isFetching[
                                                                    sensor
                                                                        .sensor_id
                                                                ]
                                                                    ? 'fas fa-spinner fa-spin'
                                                                    : 'fas fa-search fa-lg',
                                                            ]"
                                                        ></i>
                                                        <span class="ml-2"
                                                            >Search</span
                                                        >
                                                    </Button>
                                                </div>
                                            </template>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>

                            <!-- Chart Component -->
                            <Chart
                                v-if="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        ?.chartData &&
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        ?.chartData.length > 0
                                "
                                :data="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        .chartData
                                "
                                :label="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        .chartLabel
                                "
                                :id="sensor.sensor_id"
                                :sensor_name="sensor.name"
                                :chartColor="
                                    data[activeTab]?.chart?.[sensor.sensor_id]
                                        .chartColor
                                "
                            />
                            <p
                                v-else-if="isFetching[sensor.sensor_id]"
                                class="text-center text-gray-500"
                            >
                                Loading chart...
                            </p>
                            <p v-else class="text-center text-gray-500">
                                No data available.
                            </p>
                        </div>

                        <div
                            class="bg-white overflow-hidden shadow-sm rounded-lg w-full lg:w-1/4 p-4"
                        >
                            <div class="flex mb-4">
                                <h3 class="text-xl">{{ sensor.name }}</h3>
                            </div>
                            <!-- Gauge Component -->
                            <Gauge
                                v-if="
                                    data[activeTab]?.gauge?.[
                                        sensor.sensor_id
                                    ] !== undefined
                                "
                                :title="sensor.name"
                                :symbol="sensor.unit"
                                :value="
                                    data[activeTab]?.gauge?.[sensor.sensor_id]
                                "
                                :thd_min="getGaugeScale(sensor.name).min"
                                :thd_max="getGaugeScale(sensor.name).max"
                                :id="sensor.sensor_id"
                            />
                            <p v-else class="text-center text-gray-500">
                                Loading gauge...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>
