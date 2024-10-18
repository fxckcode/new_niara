import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access')?.value;

    if (accessToken == undefined || accessToken == "") {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
}