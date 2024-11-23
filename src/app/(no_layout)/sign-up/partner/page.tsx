'use server';

import React from 'react';
import '@mantine/dates/styles.css';
import prisma from "@/prisma.ts";
import {Service} from "@prisma/client";
import Image from "next/image";
import Nano from "@@/background/neon.png"
import PartnerSignUpForm from './PartnerSignUpForm.tsx';
import {cookies} from "next/headers";

export async function generateMetadata() {
    return {
        title: "Đăng ký tài khoản đối tác",
    }
}


const Page = async () => {
    await cookies();
    const services: Service[] = await prisma.service.findMany();
    return (
        <div className={"relative flex justify-center items-center h-full min-h-screen p-4"}>
            <Image
                className="absolute object-cover w-full h-full"
                quality={100}
                src={Nano} alt={"123"} priority placeholder={"blur"}>

            </Image>
            <div className={'flex justify-center z-10 items-center w-full'}>
                <PartnerSignUpForm services={services}/>
            </div>
        </div>
    );
}

export default Page;