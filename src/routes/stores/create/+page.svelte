<script lang="ts">
	import { api } from '$lib/api';
	import { goto } from '$app/navigation';

	let name = '';
	let location = '';
	let shopify_store_stub = '';
	let access_token = '';
	let webhook_signature = '';
	let location_id = '';
	let error: string | null = null;
	let loading = false;

	async function createStore() {
		try {
			loading = true; // Show loading state
			error = null; // Clear previous errors

			await api('/api/stores', {
				method: 'POST',
				body: JSON.stringify({
					name,
					location,
					shopify_store_stub,
					access_token,
					webhook_signature,
					location_id,
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			goto('/stockgroups');
		} catch (err) {
			error = err.message || 'Failed to create the store. Please try again.';
			console.error('Error creating store:', err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen bg-gray-50 p-6">
	<h1 class="text-3xl font-bold text-gray-800 mb-6">Create a New Store</h1>

	<form on:submit|preventDefault={createStore} class="space-y-4 bg-white p-6 rounded-lg shadow-md">
		{#if error}
			<p class="text-red-600 font-semibold">{error}</p>
		{/if}

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<label class="block text-sm font-medium text-gray-700">Store Name</label>
				<input
					bind:value={name}
					placeholder="Store Name"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700">Location</label>
				<input
					bind:value={location}
					placeholder="Location"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700">Shopify Store Stub</label>
				<input
					bind:value={shopify_store_stub}
					placeholder="Shopify Store Stub"
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700">Access Token</label>
				<input
					bind:value={access_token}
					placeholder="Access Token"
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700">Webhook Signature</label>
				<input
					bind:value={webhook_signature}
					placeholder="Webhook Signature"
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700">Location ID</label>
				<input
					bind:value={location_id}
					placeholder="Location ID"
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
				/>
			</div>
		</div>

		<button
			type="submit"
			class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
			disabled={loading}
		>
			{#if loading} Creating... {/if}
			{#if !loading} Create Store {/if}
		</button>
	</form>
</div>
