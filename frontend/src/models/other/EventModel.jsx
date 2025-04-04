import React, { useEffect, useState } from "react";
import { adjestuedTop, adjestuedLeft } from "@/utils/other/AdjustEvent";
import EventHeader from "@/components/pagesComp/Events/EventHeader";
import EventDetails from "@/components/pagesComp/Events/EventDetails";
import EventActions from "@/components/pagesComp/Events/EventActions";
import { handleSave, handleChange, deleteEvent } from "@/utils/models/eventModel";

const EventModel = ({ modalPosition, selectedEvent, handleCloseModal, eventsServicePlugin }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedEvent, setEditedEvent] = useState({});

    useEffect(() => {
        if (selectedEvent) {
            setEditedEvent({
                ...selectedEvent,
                startDate: selectedEvent.start?.split(" ")[0] || "",
                startTime: selectedEvent.start?.split(" ")[1] || "",
                endDate: selectedEvent.end?.split(" ")[0] || "",
                endTime: selectedEvent.end?.split(" ")[1] || "",
            });
        }
    }, [selectedEvent]);



    return (
        <div
            className="fixed z-50 bg-white/40 backdrop-blur-md p-3 rounded-lg shadow-xl 
                       border border-gray-200 w-[260px] text-sm text-gray-800 
                       -translate-x-[110%] -translate-y-1/2 
                       [top:var(--top)] [left:var(--left)]"
            style={{
                "--top": `${adjestuedTop(modalPosition)}px`,
                "--left": `${adjestuedLeft(modalPosition)}px`,
            }}
        >
            <EventHeader
                isEdit={isEdit}
                editedEvent={editedEvent}
                handleChange={handleChange(setEditedEvent)}
                handleCloseModal={handleCloseModal}
            />
            <EventDetails
                isEdit={isEdit}
                editedEvent={editedEvent}
                handleChange={handleChange(setEditedEvent)}
                setEditedEvent={setEditedEvent}
                selectedEvent={selectedEvent}
            />
            <EventActions
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                handleSave={() => handleSave({ editedEvent, eventsServicePlugin, setIsEdit })}
                deleteEvent={() => deleteEvent({ selectedEvent, eventsServicePlugin })}
                handleCloseModal={handleCloseModal}
            />
        </div>
    );
};

export default EventModel;
