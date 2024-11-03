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
 *  * Created: 27-10-2024
 *  ******************************************************
 */

import type {Metadata} from "next";
import {Rubik} from "next/font/google";
import {MantineProvider} from "@mantine/core";
import React from "react";

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

async function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body
            className={`${rubik.className} selection:text-white select-none selection:bg-sky-300 antialiased`}
        >
            {children}
        </body>
        </html>
    );
}

export default Layout;