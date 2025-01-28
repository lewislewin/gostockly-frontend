import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Define public routes
  const publicRoutes = ['/login', '/register'];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    event.url.pathname.startsWith(route)
  );

  // Retrieve the auth token from cookies
  const token = event.cookies.get('auth_token');

  // Redirect unauthenticated users to /login
  if (!isPublicRoute && !token) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/login' }
    });
  }

  // Attach token to locals for use in API requests
  event.locals.token = token;

  // Process the request
  return resolve(event);
};
