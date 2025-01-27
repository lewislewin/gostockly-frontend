<script>
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let error = '';

    async function login() {
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Login failed');
            }

            const { token } = await res.json();
            localStorage.setItem('token', token);
            goto('/overview');
        } catch (err) {
            error = err.message;
        }
    }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Login</button>
</form>

{#if error}
<p style="color: red;">{error}</p>
{/if}
