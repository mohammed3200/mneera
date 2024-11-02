import React from 'react'
import { Button } from './ui/button'

interface ButtonNavigationProps {
    title: string;
    handleRouter?: () => void;
}

export const ButtonNavigation = ({ title, handleRouter }: ButtonNavigationProps) => {
    return (
        <div className='w-full p-2 self-center justify-self-center'>
            <Button className='w-full h-16 rounded-md border border-gray-400 bg-transparent' onClick={handleRouter}>
                    <p className='text-right font-din-regular text-gray-400 text-lg'>
                        {title}
                    </p>
            </Button>
        </div>
    )
}