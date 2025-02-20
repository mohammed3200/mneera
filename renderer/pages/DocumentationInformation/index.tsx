import React from 'react';
import { RootLayout, HeaderTitle, SectionsList } from '@/renderer/components';
import { Branch } from '@/renderer/types';

const branch: Branch[] = [
    {
        title: "تحرير",
        route: "/release"
    },
]

const page = () => {

    return (
        <RootLayout>
            <HeaderTitle title="المعلومات التوثيق" back="/dashboard" />
            <div className='flex w-full h-[70vh] items-center'>
                <SectionsList
                    mainRouter='DocumentationInformation'
                    sections={branch}
                />
            </div>
        </RootLayout>
    );
};

export default page;
