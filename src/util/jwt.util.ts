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
 *  * Created: 11-10-2024
 *  ******************************************************
 */

import {parse} from "cookie";
import {decodeJwt as decode} from 'jose'

export function decodeJwt(req: Request): Record<string, string> {
    const cookie = parse(req.headers.get('Cookie') ?? "");
    if (!cookie.Token) {
        throw new Error("Người dùng không có quyền truy cập", {
            cause: "TOKEN_NOT_FOUND"
        })
    }

    try {
       return decode(cookie.Token);
    } catch (e) {
        throw new Error((e as Error).message, {
            cause: "TOKEN_INVALID"
        })
    }
}


