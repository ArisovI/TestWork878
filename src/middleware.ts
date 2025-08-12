import { COOKIE_TOKEN } from './shared/http/cookie'
import { NextRequest, NextResponse } from 'next/server'
import { http } from './shared/http/http'

const protectedPaths = ['/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get(COOKIE_TOKEN.ACCESS)?.value
  const isProtectedPath = protectedPaths.includes(pathname)

  if (isProtectedPath) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const response = await http('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: request.headers.get('cookie') || '',
        },
      })

      if (response.status !== 200) {
        const loginResponse = NextResponse.redirect(
          new URL('/login', request.url),
        )
        loginResponse.cookies.delete(COOKIE_TOKEN.ACCESS)
        loginResponse.cookies.delete(COOKIE_TOKEN.REFRESH)
        return loginResponse
      }
    } catch (error) {
      const loginResponse = NextResponse.redirect(
        new URL('/login', request.url),
      )
      loginResponse.cookies.delete(COOKIE_TOKEN.ACCESS)
      loginResponse.cookies.delete(COOKIE_TOKEN.REFRESH)
      return loginResponse
    }
  }

  if (pathname === '/login' && accessToken) {
    try {
      const { status } = await http('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: request.headers.get('cookie') || '',
        },
      })

      if (status === 200) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      console.error('Token verification error:', error)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
