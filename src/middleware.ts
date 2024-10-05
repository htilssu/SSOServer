/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of $author. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 5-10-2024
 *  ******************************************************
 */

import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {jwk, jwtVerify} from "@/services/jwt.service.ts";
import {SsoRequest} from "@/SsoRequest.ts";

console.log(jwk)

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

declare global {

}

export async function middleware(request: NextRequest) {
    const token = request.headers.get('Authorization') ?? request.cookies.get('Token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    const claim = await jwtVerify(token);
    if (!claim) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    (request as SsoRequest).claim = claim;

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!.*sso.*|.*password|.*sign-in.*|.*sign-up.*|_next|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)',
    ]
}