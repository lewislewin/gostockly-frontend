<script lang="ts">
	import { api } from '$lib/api';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let company_name = '';
	let subdomain = '';
	let error: string | null = null;
	let loading = false;

	async function register() {
		try {
			loading = true; // Show loading state
			error = null; // Clear any previous errors

			// Call the registration API
			await api('/auth/register', {
				method: 'POST',
				body: JSON.stringify({ email, password, company_name, subdomain }),
				headers: { 'Content-Type': 'application/json' },
			});

			// Redirect to login page or dashboard
			goto('/stores');
		} catch (err) {
			error = err.message || 'Failed to register. Please try again.';
			console.error('Registration error:', err);
		} finally {
			loading = false; // End loading state
		}
	}
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
	<div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
		<h1 class="text-2xl font-bold text-gray-800 mb-6">Register Your Account</h1>

		<form on:submit|preventDefault={register} class="space-y-4">
			{#if error}
				<p class="text-red-600 font-semibold">{error}</p>
			{/if}

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					id="email"
					bind:value={email}
					type="email"
					placeholder="Enter your email"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					id="password"
					bind:value={password}
					type="password"
					placeholder="Enter a secure password"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="company_name" class="block text-sm font-medium text-gray-700">Company Name</label>
				<input
					id="company_name"
					bind:value={company_name}
					type="text"
					placeholder="Enter your company name"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="subdomain" class="block text-sm font-medium text-gray-700">Subdomain</label>
				<input
					id="subdomain"
					bind:value={subdomain}
					type="text"
					placeholder="Enter your desired subdomain"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
				disabled={loading}
			>
				{#if loading} Registering... {/if}
				{#if !loading} Register {/if}
			</button>
		</form>

		<p class="text-sm text-gray-600 mt-4">
			Already have an account? <a href="/login" class="text-indigo-600 hover:underline">Login here</a>.
		</p>
	</div>
</div>
