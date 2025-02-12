import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof BattalionsFormValidation>>({
    resolver: zodResolver(BattalionsFormValidation),
    defaultValues: {
      battalionName: "",
      place: "",
      conductor: "",
      dateOfCreation: `${new Date()}`,
      numberOfIndividuals: 0,
      weaponsType: "",
    },
  });

  const onSubmit = (values: z.infer<typeof BattalionsFormValidation>) => {
    console.log("done !");
    setIsLoading(true);
    try {
      console.log({ json: values });
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
                        <Textarea className="w-full text-zinc-200 text-base font-din-regular" {...field} placeholder="...اكتب بتفصيل" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </RootLayout>
  );
};

export default Page;
