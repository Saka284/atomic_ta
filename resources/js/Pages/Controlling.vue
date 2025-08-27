<script setup>
import { ref, onMounted, watch, computed } from "vue";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Tabs from "@/Components/Tabs.vue";
import Slider from "@vueform/slider";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const { greenhouses } = usePage().props.value;
const activeTab = ref(greenhouses[0]?.id);
const isSaving = ref(false);

const data = ref([]);
const threshold = ref({});
const editedThresholds = ref({});

const getMaxValue = (unit) => {
    if (unit.toLowerCase().includes("lux")) {
        return 60000;
    } else {
        return 100;
    }
};

onMounted(() => {
    getControlling();
});

const getControlling = async () => {
    try {
        const response = await axios.get("/api/get-controlling");
        data.value = response.data?.data || [];

        if (!Array.isArray(data.value)) {
            data.value = [];
        }

        data.value.forEach((greenhouse) => {
            greenhouse.sensor.forEach((sensor) => {
                threshold.value[sensor.id] = [
                    sensor.threshold_min ?? 0,
                    sensor.threshold_max ?? 100,
                ];
            });
        });

        if (response.data.length > 0) {
            activeTab.value = response.data[0].id;
        }
    } catch (error) {
        toast.error("Gagal memuat data controlling!");
        console.error("Error:", error);
    }
};

const confirmTabChange = (newTab) => {
    if (isThresholdChanged.value && newTab != activeTab.value) {
        toast.warning("Ada perubahan yang belum disimpan!");
        return false;
    }
    activeTab.value = newTab;
};

const activeSensors = computed(() => {
    const activeGreenhouse = Array.isArray(data.value)
        ? data.value.find((gh) => gh.id == activeTab.value)
        : null;
    return activeGreenhouse ? activeGreenhouse?.sensor : [];
});

const isThresholdChanged = computed(() => {
    return Object.keys(editedThresholds.value).length > 0;
});

const updateThreshold = (sensor_id, value) => {
    editedThresholds.value[sensor_id] = value;
};

const saveThresholds = () => {
    isSaving.value = true;
    if (Object.keys(editedThresholds.value).length == 0) {
        toast.info("Tidak ada perubahan untuk disimpan");
        isSaving.value = false;
        return;
    }

    const payload = Object.entries(editedThresholds.value).map(
        ([sensor_id, [threshold_min, threshold_max]]) => ({
            sensor_id: Number(sensor_id),
            threshold_min,
            threshold_max,
        })
    );
    axios
        .post(
            "/api/update-thresholds",
            { thresholds: payload },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(() => {
            data.value.forEach((greenhouse) => {
                greenhouse.sensor.forEach((sensor) => {
                    if (editedThresholds.value[sensor.id]) {
                        const [newMin, newMax] =
                            editedThresholds.value[sensor.id];
                        sensor.threshold_min = newMin;
                        sensor.threshold_max = newMax;
                        threshold.value[sensor.id] = [newMin, newMax];
                    }
                });
            });

            toast.success("Threshold berhasil diperbarui!");
            editedThresholds.value = {};
            isSaving.value = false;
        })
        .catch(() => {
            toast.error("Gagal memperbarui threshold");
            isSaving.value = false;
        });
};

watch(
    threshold,
    (newValues) => {
        const activeGreenhouse = data.value.find(
            (gh) => gh.id == activeTab.value
        );
        if (!activeGreenhouse) return;

        activeGreenhouse.sensor.forEach((sensor) => {
            const original = [
                sensor.threshold_min ?? 0,
                sensor.threshold_max ?? 100,
            ];
            const newValue = newValues[sensor.id];

            if (JSON.stringify(newValue) !== JSON.stringify(original)) {
                editedThresholds.value[sensor.id] = [...newValue];
            } else {
                delete editedThresholds.value[sensor.id];
            }
        });
    },
    { deep: true }
);
</script>

<template>
    <Head title="Controlling" />

    <BreezeAuthenticatedLayout :titlePage="'Controlling'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Controlling
            </h2>
        </template>

        <div class="py-2">
            <div class="max-w-7xl mx-auto sm:px-2 lg:px-2">
                <Tabs
                    :greenhouses="greenhouses"
                    :modelValue="activeTab"
                    @update:modelValue="confirmTabChange"
                    class="mb-4"
                />

                <div
                    v-for="sensor in activeSensors"
                    :key="sensor.id"
                    class="bg-white overflow-hidden shadow-sm rounded-lg p-4 mb-2"
                >
                    <h3
                        class="text-2xl font-semibold text-gray-800 text-center md:text-left mb-10 border-b pb-2"
                    >
                        {{ sensor.name }}
                    </h3>
                    <div class="flex flex-col items-center w-full gap-6 pt-4">
                        <!-- Slider -->
                        <div class="w-full 3xl:w-full max-w-4xl">
                            <Slider
                                v-if="threshold[sensor.id]"
                                v-model="threshold[sensor.id]"
                                :min="0"
                                :max="getMaxValue(sensor.unit)"
                                :step="0.01"
                                :format="{ decimals: 2, suffix: sensor.unit }"
                                @change="updateThreshold(sensor.id, $event)"
                                class="w-full"
                            />
                        </div>

                        <!-- Input Min & Max -->
                        <div
                            v-if="threshold[sensor.id]"
                            class="flex items-center justify-between gap-6 w-full 3xl:w-full max-w-4xl"
                        >
                            <!-- Input Min -->
                            <div class="flex flex-col items-center">
                                <div class="relative flex-1">
                                    <span
                                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm"
                                    >
                                        Min
                                    </span>
                                    <input
                                        type="number"
                                        v-model.number="threshold[sensor.id][0]"
                                        step="0.01"
                                        class="w-full pl-10 pr-3 py-2 border rounded-lg text-center text-xs sm:text-sm focus:ring focus:ring-blue-300 hover:border-blue-400 transition"
                                    />
                                </div>
                            </div>

                            <i class="fas fa-long-arrow-alt-right"></i>

                            <!-- Input Max -->
                            <div class="flex flex-col items-center">
                                <div class="relative">
                                    <span
                                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm"
                                    >
                                        Max
                                    </span>
                                    <input
                                        type="number"
                                        v-model.number="threshold[sensor.id][1]"
                                        step="0.01"
                                        class="w-full pl-10 pr-3 py-2 border rounded-lg text-center text-xs sm:text-sm focus:ring focus:ring-blue-300 hover:border-blue-400 transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full flex justify-end mb-3">
                    <Transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 translate-y-3"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition duration-300 ease-in"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 translate-y-3"
                    >
                        <button
                            :disabled="isSaving"
                            v-if="isThresholdChanged"
                            @click="saveThresholds"
                            class="w-full sm:w-auto mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center min-w-[150px]"
                        >
                            <span
                                v-if="!isSaving"
                                class="transition-opacity duration-300 ease-in-out"
                                >Save Thresholds</span
                            >
                            <i
                                v-else
                                class="fas fa-spinner fa-spin text-lg transition-opacity duration-300 ease-in-out"
                            ></i>
                        </button>
                    </Transition>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>
