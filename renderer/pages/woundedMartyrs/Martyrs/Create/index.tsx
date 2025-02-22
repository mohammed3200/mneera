"use client";

import { z } from "zod";
import React, { useState } from "react";
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
    return (
        <RootLayout>
            <HeaderTitle title="تسجيل  شهيد" back="/woundedMartyrs/Martyrs" />
            
        </RootLayout>
    );
};

export default Page;