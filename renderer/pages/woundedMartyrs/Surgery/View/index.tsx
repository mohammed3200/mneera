import React from 'react';
import { RootLayout, HeaderTitle } from '@/renderer/components';


const Page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="قائمة الجرحى" back="/woundedMartyrs/Surgery" />
            
        </RootLayout>
    );
};

export default Page;