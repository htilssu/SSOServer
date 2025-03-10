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
 *  * Created: 10-10-2024
 *  ******************************************************
 */

import {NextRequest, NextResponse} from "next/server";
import {ErrorModel} from "@/dto/error.model.ts";
import prisma from "@/prisma.ts";
import {USER_NOT_FOUND} from "@/exception/Error.ts";
import {decodeJwt} from "@/util/jwt.util.ts";

export async function GET(
    request: NextRequest,
    props: {
        params: Promise<{ userId: string }>
    }
) {
    const params = await props.params;
    const claim = decodeJwt(request);
    const role: string = claim?.role;
    const userId = claim?.id;

    if (params.userId !== userId && role !== "admin") {
        return NextResponse.json(new ErrorModel("PERMISSION_DENIED", "Bạn không có quyền truy cập", -1), {
            status: 401
        })
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: params.userId
            }
        })

        if (!user) {
            return NextResponse.json(USER_NOT_FOUND, {
                status: 404
            })
        }

        return NextResponse.json(user);
    } catch (e) {
        const ee = e as Error
        return NextResponse.json(new ErrorModel(ee.message, ee.cause as string, -1), {
            status: 401
        })
    }
}