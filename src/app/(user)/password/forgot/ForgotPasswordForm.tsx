'use client'

import React, {useState} from 'react';
import EmailInput from "@/component/EmailInput.tsx";
import {Button} from "@mantine/core";
import {isEmail, useForm} from "@mantine/form";
import {useDisclosure} from "@mantine/hooks";
import {ErrorModel} from "@/dto/error.model.ts";
import {Service} from '@prisma/client';
import {IconMail} from "@tabler/icons-react";


interface ForgotPasswordForm {
    service?: Service
}

const ForgotPasswordForm = ({service}: ForgotPasswordForm) => {
    const [loading, {open, close}] = useDisclosure(false);
    const [loginStatus, setLoginStatus] = useState<ErrorModel | null>(null)
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: '',
        },
        validate: {
            email: isEmail("Email không hợp lệ"),
        }
    })

    async function handleSubmit(value: typeof form.values) {
        setLoginStatus(null)
        open();
        // TODO: forgot password
        close();
        /*  if (!res.ok) {
              setLoginStatus(await res.json())
          }*/
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}
              className="bg-opacity-60 backdrop-blur w-full bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
            <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Quên mật khẩu</h3>
                <p className={'text-gray-500 text-sm mt-1'}>Hãy nhập email của bạn để lấy lại mật khẩu</p>
            </div>

            <div>
                <div className="relative flex items-center">
                    <EmailInput leftSection={<IconMail size={20}/>} {...form.getInputProps('email')} size={'md'}
                                placeholder={"Nhập email"}/>
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
                    Lấy lại mật khẩu
                </Button>
            </div>

            <hr className="my-6 border-gray-400"/>
        </form>
    );
};

export default ForgotPasswordForm;