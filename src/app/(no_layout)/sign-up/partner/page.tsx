'use server';

import React from 'react';
import Image from "next/image";
import Nano from "@@/background/neon.png"
import {cookies} from "next/headers";

export async function generateMetadata() {
    return {
        title: "Dịch vụ tạm thời ngừng hoạt động",
    }
}

const ServerUnavailablePage = async () => {
    await cookies();

    return (
        <div className="relative flex justify-center items-center h-screen w-full overflow-hidden">
            <Image
                className="absolute inset-0 object-cover w-full h-full z-0"
                src={Nano}
                alt="Background"
                quality={100}
                priority
                placeholder="blur"
            />
            <div className="relative z-10 text-center bg-white/80 backdrop-blur-md p-10 rounded-xl shadow-2xl max-w-2xl mx-auto">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 mx-auto text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Dịch vụ tạm thời ngừng hoạt động
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Chúng tôi đang tiến hành nâng cấp và bảo trì hệ thống.
                    Vui lòng quay lại sau hoặc liên hệ với bộ phận hỗ trợ để biết thêm thông tin.
                </p>
                <div className="flex justify-center space-x-4">
                    <a
                        href="mailto:support@example.com"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Liên hệ hỗ trợ
                    </a>
                    <a
                        href="/"
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                        Quay về trang chủ
                    </a>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                    <p>Mã lỗi: SERVER_MAINTENANCE_MODE</p>
                    <p>Thời gian dự kiến: Đang cập nhật</p>
                </div>
            </div>
        </div>
    );
}

export default ServerUnavailablePage;



/*
'use server';

import React from 'react';
import '@mantine/dates/styles.css';
import prisma from "@/prisma.ts";
import {Service} from "@prisma/client";
import Image from "next/image";
import Nano from "@@/background/neon.png"
import PartnerSignUpForm from './PartnerSignUpForm.tsx';
import {cookies} from "next/headers";

export async function generateMetadata() {
    return {
        title: "Đăng ký tài khoản đối tác",
    }
}


const Page = async () => {
    await cookies();
    const services: Service[] = await prisma.service.findMany();
    return (
        <div className={"relative flex justify-center items-center h-full min-h-screen p-4"}>
            <Image
                className="absolute object-cover w-full h-full"
                quality={100}
                src={Nano} alt={"123"} priority placeholder={"blur"}>

            </Image>
            <div className={'flex justify-center z-10 items-center w-full'}>
                <PartnerSignUpForm services={services}/>
            </div>
        </div>
    );
}

export default Page;*/
