<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="space-y-4">
        <h1 class="text-9xl font-bold text-purple-600">503</h1>
        <h2 class="text-3xl font-bold text-gray-700">Service Unavailable</h2>
        <p class="text-gray-500 text-lg">
          The service is temporarily unavailable. Please try again later.
        </p>
      </div>

      <div class="pt-4 space-y-4">
        <button @click="goHome"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
          Go to Home
        </button>
        <button @click="reload"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200">
          Reload Page
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const goHome = () => {
  if (authStore.isAuthenticated) {
    router.push('/merchant/dashboard')
  } else {
    router.push('/login')
  }
}

const reload = () => {
  window.location.reload()
}
</script>
