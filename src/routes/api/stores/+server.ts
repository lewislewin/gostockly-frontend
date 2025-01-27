import { json } from '@sveltejs/kit';
import { api } from '$lib/api';

export const GET = async ({ request }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    try {
        const data = await api('/api/stores', 'GET', undefined, token);
        return json(data);
    } catch (err: any) {
        return json({ error: err.message }, { status: 400 });
    }
};
