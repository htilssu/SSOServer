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
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma.ts";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string[] }> }) {
    const pr = await params;

    const id = pr.id[0];
    const service = await prisma.service.findUnique({
        where: {
            id: id
        }
    });


    return NextResponse.json(service);
}
