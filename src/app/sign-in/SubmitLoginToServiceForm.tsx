'use client'

import React from 'react';
import SubmitOption from './SubmitOption';
import UserInfoCard from "@/app/sign-in/UserInfoCard";
import {Service, User} from "@prisma/client";
import {useSearchParams} from "next/navigation";
import {parse} from "cookie";


interface SubmitLoginFormProps {
    user: User,
    service: Service,
    referer: string
}

const SubmitLoginToServiceForm = ({user, service, referer}: SubmitLoginFormProps) => {
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl')!;


    function acceptLoginHandler() {
        const cookies = parse(document.cookie);
        location.href = returnUrl + `?Token=${cookies.Token!}`
    }

    function cancelLoginHandler() {
        location.href = referer!;
    }

    return (
        <div className={'max-h-screen py-5 px-5 bg-white rounded-xl'}>
            <h2 className={'text-xl text-start'}>Tiếp tục sử dụng tài khoản Oggy Club để đăng nhập vào {
                service?.name
            }</h2>
            <UserInfoCard user={user!}/>

            <SubmitOption accept={acceptLoginHandler} cancel={cancelLoginHandler}/>
        </div>
    );
};

export default SubmitLoginToServiceForm;