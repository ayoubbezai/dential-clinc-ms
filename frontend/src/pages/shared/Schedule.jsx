import { useState } from 'react';
import { ScheduleXCalendar } from '@schedule-x/react';

import '@schedule-x/theme-default/dist/index.css';
import EventModel from '@/models/other/EventModel';
import "../../style/index.css"
import { Button } from '@/components/designSystem/button';
import AddEventModel from '@/models/AddModels/AddEventModel';
import useCalendar from '@/hooks/other/useCalendar';


function Schedule() {

    
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };
    const { calendar, modalPosition, eventsServicePlugin } = useCalendar(setSelectedEvent);



    return (

        <>
            <div className='flex justify-between w-5/6 my-3 mt-5 mx-auto items-center'>

                <Button className={"text-white text-[13px] "} onClick={() => setIsModalOpen(true)}>+ Add Event</Button>
            </div>
            <div className='flex flex-col w-full items-center'>
                <ScheduleXCalendar calendarApp={calendar} />
                {selectedEvent &&
                    <EventModel modalPosition={modalPosition} selectedEvent={selectedEvent} handleCloseModal={handleCloseModal} eventsServicePlugin={eventsServicePlugin} />
                }
            </div>

            <AddEventModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} eventsServicePlugin={eventsServicePlugin} />

        </>

    );
}

export default Schedule;