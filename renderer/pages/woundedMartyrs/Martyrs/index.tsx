import { RootLayout, HeaderTitle, SectionsList } from '@/renderer/components';
import { Branch } from '@/renderer/types';

const branch: Branch[] = [
    {
        title: "عرض قائمة الجرحى",
        route: "/View"
    },
    {
        title: "تسجيل جريح",
        route: "/Create"
    },
];

const page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="الشهداء" back="/woundedMartyrs" />
            <div className='flex w-full h-[70vh] items-center'>
                <SectionsList
                    mainRouter='Martyrs'
                    sections={branch}
                    cols={2}
                />
            </div>
        </RootLayout>
    );
};
export default page;