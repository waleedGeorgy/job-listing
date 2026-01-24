import { NextRequest } from "next/server";
import { auth } from "./auth";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  const apiAuthPrefix = "/api/auth";
  const protectedRoutes = ["/dashboard", "/jobs/add"];
  const authRoutes = ["/auth/signin"];

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return null;
  }
  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
