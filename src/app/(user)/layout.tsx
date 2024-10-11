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

import type {Metadata} from "next";
import "../globals.css";
import '@mantine/core/styles.css';
import React from "react";
import {MantineProvider} from "@mantine/core";
import {Rubik} from "next/font/google";


export const metadata: Metadata = {
    title: "SSO Service",
    description: "Single Sign-On Service",
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