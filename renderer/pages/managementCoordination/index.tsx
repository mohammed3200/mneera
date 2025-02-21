import React from 'react';
import { RootLayout, HeaderTitle, SectionsList } from '@/renderer/components';

import { Branch } from '@/renderer/types';

const branch: Branch[] = [
    {
        title: "الناقلات والآلات",
        route: "/CarriersAndMachinery"
    },
    {
        title: "الإمدادات",
        route: "/Supplies"
    },
    {
        title: "الإمدادات",
        route: "/Supplies"
    },
    {
        title: "الإمدادات",
        route: "/Supplies"
    },
    {
        title: "الإمدادات",
        route: "/Supplies"
    },
];

const page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="الدعم و التنسيق" back="/dashboard"/>
            <div className='flex w-full h-[70vh] items-center '>
                <SectionsList
                    mainRouter='managementCoordination'
                    sections={branch}
                />
            </div>
        </RootLayout>
    );
};

export default page;
