<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-700 mb-2">Reset Password</h1>
        <p class="text-gray-500">Enter your new password below.</p>
      </div>

      <form @submit.prevent="handleReset" class="space-y-5">

        <div>
          <label for="email" class="block text-gray-600 font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" id="email" required placeholder="Enter your email"
            class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
        </div>

        <div>
          <label for="password" class="block text-gray-600 font-medium mb-1">New Password</label>
          <input v-model="form.password" type="password" id="password" required placeholder="Enter new password"
            class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
        </div>

        <div>
          <label for="password_confirmation" class="block text-gray-600 font-medium mb-1">Confirm Password</label>
          <input v-model="form.password_confirmation" type="password" id="password_confirmation" required
            placeholder="Confirm new password"
            class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
        </div>

        <div class="pt-2">
          <button type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
            Reset Password
          </button>
        </div>
      </form>

      <div v-if="isLoading" class="flex justify-center items-center py-4">
        <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-if="message" class="text-center text-green-600 font-medium">
        {{ message }}
      </div>
      <div v-if="errorMessage" class="text-center text-red-500 font-medium">
        {{ errorMessage }}
      </div>

      <div class="text-center text-gray-500 text-sm pt-4">
        Remember your password?
        <router-link to="/login" class="text-blue-600 hover:underline font-medium">
          Back to login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";

const route = useRoute();
const router = useRouter();

const form = ref({
  token: route.params.token,
  email: route.query.email || '',
  password: '',
  password_confirmation: ''
});

const isLoading = ref(false);
const message = ref('');
const errorMessage = ref('');

const handleReset = async () => {
  isLoading.value = true;
  message.value = '';
  errorMessage.value = '';

  try {
    await axios.get('/sanctum/csrf-cookie');
    const res = await axios.post('/reset-password', form.value);
    message.value = res.data.status || 'Password has been reset successfully.';
    setTimeout(() => {
      router.push('/login');
    }, 1500);

  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Something went wrong.';
  } finally {
    isLoading.value = false;
  }
}
</script>
