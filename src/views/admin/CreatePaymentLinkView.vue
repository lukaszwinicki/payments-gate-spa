<template>
    <div class="flex justify-center">
        <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md space-y-5">
            <div>
                <FormInput v-model=amount label="Amount" id="amount" type="number" placeholder="Enter your amount"
                    required />
            </div>
            <div>
                <FormInput v-model=currency label="Currency" id="currency" type="text" placeholder="Enter your currency"
                    required />
            </div>
            <div>
                <FormInput v-model=expiresAt label="Expires at" id="expiresAt" type="datetime-local" required />
            </div>
            <div>
                <FormInput v-model=notificationUrl label="Notification url" id="notification-url" type="url"
                    placeholder="Enter your notification url" required />
            </div>
            <div>
                <FormInput v-model=returnUrl label="Return url" id="return-url" type="url"
                    placeholder="Enter your return url" required />
            </div>
            <div class="pt-2">
                <button type="submit"
                    class="w-full bg-slate-400 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                    Create Payment Link
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import FormInput from '@/components/FormInput.vue';
</script>