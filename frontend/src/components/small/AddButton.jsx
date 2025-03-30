import React from 'react'
import { Button } from '../designSystem/button'
import { FaPlus } from 'react-icons/fa'

const AddButton = ({onClick}) => {
  return (

      <Button size={"sm"} className="bg-blue-600 text-white mx-2 rounded-lg" onClick={onClick}>
          <FaPlus size={12} />
      </Button>
  )
}

export default AddButton
