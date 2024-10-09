'use server'

import Field from '../../../public/backgrounds/field.png'
import {cookies} from "next/headers";
import prisma from "@/prisma";
import {jwtVerify} from "@/services/jwt.service.ts";
import SignInForm from "@/app/sign-in/SignInForm.tsx";
import Image from "next/image";
import React from "react";
import SubmitLoginToServiceForm from "@/app/sign-in/SubmitLoginToServiceForm.tsx";
import {redirect} from "next/navigation";


let searchParamsGlobal: { returnUrl: any; serviceId: any; };

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

    const userId = tokenClaim.sub;
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
    });
    let service;

    if (returnUrl && serviceId) {
        service = await prisma.service.findFirst({
            where: {
                id: serviceId
            }
        });

        if (service) {
            return <SubmitLoginToServiceForm user={user!} service={service}/>
        }
    }
    redirect("/")
}

export default Page;