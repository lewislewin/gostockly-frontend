<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '$lib/api';

	let stores = [];
	let error: string | null = null;
	let loading = true; // Loading state

	onMount(async () => {
		try {
			const storesResponse = await api('/api/stores', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			stores = storesResponse;
		} catch (err) {
			error = err.message || 'An unexpected error occurred.';
			console.error('Error fetching stores:', err);
		} finally {
			loading = false; // End loading state
		}
	});
</script>

<div class="min-h-screen bg-gray-50 p-6">
	<h1 class="text-3xl font-bold text-gray-800 mb-4">Your Stores</h1>

	<!-- Display loading state -->
	{#if loading}
		<p class="text-gray-600">Loading stores...</p>

	<!-- Display error or fallback messages -->
	{:else if error}
		<p class="text-red-600 font-semibold">Error: {error}</p>
	{:else if stores.length === 0}
		<p class="text-gray-600 italic">No stores available. Add your first store to get started!</p>
	{:else}
		<ul class="space-y-3">
			{#each stores as store}
				<li>
					<a
						href={`/stores/${store.id}`}
						class="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 p-4 border border-gray-200"
					>
						<p class="font-semibold text-gray-700">
							{store.shopify_store_stub || `Store ID: ${store.id}`}
						</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
