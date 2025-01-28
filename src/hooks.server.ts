import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // List of public routes
  const publicRoutes = ['/login', '/register'];

  // Retrieve the auth token from cookies
  const token = event.cookies.get('auth_token');

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(event.url.pathname);

  // Redirect unauthenticated users away from non-public routes
  if (!isPublicRoute && !token) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/login' }
    });
  }

  // Redirect authenticated users away from public routes
  if (isPublicRoute && token) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/' }
    });
  }

  // Attach the token to `event.locals` for downstream usage
  event.locals.token = token;

  // Process the request as usual
  return resolve(event);
};
