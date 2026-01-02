<template>
    <div class="flex justify-center">
        <div class="w-full max-w-3xl space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
                <PageHeader title="Generate Payment Link" :icon="LinkIcon" />
                <div class="space-y-5">
                    <FormInput v-model="amount" label="Amount" type="number" required />
                    <FormInput v-model="currency" label="Currency" type="text" required />
                    <FormInput v-model="expiresAt" label="Expires at" type="datetime-local" required />
                    <FormInput v-model="notificationUrl" label="Notification URL" type="url" required />
                    <FormInput v-model="returnUrl" label="Return URL" type="url" required />

                    <button type="button"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        :disabled="isLoading" @click="createPaymentLink">
                        <span v-if="isLoading"
                            class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block mr-2"></span>
                        Create Payment Link
                    </button>
                </div>
            </div>
            <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-6"
                enter-to-class="opacity-100 translate-y-0">
                <div v-if="paymentLink" class="bg-white border border-green-200 rounded-xl shadow-lg p-6 space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                            <CheckCircleIcon class="w-10 h-10 text-green-600 shrink-0" />
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800">
                                Payment link generated
                            </h2>
                            <p class="text-sm text-gray-500">
                                Share this link with your customer
                            </p>
                        </div>
                    </div>

                    <CopyableInput label="Payment link" :value="paymentLink" hint="Click to copy the payment link" />
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CheckCircleIcon, LinkIcon } from '@heroicons/vue/24/outline'
import FormInput from '@/components/FormInput.vue'
import CopyableInput from '@/components/CopyableInput.vue'
import PageHeader from '@/components/PageHeader.vue';
import { paymentLinkService } from '@/services/payment-links/PaymentLinkService'
import type { PaymentLinkRequest, PaymentLinkForm } from '@/types/payment-links/PaymentLinkTypes'
import { useApiError } from '@/composables/useApiError'
import { showDialog } from '@/lib/errors/showDialog'
import { getMissingFields } from '@/lib/errors/getMissingFields';

const amount = ref<string | null>(null)
const currency = ref<string | null>(null)
const expiresAt = ref<Date | null>(null)
const notificationUrl = ref<string | null>(null)
const returnUrl = ref<string | null>(null)
const isLoading = ref(false)
const paymentLink = ref<string | null>(null)

const { handleApiError } = useApiError()

const FORM_LABELS: Record<keyof PaymentLinkForm, string> = {
    amount: 'Amount',
    currency: 'Currency',
    expiresAt: 'Expires At',
    notificationUrl: 'Notification URL',
    returnUrl: 'Return URL',
}

const createPaymentLink = async () => {

    const missing = getMissingFields({
        amount: amount.value,
        currency: currency.value,
        expiresAt: expiresAt.value,
        notificationUrl: notificationUrl.value,
        returnUrl: returnUrl.value,
    })

    if (missing.length) {
        const message = missing
            .map(field => FORM_LABELS[field])
            .join(', ')

        await showDialog(
            'warning',
            `Please fill in:<br>${message}`,
            'Incomplete form'
        )
        return
    }

    isLoading.value = true

    try {
        const paymentLinkData: PaymentLinkRequest = {
            amount: Number(amount.value ?? 0),
            currency: currency.value ?? '',
            expiresAt: expiresAt.value ?? new Date(),
            notificationUrl: notificationUrl.value ?? '',
            returnUrl: returnUrl.value ?? '',
        }

        const response = await paymentLinkService.createPaymentLink(paymentLinkData)

        paymentLink.value = response.link
    } catch (error) {
        await handleApiError(error, 'Create payment link failed', 'error')
    } finally {
        isLoading.value = false
    }
}
</script>