/* eslint-disable prettier/prettier */
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type CustomInputProps = {
  className?: string
  placeholder: string
  type?: string
  isArabic?: boolean
} & ComponentProps<'input'>

export const CustomInput: React.FC<CustomInputProps> = ({
  className,
  placeholder,
  type,
  isArabic,
  ...props
}) => {
  return (
    <input
      className={twMerge(
        'my-3 transition-all duration-700 ease-in w-[350px] bg-zinc-700 outline-none rounded-md min-w-fit relative px-1 py-3 border-none box-border list-none',
        className
      )}
      {...props}
      placeholder={placeholder}
      type={type ?? 'text'}
      dir={isArabic ? 'rtl' : 'ltr'}
    />
  )
}
