<script lang="ts">
    import { api } from '$lib/api';
    import { goto } from '$app/navigation';
  
    let name = '';
    let location = '';
  
    async function createStore() {
      await api('/api/stores', {
        method: 'POST',
        body: JSON.stringify({ name, location }),
        headers: { 'Content-Type': 'application/json' }
      });
      goto('/stores');
    }
  </script>
  
  <form on:submit|preventDefault={createStore}>
    <input bind:value={name} placeholder="Store Name" required />
    <input bind:value={location} placeholder="Location" required />
    <button type="submit">Create Store</button>
  </form>
  