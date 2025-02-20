import React from 'react';
import { RootLayout, HeaderTitle, SectionsList } from '@/renderer/components';
import { Branch } from '@/renderer/types';

const branch:Branch[] = [
    {
        title: "الوزارات",
        route: "/Ministries"
    },
    {
        title: "الأعيان",
        route: "/Notables"
    },
    {
        title: "البلدية",
        route: "/Municipality"
    },
    {
        title: "المدن",
        route: "/Cities"
    },
    {
        title: "المجتمع المدني",
        route: "/CivilSociety"
    },
    {
        title: "الجيش الشرطة",
        route: "/ArmyPolice"
    }
]

const page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="التعاون والتواصل" back="/dashboard" />        
            <div className='flex w-full h-[70vh] items-center'>
                <SectionsList
                    mainRouter='help'
                    sections={branch}
                    disabled
                />
            </div>
        </RootLayout>
    );
};

export default page;
