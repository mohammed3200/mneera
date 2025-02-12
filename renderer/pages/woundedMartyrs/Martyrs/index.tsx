import { RootLayout, HeaderTitle } from '@/renderer/components';

const page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="الشهداء" back="/woundedMartyrs" />
            <div className="flex justify-between px-2 mt-4 items-center">

            </div>
        </RootLayout>
    );
};
export default page;