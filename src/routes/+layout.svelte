<script lang="ts">
	import { goto } from '$app/navigation'
	import '../app.css'
	let { children } = $props()

	async function logout() {
		await fetch('/logout', { method: 'GET' })
		goto('/login')
	}
</script>

<svelte:head>
	<title>
		GoStockly
	</title>
</svelte:head>

<div class="flex h-screen bg-gray-100">
	<!-- Sidebar -->
	<aside class="w-64 bg-white shadow-md">
		<div class="p-4 border-b">
			<h1 class="text-2xl font-bold text-gray-700">GoStockly</h1>
		</div>
		<nav class="p-4 space-y-2">
			<a href="/" class="block py-2 px-4 rounded hover:bg-gray-200">Dashboard</a>
			<a href="/stores" class="block py-2 px-4 rounded hover:bg-gray-200">Stores</a>
			<a href="/stores/create" class="block py-2 px-4 rounded hover:bg-gray-200">Create Store</a>
			<a href="/stockgroup" class="block py-2 px-4 rounded hover:bg-gray-200">Stock Groups</a>
			<a href="/stockgroup/create" class="block py-2 px-4 rounded hover:bg-gray-200">Create Stock Group</a>
		</nav>
	</aside>

	<!-- Main Content -->
	<div class="flex flex-col flex-1">
		<!-- Top Navbar -->
		<header class="flex justify-between items-center bg-white shadow p-4">
			<h2 class="text-xl font-semibold text-gray-700">Dashboard</h2>
			<div class="flex items-center space-x-4">
				<a href="/profile" class="text-gray-700 hover:text-gray-900">Profile</a>
				<button onclick={logout} class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
					Logout
				</button>
			</div>
		</header>

		<!-- Page Content -->
		<main class="p-6 overflow-auto flex-1">
			{@render children()}
		</main>
	</div>
</div>
