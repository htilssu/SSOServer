import SignInForm from "@/app/sign-in/SignInForm";

const Page = () => {
    async function handleSignIn(value: { email: string, password: string, remember: boolean }) {
        'use server'
        return {
            status: 200,
            body: {
                message: 'OK'
            }
        }
    }

    return (
        <div className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
             style={{
                 backgroundImage: 'url(https://readymadeui.com/background-image.webp)',
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover'
             }}>
            <div className="max-w-md w-full mx-auto">
                <SignInForm handleSignIn={handleSignIn}/>
            </div>
        </div>
    );
};

export default Page;