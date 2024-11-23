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
 *  * Created: 6-10-2024
 *  ******************************************************
 */

import prisma from "@/prisma.ts";

export async function isServiceExist(id: string) {
    const service = await prisma.service.findFirst({
        where: {
            id: id
        }
    });

    return service !== null;
}
