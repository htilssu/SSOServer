import {NextRequest, NextResponse} from "next/server";

export interface SignUpDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string
    confirmPassword: string;
    username: string;
    phoneNumber: string;
    term: boolean;
    service: string;
}

export async function POST(request: NextRequest) {
    const body: SignUpDto = await request.json();
    if (body.service === '') {

    }

    return NextResponse.json({});
}