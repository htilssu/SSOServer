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

import {NextRequest, NextResponse} from "next/server";
import {generateAuthenticationOptions} from '@simplewebauthn/server';
import type {PublicKeyCredentialRequestOptionsJSON} from '@simplewebauthn/typescript-types';
import prisma from "@/prisma.ts";
import {cookies} from "next/headers";


export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId');
    if (!userId) {
        return NextResponse.error();
    }
    const optionsJSON = await generateAuthenticationOptionsForUser(userId?.value);

    return NextResponse.json(optionsJSON);
}


export async function generateAuthenticationOptionsForUser(userIdd: string): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const credentials = await prisma.credential.findMany(
        {
            where: {
                userId: userIdd
            }
        }
    )

    return generateAuthenticationOptions({
        rpID: 'localhost',
        timeout: 60000,
        userVerification: 'preferred',
        allowCredentials: credentials.map(cre => ({
            id: cre.externalId,
            transports: cre.transport,
        })), // Add existing credentials to allow if any
    });
}