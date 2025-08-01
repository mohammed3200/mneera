import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRouter as useRoutes } from "next/router";

import { RootLayout, HeaderTitle, CustomTable } from "@/renderer/components";
import { TableCell, TableRow } from "@/renderer/components/ui/table";

import { MockDataIndividuals } from "@/renderer/store/mock";
import { Columns } from "@/renderer/types";
import { useIndividualStore } from "@/renderer/store/individualStore";
import { Individual } from "@/main/db/schema-types";

const columns: Columns[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "الاسم",
  },
  {
    key: "PhoneNumber",
    label: "رقم الهاتف",
  },
];

const PageBattalionPersonnel = () => {
  return (
    <RootLayout>
      <HeaderTitle
        title="أعضاء الكتيبة"
        back="/brigadesBattalionsCompanies/View"
      />
      <div className="w-full px-4 mt-8">
        <CustomTable columns={columns} Data={TableCellIndividuals} />
      </div>
    </RootLayout>
  );
};
export default PageBattalionPersonnel;

const TableCellIndividuals = () => {
  const { fetchIndividualsByBattalionId } = useIndividualStore();

  const router = useRouter();
  const routes = useRoutes();
  const { BrigadesId } = routes.query;

  const [battalionMembers, setBattalionMembers] = useState<Individual[]>([]);

  useEffect(() => {
    fetchIndividualsByBattalionId(Number(BrigadesId)).then((data) => {
      setBattalionMembers(data);
    });
  }, []);

  return battalionMembers.map((item) => (
    <TableRow
      key={item.id}
      className="text-zinc-200 text-xs font-SpaceMono text-center cursor-pointer"
      onClick={() => router.push(`/individuals/${item.id}`)}
    >
      <TableCell># {item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.phoneNumber}</TableCell>
    </TableRow>
  ));
};
