<template>
    <div class="flex justify-center">
        <div class="w-full max-w-3xl space-y-8">

            <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
                <FormInput v-model="amount" label="Amount" type="number" required />
                <FormInput v-model="currency" label="Currency" type="text" required />
                <FormInput v-model="expiresAt" label="Expires at" type="datetime-local" required />
                <FormInput v-model="notificationUrl" label="Notification url" type="url" required />
                <FormInput v-model="returnUrl" label="Return url" type="url" required />

                <button type="button"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    @click="createPaymentLink">
                    Create Payment Link
                </button>
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
import FormInput from '@/components/FormInput.vue';
import CopyableInput from '@/components/CopyableInput.vue';
import type { PaymentLinkRequest } from '@/types/PaymentsRequests';
import { paymentService } from '@/services/PaymentService';
import { ref } from 'vue';
import Swal from 'sweetalert2'
import {
    CheckCircleIcon
} from '@heroicons/vue/24/outline'

const amount = ref<string | null>(null)
const currency = ref<string | null>(null)
const expiresAt = ref<Date | null>(null)
const notificationUrl = ref<string | null>(null)
const returnUrl = ref<string | null>(null)
const isLoading = ref(true)
const paymentLink = ref<string | null>(null)

const createPaymentLink = async () => {
    const missing = [
        !amount.value && 'Anount',
        !currency.value && 'Currency',
        !expiresAt.value && 'Expires at',
        !notificationUrl.value && 'Notification url',
        !returnUrl.value && 'Return url',
    ].filter(Boolean)

    if (missing.length) {
        await Swal.fire({
            icon: 'warning',
            title: 'Incomplete form',
            html: `Please fill in:<br><b>${missing.join(', ')}</b>`,
            confirmButtonColor: '#2563eb',
        })
        return
    }

    try {
        const paymentLinkData: PaymentLinkRequest = {
            amount: Number(amount.value ?? 0),
            currency: currency.value ?? '',
            expiresAt: expiresAt.value ? new Date(expiresAt.value) : new Date(),
            notificationUrl: notificationUrl.value ?? '',
            returnUrl: returnUrl.value ?? '',
        }

        const getPaymentLink = await paymentService.createPaymentLink(paymentLinkData);
        paymentLink.value = getPaymentLink.link

    } catch (err: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: err.response?.data?.error ?? err.message ?? 'Unknown error',
            confirmButtonColor: '#ef4444',
        })
    }
    finally {
        isLoading.value = false;
    }
}
</script>
