<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 relative">

        <div class="flex items-center gap-3">
            <ShieldCheckIcon class="w-7 h-7 text-blue-600" />
            <h2 class="text-xl font-semibold text-gray-800">
                Your API Credentials
            </h2>
        </div>

        <CopyableInput label="API Key" :value="apiKey" hint="Click to copy the API KEY" />

        <div class="space-y-3">
            <CopyableInput label="Secret Key" :value="visibleSecretKey" :copyValue="secretKey"
                hint="Click to copy the Secret Key" />

            <div class="flex gap-3">
                <button @click="toggleSecret" class="inline-flex items-center gap-2 px-3 py-1.5 text-sm
             bg-gray-100 hover:bg-gray-200 rounded-md transition">
                    <EyeIcon v-if="!showSecret" class="w-4 h-4" />
                    <EyeSlashIcon v-else class="w-4 h-4" />
                    {{ showSecret ? 'Hide' : 'Show' }} Secret Key
                </button>
            </div>
        </div>

        <p class="text-gray-500 text-sm text-center">
            Keep your secret key secure. Never expose it in client-side code.
        </p>

        <div v-if="isLoading"
            class="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { ShieldCheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import CopyableInput from '@/components/CopyableInput.vue'

const apiKey = ref('')
const secretKey = ref('')
const showSecret = ref(false)
const isLoading = ref(false)

const visibleSecretKey = computed(() =>
    showSecret.value
        ? secretKey.value
        : secretKey.value
            ? '••••••••••••••••••••••••'
            : ''
)

function toggleSecret() {
    showSecret.value = !showSecret.value
}

onMounted(async () => {
    isLoading.value = true
    try {
        const { data } = await axios.get('/api/access-keys')
        apiKey.value = data.apiKey
        secretKey.value = data.secretKey
    } finally {
        isLoading.value = false
    }
})

</script>
