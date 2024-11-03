"use client";

import React, {useState} from "react";
import {isEmail, useForm} from "@mantine/form";
import {confirmPasswordValidator, passwordValidator,} from "@/validators/password.validator.ts";
import EmailInput from "@/components/EmailInput.tsx";
import {Box, Button, Checkbox, InputWrapper, LoadingOverlay, PasswordInput, TextInput,} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconAt, IconKey} from "@tabler/icons-react";
import {Service} from "@prisma/client";
import PartnerCombobox from "@/app/(no_layout)/sign-up/ServiceCombobox.tsx";
import {SignUpDto, signUpPartner} from "@/services/sign-up.service.ts";
import {removeNullProperties} from "@/utils/object.util.ts";
import {ErrorModel} from "@/dtos/error.model.ts";
import {nameValidator} from "@/validators/user.validator.ts";
import {redirectByReturnUrl} from "@/utils/redirect.util.ts";
import {useRouter} from "next/navigation";

interface SignUpFormProps {
    services: Service[];
}

const PartnerSignUpForm = ({services}: SignUpFormProps) => {
    const router = useRouter();

    const form = useForm({
        mode: "controlled",
        initialValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
            username: "",
            phoneNumber: "",
            term: false,
            service: "",
        },

        validate: {
            password: passwordValidator,
            confirmPassword: confirmPasswordValidator,
            email: isEmail("Email không hợp lệ"),
            term: (value) => {
                if (value == false)
                    return "Bạn phải đồng ý với các điều khoản của Oggy Club";
            },
            service: (value) => {
                if (value == "") return "Bạn phải chọn 1 dịch vụ";
            },
            name: nameValidator,
        },
    });

    const [error, setError] = useState<ErrorModel>();

    const [visible, {open, close}] = useDisclosure(false);

    async function handleSignUp(values: typeof form.values) {
        open();
        setError(undefined)
        const res = await signUpPartner(removeNullProperties({
            ...values
        }) as SignUpDto);
        close();
        if (!res.ok) {
            setError(await res.json());
        } else {
            redirectByReturnUrl();
            router.push("/")
        }
    }

    function setService(partnerId: string) {
        form.setFieldValue("service", partnerId);
    }

    return (
        <div className="w-full bg-white bg-opacity-5 text-white backdrop-blur px-4 py-5 rounded-xl sm:w-1/2  lg:w-4/12">
            <h2 className={"text-2xl"}>Đăng ký tài khoản Oggy Club</h2>
            <p className={"text-sm mt-1 text-gray-300"}>
                Hãy đăng ký tài khoản Oggy Club để kết nối với các dịch vụ của chúng tôi
                1 cách nhanh chóng
            </p>
            <form onSubmit={form.onSubmit(handleSignUp)} className="mt-5">
                <Box>
                    <LoadingOverlay
                        visible={visible}
                        overlayProps={{radius: "xs", blur: 2}}
                        loaderProps={{color: "pink", type: "bars"}}
                    ></LoadingOverlay>
                    <div className="w-full mt-1">
                        <TextInput
                            size={"md"}
                            label={"Tên đối tác"}
                            placeholder={"Nhập tên đối tác"}
                            leftSection={<IconKey size={20}/>}
                            {...form.getInputProps("name")}
                        />
                    </div>
                    <div className="w-full mt-1">
                        <InputWrapper label={"Email"} required>
                            <EmailInput
                                size={"md"}
                                placeholder={"Nhập email"}
                                leftSection={<IconAt size={20}/>}
                                {...form.getInputProps("email")}
                            />
                        </InputWrapper>
                    </div>
                    <div className="w-full mt-1">
                        <InputWrapper label={"Mật khẩu"} required>
                            <PasswordInput
                                size={"md"}
                                placeholder={"Nhập mật khẩu"}
                                leftSection={<IconKey size={20}/>}
                                {...form.getInputProps("password")}
                            />
                        </InputWrapper>
                    </div>
                    <div className="w-full mt-1">
                        <InputWrapper label={"Nhập lại mật khẩu"} required>
                            <PasswordInput
                                size={"md"}
                                placeholder={"Nhập lại mật khẩu"}
                                leftSection={<IconKey size={20}/>}
                                {...form.getInputProps("confirmPassword")}
                            />
                        </InputWrapper>
                    </div>
                    <div className="w-full mt-1">
                        <InputWrapper label={"Dịch vụ"} required>
                            <PartnerCombobox
                                {...form.getInputProps("service")}
                                size={"md"}
                                currentService={form.values.service}
                                services={services}
                                setService={setService}
                            />
                        </InputWrapper>
                    </div>
                    <div className="w-full mt-3 flex items-center justify-start">
                        <Checkbox
                            label={"Tôi đồng ý với các điều khoản của Oggy Club"}
                            id={"term"}
                            size={"sm"}
                            {...form.getInputProps("term")}
                        />
                    </div>
                </Box>
                <div className={'text-red-600 text-sm h-4 mt-2'}>
                    {error?.msg}
                </div>
                <div className="mt-5">
                    <Button fullWidth size={"md"} type={"submit"}>
                        Đăng ký
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PartnerSignUpForm;
