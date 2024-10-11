import React from 'react';
import '@mantine/dates/styles.css';
import prisma from "@/prisma.ts";
import {Service} from "@prisma/client";
import PartnerSignUpForm from "@/app/(user)/sign-up/PartnerSignUpForm.tsx";
import Image from "next/image";
import Field from "@@/backgrounds/field.png";

const Page = async () => {
    const services: Service[] = await prisma.service.findMany();

    return (
        <div className={"relative flex justify-center items-center h-full min-h-screen p-4"}>
            <Image
                className="absolute w-full h-full"
                quality={100}
                src={Field} alt={"123"} priority placeholder={"blur"}>

            </Image>
            <div className={'flex justify-center z-10 items-center w-full'}>
                <PartnerSignUpForm services={services}/>
            </div>
        </div>
    );
}

export default Page;