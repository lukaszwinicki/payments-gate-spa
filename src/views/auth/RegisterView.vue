<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div class="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-gray-700 mb-2">Create Account</h1>
                <p class="text-gray-500">Fill in your details to get started</p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-5">

                <div>
                    <label for="name" class="block text-gray-600 font-medium mb-1">Full Name</label>
                    <input v-model="name" type="text" id="name" required placeholder="Enter your full name"
                        class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
                </div>

                <div>
                    <label for="email" class="block text-gray-600 font-medium mb-1">Email</label>
                    <input v-model="email" type="email" id="email" required placeholder="Enter your email"
                        class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
                </div>

                <div>
                    <label for="password" class="block text-gray-600 font-medium mb-1">Password</label>
                    <input v-model="password" type="password" id="password" required placeholder="Create a password"
                        class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
                </div>

                <div>
                    <label for="confirm" class="block text-gray-600 font-medium mb-1">Confirm Password</label>
                    <input v-model="confirmPassword" type="password" id="confirm" required
                        placeholder="Repeat your password"
                        class="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
                </div>

                <div class="pt-2">
                    <button type="submit"
                        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                        Create Account
                    </button>
                </div>
            </form>

            <div v-if="isLoading" class="flex justify-center items-center py-4">
                <div class="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <div v-if="message" class="text-center text-green-600 font-medium">
                {{ message }}
            </div>
            <div v-if="errorMessage" class="text-center text-red-500 font-medium">
                {{ errorMessage }}
            </div>

            <div class="text-center text-gray-500 text-sm pt-4">
                Already have an account?
                <router-link to="/login" class="text-blue-600 hover:underline font-medium">Log in</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const message = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
    isLoading.value = true;
    errorMessage.value = "";

    try {
        const registerResponse = await axios.post("/api/register", {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value,
        });

        localStorage.setItem('token_expiry', registerResponse.data.expiresAt)
        localStorage.setItem('token', registerResponse.data.token);

        router.push("/admin");
    } catch (error) {
        if (error.response?.data?.errors) {
            errorMessage.value = Object.values(error.response.data.errors).flat().join(' ');
        } else {
            errorMessage.value = error.response?.data?.message || 'Registration failed';
        }
    } finally {
        isLoading.value = false;
    }
}
</script>