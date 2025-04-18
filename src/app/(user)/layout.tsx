import type {Metadata} from "next";
import "../globals.css";
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import {Rubik} from "next/font/google";
import Navbar from "@/component/Navbar.tsx";
import React from "react";
import CacheProvider from "@/component/cache-provider.tsx";


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "SSO Service",
        description: "Single Sign-On Service",
        openGraph: {
            title: "Single Sign On Service",
            description: "Dịch vụ đăng nhập 1 lần của oggy club",
            countryName: "VietNam",
        }
    };
}

const rubik = Rubik({
    weight: ["300", "400", '500', '600'],
    subsets: ['latin'],
    preload: true,
})

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body
            className={`${rubik.className} selection:text-white bg-gray-900 select-none selection:bg-sky-300 antialiased`}
        >
        <CacheProvider>
            <MantineProvider>
                <Navbar/>
                {children}
            </MantineProvider>
        </CacheProvider>
        </body>
        </html>
    );
}