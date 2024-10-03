import React from 'react';
import '@mantine/dates/styles.css';
import prisma from "@/prisma";
import {Service} from "@prisma/client";
import PartnerSignUpForm from "@/app/sign-up/PartnerSignUpForm.tsx";

const Page = async () => {
    let partner = await prisma.service.findMany();
    partner = [{
        "id": "1",
        name: "Oggy 5",
    }, {
        "id": "2",
        name: "Oggy 4",
    }, {
        "id": "3",
        name: "Oggy 3",
    }, {
        "id": "4",
        name: "Oggy 1",
    }] as Service[];

    return (
        <div className={'flex min-h-screen w-screen'} style={{
            backgroundImage: 'url(https://readymadeui.com/background-image.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className={'flex justify-center items-center w-full'}>
                <PartnerSignUpForm services={partner}/>
            </div>
        </div>
    );
}

export default Page;