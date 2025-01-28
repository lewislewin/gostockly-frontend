<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '$lib/api';

	let stockGroups = [];
	let error: string | null = null;
	let loading = true; // Loading state

	onMount(async () => {
		try {
			const stockGroupsResponse = await api('/api/stockgroup', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			stockGroups = stockGroupsResponse;
		} catch (err) {
			error = err.message || 'An unexpected error occurred.';
			console.error('Error fetching stock groups:', err);
		} finally {
			loading = false; // End loading state
		}
	});
</script>

<div class="min-h-screen bg-gray-50 p-6">
	<h1 class="text-3xl font-bold text-gray-800 mb-4">Your Stock Groups</h1>

	<!-- Display loading state -->
	{#if loading}
		<p class="text-gray-600">Loading stock groups...</p>

	<!-- Display error or fallback messages -->
	{:else if error}
		<p class="text-red-600 font-semibold">Error: {error}</p>
	{:else if stockGroups.length === 0}
		<p class="text-gray-600 italic">No stock groups available. Add your first stock group to get started!</p>
	{:else}
		<ul class="space-y-3">
			{#each stockGroups as group}
				<li>
					<a
						href={`/stockgroups/${group.id}`}
						class="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 p-4 border border-gray-200"
					>
						<p class="font-semibold text-gray-700">
							{group.name || `Stock Group ID: ${group.id}`}
						</p>
						<p class="text-sm text-gray-500">Company ID: {group.company_id}</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
