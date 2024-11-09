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

const colors = [
    'bg-green-400',
    'bg-blue-400',
    'bg-red-400',
    'bg-yellow-400',
]

export interface OverviewSectionProps {
    items: OverviewItemProps[]
}

const OverviewSection = ({items}: OverviewSectionProps) => {
    let currentColorIndex = 0;

    return (
        <div className={'grid-cols-4 grid-rows-1 grid gap-2'}>
            {items?.map((item => (
                <OverviewItem key={item.name} color={item?.color ?? colors[currentColorIndex++]} name={item.name}
                              value={item.value}/>
            )))}
        </div>
    );
};

export interface OverviewItemProps {
    name: string,
    value: number,
    color?: string
}

const OverviewItem = (item: OverviewItemProps) => {
    return (
        <div className={`overflow-hidden ${item?.color} px-3 text-white py-5 aspect-video rounded-2xl bg-green-400`}>
            <div className={'uppercase font-bold text-lg'}>
                {item.name}
            </div>
            <div className={'text-2xl'}>
                {item.value}
            </div>
        </div>
    );
};

export default OverviewSection;