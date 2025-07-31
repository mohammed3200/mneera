// renderer/pages/brigadesBattalionsCompanies/Create/index.tsx
import { z } from "zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useBattalionStore } from "@/renderer/store/battalionStore";
import { BattalionsFormValidation } from "@/renderer/lib/validation";

import { HeaderTitle, RootLayout } from "@/renderer/components";

import { Input } from "@/renderer/components/ui/input";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/renderer/components/ui/form";
import { Textarea } from "@/renderer/components/ui/textarea";
import { InputDate } from "@/renderer/components/InputDate";
import { Spinner } from "@/renderer/components/Spinner";
import { Button } from "@/renderer/components/ui/button";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const addBattalion = useBattalionStore((state) => state.addBattalion);

  const form = useForm<z.infer<typeof BattalionsFormValidation>>({
    resolver: zodResolver(BattalionsFormValidation),
    defaultValues: {
      battalionName: "",
      place: "",
      conductor: "",
      dateOfCreation: `${format(new Date(), "yyyy-MM-dd")}`,
      numberOfIndividuals: 0,
      weaponsType: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BattalionsFormValidation>) => {
    setIsLoading(true);
    try {
      const battalionData = {
        name: values.battalionName, // Changed property name
        place: values.place,
        conductor: values.conductor,
        numberOfIndividuals: values.numberOfIndividuals,
        weaponsType: values.weaponsType,
        dateOfCreation: new Date(values.dateOfCreation), // Convert to timestamp
      };

      // Use correct channel name "add-battalion"
      const response = await window.ipc.invoke("add-battalion", battalionData);

      if (response.success) {
        addBattalion(response.battalion);
        router.push("/brigadesBattalionsCompanies/View");
      } else {
        console.error("Failed to add battalion:", response.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <RootLayout>
      <HeaderTitle
        title="نموذج تسجيل الكتائب و الألوية و السرايا"
        back="/brigadesBattalionsCompanies"
      />
      <div className="w-full flex flex-col items-center">
        <p className="font-din-bold text-2xl text-right text-white my-4">
          نموذج تسجيل كتيبة جديدة
        </p>
        <Form {...form}>
          <form
            className="w-full px-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Battalion Name && Place */}
            <div className="grid grid-cols-2 gap-x-6">
              <FormField
                name="battalionName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكتيبة</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="place"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مكانها</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Conductor && Date Of Creation */}
            <div className="grid grid-cols-2 gap-x-6">
              <FormField
                name="conductor"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>أمر الكتيبة</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfCreation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ الإنشاء</FormLabel>
                    <FormControl>
                      <InputDate {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Number of members && Weapon type */}
            <div className="w-full grid grid-cols-4 gap-x-6">
              <div className="flex items-center col-span-1">
                <FormField
                  control={form.control}
                  name="numberOfIndividuals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد الافراد</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="124" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full col-span-3">
                <FormField
                  control={form.control}
                  name="weaponsType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع الأسلحة </FormLabel>
                      <FormControl>
                        <Textarea
                          className="w-full text-zinc-200 text-base font-din-regular"
                          {...field}
                          placeholder="...اكتب بتفصيل"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              onClick={() => onSubmit(form.getValues())}
              className="w-full border border-gray-200 text-gray-300 rounded-full bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center py-6 mt-5 justify-self-center self-center duration-500 transition-all ease-out"
            >
              {isLoading ? (
                <Spinner className="mr-2" />
              ) : (
                <p className="font-din-bold text-md text-right">
                  تسجيل كتيبة جديد
                </p>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </RootLayout>
  );
};

export default Page;
