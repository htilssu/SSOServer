import {SignUpDto} from "@/app/v1/sign-up/route.ts";
import prisma from "@/prisma.ts";
import {hashPassword} from "@/services/password.service.ts";
import {User} from "@prisma/client";

export async function registerUser(data: SignUpDto) {
    try {
        // @ts-ignore
        const newUser: User = {
            ...data,
        }

        const hash = await hashPassword(data.password);

        await prisma.account.create({
            data: {
                password: hash,
                email: data.email,
                accountType: "user",
                User: {
                    create: {
                        ...newUser
                    }
                }
            }
        })
    } catch (e) {
        throw new Error((e as Error).message);
    }
}