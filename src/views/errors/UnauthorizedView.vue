<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="space-y-4">
        <h1 class="text-9xl font-bold text-red-600">401</h1>
        <h2 class="text-3xl font-bold text-gray-700">Unauthorized</h2>
        <p class="text-gray-500 text-lg">
          You need to be authenticated to access this resource.
        </p>
      </div>

      <div class="pt-4 space-y-4">
        <button @click="goToLogin"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
          Go to Login
        </button>
        <button @click="goHome"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200">
          Go to Home
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

const goToLogin = () => {
  router.push('/login')
}

const goHome = () => {
  if (authStore.isAuthenticated) {
    router.push('/merchant/dashboard')
  } else {
    router.push('/login')
  }
}
</script>
