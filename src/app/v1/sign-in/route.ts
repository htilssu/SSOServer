import {NextRequest, NextResponse} from "next/server";
import {jwtSign} from "@/services/jwt.service.ts";
import {verifyPassword} from "@/services/password.service.ts";
import prisma from "@/prisma";
import {ErrorModel} from "@/dtos/error.model";
import {removeNullProperties} from "@/utils/object.util.ts";

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
        return NextResponse.json(new ErrorModel("NOT_FOUND", "Người dùng không tồn tại", -1), {
            status: 401
        });
    }

    const isLogged = verifyPassword(body.password, account.password);
    if (!isLogged) {
        return NextResponse.json(new ErrorModel("WRONG_PASSWORD", "Mật khẩu không đúng!", -1), {
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
            'Set-Cookie': `Token=${token};Max-Age=${7 * 24 * 60 * 60} ; Path=/; SameSite=Strict; Secure`
        }
    });
}