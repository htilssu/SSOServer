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
import {useQuery} from "@tanstack/react-query";
import {getUserInfo} from "@/lib/user.ts";

export interface AuthClient {
    id: string,
    username: string,
    role: string,
    avatar: string,
    name: string,
    email: string,
}

const useAuth = (): AuthClient => {
    const {data} = useQuery({
        queryKey: ['user'],
        queryFn: getUserInfo
    });

    return data as AuthClient;
};

export default useAuth;