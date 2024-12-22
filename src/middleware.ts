import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./modules/auth/lib/session";

const protectedRoutes = ["/portal"];
const publicRoutes = [
  "/sign-in",
  "/(.)sign-in",
  "/sign-up",
  "/(.)sign-up",
  "/",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const { user } = await getSession();

  if (isProtectedRoute && !user?.id) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && user?.id && !req.nextUrl.pathname.startsWith("/portal")) {
    return NextResponse.redirect(new URL("/portal", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
