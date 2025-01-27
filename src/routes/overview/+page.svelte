<script>
    import { onMount } from 'svelte';

    let stores = [];
    let error = '';

    onMount(async () => {
        try {
            const res = await fetch('/api/stores', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Failed to fetch stores');
            }

            stores = await res.json();
        } catch (err) {
            error = err.message;
        }
    });
</script>

<h1>Overview</h1>

{#if error}
<p style="color: red;">{error}</p>
{/if}

<ul>
    {#each stores as store}
    <li>{store.ShopifyStoreStub} - {store.LocationID}</li>
    {/each}
</ul>
