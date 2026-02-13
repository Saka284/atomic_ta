<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    schedule: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(["update", "delete", "toggle"]);

const isExpanded = ref(false);

const actuators = [
    { key: "blower", name: "Drum Fan", icon: "fas fa-fan", color: "text-red-500" },
    { key: "exhaust", name: "Exhaust Fan", icon: "fas fa-fan", color: "text-yellow-500" },
    { key: "dehumidifier", name: "Dehumidifier", icon: "fas fa-tint", color: "text-cyan-500" },
];

const updateTime = (field, value) => {
    emit("update", {
        ...props.schedule,
        [field]: value,
    });
};

const updateActuator = (actuatorKey, state) => {
    emit("update", {
        ...props.schedule,
        actuators: {
            ...props.schedule.actuators,
            [actuatorKey]: state,
        },
    });
};

const toggleEnabled = (e) => {
    e.stopPropagation();
    emit("toggle", props.schedule.id);
};

const deleteSchedule = (e) => {
    e.stopPropagation();
    emit("delete", props.schedule.id);
};

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const timeError = computed(() => {
    if (!props.schedule.start_time || !props.schedule.end_time) return null;
    if (props.schedule.start_time >= props.schedule.end_time) {
        return "Start time must be before end time";
    }
    return null;
});

// Summary text for collapsed view
const actuatorSummary = computed(() => {
    const summary = [];
    for (const act of actuators) {
        const state = props.schedule.actuators[act.key];
        if (state === "on") {
            summary.push(`${act.name}: ON`);
        } else if (state === "off") {
            summary.push(`${act.name}: OFF`);
        }
    }
    if (summary.length === 0) {
        return "All actuators follow threshold";
    }
    return summary.join(" • ");
});
</script>

