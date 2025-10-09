<template>
   <div class="min-h-screen bg-slate-200 py-8 px-4">
    <div class="max-w-3xl mx-auto flex flex-col gap-6">
      
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-700 p-4">Payment Summary</h1>
        <p class="text-gray-500">Review your transaction details and select payment method</p>
      </div>

      <h1 class="text-2xl font-semibold text-gray-700">Transaction Details</h1>

      <div class="bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-between border-b border-gray-100 p-3">
          <span class="font-medium text-gray-400">Transaction ID:</span>
          <span class="font-bold text-gray-500">11</span>
        </div>  
        <div class="flex justify-between border-b border-gray-100 p-3">
          <span class="font-medium text-gray-400">Description</span>
          <span class="font-bold text-gray-500">Test description</span>
        </div>
        <div class="flex justify-between border-b border-gray-100 p-3">
          <span class="font-medium text-gray-400">Amount:</span>
          <span class="font-bold text-green-600">123 PLN</span>
        </div>
        <div class="flex justify-between border-b border-gray-100 p-3">
          <span class="font-medium text-gray-400">Email:</span>
          <span class="font-bold text-gray-500">test@test.com</span>
        </div>
        <div class="flex justify-between p-3">
          <span class="font-medium text-gray-400">Status:</span>
          <span class="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">Paid</span>
        </div>
      </div>

      <h1 class="text-2xl font-semibold text-gray-700">Select Payment Method</h1>

      <div 
        v-for="method in paymentMethods"
        :key="method.id"
        @click="selectedPaymentMethod = method.id"
        :class="[
          'flex flex-col sm:flex-row items-center gap-2 md:gap-25 p-3 rounded-lg',
          selectedPaymentMethod === method.id
            ? 'bg-green-100 border-2 border-green-500 hover:-translate-y-1 hover:shadow-lg transition-transform duration-500'
            : 'bg-white border-2 border-transparent hover:border-blue-400 hover:-translate-y-1 hover:shadow-lg transition-transform duration-500'
        ]"
      >
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
          @click="confirmPayment"> Confirm payment
        </button>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const paymentMethods = [
  {
    id: 1,
    name: 'TPay',
    description: 'Fast and secure online payments',
    speed: 'Instant',
    icon: '/icons/tpay.svg',
  },
  {
    id: 2,
    name: 'PayNow',
    description: 'Quick payment method',
    speed: 'Instant',
    icon: '/icons/paynow.jpg',
  },
  {
    id: 3,
    name: 'Noda',
    description: 'Secure payment solution',
    speed: 'Instant',
    icon: '/icons/noda.png',
  },
]

const selectedPaymentMethod = ref<number | null>(null)

function confirmPayment() {
  if (selectedPaymentMethod.value === null) {
    alert('Please select payment')
  } else {
    alert(`Payment method confirmed ID: ${selectedPaymentMethod.value}`)
  }
}

</script>
  