import {NextResponse} from "next/server";
import {jwk} from "@/app/services/jwt";

export async function GET() {

    return NextResponse.json({jwk});
}