<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let company_name = '';
    let subdomain = '';
    let error = '';

    async function register() {
        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, company_name, subdomain })
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Registration failed');
            }

            goto('/auth/login');
        } catch (err) {
            error = err.message;
        }
    }
</script>

<h1>Register</h1>

<form on:submit|preventDefault={register}>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <input type="text" bind:value={company_name} placeholder="Company Name" required />
    <input type="text" bind:value={subdomain} placeholder="Subdomain" required />
    <button type="submit">Register</button>
</form>

{#if error}
<p style="color: red;">{error}</p>
{/if}
