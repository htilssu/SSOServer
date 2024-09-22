import {NextRequest, NextResponse} from "next/server";
import {jwtSign} from "@/app/services/jwt";
import {verifyPassword} from "@/app/services/encoder";
import prisma from "@/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const account = await prisma.account.findUnique({
        where: {
            email: body.email
        },
        include: {
            user: true
        }
    })

    if (!account) {
        return NextResponse.json({
            message: 'Invalid email or password'
        }, {
            status: 401
        });
    }

    const isLogged = verifyPassword(body.password, account.password);
    if (!isLogged) {
        return NextResponse.json({
            message: 'Invalid email or password'
        }, {
            status: 401
        });
    }

    const token = await jwtSign(body);
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Set-Cookie': `Token=${token};Max-Age=${7 * 24 * 60 * 60} ; Path=/; HttpOnly; SameSite=Strict; Secure`
        }
    });
}