'use server'

import Field from '@@/backgrounds/field.png';
import {cookies} from "next/headers";
import prisma from "@/prisma";
import {jwtVerify} from "@/services/jwt.service.ts";
import Image from "next/image";
import React from "react";
import SignInForm from "@/app/(user)/sign-in/SignInForm.tsx";
import SubmitLoginToServiceForm from "./SubmitLoginToServiceForm.tsx";


let searchParamsGlobal: { returnUrl: any; serviceId: any; };

// @ts-ignore
export async function generateMetadata({searchParams}) {
    const serviceId = searchParams.serviceId;
    const service = await prisma.service.findFirst({
        where: {
            id: serviceId
        }
    });

    const title = service ? `Trang đăng nhập vào ${service.name}` : "Trang đăng nhập";

    return {
        title: title,
    }
}

// @ts-ignore
const Page = async ({searchParams}) => {

    searchParamsGlobal = searchParams;

    return (

        <div className={"relative flex justify-center items-center h-full min-h-screen p-4"}>
            <Image
                className="absolute w-full h-full"
                quality={100}
                src={Field} alt={"123"} priority placeholder={"blur"}>
            </Image>
            <div className="max-w-md w-full mx-auto z-10">
                <Form/>
            </div>
        </div>

    );
};

async function Form() {
    const cookie = cookies();

    const returnUrl = searchParamsGlobal.returnUrl;
    const serviceId = searchParamsGlobal.serviceId;
    let tokenClaim;

    if (!cookie.has('Token')) {
        return <SignInForm/>
    }

    tokenClaim = await jwtVerify(cookie.get('Token')!.value);
    if (!tokenClaim) {
        return <SignInForm/>
    }

    const accountId = tokenClaim.sub;
    const account = await prisma.account.findFirst({
        where: {
            id: accountId
        },
        include: {
            User: true,
            Partner: true
        }
    });
    let service;

    if (returnUrl && serviceId) {
        service = await prisma.service.findFirst({
            where: {
                OR: [
                    {
                        id: serviceId
                    }, {
                        shortId: serviceId
                    }
                ]
            }
        });

        if (service && account) {
            // @ts-ignore
            return <SubmitLoginToServiceForm account={account} service={service}/>
        }
    }
    return <SignInForm/>;
}

export default Page;