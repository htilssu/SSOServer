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
 *  * Created: 3-11-2024
 *  ******************************************************
 */

import {parse} from "cookie";

export function redirectByReturnUrl() {
    const returnUrl = sessionStorage?.getItem('returnUrl');
    if (returnUrl) {
        sessionStorage.removeItem('returnUrl');
        const token = parse(document.cookie).Token;
        if (token) location.href = returnUrl + `?Token=${token}`;
    } else location.href = '/';
}