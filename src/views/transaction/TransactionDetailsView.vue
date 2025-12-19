<template>
    <transition name="fade">
        <div v-if="transaction" class="fixed inset-0 z-50 flex items-center justify-center">

            <div class="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity" @click="close"></div>

            <div class="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden
                 transform transition-all duration-300 scale-95 opacity-0 animate-scale-fade-in">

                <div
                    class="px-8 py-6 bg-linear-to-r from-indigo-600 to-blue-400 text-white flex justify-between items-center">
                    <h2 class="text-2xl font-bold">Transaction Details</h2>
                    <button class="text-white hover:text-gray-200 transition text-2xl font-bold" @click="close"
                        aria-label="Close modal">
                        ✕
                    </button>
                </div>

                <div class="px-8 py-6 max-h-[70vh] overflow-y-auto space-y-5">
                    <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                        <div class="font-medium">Transaction uuid:</div>
                        <div>{{ transaction.transactionUuid }}</div>

                        <div class="font-medium">Full name:</div>
                        <div>{{ transaction.fullname }}</div>

                        <div class="font-medium">Email:</div>
                        <div>{{ transaction.email }}</div>

                        <div class="font-medium">Amount:</div>
                        <div>{{ transaction.amount }} {{ transaction.currency }}</div>

                        <div class="font-medium">Payment method:</div>
                        <div>{{ transaction.paymentMethod }}</div>

                        <div class="font-medium">Status:</div>
                        <div>
                            <span :class="statusClass(transaction.status)">
                                {{ transaction.status }}
                            </span>
                        </div>

                        <div class="font-medium">Refund code:</div>
                        <div>{{ transaction.refundCode }}</div>

                        <div class="font-medium">Created:</div>
                        <div>{{ transaction.createdAt ? formatDate(transaction.createdAt) : '—' }}</div>

                        <div class="font-medium">Updated:</div>
                        <div>{{ transaction.updatedAt ? formatDate(transaction.updatedAt) : '—' }}</div>

                        <div class="font-medium">Return URL:</div>
                        <div>
                            <a :href="transaction.returnUrl || '#'" target="_blank"
                                class="text-blue-600 hover:underline wrap-break-words">
                                {{ transaction.returnUrl }}
                            </a>
                        </div>

                        <div class="font-medium">Notification URL:</div>
                        <div>
                            <a :href="transaction.notificationUrl || '#'" target="_blank"
                                class="text-blue-600 hover:underline wrap-break-words">
                                {{ transaction.notificationUrl }}
                            </a>
                        </div>
                    </div>
                </div>

                <div class="px-8 py-4 bg-gray-50 flex justify-end">
                    <button @click="close"
                        class="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { useTransactionsStore } from '@/stores/Transactions'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { statusClass, formatDate } from '@/utils/formatters'

const router = useRouter()
const route = useRoute()
const store = useTransactionsStore()

const transaction = computed(() =>
    store.getByUuid(route.params.transactionUuid as string)
)

const close = () => router.back()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes scale-fade-in {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-scale-fade-in {
    animation: scale-fade-in 0.3s forwards;
}
</style>