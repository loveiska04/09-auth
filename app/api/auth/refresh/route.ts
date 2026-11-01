import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parseSetCookie } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const next = request.nextUrl.searchParams.get('next') || '/';

    if (refreshToken) {
      const apiRes = await api.get('auth/session', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const setCookie = apiRes.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

    if (parsed.value !== undefined) {
        cookieStore.set(parsed.name, parsed.value, parsed);
    }
        }

        return NextResponse.redirect(new URL(next, request.url));
      }
    }

    return NextResponse.redirect(new URL('/sign-in', request.url));
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}