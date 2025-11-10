<template>
    <div class="flex justify-center">
        <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md space-y-5">
            <div>
                <FormInput v-model=uuid label="Transaction UUID" id="uuid" type="text" placeholder="Enter your transaction uuid"
                    required />
            </div>
            <div class="pt-2">
                <button type="submit"
                    class="w-full bg-slate-400 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                    Refund Payment
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import FormInput from '@/components/FormInput.vue';

</script>