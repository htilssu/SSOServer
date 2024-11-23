import {NextRequest, NextResponse} from "next/server";
import {createUser} from "@/service/user.service.ts";
import {expiredTimeInSecs, jwtSign} from "@/service/jwt.service.ts";
import {removeNullProperties} from "@/util/object.util.ts";
import {ErrorModel} from "@/dto/error.model.ts";
import {SignUpDto} from "@/service/sign-up.service.ts";


export async function POST(request: NextRequest) {
    const body: SignUpDto = await request.json();
    if (!body.service || body.service === '') {
        try {
            const account = (await createUser(body))!;
            return NextResponse.json(account, {
                status: 200, headers: {
                    'Set-Cookie': `Token=${await jwtSign(removeNullProperties({
                        ...account,
                        sub: account.id,
                        ...account.User,
                        role: "user"
                    }))}; Path=/; SameSite=Strict; Max-Age=${expiredTimeInSecs};`
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