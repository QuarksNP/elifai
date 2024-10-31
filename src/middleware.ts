import { NextRequest, NextResponse } from 'next/server';

import { refreshSession } from './modules/auth/lib/session';
 
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/sign-in', '/(.)sign-in', '/sign-up', '/(.)sign-up', '/']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  const res = await refreshSession(req);

  const session = res?.cookies.get("session")?.value
 
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return res
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}