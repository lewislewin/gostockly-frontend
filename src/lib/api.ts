export async function api(endpoint: string, options: RequestInit = {}) {
    const baseUrl = 'http://localhost:8080'; // Backend URL
    const headers = new Headers(options.headers);
  
    // Attach server-side or client-side token
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token') // Client-side
        : process.env.TOKEN; // Server-side or locals
  
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  
    const requestOptions: RequestInit = {
      ...options,
      headers
    };
  
    const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  }
  