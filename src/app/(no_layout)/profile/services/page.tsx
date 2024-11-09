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
 *  * Created: 8-11-2024
 *  ******************************************************
 */
"use client"

import React from 'react';
import OverviewSection, {OverviewItemProps} from "@/app/(no_layout)/profile/services/overview-section.tsx";

const items: OverviewItemProps[] = [
    {
        name: "Tổng dịch vụ đăng ký",
        value: 20
    },
    {
        name: "Partners",
        value: 10
    },
    {
        name: "Dịch vụ đang hoạt động",
        value: 5
    }
]

const Page = () => {
    return (
        <>
            <OverviewSection items={items}/>

        </>
    );
};

export default Page;
