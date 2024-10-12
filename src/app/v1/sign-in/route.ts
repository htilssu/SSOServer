import {NextRequest, NextResponse} from "next/server";
import {expiredTimeInSecs, jwtSign} from "@/services/jwt.service.ts";
import {verifyPassword} from "@/services/password.service.ts";
import prisma from "@/prisma";
import {removeNullProperties} from "@/utils/object.util.ts";
import {USER_NOT_FOUND, WRONG_PASSWORD} from "@/exceptions/Error.ts";

export type SignInBody = {
    email: string
    username: string
    password: string
    remember: boolean
}

export async function POST(request: NextRequest) {
    const body = await request.json() as SignInBody;

    const accounts = await prisma.account.findMany({
        where: {
            email: body.email
        },
        include: {
            Partner: {
                include: {
                    PartnerService: true,
                }
            },
            User: {
                include: {
                    UserRole: true
                }
            }
        }
    })

    if (!accounts || accounts.length === 0) {
        return NextResponse.json(USER_NOT_FOUND, {
            status: 401
        });
    }

    const account = accounts.filter(async account => {
        return await verifyPassword(account.password, body.password);
    }).at(0);

    if (!account) {
        return NextResponse.json(WRONG_PASSWORD, {
            status: 401
        });
    }

    const {password, User, Partner, ...claim} = account;


    const token = await jwtSign(removeNullProperties({
        ...account.User,
        ...account.Partner,
        ...claim,
        role: account.accountType
    }));
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Set-Cookie': `Token=${token};Max-Age=${expiredTimeInSecs} ; Path=/; SameSite=Strict; Secure`
        }
    });
}