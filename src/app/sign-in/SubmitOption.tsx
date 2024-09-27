import React from 'react';
import {Button} from "@mantine/core";


type SubmitOptionProps = {
    cancel: () => void
    accept: () => void
}
const SubmitOption = ({cancel, accept}: SubmitOptionProps) => {

    return (
        <div className='flex gap-2 mt-3'>
            <Button
                onClick={cancel}
                fullWidth={true}
                className={'!bg-gray-200 hover:!bg-gray-300 !text-gray-800'}
                size={'md'}
            >
                Hủy
            </Button>
            <Button
                onClick={accept}
                fullWidth={true}
                color={'green'}
                size={'md'}
            >
                Tiếp tục
            </Button>
        </div>
    )
};

export default SubmitOption;