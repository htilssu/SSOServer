import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
    const token = request.headers.get('Authorization') ?? request.cookies.get('Token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('sign-in', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!.*sign-in.*|.*sign-up.*|_next|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)',
    ]
}