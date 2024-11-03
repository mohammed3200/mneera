import { CircleArrowOutUpRight, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type HeaderTitleProps = {
    title: string;
    back:string;
}

export const HeaderTitle = ({ title,back }: HeaderTitleProps) => {
    return (
        <div className='flex flex-row-reverse items-center justify-between px-8 py-2 w-full'>
            <p className='font-din-regular text-right text-4xl text-gray-100'>{title}</p>
            <div className='flex flex-row-reverse items-center gap-4'>
                <Link href={"/dashboard"} className='flex items-center justify-center p-2 rounded-full border border-gray-400 text-blue-500'>
                    <Home size={28} />
                </Link>
                <Link href={back} className='flex items-center justify-center p-2 rounded-full border border-gray-400 text-blue-500'>
                    <CircleArrowOutUpRight size={28} />
                </Link>
            </div>
        </div>
    )
}
