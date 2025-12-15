<template>
    <div class="flex justify-center">
        <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md space-y-5">
            <div>
                <FormInput v-model=fullname label="Full name" id="fullname" type="text"
                    placeholder="Enter your full name" required />
            </div>
            <div>
                <FormInput v-model=email label="Email" id="email" type="text" placeholder="Enter your email" required />
            </div>
            <div>
                <FormInput v-model=amount label="Amount" id="amount" type="number" placeholder="Enter your amount"
                    required />
            </div>
            <div>
                <FormInput v-model=currency label="Currency" id="currency" type="text" placeholder="Enter your currency"
                    required />
            </div>
            <div>
                <FormSelect v-model="selectedPaymentMethod" label="Payment Method" id="payment-method"
                    :options="paymentMethods" required />
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
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                    Create Transaction
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import FormInput from '@/components/FormInput.vue';
import FormSelect from '@/components/FormSelect.vue';
import { PaymentMethod } from '@/enums/PaymentMethod';

const paymentMethods = Object.values(PaymentMethod);

</script>