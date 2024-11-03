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

import prisma from "@/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const services = await prisma.service.findMany();

    return NextResponse.json({data: services, total: services.length});
}