<template>
    <div class="bg-white shadow-md rounded-lg p-6">

        <div class="flex justify-between items-center mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search..."
                class="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>

        <div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table class="min-w-full divide-y divide-gray-200">

                <thead class="bg-gray-50">
                    <tr>
                        <th v-for="(header, index) in props.headers" :key="index" @click="sortBy(header)" class="px-6 py-4 text-left text-xs font-semibold 
                                   text-gray-700 uppercase tracking-wide cursor-pointer
                                   hover:text-blue-600 transition select-none">

                            <div class="flex items-center gap-1">
                                <span>{{ header }}</span>

                                <span v-if="sortColumn === header" class="text-blue-600">
                                    {{ sortDirection === 'asc' ? '▲' : '▼' }}
                                </span>
                            </div>
                        </th>

                    </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-100">

                    <tr v-for="(row, index) in paginatedData" :key="index" class="hover:bg-blue-50 transition">
                        <td v-for="(value, key) in row" :key="key" class="px-6 py-4 text-sm text-gray-800">
                            <span v-if="key === 'Status'" :class="value.class">
                                {{ value.text }}
                            </span>
                            <span v-else>{{ value }}</span>
                        </td>
                        <div class="flex justify-left items-center">
                            <slot name="row-actions" :row="row"></slot>
                        </div>
                    </tr>
                    <tr v-if="paginatedData.length === 0">
                        <td :colspan="props.headers.length + 1" class="text-center py-6 text-gray-500 text-sm">
                            No results found
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="flex justify-between items-center mt-6">
            <p class="text-sm text-gray-500">
                Showing {{ paginatedData.length }} of {{ sortedData.length }} results
            </p>

            <div class="flex items-center gap-3">

                <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-2 bg-gray-100 text-gray-600 rounded-md 
                           disabled:opacity-50 hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div class="flex items-center gap-2">
                    <button v-for="page in visiblePages" :key="page + '-p'" @click="page !== '...' && goToPage(page)"
                        :disabled="page === '...'" class="px-4 py-2 rounded-md border text-sm" :class="page === currentPage
                            ? 'bg-blue-100 text-gray-700 border-blue-300'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'">
                        {{ page }}
                    </button>
                </div>

                <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-2 bg-gray-100 text-gray-600 rounded-md 
                           disabled:opacity-50 hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = defineProps({
    headers: Array,
    data: Array,
    perPage: { type: Number, default: 5 }
})

const searchQuery = ref('')

const filteredData = computed(() => {
    if (!searchQuery.value) return props.data
    const q = searchQuery.value.toLowerCase()
    return (props.data ?? []).filter(row =>
        row && typeof row === 'object' && Object.values(row as object).some(val =>
            String(val).toLowerCase().includes(q)
        )
    )
})

const sortColumn = ref(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

function sortBy(column: string) {
    sortDirection.value =
        sortColumn.value === column && sortDirection.value === 'asc'
            ? 'desc'
            : 'asc'
    sortColumn.value = column
}

const sortedData = computed(() => {
    if (!sortColumn.value) return filteredData.value

    return [...filteredData.value].sort((a, b) => {
        let x = a[sortColumn.value]
        let y = b[sortColumn.value]

        x = typeof x === 'string' ? x.toLowerCase() : x
        y = typeof y === 'string' ? y.toLowerCase() : y

        if (sortDirection.value === 'asc') return x > y ? 1 : -1
        return x < y ? 1 : -1
    })
})

const currentPage = ref(1)
const totalPages = computed(() =>
    Math.ceil(sortedData.value.length / props.perPage)
)

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * props.perPage
    return sortedData.value.slice(start, start + props.perPage)
})

function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
    if (currentPage.value > 1) currentPage.value--
}
function goToPage(page) {
    currentPage.value = page
}

const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 5) return [...Array(total)].map((_, i) => i + 1)

    pages.push(1)

    if (current > 3) pages.push("...")

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (current < total - 2) pages.push("...")

    pages.push(total)

    return pages
})
</script>
