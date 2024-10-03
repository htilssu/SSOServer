import {NextRequest, NextResponse} from "next/server";
import {jwtSign} from "@/services/jwt.service.ts";
import {verifyPassword} from "@/services/password.service.ts";
import prisma from "@/prisma";
import {getClaim} from "@/services/token-claim.service.ts";
import {ErrorModel} from "@/dtos/error.model";

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

    const tokenClaim = await getClaim(account);

    const token = await jwtSign(tokenClaim);
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Set-Cookie': `Token=${token};Max-Age=${7 * 24 * 60 * 60} ; Path=/; HttpOnly; SameSite=Strict; Secure`
        }
    });
}