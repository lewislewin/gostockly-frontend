import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
    const token = cookies.get('auth_token') // Get the token from cookies

    if (!token) {
        throw new Error('Unauthorized') // Ensure the user is logged in
    }

    const { id } = params // Get the store ID from the route parameters

    const response = await fetch(`http://localhost:8080/api/stores/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch store: ${response.status}`)
    }

    const store = await response.json()
    return { store }
}
