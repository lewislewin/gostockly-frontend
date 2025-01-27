import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals }) => {
    const token = locals.token;

    try {
        const body = await request.json();
        const response = await fetch('http://localhost:8080/api/stores', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            return json({ error: error.message || 'Failed to create store' }, { status: response.status });
        }

        const store = await response.json();
        return json(store, { status: 201 });
    } catch (err: any) {
        return json({ error: err.message || 'Server error' }, { status: 500 });
    }
};
