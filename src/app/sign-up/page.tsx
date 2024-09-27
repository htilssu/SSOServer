import React from 'react';
import '@mantine/dates/styles.css';
import SignUpForm from "@/app/sign-up/SignUpForm";
import prisma from "@/prisma";
const Page = async () => {
    const partner = await prisma.partner.findMany({});

    return (
        <div className={'flex min-h-screen w-screen'} style={{
            backgroundImage: 'url(https://readymadeui.com/background-image.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className={'flex justify-center items-center w-full'}>
                <SignUpForm partners={partner}/>
            </div>
        </div>
    );
}

export default Page;