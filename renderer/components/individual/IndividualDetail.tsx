// renderer/components/individual/IndividualDetail.tsx
import Image from "next/image";
import { useRouter } from "next/router";
import { PhoneCallIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useIndividualStore } from "@/renderer/store/individualStore";
import { useImageStore } from "@/renderer/store/imageStore";

import { Badge } from "@/renderer/components/ui/badge";
import { RootLayout, HeaderTitle } from "@/renderer/components";

import { formatDate } from "@/renderer/lib/utils";
import { TextShimmer } from "@/renderer/components/ui/text-shimmer";
import { Individual } from "../../../main/db/schema-types";

const IndividualDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [individual, setIndividual] = useState<Individual | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchIndividual } = useIndividualStore();
  const { getImage } = useImageStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const numericId = parseInt(id as string);
          if (!isNaN(numericId)) {
            const data = await fetchIndividual(numericId);
            setIndividual(data || null);
          }
        }
      } catch (error) {
        console.error("Failed to load individual:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, fetchIndividual]);

  // Fetch image when individual is available
  useEffect(() => {
    const fetchImage = async () => {
      if (individual?.image) {
        try {
          const src = await getImage(individual.image);
          setImageSrc(src);
        } catch (error) {
          console.error("Failed to load image:", error);
          setImageSrc(null);
        }
      } else {
        setImageSrc(null);
      }
    };

    fetchImage();
  }, [individual, getImage]);

  if (loading) {
    return (
      <RootLayout>
        <HeaderTitle title="معلومات الفرد" back="/individuals" />
        <div className="w-full h-[80vh] flex-1 flex justify-center items-center">
          <TextShimmer duration={1.5} className="text-2xl font-din-bold">
            تحميل ...
          </TextShimmer>
        </div>
      </RootLayout>
    );
  }

  if (!individual) {
    return (
      <RootLayout>
        <HeaderTitle title="معلومات الفرد" back="/individuals" />
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-500">لم يتم العثور على الفرد</p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <HeaderTitle title="معلومات الفرد" back="/individuals" />
      <div className="w-full flex justify-center p-4">
        {/* Updated card with dark theme */}
        <div className="w-full max-w-4xl bg-[#1a2233] rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <div className="md:flex">
            {/* Profile Section - updated colors */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-800 to-indigo-900 p-6 flex flex-col items-center">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={individual.name}
                  width={160}
                  height={160}
                  className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-2 border-white"
                />
              ) : (
                <div className="bg-gray-700 border-2 border-dashed border-gray-500 rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-gray-400">
                  <span>صورة</span>
                </div>
              )}
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-white font-din-bold">
                  {individual.name}
                </h2>
                <p className="text-blue-100 mt-1">
                  {individual.nationalNumber}
                </p>
                <div className="mt-4">
                  <Badge variant="destructive" className="text-md px-4 py-2">
                    {individual.bloodType}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 w-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2 font-din-bold">
                    معلومات الاتصال
                  </h3>
                  <p className="text-blue-100 flex items-center gap-2">
                    <PhoneCallIcon className="w-5 h-5" />
                    {individual.phoneNumber}
                  </p>
                  <p className="text-blue-100 mt-2">{individual.address}</p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailCard
                  title="المعلومات الشخصية"
                  items={[
                    { label: "مكان الولادة", value: individual.placeOfBirth },
                    {
                      label: "تاريخ الميلاد",
                      value: formatDate(new Date(individual.birthDate)),
                    },
                    { label: "الجنسية", value: individual.nationality },
                  ]}
                />

                <DetailCard
                  title="الخدمة العسكرية"
                  items={[
                    { label: "الكتيبة", value: individual.battalion },
                    { label: "نوع السلاح", value: individual.weaponType },
                  ]}
                />

                <DetailCard
                  title="المؤهلات"
                  items={[
                    {
                      label: "المؤهل العلمي",
                      value: individual.academicQualification,
                    },
                    {
                      label: "رقم التعريف",
                      value: individual.idNumber || "غير متوفر",
                    },
                    {
                      label: "رقم الجواز",
                      value: individual.passportNumber || "غير متوفر",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

// Helper components
const DetailCard = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) => (
  <div className="bg-[#2d3748] rounded-xl p-4 border border-gray-600">
    <h3 className="font-bold text-white mb-3 font-din-bold text-lg">{title}</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between border-b border-gray-600 pb-2"
        >
          <span className="text-gray-300 font-din-regular">{item.label}</span>
          <span className="font-medium font-din-regular text-white">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default IndividualDetail;
