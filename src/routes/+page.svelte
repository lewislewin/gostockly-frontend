<script lang="ts">
	export let data; // If needed for future dynamic content
</script>

<div class="p-6 space-y-6">
	<!-- Page Title -->
	<h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>

	<!-- Metrics Section -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		<!-- Total Stores -->
		<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
			<h2 class="text-xl font-semibold text-gray-700">Total Stores</h2>
			<p class="text-3xl font-bold text-indigo-600 mt-2">12</p>
		</div>

		<!-- Total Stock Groups -->
		<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
			<h2 class="text-xl font-semibold text-gray-700">Total Stock Groups</h2>
			<p class="text-3xl font-bold text-indigo-600 mt-2">5</p>
		</div>

		<!-- Recent Activity Placeholder -->
		<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
			<h2 class="text-xl font-semibold text-gray-700">Recent Activity</h2>
			<p class="text-gray-600 mt-2">No recent updates</p>
		</div>
	</div>

	<!-- Quick Links Section -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		<a href="/stores" class="block bg-indigo-600 text-white p-4 rounded-lg shadow-md hover:bg-indigo-700 transition">
			View Stores
		</a>
		<a href="/stores/create" class="block bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-green-700 transition">
			Create Store
		</a>
		<a href="/stockgroup" class="block bg-indigo-600 text-white p-4 rounded-lg shadow-md hover:bg-indigo-700 transition">
			View Stock Groups
		</a>
		<a href="/stockgroup/create" class="block bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-green-700 transition">
			Create Stock Group
		</a>
	</div>
</div>
