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

import prisma from "@/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: {
    params: { userId: string }
}) {


    const user = await prisma.user.findFirst({
        where: {
            id: params.userId
        }
    });

    return NextResponse.json(user);
}