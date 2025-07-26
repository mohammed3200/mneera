import React from 'react';
import { RootLayout, HeaderTitle, SectionsList } from '@/renderer/components';
import { Branch } from '@/renderer/types';

const branch: Branch[] = [
  {
    title: "Example Section",
    route: "/dashboard"
    // Add other required properties if needed
  }
];

const page = () => {
  return (
    <RootLayout>
      <HeaderTitle title="الدعم و الصيانة" back="/dashboard" />
      <div className='flex w-full h-[70vh] items-center'>
        <SectionsList
          mainRouter='support'
          sections={branch}
          cols={1}
        />
      </div>
    </RootLayout>
  );
};

export default page;
