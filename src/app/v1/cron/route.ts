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
 *  * Created: 6-10-2024
 *  ******************************************************
 */

import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma.ts";

export async function GET(request: NextRequest) {
    prisma.tempSession.deleteMany({
        where: {
            expiredAt: {
                lt: new Date()
            }
        }
    })

    return NextResponse.json({});
}

