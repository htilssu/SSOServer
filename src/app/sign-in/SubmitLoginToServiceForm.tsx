'use client'

import React from 'react';
import SubmitOption from './SubmitOption';
import UserInfoCard from "@/app/sign-in/UserInfoCard";
import {Service, User} from "@prisma/client";


interface SubmitLoginFormProps {
    user?: User,
    service?: Service
}

const SubmitLoginToServiceForm = ({user, service}: SubmitLoginFormProps) => {


    return (
        <div className={'max-h-screen py-5 px-5 bg-white rounded-xl'}>
            <h2 className={'text-xl text-start'}>Tiếp tục sử dụng tài khoản Oggy Club để đăng nhập vào {
                service?.name
            }</h2>
            <UserInfoCard user={user!}/>

            <SubmitOption accept={() => {
            }} cancel={() => {
            }}/>
        </div>
    );
};

export default SubmitLoginToServiceForm;