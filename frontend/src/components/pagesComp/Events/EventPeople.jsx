import React from 'react'
import { Users } from "lucide-react";
import { Input } from "@/components/designSystem/input";

const EventPeople = ({ isEdit, setEditedEvent, editedEvent, selectedEvent }) => {
  return (
      <p className="flex items-center text-gray-700 truncate">
          {((selectedEvent?.people && selectedEvent?.people.length >0 )|| isEdit) && <Users className="w-4 h-4 mr-1 text-gray-500" />} 
          {isEdit ? (
              <Input
                  type="text"
                  name="people"
                  value={editedEvent.people ? editedEvent.people.join(", ") : ""}
                  onChange={(e) => {
                      const peopleArray = e.target.value.split(",").map((person) => person.trim());
                      setEditedEvent((prev) => ({
                          ...prev,
                          people: peopleArray,
                      }));
                  }}
              />
          ) : (
              <span>{editedEvent.people ? editedEvent.people.join(", ") : ""}</span>
          )}
      </p>
  )
}

export default EventPeople
