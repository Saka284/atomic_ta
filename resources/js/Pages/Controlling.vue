<script setup>
import { ref, watch, computed } from "vue";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import { Head, usePage } from "@inertiajs/vue3";
import Tabs from "@/Components/Tabs.vue";
import ScheduleCard from "@/Components/ScheduleCard.vue";
import Slider from "@vueform/slider";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const page = usePage();
const greenhouses = page.props.greenhouses || [];
const initialData = computed(() => page.props.initialData || []);
const initialSchedules = computed(() => page.props.initialSchedules || {});

const activeTab = ref(greenhouses[0]?.id);
const activeSubTab = ref("threshold");
const isSaving = ref(false);
const isSavingSchedules = ref(false);

const data = ref([]);
const threshold = ref({});
const editedThresholds = ref({});

const schedules = ref({});
const originalSchedules = ref({});
let scheduleIdCounter = 1;

const hydrateFromProps = () => {
    data.value = Array.isArray(initialData.value) ? initialData.value : [];
    threshold.value = {};
    editedThresholds.value = {};

    if (Array.isArray(data.value)) {
        data.value.forEach((greenhouse) => {
            greenhouse.sensor.forEach((sensor) => {
                threshold.value[sensor.id] = [
                    sensor.threshold_min ?? 0,
                    sensor.threshold_max ?? 100,
                ];
            });
        });
    }

    scheduleIdCounter = 1;
    const nextSchedules = {};
    const nextOriginal = {};
    greenhouses.forEach((gh) => {
        const ghSchedules = initialSchedules.value?.[gh.id] || [];
        nextSchedules[gh.id] = ghSchedules.map((s) => ({
            ...s,
            id: s.id || scheduleIdCounter++,
        }));
        nextOriginal[gh.id] = JSON.parse(
            JSON.stringify(nextSchedules[gh.id]),
        );
    });

    schedules.value = nextSchedules;
    originalSchedules.value = nextOriginal;
};

const getMaxValue = (unit) => {
    if (unit.toLowerCase().includes("lux")) {
        return 60000;
    } else {
        return 100;
    }
};

watch(
    [initialData, initialSchedules],
    (values) => {
        const [dataValue, scheduleValue] = values;
        if (!(dataValue.length || Object.keys(scheduleValue).length)) {
            return;
        }

        hydrateFromProps();
    },
    { immediate: true },
);

watch(
    activeTab,
    (ghId) => {
        if (ghId && !schedules.value[ghId]) {
            schedules.value[ghId] = [];
            originalSchedules.value[ghId] = [];
        }
    },
    { immediate: true }
);

const loadSchedules = async (ghId) => {
    try {
        const response = await axios.get(`/api/schedules?gh_id=${ghId}`);
        if (response.data?.success && response.data?.schedules) {
            const loadedSchedules = response.data.schedules.map((s) => ({
                ...s,
                id: s.id || scheduleIdCounter++,
            }));
            schedules.value[ghId] = loadedSchedules;
            originalSchedules.value[ghId] = JSON.parse(
                JSON.stringify(loadedSchedules),
            );
        }
    } catch (error) {
        console.error(`Error loading schedules for GH ${ghId}:`, error);
    }
};

