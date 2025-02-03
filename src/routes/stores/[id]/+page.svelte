<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	export let data;

	let store = data.store
	let isEditing = false
	let form = { ...store } // Clone store data for editing
	let errorMessage = ''

	async function saveStore() {
		try {
			const response = await fetch(`http://localhost:8080/api/stores/${store.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${document.cookie.split('auth_token=')[1]}`
				},
				body: JSON.stringify(form)
			})

			if (!response.ok) {
				throw new Error('Failed to update store')
			}

			store = await response.json()
			isEditing = false
		} catch (error) {
			errorMessage = error.message
		}
	}

	async function deleteStore() {
		if (!confirm('Are you sure you want to delete this store?')) return

		try {
			const response = await fetch(`http://localhost:8080/api/stores/${store.id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${document.cookie.split('auth_token=')[1]}`
				}
			})

			if (!response.ok) {
				throw new Error('Failed to delete store')
			}

			goto('/stores') // Redirect to stores list after deletion
		} catch (error) {
			errorMessage = error.message
		}
	}
</script>

<div class="min-h-screen bg-gray-50 p-6">
	<h1 class="text-3xl font-bold text-gray-800 mb-4">
		{store.shopify_store_stub || `Store ID: ${store.id}`}
	</h1>

	{#if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{/if}

	<!-- Store Details / Edit Form -->
	<div class="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
		{#if isEditing}
			<div class="space-y-4">
				<div>
					<label class="block text-gray-700">Shopify Store Stub</label>
					<input type="text" bind:value={form.shopify_store_stub} class="w-full p-2 border rounded-lg" />
				</div>

				<div>
					<label class="block text-gray-700">Access Token</label>
					<input type="text" bind:value={form.access_token} class="w-full p-2 border rounded-lg" />
				</div>

				<div>
					<label class="block text-gray-700">Webhook Signature</label>
					<input type="text" bind:value={form.webhook_signature} class="w-full p-2 border rounded-lg" />
				</div>

				<div>
					<label class="block text-gray-700">Location ID</label>
					<input type="text" bind:value={form.location_id} class="w-full p-2 border rounded-lg" />
				</div>

				<!-- Save / Cancel Buttons -->
				<div class="flex gap-4 mt-4">
					<button on:click={saveStore} class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
						✅ Save
					</button>
					<button on:click={() => (isEditing = false, form = { ...store })} class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
						❌ Cancel
					</button>
				</div>
			</div>
		{:else}
			<!-- Read-Only View -->
			<ul class="text-gray-700 space-y-3">
				<li><strong>Shopify Store Stub:</strong> {store.shopify_store_stub}</li>
				<li><strong>Access Token:</strong> {store.access_token}</li>
				<li><strong>Webhook Signature:</strong> {store.webhook_signature}</li>
				<li><strong>Location ID:</strong> {store.location_id}</li>
			</ul>

			<!-- Edit / Delete Buttons -->
			<div class="mt-6 flex gap-4">
				<button on:click={() => (isEditing = true)} class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
					Edit Store
				</button>
				<button on:click={deleteStore} class="bg-red-600 text-white px-4 py-2 font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
					Delete Store
				</button>
			</div>
		{/if}
	</div>
</div>
