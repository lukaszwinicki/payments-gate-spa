<template>
    <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
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

        <p class="text-gray-500 text-sm">
            Click on a key to copy it to your clipboard.
        </p>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const apiKey = ref('037fa239-e970-49c0-b990-6eed62947a97')
const secretKey = ref('037fa239-e970-49c0-b990-6eed62947a97')

const copied = reactive({ api: false, secret: false })

function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        copied[type] = true
        setTimeout(() => (copied[type] = false), 1500)
    })
}
</script>