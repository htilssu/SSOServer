import bcrypt from 'bcrypt'
import prisma from "@/prisma.ts";

const saltRounds = 10;


export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}

export async function changePassword(accountId: string, password: string) {
    const account = await prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            password: await hashPassword(password)
        }
    })
}

export async function changePasswordRequest(password: string) {
    const res = fetch("/v1/password/new", )
}