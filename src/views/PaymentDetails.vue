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

                <div class="flex justify-between items-center bg-white rounded-md p-4">
                  <span class="text-gray-500 font-medium">Transaction ID:</span>
                  <span class="text-gray-800 font-semibold">{{ payment?.paymentLinkId ?? '-' }}</span>
                </div>

                <div class="flex justify-between items-center bg-white rounded-md p-4">
                  <span class="text-gray-500 font-medium">Amount:</span>
                  <span class="text-gray-800 font-semibold">
                    {{ transaction?.amount ?? '-' }} {{ transaction?.currency ?? '' }}
                  </span>
                </div>

                <div class="flex justify-between items-center bg-white rounded-md p-4">
                  <span class="text-gray-500 font-medium">Payment Method:</span>
                  <span class="text-gray-800 font-semibold">{{ transaction?.paymentMethod ?? '-' }}</span>
                </div>

                <div class="flex justify-between items-center bg-white rounded-md p-4">
                  <span class="text-gray-500 font-medium">Status:</span>
                  <span class="font-bold" :class="statusColorClass.split(' ')[0]">
                    {{ transaction?.status ?? '-' }}
                  </span>
                </div>
              </div>
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

            <h1 class="text-2xl font-semibold text-gray-700">Personal Details</h1>

            <div class="bg-white shadow-md rounded-lg p-6">
              <div class="flex justify-between items-center border-b border-gray-100 p-3">
                <label class="font-medium text-gray-400 w-1/3">Full Name:</label>
                <input v-model="fullname"
                  class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2 w-2/3 text-gray-700"
                  type="text" placeholder="Enter your full name" required />
              </div>

              <div class="flex justify-between items-center border-b border-gray-100 p-3">
                <label class="font-medium text-gray-400 w-1/3">Email:</label>
                <input v-model="email"
                  class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2 w-2/3 text-gray-700"
                  type="email" placeholder="Enter your email" required />
              </div>
            </div>

            <h1 class="text-2xl font-semibold text-gray-700">Transaction Details</h1>

            <div class="bg-white shadow-md rounded-lg p-6">

              <div class="flex justify-between border-b border-gray-100 p-3">
                <span class="font-medium text-gray-400">Transaction ID:</span>
                <span class="font-bold text-gray-500">{{ payment?.paymentLinkId ?? '-' }}</span>
              </div>

              <div class="flex justify-between border-b border-gray-100 p-3">
                <span class="font-medium text-gray-400">Amount:</span>
                <span class="font-bold text-green-600">{{ payment?.amount ?? '-' }} {{ payment?.currency ?? '' }}</span>
              </div>

              <div class="flex justify-between border-b border-gray-100 p-3">
                <span class="font-medium text-gray-400">Full name:</span>
                <span class="font-bold text-gray-500">{{ fullname ?? '-' }}</span>
              </div>

              <div class="flex justify-between border-b border-gray-100 p-3">
                <span class="font-medium text-gray-400">Email:</span>
                <span class="font-bold text-gray-500">{{ email ?? '-' }}</span>
              </div>

            </div>

            <h1 class="text-2xl font-semibold text-gray-700">Select Payment Method</h1>

            <div v-for="method in paymentMethods" :key="method.name" @click="selectedPaymentMethod = method.name"
              :class="[
                'flex flex-col sm:flex-row shadow-md items-center gap-2 md:gap-25 p-3 rounded-lg',
                selectedPaymentMethod === method.name
                  ? 'bg-green-100 border-2 border-green-500 hover:-translate-y-1 hover:shadow-lg transition-transform duration-500'
                  : 'bg-white border-2 border-transparent hover:border-blue-400 hover:-translate-y-1 hover:shadow-lg transition-transform duration-500'
              ]">
              <img :src="method.icon" class="w-40 h-16 object-contain" />

              <div class="flex-1 justify-center">
                <h2 class="text-lg font-semibold text-gray-800">{{ method.name }}</h2>
                <p class="text-sm text-gray-600 mb-4">{{ method.description }}</p>
                <p class="text-sm text-green-600 mb-4">{{ method.speed }}</p>
              </div>

              <div class="text-right">
                <span class="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                  Available
                </span>
              </div>

            </div>

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
import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import type { PaymentRequest, PaymentDetailsRequest } from '@/types/payment'
import { getTransactionHeader, getTransactionMessage, getStatusColorClass } from '@/services/statusService'
import { paymentService } from '@/services/paymentService'

