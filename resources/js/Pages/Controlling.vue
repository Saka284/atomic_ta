<script setup>
import { ref, watch, computed } from "vue";
import BreezeAuthenticatedLayout from "@/Layouts/Authenticated.vue";
import { Head, usePage } from "@inertiajs/vue3";
import Tabs from "@/Components/Tabs.vue";
import ScheduleCard from "@/Components/ScheduleCard.vue";
import Slider from "@vueform/slider";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useLocale } from "@/composables/useLocale";

const toast = useToast();
const { t } = useLocale();

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
const initialThreshold = ref({});
const editedThresholds = ref({});

const schedules = ref({});
const originalSchedules = ref({});
let scheduleIdCounter = 1;

const normalizeSchedule = (schedule = {}, fallbackGhId = null) => {
    const fallbackActuators = {
        blower: schedule?.relay_blower ?? "threshold",
        exhaust: schedule?.relay_exhaust ?? "threshold",
        dehumidifier: schedule?.relay_dehumidifier ?? "threshold",
    };

    const actuators = schedule?.actuators
        ? {
              blower: schedule.actuators.blower ?? fallbackActuators.blower,
              exhaust: schedule.actuators.exhaust ?? fallbackActuators.exhaust,
              dehumidifier:
                  schedule.actuators.dehumidifier ??
                  fallbackActuators.dehumidifier,
          }
        : fallbackActuators;

    return {
        ...schedule,
        id: schedule.id || scheduleIdCounter++,
        greenhouse_id:
            schedule.greenhouse_id ?? schedule.gh_id ?? fallbackGhId ?? activeTab.value,
        enabled: schedule.enabled ?? true,
        start_time: String(schedule.start_time ?? "08:00").slice(0, 5),
        end_time: String(schedule.end_time ?? "12:00").slice(0, 5),
        actuators,
    };
};

const hydrateFromProps = () => {
    data.value = Array.isArray(initialData.value) ? initialData.value : [];
    threshold.value = {};
    initialThreshold.value = {};
    editedThresholds.value = {};

    if (Array.isArray(data.value)) {
        data.value.forEach((greenhouse) => {
            greenhouse.sensor.forEach((sensor) => {
                const sensorThreshold = [
                    Number(sensor.threshold_min ?? 0),
                    Number(sensor.threshold_max ?? 100),
                ];
                threshold.value[sensor.id] = [...sensorThreshold];
                initialThreshold.value[sensor.id] = [...sensorThreshold];
            });
        });
    }

    scheduleIdCounter = 1;
    const nextSchedules = {};
    const nextOriginal = {};
    greenhouses.forEach((gh) => {
        const ghSchedules = initialSchedules.value?.[gh.id] || [];
        nextSchedules[gh.id] = ghSchedules.map((s) => normalizeSchedule(s, gh.id));
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
            const loadedSchedules = response.data.schedules.map((s) =>
                normalizeSchedule(s, ghId),
            );
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
        toast.warning(t("controlling.unsaved_threshold_changes"));
        return false;
    }
    if (isScheduleChanged.value && newTab != activeTab.value) {
        toast.warning(t("controlling.unsaved_schedule_changes"));
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
    const nextValue = Array.isArray(value)
        ? [Number(value[0]), Number(value[1])]
        : [
              Number(threshold.value[sensor_id]?.[0] ?? 0),
              Number(threshold.value[sensor_id]?.[1] ?? 0),
          ];

    threshold.value[sensor_id] = [...nextValue];

    const originalValue = initialThreshold.value[sensor_id] ?? [0, 100];
    if (
        nextValue[0] !== Number(originalValue[0]) ||
        nextValue[1] !== Number(originalValue[1])
    ) {
        editedThresholds.value[sensor_id] = [...nextValue];
    } else {
        delete editedThresholds.value[sensor_id];
    }
};

const saveThresholds = () => {
    isSaving.value = true;
    if (Object.keys(editedThresholds.value).length == 0) {
        toast.info(t("controlling.no_threshold_changes"));
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
                        initialThreshold.value[sensor.id] = [newMin, newMax];
                        threshold.value[sensor.id] = [newMin, newMax];
                    }
                });
            });

            toast.success(t("controlling.threshold_updated"));
            editedThresholds.value = {};
            isSaving.value = false;
        })
        .catch(() => {
            toast.error(t("controlling.failed_update_threshold"));
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
        toast.warning(t("controlling.max_schedule"));
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
            toast.success(t("controlling.schedule_deleted"));
        } else {
            toast.error(t("controlling.failed_delete_schedule"));
            // Reload to restore original state
            await loadSchedules(activeTab.value);
        }
    } catch (error) {
        console.error("Error deleting schedule:", error);
        toast.error(t("controlling.failed_delete_schedule"));
        // Reload to restore original state
        await loadSchedules(activeTab.value);
    }
};

const saveSchedules = async () => {
    if (hasInvalidTimes.value) {
        toast.error(t("controlling.invalid_schedule_time"));
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
            toast.success(t("controlling.schedule_saved"));
        } else {
            toast.error(t("controlling.failed_save_schedule"));
        }
    } catch (error) {
        console.error("Error saving schedules:", error);
        if (error.response?.data?.errors) {
            toast.error(
                t("controlling.validation_failed_prefix") +
                    Object.values(error.response.data.errors).flat().join(", "),
            );
        } else {
            toast.error(t("controlling.failed_save_schedule"));
        }
    } finally {
        isSavingSchedules.value = false;
    }
};
</script>

<template>
    <Head :title="t('title.controlling')" />

    <BreezeAuthenticatedLayout :titlePage="'Controlling'">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ t("title.controlling") }}
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
                                            @input="updateThreshold(sensor.id, threshold[sensor.id])"
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
                                            @input="updateThreshold(sensor.id, threshold[sensor.id])"
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
