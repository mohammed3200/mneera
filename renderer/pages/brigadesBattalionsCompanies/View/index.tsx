import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

import { Battalion } from "../../../../main/db/schema-types";
import { useBattalionStore } from "../../../store/battalionStore";

import { Columns } from "@/renderer/types";

import { RootLayout, HeaderTitle, CustomTable } from "@/renderer/components";
import { TableCell, TableRow } from "@/renderer/components/ui/table";

import { TextShimmer } from "@/renderer/components/ui/text-shimmer";


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
    key: "place",
    label: "مكانها",
  },
  {
    key: "Commander",
    label: "الأمر",
  },
];

const Page = () => {
  const { battalions, loading, error, fetchBattalions } =
    useBattalionStore();

  useEffect(() => {
    fetchBattalions();
  },[]);

    if (loading) {
      return (
        <RootLayout>
          <HeaderTitle title="الألوية و الكتائب و السرايا" back="/brigadesBattalionsCompanies" />
          <div className="w-full h-[80vh] flex-1 flex justify-center items-center">
            <TextShimmer duration={1.5} className="text-2xl font-din-bold">
              تحميل ...
            </TextShimmer>
          </div>
        </RootLayout>
      );
    }
    if (error)
      return (
        <RootLayout>
          <HeaderTitle title="الألوية و الكتائب و السرايا" back="/brigadesBattalionsCompanies" />
          <div className="w-full h-[80vh] flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <TriangleAlert color="#FB623C" className="w-16 h-16" />
              <p className="text-2xl font-din-bold text-zinc-200">
                خطأ في تحميل البيانات
              </p>
              <p className="text-zinc-400 text-sm text-center">
                Error: {error || "حدث خطأ غير متوقع"}
              </p>
            </div>
          </div>
        </RootLayout>
      );

  return (
    <RootLayout>
      <HeaderTitle
        title="الألوية و الكتائب و السرايا"
        back="/brigadesBattalionsCompanies"
      />
      <div className="w-full px-4 mt-8">
        <CustomTable
          columns={columns}
          Data={() => TableCellBrigadesBattalionsCompanies(battalions)}
        />
      </div>
    </RootLayout>
  );
};

export default Page;

const TableCellBrigadesBattalionsCompanies = (data: Battalion[]) => {
  const router = useRouter();
  return data.map((item) => (
    <TableRow
      key={item.id}
      className="text-zinc-200 text-xs font-SpaceMono text-center cursor-pointer"
      onClick={() =>
        router.push(
          `/brigadesBattalionsCompanies/View/BattalionPersonnel/${item.id}`
        )
      }
    >
      <TableCell># {item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.place}</TableCell>
      <TableCell>{item.conductor}</TableCell>
    </TableRow>
  ));
};
