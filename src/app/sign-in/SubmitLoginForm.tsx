'use client'

import React from 'react';
import SubmitOption from './SubmitOption';
import UserInfoCard from "@/app/sign-in/UserInfoCard";


const SubmitLoginForm = () => {


    return (
        <div className={'max-h-screen py-5 px-5 bg-white rounded-xl'}>
            <h2 className={'text-xl text-start'}>Tiếp tục sử dụng tài khoản Oggy Club để đăng nhập vào {
                "domain"
            }</h2>
            <UserInfoCard/>

            <SubmitOption accept={() => {}} cancel={() => {}}/>
        </div>
    );
};

export default SubmitLoginForm;