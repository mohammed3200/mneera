import React from 'react';
import { RootLayout } from '@/renderer/components';

const DashboardLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
    return (
        <RootLayout>
            {children}
        </RootLayout>
    );
};

export default DashboardLayout;
