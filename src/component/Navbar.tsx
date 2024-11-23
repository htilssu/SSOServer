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
 *  * Created: 1-11-2024
 *  ******************************************************
 */
import Link from "next/link";
import AuthSection from "@/component/AuthSection.tsx";
import {auth} from "@/service/auth.service.ts";

export const experimental_ppr = true;

const Navbar = async () => {
    const session = await auth();

    return (
        <nav className="bg-gray-900 p-4 px-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link href="/">SSO</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link href="/"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Home</Link>
                    <Link href="/about"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">About</Link>
                    <Link href="/services"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Services</Link>
                    <Link href="/contact"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Contact</Link>
                </div>
                <div className="md:hidden flex items-center">
                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md">
                        {/* Icon for mobile menu */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16m-7 6h7"/>
                        </svg>
                    </button>
                </div>
                <div className="relative">
                    <AuthSection session={session}/>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