const route = useRoute()
const payment = ref()
const transaction = ref<any | null>(null)
const fullname = ref()
const email = ref()
const error = ref<string | null>(null)
const isExpired = ref(false)
const isNotFound = ref(false);
const isPaid = ref(false);
const isLoading = ref(true)
const redirectToProvider = ref(false)
const selectedPaymentMethod = ref<string | null>(null)

const transactionHeader = computed(() => getTransactionHeader(transaction.value?.status))
const transactionMessage = computed(() => getTransactionMessage(transaction.value?.status))
const statusColorClass = computed(() => getStatusColorClass(transaction.value?.status))

const createTransaction = async () => {

  try {

    const missingFields = []

    if (!fullname.value) missingFields.push('Full name')
    if (!email.value) missingFields.push('Email')
    if (!selectedPaymentMethod.value) missingFields.push('Payment method')

    if (missingFields.length > 0) {
      await Swal.fire({
        icon: 'warning',
        title: 'Incomplete form',
        html: `Please fill in the following fields:<br><b>${missingFields.join(', ')}</b>`,
        confirmButtonColor: '#2563eb'
      })
      return
    }

    const paymentData: PaymentRequest = {
      paymentLinkId: route.params.payment_link_id as string,
      amount: payment.value.amount,
      currency: payment.value.currency,
      paymentMethod: selectedPaymentMethod.value as string,
      fullname: fullname.value,
      email: email.value,
    }

    const responseConfirmPaymentLink = await paymentService.confirmPaymentLink(paymentData)

    if (responseConfirmPaymentLink?.link) {
      redirectToProvider.value = true
      document.body.style.overflow = 'hidden'

      setTimeout(() => {
        window.location.href = responseConfirmPaymentLink.link
      }, 800)
    }
  } catch (err: any) {

    let errorMessage = err.response?.data?.error ?? err.message ?? 'Unknown error'

    await Swal.fire({
      icon: 'error',
      title: 'Transaction error',
      text: errorMessage,
      confirmButtonColor: '#ef4444'
    })
  } finally {
    isLoading.value = false
  }
}

const getPaymentDetails = async (paymentLinkId: string) => {

  try {

    isLoading.value = true

    const paymentLinkId: PaymentDetailsRequest = {
      paymentLinkId: route.params.payment_link_id as string
    }

    const responsePaymentDetails = await paymentService.paymentDetails(paymentLinkId)
    payment.value = responsePaymentDetails.payment
    transaction.value = responsePaymentDetails.transaction

    if (transaction.value) isPaid.value = true

  } catch (err: any) {

    const statusMap: Record<number, { flag: Ref<boolean>; defaultMsg: string }> = {
      410: { flag: isExpired, defaultMsg: 'Payment link expired' },
      404: { flag: isNotFound, defaultMsg: 'Payment link not found' },
    }

    const status = err.status
    const dataError = err.data?.error

    if (status && statusMap[status]) {
      statusMap[status].flag.value = true
      error.value = dataError ?? statusMap[status].defaultMsg
    } else {
      error.value = dataError ?? err?.message ?? 'An unexpected error occurred'
    }
  }
  finally {
    isLoading.value = false
  }
}

watch(
  () => route.params.payment_link_id,
  (newId) => {
    if (newId) {
      getPaymentDetails(newId as string)
    }
  },
  { immediate: true }
)

const statusMessage = computed(() => {
  const flag = [isExpired, isNotFound].find(f => f.value)
  if (!flag && !error.value) return null

  let title = ''
  let text = error.value

  if (isExpired.value) title = 'Payment link expired'
  else if (isNotFound.value) title = 'Not found'
  else if (error.value) title = 'Error'

  if (!text) {
    if (isExpired.value) text = 'This link is no longer active. Please contact support to obtain a new one.'
    else if (isNotFound.value) text = 'The payment link was not found.'
    else text = 'An unexpected error occurred'
  }

  return {
    title,
    text,
    class: 'text-red-500',
  }
})

const paymentMethods = [
  {
    id: 1,
    name: 'TPAY',
    description: 'Fast and secure online payments',
    speed: 'Instant',
    icon: '/icons/tpay.svg',
  },
  {
    id: 2,
    name: 'PAYNOW',
    description: 'Quick payment method',
    speed: 'Instant',
    icon: '/icons/paynow.jpg',
  },
  {
    id: 3,
    name: 'NODA',
    description: 'Secure payment solution',
    speed: 'Instant',
    icon: '/icons/noda.png',
  },
]
</script>