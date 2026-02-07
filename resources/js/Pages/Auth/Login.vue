<script setup>
import BreezeButton from "@/Components/Button.vue";
import BreezeGuestLayout from "@/Layouts/Guest.vue";
import BreezeValidationErrors from "@/Components/ValidationErrors.vue";
import { Head, useForm } from "@inertiajs/vue3";

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    username: "",
    password: "",
    remember: false,
});

const submit = () => {
    form.post(route("login"), {
        onFinish: () => form.reset("password"),
    });
};
</script>

<template>
    <BreezeGuestLayout>
        <Head title="Log in" />

        <BreezeValidationErrors class="mb-4" />

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div class="relative">
                <input
                    id="username"
                    type="text"
                    v-model="form.username"
                    required
                    autocomplete="off"
                    class="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none bg-white shadow-none"
                    placeholder=" "
                />
                <label
                    for="username"
                    :class="[
                        form.username
                            ? '-top-2 text-xs text-gray-500'
                            : 'top-4 text-base text-gray-400 peer-focus:-top-2 peer-focus:text-xs',
                        'absolute bg-white px-1 left-3 transition-all peer-focus:text-green-500',
                    ]"
                >
                    Username
                </label>
            </div>

            <div class="relative mt-6">
                <input
                    id="password"
                    type="password"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                    class="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none bg-white shadow-none"
                    placeholder=" "
                />
                <label
                    for="password"
                    :class="[
                        form.password
                            ? '-top-2 text-xs text-gray-500'
                            : 'top-4 text-base text-gray-400 peer-focus:-top-2 peer-focus:text-xs',
                        'absolute bg-white px-1 left-3 transition-all peer-focus:text-green-500',
                    ]"
                >
                    Password
                </label>
            </div>

            <div class="flex w-full items-center justify-end mt-8">
                <BreezeButton
                    class="w-full justify-center px-4 py-3"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    <span v-if="!form.processing"> Log in </span>
                    <i
                        v-else
                        class="fas fa-spinner fa-spin text-lg transition-opacity duration-300 ease-in-out"
                    ></i>
                </BreezeButton>
            </div>
        </form>
    </BreezeGuestLayout>
</template>
