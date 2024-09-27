import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     const token = request.headers.get('Authorization')
//     if (!token) {
//         return NextResponse.next();
//     }
//
//     return NextResponse.redirect(new URL('/home', request.url))
// }
//
// export const config = {
//     matcher: '/about/:path*',
// }