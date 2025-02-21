import React from 'react';
import { RootLayout, HeaderTitle } from '@/renderer/components';


const Page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="قائمة الشهداء" back="/woundedMartyrs/Martyrs" />
            
        </RootLayout>
    );
};

export default Page;