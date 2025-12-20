<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-700 mb-2">Sign In</h1>
        <p class="text-gray-500">Access your account to continue</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block text-gray-600 font-medium mb-1">Email</label>
          <input v-model="email" type="email" id="email" required placeholder="Enter your email"
            class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
        </div>

        <div>
          <label for="password" class="block text-gray-600 font-medium mb-1">Password</label>
          <input v-model="password" type="password" id="password" required placeholder="Enter your password"
            class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
        </div>

        <div class="flex items-center justify-end text-sm">
          <router-link to="/forgot-password" class="text-blue-600 hover:underline font-medium">Forgot
            password?</router-link>
        </div>

        <div class="pt-4">
          <button type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
            Log In
          </button>
        </div>

      </form>

      <div v-if="isLoading" class="flex justify-center items-center py-4">
        <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-if="errorMessage" class="text-center text-red-500 font-medium pt-2">
        {{ errorMessage }}
      </div>

      <div class="text-center text-gray-500 text-sm pt-4">
        Don’t have an account?
        <router-link to="/register" class="text-blue-600 hover:underline font-medium">Create one</router-link>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import type { LoginRequest } from "@/types/auth/AuthTypes";
import { authService } from "@/services/auth/AuthService";

const router = useRouter()
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const loginData: LoginRequest = {
      email: email.value,
      password: password.value,
    }

    const loginResponse = await authService.login(loginData)
    localStorage.setItem('token_expiry', loginResponse.expiresAt)
    localStorage.setItem('token', loginResponse.token)
    router.push("/merchant/dashboard");

  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMessage.value = err.message
    } else if (typeof err === 'object' && err !== null && 'response' in err) {
      const resp: any = (err as any).response
      errorMessage.value = resp?.data?.error ?? 'Login failed'
    } else {
      errorMessage.value = 'Login failed. Please try again.'
    }
  } finally {
    isLoading.value = false;
  }
}
</script>