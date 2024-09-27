import React from 'react';
import {Avatar, Badge} from "@mantine/core";

const UserInfoCard = () => {
    return (<div className={'p-2 mt-3'}>
        <div className={'flex'}>
            <Avatar color={'blue'} size={'lg'} name={"Trung Hiếu"}/>
            <div className={'flex flex-col items-start w-full justify-center p-2 ml-2 text-base'}>
                <div className={'flex w-full gap-2 items-center justify-between'}>
                    <p>Trần Trung Hiếu</p>
                    <Badge color={''} className={'!hidden sm:!grid'}>Đã xác thực</Badge>
                </div>
                <p className={'text-sm text-gray-400'}>Đã kết nối với 3 dịch vụ khác</p>
            </div>
        </div>
    </div>);
};

export default UserInfoCard;