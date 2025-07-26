import React from 'react';
import { RootLayout } from '@/renderer/components';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <RootLayout>
            {children}
        </RootLayout>
    );
};

export default DashboardLayout;
