import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleXCalendar } from '@schedule-x/react';
import '@schedule-x/theme-default/dist/index.css';

import EventModel from '@/models/other/EventModel';
import "../../style/index.css";
import { Button } from '@/components/designSystem/button';
import AddEventModel from '@/models/AddModels/AddEventModel';
import useAppointmentCalendar from '@/hooks/other/useAppointmentCalendar';

// Appointment status colors
const APPOINTMENT_COLORS = {
    scheduled: '#1a75ff', // Blue
    completed: '#10b981', // Green
    pending: '#f59e0b',   // Yellow
    cancelled: '#ef4444', // Red
    rescheduled: '#8b5cf6', // Purple
};

function AppointmentSchedule() {
    const { t, i18n } = useTranslation('schedule');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    // Use the appointment-specific calendar hook
    const { calendar, modalPosition, eventsServicePlugin } = useAppointmentCalendar(setSelectedEvent, t, i18n);

    return (
        <>
            <div className='flex justify-between w-5/6 my-3 mt-5 mx-auto items-center'>
                <div className="flex items-center gap-4">
                    <h1>Appointmets Schedule</h1>
                </div>

                {/* Status Legend */}
                <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: APPOINTMENT_COLORS.scheduled }}></div>
                        <span>{t('scheduled', 'Scheduled')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: APPOINTMENT_COLORS.completed }}></div>
                        <span>{t('completed', 'Completed')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: APPOINTMENT_COLORS.pending }}></div>
                        <span>{t('pending', 'Pending')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: APPOINTMENT_COLORS.cancelled }}></div>
                        <span>{t('cancelled', 'Cancelled')}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full items-center'>
                <ScheduleXCalendar calendarApp={calendar} />
                {selectedEvent && (
                    <EventModel
                        modalPosition={modalPosition}
                        selectedEvent={selectedEvent}
                        handleCloseModal={handleCloseModal}
                        eventsServicePlugin={eventsServicePlugin}
                        isAppointment={true}
                    />
                )}
            </div>


        </>
    );
}

export default AppointmentSchedule;
