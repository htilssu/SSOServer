import Field from '../../../public/field.png'
import {cookies, headers} from "next/headers";
import prisma from "@/prisma";
import {jwtVerify} from "@/services/jwt.service.ts";
import SubmitLoginForm from "@/app/sign-in/SubmitLoginForm";
import SignInForm from "@/app/sign-in/SignInForm.tsx";
import {redirect} from "next/navigation";
import Image from "next/image";

const Page = async () => {
    const header = headers();
    const cookie = cookies();
    const referer = header.get('Referer');
    let tokenClaim;

    if (cookie.has('Token')) {
        tokenClaim = await jwtVerify(cookie.get('Token')!.value);
    }

    const service = await prisma.service.findFirst({
        where: {
            website: {
                contains: referer!
            }
        }
    });

    if (service) {
        redirect("/");
    }


    return (

        <div className={"relative flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"}>
            <Image
                className="absolute w-full h-full"
                quality={100}
                src={Field} alt={"123"} priority placeholder={"blur"}>

            </Image>
            <div className="max-w-md w-full mx-auto z-10">
                {tokenClaim ? <SubmitLoginForm/> : <SignInForm service={service!}/>}
            </div>
        </div>

    );
};

export default Page;