import type { Handle } from '@sveltejs/kit'
import { decodeJwt } from 'jose'

const PUBLIC_ROUTES = ['/login', '/register']

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('auth_token')
    const isPublicRoute = PUBLIC_ROUTES.includes(event.url.pathname)

    if (token) {
        try {
            const decoded = decodeJwt(token)

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                console.warn('Token expired')
                event.cookies.delete('auth_token', { path: '/' })
                return new Response(null, { status: 303, headers: { Location: '/login' } })
            }

            event.locals.user = decoded
        } catch (error) {
            console.error('Invalid JWT format:', error)
            event.cookies.delete('auth_token', { path: '/' })
            return new Response(null, { status: 303, headers: { Location: '/login' } })
        }
    }

    if (!isPublicRoute && !token) {
        return new Response(null, { status: 303, headers: { Location: '/login' } })
    }

    if (isPublicRoute && token) {
        return new Response(null, { status: 303, headers: { Location: '/' } })
    }

    return resolve(event)
}
