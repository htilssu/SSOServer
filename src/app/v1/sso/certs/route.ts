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

import {NextResponse} from "next/server";
import {jwk} from "@/services/jwt.service.ts";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const type = searchParams.get('type');
    if (type === 'pem') {
        return NextResponse.json(process.env.RSA_PUBLIC_KEY);
    }

    return NextResponse.json(jwk);
}