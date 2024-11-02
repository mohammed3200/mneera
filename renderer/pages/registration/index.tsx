"use client";

import React, { useState } from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootLayout } from '@/renderer/components/AppLayout'
import HeaderTitle from '@/renderer/components/HeaderTitle'
import { Input } from "@/renderer/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/renderer/components/ui/form'
import { UserFormValidation } from '@/renderer/lib/validation';
import FileUploader from '@/renderer/components/FileUploader';
import { format } from 'date-fns';
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from '@/renderer/components/ui/select';
import { blood, TypeOfDefinition } from '@/renderer/constants';
import { SubmitButton } from '@/renderer/components';

type Props = {}

const Page = (props: Props) => {

  const [Loading, setLoading] = useState(false);
  const [typeOfDefinition, setTypeOfDefinition] = useState<"ID card" | "passport">("ID card");

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      fullName: "",
      nationalNumber: "",
      nationality: "ليبي",
      birthDate: new Date(),
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
    },
  });

  const onSubmit = (values: z.infer<typeof UserFormValidation>) => {
    console.log("done !");
    setLoading(true);
    try {
      console.log({ json: values });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootLayout>
      <HeaderTitle title='تسجيل' back="/dashboard" />
      <div className='w-full flex flex-col items-center'>
        <p className='font-din-bold text-2xl text-right text-white my-4'>نموذج التسجيل</p>
        <Form {...form}>
          <form className="w-full px-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

            {/* ( Name && National Number && phone number ) && Selfie */}
            <div className="grid grid-cols-2 gap-x-6 ">

              {/* Name && National Number && phone number */}
              <div className='h-full flex flex-col gap-y-2'>
                <FormField
                  name="fullName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل ( الاسم الرباعي ) </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="الاسم الرباعي"
                        />
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
                        <Input
                          {...field}
                          type="text"
                          placeholder="0123456789"
                        />
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
                        <PhoneInput
                          defaultCountry="LY"
                          placeholder="+218 - "
                          international
                          withCountryCallingCode
                          value={field.value as E164Number | undefined}
                          onChange={field.onChange}
                          className="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='h-full flex-1'>
                <FormField
                  name="selfie"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='h-full'>
                      <FormLabel>الصورة الشخصية</FormLabel>
                      <FormControl>
                        <FileUploader files={field.value} onChange={field.onChange} />
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
                      <Input
                        {...field}
                        type="date"
                        value={format(field.value, "yyyy-MM-dd")}
                        onChange={(e) => field.onChange(format(new Date(e.target.value), "yyyy-MM-dd"))}
                      />
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
                      <Input
                        {...field}
                        type="text"
                        placeholder="مستشفى ..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* TypeOfDefinition && (IDCard || passport) */}
            <div className="grid grid-cols-2 gap-x-6 ">
              <FormField
                name="TypeOfDefinition"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع التعريف الشخصي</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value); // Update form state
                          setTypeOfDefinition(value as "ID card" | "passport"); // Update local state
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="text-gray-400  placeholder:text-gray-400 border-dark-500 h-12 focus:ring-0 focus:ring-offset-0 !important;">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {TypeOfDefinition.map((item) => (
                            <SelectItem key={item.key} value={item.key}>
                              <div className='flex flex-row'>
                                <p className='font-din-bold'>{item.name}</p>
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
              {typeOfDefinition === "ID card" ? (<FormField
                name="IDCard"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم التعريف الشخصي</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />) : (
                <FormField
                  name="passport"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم جواز السفر</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="01D7E5K"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Employer && Academic */}
            <div className='grid grid-cols-2 gap-x-6'>
              <FormField
                name="employer"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>جهة العمل </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="موظف ، معلم ..."
                      />
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
            <div className='grid grid-cols-2 gap-x-6'>
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
                    <FormLabel>نوع التعريف الشخصي</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value} >
                        <SelectTrigger className="text-gray-400  placeholder:text-gray-400 border-dark-500 h-12 focus:ring-0 focus:ring-offset-0 !important;">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-300">
                          {blood.map((item) => (
                            <SelectItem key={item} value={item}>
                              <div className='flex flex-row'>
                                <p className='font-din-bold text-left'>{item}</p>
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
            <div className='grid grid-cols-2 gap-x-6'>
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
            <SubmitButton
              isLoading={Loading}
              className='rounded-2xl border-gray-500 border w-full flex items-center justify-center text-gray-500 bg-transparent hover:bg-blue-500 hover:text-gray-50'
              type='submit'
            >
              <p className='font-din-regular text-right text-lg'>
                تسجيل عضو جديد
              </p>
            </SubmitButton>
          </form>
        </Form>
      </div>
    </RootLayout>
  )
}

export default Page