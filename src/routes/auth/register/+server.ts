import { json } from '@sveltejs/kit';
import { api } from '$lib/api';

export const POST = async ({ request }) => {
    const body = await request.json();

    try {
        const data = await api('/auth/register', 'POST', body);
        return json(data);
    } catch (err: any) {
        return json({ error: err.message }, { status: 400 });
    }
};
