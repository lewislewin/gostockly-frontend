<script>
    import { goto } from '$app/navigation';

    let shopifyStoreStub = '';
    let accessToken = '';
    let webhookSignature = '';
    let locationId = '';
    let error = '';

    async function createStore() {
        try {
            const response = await fetch('/api/stores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    shopify_store_stub: shopifyStoreStub,
                    access_token: accessToken,
                    webhook_signature: webhookSignature,
                    location_id: locationId
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create store');
            }

            await response.json();
            goto('/stores/list'); // Redirect to the list of stores
        } catch (err) {
            error = err.message;
        }
    }
</script>

<h1>Create Store</h1>

<form on:submit|preventDefault={createStore}>
    <input type="text" placeholder="Shopify Store Stub" bind:value={shopifyStoreStub} required />
    <input type="text" placeholder="Access Token" bind:value={accessToken} required />
    <input type="text" placeholder="Webhook Signature" bind:value={webhookSignature} required />
    <input type="text" placeholder="Location ID" bind:value={locationId} required />
    <button type="submit">Create Store</button>
</form>

{#if error}
<p style="color: red;">{error}</p>
{/if}
