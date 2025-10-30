<template>
  <div class="min-h-screen px-4">
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else>
      <div v-if="statusMessage" class="text-center py-12">
        <h1 :class="statusMessage.class + ' text-2xl font-bold'">{{ statusMessage.title }}</h1>
        <p class="text-gray-500 mt-2">{{ statusMessage.text }}</p>
      </div>
      <div v-else-if="isPaid" class="text-center py-12">
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
                  <div class="flex justify-between items-center bg-white rounded-md p-4 border-b border-gray-100">
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
      <div v-else>
        <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div class=" max-w-3xl mx-auto flex flex-col gap-6">
            <div class="text-center">
              <h1 class="text-4xl font-bold text-gray-700 p-4">Payment Summary</h1>
              <p class="text-gray-500">
                Review your transaction details and select payment method
              </p>
            </div>
            <Section title="Personal Details" :withWrapper="true">
              <FormField label="Full Name">
                <input v-model="fullname" type="text"
                  class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2 w-2/3 text-gray-700"
                  placeholder="Enter your full name" required />
              </FormField>
              <FormField label="Email">
                <input v-model="email" type="email"
                  class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2 w-2/3 text-gray-700"
                  placeholder="Enter your email" required />
              </FormField>
            </Section>
            <Section title="Transaction Details" :withWrapper="true">
              <SummaryRow label="Transaction ID" :value="payment?.paymentLinkId" />
              <SummaryRow label="Amount" :value="`${payment?.amount ?? '-'} ${payment?.currency ?? ''}`"
                valueColor="text-green-600" />
              <SummaryRow label="Full Name" :value="fullname" />
              <SummaryRow label="Email" :value="email" />
            </Section>
            <Section title="Select Payment Method" :withWrapper="false">
              <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <PaymentMethodTile v-for="method in paymentMethods" :key="method.id" :method="method"
                  :isSelected="selectedPaymentMethod === method.id" @select="(id) => selectedPaymentMethod = id" />
              </div>
            </Section>
            <div class="flex flex-row justify-center pt-10">
              <button
                class="bg-green-600 text-white font-bold px-15 py-4 hover:shadow-lg rounded-full hover:-translate-y-1 transition duration-300 hover:bg-green-500 focus:outline-none"
                @click="createTransaction"> Confirm payment
              </button>
            </div>
            <div v-if="redirectToProvider"
              class="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
              <svg class="animate-spin h-12 w-12 text-blue-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p class="text-blue-700 font-semibold text-lg">Redirecting to payment provider...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import { paymentMethods } from '@/constants/PaymentMethods'
import PaymentMethodTile from '@/components/PaymentMethodTile.vue'
import FormField from '@/components/FormField.vue'
import Section from '@/components/Section.vue'
import SummaryRow from '@/components/SummaryRow.vue'
import { paymentService } from '@/services/PaymentService'
import { PaymentMethod } from '@/enums/PaymentMethod'
import { getTransactionHeader, getTransactionMessage, getStatusColorClass } from '@/services/TransactionStatusService'
import type { PaymentRequest } from '@/types/Payment'

const route = useRoute()
const payment = ref<any | null>(null)
const transaction = ref<any | null>(null)
const fullname = ref('')
const email = ref('')
const error = ref<string | null>(null)
const isExpired = ref(false)
const isNotFound = ref(false)
const isPaid = ref(false)
const isLoading = ref(true)
const redirectToProvider = ref(false)
const selectedPaymentMethod = ref<PaymentMethod | null>(null)
const transactionHeader = computed(() => getTransactionHeader(transaction.value?.status))
const transactionMessage = computed(() => getTransactionMessage(transaction.value?.status))
const statusColorClass = computed(() => getStatusColorClass(transaction.value?.status))

const transactionDetails = computed(() => ({
  'Transaction ID': payment.value?.paymentLinkId ?? '-',
  Amount: `${transaction.value?.amount ?? '-'} ${transaction.value?.currency ?? ''}`,
  'Payment Method': transaction.value?.paymentMethod ?? '-',
  Status: transaction.value?.status ?? '-',
}))

function returnToMerchant() {
    isLoading.value = true
    window.location.href = transaction.value?.returnUrl;
}

const getPaymentDetails = async (id: string) => {
  try {

    isLoading.value = true
    const response = await paymentService.paymentDetails({ paymentLinkId: id })

    payment.value = response.payment
    transaction.value = response.transaction
    isPaid.value = !!transaction.value
  } catch (err: any) {

    const status = err.status as keyof typeof map
    const message = err.data?.error ?? err.message ?? 'An unexpected error occurred'
    error.value = message

    const map = {
      410: isExpired,
      404: isNotFound,
    }

    if (status && map[status]) map[status].value = true
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.params.payment_link_id,
  (id) => id && getPaymentDetails(id as string),
  { immediate: true }
)

const statusMessage = computed(() => {
  if (!error.value && !isExpired.value && !isNotFound.value) return null
  const title = isExpired.value ? 'Payment link expired' : isNotFound.value ? 'Not found' : 'Error'
  const text =
    error.value ??
    (isExpired.value
      ? 'This link is no longer active. Please contact support.'
      : isNotFound.value
        ? 'The payment link was not found.'
        : 'An unexpected error occurred.')
  return { title, text, class: 'text-red-500' }
})

const createTransaction = async () => {

  const missing = [
    !fullname.value && 'Full name',
    !email.value && 'Email',
    !selectedPaymentMethod.value && 'Payment method',
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

    const paymentData: PaymentRequest = {
      paymentLinkId: route.params.payment_link_id as string,
      amount: payment.value.amount,
      currency: payment.value.currency,
      paymentMethod: selectedPaymentMethod.value as PaymentMethod,
      fullname: fullname.value,
      email: email.value,
    }

    const { link } = await paymentService.confirmPaymentLink(paymentData)

    if (link) {
      redirectToProvider.value = true
      setTimeout(() => (window.location.href = link), 800)
    }
  } catch (err: any) {
    await Swal.fire({
      icon: 'error',
      title: 'Transaction error',
      text: err.response?.data?.error ?? err.message ?? 'Unknown error',
      confirmButtonColor: '#ef4444',
    })
  } finally {
    isLoading.value = false
  }
}
</script>
