import {NextResponse} from "next/server";
import {jwtSign} from "@/services/jwt.service.ts";

export async function GET(req: Request) {
    const token = await jwtSign({id: "1", role: 'John Doe'});

    return NextResponse.json({token: token});
}