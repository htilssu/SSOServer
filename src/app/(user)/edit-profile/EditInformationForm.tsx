'use client'


/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
*
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

import React, {useRef} from 'react';
import {IconCamera} from "@tabler/icons-react";
import {FileInput} from "@mantine/core";

const EditInformationForm = () => {
    const avtInput = useRef<HTMLButtonElement>(null);

    // @ts-ignore
    function onChooseAvatar(): void {
        avtInput.current!.click();
    }

    return (
        <div>
            <div onClick={onChooseAvatar}
                 className={'w-24 rounded-full border-[3px] border-dashed border-gray-900 hover:bg-gray-200 h-24 flex justify-center items-center'}>
                <IconCamera size={44}/>
                <FileInput ref={avtInput} className={'hidden'} accept={"image/*"}/>
            </div>
        </div>
    );
};

export default EditInformationForm;