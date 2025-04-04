'use client'

import React, {useState} from 'react';
import {isEmail, useForm} from "@mantine/form";
import {confirmPasswordValidator, passwordValidator} from "@/validator/password.validator.ts";
import EmailInput from "@/component/EmailInput.tsx";
import {Box, Button, Checkbox, InputWrapper, LoadingOverlay, PasswordInput, TextInput} from "@mantine/core";
import {DateInput} from '@mantine/dates';
import {dobValidator, maxAge, minAge} from "@/validator/dob.validator.ts";
import {useDisclosure} from "@mantine/hooks";
import {IconAt, IconCalendar, IconKey} from "@tabler/icons-react";
import Link from "next/link";
import {ErrorModel} from "@/dto/error.model.ts";
import {signUpUser} from "@/service/sign-up.service.ts";
import {removeNullProperties} from "@/util/object.util.ts";
import {nameValidator} from "@/validator/user.validator.ts";
import {redirectByReturnUrl} from "@/util/redirect.util.ts";
import {useRouter} from "next/navigation";

const now = new Date();
const maxDate = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());
const minDate = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());


const CustomerSignUpForm = () => {
    const router = useRouter();


    const form = useForm({
        mode: "controlled",
        initialValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
            dob: maxDate,
            username: "",
            phoneNumber: "",
            term: false,
        },

        validate: {
            password: passwordValidator,
            lastName: nameValidator,
            firstName: nameValidator,
            confirmPassword: confirmPasswordValidator,
            email: isEmail("Email không hợp lệ"),
            dob: dobValidator,
            term: (value) => {
                if (value == false) return "Bạn phải đồng ý với các điều khoản của Oggy Club";
            }
        }
    });

    const [signUpErr, setSignUpErr] = useState<ErrorModel | null>(null)


    const [visible, {open, close}] = useDisclosure(false);

    async function handleSignUp(values: typeof form.values) {
        open();
        // @ts-ignore
        const res = await signUpUser(removeNullProperties({
            ...values, term: null, confirmPassword: null
        }));
        close();
        if (!res.ok) {
            setSignUpErr(await res.json())
        } else {
            setSignUpErr(() => null)
            redirectByReturnUrl()
            router.push("/")
        }
    }


    return (
        <div
            className='w-full overflow-hidden bg-opacity-5 text-white backdrop-blur bg-white px-6 py-10 rounded-xl sm:w-1/2  lg:w-4/12'>
            <h2 className={'text-2xl'}>Đăng ký tài khoản Oggy Club</h2>
            <p className={'text-sm mt-1 text-gray-500'}>Hãy đăng ký tài khoản Oggy Club để kết nối với các dịch vụ
                của
                chúng tôi 1 cách
                nhanh chóng</p>
            <form onSubmit={form.onSubmit(handleSignUp)} className='mt-5'>
                <Box>
                    <LoadingOverlay visible={visible} overlayProps={{radius: 'xs', blur: 2}}
                                    loaderProps={{color: 'pink', type: 'bars'}}>

                    </LoadingOverlay>
                    <div className='w-full mt-1'>

                        <InputWrapper label={"Email"} required>
                            <EmailInput size={'md'} placeholder={'Nhập email'}
                                        leftSection={<IconAt size={20}/>}  {...form.getInputProps('email')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1 flex gap-2'>
                        <InputWrapper label={"Họ"} required>
                            <TextInput size={'md'} placeholder={'Nhập họ'}
                                       leftSection={<IconAt size={20}/>}  {...form.getInputProps('lastName')} />
                        </InputWrapper>
                        <InputWrapper label={"Tên"} required>
                            <TextInput size={'md'} placeholder={'Nhập tên'}
                                       leftSection={<IconAt size={20}/>}  {...form.getInputProps('firstName')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1'>
                        <InputWrapper label={"Mật khẩu"} required>
                            <PasswordInput size={'md'} placeholder={'Nhập mật khẩu'}
                                           leftSection={<IconKey size={20}/>} {...form.getInputProps('password')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1'>
                        <InputWrapper label={"Nhập lại mật khẩu"} required>
                            <PasswordInput size={'md'} placeholder={'Nhập lại mật khẩu'}
                                           leftSection={<IconKey size={20}/>} {...form.getInputProps(
                                'confirmPassword')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1'>
                        <InputWrapper label={"Ngày sinh"} required>
                            <DateInput size={'md'} placeholder={'Chọn ngày sinh'}
                                       leftSection={<IconCalendar size={20}/>} minDate={minDate} maxDate={maxDate}
                                       required
                                       valueFormat={'DD/MM/YYYY'}  {...form.getInputProps('dob')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-3 flex items-center justify-start'>
                        <Checkbox label={"Tôi đồng ý với các điều khoản của Oggy Club"} id={'term'}
                                  size={'sm'} {...form.getInputProps('term')} />
                    </div>
                </Box>
                <div className={'mt-1 h-5 text-sm text-red-600'}>
                    {signUpErr?.msg}
                </div>
                <div className='mt-5'>
                    <Button fullWidth size={'md'} type={"submit"}>
                        Đăng ký
                    </Button>
                    <div className={'mt-2 flex justify-center'}>
                        <Link href={'/sign-up/partner'} className={'text-sm hover:text-blue-600 font-bold'}>
                            Đăng ký Partner
                        </Link>
                    </div>
                </div>
            </form>
            <div className={'flex mt-3 justify-center'}>
                <p className={'text-sm'}>Đã có tài khoản
                    <Link
                        className={'font-bold hover:underline text-blue-600 ml-1'} href={"/sign-in"}>Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default CustomerSignUpForm;