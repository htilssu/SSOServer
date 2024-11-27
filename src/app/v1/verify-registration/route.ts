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
import {verifyRegistrationResponse} from "@simplewebauthn/server";
import {cookies} from "next/headers";
import prisma from "@/prisma.ts";
import {AuthenticatorTransportFuture} from "@simplewebauthn/typescript-types";

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId');
    if (!userId) {
        return NextResponse.json({}, {
            status: 400,
        })
    }
    const data = await request.json();
    const verify = await verifyRegistrationResponse({
        response: data,
        expectedChallenge: (challenge) => {
            return true
        },
        expectedOrigin: 'https://wowo.htilssu.id.vn',
        expectedRPID: 'wowo.htilssu.id.vn',
    });
    if (!verify.verified)  return NextResponse.json({ message: 'User not found'}, {
        status: 400,
    })

    await saveCredential(userId?.value!, verify.registrationInfo!.credential.transports!,
        verify.registrationInfo!.credential.id,
        Buffer.from(verify.registrationInfo!.credential.publicKey));

    return NextResponse.json(verify);
}


async function saveCredential(userId: string, transport: AuthenticatorTransportFuture[], externalId: string,
                              publicKey: Buffer) {
    try {
        return await prisma.credential.create({
            data: {
                userId,
                externalId,
                transport,
                publicKey,
                signCount: 0, // Initial sign count
            },
        });
    } catch (error) {
        console.error('Error saving credential:', error);
        throw error;
    }
}

