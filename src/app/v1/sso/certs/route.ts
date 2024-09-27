import {NextResponse} from "next/server";
import {jwk} from "@/app/services/jwt";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const type = searchParams.get('type');
    if (type === 'pem') {
        return NextResponse.json(process.env.RSA_PUBLIC_KEY);
    }

    return NextResponse.json({jwk});
}