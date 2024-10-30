import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';

interface ButtonNavigationProps {
    title: string;
    path: string
}

export const ButtonNavigation = ({ title, path }: ButtonNavigationProps) => {
    return (
        <div className='w-full p-2 self-center justify-self-center'>
            <Button className='w-full h-16 rounded-md border border-gray-400 bg-transparent'>
                <Link href={path}>
                    <p className='text-right font-din-regular text-gray-400 text-lg'>
                        {title}
                    </p>
                </Link>
            </Button>
        </div>
    )
}