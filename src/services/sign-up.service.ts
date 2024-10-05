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

import {SignUpDto} from "@/app/v1/sign-up/route.ts";

export async function signUpUser(data: SignUpDto) {
    console.log(data)
    return await fetch("/v1/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
    })
}