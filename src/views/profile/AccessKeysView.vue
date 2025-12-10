<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 relative">
        <h2 class="text-xl font-semibold text-gray-800">Your API Credentials</h2>

        <div class="relative">
            <label class="block text-sm font-medium text-gray-600 mb-1">API Key</label>
            <input type="text" :value="apiKey" readonly @click="copyToClipboard(apiKey, 'api')"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <span v-if="copied.api"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-sm font-medium">
                Copied!
            </span>
        </div>

        <div class="relative">
            <label class="block text-sm font-medium text-gray-600 mb-1">Secret Key</label>
            <input type="text" :value="secretKey" readonly @click="copyToClipboard(secretKey, 'secret')"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <span v-if="copied.secret"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-sm font-medium">
                Copied!
            </span>
        </div>

        <div v-if="isLoading" class="absolute inset-0 z-20 flex items-center justify-center
            bg-white/40 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500
                rounded-full animate-spin"></div>
        </div>

        <p class="text-gray-500 text-sm">
            Click on a key to copy it to your clipboard.
        </p>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

const isLoading = ref(false)
const apiKey = ref("")
const secretKey = ref("")
const copied = reactive({ api: false, secret: false })

function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        copied[type] = true
        setTimeout(() => (copied[type] = false), 1500)
    })
}

onMounted(async () => {
    isLoading.value = true;
    try {
        const { data } = await axios.get('/api/access-keys');
        apiKey.value = data.apiKey;
        secretKey.value = data.secretKey;
    } finally {
        isLoading.value = false;
    }
});
</script>
