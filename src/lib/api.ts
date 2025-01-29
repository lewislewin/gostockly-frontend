export async function api(endpoint: string, options: RequestInit = {}) {
  const baseUrl = 'http://localhost:8080' // Backend URL
  const headers = new Headers(options.headers)

  // Fetch token from cookies (SvelteKit way)
  const token = getCookie('auth_token')

  if (token) {
      headers.set('Authorization', `Bearer ${token}`)
  }

  const requestOptions: RequestInit = {
      ...options,
      headers
  }

  const response = await fetch(`${baseUrl}${endpoint}`, requestOptions)
  
  if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`API error: ${response.status} - ${errorMessage}`)
  }

  return response.json()
}

// Helper function to get cookies in the browser
function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ').find(row => row.startsWith(`${name}=`))
  return cookies ? cookies.split('=')[1] : null
}
