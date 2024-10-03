'use client'

import React, {useState} from 'react';
import EmailInput from "@/components/EmailInput";
import {Button, Checkbox, PasswordInput} from "@mantine/core";
import Link from "next/link";
import {isEmail, useForm} from "@mantine/form";
import {useDisclosure} from "@mantine/hooks";
import {ErrorModel} from "@/dtos/error.model";
import {Service} from '@prisma/client';
import {passwordValidator} from "@/validators/password.validator";
import {IconKey, IconMail} from "@tabler/icons-react";
import {signIn, SignInData} from "@/services/sign-in.service.ts";


interface SignInFormProps {
    service: Service
}

const SignInForm = ({service}: SignInFormProps) => {
    const [loading, {open, close}] = useDisclosure(false);
    const [loginStatus, setLoginStatus] = useState<ErrorModel | null>(null)
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: '',
            password: '',
            remember: false
        },
        validate: {
            email: isEmail("Email không hợp lệ"),
            password: passwordValidator
        }
    })

    async function handleSubmit(value: typeof form.values) {
        setLoginStatus(null)
        open();
        const res = await signIn(value as SignInData)
        close();
        if (!res.ok) {
            setLoginStatus(await res.json())
        }
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}
              className="bg-opacity-60 backdrop-blur bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
            <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Đăng nhập</h3>
            </div>

            <div>
                <div className="relative flex items-center">
                    <EmailInput leftSection={<IconMail size={20}/>} {...form.getInputProps('email')} size={'md'}
                                placeholder={"Nhập email"}/>
                </div>
            </div>

            <div className="mt-6">
                <PasswordInput leftSection={<IconKey size={20}/>}  {...form.getInputProps('password')} size='md'
                               placeholder={"Nhập mật khẩu"}/>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                    <Checkbox {...form.getInputProps('remember')}/>
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                        Nhớ mật khẩu
                    </label>
                </div>
                <div>
                    <Link href="/forgot-password"
                          className="text-blue-600 text-sm font-semibold hover:underline">
                        Quên mật khẩu?
                    </Link>
                </div>
            </div>
            <div className={'text-red-600 mt-2 min-h-5 text-sm'}>
                {loginStatus?.msg}
            </div>

            <div className="mt-5">
                <Button loading={loading} loaderProps={{
                    type: "oval",
                }} fullWidth={true} size={"md"} type="submit"
                        className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none">
                    Đăng nhập
                </Button>
                <p className="text-gray-800 text-sm text-center mt-6">Không có tài khoản? <Link
                    href="/sign-up"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Đăng ký</Link></p>
            </div>

            <hr className="my-6 border-gray-400"/>
        </form>
    );
};

export default SignInForm;