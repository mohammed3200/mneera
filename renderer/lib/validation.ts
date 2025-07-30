import { z } from "zod";
import { blood } from "../types/constants";

export const individualFormValidation = z.object({
  name: z.string().min(3, "اسم قصير جدا"),
  nationalNumber: z
    .string()
    .min(12, "هذا ليس رقم وطني")
    .max(12, "هذا ليس رقم وطني"),
  nationality: z.string(),
  birthDate: z.string().default(`${new Date()}`),
  PlaceOfBirth: z.string().min(2, "هذا قصير جدا").optional(),
  phone: z
    .string()
    .refine((phone) => /^\d{3}-\d{6,10}$/.test(phone), "ليس رقم هاتف"),
  battalion: z.string().min(1, "هذا قصير جدا").max(40, "الاسم طويل جدا"),
  TypeOfDefinition: z.enum(["ID card", "Passport"]),
  battalionNumber: z.string().optional(),
  IDCard: z
    .string()
    .min(6, "هذا ليس رقم تعريف")
    .max(6, "هذا ليس رقم تعريف")
    .optional(),
  passport: z
    .string()
    .min(9, "هذا ليس رقم جواز سفر")
    .max(9, "هذا ليس رقم جواز سفر")
    .optional(),
  employer: z.string(),
  academic: z.string(),
  weapon: z.string(),
  blood: z.enum(["+O", "-O", "+A", "-A", "+B", "-B", "+AB", "-AB"]),
  address: z.string().min(2, "العنوان قصير جدا"),
  image: z
    .custom<File>((val) => val instanceof File, {
      message: "يجب رفع صورة"
    })
    .refine((file) => !file || file.size <= 5_000_000, "حجم الملف كبير جدا")
    .refine(
      (file) =>
        !file ||
        [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/jpg",
          "image/svg",
        ].includes(file.type),
      "نوع الصورة غير مدعوم"
    ),
});

export const AdminFormValidation = z.object({
  username: z.string().min(1, "مطلوب"),
  password: z.string().min(1, "مطلوب"),
});

export const BattalionsFormValidation = z.object({
  battalionName: z.string().min(1, "مطلوب"),
  place: z.string().min(1, "مطلوب"),
  conductor: z.string().min(1, "مطلوب"),
  dateOfCreation: z.string().default(`${new Date()}`),
  numberOfIndividuals: z.number().default(0),
  weaponsType: z.string().trim().optional(),
});

export const WoundedFormValidation = z.object({
  name: z.string().min(1, "مطلوب"),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    const year = new Date(parsedDate).getFullYear();
    return !isNaN(parsedDate) && year >= 1900 && year <= 2500;
  }, "تاريخ غير صالح"),
  phone: z
    .string()
    .refine((phone) => /^\d{3}-\d{6,10}$/.test(phone), "ليس رقم هاتف"),
  bloodType: z.nativeEnum(blood),
  typeOfInjury: z.string(),
  injuryLocation: z.string().min(2, "العنوان قصير جدا"),
  injuryDescription: z.string().optional(),
  dateOfInjury: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    const year = new Date(parsedDate).getFullYear();
    return !isNaN(parsedDate) && year >= 1900 && year <= 2500;
  }, "تاريخ غير صالح"),
});

export const MartyrFormValidation = z.object({
  name: z.string().min(1, "مطلوب"),
  dateOfMartyrdom: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    const year = new Date(parsedDate).getFullYear();
    return !isNaN(parsedDate) && year >= 1900 && year <= 2500;
  }, "تاريخ غير صالح"),
  locationMartyrdom: z.string().optional(),
});
