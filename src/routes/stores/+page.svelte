<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '$lib/api'; // Use the `api` helper function

	let stores = []; // Initialise stores as an empty array
	let error: string | null = null; // Optional: Handle errors

	// Fetch stores on component mount
	onMount(async () => {
		try {
			// Use the `api` helper function for the request
			const storesResponse = await api('/api/stores', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			// Update the stores with the response
			stores = storesResponse; // `api` already returns JSON
		} catch (err) {
			// Handle and display errors
			error = err.message || 'An unexpected error occurred.';
			console.error('Error fetching stores:', err);
		}
	});
</script>

<h1>Your Stores</h1>

<!-- Display error or fallback messages -->
{#if error}
	<p style="color: red;">Error: {error}</p>
{:else if stores.length === 0}
	<p>No stores available.</p>
{:else}
	<ul>
		{#each stores as store}
			<li><a href={`/stores/${store.id}`}>{store.name || store.id}</a></li>
		{/each}
	</ul>
{/if}
