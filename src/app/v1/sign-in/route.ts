import {NextRequest, NextResponse} from "next/server";
import {jwtSign, tokenLifetime} from "@/app/services/jwt";

export async function POST(request: NextRequest) {
    const body = await request.json();

    // const {user} = prisma.account.findUnique({
    //     where: {
    //         email: body.email
    //     },
    //     include: {
    //         user: true
    //     }
    // })
    const token = await jwtSign(body);
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Set-Cookie': `Token=${token};Max-Age=${7 * 24 * 60 * 60} ; Path=/; HttpOnly; SameSite=Strict; Secure`
        }
    });
}