/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of $author. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 5-10-2024
 *  ******************************************************
 */

'use client'

import {useDisclosure} from "@mantine/hooks";
import React, {useState} from "react";
import {ErrorModel} from "@/dto/error.model.ts";
import {useForm} from "@mantine/form";
import {confirmPasswordValidator, passwordValidator} from "@/validator/password.validator.ts";
import {IconKey} from "@tabler/icons-react";
import {Button, LoadingOverlay, PasswordInput} from "@mantine/core";

const NewPasswordForm = () => {

    const [loading, {open, close}] = useDisclosure(false);
    const [changePasswordStatus, setChangePasswordStatus] = useState<ErrorModel | null>(null)
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: {
            password: passwordValidator,
            confirmPassword: confirmPasswordValidator
        }
    })

    async function handleSubmit(value: typeof form.values) {
        setChangePasswordStatus(null)
        open();


    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}
              className="bg-opacity-60 overflow-hidden backdrop-blur bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
            <LoadingOverlay visible={loading} overlayProps={{
                blur: 5,
            }}  loaderProps={{
                color: "blue",
            }}/>
            <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Đổi mật khẩu</h3>
            </div>

            <div>
                <PasswordInput leftSection={<IconKey size={20}/>}  {...form.getInputProps('password')} size='md'
                               placeholder={"Nhập mật khẩu mới"}/>
            </div>

            <div className="mt-6">
                <PasswordInput leftSection={<IconKey size={20}/>}  {...form.getInputProps('confirmPassword')} size='md'
                               placeholder={"Nhập lại mật khẩu mới"}/>
            </div>
            <div className={'text-red-600 mt-2 min-h-5 text-sm'}>
                {changePasswordStatus?.msg}
            </div>

            <div className="mt-5">
                <Button loaderProps={{
                    type: "oval",
                }} fullWidth={true} size={"md"} type="submit"
                        className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none">
                    Đổi mật khẩu
                </Button>
            </div>

            <hr className="my-6 border-gray-400"/>
        </form>
    );
};

export default NewPasswordForm;