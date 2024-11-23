import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "@/service/jwt.service.ts";


export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) {
        return NextResponse.json({
            error: "Token is required"
        }, {
            status: 400
        });
    }


    const claim = await jwtVerify(token!);

    return NextResponse.json({
        ...claim
    });
}