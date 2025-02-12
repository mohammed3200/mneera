import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Input } from './ui/input';

type Props = {} & React.ComponentProps<"input">;

export const InputDate = ({ value, onChange, ...field }: Props) => {
    const [dateValue, setDateValue] = useState<string>(typeof value === 'string' ? value : '');

    useEffect(() => {
        setDateValue(typeof value === 'string' ? value : '');
    }, [value]);

    const formatDate = (input: string) => {
        const cleaned = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        let year = cleaned.slice(0, 4);
        let month = cleaned.slice(4, 6);
        let day = cleaned.slice(6, 8);

        // Validate year
        if (year) {
            const yearNum = parseInt(year);
            if (yearNum < 1900) year = '1900';
            if (yearNum > 2500) year = '2500';
        }

        // Validate month
        if (month) {
            const monthNum = parseInt(month);
            if (monthNum < 1) month = '01';
            if (monthNum > 12) month = '12';
        } else {
            month = '01';
        }

        // Validate day
        if (year && month) {
            const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
            if (day) {
                const dayNum = parseInt(day);
                if (dayNum < 1) day = '01';
                if (dayNum > daysInMonth) day = String(daysInMonth).padStart(2, '0');
            } else {
                day = '01';
            }
        } else {
            day = '01';
        }

        const formattedDate = `${year}-${month}-${day}`;
        setDateValue(formattedDate);
        const syntheticEvent = {
            target: { value: `${year}-${month}-${day}` }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent); // Call the onChange prop with the new date
    // };
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formatDate(event.target.value);
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