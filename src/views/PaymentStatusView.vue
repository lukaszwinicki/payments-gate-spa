<template>
    <div v-if="isLoading" class="flex justify-center items-center py-10">
        <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else class="text-center py-12">
        <div class="flex items-center justify-center py-12 px-4">
            <div class="max-w-xl w-full">
                <h1 class="text-4xl font-bold mb-4 text-center" :class="statusColorClass.split(' ')[0]">
                    {{ transactionHeader }}
                </h1>
                <p class="text-center text-gray-500 mb-8">
                    {{ transactionMessage }}
                </p>
                <div class="rounded-xl overflow-hidden shadow-lg" :class="statusColorClass.split(' ')[1]">
                    <div class="p-6 space-y-4">
                        <template v-for="(value, label) in transactionDetails" :key="label">
                            <div
                                class="flex justify-between items-center bg-white rounded-md p-4 border-b border-gray-100">
                                <span class="text-gray-500 font-medium">{{ label }}:</span>
                                <span class="font-bold text-gray-500">{{ value ?? '-' }}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="mt-6 flex justify-center">
                    <button @click="returnToMerchant"
                        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                        Return to merchant
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getTransactionHeader, getTransactionMessage, getStatusColorClass } from '@/services/TransactionStatusService'
import { paymentService } from '@/services/PaymentService';
import type { TransactionStatus } from '@/enums/TransactionStatus';

const route = useRoute();
const isLoading = ref(false)
const status = ref<string | null>(null)
const returnUrl = ref('/');
const amount = ref<string | null>(null)
const currency = ref<string | null>(null)
const paymentMethod = ref<string | null>(null)

const transactionHeader = computed(() => getTransactionHeader(status.value as TransactionStatus))
const transactionMessage = computed(() => getTransactionMessage(status.value as TransactionStatus))
const statusColorClass = computed(() => getStatusColorClass(status.value as TransactionStatus))

const transactionDetails = computed(() => ({
    'Transaction ID': uuid ?? '-',
    Amount: amount && currency ? `${amount.value ?? '-'} ${currency.value ?? ''}` : '-',
    'Payment Method': paymentMethod ?? '-',
    Status: status ?? '-',
}))

function returnToMerchant() {
    isLoading.value = true
    window.location.href = returnUrl.value;
}

const uuid = route.query.transaction_uuid;

onMounted(async () => {
    if (!uuid) {
        isLoading.value = false
        return;
    }
    try {
        isLoading.value = true
        const response = await paymentService.getPaymentStatus({ uuid: uuid as string })
        status.value = response.status
        amount.value = response.amount
        currency.value = response.currency
        paymentMethod.value = response.paymentMethod
        returnUrl.value = response.returnUrl
    } catch {
        status.value = 'ERROR'
        amount.value = 'ERROR'
        paymentMethod.value = 'ERROR'
    } finally {
        isLoading.value = false
    }
});
</script>