<template>
    <div
        class="bg-white overflow-hidden shadow-sm rounded-lg border-2 transition-all duration-300"
        :class="[
            schedule.enabled
                ? 'border-green-400 bg-white'
                : 'border-gray-200 bg-gray-50 opacity-75',
            timeError ? 'border-red-400' : '',
        ]"
    >
        <!-- Accordion Header (Always Visible) -->
        <div
            @click="toggleExpand"
            class="flex flex-col cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
            <!-- Main Row -->
            <div class="flex items-center justify-between p-4">
                <!-- Left: Schedule Info -->
                <div class="flex items-center gap-4 flex-1 min-w-0">
                    <!-- Expand Icon -->
                    <i
                        class="fas fa-chevron-right text-gray-400 transition-transform duration-300"
                        :class="{ 'rotate-90': isExpanded }"
                    ></i>

                    <!-- Schedule Number & Time -->
                    <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <span class="font-semibold text-gray-700">
                            <i class="fas fa-clock text-green-500 mr-2"></i>
                            Schedule {{ index + 1 }}
                        </span>
                        <span
                            class="text-lg font-mono px-3 py-1 rounded-lg"
                            :class="[
                                schedule.enabled
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-500',
                            ]"
                        >
                            {{ schedule.start_time || "--:--" }} -
                            {{ schedule.end_time || "--:--" }}
                        </span>
                    </div>

                    <!-- Summary (Desktop only, hidden when expanded) -->
                    <span
                        class="hidden md:block text-sm text-gray-500 truncate"
                        :class="{ 'md:hidden': isExpanded }"
                    >
                        {{ actuatorSummary }}
                    </span>
                </div>

                <!-- Right: Toggle & Delete -->
                <div class="flex items-center gap-3 ml-4">
                    <!-- Error Indicator -->
                    <i
                        v-if="timeError"
                        class="fas fa-exclamation-circle text-red-500"
                        title="Invalid time range"
                    ></i>

                    <!-- Toggle Switch -->
                    <button
                        @click="toggleEnabled"
                        class="relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        :class="schedule.enabled ? 'bg-green-500' : 'bg-gray-300'"
                    >
                        <span
                            class="inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300"
                            :class="
                                schedule.enabled ? 'translate-x-7' : 'translate-x-1'
                            "
                        ></span>
                    </button>

                    <!-- Delete Button -->
                    <button
                        @click="deleteSchedule"
                        class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete Schedule"
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Summary Row (visible on mobile when not expanded) -->
            <div
                v-if="!isExpanded"
                class="md:hidden px-4 pb-3 -mt-2"
            >
                <span class="text-xs text-gray-500 ml-8">
                    {{ actuatorSummary }}
                </span>
            </div>
        </div>

        <!-- Accordion Content (Expandable) -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[500px] opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-[500px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
        >
            <div v-if="isExpanded" class="overflow-hidden">
                <div class="px-4 pb-4 pt-2 border-t">
                    <!-- Time Pickers -->
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-600 mb-2"
                            >
                                <i class="fas fa-play text-green-400 mr-1"></i>
                                Start Time
                            </label>
                            <input
                                type="time"
                                :value="schedule.start_time"
                                @input="
                                    updateTime('start_time', $event.target.value)
                                "
                                :disabled="!schedule.enabled"
                                class="w-full px-4 py-3 border rounded-lg text-center text-lg font-mono focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                :class="
                                    timeError
                                        ? 'border-red-400'
                                        : 'border-gray-300'
                                "
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-600 mb-2"
                            >
                                <i class="fas fa-stop text-red-400 mr-1"></i>
                                End Time
                            </label>
                            <input
                                type="time"
                                :value="schedule.end_time"
                                @input="
                                    updateTime('end_time', $event.target.value)
                                "
                                :disabled="!schedule.enabled"
                                class="w-full px-4 py-3 border rounded-lg text-center text-lg font-mono focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                :class="
                                    timeError
                                        ? 'border-red-400'
                                        : 'border-gray-300'
                                "
                            />
                        </div>
                    </div>

                    <!-- Time Error Message -->
                    <div
                        v-if="timeError"
                        class="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center"
                    >
                        <i class="fas fa-exclamation-circle mr-1"></i>
                        {{ timeError }}
                    </div>

                    <!-- Actuators Section -->
                    <div class="space-y-3">
                        <h5
                            class="text-sm font-semibold text-gray-500 uppercase tracking-wide"
                        >
                            Actuator Settings
                        </h5>

                        <div
                            v-for="actuator in actuators"
                            :key="actuator.key"
                            class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-3"
                        >
                            <!-- Actuator Name -->
                            <div
                                class="flex items-center gap-2 font-medium text-gray-700"
                            >
                                <i
                                    :class="[
                                        actuator.icon,
                                        actuator.color,
                                        'w-5',
                                    ]"
                                ></i>
                                <span>{{ actuator.name }}</span>
                            </div>

                            <!-- Radio Buttons -->
                            <div class="flex flex-wrap gap-2 sm:gap-4">
                                <label
                                    class="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200"
                                    :class="[
                                        schedule.actuators[actuator.key] ===
                                        'threshold'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'hover:bg-gray-100',
                                        !schedule.enabled &&
                                            'cursor-not-allowed opacity-50',
                                    ]"
                                >
                                    <input
                                        type="radio"
                                        :name="`actuator-${schedule.id}-${actuator.key}`"
                                        value="threshold"
                                        :checked="
                                            schedule.actuators[actuator.key] ===
                                            'threshold'
                                        "
                                        @change="
                                            updateActuator(
                                                actuator.key,
                                                'threshold'
                                            )
                                        "
                                        :disabled="!schedule.enabled"
                                        class="w-4 h-4 text-blue-500 focus:ring-blue-400"
                                    />
                                    <span class="text-sm">Threshold</span>
                                </label>

                                <label
                                    class="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200"
                                    :class="[
                                        schedule.actuators[actuator.key] ===
                                        'on'
                                            ? 'bg-green-100 text-green-700'
                                            : 'hover:bg-gray-100',
                                        !schedule.enabled &&
                                            'cursor-not-allowed opacity-50',
                                    ]"
                                >
                                    <input
                                        type="radio"
                                        :name="`actuator-${schedule.id}-${actuator.key}`"
                                        value="on"
                                        :checked="
                                            schedule.actuators[actuator.key] ===
                                            'on'
                                        "
                                        @change="
                                            updateActuator(actuator.key, 'on')
                                        "
                                        :disabled="!schedule.enabled"
                                        class="w-4 h-4 text-green-500 focus:ring-green-400"
                                    />
                                    <span class="text-sm">Force ON</span>
                                </label>

                                <label
                                    class="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200"
                                    :class="[
                                        schedule.actuators[actuator.key] ===
                                        'off'
                                            ? 'bg-red-100 text-red-700'
                                            : 'hover:bg-gray-100',
                                        !schedule.enabled &&
                                            'cursor-not-allowed opacity-50',
                                    ]"
                                >
                                    <input
                                        type="radio"
                                        :name="`actuator-${schedule.id}-${actuator.key}`"
                                        value="off"
                                        :checked="
                                            schedule.actuators[actuator.key] ===
                                            'off'
                                        "
                                        @change="
                                            updateActuator(actuator.key, 'off')
                                        "
                                        :disabled="!schedule.enabled"
                                        class="w-4 h-4 text-red-500 focus:ring-red-400"
                                    />
                                    <span class="text-sm">Force OFF</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
