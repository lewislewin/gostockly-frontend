<script lang="ts">
	import { api } from '$lib/api'
	import { goto } from '$app/navigation'

	let email = ''
	let password = ''
	let error: string | null = null
	let loading = false

	async function login() {
		try {
			loading = true
			error = null

			const { token } = await api('/auth/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: { 'Content-Type': 'application/json' },
			})

			// Use `Set-Cookie` in response headers instead of manually setting it in `document.cookie`
			document.cookie = `auth_token=${token}; Path=/; Secure; SameSite=Lax`

			// Ensure token is stored before navigating
			await new Promise((resolve) => setTimeout(resolve, 100)) // Short delay to ensure cookie is set

			goto('/') // Redirect after successful login
		} catch (err) {
			error = err.message || 'Invalid email or password. Please try again.'
			console.error('Error logging in:', err)
		} finally {
			loading = false
		}
	}
</script>


<div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Login to Your Account</h1>

        <form on:submit|preventDefault={login} class="space-y-4">
            {#if error}
                <p class="text-red-600 font-semibold">{error}</p>
            {/if}

            <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                    bind:value={email}
                    type="email"
                    placeholder="Email"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <input
                    bind:value={password}
                    type="password"
                    placeholder="Password"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {#if loading} Logging in... {/if}
                {#if !loading} Login {/if}
            </button>
        </form>

        <p class="text-sm text-gray-600 mt-4">
            Don’t have an account? <a href="/register" class="text-indigo-600 hover:underline">Sign up here</a>.
        </p>
    </div>
</div>
