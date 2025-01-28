<script lang="ts">
    import { api } from '$lib/api';
    import { goto } from '$app/navigation';
  
    let email = '';
    let password = '';
  
    async function login() {
      const { token } = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      document.cookie = `auth_token=${token}; Path=/`;
      goto('/stores');
    }
  </script>
  
  <form on:submit|preventDefault={login}>
    <input bind:value={email} type="email" placeholder="Email" required />
    <input bind:value={password} type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
  