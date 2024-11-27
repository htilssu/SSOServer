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
 *  * Created: 27-11-2024
 *  ******************************************************
 */
'use server'

import {NextRequest, NextResponse} from "next/server";
import {generateAuthenticationOptions} from '@simplewebauthn/server';
import prisma from "@/prisma.ts";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId');
    if (!userId) {
        return NextResponse.error();
    }
    const optionsJSON = await generateAuthenticationOptionsForUser(userId?.value!);

    return NextResponse.json(optionsJSON);
}

async function generateAuthenticationOptionsForUser(userId: string) {
    const credentials = await prisma.credential.findMany(
        {
            where: {
                userId: userId
            }
        }
    )

    return generateAuthenticationOptions({
        rpID: 'wowo.htilssu.id.vn',
        timeout: 60000,
        userVerification: 'preferred',
        // @ts-ignore
        allowCredentials: credentials.map(cre => ({
            id: cre.externalId,
            transports: cre.transport as AuthenticatorTransport[],
        })), // Add existing credentials to allow if any
    });
}