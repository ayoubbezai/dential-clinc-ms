import React from 'react'
import { COLORS } from "@/utils/EventsColor";
import { selectClassName } from "@/constant/classNames";
import {  Palette } from "lucide-react";

const ColorSelector = ({ isEdit, editedEvent, handleChange }) => {
  return (
      <p className="flex items-center text-gray-700">
          <Palette className={`w-4 h-4 mr-1 ${COLORS[editedEvent.calendarId] || "text-gray-500"}`} />
          {isEdit ? (
              <select
                  name="calendarId"
                  value={editedEvent.calendarId}
                  onChange={handleChange}
                  className={selectClassName}
              >
                  {COLORS.map((color) => (
                      <option key={color.id} value={color.id}>
                          {color.label}
                      </option>
                  ))}
              </select>
          ) : (
              <span className={`px-1 py-[1px] rounded text-[11px] font-medium text-white ${COLORS.find(c => c.id === editedEvent.calendarId)?.className}`}>
                  {COLORS.find(c => c.id === editedEvent.calendarId)?.label}
              </span>
          )}
      </p>
  )
}

export default ColorSelector
