import type { Handle } from '@sveltejs/kit'
import { decodeJwt } from 'jose' // Install with `npm install jose`

const PUBLIC_ROUTES = ['/login', '/register']

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('auth_token')
    const isPublicRoute = PUBLIC_ROUTES.includes(event.url.pathname)

    if (token) {
        try {
            const decoded = decodeJwt(token) // Decodes without verifying the signature

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                console.warn('Token expired')
                event.cookies.delete('auth_token', { path: '/' })
                return new Response(null, { status: 303, headers: { Location: '/login' } })
            }

            event.locals.user = decoded // Attach decoded user info
        } catch (error) {
            console.error('Invalid JWT format:', error)
            event.cookies.delete('auth_token', { path: '/' })
            return new Response(null, { status: 303, headers: { Location: '/login' } })
        }
    }

    // Redirect unauthenticated users away from protected routes
    if (!isPublicRoute && !token) {
        return new Response(null, { status: 303, headers: { Location: '/login' } })
    }

    // Redirect authenticated users away from login/register pages
    if (isPublicRoute && token) {
        return new Response(null, { status: 303, headers: { Location: '/' } })
    }

    return resolve(event)
}
