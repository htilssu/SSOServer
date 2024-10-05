import React from 'react';
import '@mantine/dates/styles.css';
import CustomerSignUpForm from "@/app/sign-up/CustomerSignUpForm.tsx";
import Image from "next/image";
import Field from "../../../public/backgrounds/field.png";

const Page = async () => {

    return (

        <div className={"relative flex justify-center items-center h-full min-h-screen p-4"}>
            <Image
                className="absolute w-full h-full"
                src={Field} alt={"123"} priority placeholder={"blur"}>

            </Image>
            <div className={'flex justify-center items-center w-full z-10'}>
                <CustomerSignUpForm/>
            </div>
        </div>
    );
}

export default Page;