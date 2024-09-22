'use client';

import {TextInput} from '@mantine/core';
import React from 'react';

interface EmailInputProps {
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = (props: EmailInputProps) => {
    return (
        <div className="w-full">
            <TextInput {...props}/>
        </div>
    );
};

export default EmailInput;