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
 *  * Created: 12-10-2024
 *  ******************************************************
 */

import {SignUpDto} from "@/service/sign-up.service.ts";
import prisma from "@/prisma.ts";
import {hashPassword} from "@/service/password.service.ts";

export async function createPartner(data: SignUpDto) {
    const isPartnerExisted = await isPartnerAccountExist(data.email);
    if (!isPartnerExisted) {
        throw new Error("Email này đã được sử dụng", {
            cause: "EMAIL_EXISTED",
        });
    }


    const password = await hashPassword(data.password);

    try {
        const account = await prisma.account.create({
            data: {
                password: password,
                accountType: "partner",
                email: data.email,
                Partner: {
                    create: {
                        name: data.name,
                        PartnerService: {
                            create: {
                                serviceId: data.service
                            }
                        }
                    }
                }
            }
        });
        return {
            ...await prisma.account.findFirst({
                where: {
                    id: account.id
                },
                include: {
                    Partner: true
                }
            }),
            password: undefined
        }

    } catch (e) {
        throw new Error("Có lỗi khi tạo tài khoản partner", {
            cause: "CREATE_PARTNER_ERROR",
        });
    }
}


async function isPartnerAccountExist(email: string) {
    const partner = await prisma.account.findFirst({
        where: {
            email: email,
            accountType: "partner"
        }
    });

    return partner === null;
}

export async function getPartnerDto(partnerId: string) {
    const partner = await prisma.partner.findFirst({
        where: {
            id: partnerId
        },
        include: {
            PartnerService: {
                include: {
                    Service: true
                }
            },
            Account: true,
            Service: true
        }
    });

    if (!partner) throw new Error("Không tìm thấy partner", {
        cause: "PARTNER_NOT_FOUND"
    })

    return {
        ...partner,
        Account: partner.Account
                        .map(account => ({
                            ...account,
                            password: undefined
                        }))
    };
}
