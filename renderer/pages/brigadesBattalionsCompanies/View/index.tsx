import React from 'react';
import { useRouter } from 'next/navigation';

import { RootLayout, HeaderTitle, CustomTable } from '@/renderer/components';
import { TableCell, TableRow } from '@/renderer/components/ui/table';

import { MockDataBrigades } from '@/renderer/store/mock'

type Props = {}

const columns: Columns[] = [
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: "name",
        label: "الاسم"
    },
    {
        key: "place",
        label: "مكانها"
    },
    {
        key: "Commander",
        label: "الأمر"
    }

];
const Page = (props: Props) => {
    return (
        <RootLayout>
            <HeaderTitle title='الألوية و الكتائب و السرايا' back='/brigadesBattalionsCompanies' />
            <div className='w-full px-4 mt-8'>
                <CustomTable columns={columns} Data={TableCellBrigadesBattalionsCompanies} />
            </div>
        </RootLayout>
    )
}

export default Page;

const TableCellBrigadesBattalionsCompanies = () => {
    const router = useRouter();
    return MockDataBrigades.map((item) => (
        <TableRow key={item.id}
            className="text-zinc-200 text-xs font-SpaceMono text-center cursor-pointer"
            onClick={() => router.push(`/brigadesBattalionsCompanies/View/BattalionPersonnel/${item.id}`)}>
            <TableCell># {item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.HerPlace}</TableCell>
            <TableCell>{item.BattalionCommander}</TableCell>
        </TableRow>
    ));
};   