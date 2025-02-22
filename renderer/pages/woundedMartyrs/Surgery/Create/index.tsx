"use client";

import { z } from "zod";
import React, { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WoundedFormValidation } from "@/renderer/lib/validation";

import { HeaderTitle, InputPhone, RootLayout } from "@/renderer/components";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/renderer/components/ui/select";

import { InputDate } from "@/renderer/components/InputDate";
import { Button } from "@/renderer/components/ui/button";

import { blood } from "@/renderer/types/constants";


const Page = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof WoundedFormValidation>>({
        resolver: zodResolver(WoundedFormValidation),
        defaultValues: {
            name: "",
            dateOfBirth: ``,
            phone: "",
            bloodType: blood["+O"],
            typeOfInjury: "",
            injuryLocation: "",
            injuryDescription: "",
            dateOfInjury: ``,
        },
    });

    const onSubmit = (values: z.infer<typeof WoundedFormValidation>) => {
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
            <HeaderTitle title="تسجيل جريح جديد" back="/woundedMartyrs/Surgery" />
            <div className="w-full flex flex-col items-center">
                <p className="font-din-bold text-2xl text-right text-white my-4">
                    نموذج تسجيل جريح
                </p>
                <Form {...form}>
                    <form
                        className="w-full px-4 space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* name && phone */}
                        <div className="grid grid-cols-2 gap-x-6">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> (الاسم الرباعي) اسم الجريح</FormLabel>
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
                                        <FormLabel>رقم الهاتف</FormLabel>
                                        <FormControl>
                                            <InputPhone {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* date of birth && blood type */}
                        <div className="grid grid-cols-2 gap-x-6">
                            <FormField
                                name="dateOfBirth"
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
                                name="bloodType"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>فصيلة الدم</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="text-gray-400  placeholder:text-gray-400 border-dark-500 h-12 focus:ring focus:ring-offset-0 !important;">
                                                    <SelectValue placeholder={field.value} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gradient-to-t from-[#202328] to-[#0b0e14]">
                                                    {Object.values(blood).map((item) => (
                                                        <SelectItem key={item} value={item}>
                                                            <div className="flex flex-row bg-red-500 rounded-full px-1">
                                                                <p className="font-din-bold text-left text-white">
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

                        {/* type of injury && injury of description */}
                        <div className="grid grid-cols-2 gap-x-6">
                            <FormField
                                name="typeOfInjury"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>نوع الإصابة</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="injuryDescription"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> (اختياري) وصف الإصابة</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* date of injury && location injury*/}
                        <div className="grid grid-cols-2 gap-x-6">
                            <FormField
                                name="dateOfInjury"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>تاريخ الإصابة</FormLabel>
                                        <FormControl>
                                            <InputDate {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="injuryLocation"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>موقع الإصابة</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                            <p className="font-din-bold text-md text-right">
                                {" "}
                                تسجيل
                            </p>
                        </Button>
                    </form>
                </Form>
            </div>
        </RootLayout>
    );
};

export default Page;