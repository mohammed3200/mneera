import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Input } from './ui/input';

type Props = {} & React.ComponentProps<"input">;

export const InputDate = ({ value, onChange, ...field }: Props) => {
    const [dateValue, setDateValue] = useState<string>(typeof value === 'string' ? value : '');

    useEffect(() => {
        setDateValue(typeof value === 'string' ? value : '');
    }, [value]);

    const validateAndFormatDate = (input: string) => {
        const cleaned = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        let year = cleaned.slice(0, 4);
        let month = cleaned.slice(4, 6);
        let day = cleaned.slice(6, 8);

        // Validate year
        if (year.length === 4) {
            const yearNum = parseInt(year);
            if (yearNum < 1900) year = '1900';
            if (yearNum > 2500) year = '2500';
        }

        // Validate month
        if (month.length === 2) {
            const monthNum = parseInt(month);
            if (monthNum < 1) month = '01';
            if (monthNum > 12) month = '12';
        }

        // Validate day
        if (year.length === 4 && month.length === 2 && day.length === 2) {
            const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
            const dayNum = parseInt(day);
            if (dayNum < 1) day = '01';
            if (dayNum > daysInMonth) day = String(daysInMonth).padStart(2, '0');
        }

        // Construct the formatted date
        let formattedDate = '';
        if (year) formattedDate += year;
        if (month) formattedDate += `-${month}`;
        if (day) formattedDate += `-${day}`;

        return formattedDate;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedDate = validateAndFormatDate(inputValue);
        setDateValue(formattedDate);

        // Trigger onChange only if the date is fully entered
        if (formattedDate.length === 10) {
            const syntheticEvent = {
                target: { value: formattedDate }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange?.(syntheticEvent);
        }
    };

    return (
        <div className='w-full flex flex-row items-center border border-input bg-transparent rounded-md px-3 py-1 text-base text-white'>
            <Input
                className='flex-grow border-none'
                placeholder='YYYY-MM-DD'
                value={dateValue}
                onChange={handleChange}
                type="text"
                {...field}
            />
            <Calendar className='size-10 grow-0' />
        </div>
    );
};