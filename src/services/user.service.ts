import {SignUpDto} from "@/app/v1/sign-up/route.ts";
import prisma from "@/prisma.ts";
import {hashPassword} from "@/services/password.service.ts";
import {User} from "@prisma/client";
import {passwordValidator} from "@/validators/password.validator.ts";

function userValidation(data: SignUpDto) {

    const passwordValid = passwordValidator(data.password);
    if (passwordValid) {
        throw new Error();
    }

    return true;
}

export async function createUser(data: SignUpDto) {

    userValidation(data);

    const isAccountExisted = await isAccountExist(data.email);
    if (isAccountExisted) {
        throw new Error("Email này đã được sử dụng", {
            cause: "EMAIL_EXISTED"
        });
    }

    try {
        // @ts-ignore
        const newUser: User = {
            ...data,
        }

        const hash = await hashPassword(data.password);
        const {email, password, service, ...userData} = data

        const newAccount = await prisma.account.create({
            data: {
                password: hash,
                email: data.email,
                accountType: "user",
                User: {
                    create: {
                        ...userData
                    }
                }
            }
        })

        return prisma.user.findFirst({
            where: {
                id: newAccount.userId!
            }
        });
    } catch (e) {
        throw new Error("Đã có lỗi xảy ra");
    }
}


async function isUserExist(unique: string) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {id: unique},
                {phoneNumber: unique},
                {username: unique},
                {
                    Account: {
                        some: {
                            email: unique
                        }
                    }
                }
            ]
        }
    })

    return user != null
}

async function isAccountExist(email: string) {
    const account = await prisma.account.findUnique({
        where: {
            email: email
        }
    })

    return account != null
}

