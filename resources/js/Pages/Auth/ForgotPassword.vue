<script setup>
import BreezeButton from '@/Components/Button.vue';
import BreezeGuestLayout from '@/Layouts/Guest.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';
import BreezeValidationErrors from '@/Components/ValidationErrors.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { useLocale } from "@/composables/useLocale";

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});
const { t } = useLocale();

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <BreezeGuestLayout>
        <Head :title="t('auth.forgot_password_title')" />

        <div class="mb-4 text-sm text-gray-600">
            {{ t("auth.forgot_password_desc") }}
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <BreezeValidationErrors class="mb-4" />

        <form @submit.prevent="submit">
            <div>
                <BreezeLabel for="email" :value="t('auth.email')" />
                <BreezeInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus autocomplete="username" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <BreezeButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ t("auth.email_password_reset_link") }}
                </BreezeButton>
            </div>
        </form>
    </BreezeGuestLayout>
</template>
