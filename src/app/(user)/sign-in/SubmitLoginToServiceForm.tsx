'use client'

import React from 'react';
import SubmitOption from './SubmitOption';
import {Account, Partner, Service, User} from "@prisma/client";
import {useSearchParams} from "next/navigation";
import {parse} from "cookie";
import UserInfoCard from './UserInfoCard';


interface SubmitLoginFormProps {
    account: Account & { User?: User, Partner?: Partner },
    service: Service,
}

const SubmitLoginToServiceForm = ({account, service}: SubmitLoginFormProps) => {
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl')!;


    function acceptLoginHandler() {
        const cookies = parse(document.cookie);
        location.href = returnUrl + `?Token=${cookies.Token!}`
    }

    function cancelLoginHandler() {
        location.href = returnUrl;
    }

    return (
        <div className={'max-h-screen py-5 px-5 bg-white rounded-xl'}>
            <h2 className={'text-xl text-start'}>Tiếp tục sử dụng tài khoản Oggy Club để đăng nhập vào {
                service?.name
            }</h2>
            {account.accountType === "user" && <UserInfoCard user={account.User!}/>}
            <SubmitOption accept={acceptLoginHandler} cancel={cancelLoginHandler}/>
        </div>
    );
};

export default SubmitLoginToServiceForm;