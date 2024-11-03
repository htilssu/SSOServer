import React from 'react';
import '@mantine/dates/styles.css';
import CustomerSignUpForm from "@/app/(no_layout)/sign-up/CustomerSignUpForm.tsx";
import Image from "next/image";
import Neon from '@@/backgrounds/neon.png';


const Page = async () => {

    return (

        <div className={"relative flex justify-center items-center h-full min-h-screen p-4"}>
            <Image
                className="absolute w-full h-full"
                src={Neon} alt={"123"} priority placeholder={"blur"}>

            </Image>
            <div className={'flex justify-center items-center w-full z-10'}>
                <CustomerSignUpForm/>
            </div>
        </div>
    );
}

export default Page;