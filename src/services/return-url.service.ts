/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of $author. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 5-10-2024
 *  ******************************************************
 */

import cuid2 from "@paralleldrive/cuid2";
import {cookies} from "next/headers";
import prisma from "@/prisma.ts";
import {isExpired} from "@/utils/time.util.ts";
import {isServiceExist} from "@/services/service.service.ts";
import {redirect} from "next/navigation";

const expiredTime = 1000 * 60 * 10;

export async function saveTempSession(service: string) {
    const serviceExist = await isServiceExist(service);
    if (!serviceExist) {
        redirect('/404')
    }
    const t = cuid2.createId();

    (await cookies()).set('t', t, {
        maxAge: expiredTime
    });

    return t;
}

export async function getReturnUrl(session: string) {
    const tempSession = await prisma.tempSession.findFirst({
        where: {
            session: session
        }
    });
    if (!tempSession) {
        return null;
    }

    if (isExpired(tempSession.expiredAt)) return null;

    const service = await prisma.service.findFirst({
        where: {
            id: tempSession.s!,
        }
    })

    if (!service) return null;

    return service.website + "/auth/sso";
}