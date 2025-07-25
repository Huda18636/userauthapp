import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  // No token? Block staff/admin access
  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/staff")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next(); // allow public pages
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Block non-admins from /admin
    if (url.pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // ✅ Block non-staff/admin from /staff
    if (url.pathname.startsWith("/staff") && !["staff", "admin"].includes(decoded.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"], // secure only these paths
};
