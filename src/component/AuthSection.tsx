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

"use client"
import Link from "next/link";
import {useClickOutside} from "@mantine/hooks";
import {useState} from "react";
import {Avatar} from "@mantine/core";
import {useRouter} from "next/navigation";
import {Auth} from "@/service/auth.service.ts";

function AuthSection({session}: { session: Auth | null }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useClickOutside(() => setDropdownOpen(false));
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };


    const handleLogout = () => {
        document.cookie = `Token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        router.refresh();
        setDropdownOpen(false);
    };

    return (
        <div>
            {session?.isAuthenticated ? (<Avatar src={session?.avatar} onClick={toggleDropdown}/>) : (
                <Link className={"text-white hover:bg-gray-700 hover:text-white px-3 py-3 rounded-md"} href={"/sign-in"}
                >
                    Đăng nhập
                </Link>)}
            {dropdownOpen && (
                <div ref={ref} onClick={() => setDropdownOpen(false)}
                     className="absolute overflow-hidden rounded-lg right-0 mt-2 w-48 bg-white shadow-lg z-10">
                    <div className="" role="menu" aria-orientation="vertical"
                         aria-labelledby="options-menu">
                        <Link href="/edit-profile"
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-300"
                              role="menuitem">
                            Chỉnh sửa thông tin
                        </Link>
                        <button onClick={handleLogout}
                                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-300"
                                role="menuitem">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AuthSection;