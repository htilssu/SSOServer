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


const allowedOrigins = ['https://wowo.htilssu.id.vn',]

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const isAllowedOrigin = true;

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', '*');
    response.headers.set('Access-Control-Allow-Headers', '*');

    return response;
}

export const config = {
    matcher: [
        "/([.]+)"
    ]
}