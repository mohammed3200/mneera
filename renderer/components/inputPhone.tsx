'use client';

import React, { useState } from 'react'
import { Input } from './ui/input'
import { PhoneCallIcon } from 'lucide-react'
import { E164Number } from "libphonenumber-js/core";
import Image from 'next/image';
type Props = {

} & React.ComponentProps<"input">

const formatPhoneNumber = (value: string) => {
    if (!value.startsWith("09")) {
        return value;
    }

    const digits = value.replace(/\D/g, '');

    if (digits.length > 3) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return digits;
}

export const InputPhone = ({ ...field }: Props) => {
    const [typeNumber, setTypeNumber] = useState<"Almadar" | "Libyana" | undefined>(undefined)

    const handlePhoneNumberChange = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length > 2) {
            const thirdDigit = digits[2];
            if (thirdDigit === '1' || thirdDigit === '3') {
                setTypeNumber("Almadar");
            } else if (thirdDigit === '2' || thirdDigit === '4') {
                setTypeNumber("Libyana");
            } else {
                setTypeNumber(undefined);
            }
        }
    }

    return (
        <div className='w-full flex items-center justify-between gap-2'>
            <Input
                {...field}
                value={formatPhoneNumber(field.value as string | E164Number)}
                onChange={(e) => {
                    handlePhoneNumberChange(e.target.value);
                    field.onChange(e);
                }}
                className='flex-grow'
            />
            {typeNumber === "Almadar" ? (<Image
                src={"/assets/Almadar.png"}
                alt='Almadar'
                width={24}
                height={24}
                className='w-10 h-10 object-cove rounded-md'
            />) : typeNumber === "Libyana" ? (
                <Image
                    src={"/assets/Libyana.png"}
                    alt='Libyana'
                    width={24}
                    height={24}
                    className='w-10 h-10 object-cover rounded-md'
                />
            ) : (
                <PhoneCallIcon className='text-gray-50' size={24} />)}
        </div>
    )
};
