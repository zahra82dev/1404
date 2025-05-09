export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (request.nextUrl.pathname === "/login") {
    if (!session) {
      return null;
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login"],
};
