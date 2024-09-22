import {NextResponse} from "next/server";
import {jwtSign} from "@/app/services/jwt";

export async function GET() {
    const token = await jwtSign({id: "1", role: 'John Doe'});

    return NextResponse.json({token: token});
}