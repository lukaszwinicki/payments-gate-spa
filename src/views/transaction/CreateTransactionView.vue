<template>
    <div class="flex justify-center">
        <div class="w-full max-w-3xl space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
                <PageHeader title="Create transaction" :icon="PlusIcon" />
                <div class="space-y-5">
                    <FormInput v-model=fullname label="Full name" id="fullname" type="text"
                        placeholder="Enter your full name" required />
                    <FormInput v-model=email label="Email" id="email" type="text" placeholder="Enter your email"
                        required />
                    <FormInput v-model=amount label="Amount" id="amount" type="number" placeholder="Enter your amount"
                        required />
                    <FormInput v-model=currency label="Currency" id="currency" type="text"
                        placeholder="Enter your currency" required />
                    <FormSelect v-model="selectedPaymentMethod" label="Payment Method" id="payment-method"
                        :options="paymentMethods" required />
                    <FormInput v-model=notificationUrl label="Notification url" id="notification-url" type="url"
                        placeholder="Enter your notification url" required />
                    <FormInput v-model=returnUrl label="Return url" id="return-url" type="url"
                        placeholder="Enter your return url" required />

                    <button type="button"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        :disabled="isLoading" @click="createTransaction">
                        <span v-if="isLoading"
                            class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block mr-2"></span>
                        Create Transaction
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
                    <CopyableInput label="Transaction uuid" :value="transactionUuid ?? ''"
                        hint="Click to copy the transaction uuid" />
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import FormInput from '@/components/FormInput.vue';
import FormSelect from '@/components/FormSelect.vue';
import CopyableInput from '@/components/CopyableInput.vue'
import { PaymentMethod } from '@/enums/PaymentMethod';
import { PlusIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import type { CreateTransactionRequest } from '@/types/transactions/TransactionTypes';
import { transactionService } from '@/services/transactions/TransactionService';
import PageHeader from '@/components/PageHeader.vue';

const fullname = ref<string | null>(null)
const email = ref<string | null>(null)
const amount = ref<string | null>(null)
const currency = ref<string | null>(null)
const paymentMethods = Object.values(PaymentMethod);
const selectedPaymentMethod = ref<PaymentMethod | null>(null)
const notificationUrl = ref<string | null>(null)
const returnUrl = ref<string | null>(null)
const isLoading = ref(false)
const paymentLink = ref<string | null>(null)
const transactionUuid = ref<string | null>(null)

const createTransaction = async () => {
    const missing = [
        !fullname.value && 'Full name',
        !email.value && 'Email',
        !amount.value && 'Amount',
        !currency.value && 'Currency',
        !selectedPaymentMethod.value && 'Payment Method',
        !notificationUrl.value && 'Notification URL',
        !returnUrl.value && 'Return URL',
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

    isLoading.value = true

    try {
        const paymentsData: CreateTransactionRequest = {
            name: fullname.value ?? '',
            email: email.value ?? '',
            amount: Number(amount.value ?? 0),
            currency: currency.value ?? '',
            paymentMethod: selectedPaymentMethod.value ?? '',
            notificationUrl: notificationUrl.value ?? '',
            returnUrl: returnUrl.value ?? '',
        }

        const transactionResponse = await transactionService.createTransaction(paymentsData)

        paymentLink.value = transactionResponse.link
        transactionUuid.value = transactionResponse.transactionUuid
    } catch (err: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: err.response?.data?.error ?? err.message ?? 'Unknown error',
            confirmButtonColor: '#ef4444',
        })
    }
    finally {
        isLoading.value = false
    }
}
</script>