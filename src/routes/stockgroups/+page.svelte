<script lang="ts">
	export let data

	let stockgroups = data.stockgroups;
</script>

<div class="min-h-screen bg-gray-50 p-6">
	<!-- Header with Create Button -->
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-3xl font-bold text-gray-800">Stock Groups</h1>
		<a href="/stockgroups/create"
			class="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
			+ Create Stock Group
		</a>
	</div>

	{#if stockgroups.length === 0}
		<p class="text-gray-600 italic">No stock groups available. Add your first stock group to get started!</p>
	{:else}
		<ul class="space-y-3">
			{#each stockgroups as group}
				<li>
					<a href={`/stockgroups/${group.id}`}
						class="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 p-4 border border-gray-200">
						<p class="font-semibold text-gray-700">
							{group.name || `Stock Group ID: ${group.id}`}
						</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
