import React from 'react'
import { selectClassName } from '@/constant/classNames'
import { Input } from '../../designSystem/input'

const EventTitle = ({ isEdit, editedEvent, handleChange }) => {
    return (
        <h2 className="font-semibold truncate">
            {isEdit ? (
                <Input
                    type="text"
                    name="title"
                    value={editedEvent.title}
                    onChange={handleChange}
                    className={selectClassName}
                />
            ) : (
                editedEvent.title
            )}
        </h2>
    )
}

export default EventTitle
