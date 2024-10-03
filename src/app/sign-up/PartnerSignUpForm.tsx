"use client";

import React from "react";
import { isEmail, useForm } from "@mantine/form";
import {
  confirmPasswordValidator,
  passwordValidator,
} from "@/validators/password.validator";
import EmailInput from "@/components/EmailInput";
import {
  Box,
  Button,
  Checkbox,
  InputWrapper,
  LoadingOverlay,
  PasswordInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconAt, IconCalendar, IconKey } from "@tabler/icons-react";
import { Service } from "@prisma/client";
import PartnerCombobox from "@/app/sign-up/ServiceCombobox";

const now = new Date();
const minDate = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());

interface SignUpFormProps {
  services: Service[];
}

const PartnerSignUpForm = ({ services }: SignUpFormProps) => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
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
    },
  });

  const [visible, { open, close }] = useDisclosure(false);

  function handleSignUp(values: typeof form.values) {
    open();

    // TODO: Implement sign-up logic here
    setTimeout(() => {
      close();
    }, 2000);
  }

  function setService(partnerId: string) {
    console.log(partnerId);
    form.setFieldValue("service", partnerId);
    console.log(form.values);
  }

  return (
    <div className="w-full bg-white px-4 py-5 rounded-xl sm:w-1/2  lg:w-4/12">
      <h2 className={"text-2xl"}>Đăng ký tài khoản Oggy Club</h2>
      <p className={"text-sm mt-1 text-gray-500"}>
        Hãy đăng ký tài khoản Oggy Club để kết nối với các dịch vụ của chúng tôi
        1 cách nhanh chóng
      </p>
      <form onSubmit={form.onSubmit(handleSignUp)} className="mt-5">
        <Box>
          <LoadingOverlay
            visible={visible}
            overlayProps={{ radius: "xs", blur: 2 }}
            loaderProps={{ color: "pink", type: "bars" }}
          ></LoadingOverlay>
          <div className="w-full mt-1">
            <InputWrapper label={"Email"} required>
              <EmailInput
                size={"md"}
                placeholder={"Nhập email"}
                leftSection={<IconAt size={20} />}
                {...form.getInputProps("email")}
              />
            </InputWrapper>
          </div>
          <div className="w-full mt-1">
            <InputWrapper label={"Mật khẩu"} required>
              <PasswordInput
                size={"md"}
                placeholder={"Nhập mật khẩu"}
                leftSection={<IconKey size={20} />}
                {...form.getInputProps("password")}
              />
            </InputWrapper>
          </div>
          <div className="w-full mt-1">
            <InputWrapper label={"Nhập lại mật khẩu"} required>
              <PasswordInput
                size={"md"}
                placeholder={"Nhập lại mật khẩu"}
                leftSection={<IconKey size={20} />}
                {...form.getInputProps("confirmPassword")}
              />
            </InputWrapper>
          </div>
          <div className="w-full mt-1">
            <InputWrapper label={"Ngày sinh"} required>
              <DateInput
                size={"md"}
                placeholder={"Chọn ngày sinh"}
                leftSection={<IconCalendar size={20} />}
                maxDate={minDate}
                required
                valueFormat={"DD/MM/YYYY"}
                {...form.getInputProps("dob")}
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
