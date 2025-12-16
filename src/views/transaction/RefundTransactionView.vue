<template>
    <div class="flex justify-center">
        <div class="w-full max-w-3xl space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
                <div class="flex items-center gap-3 mb-6">
                    <div
                        class="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-tr from-blue-200 to-blue-400 shadow">
                        <ArrowUturnLeftIcon class="w-6 h-6 text-white" />
                    </div>
                    <h2 class="text-xl font-semibold text-gray-800">
                        Refund payment
                    </h2>
                </div>

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
import Swal from 'sweetalert2'
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import FormInput from '@/components/FormInput.vue'
import CopyableInput from '@/components/CopyableInput.vue'
import type { RefundTransactionRequest } from '@/types/transactions/TransactionTypes'
import { transactionService } from '@/services/transactions/TransactionService'

const isLoading = ref(false)
const transactionUuid = ref<string | null>(null)
const refundTransactionUuid = ref<string | null>(null)
const refundSuccess = ref(false)

const refundPayment = async () => {
    const missing = [
        !transactionUuid.value && 'Transaction UUID',
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
        const refundRequest: RefundTransactionRequest = {
            transactionUuid: transactionUuid.value ?? ''
        }

        const refundTransactionResponse = await transactionService.refundTransaction(refundRequest)

        refundTransactionUuid.value = refundTransactionResponse.transactionUuid
        refundSuccess.value = true;
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