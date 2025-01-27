export const api = async (
    endpoint: string,
    method: string,
    body?: Record<string, any>,
    token?: string
) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`http://localhost:8080${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
    }

    return response.json();
};
