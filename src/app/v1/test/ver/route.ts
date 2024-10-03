import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "@/services/jwt.service.ts";

export async function GET(request: NextRequest) {
    //get search param
    const {searchParams} = new URL(request.url);
    try {
        const result = await jwtVerify(searchParams.get('token')!);
        return NextResponse.json({result});

    } catch (e) {
        return NextResponse.json({error: (e as Error).message}, {status: 400});
    }

}