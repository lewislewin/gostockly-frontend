import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('auth_token') // Get the token from cookies

    if (!token) {
        throw new Error('Unauthorized') // Ensure the user is logged in
    }

    const response = await fetch('http://localhost:8080/api/stores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch stores: ${response.status}`)
    }

    const stores = await response.json()
    return { stores }
}
