<script>
    let stores = [];
    let error = '';

    async function fetchStores() {
        try {
            const response = await fetch('/api/stores');
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to fetch stores');
            }

            stores = await response.json();
        } catch (err) {
            error = err.message;
        }
    }

    fetchStores();
</script>

<h1>List of Stores</h1>

{#if error}
<p style="color: red;">{error}</p>
{/if}

{#if stores.length > 0}
<ul>
    {#each stores as store}
    <li>
        <strong>{store.shopify_store_stub}</strong> (Location ID: {store.location_id})
    </li>
    {/each}
</ul>
{:else}
<p>No stores found.</p>
{/if}
