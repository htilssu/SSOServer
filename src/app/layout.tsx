import type {Metadata} from "next";
import "./globals.css";
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
