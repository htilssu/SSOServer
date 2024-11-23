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
 *  * Created: 10-10-2024
 *  ******************************************************
 */

import genTOTP from "gen-totp";

export async function generateOtp() {
    return genTOTP('test', {
        digits: 6,
        algorithm: "SHA-256",
        period: 300,
    })
}

export async function saveOtp(userId: string, otp: string) {

}

export async function verifyOtp(userId: string, otp: string) {
    return true;
}