import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access');

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!accessToken) {
            return NextResponse.redirect('/auth/login');
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
}