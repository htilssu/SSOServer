export interface SignInData {
    email: string;
    password: string;
    remember: boolean;
}

export async function signIn(data: SignInData) {
    return await fetch("/v1/sign-in", {
        mode: 'same-origin',
        body: JSON.stringify(data),
        method: 'POST',
    })
}