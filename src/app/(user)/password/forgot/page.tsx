import React from 'react';
import Image from "next/image";
import Field from "@@/background/field.png"
import ForgotPasswordForm from "@/app/(user)/password/forgot/ForgotPasswordForm.tsx";

const Page = () => {
    return (
        <div className={'relative min-h-screen flex justify-center items-center'}>
            <Image className={'absolute w-full h-full'} quality={100}
                   placeholder={"blur"} src={Field} alt={"Field"}
                   priority
                   layout={'fill'} objectFit={'cover'}/>
            <div className={'w-4/12'}>
                <ForgotPasswordForm/>
            </div>
        </div>
    );
};

export default Page;