/*
 * ******************************************************
 *  * Copyright (c) 2024$ htilssu
 *  *
 *  * This code is the property of $author. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 5-10-2024
 *  ******************************************************
 */

import React from 'react';
import prisma from "@/prisma.ts";
import {redirect} from "next/navigation";
import NewPasswordForm from "@/app/(user)/password/new/NewPasswordForm.tsx";
import Image from "next/image";
import Lonely from "@@/background/lonely.jpg"

// @ts-ignore
const Page = async props => {
    const searchParams = await props.searchParams;

    if (!searchParams.token) redirect('/')

    const changePasswordAction = ({password}: { password: string }) => {
        const token = prisma.tempSession.findFirst({
            where: {
                session: searchParams.t
            }
        })
    }

    return (
        <div className={'relative min-h-screen flex justify-center items-center'}>
            <Image className={'absolute w-full h-full object-cover'} placeholder={"blur"} src={Lonely} alt={"BG"} priority quality={100}/>
            <div className={'w-full sm:w-7/12 md:w-5/12 lg:w-4/12'}><NewPasswordForm/></div>
        </div>
    );
};

export default Page;
