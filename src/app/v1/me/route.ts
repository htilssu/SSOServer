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
import {decodeJwt} from "@/utils/jwt.util.ts";
import {getUser} from "@/services/user.service.ts";
import {getPartnerDto} from "@/services/partner.service.ts";

export async function GET(request: NextRequest) {
    const claim = decodeJwt(request)
    const userId = claim.userId;
    const partnerId = claim.partnerId;

    if (userId) {
        return NextResponse.json(await getUser(userId));
    }
    if (partnerId) {
        return NextResponse.json(await getPartnerDto(partnerId));
    }

    return NextResponse.json({});
}