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
import {generateRegistrationOptions} from '@simplewebauthn/server';
import {PublicKeyCredentialCreationOptionsJSON} from "@simplewebauthn/typescript-types";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId');
    if (!userId) {
        return NextResponse.json({
            message: 'User not found'
        }, {
            status: 400,
        })
    }
    const optionsJSON = await generateRegistrationOptionsForUser(userId?.value, `${userId?.value}`);

    return NextResponse.json(optionsJSON);
}


async function generateRegistrationOptionsForUser(userId: string,
                                                  userEmail: string): Promise<PublicKeyCredentialCreationOptionsJSON> {
    return generateRegistrationOptions({
        rpName: 'Wowo Wallet',
        rpID: 'wowo.htilssu.id.vn',
        // rpID: 'wowo.htilssu.id.vn',
        userID: new Uint8Array(Buffer.from(userId)),
        userName: userEmail,
        attestationType: 'indirect',
        authenticatorSelection: {
            residentKey: 'preferred',
            userVerification: 'preferred',
        },
        timeout: 60000,
        excludeCredentials: [],
    });
}