import React from 'react';



const CalendarEvent = ({ event, isDarkMode }) => {
    const calendar = config.calendars[event.calendarId];
    const colors = isDarkMode ? calendar.darkColors : calendar.lightColors;

    return (
        <div style={{
            backgroundColor: colors.container,
            color: colors.onContainer,
            padding: '10px',
            margin: '5px',
            borderRadius: '5px',
        }}>
            <strong>{event.title}</strong>
            <p>{event.start} - {event.end}</p>
        </div>
    );
};

const CalendarView = ({ isDarkMode }) => {
    return (
        <div>
            {config.events.map(event => (
                <CalendarEvent key={event.id} event={event} isDarkMode={isDarkMode} />
            ))}
        </div>
    );
};

export default CalendarView;