const confirmTabChange = (newTab) => {
    if (isThresholdChanged.value && newTab != activeTab.value) {
        toast.warning("Ada perubahan threshold yang belum disimpan!");
        return false;
    }
    if (isScheduleChanged.value && newTab != activeTab.value) {
        toast.warning("Ada perubahan jadwal yang belum disimpan!");
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

// Scheduling computed properties
const activeSchedules = computed(() => {
    return schedules.value[activeTab.value] || [];
});

const canAddSchedule = computed(() => {
    return activeSchedules.value.length < 4;
});

const isScheduleChanged = computed(() => {
    const current = JSON.stringify(schedules.value[activeTab.value] || []);
    const original = JSON.stringify(
        originalSchedules.value[activeTab.value] || [],
    );
    return current !== original;
});

// Allow overlapping schedules - no validation needed
const hasOverlappingSchedules = computed(() => false);

const hasInvalidTimes = computed(() => {
    return activeSchedules.value.some((s) => {
        if (!s.start_time || !s.end_time) return true;
        return s.start_time >= s.end_time;
    });
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
        }),
    );
    axios
        .post(
            "/api/update-thresholds",
            { thresholds: payload },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
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

// Schedule functions
const createDefaultSchedule = () => ({
    id: scheduleIdCounter++,
    greenhouse_id: activeTab.value,
    enabled: true,
    start_time: "08:00",
    end_time: "12:00",
    actuators: {
        blower: "threshold",
        exhaust: "threshold",
        dehumidifier: "threshold",
    },
});

const addSchedule = () => {
    if (!canAddSchedule.value) {
        toast.warning("Maksimal 4 jadwal per greenhouse!");
        return;
    }
    schedules.value[activeTab.value].push(createDefaultSchedule());
};

const updateSchedule = (updatedSchedule) => {
    const index = schedules.value[activeTab.value].findIndex(
        (s) => s.id === updatedSchedule.id,
    );
    if (index !== -1) {
        schedules.value[activeTab.value][index] = updatedSchedule;
    }
};

const toggleSchedule = (scheduleId) => {
    const schedule = schedules.value[activeTab.value].find(
        (s) => s.id === scheduleId,
    );
    if (schedule) {
        schedule.enabled = !schedule.enabled;
    }
};

const deleteSchedule = async (scheduleId) => {
    // Remove from local state first
    schedules.value[activeTab.value] = schedules.value[activeTab.value].filter(
        (s) => s.id !== scheduleId,
    );

    // Save to database immediately
    try {
        const payload = {
            gh_id: activeTab.value,
            schedules: schedules.value[activeTab.value],
        };

        const response = await axios.post("/api/schedules", payload);

        if (response.data?.success) {
            // Update originalSchedules after successful save
            originalSchedules.value[activeTab.value] = JSON.parse(
                JSON.stringify(schedules.value[activeTab.value]),
            );
            toast.success("Jadwal berhasil dihapus!");
        } else {
            toast.error("Gagal menghapus jadwal");
            // Reload to restore original state
            await loadSchedules(activeTab.value);
        }
    } catch (error) {
        console.error("Error deleting schedule:", error);
        toast.error("Gagal menghapus jadwal");
        // Reload to restore original state
        await loadSchedules(activeTab.value);
    }
};

const saveSchedules = async () => {
    if (hasInvalidTimes.value) {
        toast.error("Periksa waktu jadwal! Start time harus sebelum end time.");
        return;
    }

    isSavingSchedules.value = true;

    try {
        const payload = {
            gh_id: activeTab.value,
            schedules: schedules.value[activeTab.value],
        };

        const response = await axios.post("/api/schedules", payload);

        if (response.data?.success) {
            await loadSchedules(activeTab.value);
            toast.success("Jadwal berhasil disimpan!");
        } else {
            toast.error(response.data?.message || "Gagal menyimpan jadwal");
        }
    } catch (error) {
        console.error("Error saving schedules:", error);
        if (error.response?.data?.errors) {
            toast.error(
                "Validasi gagal: " +
                    Object.values(error.response.data.errors).flat().join(", "),
            );
        } else {
            toast.error("Gagal menyimpan jadwal");
        }
    } finally {
        isSavingSchedules.value = false;
    }
};

watch(
    threshold,
    (newValues) => {
        const activeGreenhouse = data.value.find(
            (gh) => gh.id == activeTab.value,
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
    { deep: true },
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
                <!-- Greenhouse Tabs -->
                <Tabs
                    :greenhouses="greenhouses"
                    :modelValue="activeTab"
                    @update:modelValue="confirmTabChange"
                    class="mb-4"
                />

                <!-- Sub-tabs: Threshold | Scheduling -->
                <div class="flex justify-center mb-4">
                    <div class="bg-gray-100 p-1 rounded-lg inline-flex">
                        <button
                            @click="activeSubTab = 'threshold'"
                            class="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                            :class="[
                                activeSubTab === 'threshold'
                                    ? 'bg-white text-green-600 shadow-sm'
                                    : 'text-gray-600 hover:text-green-500',
                            ]"
                        >
                            <i class="fas fa-sliders-h mr-2"></i>
                            Threshold
                        </button>
                        <button
                            @click="activeSubTab = 'scheduling'"
                            class="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                            :class="[
                                activeSubTab === 'scheduling'
                                    ? 'bg-white text-green-600 shadow-sm'
                                    : 'text-gray-600 hover:text-green-500',
                            ]"
                        >
                            <i class="fas fa-clock mr-2"></i>
                            Scheduling
                        </button>
                    </div>
                </div>

                <!-- Threshold Section -->
                <div v-if="activeSubTab === 'threshold'">
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
                        <div
                            class="flex flex-col items-center w-full gap-6 pt-4"
                        >
                            <!-- Slider -->
                            <div class="w-full 3xl:w-full max-w-4xl">
                                <Slider
                                    v-if="threshold[sensor.id]"
                                    v-model="threshold[sensor.id]"
                                    :min="0"
                                    :max="getMaxValue(sensor.unit)"
                                    :step="0.01"
                                    :format="{
                                        decimals: 2,
                                        suffix: sensor.unit,
                                    }"
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
                                            v-model.number="
                                                threshold[sensor.id][0]
                                            "
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
                                            v-model.number="
                                                threshold[sensor.id][1]
                                            "
                                            step="0.01"
                                            class="w-full pl-10 pr-3 py-2 border rounded-lg text-center text-xs sm:text-sm focus:ring focus:ring-blue-300 hover:border-blue-400 transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Save Threshold Button -->
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

                <!-- Scheduling Section -->
                <div v-if="activeSubTab === 'scheduling'">
                    <!-- Info Banner -->
                    <div
                        class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"
                    >
                        <div class="flex items-start gap-3">
                            <i
                                class="fas fa-info-circle text-blue-500 mt-0.5"
                            ></i>
                            <div class="text-sm text-blue-700">
                                <p class="font-medium mb-1">Scheduling Mode</p>
                                <ul
                                    class="list-disc list-inside space-y-1 text-blue-600"
                                >
                                    <li>
                                        <strong>Threshold</strong>: Actuator
                                        follows sensor threshold (automatic)
                                    </li>
                                    <li>
                                        <strong>Force ON</strong>: Actuator
                                        stays ON during scheduled time
                                    </li>
                                    <li>
                                        <strong>Force OFF</strong>: Actuator
                                        stays OFF during scheduled time
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Schedule Cards -->
                    <div class="space-y-4">
                        <TransitionGroup
                            enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 -translate-y-4"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 -translate-y-4"
                        >
                            <ScheduleCard
                                v-for="(schedule, index) in activeSchedules"
                                :key="schedule.id"
                                :schedule="schedule"
                                :index="index"
                                @update="updateSchedule"
                                @delete="deleteSchedule"
                                @toggle="toggleSchedule"
                            />
                        </TransitionGroup>
                    </div>

                    <!-- Empty State -->
                    <div
                        v-if="activeSchedules.length === 0"
                        class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                    >
                        <i
                            class="fas fa-calendar-plus text-4xl text-gray-400 mb-3"
                        ></i>
                        <p class="text-gray-500 mb-4">
                            No schedules created yet
                        </p>
                        <button
                            @click="addSchedule"
                            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            <i class="fas fa-plus mr-2"></i>
                            Add First Schedule
                        </button>
                    </div>

                    <!-- Add Schedule & Save Buttons -->
                    <div
                        v-if="activeSchedules.length > 0"
                        class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6"
                    >
                        <!-- Add Button -->
                        <button
                            v-if="canAddSchedule"
                            @click="addSchedule"
                            class="w-full sm:w-auto px-6 py-3 border-2 border-dashed border-green-400 text-green-600 rounded-lg hover:bg-green-50 hover:border-green-500 transition flex items-center justify-center gap-2"
                        >
                            <i class="fas fa-plus"></i>
                            <span
                                >Add Schedule ({{
                                    activeSchedules.length
                                }}/4)</span
                            >
                        </button>
                        <div
                            v-else
                            class="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-500 rounded-lg text-center"
                        >
                            <i class="fas fa-ban mr-2"></i>
                            Maximum schedules reached (4/4)
                        </div>

                        <!-- Save Button -->
                        <Transition
                            enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 translate-y-3"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-300 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-3"
                        >
                            <button
                                v-if="isScheduleChanged"
                                :disabled="
                                    isSavingSchedules ||
                                    hasOverlappingSchedules ||
                                    hasInvalidTimes
                                "
                                @click="saveSchedules"
                                class="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center min-w-[180px] disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <span
                                    v-if="!isSavingSchedules"
                                    class="transition-opacity duration-300 ease-in-out"
                                >
                                    <i class="fas fa-save mr-2"></i>
                                    Save All Schedules
                                </span>
                                <i
                                    v-else
                                    class="fas fa-spinner fa-spin text-lg transition-opacity duration-300 ease-in-out"
                                ></i>
                            </button>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>
