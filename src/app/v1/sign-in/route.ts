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

    const account = await prisma.account.findUnique({
        where: {
            email: body.email
        },
        include: {
            Partner: true,
            User: true
        }
    })

    if (!account) {
        return NextResponse.json(USER_NOT_FOUND, {
            status: 401
        });
    }

    const isLogged = verifyPassword(body.password, account.password);
    if (!isLogged) {
        return NextResponse.json(WRONG_PASSWORD, {
            status: 401
        });
    }

    const {password, User, Partner, ...claim} = account;


    const token = await jwtSign(removeNullProperties({
        ...account.User,
        ...account.Partner,
        ...claim,
        userId: account.User?.id,
        partnerId: account.Partner?.id,
        role: account.userId ? "user" : "partner"
    }));
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Set-Cookie': `Token=${token};Max-Age=${expiredTimeInSecs} ; Path=/; SameSite=Strict; Secure`
        }
    });
}