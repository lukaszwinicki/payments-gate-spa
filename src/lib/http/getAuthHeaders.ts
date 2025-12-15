export const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token')
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    return headers
}