import React from 'react'

const EventButtons = ({ isEdit ,setIsEdit,handleSave,deleteEvent,handleCloseModal}) => {
  return (
      <div className="mt-4 flex justify-end space-x-2">
          {isEdit ? (
              <button
                  onClick={handleSave}
                  className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition-all text-xs"
              >
                  Save
              </button>
          ) : (
              <button
                  onClick={() => setIsEdit(true)}
                  className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all text-xs"
              >
                  Edit
              </button>
          )}
          <button
              onClick={() => {
                  deleteEvent();
                  handleCloseModal();
              }}
              className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-all text-xs"
          >
              Delete
          </button>
      </div>
  )
}

export default EventButtons
