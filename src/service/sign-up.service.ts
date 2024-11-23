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

export interface SignUpDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string
    username: string;
    phoneNumber: string;
    term: boolean;
    service: string;
    name: string;
}


export async function signUpUser(data: SignUpDto) {
    return await fetch("/v1/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export async function signUpPartner(data: SignUpDto) {
    return await fetch("/v1/sign-up/partner", {
        method: "POST",
        body: JSON.stringify(data),
    })
}