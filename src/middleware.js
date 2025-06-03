import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = !!token;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  const isProfilePage = req.nextUrl.pathname.startsWith("/account");
  if (isProfilePage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const regis = req.nextUrl.pathname.startsWith("/register");
  if (regis && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const order = req.nextUrl.pathname.startsWith("/order");
  if (order && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
