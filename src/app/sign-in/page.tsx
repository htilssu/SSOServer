import SignInForm from "@/app/sign-in/SignInForm";
import {cookies, headers} from "next/headers";
import prisma from "@/prisma";
import {jwtVerify} from "@/app/services/jwt";
import SubmitLoginForm from "@/app/sign-in/SubmitLoginForm";

const Page = async () => {
    const header = headers();
    const cookie = cookies();
    const referer = header.get('Referer');
    let tokenClaim;

    if (cookie.has('Token')) {
        tokenClaim = await jwtVerify(cookie.get('Token')!.value);
    }

    const partner = await prisma.partner.findFirst({
        where: {webUrl: {hasSome: ["http://localhost.com", referer ?? ""]}}
    });

    const userPartner = await prisma.userPartner.findFirst({
        where: {
            partnerId: partner?.id,
            userId: tokenClaim?.payload.sub
        }, include: {
            Partner: true,
            User: true,
        }
    })


    return (
        <div className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
             style={{
                 backgroundImage: 'url(https://readymadeui.com/background-image.webp)',
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover'
             }}>
            <div className="max-w-md w-full mx-auto">
                {/*{tokenClaim ? <SubmitLoginForm /> : <SignInForm partner={partner}/>}*/}
                <SubmitLoginForm/>
            </div>
        </div>
    );
};

export default Page;