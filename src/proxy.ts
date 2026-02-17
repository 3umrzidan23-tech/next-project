import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart', '/profile', '/wishList'];
const authPages = ['/login', '/register'];

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });

  // حماية الصفحات المحمية
  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      let redirectUrl = new URL('/login', req.nextUrl.origin);
      redirectUrl.searchParams.set('callback-url' , req.nextUrl.pathname)

      return NextResponse.redirect(redirectUrl);
    }
  }

  // منع الوصول لصفحات auth إذا المستخدم متسجل دخول
  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL('/', req.nextUrl.origin); // رجع للصفحة الرئيسية
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// Optional: تحديد الـ matcher لو عايز تحدد الصفحات اللي Middleware يشتغل عليها
export const config = {
  matcher: ['/cart', '/profile', '/wishList', '/login', '/register'],
};