import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { Button } from './ui/button'

const EditButton: React.FC<React.ComponentProps<'button'>> = ({ ...props }) => {
  return (
    <Button {...props}>
      <CiEdit className="w-4 h-4 text-zinc-300" color="#1221FF" />
    </Button>
  )
}

export default EditButton
