import React from "react";
import EventButtons from "@/components/pagesComp/Events/EventButtons";

const EventActions = ({ isEdit, setIsEdit, handleSave, deleteEvent, handleCloseModal }) => (
    <EventButtons
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleSave={handleSave}
        deleteEvent={deleteEvent}
        handleCloseModal={handleCloseModal}
    />
);

export default EventActions;
