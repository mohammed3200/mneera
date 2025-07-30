import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ar-LY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};