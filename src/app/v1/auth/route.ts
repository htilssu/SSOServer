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
import {auth} from "@/services/auth.service.ts";

export async function GET(request: NextRequest) {
    const authData = await auth();

    return NextResponse.json({...authData});
}