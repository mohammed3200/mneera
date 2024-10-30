import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { Button } from './ui/button'

const DeleteButton: React.FC<React.ComponentProps<'button'>> = ({ ...props }) => {
  return (
    <Button {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" color="#FF5874" />
    </Button>
  )
}

export default DeleteButton
