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
'use server'
import {saveTempSession} from "@/service/return-url.service.ts";
import {redirect} from "next/navigation";
import {isServiceExist} from "@/service/service.service.ts";

export async function setTempSession(service: string) {
    'use server'
    if (!service) {
        redirect('/404')
    }
    const serviceExist = await isServiceExist(service);
    if (!serviceExist){
        redirect('/404')
    }

    await saveTempSession(service);
}

