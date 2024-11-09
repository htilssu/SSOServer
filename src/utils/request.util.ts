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
 *  * Created: 9-11-2024
 *  ******************************************************
 */

export async function wPost(url: string, data: any) {
    return await (await fetch('/v1/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data)
    })).json();
}

export async function wGet(url: string) {
    return await (await fetch('/v1/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'GET',
    })).json();
}