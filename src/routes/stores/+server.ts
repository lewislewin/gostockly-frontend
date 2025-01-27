import { json } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
    const token = locals.token;

    try {
        const response = await fetch('http://localhost:8080/api/stores', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            return json({ error: error.message || 'Failed to fetch stores' }, { status: response.status });
        }

        const stores = await response.json();
        return json(stores, { status: 200 });
    } catch (err: any) {
        return json({ error: err.message || 'Server error' }, { status: 500 });
    }
};
