import { HeaderTitle, RootLayout, CustomTable } from "@/renderer/components";
import { TableCell, TableRow } from "@/renderer/components/ui/table";
import { MockDataCourse } from "@/renderer/store/mock";
import { Columns } from "@/renderer/types";

type Props = {
  students: string[];
};

const columns: Columns[] = [
  { key: "id", label: "ID" },
  { key: "StudentName", label: "اسم الطالب" },
];

export default function StudentList({ students }: Props) {
  return (
    <RootLayout>
      <HeaderTitle
        title="الطلاب المسجلين في الدورة"
        back="/trainingDevelopment"
      />
      <CustomTable columns={columns} />
    </RootLayout>
  );
}

export async function getStaticPaths() {
  const paths = MockDataCourse.map((course) => ({
    params: { id: course.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Or true/blocking if you want fallback rendering
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const id = params.id;

  const course = MockDataCourse.find((item) => item.id === id);

  if (!course) {
    return { notFound: true };
  }

  return {
    props: {
      students: course.StudentsName || [],
    },
  };
}
