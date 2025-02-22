"use client";

import { z } from "zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MartyrFormValidation } from "@/renderer/lib/validation";

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

import { InputDate } from "@/renderer/components/InputDate";
import { Button } from "@/renderer/components/ui/button";


const Page = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof MartyrFormValidation>>({
        resolver: zodResolver(MartyrFormValidation),
        defaultValues: {
            name: "",
            dateOfMartyrdom: "",
            locationMartyrdom: "",
        },
    });

    const onSubmit = (values: z.infer<typeof MartyrFormValidation>) => {
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
            <HeaderTitle title="تسجيل  شهيد" back="/woundedMartyrs/Martyrs" />
            <div className="w-full flex flex-col items-center">
                <p className="font-din-bold text-2xl text-right text-white my-4">
                    نموذج تسجيل
                </p>
                <Form {...form}>
                    <form
                        className="w-full px-4 space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* name && date of martyrs */}
                        <div className="grid grid-cols-2 gap-x-6">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-right text-white font-din-bold">اسم الشهيد</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="dateOfMartyrdom"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-right text-white font-din-bold">تاريخ الإستشهاد</FormLabel>
                                        <FormControl>
                                            <InputDate {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Place of martyrdom  */}
                        <div className="flex flex-1">
                            <FormField
                                name="locationMartyrdom"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-right text-white font-din-bold">مكان الاستشهاد</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-12 w-full px-8">
                        <Button
                            onClick={() => onSubmit(form.getValues())}
                            className="w-full border border-gray-200 text-gray-300 rounded-full bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center py-6 mt-5 justify-self-center self-center duration-500 transition-all ease-out"
                            >
                            <p className="font-din-bold text-md text-right">
                                {" "}
                                تسجيل
                            </p>
                        </Button>
                            </div>
                    </form>
                </Form>
            </div>
        </RootLayout>
    );
};

export default Page;