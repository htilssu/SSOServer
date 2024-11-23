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
 *  * Created: 9-11-2024
 *  ******************************************************
 */
"use client"

import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/cache.ts";
import React, {ReactNode} from "react";

const CacheProvider = ({children}: Readonly<{ children: ReactNode }>) => {


    return (<QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>);
};

export default CacheProvider;