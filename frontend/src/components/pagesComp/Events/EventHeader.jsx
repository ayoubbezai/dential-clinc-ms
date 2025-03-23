import React from "react";
import EventTitle from "@/components/pagesComp/Events/EventTitle";
import CloseButton from "@/components/small/CloseButton";

const EventHeader = ({ isEdit, editedEvent, handleChange, handleCloseModal }) => (
    <div className="flex justify-between items-center mb-2">
        <EventTitle isEdit={isEdit} editedEvent={editedEvent} handleChange={handleChange} />
        <CloseButton handleClose={handleCloseModal} />
    </div>
);

export default EventHeader;
