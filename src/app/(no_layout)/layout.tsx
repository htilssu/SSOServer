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
 *  * Created: 3-11-2024
 *  ******************************************************
 */

import type {Metadata} from "next";
import "../globals.css";
import '@mantine/core/styles.css';
import React from "react";
import {MantineProvider} from "@mantine/core";
import {Rubik} from "next/font/google";
import Navbar from "@/components/Navbar.tsx";


export const metadata: Metadata = {
    title: "SSO Service",
    description: "Single Sign-On Service",
    openGraph: {
        title: "Single Sign On Service",
        description: "Dịch vụ đăng nhập 1 lần của oggy club",
        countryName: "VietNam",
    }
};

const rubik = Rubik({
    weight: ["300", "400", '500', '600'],
    subsets: ['latin'],
    preload: true,
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body
            className={`${rubik.className} selection:text-white select-none selection:bg-sky-300 antialiased`}
        >
        <MantineProvider>
            {children}
        </MantineProvider>
        </body>
        </html>
    );
}