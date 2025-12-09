<template>
    <div class="min-h-screen flex bg-gray-50 text-gray-800">
        <aside class="w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed inset-y-0 z-40">
            <div>
                <div class="p-6 border-b border-gray-100">
                    <h1 class="text-2xl font-bold text-black">Admin Panel</h1>
                </div>
                <nav class="flex flex-col p-4 space-y-1">
                    <RouterLink v-for="link in navigationLinks" :key="link.name" :to="link.to"
                        class="flex items-center px-4 py-2 font-semibold text-gray-500 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        :class="{ 'bg-blue-100 text-blue-500 font-semibold': $route.path === link.to }">
                        <component :is="link.icon" class="w-5 h-5 mr-3" />
                        {{ link.name }}
                    </RouterLink>
                </nav>
            </div>

            <div class="p-4 border-t border-gray-100 text-sm text-gray-500">
                <button @click="handleLogout" class="w-full text-left text-red-500 font-semibold hover:text-red-500">
                    Logout
                </button>
            </div>
        </aside>
        <div class="flex-1 ml-64 min-h-screen flex flex-col">
            <header class="bg-white shadow-sm border-b border-gray-100 px-6 py-5 flex justify-between items-center">
                <div class="text-2xl font-bold text-gray-800 mb-2">
                    {{ currentPage }}
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-sm text-gray-600">
                        Hello, <span class="font-semibold">{{ user.name }}</span>
                    </div>
                    <img class="w-10 h-10 rounded-full border" :src="user.avatar" alt="User avatar" />
                </div>
            </header>
            <main class="flex-1 p-6 bg-gray-50 overflow-y-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed } from 'vue'
import {
    LinkIcon,
    ServerIcon,
    ReceiptRefundIcon,
    KeyIcon,
    BanknotesIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)


const user = {
    name: 'Admin User',
    avatar:
        'https://ui-avatars.com/api/?background=random&color=fff&name=Admin+User',
}

const navigationLinks = [
    { name: 'Transactions', to: '/admin/transactions', icon: BanknotesIcon },
    { name: 'Create Transaction', to: '/admin/create-transaction', icon: ServerIcon },
    { name: 'Create Payment Link', to: '/admin/create-payment-link', icon: LinkIcon },
    { name: 'Payment Refunds', to: '/admin/payment-refunds', icon: ReceiptRefundIcon },
    { name: 'Access Keys', to: '/admin/access-keys', icon: KeyIcon }
]

const currentPage = computed(() => {
    const page = navigationLinks.find(link => link.to === route.path)
    return page ? page.name : 'Unknown Page'
})

const handleLogout = async () => {
    isLoading.value = true
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
}
</script>