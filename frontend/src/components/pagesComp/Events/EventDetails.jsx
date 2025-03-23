import React from "react";
import EditDateTime from "@/components/pagesComp/Events/EditDateTime";
import EventLocation from "@/components/pagesComp/Events/EventLocation";
import EventPeople from "@/components/pagesComp/Events/EventPeople";
import ColorSelector from "@/components/pagesComp/Events/ColorSelector";

const EventDetails = ({ isEdit, editedEvent, handleChange, setEditedEvent, selectedEvent }) => (
    <div className="space-y-1">
        <EditDateTime isEdit={isEdit} handleChange={handleChange} date={editedEvent.startDate} time={editedEvent.startTime} />
        <EditDateTime isEdit={isEdit} handleChange={handleChange} date={editedEvent.endDate} time={editedEvent.endTime} />
        <EventLocation isEdit={isEdit} editedEvent={editedEvent} handleChange={handleChange} selectedEvent={selectedEvent} />
        <EventPeople isEdit={isEdit} setEditedEvent={setEditedEvent} editedEvent={editedEvent} selectedEvent={selectedEvent} />
        <ColorSelector isEdit={isEdit} editedEvent={editedEvent} handleChange={handleChange} />
    </div>
);

export default EventDetails;
