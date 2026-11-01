
import { NextRequest, NextResponse } from 'next/server';
import { nextServer } from './lib/api/api';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await nextServer.get('/auth/session', {
          headers: {
            Cookie: request.cookies.toString(),
          },
        });

        const setCookie = data.headers['set-cookie'];

        if (setCookie?.length) {
          const response = isPublicRoute
            ? NextResponse.redirect(new URL('/', request.url))
            : NextResponse.next();

          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookie of cookieArray) {
            response.headers.append('Set-Cookie', cookie);
          }

          return response;
        }
      } catch {
        // Session is no longer valid.
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(
        new URL('/sign-in', request.url)
      );
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
