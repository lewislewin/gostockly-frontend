<script lang="ts">
	export let data;

	let stores = data.stores;
</script>

<div class="min-h-screen bg-gray-50 p-6">
	<!-- Header with Create Button -->
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-3xl font-bold text-gray-800">Your Stores</h1>
		<a href="/stores/create"
			class="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
			+ Create Store
		</a>
	</div>

	{#if stores.length === 0}
		<p class="text-gray-600 italic">No stores available. Add your first store to get started!</p>
	{:else}
		<ul class="space-y-3">
			{#each stores as store}
				<li>
					<a href={`/stores/${store.id}`}
						class="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 p-4 border border-gray-200">
						<p class="font-semibold text-gray-700">
							{store.shopify_store_stub || `Store ID: ${store.id}`}
						</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
