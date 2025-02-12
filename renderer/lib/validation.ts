import { z } from "zod";

export const UserFormValidation = z.object({
    fullName: z.string().min(3,"اسم قصير جدا"),
    nationalNumber: z.string().min(12,"هذا ليس رقم وطني").max(12,"هذا ليس رقم وطني"),
    nationality: z.string(),
    birthDate: z.string().default(`${new Date()}`),
    PlaceOfBirth:z.string().min(2,"هذا قصير جدا").optional(),
    phone: z
    .string()
    .refine((phone) => /^\d{3}-\d{6,10}$/.test(phone), "ليس رقم هاتف"),
    battalionName: z.string().min(1,"هذا قصير جدا").max(40,"الاسم طويل جدا"),
    TypeOfDefinition : z.enum(["ID card","Passport"]),
    battalionNumber: z.string().optional(),
    IDCard: z.string().min(6,"هذا ليس رقم تعريف").max(6,"هذا ليس رقم تعريف").optional(),
    passport:z.string().min(9,"هذا ليس رقم جواز سفر").max(9,"هذا ليس رقم جواز سفر").optional(),
    employer: z.string(),
    academic:z.string(),
    weapon : z.string(),
    blood: z.enum(["+O","-O","+A","-A","+B","-B","+AB","-AB"]),
    address:z.string().min(2,"العنوان قصير جدا"),
    selfie: z.custom<File[]>((value) => Array.isArray(value), "يجب أن يكون مصفوفة").default(() => [
        new File([""], "logo.png", { type: "image/png", lastModified: Date.now() })
    ]).optional(),
});

export const AdminFormValidation = z.object({
    username: z.string().min(1,"مطلوب"),
    password: z.string().min(1,"مطلوب"),
});

export const BattalionsFormValidation = z.object({
    battalionName: z.string().min(1,"مطلوب"),
    place: z.string().min(1,"مطلوب"),
    conductor: z.string().min(1,"مطلوب"),
    dateOfCreation: z.string().default(`${new Date()}`),
    numberOfIndividuals: z.number().default(0),
    weaponsType: z.string().trim().optional(),
});