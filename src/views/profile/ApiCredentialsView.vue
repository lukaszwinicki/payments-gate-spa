<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 relative">
        <PageHeader title="Your API Credentials" :icon="ShieldCheckIcon" />
        <div class="space-y-3">
            <CopyableInput label="API Key" :value="visibleApiKey" :copyValue="apiKey"
                hint="Click to copy the API Key" />

            <button @click="toggleApiKey" class="inline-flex items-center gap-2 px-3 py-1.5 text-sm
                       bg-gray-100 hover:bg-gray-200 rounded-md transition">
                <EyeIcon v-if="!showApiKey" class="w-4 h-4" />
                <EyeSlashIcon v-else class="w-4 h-4" />
                {{ showApiKey ? 'Hide' : 'Show' }} API Key
            </button>
        </div>

        <div class="space-y-3">
            <CopyableInput label="Secret Key" :value="visibleSecretKey" :copyValue="secretKey"
                hint="Click to copy the Secret Key" />

            <button @click="toggleSecretKey" class="inline-flex items-center gap-2 px-3 py-1.5 text-sm
                       bg-gray-100 hover:bg-gray-200 rounded-md transition">
                <EyeIcon v-if="!showSecretKey" class="w-4 h-4" />
                <EyeSlashIcon v-else class="w-4 h-4" />
                {{ showSecretKey ? 'Hide' : 'Show' }} Secret Key
            </button>
        </div>

        <p class="text-gray-500 text-sm text-center">
            Keep your secret key secure. Never expose it in client-side code.
        </p>

        <div v-if="isLoading" class="absolute inset-0 z-20 flex items-center justify-center
                   bg-white/60 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ShieldCheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import CopyableInput from '@/components/CopyableInput.vue'
import PageHeader from '@/components/PageHeader.vue'
import { transactionService } from '@/services/transactions/TransactionService'

const apiKey = ref('')
const secretKey = ref('')
const showApiKey = ref(false)
const showSecretKey = ref(false)
const isLoading = ref(false)

const maskValue = (value: string | null | undefined, visible: boolean) => {
    if (!value) return ''
    return visible ? value : '••••••••••••••••••••••••'
}

const visibleApiKey = computed(() =>
    maskValue(apiKey.value, showApiKey.value)
)

const visibleSecretKey = computed(() =>
    maskValue(secretKey.value, showSecretKey.value)
)

const toggleApiKey = () => {
    showApiKey.value = !showApiKey.value
}

const toggleSecretKey = () => {
    showSecretKey.value = !showSecretKey.value
}

onMounted(async () => {
    isLoading.value = true
    try {
        const apiCredentials = await transactionService.getApiCredentials()
        apiKey.value = apiCredentials.apiKey
        secretKey.value = apiCredentials.secretKey
    } finally {
        isLoading.value = false
    }
})
</script>
