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
import {auth} from "@/service/auth.service.ts";
import prisma from "@/prisma.ts";

export async function GET(request: NextRequest) {
    const user = await auth();
    const authId = user?.id;

    const account = await prisma.account.findFirst({
        where: {
            id: authId
        },
        include: {
            User: true,
            Partner: true
        },
    })

    return NextResponse.json({...account, password: undefined});
}