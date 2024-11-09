/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of htilssu. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 11-10-2024
 *  ******************************************************
 */
import React from 'react';
import Shield from '../../../public/shield.svg'
import Image from "next/image";
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <section className="min-h-screen text-white flex justify-center items-center bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            Dễ dàng đăng nhập các dịch vụ với tài khoản SSO
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Với tài khoản SSO của chúng tôi, bạn có thể nhanh chóng đăng nhập tới cách dịch vụ liên kết
                            chỉ với 1 nút bấm.</p>
                        <Link href="/sign-in"
                              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-600">
                            Đăng ký tài khoản
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </Link>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image src={Shield} quality={100} priority={true}
                               alt="mockup"/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;