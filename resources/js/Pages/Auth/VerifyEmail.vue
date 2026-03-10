<script setup>
import { computed } from 'vue';
import BreezeButton from '@/Components/Button.vue';
import BreezeGuestLayout from '@/Layouts/Guest.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useLocale } from "@/composables/useLocale";

const props = defineProps({
    status: String,
});

const form = useForm();
const { t } = useLocale();

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <BreezeGuestLayout>
        <Head :title="t('auth.verify_email_title')" />

        <div class="mb-4 text-sm text-gray-600">
            {{ t("auth.verify_email_desc") }}
        </div>

        <div class="mb-4 font-medium text-sm text-green-600" v-if="verificationLinkSent" >
            {{ t("auth.verification_link_sent") }}
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <BreezeButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ t("auth.resend_verification_email") }}
                </BreezeButton>

                <Link :href="route('logout')" method="post" as="button" class="underline text-sm text-gray-600 hover:text-gray-900">{{ t("layout.logout") }}</Link>
            </div>
        </form>
    </BreezeGuestLayout>
</template>
