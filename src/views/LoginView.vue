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

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center text-gray-600">
            <input v-model="rememberMe" type="checkbox" class="mr-2 text-blue-600 focus:ring-blue-500 rounded" />
            Remember me
          </label>
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

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await axios.get("/sanctum/csrf-cookie");

    await axios.post("/login", {
      email: email.value,
      password: password.value,
      remember: rememberMe.value,
    });
    router.push("/admin");
  } catch (error) {
    if (error.response.status === 422) {
      errorMessage.value = "Invalid credentials";
    } else {
      errorMessage.value = "An error occurred";
    }
    if (error.response.status === 423) {
      errorMessage.value = "Account is locked";
    }
  } finally {
    isLoading.value = false;
  }
}
</script>