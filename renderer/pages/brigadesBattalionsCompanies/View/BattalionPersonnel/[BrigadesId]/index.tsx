import React from 'react';
import { useRouter } from 'next/navigation';
import { useRouter as useRoutes } from 'next/router';

import { RootLayout, HeaderTitle, CustomTable } from '@/renderer/components';
import { TableCell, TableRow } from '@/renderer/components/ui/table';

import { MockDataBrigades, MockDataIndividuals } from '@/renderer/store/mock'

type Props = {}

const columns: Columns[] = [
    {
        key: "id",
        label: "ID"
    },
    {
        key: "name",
        label: "الاسم"
    },
    {
        key: "PhoneNumber",
        label: "رقم الهاتف"
    }
];

const PageBattalionPersonnel = () => {
    const routes = useRoutes();
    const { BrigadesId } = routes.query;
    return (
        <RootLayout>
            <HeaderTitle title='أعضاء الكتيبة' back='/brigadesBattalionsCompanies/View' />
            <div className='w-full px-4 mt-8'>
                <CustomTable columns={columns} Data={TableCellIndividuals} />
            </div>
        </RootLayout>
    );
};
export default PageBattalionPersonnel;

const TableCellIndividuals = () => {
    const router = useRouter();
    const routes = useRoutes();
    const { BrigadesId } = routes.query;

    const BattalionMembers = MockDataIndividuals.filter(item => item.BrigadesId === BrigadesId);

    return BattalionMembers.map((item) => (
        <TableRow key={item.id}
            className="text-zinc-200 text-xs font-SpaceMono text-center cursor-pointer"
            onClick={() => router.push(`/individuals/${item.id}`)}>
            <TableCell># {item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.PhoneNumber}</TableCell>
        </TableRow>
    ));
};