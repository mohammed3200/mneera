/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ComponentProps } from 'react'
import { Button } from './ui/button'

type ButtonProps = {
  isLoading: boolean
  className?: string
  children: React.ReactNode
} & ComponentProps<'button'>

export const SubmitButton = ({ isLoading, className, children, ...props }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? 'shad-primary-btn w-full'}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <img
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
