<template>
    <div class="flex justify-center">
        <div class="w-full max-w-3xl space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
                <PageHeader title="Refund payment" :icon="ArrowUturnLeftIcon" />
                <div class="space-y-5">
                    <FormInput v-model=transactionUuid label="Transaction UUID" type="text"
                        placeholder="Enter your transaction uuid" required />
                    <button type="button"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        :disabled="isLoading" @click="refundPayment">
                        <span v-if="isLoading"
                            class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block mr-2"></span>
                        Refund payment
                    </button>
                </div>
            </div>
            <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-6"
                enter-to-class="opacity-100 translate-y-0">
                <div v-if="refundSuccess" class="bg-white border border-green-200 rounded-xl shadow-lg p-6 space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                            <CheckCircleIcon class="w-10 h-10 text-green-600 shrink-0" />
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800">
                                Payment refunded successfully.
                            </h2>
                        </div>
                    </div>
                    <CopyableInput label="Transaction uuid" :value="refundTransactionUuid ?? ''"
                        hint="Click to copy the transaction uuid" />
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import FormInput from '@/components/FormInput.vue'
import CopyableInput from '@/components/CopyableInput.vue'
import type { RefundTransactionRequest } from '@/types/transactions/TransactionTypes'
import { transactionService } from '@/services/transactions/TransactionService'
import PageHeader from '@/components/PageHeader.vue'
import { useApiError } from '@/composables/useApiError'
import { showDialog } from '@/lib/errors/showDialog'
import { getMissingFields } from '@/lib/errors/getMissingFields';

const isLoading = ref(false)
const transactionUuid = ref<string | null>(null)
const refundTransactionUuid = ref<string | null>(null)
const refundSuccess = ref(false)

const { handleApiError } = useApiError()

const refundPayment = async () => {
    const missing = getMissingFields({
        TransactionUuid: transactionUuid.value,
    })

    if (missing.length) {
        await showDialog('warning', `Please fill in:<br>${missing.join(', ')}`, 'Incomplete form')
        return
    }

    isLoading.value = true

    try {
        const refundRequest: RefundTransactionRequest = {
            transactionUuid: transactionUuid.value ?? ''
        }

        const refundTransactionResponse = await transactionService.refundTransaction(refundRequest)

        refundTransactionUuid.value = refundTransactionResponse.transactionUuid
        refundSuccess.value = true;
    } catch (error) {
        await handleApiError(error, 'Refund transaction failed', 'error')
    }
    finally {
        isLoading.value = false
    }
}

</script>