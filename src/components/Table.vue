<template>
    <div v-if="searchable" class="flex justify-between items-center mb-4">
        <input v-model="searchQuery" type="text" placeholder="Search..."
            class="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300" />
    </div>

    <div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th v-for="header in headers" :key="header.key" @click="sortable && sortBy(header.key)"
                        class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                        :class="sortable ? 'cursor-pointer text-gray-700 hover:text-blue-600' : 'text-gray-500'">
                        <div class="flex items-center gap-1">
                            <span>{{ header.label }}</span>
                            <span v-if="sortable && sortColumn === header.key" class="text-blue-600">
                                {{ sortDirection === 'asc' ? '▲' : '▼' }}
                            </span>
                        </div>
                    </th>
                    <th v-if="$slots['row-actions']" class="px-6 py-4"></th>
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="(row, index) in paginatedData" :key="index" class="hover:bg-blue-50 transition">
                    <td v-for="header in headers" :key="header.key" class="px-6 py-4 text-sm text-gray-800">
                        <template v-if="header.isStatus && row[header.key] && typeof row[header.key] === 'object'">
                            <span :class="(row[header.key] as StatusObject).class">
                                {{ (row[header.key] as StatusObject).text }}
                            </span>
                        </template>
                        <template v-else>
                            {{ row[header.key] }}
                        </template>
                    </td>
                    <td v-if="$slots['row-actions']">
                        <slot name="row-actions" :row="row"></slot>
                    </td>
                </tr>
                <tr v-if="paginatedData.length === 0">
                    <td :colspan="headers.length + ($slots['row-actions'] ? 1 : 0)"
                        class="text-center py-6 text-gray-500 text-sm">
                        No results found
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="paginated && totalPages > 1" class="flex justify-between items-center mt-6">
        <p class="text-sm text-gray-500">
            Showing {{ showingCount.start }} - {{ showingCount.end }} of {{ sortedData.length }} results
        </p>

        <div class="flex items-center gap-3">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-3 py-2 bg-gray-100 text-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-200">
                ‹
            </button>

            <div class="flex items-center gap-2">
                <button v-for="page in visiblePages" :key="page + '-p'"
                    @click="page !== '...' && goToPage(Number(page))" :disabled="page === '...'"
                    class="px-4 py-2 rounded-md border text-sm" :class="page === currentPage
                        ? 'bg-blue-100 text-gray-700 border-blue-300'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'">
                    {{ page }}
                </button>
            </div>

            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-3 py-2 bg-gray-100 text-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-200">
                ›
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Header {
    label: string
    key: string
    isStatus?: boolean
    isDate?: boolean
}

interface StatusObject {
    text: string
    class: string
}

const props = defineProps<{
    headers: Header[]
    data: Array<Record<string, any>>
    perPage?: number
    searchable?: boolean
    sortable?: boolean
    paginated?: boolean
}>()

const searchQuery = ref('')
const sortColumn = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

const filteredData = computed(() => {
    if (!props.data) return []
    if (!searchQuery.value) return props.data
    const q = searchQuery.value.toLowerCase()
    return props.data.filter(row =>
        Object.values(row).some(val => String(val).toLowerCase().includes(q))
    )
})

function sortBy(column: string) {
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortColumn.value = column
        sortDirection.value = 'asc'
    }
}

const sortedData = computed(() => {
    if (!sortColumn.value) return filteredData.value
    return [...filteredData.value].sort((a, b) => {
        const aVal = a[sortColumn.value!]
        const bVal = b[sortColumn.value!]

        if (aVal == null) return 1
        if (bVal == null) return -1

        let comparison = 0

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            comparison = aVal - bVal
        } else if (aVal instanceof Date && bVal instanceof Date) {
            comparison = aVal.getTime() - bVal.getTime()
        } else {
            comparison = String(aVal).localeCompare(String(bVal))
        }

        return sortDirection.value === 'asc' ? comparison : -comparison
    })
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / (props.perPage ?? 5)))

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * (props.perPage ?? 5)
    const end = start + (props.perPage ?? 5)
    return sortedData.value.slice(start, end)
})

const showingCount = computed(() => {
    if (!sortedData.value.length) return { start: 0, end: 0 }
    const start = (currentPage.value - 1) * (props.perPage ?? 5) + 1
    const end = Math.min(currentPage.value * (props.perPage ?? 5), sortedData.value.length)
    return { start, end }
})

function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
    if (currentPage.value > 1) currentPage.value--
}
function goToPage(page: number) {
    currentPage.value = page
}

const visiblePages = computed(() => {
    const pages: (number | string)[] = []
    const total = totalPages.value
    const current = currentPage.value
    if (total <= 5) return [...Array(total)].map((_, i) => i + 1)
    pages.push(1)
    if (current > 3) pages.push('...')
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (current < total - 2) pages.push('...')
    pages.push(total)
    return pages
})
</script>