"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIndividualStore } from "../../store/individualStore";

import { RootLayout } from "@/renderer/components/AppLayout";

import { individualFormValidation } from "@/renderer/lib/validation";
import { blood, TypeOfDefinition } from "@/renderer/constants";

import { Input } from "@/renderer/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/renderer/components/ui/form";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/renderer/components/ui/select";
import { Button } from "@/renderer/components/ui/button";

import FileUploader from "@/renderer/components/FileUploader";
import { HeaderTitle, InputPhone } from "@/renderer/components";
import { InputDate } from "@/renderer/components/InputDate";
import { Spinner } from "@/renderer/components/Spinner";
import { BattalionCombobox } from "@/renderer/components/individual/BattalionsCombobox";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [typeOfDefinition, setTypeOfDefinition] = useState<
    "ID card" | "passport"
  >("ID card");
  const addIndividual = useIndividualStore((state) => state.addIndividual);

  const form = useForm<z.infer<typeof individualFormValidation>>({
    resolver: zodResolver(individualFormValidation),
    defaultValues: {
      name: "",
      nationalNumber: "",
      battalionId: null,
      nationality: "ليبي",
      birthDate: "",
      PlaceOfBirth: "",
      phone: "",
      TypeOfDefinition: "ID card",
      IDCard: "",
      passport: "",
      employer: "",
      academic: "",
      weapon: "",
      blood: "+O",
      address: "",
      image: null, // Initialize image as null
    },
  });

  const onSubmit = async (values: z.infer<typeof individualFormValidation>) => {
    setIsLoading(true);
    try {
      // Convert file to ArrayBuffer if exists
      let imageBuffer: number[] | null = null;
      let imageType: string | null = null;

      if (values.image) {
        const buffer = await values.image.arrayBuffer();
        imageBuffer = Array.from(new Uint8Array(buffer));
        imageType = values.image.type;
      }
      const individualData = {
        name: values.name,
        nationalNumber: values.nationalNumber,
        birthDate: new Date(values.birthDate).toISOString(),
        address: values.address,
        placeOfBirth: values.PlaceOfBirth,
        battalionId: values.battalionId,
        phoneNumber: values.phone, // Changed from phone to phoneNumber
        nationality: values.nationality,
        bloodType: values.blood, // Changed from blood to bloodType
        academicQualification: values.academic, // Changed to academicQualification
        weaponType: values.weapon, // Changed to weaponType
        // Identification fields
        idNumber: typeOfDefinition === "ID card" ? values.IDCard : undefined,
        passportNumber:
          typeOfDefinition === "passport" ? values.passport : undefined,
        image: values.image
          ? {
              buffer: imageBuffer,
              type: imageType,
              name: values.image.name,
            }
          : null,
      };

      const response = await window.ipc.invoke(
        "add-individual",
        individualData
      );

      if (response.success) {
        router.push("/individuals");
      } else if (response.error) {
        if (response.error.code === "ERR_UNIQUE_NATIONAL_NUMBER") {
          toast.error("الرقم الوطني مستخدم بالفعل.");
        } else if (response.error.code === "ERR_UNIQUE_ID_NUMBER") {
          toast.error("رقم التعريف الشخصي مستخدم بالفعل.");
        } else if (response.error.code === "ERR_UNIQUE_PASSPORT_NUMBER") {
          toast.error("جواز السفر مستخدم بالفعل.");
        } else {
          toast.error(response.error.message || "Something went wrong.");
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
      console.error("Error adding individual:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RootLayout>
      <HeaderTitle title="تسجيل" back="/dashboard" />
      <div className="w-full flex flex-col items-center">
        <p className="font-din-bold text-2xl text-right text-white my-4">
          نموذج التسجيل
        </p>
        <Form {...form}>
          <form
            className="w-full px-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* ( Name && National Number && phone number ) && Selfie */}
            <div className="grid grid-cols-2 gap-x-6 ">
              {/* Name && National Number && phone number */}
              <div className="h-full flex flex-col gap-y-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل ( الاسم الرباعي ) </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nationalNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرقم الوطني</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرقم الهاتف</FormLabel>
                      <FormControl>
                        <InputPhone {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-full flex-1">
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormLabel>الصورة الشخصية</FormLabel>
                      <FormControl>
                        <FileUploader
                          onChange={(file) => field.onChange(file)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Birth Date && Place Of Birth */}
            <div className="grid grid-cols-2 gap-x-6 ">
              <FormField
                name="birthDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ الميلاد</FormLabel>
                    <FormControl>
                      <InputDate {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="PlaceOfBirth"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مكان الولادة </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ((IDCard || passport) && TypeOfDefinition ) && Battalion Number */}
            <div className="grid grid-cols-2 gap-x-6 ">
              <div className="flex flex-row">
                {typeOfDefinition === "ID card" ? (
                  <FormField
                    name="IDCard"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>رقم التعريف الشخصي</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="123456"
                            className="rounded-l-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    name="passport"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>رقم جواز السفر</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="01D7E5K"
                            className="rounded-l-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  name="TypeOfDefinition"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        نوع التعريف الشخصي
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value); // Update form state
                            setTypeOfDefinition(
                              value as "ID card" | "passport"
                            ); // Update local state
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="text-gray-400 rounded-r-none placeholder:text-gray-400 border-dark-500 h-12 focus:ring-0 focus:ring-offset-0 !important;">
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                          <SelectContent>
                            {TypeOfDefinition.map((item) => (
                              <SelectItem key={item.key} value={item.key}>
                                <div className="flex flex-row">
                                  <p className="font-din-bold">{item.name}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="battalionId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> الكتيبة </FormLabel>
                    <FormControl>
                      <BattalionCombobox onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Employer && Academic */}
            <div className="grid grid-cols-2 gap-x-6">
              <FormField
                name="employer"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>جهة العمل </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="academic"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المؤهل العلمي</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="متوسط ، دبلوم ..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Employer && Academic */}
            <div className="grid grid-cols-2 gap-x-6">
              <FormField
                name="weapon"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع السلاح</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="9mm ، 45 ACP ، 40 S&W ..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="blood"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> فصيلة الدم </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="text-gray-400  placeholder:text-gray-400 border-dark-500 h-12 focus:ring focus:ring-offset-0 !important;">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-300">
                          {blood.map((item) => (
                            <SelectItem key={item} value={item}>
                              <div className="flex flex-row">
                                <p className="font-din-bold text-left">
                                  {item}
                                </p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Nationality && Address */}
            <div className="grid grid-cols-2 gap-x-6">
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان السكان</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="اسم المدينة - اسم المنطقة - وصف لمحل الإقامة"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="nationality"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الجنسية </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="ليبي ، مصري ..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              onClick={() => onSubmit(form.getValues())}
              className="w-full border border-gray-200 text-gray-300 rounded-full bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center py-6 mt-5 justify-self-center self-center duration-500 transition-all ease-out"
            >
              {isLoading ? (
                <Spinner className="mr-2" />
              ) : (
                <p className="font-din-bold text-md text-right">
                  تسجيل عضو جديد
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
