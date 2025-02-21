import React from 'react';
import { RootLayout, HeaderTitle } from '@/renderer/components';


const Page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="تسجيل جريح جديد" back="/woundedMartyrs/Surgery" />
            
        </RootLayout>
    );
};

export default Page;