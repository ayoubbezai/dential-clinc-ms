import React from 'react'
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
const EditAndDelete = ({ element, loading, handleEdit, handleDelete, }) => {
    return (
        <div className="flex gap-2">
            <button className="cursor-pointer" onClick={() => handleEdit(element)} disabled={loading}
            >
                <img src={EditIcon} alt="edit" className="w-5" />
            </button>
            <button
                className="cursor-pointer"
                onClick={() => handleDelete(element.id)}
                disabled={loading}
            >
                <img src={DeleteIcon} alt="delete" className="w-5" />
            </button>
        </div>
    )
}

export default EditAndDelete
