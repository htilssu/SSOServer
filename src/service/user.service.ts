import prisma from "@/prisma.ts";
import {hashPassword} from "@/service/password.service.ts";
import {passwordValidator} from "@/validator/password.validator.ts";
import {SignUpDto} from "./sign-up.service";

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
    const isUserExisted = await isUserExist(data);

    if (isAccountExisted) {
        throw new Error("Email này đã được sử dụng", {
            cause: "EMAIL_EXISTED"
        });
    }

    if (isUserExisted) {
        throw new Error("Thông tin đã được sử dụng", {
            cause: "INFO_EXISTED"
        });
    }


    try {
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

        return {
            ...prisma.account.findFirst({
                where: {
                    id: newAccount.id
                },
                include: {
                    User: true
                }
            }),
            password: undefined
        }
    } catch (e) {
        throw new Error("Đã có lỗi xảy ra");
    }
}


async function isUserExist(unique: SignUpDto) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {phoneNumber: unique.phoneNumber},
                {username: unique.username},
                {Account: {some: {email: unique.email}}}
            ]
        }
    })
    if (user === null) return false;

    if (unique?.phoneNumber.length !== 0 && user.phoneNumber === unique.phoneNumber) throw new Error(
        "Số điện thoại đã được sử dụng", {
            cause: "PHONE_EXISTED"
        });

    if (unique?.username.length !== 0 && user.username === unique.username) throw new Error(
        "Tên người dùng đã được sử dụng", {
            cause: "USERNAME_EXISTED"
        });

    return false;
}

async function isAccountExist(email: string) {
    const account = await prisma.account.findFirst({
        where: {
            email: email,
            accountType: "user"
        }
    })

    return account != null
}

export async function getUser(id: string) {
    return prisma.user.findFirst({
        where: {
            id: id
        }
    })
}

