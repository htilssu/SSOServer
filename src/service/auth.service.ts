/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of htilssu. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 3-11-2024
 *  ******************************************************
 */

import {headers} from "next/headers";
import {parse} from "cookie";
import {jwtVerify} from "@/service/jwt.service.ts";

export interface Auth {
    isAuthenticated: boolean,
    id: string,
    role: string,
    avatar?: string
}

export async function auth(): Promise<Auth | null> {
    const header = await headers();
    const cookie = header.get('Cookie');
    if (!cookie) return null;
    const dictCookie = parse(cookie);
    const token = dictCookie.Token;
    if (!token) return null;
    const payload = await jwtVerify(token);
    if (!payload) return null;

    if (!payload.id || !payload.role) return null;
    return {
        isAuthenticated: true,
        ...payload
    } as Auth;
}