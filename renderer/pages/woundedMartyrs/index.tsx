import React from 'react';
import { RootLayout, HeaderTitle, SectionsList } from '@/renderer/components';
import { Branch } from '@/renderer/types';

const branch: Branch[] = [
    {
        title: "الشهداء",
        route: "/Martyrs"
    },
    {
        title: "الجرحى",
        route: "/Surgery"
    },
];

const page = () => {

    return (
        <RootLayout>
            <HeaderTitle title="الجرحى و الشهداء" back="/dashboard" />
            <div className='flex w-full h-[70vh] items-center'>
                <SectionsList
                    mainRouter='woundedMartyrs'
                    sections={branch}
                    cols={2}
                />
            </div>
        </RootLayout>
    );
};

export default page;
