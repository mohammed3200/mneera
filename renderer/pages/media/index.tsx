import React from 'react';
import { RootLayout, HeaderTitle, SectionsList } from '@/renderer/components';
import { Branch } from '@/renderer/types';

const branch: Branch[]  = [
    {
        title: "الاعلام المرئي و المسموع",
        route: "/AudiovisualMedia"
    },
    {
        title: "التواصل الاجتماعي",
        route: "/SocialCommunication"
    },
    {
        title: "الناطق الرسمي",
        route: "/OfficialSpokesperson"
    }
]

const page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="الاعلام" back="/dashboard" />
            <div className='flex w-full h-[70vh] items-center'>
                <SectionsList
                    mainRouter='media'
                    sections={branch}
                />
            </div>
        </RootLayout>
    );
};

export default page;
