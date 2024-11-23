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
 *  * Created: 8-11-2024
 *  ******************************************************
 */

import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/service/auth.service.ts";
import prisma from "@/prisma.ts";

export async function GET(request: NextRequest) {
    const authData = await auth();
    if (!authData) return NextResponse.redirect(new URL('/login', request.url).toString());

    if (authData.role === "partner") {
        const account = await prisma.account.findFirst({
            where: {
                id: authData.id
            },
            include: {
                Partner: {
                    include: {
                        Service: true
                    }
                }
            }
        })

        return NextResponse.json([...account?.Partner?.Service!]);
    }

    return NextResponse.redirect(new URL('/404', request.url).toString());
}