<script lang="ts">
	import { api } from '$lib/api';
	import { goto } from '$app/navigation';

	let name = '';
	let company_id = '';
	let error: string | null = null;
	let loading = false;

	async function createStockGroup() {
		try {
			loading = true; // Show loading state
			error = null; // Clear any previous error

			// API call to create a stock group
			await api('/api/stockgroup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, company_id }),
			});

			// Redirect to stock groups list
			goto('/stores');
		} catch (err) {
			error = err.message || 'An error occurred while creating the stock group.';
			console.error('Error creating stock group:', err);
		} finally {
			loading = false; // End loading state
		}
	}
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
	<div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
		<h1 class="text-2xl font-bold text-gray-800 mb-6">Create Stock Group</h1>

		<form on:submit|preventDefault={createStockGroup} class="space-y-4">
			{#if error}
				<p class="text-red-600 font-semibold">{error}</p>
			{/if}

			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Stock Group Name</label>
				<input
					id="name"
					bind:value={name}
					type="text"
					placeholder="Enter stock group name"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="company_id" class="block text-sm font-medium text-gray-700">Company ID</label>
				<input
					id="company_id"
					bind:value={company_id}
					type="text"
					placeholder="Enter associated company ID"
					required
					class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
				disabled={loading}
			>
				{#if loading} Creating... {/if}
				{#if !loading} Create Stock Group {/if}
			</button>
		</form>
	</div>
</div>
