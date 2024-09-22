import {NextResponse} from "next/server";

export const revalidate = 60 * 60 * 24; // 24 hours

export async function GET() {
    return NextResponse.json({
        key: process.env.RSA_PUBLIC_KEY,
    }, {
        headers: {
            'Cache-Control': `max-age=${revalidate},must-revalidate`,
        }
    });
}