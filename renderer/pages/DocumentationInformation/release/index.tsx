import { RootLayout, HeaderTitle } from '@/renderer/components';

const page = () => {
    return (
        <RootLayout>
            <HeaderTitle title="تحرير" back="/DocumentationInformation" />
            <div className="flex justify-between px-2 mt-4 items-center">

            </div>
        </RootLayout>
    );
};
export default page;