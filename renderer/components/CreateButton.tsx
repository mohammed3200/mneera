import React, { ComponentProps } from 'react'
import { IconContext } from 'react-icons'
import { twMerge } from 'tailwind-merge'
import { Button } from './ui/button'

type CreateButtonProps = {
  title: string
  className?: string
  icon?: React.FC // This should be a functional component
  setIsCreate?: (isCreate: boolean) => void
} & ComponentProps<'button'>

const CreateButton: React.FC<CreateButtonProps> = ({ title, className, icon: Icon, ...props }) => {
  let IconComponent
  if (Icon === undefined) {
    IconComponent = null
  } else {
    IconComponent = (
      <IconContext.Provider
        value={{
          color: '#fff',
          size: '18'
        }}
      >
        <div>
          <Icon /> {/* Use Icon directly here */}
        </div>
      </IconContext.Provider>
    )
  }

  return (
    <Button
      {...props}
      className={twMerge(
        'flex flex-row justify-center gap-3 items-center rounded-full bg-[#1221bb] border-1 border-zinc-300 hover:scale-110 transition duration-700 ease-in-out',
        className
      )}
    >
      <p className="text-zinc-300 font-DNNextLT text-ms text-center">{title}</p>
      {IconComponent}
    </Button>
  )
}

export default CreateButton
