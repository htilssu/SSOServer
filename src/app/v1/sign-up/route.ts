import {NextRequest, NextResponse} from "next/server";
import {createUser} from "@/services/user.service.ts";
import {jwtSign} from "@/services/jwt.service.ts";
import {removeNullProperties} from "@/utils/object.util.tsx";
import {ErrorModel} from "@/dtos/error.model.ts";

export interface SignUpDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string
    username: string;
    phoneNumber: string;
    term: boolean;
    service: string;
}

export async function POST(request: NextRequest) {
    const body: SignUpDto = await request.json();
    if (!body.service || body.service === '') {
        try {
            const user = await createUser(body);
            return NextResponse.json(user, {
                status: 200, headers: {
                    'Set-Cookie': `Token=${await jwtSign(removeNullProperties({
                        ...user,
                        role: "user"
                    }))}; HttpOnly; Path=/; SameSite=Strict; Max-Age=31536000;`
                }
            });
        } catch (e) {
            return NextResponse.json(
                new ErrorModel((e as Error).cause as string ?? "NEW_USER_ERR", (e as Error).message, -1),
                {status: 400});
        }
    }

    return NextResponse.json({});
}