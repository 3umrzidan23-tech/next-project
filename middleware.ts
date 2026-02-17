import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", "/profile", "/wishList"];
const authPages = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // حماية الصفحات المحمية
  if (protectedPages.includes(pathname)) {
    if (!token?.accessToken) {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // منع الدخول لصفحات auth لو المستخدم مسجل
  if (authPages.includes(pathname)) {
    if (token?.accessToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/profile", "/wishList", "/login", "/register"],
};
