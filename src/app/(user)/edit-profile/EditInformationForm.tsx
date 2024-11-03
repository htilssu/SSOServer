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

import React, {useEffect, useRef, useState} from 'react';
import {IconCamera} from "@tabler/icons-react";
import {Button, FileInput} from "@mantine/core";
import {uploadAvatar} from "@/services/image.service.ts";

const EditInformationForm = () => {
    const avtInput = useRef<HTMLButtonElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState(new FormData());


    // @ts-ignore
    function onChooseAvatar(): void {
        avtInput.current!.click();
    }

    return (
        <div>
            <div onClick={onChooseAvatar}
                 className={'w-24 rounded-full border-[3px] border-dashed border-gray-900 hover:bg-gray-200 h-24 flex justify-center items-center'}>
                <IconCamera size={44}/>
                <FileInput value={file} onChange={setFile} ref={avtInput} className={'hidden'} accept={"image/*"}/>
            </div>
            <Button onClick={() => {
                formData.append('avatar', file as File);
                uploadAvatar(file);
            }}>Save</Button>
        </div>
    );
};

export default EditInformationForm;