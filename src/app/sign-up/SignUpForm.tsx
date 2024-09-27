'use client'

import React from 'react';
import {isEmail, useForm} from "@mantine/form";
import {confirmPasswordValidator, passwordValidator} from "@/validators/password.validator";
import EmailInput from "@/components/EmailInput";
import {Box, Button, Checkbox, InputWrapper, LoadingOverlay, PasswordInput} from "@mantine/core";
import {DateInput} from '@mantine/dates';
import {dobValidator} from "@/validators/dob.validator";
import {useDisclosure} from "@mantine/hooks";
import {IconAt, IconCalendar, IconKey} from "@tabler/icons-react";
import {Service} from "@prisma/client";
import PartnerCombobox from "@/app/sign-up/ServiceCombobox";

const now = new Date();
const minDate = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());

interface SignUpFormProps {
    services: Service[]
}

const SignUpForm = ({services}: SignUpFormProps) => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            dob: minDate,
            username: '',
            phoneNumber: '',
            term: false,
            partner: '',
        },

        validate: {
            password: passwordValidator,
            confirmPassword: confirmPasswordValidator,
            email: isEmail("Email không hợp lệ"),
            dob: dobValidator,
            term: (value) => {
                if (value == false) return "Bạn phải đồng ý với các điều khoản của Oggy Club";
            }
        }
    });

    const [visible, {open, close}] = useDisclosure(false);

    function handleSignUp(values: typeof form.values) {
        open();

        // TODO: Implement sign-up logic here
        setTimeout(() => {
            close();
        }, 2000)
    }

    function setPartner(partnerId: string) {
        form.setFieldValue('partner', partnerId);
    }

    return (
        <div className='w-full bg-white px-4 py-5 rounded-xl sm:w-1/2  lg:w-4/12'>
            <h2 className={'text-2xl'}>Đăng ký tài khoản Oggy Club</h2>
            <p className={'text-sm mt-1 text-gray-500'}>Hãy đăng ký tài khoản Oggy Club để kết nối với các dịch vụ của
                chúng tôi 1 cách
                nhanh chóng</p>
            <form onSubmit={form.onSubmit(handleSignUp)} className='mt-5'>
                <Box>
                    <LoadingOverlay visible={visible} overlayProps={{radius: 'xs', blur: 2}}
                                    loaderProps={{color: 'pink', type: 'bars'}}>

                    </LoadingOverlay>
                    <div className='w-full mt-1'>

                        <InputWrapper label={"Email"} required>
                            <EmailInput leftSection={<IconAt size={16}/>}  {...form.getInputProps('email')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1'>
                        <InputWrapper label={"Mật khẩu"} required>
                            <PasswordInput leftSection={<IconKey size={16}/>} {...form.getInputProps('password')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1'>
                        <InputWrapper label={"Nhập lại mật khẩu"} required>
                            <PasswordInput leftSection={<IconKey size={16}/>} {...form.getInputProps(
                                'confirmPassword')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1'>
                        <InputWrapper label={"Ngày sinh"} required>
                            <DateInput leftSection={<IconCalendar size={16}/>} maxDate={minDate} required
                                       valueFormat={'DD/MM/YYYY'}  {...form.getInputProps('dob')} />
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-1'>
                        <InputWrapper label={"Dịch vụ"} required>
                            <PartnerCombobox services={services} setService={setPartner}/>
                        </InputWrapper>
                    </div>
                    <div className='w-full mt-3 flex items-center justify-start'>
                        <Checkbox label={"Tôi đồng ý với các điều khoản của Oggy Club"} id={'term'}
                                  size={'xs'} {...form.getInputProps('term')} />
                    </div>
                </Box>
                <div className='mt-5'>
                    <Button fullWidth type={"submit"}>
                        Đăng ký
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;