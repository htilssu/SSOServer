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
 *  * Created: 12-10-2024
 *  ******************************************************
 */

import {NextRequest, NextResponse} from "next/server";
import {SignUpDto} from "@/services/sign-up.service.ts";
import {createPartner} from "@/services/partner.service.ts";
import {ErrorModel} from "@/dtos/error.model.ts";
import {expiredTimeInSecs, jwtSign} from "@/services/jwt.service.ts";
import {removeNullProperties} from "@/utils/object.util.ts";

export async function POST(request: NextRequest) {
    const data: SignUpDto = await request.json();
    try {
        const account = await createPartner(data);
        return NextResponse.json(account, {
            status: 200, headers: {
                'Set-Cookie': `Token=${await jwtSign(removeNullProperties({
                    ...account,
                    sub: account.id,
                    ...account.Partner,
                    role: "partner"
                }))}; Path=/; SameSite=Strict; Max-Age=${expiredTimeInSecs};`
            }
        });
    } catch (e) {
        const ee = (<Error>e)
        return NextResponse.json(new ErrorModel(ee.cause as string, ee.message, -1), {
            status: 400,
        });
    }

}